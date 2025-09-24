export const tsdocConfig = {
    inputFilesBaseDir: './src',
    outputFilesBaseDir: './docs/api',
    inputFiles: ['./src/fraction.ts', './src/numerics.ts', './src/prime-number-table.ts'],
    commonConfig: {
        markdownOptions: {
            // Emoji configuration. `undefined` for default configuration, `null` for explicitly no emoji.
            emoji: null,
            // The base heading level at which the documentation should start. Default ##
            headingLevel: '#',
        },
    },
};
