>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.环境变量</h1>

<p>之前我们是通过package.json中，不同命令指向不同配置文件，来进行不同环境的打包，现在我们有另外一种方式。</p>

<p>我们现在删除webpack.dev.js和webpack.prod.js中的merge，只单独导出对应环境的配置。然后在webpack.common.js中引入merge。</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6a3ad78f601e?w=369&h=138&f=png&s=3782)


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6a3da23f9409?w=348&h=154&f=png&s=3900)


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6a4ea0f0555a?w=542&h=91&f=png&s=13178)

<p>然后把webpack.common.js中的内容变成commonConfig对象</p>


```
const commonConfig = {
  entry: {
    main: './src/index.js'
  },

  output: {
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
        test: /.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'imports-loader?this=>window'
          }
        ]
      }
    ]
  },
   
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  performance: false,
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  }
}
```

<p>然后我们就可以通过传参来判断现在是打包哪一个环境的代码，去对应merge不同环境的配置文件。</p>

![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6a7838d19e18?w=545&h=210&f=png&s=17567)

<p>现在打包的时候，开发环境只需要指向webpack.common.js文件即可，而打包线上环境的代码，需要加一个--env.production参数</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6acee0d5d976?w=829&h=145&f=png&s=17191)


<p>环境变量的值可以自由定，比如可以让值等于abc</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6aeea081c94a?w=881&h=151&f=png&s=17682)


<p>这样，打包配置需要改成</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6afa059616c4?w=610&h=212&f=png&s=18296)