var path = require('path');
var pagesDir = path.resolve(__dirname, './src/app');
var buildDir = path.resolve(__dirname, './build');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
/*const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');*/

module.exports = {
    entry: { // pagesDir是前面准备好的入口文件集合目录的路径
        'main': path.resolve(pagesDir, `main.js`),
        'vendor': ['vue', 'vue-router', 'iview', 'axios']
    },
    output: {
        path: buildDir,
        publicPath: '',
        filename: 'static/js/[name]-[hash].js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
        chunkFilename: 'static/js/[name]-[id]-[hash].bundle.js',
    },
    // devtool: 'cheap-module-eval-source-map',//cheap-module-source-map,eval-source-map,cheap-module-eval-source-map
    devServer: {
        contentBase: buildDir,//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true,
        compress:true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader", options: {name: 'static/fonts/[name].[ext]'}},
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?prefix=font/&limit=5000",
                options: {name: 'static/fonts/[name].[ext]'}
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream",
                options: {name: 'static/fonts/[name].[ext]'}
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'postcss-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '',
                    outputPath: 'static/imgs/'
                    // useRelativePath:true
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            ['build/static/js/*-*.js', 'build/static/css/*-*.css', 'build/*.hot-update.*','build/static/js/*.bundle.js'],　 //匹配删除的文件
            {
                root: __dirname,//根目录
                verbose: true,//开启在控制台输出信息
                dry: false//启用删除文件
            }),
        // new webpack.BannerPlugin('Create By zgjx at ' + new Date().toLocaleString()),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(pagesDir, `main.html`),
            chunks: ['vendor', 'main'],
            favicon: path.resolve(pagesDir, `static/imgs/favicon.ico`),
            // minify:false//https://www.cnblogs.com/river-lee/p/4253075.html
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                removeRedundantAttributes: true,
                removeEmptyElements: false
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            exclude:/\.min\.js$/,
            mangle:true,
            compress: { warnings: false },
            output: { comments: false }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 上面入口定义的节点组
            filename: 'static/js/[name]-[hash].js', //最后生成的文件名
            minChunks: 3,

        }),
        new ExtractTextPlugin("static/css/[name]-[hash].css"),
/*        new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt'),
        new Visualizer({filename: './statistics.html'})*/
    ]
};