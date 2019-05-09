>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1. MiniCssExtractPlugin</h1>

<p>可以利用这个插件对css进行代码分割。</p>
<p>注：补充一个知识点，在output中可以配置chunkFilename，这个是对间接引用的js文件进行命名，稍后会用到。</p>

<p>首先安装插件cnpm install --save-dev mini-css-extract-plugin。</p>
<p>安装完成后，在webpack.config.js中引入插件，并在plugins中初始化。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cf51918c818a?w=719&h=94&f=png&s=15746)


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cf774cddf6d8?w=411&h=140&f=png&s=4845)


<p>然后配置module，把所有的style-loader替换为MiniCssExtractPlugin.loader，其他配置项不变。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cfb8c3f74e01?w=580&h=807&f=png&s=32161)


<p>进行打包，dist目录中就有了CSS文件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cfd0b92f9a40?w=280&h=143&f=png&s=2919)


<p>如果此时打包的文件没有css，有可能是因为tree Shaking中，package.json没有设置sideEffects。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cfe690752454?w=290&h=88&f=png&s=2691)

<h1>2. MiniCssExtractPlugin参数</h1>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9d01adcbeb9a8?w=460&h=193&f=png&s=9533)


<p>与js相同，页面直接引用的css命名规则是filename，而间接引用的css命名规则是chunkFilename。</p>


<h1>3.MiniCssExtractPlugin其他用法</h1>

<p>如果我们引入两个css文件，MiniCssExtractPlugin会把他们打包到一个文件中。</p>

![](https://user-gold-cdn.xitu.io/2019/5/9/16a9d06e8eea185d?w=355&h=111&f=png&s=6159)

<p>如果想压缩css代码，需要安装一个插件 optimize-css-assets-webpack-plugin。</p>

<p>首先安装cnpm install --save-dev optimize-css-assets-webpack-plugin</p>

<p>然后引入插件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9d0a2d7935433?w=872&h=114&f=png&s=22028)


<p>然后在optimization.minimizer初始化插件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9d0b64fcf9e0d?w=552&h=108&f=png&s=6296)


<p>运行打包命令，发现css代码已经被压缩合并了。</p>

<p>插件底层也借助了splitChunksPlugin，如果css有多个入口，也可以通过cacheGroups来分割合并css代码。</p>


```
optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true // 强制忽略minChunks等设置
        }
      }
    }
}
```

<p>多入口js中，如果想让各个js中引入的css打包到对应的css文件中，需要这样配置。</p>


```
optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'foo',
          test: (m, c, entry = 'foo') => // foo入口下的css打包到foo.css中
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        },
        barStyles: {
          name: 'bar',
          test: (m, c, entry = 'bar') => // bar入口下的css打包到bar.css中
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        }
      }
    }
}
```