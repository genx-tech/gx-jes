const targetLTSVersion = '12.0';

module.exports = function (api) {
    let isProduction = api.env(['production']);

    return {
        presets: [
            [
                '@babel/env',
                {
                    targets: {
                        node: targetLTSVersion,
                    },
                    modules: 'cjs',
                    exclude: ['@babel/plugin-transform-regenerator'],
                },
            ],
        ],
        ignore: ['node_modules'],
        minified: isProduction,
        comments: !isProduction,
        plugins: [
            [
                'contract',
                {
                    strip: isProduction,
                    envStrip: true,
                },
            ],
            '@babel/plugin-proposal-class-properties',
            "add-module-exports"
        ],
    };
};

