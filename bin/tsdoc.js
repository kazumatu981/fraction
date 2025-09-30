import { generateDocumentation } from 'tsdoc-markdown';
import { tsdocConfig } from '../tsdoc.config.js';
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

const buildTasks = fileNames.map(async ({ input, output }) => {
    await mkdir(path.dirname(output), { recursive: true });
    _buildTsConfig(input, output);
});

await Promise.all(buildTasks);

function _buildTsConfig(tsFileName, mdFileName) {
    generateDocumentation({
        inputFiles: [tsFileName],
        outputFile: mdFileName,
        ...tsdocConfig.commonConfig,
    });
}
