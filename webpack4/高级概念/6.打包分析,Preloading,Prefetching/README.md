>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.打包分析</h1>
<p>根据官方文档，我们可以使用命令行配置webpack --profile --json > stats.json，把打包过程的描述生成到stats.json中。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9c8a3bef8b064?w=958&h=38&f=png&s=6287)


<p>然后进行一次打包。打包完成后，我们会发现目录下多了一个stats.json，这个文件就是对打包过程的描述，如果我们看描述文件去分析打包流程会比较麻烦，所以我们要借助一些工具来分析。</p>
<p>进入到http://webpack.github.com/analyse，上传刚刚生成的json文件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9c8e8046ee70c?w=1906&h=495&f=png&s=38101)


<p>会出现图示中的信息，显示了webpack版本是4.30.0，打包耗时20702毫秒，hash值，以及引用了46个modules，生成了2个chunk，生成了5个静态文件，没有警告和异常。</p>

<p>点击modules，还可以看到包之间的关系。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9c91d740e7c82?w=645&h=504&f=png&s=56043)


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9c91f61bbab0e?w=1915&h=414&f=png&s=61132)


<p>除了这个工具，文档中还提供了几个其他的工具。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9ca500c566be6?w=729&h=282&f=png&s=23665)


<p>如果需要使用的话，就可以看对应文档，进行使用。</p>

<h1>2.Preloading</h1>

<p>这里介绍一下谷歌浏览器Coverage工具</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cc940b3b28b0?w=498&h=438&f=png&s=20395)


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cc9580570feb?w=1919&h=195&f=png&s=13273)


<p>从这个工具中可以看到我们页面js的使用率，而使用异步引入js的方式可以提高js的使用率，所以webpack建议我们多使用异步引入的方式，这也是splitChunks.chunks的默认值是"async"的原因。</p>

<p>但是异步引入代码时也可能存在问题，比如用户点击一个按钮，弹出登录框，我们在点击之后加载登录框的js，可能会让这个点击行为反应变慢，那么如何解决这个问题呢？</p>

<p>使用魔法注释 /* webpackPrefetch: true */ ，这样在主要js加载完，带宽有空闲时，会自动下载需要引入的js。</p>


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cd3c31906e6d?w=942&h=166&f=png&s=13765)


![](https://user-gold-cdn.xitu.io/2019/5/9/16a9cd3de7bfced1?w=575&h=222&f=png&s=14787)

<p>还可以写成/* webpackPreload: true */，区别是webpackPrefetch会等到主业务文件加载完，带宽有空闲时再去下载js，而preload是和主业务文件一起加载的。</p>