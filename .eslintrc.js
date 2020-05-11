module.exports = {
    extends: ['airbnb-typescript-prettier'],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json']
    },
    overrides: [
        {
            files: '**/*.{ts,tsx}',
            rules: {
                'import/prefer-default-export': 'off',
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-useless-constructor': 'error'
            }
        }
    ],
    parser: '@typescript-eslint/parser'
};
