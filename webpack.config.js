const path = require('path');
const StringReplacePlugin = require("string-replace-webpack-plugin");

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
        alias: {
          'unicode-properties': 'unicode-properties/unicode-properties.cjs.js',
          'pdfkit': 'pdfkit/js/pdfkit.js'
        }
    },
    plugins: [new StringReplacePlugin()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            },
            {
              enforce: 'pre',
              test: /unicode-properties[\/\\]unicode-properties/,
              loader: StringReplacePlugin.replace({
                replacements: [
                  {
                    pattern: "var fs = _interopDefault(require('fs'));",
                    replacement: function () {
                      return "var fs = require('fs');";
                    }
                  }
                ]
              })
            },
            {test: /unicode-properties[\/\\]unicode-properties/, loader: "transform-loader?brfs"},
            {test: /pdfkit[/\\]js[/\\]/, loader: "transform-loader?brfs"},
            {test: /fontkit[\/\\]index.js$/, loader: "transform-loader?brfs"},
            {test: /linebreak[\/\\]src[\/\\]linebreaker.js/, loader: "transform-loader?brfs"}            
        ]
    }
};
