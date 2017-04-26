/**
 * Created by hlwen on 2017/4/23.
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config/')
const IS_ENV =process.env.NODE_ENV == 'production'


var plugins = [];
if (IS_ENV) { //生产环境
    plugins.push(new webpack.DefinePlugin({
        'process.env': { //设置成生产环境
            NODE_ENV: '"production"'
        }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({ //压缩代码
        compress: {
            warnings: false
        }
    }))
}

// plugins.push(
//     new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
//         filename: './index.html', //生成的html存放路径，相对于 path
//         template: './src/template/index.html', //html模板路径
//     })
// )


module.exports = {
    entry: './app/main.js', //编译入口文件
    output: {
        publicPath: config.serverPath, //服务器的路径
        path: path.resolve(__dirname + config.publicPath), //编译到app目录
        // filename: '[name].js?[hash]' //编译后的文件名
        filename: '[name].js' //编译后的文件名
    },
    watch:false,
    devtool:'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js(x)*$/,
                exclude: /^node_modules$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css/,
                exclude: /^node_modules$/,
                use:[
                    'style-loader','css-loader','postcss-loader'
                ]
            },
            {
                test: /\.less/,
                exclude: /^node_modules$/,
                use:[
                    'style-loader','css-loader','postcss-loader','less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /^node_modules$/,
                loader: 'url-loader?limit=2000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins,
    resolve: {
        //注意一下, extensions webpack2第一个不是空字符串! 对应不需要后缀的情况.
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx', '.vue'],
        alias: {
        //     vue: 'vue/dist/vue.js', //webpack打包时，需要设置别名
            store: path.resolve('app/store/'), //常用工具方法
        }
    },
}