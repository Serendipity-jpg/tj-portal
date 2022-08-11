const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TcAdapter',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine:  true,
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']
            }
          }
        },    
        {
            loader: '@tencent/js-armor-loader',
            enforce: 'post',
            options: {
                // JS-Armor 混淆级别，必传
                level: 2,
                // JS-Armor 编译选项
                pragma: {
                  // 随机数种子，必传
                  seed: Math.random(),
                  // 压缩字节码，建议打开
                  compress: false,
                  // 具体参考 https://iwiki.woa.com/pages/viewpage.action?pageId=435807050
                  // 注意该选项都是驼峰表示的，合法的选项名示例: debugVm/import/foldOpcode/...
                }
            }
        },
      ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "dist/index.js",
          to: path.resolve(__dirname, 'dist/tcadapter.1.0.0.min.js'),
        },
      ],
    }),
    new BundleAnalyzerPlugin(),
  ]
};