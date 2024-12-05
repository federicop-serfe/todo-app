import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import { fileURLToPath } from 'url';

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(path.dirname(new URL(import.meta.url).pathname), 'dist'),
    filename: '[name].[contenthash].js'
  },
  mode: 'development', 
  resolve: {
    extensions: ['.js', '.jsx']
  }, 
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // https://stackoverflow.com/questions/57935343/the-babel-preset-babel-preset-react-doesnt-like-my-javascript-function-that-re
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-transform-react-jsx"    
            ],
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist'),
    },
    compress: true,
    historyApiFallback: true,
    port: 3000      
  }
};