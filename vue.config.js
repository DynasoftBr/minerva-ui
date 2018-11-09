var webpack = require('webpack');

module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
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