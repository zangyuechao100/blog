>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.Babel</h1>
<p>我们现在日常开发中，基本都会使用ES6语法，但是老版本浏览器不支持ES6语法，会报错，所以我们需要使用Babel来处理ES6语法。</p>

![](https://user-gold-cdn.xitu.io/2019/4/28/16a63ae83824bad6?w=378&h=225&f=png&s=11606)

<p>我们先在js中写一些ES6的语法，不经过babel处理就进行打包，我们会发现生成的文件里面仍然是ES6语法，在这种情况下，我们就需要借助babel。</p>

<p>使用之前，需要安装<font background=#fff5f5 color=#ff502c>babel-loader</font>和<font background=#fff5f5 color=#ff502c>babel/core</font>, cnpm install --save-dev babel-loader @babel/core。</p>

<p>安装完之后，在webpack.config.js里面加一个loader,<font background=#fff5f5 color=#ff502c>exclude: /node_modules/</font>意味着，第三方库不用babel-loader进行转换。</p>

![](https://user-gold-cdn.xitu.io/2019/4/28/16a643eeff3280ef?w=360&h=138&f=png&s=6664)

<p>babel-loader不会转换es6语法，它只是起到了一个连通webpack和babel的作用，还需要借助其他模块才能转换语法，也就是babel/preset-env，它包含了所有es6转换es5语法的规则。

<p><font background=#fff5f5 color=#ff502c>cnpm install @babel/preset-env --save-dev</font></p></p>

<p>然后加一个配置。</p>

![](https://user-gold-cdn.xitu.io/2019/4/28/16a6444dff3bb81b?w=467&h=214&f=png&s=11236)

<p>但是abel/preset-env还不完全，Promise等还没有被转换，所以还要做一个补充，要安装babel-polyfill。</p>

<p><font background=#fff5f5 color=#ff502c>cnpm install @babel/polyfill --save</font></p>

<p>安装之后，要在代码中引入@babel/polyfill。</p>

![](https://user-gold-cdn.xitu.io/2019/4/28/16a6449ef9d2d017?w=361&h=279&f=png&s=13628)

<p>然后再进行webpack打包，生成文件内就已经是es5语法了。但是用这种方式，会把没有用到的方法和对象一起打包，造成资源上的浪费，所以我们可给babel/preset-env增加一个参数，只打包用到的语法。</p>

![](https://user-gold-cdn.xitu.io/2019/4/28/16a64500ea0c43c1?w=497&h=276&f=png&s=13751)

<p>babel/preset-env会污染全局，所以在开发库的时候不适用，这时候就需要@babel/plugin-transform-runtime了。</p>

<p><font background=#fff5f5 color=#ff502c>cnpm install @babel/plugin-transform-runtime --save-dev</font></p>

<p><font background=#fff5f5 color=#ff502c>cnpm install @babel/runtime-corejs2 --save</font></p>

<p><font background=#fff5f5 color=#ff502c>cnpm install @babel/runtime --save</font></p>

<p>然后增加几个配置。</p>

![](https://user-gold-cdn.xitu.io/2019/4/28/16a6494887d82d53?w=591&h=354&f=png&s=19769)

<h1>2.  .babelrc</h1>

<p>上面配置的方式会让webpack.config.js内容过于冗长，所以我们可以把配置拿到.babelrc文件中。</p>


![](https://user-gold-cdn.xitu.io/2019/4/28/16a649aafa8aef43?w=614&h=223&f=png&s=12890)


![](https://user-gold-cdn.xitu.io/2019/4/28/16a649b30707d9a2?w=383&h=135&f=png&s=6632)

