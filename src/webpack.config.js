const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: path.resolve(__dirname, 'index.ts'),
    devtool: 'source-map',
    target: "node",
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: 'app.dev.js',
        path: path.resolve(__dirname, '../build/'),
        library: '@fortjs/graphql',
        libraryTarget: 'commonjs2'
    },
    plugins: [],
    externals: [nodeExternals()]
};