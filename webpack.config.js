const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const postcssCustomProperties = require('postcss-custom-properties');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/images/favicon-32x32.png"
        }),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [

                    MiniCssExtractPlugin.loader,
                    //CSS Loader
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    //PostCSS with CustomProperties
                    //to allow usage of custom css properties in older browsers
                    { loader: 'postcss-loader', options: {
                        postcssOptions: {
                            plugins: [postcssCustomProperties({
                                preserve: false
                            })
                            ],
                            }
                        }
                    }

                    ],
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
        
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    }
}