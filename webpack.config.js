const path = require('path');

const {
    NODE_ENV = 'production',
} = process.env;

module.exports = {
    entry: './src/app.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            },
            {enforce: 'post', test: /unicode-properties[\/\\]index.js$/, loader: "transform-loader?brfs"},
            {enforce: 'post', test: /fontkit[\/\\]index.js$/, loader: "transform-loader?brfs"},
            {enforce: 'post', test: /linebreak[\/\\]src[\/\\]linebreaker.js/, loader: "transform-loader?brfs"}
        ]
    }
};
