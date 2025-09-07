export const tsdocConfig = {
    inputFilesBaseDir: './src',
    outputFilesBaseDir: './docs/api',
    inputFiles: ['./src/fraction.ts', './src/numeric.ts'],
    commonConfig: {
        // Emoji configuration. `undefined` for default configuration, `null` for explicitly no emoji.
        emoji: null,
        // The base heading level at which the documentation should start. Default ##
        headingLevel: '#',
    },
};
