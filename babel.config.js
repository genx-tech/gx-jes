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
                    exclude: ['@babel/plugin-transform-regenerator'],
                },
            ],
        ],
        ignore: ['node_modules'],
        plugins: [
            [
                'contract',
                {
                    strip: isProduction,
                    envStrip: true,
                },
            ],
            '@babel/plugin-proposal-class-properties',
        ],
    };
};

