var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    // devtool: 'eval-source-map',
    entry: {
        app: __dirname + '/src/app',
        vendor: ['react', 'react-dom', 'react-router', 'react-router-dom', 'react-redux', 'redux-form', 'jquery'], 
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全
        alias: {
            'highlight': __dirname + '/src/utils/highlight.pack.js',
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'stage-3', 'es2015']
                }
            },
            {
                test: /\.css$/i, 
                exclude: [
                    /node_modules/,
                    /styles\/lib/
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize&modules&localIdentName=[name]__[local]-[hash:base64:5]']
                }),
            },
            {
                test: /\.css$/i, 
                include: /styles\/lib/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize']
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: '../index.html',
            template: 'template.html',
            hash: true,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            hljs: 'highlight',
            Simditor: 'simditor'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
                // NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 提取公共代码
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
    ]
}