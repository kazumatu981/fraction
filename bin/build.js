import * as esbuild from 'esbuild';
import { buildConfig } from '../build.config.js';

const mode = process.argv[2];
console.log(`bundle TypeScript sources: ${mode} mode`);

// 設定を読み取る
const config = buildConfig[mode];
if (!config) {
    console.error(`invalid mode: ${mode}`);
    process.exit(1);
}

config.outdir = `dist/${mode}`;

// ビルドを実行する
await esbuild.build(config);
