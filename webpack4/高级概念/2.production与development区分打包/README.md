>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.如何区分打包</h1>
<p>我们在production与development两个模式下，配置有很多不同，如果依靠上线过程中，手动切换模式，会无形增加很多工作量，那么怎样才能区分打包呢？</p>

<p>首先，我们分别新建一个webpack.dev.js文件和webpack.prod.js文件，配置为不同模式的代码。</p>

<p>webpack.dev.js中的代码</p>

```
// development模式 webpack.dev.js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    open: true,
    port: 9000,
    hot: true
  },

  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  module: {
    rules: [
      {
        test: /.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /.css$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              
            }
          }
        ]
      },
      {
        test: /.scss$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    usedExports: true
  }
}
```
<p>webpack.prod.js中的代码</p>

```
// production模式 webpack.prod.js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  devtool: 'source-map',

  output: {
    publicPath: './',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  module: {
    rules: [
      {
        test: /.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /.css$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              
            }
          }
        ]
      },
      {
        test: /.scss$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
```

<p>在package.json中写不同配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a8877a4b2296f9?w=664&h=118&f=png&s=10458)


<p>然后在开发中使用npm run dev，打包上线时使用npm run build，就可以区分不同的模式打包了。</p>

<p>但是我们发现，两个配置文件中有着大量的重复代码，我们可以通过新建一个webpack.common.js把重复代码提出来,利用第三方模块webpack-merge，来合并配置项，cnpm install -D webpack-merge</p>

<p>webpack.common.js</p>

```
// webpack.common.js
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path');
module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /.css$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              
            }
          }
        ]
      },
      {
        test: /.scss$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
   
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
```

<p>webpack.dev.js</p>


```
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const devConfig = {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    open: true,
    port: 9000,
    hot: true
  },

  output: {
    publicPath: '/'
  },

  optimization: {
    usedExports: true
  }
}
module.exports = merge(commonConfig, devConfig);
```

<p>webpack.prod.js</p>


```
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const prodConfig = {
  mode: 'production',

  devtool: 'source-map',

  output: {
    publicPath: './'
  }
}
module.exports = merge(prodConfig, commonConfig);
```

<p>先引入const merge = require('webpack-merge')，然后引入webpack.common.js，最后把当前配置和引入的commonConfig合并，就可以继续执行之前的命令了。如果把三个配置文件都放在build文件中，package.json也需要做一下修改。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a8891e7bbacd25?w=708&h=126&f=png&s=11787)


<p>然后运行npm run build和npm run dev就可以了。</p>