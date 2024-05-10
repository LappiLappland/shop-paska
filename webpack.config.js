import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import npmPackage from './package.json' assert { type: 'json' };
import postcssConfig from './postcss.config.js';
import swcConfig from './swcrc.config.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webpackConfig = (env, argv) => {
  const isDev = argv.mode !== 'production';

  console.log('!!!!', npmPackage.homepage);

  const publicUrlRegex = /.+/;
  const publicUrlFind = npmPackage.homepage.match(publicUrlRegex);
  const publicUrl = publicUrlFind ? publicUrlFind[0] : '/';

  console.log('-->', publicUrl, publicUrlFind);

  return {
    mode: isDev ? 'development' : 'production',
    devtool: 'inline-source-map',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
      filename: isDev
        ? 'static/js/bundle.js'
        : 'static/js/[name].[contenthash:8].js',
      chunkFilename: isDev
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      publicPath: publicUrl + '/',
      clean: true,
      path: path.join(__dirname, 'build'),
      pathinfo: isDev,
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'build'),
        publicPath: publicUrl + '/',
      },
      compress: true,
      port: 8080,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensionAlias: {
        '.js': ['.js', 'ts'],
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
      isDev && new ReactRefreshPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: swcConfig,
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: postcssConfig,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};

export default webpackConfig;
