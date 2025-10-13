import fs from 'fs';
import path from 'path';
import * as ts from 'typescript';

function walkDir(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkDir(full, cb);
    } else if (e.isFile() && full.endsWith('.ts')) {
      cb(full);
    }
  }
}

function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function countLineMetrics(sourceText) {
  const lines = sourceText.split(/\r?\n/);
  let inBlock = false;
  const commentLineFlags = new Array(lines.length).fill(false);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (inBlock) {
      commentLineFlags[i] = true;
      if (trimmed.includes('*/')) {
        inBlock = false;
      }
      continue;
    }
    if (trimmed.startsWith('//')) {
      commentLineFlags[i] = true;
      continue;
    }
    if (trimmed.startsWith('/*')) {
      commentLineFlags[i] = true;
      if (!trimmed.includes('*/')) {
        inBlock = true;
      }
      continue;
    }
  }

  const total = lines.length;
  let comment = 0;
  let empty = 0;
  let bracketOnly = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (commentLineFlags[i]) comment++;
    else if (t === '') empty++;
    else if (t === '{' || t === '}' || t === ';') bracketOnly++;
  }
  const executable = total - comment - empty - bracketOnly;
  return { total, comment, empty, executable, commentLineFlags, lines };
}

function isFunctionLike(node) {
  return (
    node.kind === ts.SyntaxKind.FunctionDeclaration ||
    node.kind === ts.SyntaxKind.FunctionExpression ||
    node.kind === ts.SyntaxKind.ArrowFunction ||
    node.kind === ts.SyntaxKind.MethodDeclaration ||
    node.kind === ts.SyntaxKind.GetAccessor ||
    node.kind === ts.SyntaxKind.SetAccessor ||
    node.kind === ts.SyntaxKind.Constructor
  );
}

function analyzeFunction(node, sourceFile, fileLines, commentFlags) {
  const start = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile, false)).line;
  const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line;
  const funcLines = end - start + 1;

  let comment = 0;
  let empty = 0;
  let bracketOnly = 0;
  for (let i = start; i <= end; i++) {
    const t = fileLines[i].trim();
    if (commentFlags[i]) comment++;
    else if (t === '') empty++;
    else if (t === '{' || t === '}' || t === ';') bracketOnly++;
  }
  const executable = funcLines - comment - empty - bracketOnly;
  const args = node.parameters ? node.parameters.length : 0;

  // Cyclomatic complexity and nesting depth
  let complexity = 1;
  let maxDepth = 0;

  function walk(n, depth) {
    if (!n) return;
    const k = n.kind;
    // Increase nesting for control flow structures
    if (
      k === ts.SyntaxKind.IfStatement ||
      k === ts.SyntaxKind.ForStatement ||
      k === ts.SyntaxKind.ForOfStatement ||
      k === ts.SyntaxKind.ForInStatement ||
      k === ts.SyntaxKind.WhileStatement ||
      k === ts.SyntaxKind.DoStatement ||
      k === ts.SyntaxKind.SwitchStatement ||
      k === ts.SyntaxKind.CaseClause ||
      k === ts.SyntaxKind.CatchClause ||
      k === ts.SyntaxKind.ConditionalExpression
    ) {
      complexity++;
      depth++;
      if (depth > maxDepth) maxDepth = depth;
    }

    // logical operators && and || increase complexity
    if (k === ts.SyntaxKind.BinaryExpression) {
      const be = n;
      if (be.operatorToken && (be.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken || be.operatorToken.kind === ts.SyntaxKind.BarBarToken)) {
        complexity++;
      }
    }

    n.forEachChild((ch) => walk(ch, depth));
  }

  // Start walk from function body if exists
  const body = node.body ? node.body : node;
  walk(body, 0);

  return {
    startLine: start + 1,
    endLine: end + 1,
    lines: funcLines,
    commentLines: comment,
    emptyLines: empty,
    commentRate: ((comment / funcLines) * 100).toFixed(2),
    emptyRate: ((empty / funcLines) * 100).toFixed(2),
    executableLines: executable,
    args,
    nestingDepth: maxDepth,
    cyclomatic: complexity,
  };
}

function analyzeFile(filePath, outBase) {
  const sourceText = fs.readFileSync(filePath, 'utf8');
  const fileStat = fs.statSync(filePath);
  const { total, comment, empty, executable, commentLineFlags, lines } = countLineMetrics(sourceText);

  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);

  let functionMetrics = [];
  let functionCount = 0;
  let classCount = 0;

  function visit(node) {
    if (isFunctionLike(node)) {
      functionCount++;
      const name = node.name && node.name.escapedText ? node.name.escapedText.toString() : '<anonymous>';
      const metrics = analyzeFunction(node, sourceFile, lines, commentLineFlags);
      functionMetrics.push({ name, metrics });
    } else if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      classCount++;
    }
    node.forEachChild(visit);
  }

  visit(sourceFile);

  const fileMetrics = {
    fileName: path.basename(filePath),
    path: filePath,
    lines: total,
    commentLines: comment,
    emptyLines: empty,
    commentRate: ((comment / total) * 100).toFixed(2),
    emptyRate: ((empty / total) * 100).toFixed(2),
    executableLines: executable,
    functionCount,
    classCount,
    fileSize: fileStat.size,
  };

  // prepare output path
  const rel = path.relative(path.join(process.cwd(), 'src'), filePath);
  const outDir = path.join(process.cwd(), 'metrics', path.dirname(rel));
  ensureDirExists(outDir);
  const outFile = path.join(outDir, `${path.basename(filePath, '.ts')}_metrics_report.md`);

  // generate markdown
  const linesMd = [];
  linesMd.push(`# ${fileMetrics.fileName}`);
  linesMd.push('');
  linesMd.push('## ファイルメトリクス');
  linesMd.push('');
  linesMd.push('| メトリクス       | 値               |');
  linesMd.push('|------------------|------------------|');
  linesMd.push(`| 行数             | ${fileMetrics.lines}           |`);
  linesMd.push(`| コメント行数     | ${fileMetrics.commentLines}   |`);
  linesMd.push(`| 空行数           | ${fileMetrics.emptyLines}         |`);
  linesMd.push(`| コメント率       | ${fileMetrics.commentRate}%    |`);
  linesMd.push(`| 空行率           | ${fileMetrics.emptyRate}% |`);
  linesMd.push(`| 実行行数         | ${fileMetrics.executableLines}       |`);
  linesMd.push(`| 関数/メソッド数  | ${fileMetrics.functionCount}|`);
  linesMd.push(`| クラス数         | ${fileMetrics.classCount}       |`);
  linesMd.push(`| ファイルサイズ   | ${fileMetrics.fileSize} バイト |`);
  linesMd.push('');

  linesMd.push('## 関数/メソッドメトリクス');
  linesMd.push('');
  linesMd.push('| 関数/メソッド名 | 行数 | コメント行数 | 空行数 | コメント率 | 空行率 | 実行行数 | 引数の数 | ネストの深さ | Cyclomatic Complexity |');
  linesMd.push('|------------------|------|--------------|--------|------------|--------|----------|----------|--------------|-----------------------|');
  for (const f of functionMetrics) {
    const m = f.metrics;
    linesMd.push(`| ${String(f.name)} | ${m.lines} | ${m.commentLines} | ${m.emptyLines} | ${m.commentRate}% | ${m.emptyRate}% | ${m.executableLines} | ${m.args} | ${m.nestingDepth} | ${m.cyclomatic} |`);
  }
  linesMd.push('');

  // crude readability evaluation
  linesMd.push('## 可読性評価');
  linesMd.push('');
  // overall
  let overall = '普通';
  if (parseFloat(fileMetrics.commentRate) < 5) overall = '低い';
  // average function length
  const avgFuncLines = functionMetrics.length ? functionMetrics.reduce((s, f) => s + f.metrics.lines, 0) / functionMetrics.length : 0;
  if (avgFuncLines >= 50) overall = '低い';
  // any high complexity
  if (functionMetrics.some((f) => f.metrics.cyclomatic >= 10)) overall = '低い';

  linesMd.push(`- 全体の可読性評価: ${overall}`);
  linesMd.push('- 評価が低い関数/メソッド:');
  let anyLow = false;
  for (const f of functionMetrics) {
    const name = f.name;
    const m = f.metrics;
    const reasons = [];
    if (parseFloat(m.commentRate) < 5) reasons.push('コメント率が低い');
    if (m.lines >= 50) reasons.push('関数が長すぎる');
    if (m.cyclomatic >= 10) reasons.push('Cyclomatic Complexity が高い');
    if (m.nestingDepth >= 3) reasons.push('ネストが深い');
    if (reasons.length) {
      anyLow = true;
      linesMd.push(`  - ${name}: ${reasons.join('、')}`);
    }
  }
  if (!anyLow) linesMd.push('  - なし');
  linesMd.push('');

  linesMd.push('## 改善案');
  linesMd.push('');
  linesMd.push('- Cyclomatic Complexity が高い関数は、責務ごとに関数を分割することを検討してください。');
  linesMd.push('- コメント率が低い場合は、関数の入力・出力とアルゴリズムの意図を短く注釈してください。');
  linesMd.push('- 長すぎる関数は、複数の小さな関数に分割してテスト可能性を高めてください。');

  fs.writeFileSync(outFile, linesMd.join('\n'), 'utf8');
  console.log(`Wrote ${outFile}`);
}

async function main() {
  const target = process.argv[2] || 'src';
  const abs = path.isAbsolute(target) ? target : path.join(process.cwd(), target);
  if (!fs.existsSync(abs)) {
    console.error('Target not found:', abs);
    process.exit(1);
  }

  const stat = fs.statSync(abs);
  if (stat.isFile()) {
    analyzeFile(abs);
  } else if (stat.isDirectory()) {
    walkDir(abs, (file) => analyzeFile(file));
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('metrics.js')) {
  main().catch((e) => {
    console.error(e);
    process.exit(2);
  });
}
