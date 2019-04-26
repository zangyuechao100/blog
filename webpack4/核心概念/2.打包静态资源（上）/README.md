>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>
<h1>1.静态资源打包</h1>
<h2>1.1 引入css样式文件</h2>
<p>当我们的项目中引入css文件的时候，需要对webpack进行配置，用来打包css文件。css的loader是<font background=#fff5f5 color=#ff502c>css-loader</font>和<font background=#fff5f5 color=#ff502c>style-loader</font>。</p>
<p><font background=#fff5f5 color=#ff502c>css-loader</font>的作用是：帮我们分析出几个css之间的关系，最终把几个css文件合并成一个css。</p>
<p><font background=#fff5f5 color=#ff502c>style-loader</font>的作用是：得到css-loader生成的css内容后，style-loader会把内容挂载到head上。</p>
<p>所以style-loader和css-loader要配合使用。</p>

![](https://user-gold-cdn.xitu.io/2019/4/15/16a211a9035ef07b?w=605&h=223&f=png&s=18288)

![](https://user-gold-cdn.xitu.io/2019/4/15/16a211de3c347323?w=479&h=486&f=png&s=20869)

<br>
<h2>1.2 引入scss样式文件</h2>

![](https://user-gold-cdn.xitu.io/2019/4/15/16a2124e64b1f5c8?w=607&h=242&f=png&s=18439)



![](https://user-gold-cdn.xitu.io/2019/4/15/16a2133b8a3e5b88?w=686&h=495&f=png&s=22338)

<br>
<p>注意：使用scss要安装<font background=#fff5f5 color=#ff502c>sass-loader</font>和<font background=#fff5f5 color=#ff502c>node-sass</font>。</p>
<h2>1.3 自动补充厂商前缀</h2>
css3属性一般都会加常上前缀，而<font background=#fff5f5 color=#ff502c>postcss-loader</font>可以自动帮我们添加厂商前缀。
<p>使用方法：在<font background=#fff5f5 color=#ff502c>webpack.config.js</font>同级目录新建一个<font background=#fff5f5 color=#ff502c>postcss.config.js</font></p>

![](https://user-gold-cdn.xitu.io/2019/4/15/16a21358d40f25c0?w=381&h=161&f=png&s=6051)

![](https://user-gold-cdn.xitu.io/2019/4/15/16a21360adeec276?w=849&h=490&f=png&s=23386)

<br>
<h1>2.loader的执行顺序</h1>
<p>loader执行顺序是：从下到上，从右到左。</p>
<p>以上面scss作为例子，sass-loader先执行，对scss文件进行翻译，翻译为css代码后给到css-loader，都处理好了之后，由style-loader挂载到页面上。</p>