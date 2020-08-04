const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:"development",
    entry: "./src/index.js",
    name:"index",
    devServer:{
        contentBase: "./dist",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    module: {
        rules: [ 
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react'],
                        }
                    }
                ]
            },
            {
                test: /\.(wav)$/i,
                exclude: /node_modules/,
                loader: "file-loader",
                options: {
                    name: "/assets/samples/[name].[ext]"
                  }
            },
            {
                test: /\.(svg)$/i,
                loader: "@svgr/webpack",
                
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