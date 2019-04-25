>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<p>现在我们总是通过npx webpack或者通过配置package.json来重新打包，有没有方法可以监听js变化，自动打包呢？答案是肯定的，接下来我们就尝试配置自动打包。</p>
<h1>1. --watch</h1>
<p>我们可以在<font background=#fff5f5 color=#ff502c>package.json</font>的scripts中配置命令，达到npx webpack的目的。然后，在命令后面，加一个<font background=#fff5f5 color=#ff502c>--watch</font>。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4fc37362bdbc6?w=432&h=217&f=png&s=10836)

<p>这样webpack会帮我们监听打包的文件，只要打包的文件发生变化，就自动重新打包。</p>

<p>但如果我们想运行命令后，自动帮我们打开浏览器，可以模拟服务器的特性，就需要webpackDevServer了。</p>

<h1>2.webpackDevServer</h1>


<p>首先要安装webpackDevServer<font background=#fff5f5 color=#ff502c>(cnpm install webpack-dev-server -D)</font>，然后在webpack.config.js中配置devServer。</p>
<h2>2.1 contentBase</h2>

<p>contentBase是指服务器启动在哪一个文件夹下。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4fcaff33ac1ff?w=378&h=120&f=png&s=4021)

<p>然后在package.json中写一个脚本，后面加上<font background=#fff5f5 color=#ff502c>-dev-server</font>。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4fcc847d73942?w=411&h=205&f=png&s=10909)

<p>这样每次文件被更改时，webpack都会自动感知到文件变化，帮我们重新启动服务器，而且通过这种方式，webpack会自动帮我们刷新浏览器，提升开发效率。</p>

<h2>2.2 open</h2>
<p>devServer中，可以加一个属性<font background=#fff5f5 color=#ff502c>open: true</font>，这样webpack会自动帮我们打开浏览器，并自动访问服务器启动的地址。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4fd3b77db597c?w=351&h=134&f=png&s=4973)

<p>为什么要启动服务器呢？因为如果我们要发ajax请求的话，不能通过file协议来发送，需要通过http协议来发送请求，所以就需要来启动一个服务器。</p>

<h2>2.3 proxy</h2>
<p>在Vue中可以通过devServer中的proxy来设置跨域，也是因为devServer可以通过转发来解决跨域。</p>

<h2>2.4 port</h2>
<p>端口号默认是8080，我们可以通过修改port来修改端口号。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4fda911c08f7a?w=366&h=168&f=png&s=6330)

<p>当然，devServer的配置项远远不止这些，可以参阅官方文档，在项目中有需要的时候再去配置。</p>
<h1>3.自己实现devServer的功能</h1>
<p>早期webpackDevServer不成熟的时候，很多框架是自己实现了一套启动服务器的功能。下面，我们也实现一个简单的devServer。</p>
<p>我们利用node的<font background=#fff5f5 color=#ff502c>express</font>和webpack的中间件<font background=#fff5f5 color=#ff502c>webpack-dev-middleware</font>，所以先安装express和webpack-dev-middleware。</p>
<p>然后创建在webpack.config.js同级目录下创建server.js，并在package.json里面加一条命令。</p>

![](https://user-gold-cdn.xitu.io/2019/4/25/16a54712688cba09?w=404&h=131&f=png&s=7838)

<p>在webpack.config.js中，output加一个配置项，<font background=#fff5f5 color=#ff502c>publicPath: '/'</font>，把所有打包资源的路径改为根路径,然后开始编写server.js。</p>

```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); // 引入中间件
const config = require('./webpack.config.js'); // 引入webpack.config.js
const compiler = webpack(config); // 引入webpack编译器

// 创建服务器实例
const app = express();

/* 
 * 只要文件发生变化，compiler就会重新运行，
 * 打包输出内容的publicPath就是webpack.config.js里面的publicPath
 */
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.listen(3000, () => {
    console.log('server is running');
})
```
<p>然后在控制台中运行<font background=#fff5f5 color=#ff502c>npm run self</font>,打开localhost:3000,我们可以尝试，每次修改源代码后，刷新页面，就可以看到修改后的效果了。</p>