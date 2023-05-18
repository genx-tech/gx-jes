//babel config for node.js app
module.exports = function (api) {
    api.cache(false);

    const opts = {
        sourceMaps: true,
        presets: [
            [
                '@babel/env',
                {
                    debug: false,
                    modules: 'commonjs',
                    targets: 'node 16.0'
                },
            ],
        ],
        comments: false,
        ignore: ['node_modules'],
        plugins: ['source-map-support', '@babel/plugin-proposal-class-static-block', 'add-module-exports'],
    };

    return opts;
};
