const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:"development",
    entry: "./src/index.js",
    devServer:{
        contentBase: "./dist"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        publicPath: "assets/scripts",
    },
    module: {
        rules: [ 
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.(wav)$/i,
                exclude: /node_modules/,
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]"
                  }
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
        
    },
    plugins: [
        new HtmlWebPackPlugin({ 
            template: './src/index.html'
        })
    ]
    

}