module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        [
            'module-resolver',
            {
                alias: {
                    '@auth': './src/auth',
                    '@config': './src/config',
                    '@middlewares': './src/shared/middlewares',
                    '@response': './src/shared/response',
                    '@router': './src/shared/router',
                }
            }
        ]
    ]
};