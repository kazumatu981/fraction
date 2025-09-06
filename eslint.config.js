import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
    ...tseslint.config({
        files: ['**/*.{ts,tsx}'],
        extends: [eslint.configs.recommended, tseslint.configs.strict],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        rules: {
            complexity: ['error', { max: 10 }],
            'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
            'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
            'max-depth': ['warn', 4],
            'max-params': ['warn', 4],
        },
    }),
];
