const webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        index:'./index.js',
        main:'./main.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'bootstrap':resolve('src/assets/bootstrap'),   //如果是自己手动导入的话需要加这一句，如果是 npm install bootstrap --save的话不需要写这个
        }
    },

    plugins: [
        //new webpack.optimize.UglifyJsPlugin({
        //  compress: {
        //    warnings: false,
        //  },
        //  output: {
        //    comments: false,
        //  },
        //}),//压缩和丑化

        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),//直接定义第三方库

        new CommonsChunkPlugin({
            name: "commons",
            // (the commons chunk name)

            filename: "commons.js",
            // (the filename of the commons chunk)

            minChunks: 2,
            // (Modules must be shared between 3 entries)

            chunks: ["index", "main"]
            // (Only use these entries)
        })//定义公共chunk

    ]
}