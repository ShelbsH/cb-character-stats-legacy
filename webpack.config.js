const webpack = require('webpack');
const path = require('path');

//Plugins
const prettier = require('prettier-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

const isProduction = process.env.NODE_ENV === 'production';

let devEntry = [
  './app/index.tsx',
  'webpack/hot/only-dev-server',
  'webpack-hot-middleware/client'
];
let prodEntry = ['./app/index.tsx'];

module.exports = {
  entry: isProduction ? prodEntry : devEntry,
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval',
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel']
            }
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: 'css'
                  })
                ]
              })
            }
          }
        ].filter(Boolean)
      },
      {
        test: /(\.scss|\.css)/,
        use: [
          !isProduction
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /(\.woff|\.ttf|\.svg|\.eot|\.gif)/,
        use: 'url-loader'
      }
    ]
  },
  optimization: {
    namedChunks: true
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'app/'),
      styles: path.resolve(__dirname, 'app/styles/')
    },
    extensions: ['.ts', '.mjs', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    }),
    new prettier({
      bracketSpacing: true,
      printWidth: 70,
      singleQuote: true
    }),
    new HtmlWebpackPlugin({
      template: 'views/index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin()
  ]
};
