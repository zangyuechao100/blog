>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>
<h1>1.图片打包</h1>
<p>熟悉webpack配置的前端都知道，loader是webpack用来处理非js文件的，现在我们要在js文件中引入一张图片。</p>


![](http://www.lubilubi.cn/webpack1/blog1-1.png)


<p>直接引入是肯定不行的，需要在webpack.config.js中配置 <font background=#fff5f5 color=#ff502c>file-loader</font>，别忘了要  <font background=#fff5f5 color=#ff502c>npm install file-loader -D</font>。</p>


![](http://www.lubilubi.cn/webpack1/blog1-2.png)


<p>然后运行webpack进行打包。</p>


![](http://www.lubilubi.cn/webpack1/blog1-3.png)


<font background=#fff5f5 color=#ff502c>file-loader</font>会自动打包处理jpg文件，并且放到输出的目录中。
<br>
<br>
注：console.log的结果就是打包后图片的名称。
<h1>2.打包图片名称</h1>
如果我们想要让打包出来的图片名称和引入名称相同，要怎么做呢？
<br>
<br>
这时候我们就需要去loader中添加一些额外的配置了。


![](http://www.lubilubi.cn/webpack1/blog1-4.png)


<br>
options中，[name]代表源文件名称，[ext]代表源文件后缀，这样打包出来的文件就和原来的文件名称相同了。


![](http://www.lubilubi.cn/webpack1/blog1-5.png)


<br>
这种配置的语法叫做placeholder，也叫占位符。占位符的种类还有很多，比如[hash]等，具体可以去看webpack的官网(https://webpack.js.org/loaders/file-loader/#placeholders)。
<br>
<br>
我们可以再给图片加一个hash值。


![](http://www.lubilubi.cn/webpack1/blog1-6.png)


<br>
运行webpack打包后的结果


![](http://www.lubilubi.cn/webpack1/blog1-7.png)


<br>
当然，file-loader不只可以打包jpg文件，还可以打包png等文件。


![](http://www.lubilubi.cn/webpack1/blog1-8.png)


<br>
<h1>3.图片打包目录</h1>
我们可以在output中配置文件打包的目录，也可以在loader的options中单独配置图片的打包目录


![](http://www.lubilubi.cn/webpack1/blog1-9.png)


<br>
运行webpack打包后的结果


![](http://www.lubilubi.cn/webpack1/blog1-10.png)


<br>
这时候图片已经被打包到images文件夹中。
<h1>4.url-loader</h1>
提到 <font background=#fff5f5 color=#ff502c>file-loader</font> 就会想到 <font background=#fff5f5 color=#ff502c>url-loader</font> ，<font background=#fff5f5 color=#ff502c>url-loader</font>可以实现 <font background=#fff5f5 color=#ff502c>file-loader</font> 的功能，那他们有什么区别呢?


![](http://www.lubilubi.cn/webpack1/blog1-11.png)


<br>
区别在于 <font background=#fff5f5 color=#ff502c>url-loader</font> 会把图片转为base64，而不是单独打包出一张图片。
<br>
<br>
好处是图片打包在js文件中，页面不需要额外发送一次http请求，而缺点是如果图片很大的话，js文件就会很大，会导致js加载变慢，页面出现空白的情况。所以当图片比较小的时候适合用 <font background=#fff5f5 color=#ff502c>url-loader</font>。
<br>
<br>
<h1>5.url-loader最佳实践</h1>


![](http://www.lubilubi.cn/webpack1/blog1-12.png)


<br>
意思是如果图片超过204800个字节（200kb），就使用和<font background=#fff5f5 color=#ff502c>file-loader</font>相同的方式进行打包。
<br>
如果图片小于204800个字节（200kb），就使用base64方式进行打包。
