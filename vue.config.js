var webpack = require('webpack');
var path = require("path");

module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                "@poseidon/client": path.resolve(__dirname, 'poseidon-client/src'),
                "@poseidon/core-models": path.resolve(__dirname, 'poseidon-client/core-models/src'),
            }
        },
        module: {

            // rules: [
            //     {
            //         test: /.html$/,
            //         exclude: [
            //             /node_modules/,
            //             /index.html$/
            //         ],
            //         use: { loader: 'html-loader' }
            //     }
            // ]
        }
    }
}