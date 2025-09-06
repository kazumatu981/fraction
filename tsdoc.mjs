import { generateDocumentation } from 'tsdoc-markdown';
import { tsdocConfig } from './tsdoc.condig.mjs';
import path from 'path';
import { mkdir } from 'fs/promises';

// outputFileの親ディレクトリをtargetDirに格納
const targetDir = path.dirname(tsdocConfig.outputFile);

// 必要なディレクトリツリーを作成
await mkdir(targetDir, { recursive: true });

generateDocumentation(tsdocConfig);
