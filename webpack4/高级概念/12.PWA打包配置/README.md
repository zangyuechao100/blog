>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.PWA</h1>

<p>我们安装一下http-server，可以帮我们启动一个本地的服务，模拟线上环境。</p>


![](https://user-gold-cdn.xitu.io/2019/5/16/16ac0dd0864357d6?w=719&h=154&f=png&s=14254)


<p>http-server dist的意思是：根据dist目录启动一个本地服务。</p>

<p>启动之后，我们就可以正常访问页面了。此时如果断开服务，就会出现无法访问此网站。</p>


![](https://user-gold-cdn.xitu.io/2019/5/16/16ac0e2de99a7b86?w=449&h=539&f=png&s=11982)


<p>而PWA的作用就是，在断网的情况下，依然可以访问这个网站。</p>

<h1>2.配置方法</h1>

<p>我们可以根据现有的webpack插件来实现，首先安装插件</p>

```
cnpm install -D workbox-webpack-plugin
```

<p>然后引入插件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/16/16ac0e30d90be03f?w=901&h=155&f=png&s=28415)


<p>然后在插件中配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/16/16ac0f7099f07e5a?w=446&h=284&f=png&s=17690)


<p>然后进行打包，会发现打包的文件多了两个js。</p>


![](https://user-gold-cdn.xitu.io/2019/5/16/16ac0f87c9be02d9?w=296&h=188&f=png&s=9376)


<p>这两个文件是用来帮我们实现PWA的。现在还需要写一些业务代码。</p>


![](https://user-gold-cdn.xitu.io/2019/5/16/16ac11a6bbd52e07?w=1008&h=367&f=png&s=31959)


<p>再次重新打包后，启动http-server，会发现现在页面已经被缓存了。</p>


![](https://user-gold-cdn.xitu.io/2019/5/16/16ac11c37c938724?w=288&h=163&f=png&s=5070)


<p>断开服务器，再打开页面，发现页面已经被缓存了。这只是很基础的配置，如果需要更好的使用，还是要去做更多的了解。</p>