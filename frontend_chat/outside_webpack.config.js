const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const devMode = true;

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    devtool: "inline-source-map",
    stats: {
        builtAt:true,
        logging:'info',
        modules: false,
        children: false,
    },
    performance: {
        hints: false
    },
    entry:[ './src/index.tsx'],
    output: {
        path: path.resolve(__dirname, '../static/dist'),
        filename: "app.js",
        publicPath: '/'
    },
    devServer: {
        inline: true,
        //contentBase: './public',
        historyApiFallback: true,
        port: 3002
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js" , '.scss']
    },
    plugins:[
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "app.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader"}
        ]
    }
};
