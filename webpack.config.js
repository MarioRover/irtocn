require('dotenv').config();
const path = require('path');
const Manifest = require('./public/webpack/Manifest');
// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry  : {
        bundle : './public/js/bundle.js',
        admin  : './public/panel/js/bundle.js'
    },
    output : {
        filename : `[name].min${ process.env.MODE == 'production' ? '.[chunkhash]' : '' }.js`,
        path     : path.resolve(__dirname , 'public/dist')
    },
    mode : `${process.env.MODE}`,
    module: {
        rules: [
            {
                test : /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ] 
            },
            {
                test : /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name  : 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff2|woff|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name  : 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins : [
        new Manifest(),
        new CleanWebpackPlugin(['dist'] , {
            root : __dirname + '/public'
        }),
        new MiniCssExtractPlugin({
            filename: `[name].min${ process.env.MODE == 'production' ? '.[chunkhash]' : '' }.css`
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
              }),
              new OptimizeCSSAssetsPlugin({})
        ]
    },
    performance: {
        hints: 'warning'
    },
};
