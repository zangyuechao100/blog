>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.多页面应用打包</h1>

<p>我们在开发中，有时候可能会遇到多页面打包，那么多页面打包要如何配置呢？</p>

<p>假设我们现在有两个页面，对应两个js，一个叫index.js，另一个叫list.js。</p>

<p>首先，入口配置要改一下：</p>


![](https://user-gold-cdn.xitu.io/2019/6/3/16b1d23e88b2bdda?w=389&h=172&f=png&s=7574)


<p>然后修改htmlWebpackPlugin插件：</p>


![](https://user-gold-cdn.xitu.io/2019/6/3/16b1d4737de97ab1?w=518&h=365&f=png&s=27753)


<p>这样会生成两个html文件，用的模板都是index.html，第一个html叫index.html，chunks代表需要引入的js文件，分别是runtime.js，vendors.js，main.js。另一个list.html，引入的js分别为runtime.js，vendors.js，list.js。</p>

<p>如果需要多增加一个页面，可以去多增加一个HtmlWebpackPlugin，然后做相应的配置。</p>

<p>有没有方法可以增加一个页面的时候，不需要复制粘贴呢？</p>

<p>我们先把module.exports输出的对象设置为一个变量</p>

 
```
const configs = {
    // ... 配置项
}

module.exports = configs
```

<p>然后创建一个函数</p>


![](https://user-gold-cdn.xitu.io/2019/6/3/16b1d721555f1008?w=943&h=796&f=png&s=75248)


<p>获取有几个入口文件，不同入口文件创建对应的html文件，引入对应的js。</p>