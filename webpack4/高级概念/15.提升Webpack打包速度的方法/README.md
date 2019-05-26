>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.跟上技术的迭代（Node，Npm，Yarn）</h1>

<p>如果Node进行了版本更新，性能方面有所提升，webpack运行在node的基础上，性能也会跟着有所提升。</p>

<p>如果更新Npm和Yarn，模块之间遇到相互引用的情况下，新版本的包管理工具可能会更快的帮我们分析包依赖，做一些包的引用。</p>

<h1>2.在尽可能少的模块上应用Loader</h1>

<p>比如我们使用babel-loader的时候，不需要对node_modules也进行编译。</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16adfddf0fe83e52?w=354&h=401&f=png&s=12562)


<p>exclude: /node_modules/</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16adfddd64d58463?w=417&h=437&f=png&s=15381)


<p>因为通常来说，node_modules里面的js通常都被编译过了，我们再去重新编译一次就会造成浪费。</p>

<h1>3.尽可能少的使用plugin，并且要保证plugin的可靠性</h1>

<p>比如，我们在打包线上代码时，会压缩css，就会使用optimize-css-assets-webpack-plugin这个插件，但是在开发环境中，我们不需要压缩css，所以在两个配置文件中，做出不同的配置。</p>

<p>打包线上代码的配置：</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16adfe558c5a9d94?w=581&h=180&f=png&s=9706)


<p>在本地开发配置文件中就可以不加这个plugin。</p>

<p>另外我们在使用插件时，最好使用社区中验证过，性能比较好的插件。因为有一些个人开发的插件，性能得不到保证，会对打包速度有影响。</p>

<h1>4.resolve参数合理配置</h1>

<h2>4.1 extensions</h2>

<p>有时候我们引入一个文件，想配置成不写文件后缀的引入方式，就需要用到这个配置项。</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16adff508f3f81ab?w=437&h=108&f=png&s=5399)


![](https://user-gold-cdn.xitu.io/2019/5/22/16adff5181967b6d?w=339&h=114&f=png&s=3943)

<p>这样webpack在引入文件时，就会去找后缀名为js和jsx的文件。</p>

<p>但是如果我们配置了很多类型的文件后缀，那么webpack打包时每次都要重复找这个文件，对性能就会有损耗，所以我们只把逻辑文件配置在extensions里面。</p>

<h2>4.2 mainFiles</h2>

<p>现在我们想引用一个文件夹下的index.js文件，有什么方法让webpack默认引入index.js文件呢</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16adfff46100c654?w=367&h=147&f=png&s=5682)


![](https://user-gold-cdn.xitu.io/2019/5/22/16adffe3bf10c57a?w=447&h=122&f=png&s=4676)


<p>就可以写成</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16adffe536713efa?w=383&h=123&f=png&s=4210)


<p>也可以多加配置</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16ae0000a93ffc80?w=387&h=156&f=png&s=6548)


![](https://user-gold-cdn.xitu.io/2019/5/22/16ae000d311a501f?w=465&h=123&f=png&s=4293)


<p>就可以写成</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16ae000c17797069?w=461&h=113&f=png&s=4213)


<p>但是如果配置特别多，也是会影响到weback打包速度的。</p>


<h2>4.3 alias</h2>

<p>我们在写react和vue的时候，常常会配置alias，通过给目录设置别名，webpack打包的时候就能找到目录。</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16ae004129d373e9?w=570&h=212&f=png&s=12835)


![](https://user-gold-cdn.xitu.io/2019/5/22/16ae004f723f62ab?w=388&h=127&f=png&s=3924)


<p>相当于</p>


![](https://user-gold-cdn.xitu.io/2019/5/22/16adffe3bf10c57a?w=447&h=122&f=png&s=4676)


<h1>5.使用DllPlugin提升webpack打包速度</h1>

<p>我们在开发过程中，难免引入第三方模块（比如lodash），而每次在打包的时候，都会重新去分析每个引入的包，分析完之后把他们打包到我们的代码中。其实第三方模块引入后，通常是不会改变的，我们可以把他们单独打包生成一个文件，只在第一次打包的时候分析他们，以后再打包时直接用分析的结果(实际是把第三方模块打包成文件，通过全局变量输出)。</p>

<p>我们先在webpack.config.js目录中（如果分环境打包，就在配置文件的目录中），新建一个webapck.dll.js。</p>

<p>假设我们这次引入了lodash这个第三方模块，那么要在webpack.dll.js中增加配置</p>

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae5163c800d466?w=402&h=142&f=png&s=6229)


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae5277c766b238?w=631&h=347&f=png&s=17602)


<p>然后需要在package.json中增加一个命令。</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae51a289a4de93?w=746&h=192&f=png&s=18491)


<p>然后我们继续完善代码，先安装一个插件</p>

```
cnpm install add-asset-html-webpack-plugin --save

```

<p>然后在webpack.common.js中引入插件</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae52243aaea640?w=859&h=37&f=png&s=7323)


<p>然后增加使用一个插件，意思是，向html中增加一个资源，这个资源的目录是dll下的vendor.dll.js。</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae5274b0e7725b?w=714&h=262&f=png&s=19226)


<p>然后我们启动npm run dev，发现这控制台中输入vendor，会出现一个函数，我们第一步就达成了，现在需要让我们的代码使用这个全局变量。</p>

<p>打开webpack.dll.js，增加如下配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae52edecea2383?w=701&h=530&f=png&s=29598)


<p>意思是，要用DLLPlugin分析这个库，这个库就是我们输出的全局变量。</p>

<p>分析后会生成一个映射关系文件，我们可以配置文件生成的路径</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae530d8cb8ea02?w=783&h=208&f=png&s=11929)


<p>这样打包出来就会多出一个文件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae531b6f5e236e?w=224&h=65&f=png&s=2109)


<p>然后在webpack.common.js中增加一个插件，帮我们处理映射关系，并且目录指向我们生成的json文件，这样他底层就会自动去全局变量中拿vendor。如果映射关系不存在，才会去node_modules中分析代码。</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae5335a217d8da?w=780&h=341&f=png&s=29408)


<p>然后进行打包就能看到效果了</p>

<p>使用前</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae5379b4a7d709?w=234&h=90&f=png&s=3238)


<p>使用后</p>


![](https://user-gold-cdn.xitu.io/2019/5/23/16ae537f34e25a2b?w=330&h=140&f=png&s=5691)


<p>如果有多个映射关系文件，就要配置多份，也可以写成下面这种形式。</p>


![](https://user-gold-cdn.xitu.io/2019/5/26/16af1f398e1cbe55?w=724&h=565&f=png&s=46232)


![](https://user-gold-cdn.xitu.io/2019/5/26/16af1eae5a358c6b?w=324&h=67&f=png&s=1494)


<p>这样node会自动分析dll目录下有几个文件，帮我们自动去添加两个插件。</p>

<h1>6.控制包文件大小</h1>

<p>通过Tree Shaking对冗余代码的删除。配置SplitChunksPlugin对大文件进行拆分，拆分成一些小文件。</p>

<h1>7.thread-loader，parallel-webpack，happypack 多进程打包</h1>

<h2>7.1 ParallelUglifyPlugin</h2>

<p>ParallelUglifyPlugin可以把对JS文件的串行压缩变为开启多个子进程并行执行</p>

<p>首先安装webpack-parallel-uglify-plugin</p>

```
cnpm i -D webpack-parallel-uglify-plugin
```

<p>在plugins中配置</p>

```
new ParallelUglifyPlugin({
    workerCount: 3, //开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1
    uglifyJS: {
        output: {
            beautify: false, //不需要格式化
            comments: false, //不保留注释
        },
        compress: {
            warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        }
    }
})
```

<h2>7.2 HappyPack</h2>

<p>HappyPack就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。 </p>

<p>首先安装happypack</p>

```
cnpm i happypack@next -D
```

<p>在module中配置：</p>


```
module: {
    rules: [{
        test: /\.js$/,
        //把对.js文件的处理转交给id为babel的HappyPack实例
        use: 'happypack/loader?id=babel',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
    }, {
        //把对.css文件的处理转交给id为css的HappyPack实例
        test: /\.css$/,
        use: 'happypack/loader?id=css',
        include: path.resolve(__dirname, 'src')
    }]
}
```

<p>在plugins中配置</p>


```
plugins: [
    //用唯一的标识符id来代表当前的HappyPack是用来处理一类特定文件
    new HappyPack({
        id: 'babel',
        //如何处理.js文件，和rules里的配置相同
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: [
                    "env", "react"
                ]
            }
        }]
    }),
    new HappyPack({
        id: 'css',
        loaders: ['style-loader', 'css-loader'],
        threads: 4, //代表开启几个子进程去处理这一类型的文件
        verbose: true //是否允许输出日子
    })
]
```
 
<h1>8.sourceMap</h1>

<p>结合之前的sourceMap文章，在不同环境用不同的sourceMap打包。</p>

<p>在平常开发中，推荐使用cheap-module-eval-source-map，这样报错提示比较完全，打包速度也比较快。</p>

<p>而线上代码如果也需要map映射的话，推荐使用cheap-module-source-map，这样报错提示会更好一些。</p>


<h1>结语</h1>

<p>除了这些方法，其实还有很多提升打包速度的方法，这需要我们在平常不断的积累，所以我们在日常开发中，要善于总结，把使用到的好的方法都记录下来，为以后的工作打下坚实的基础。</p>