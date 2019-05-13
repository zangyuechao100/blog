>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.浏览器缓存</h1>

<p>先新建一个js，里面的代码如下。</p>


![](https://user-gold-cdn.xitu.io/2019/5/13/16ab1a90446b3c42?w=320&h=245&f=png&s=13411)


<p>打包后的结果如下</p>


![](https://user-gold-cdn.xitu.io/2019/5/13/16ab1a9952cd6b32?w=293&h=116&f=png&s=2864)


<p>此时，用户首次进入页面后，main.js和vendor.chunk.js会被浏览器缓存起来，这样用户第二次进页面，就不用重新下载js了，但是这样会造成一个问题，我们没有加hash值，所以如果js发生变化，用户不强制刷新的话，代码时不会被更新的。</p>

<h1>2.contenthash</h1>

<p>我们给output文件名加上contenthash，意思是如果文件内容发生变化，hash值才会改变。</p>


![](https://user-gold-cdn.xitu.io/2019/5/13/16ab1ad8eaaf8328?w=574&h=178&f=png&s=13079)


<p>打包后的文件也会加上hash值。</p>


![](https://user-gold-cdn.xitu.io/2019/5/13/16ab1affc2d5cc72?w=297&h=139&f=png&s=6269)


<p>如果对应文件源代码没有改变，那么文件名称不会发生任何变化。但是一些老版本的webpack可能会发生没改变代码，但是hash值也发生变化的情况，这时候就要去加一个配置。在optimization中加一个runtimeChunk。</p>


![](https://user-gold-cdn.xitu.io/2019/5/13/16ab1b7e6ae63a60?w=528&h=179&f=png&s=9402)


<p>这样打包出会多一个runtime.js文件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/13/16ab1b8d3393fc2e?w=292&h=174&f=png&s=8311)


<p>webpack在打包时，会把库和业务代码之间的关系做manifest，它既存在于业务代码(main.js)，也存在于库中(vendor.js)，在旧版webpack中，mainfest在每次打包的时候的时候可能会变化，所以contenthash值也会跟着变化。配置runtimeChunk后，会把manifest提取到runtime中，这样打包就不会影响到其他js了。</p>