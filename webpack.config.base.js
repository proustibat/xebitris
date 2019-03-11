const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        'index-webapp': './src/index-webapp.js',
        'index-cordova': './src/index-cordova.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new PrettierPlugin({
            printWidth: 80,               // Specify the length of line that the printer will wrap on.
            tabWidth: 4,                  // Specify the number of spaces per indentation-level.
            useTabs: false,               // Indent lines with tabs instead of spaces.
            semi: true,                   // Print semicolons at the ends of statements.
            singleQuote: true,            // Use single quotes instead of double quotes.
            trailingComma: 'es5',         // Print trailing commas wherever possible when multi-line.
            bracketSpacing: true,         // Print spaces between brackets in object literals.
            arrowParens: 'always',        // Include parentheses around a sole arrow function parameter.
            encoding: 'utf-8',            // Which encoding scheme to use on files
            extensions: [ ".js" ]         // Which file extensions to process
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src', 'index-cordova.html'),
            filename: 'index-cordova.html',
            chunks: ['index-cordova']
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src', 'index-webapp.html'),
            filename: 'index.html',
            chunks: ['index-webapp'],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true
            }
        })
    ]
};