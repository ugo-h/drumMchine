const path = require('path');
const SRC = path.resolve(__dirname, 'src/app.js');

module.exports = {
    mode:"development",
    entry: "./src/app.js",
    devServer:{
        contentBase: "./dist"
    },
    output: {
        path: path.resolve(__dirname, "assets", "scripts"),
        filename: "app.js",
        publicPath: "assets/scripts",
    },
    module: {
        rules: [
            {
                test: /\.(wav)$/i,
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]"
                  }
            }
        ]
    }
    

}