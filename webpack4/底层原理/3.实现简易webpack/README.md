>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.如何编写简单的plugin</h1>

<p>首先初始化项目</p>

```
npm init -y
```

<p>新建一个src目录，里面有一个index.js</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b466da79354adc?w=437&h=143&f=png&s=6095)


<p>安装webpack</p>

```
cnpm install -D webpack webpack-cli
```

<p>编写webpack配置。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b4670052b92b3a?w=614&h=369&f=png&s=22673)


<p>在package.json中配置命令行</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b467048fad5d8a?w=353&h=448&f=png&s=20708)


<p>现在我们想在打包结束后，在dist目录中生成一个版权文件，要怎么做呢？</p>

<p>首先，在src同级目录下新建一个plugins的目录，然后在新建一个copyright-webpack-plugin.js，在这个文件里写js。</p>

<p>loader导出的是一个函数，而plugin是一个类。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46788e66434b2?w=554&h=304&f=png&s=15819)


<p>插件被执行的时候，会首先执行apply这个方法，它接受一个参数compiler，是webpack实例。</p>

<p>然后在配置中使用我们的插件。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b469b7d644280f?w=888&h=484&f=png&s=31129)


<p>这也是插件使用过程中，需要new的原因。</p>

<p>有时候插件可以传参，我们就可以通过constructor的参数接收。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b469fc94e257fc?w=399&h=152&f=png&s=6530)




![](https://user-gold-cdn.xitu.io/2019/6/11/16b46a041168cfaf?w=530&h=313&f=png&s=16873)



![](https://user-gold-cdn.xitu.io/2019/6/11/16b46a0f9f947a4a?w=383&h=210&f=png&s=9207)


<p>再回头来写插件。</p>

<p>compiler有许多钩子，compiler.hooks.emit代表生成资源到output目录之前的钩子。因为这是一个异步操作，所以后面跟着一个tapAsync</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46af12b5aa9c3?w=958&h=368&f=png&s=26239)


<p>compilation里面有一个assets，包括本次打包生成的资源，现在已经有一个main.js，我们再添加一个copyright.txt，source代表文件中的内容，size代表文件大小，然后最后要调用cb()这个函数。</p>

<p>查看打包生成的文件。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46b319d79e750?w=226&h=219&f=png&s=6617)


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46b32aaef4410?w=311&h=137&f=png&s=2162)


<p>如果写同步，就需要这么写。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46c28c84315ec?w=925&h=448&f=png&s=34089)


<p>同步的钩子后面只接tap就可以了，并且不用手动调用cb。</p>


<p>开发过程中，我们怎么快速知道compiler里面都包括什么内容？可以开启调试模式。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46b9438a44c85?w=629&h=132&f=png&s=9215)


<p>其实这个命令和npm run build没有区别，但是我们用node就可以传递参数。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46beb22010500?w=865&h=142&f=png&s=11339)


<p>加完参数后，运行npm run debug，打开浏览器，打开控制台，会发现多了一个webpack操作按钮。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46c07b069a09c?w=366&h=75&f=png&s=4449)


<p>点击后会出现webpack打包过程的调试界面。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46c092655ae06?w=913&h=1008&f=png&s=87557)


<p>现在我们去手动打一个断点。</p> 


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46c301309fb87?w=886&h=481&f=png&s=34118)


<p>然后重新执行npm run debug，执行相同的步骤。</p>

<p>默认会处在第一个断点，然后执行下一个断点就会来到我们手动打的断点中。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46c59223fa47b?w=537&h=493&f=png&s=19075)


<p>这样就可以快速看到compilation包括什么内容了。</p>


![](https://user-gold-cdn.xitu.io/2019/6/11/16b46c5e11429fc8?w=369&h=318&f=png&s=17844)


<p>具体的还是需要去官网，对照着看才可以深入使用。</p>
