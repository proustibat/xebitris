const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const configBase = require('./webpack.config.base');

module.exports = merge(configBase, {
    mode: 'production',
    devtool: false,
    performance: {
        maxEntrypointSize: 900000,
        maxAssetSize: 900000
    },
    optimization: {
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        new CompressionPlugin()
    ]
});