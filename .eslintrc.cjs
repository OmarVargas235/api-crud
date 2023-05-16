module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'standard-with-typescript',
        'standard',
        'eslint-config-prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
    ],
    plugins: ["@typescript-eslint", "import", "prettier"],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'no-undef': 'off'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    rules: {
        "no-new": 0,
        "eslint-disable-next-line no-new": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-misused-promises": "off",
        "prettier/prettier": "error",
        "import/no-unresolved": "off",
        "no-useless-constructor": 0,
        // "prettier/prettier": [
        //     "error",
        //     {
        //       "endOfLine": "off"
        //     }
        // ]
    }
}