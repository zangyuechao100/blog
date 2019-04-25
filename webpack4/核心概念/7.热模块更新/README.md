>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>
<h1>1.没有热模块更新时的情况</h1>
<p>我们创建一个js，动态的创建一个按钮，点击一次，在页面上加一个div。（因为这时候没有用babel，所以写es5语法）</p>

![](https://user-gold-cdn.xitu.io/2019/4/25/16a54ac1e8f50c48?w=647&h=311&f=png&s=26156)

<p>引入一个css，里面写关于div的样式。</p>

![](https://user-gold-cdn.xitu.io/2019/4/25/16a54abfdc67116a?w=405&h=123&f=png&s=6307)

<p>这时，我们改变了css，比如把yellow改成blue，页面就会刷新，然后我们要重新添加div才能看到效果，那有没有办法可以让已经渲染的dom节点还存在呢？</p>
<h1>2.HMR（hot module replacement）</h1>
<p>我们在<font background=#fff5f5 color=#ff502c>webpack.config.js</font>的devServer中，开启<font background=#fff5f5 color=#ff502c>hot:true</font>,<font background=#fff5f5 color=#ff502c>hotOnly:true</font>。</p>

![](https://user-gold-cdn.xitu.io/2019/4/25/16a54b0f03267d03?w=349&h=228&f=png&s=8659)

<p><font background=#fff5f5 color=#ff502c>hotOnly:true</font>的意思是，即使HMR不生效，浏览器也不自动刷新。</p>

<p>然后我们引入一个插件，这个插件是webpack自带的插件，所以先引入webpack，然后在plugins中新增一个插件<font background=#fff5f5 color=#ff502c>new webpack.HotModuleReplacementPlugin()</font>。</p>


![](https://user-gold-cdn.xitu.io/2019/4/25/16a54b41c199a834?w=675&h=136&f=png&s=16662)


![](https://user-gold-cdn.xitu.io/2019/4/25/16a54b43436d11c5?w=561&h=205&f=png&s=14504)

<p>这里注意如果利用webpack-dev-server cli 并且加了--hot 这个选项，就不要在这里加入new webpack.HotModuleReplacementPlugin()这个插件了，否则会报Maximum call stack size exceeded错误。</p>

<p>不止是css变化会更新，js变化也是可以更新的。</p>

<p>我们创建两个js，在index中引入。</p>

![](https://user-gold-cdn.xitu.io/2019/4/25/16a54de3f4f6ed7b?w=444&h=166&f=png&s=7797)

<p>add.js可以累加div中的数值。</p>


![](https://user-gold-cdn.xitu.io/2019/4/25/16a54e3df3a4ee18?w=638&h=267&f=png&s=21562)

<p>num.js是一个固定的值。</p>

![](https://user-gold-cdn.xitu.io/2019/4/25/16a54de654367a8b?w=572&h=161&f=png&s=12711)

<p>没有引入热模块更新时，改变num.js中的值，也会导致add.js归0，所以我们要引入热模块更新，但是按照上文配置完后，改变num.js发现页面并没有更新，是因为我们少写了一些代码。</p>

![](https://user-gold-cdn.xitu.io/2019/4/25/16a54e57328f60a5?w=936&h=361&f=png&s=36558)

<p>所以在JS中，想让模块之间互不影响，就需要<font background=#fff5f5 color=#ff502c>module.hot</font>和<font background=#fff5f5 color=#ff502c>module.hot.accept</font>来进行HMR。</p>

<p>那为什么css就不需要写<font background=#fff5f5 color=#ff502c>module.hot</font>和<font background=#fff5f5 color=#ff502c>module.hot.accept</font>呢？实际上，css中也需要使用这两个方法，只不过css-loader帮我们写好了。vue中帮我们把js中的HMR也写好了，就不需要我们手动写了。</p>