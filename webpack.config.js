const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: { index: path.resolve(__dirname, 'src', 'index.tsx') },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    port: '3000',
    static: {
      directory: path.resolve(__dirname, './public'),
    },
    historyApiFallback: true,
    open: true,
    hot: true,
    liveReload: true,
    client: {
      progress: true,
      overlay: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/ios', to: 'ios' },
        { from: 'public/android', to: 'android' },
        { from: 'public/windows11', to: 'windows11' },
        { from: 'public/manifest.json' },
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, 'public', 'service-worker.js'),
    }),
  ],
};
