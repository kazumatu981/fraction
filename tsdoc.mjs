import { generateDocumentation } from 'tsdoc-markdown';
import { tsdocConfig } from './tsdoc.config.mjs';
import path from 'path';
import { mkdir } from 'fs/promises';

const fileNames = tsdocConfig.inputFiles.map((fileName) => {
    const outFileName = fileName
        .replace(tsdocConfig.inputFilesBaseDir, tsdocConfig.outputFilesBaseDir)
        .replace('.ts', '.md');
    return {
        input: fileName,
        output: outFileName,
    };
});
