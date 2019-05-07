>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.为什么要进行Code Splitting</h1>
<p>我们先举一个例子，在index.js中引入lodash。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a90155ed038d33?w=505&h=134&f=png&s=5577)


<p>然后进行打包，我们会发现按照以前的配置，会把lodash和我们的业务代码打包到一起，这其实会有问题：</p>
<p>用户第一次进入页面，会加载main.js(假如是2MB)，当业务逻辑发生变化，重新打包上线后，用户进入页面又要重新加载2MB的文件，就会造成浪费。lodash这个库在我们开发过程中，基本不会去改变里面的内容，所以应该把这部分代码单独生成一个js文件，这样业务逻辑变化就不会影响到lodash的代码了。</p>

<h1>2.初步Code Splitting</h1>
<p>我们新建一个lodash.js，然后在里面引入lodash，并且挂在到window上，然后index.js直接调用lodash的方法。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a90210b3b34081?w=351&h=94&f=png&s=2901)


![](https://user-gold-cdn.xitu.io/2019/5/7/16a902124629280f?w=549&h=102&f=png&s=3997)


<p>重新配置entry和output:</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a902bdc2baca79?w=452&h=197&f=png&s=8999)


<p>重新进行打包，会有两个JS文件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a902c217ee12c0?w=204&h=89&f=png&s=2548)


<p>在这种情况下，用户第一次进入页面，加载两个JS，业务逻辑发生变化重新打包后，lodash.js并不需要重新加载，节约了资源，也节省了一部分时间。</p>

<h1>3.利用webpack做Code Splitting</h1>

<p>首先重新引入lodash库</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a9235026b77cbc?w=451&h=78&f=png&s=5378)


<p>然后在webpack.config.js中添加配置项</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a9235a9b922e35?w=280&h=152&f=png&s=3620)


<p>进行打包，观察打包的文件，除了main.js，还多生成了一个vendor.js文件，我们观察main和vendor发现，main.js里面只有业务逻辑，而vendor里面只有lodash的代码。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a923b2ef06a6f8?w=323&h=160&f=png&s=4092)


<p>使用这个配置项，webpack自动帮我们进行了代码分割。</p>

<h1>4.动态引入库</h1>

<p>新建一个js文件，增加如下代码。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a924f8a8bbf2c9?w=586&h=311&f=png&s=22112)


<p>但是现在webpack对动态引入处于实验性阶段，所以想要打包还要安装一个插件。</p>
<p>cnpm install babel-plugin-dynamic-import-webpack -D</p>
<p>在.babelrc中增加如下配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a9248aa69ac9fb?w=474&h=251&f=png&s=11735)


<p>进行打包，打包后发现生成这些文件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a9249fdee84259?w=262&h=120&f=png&s=2864)

 
<p>这时，lodash的代码都在0.js中，所以webpack不仅能分割同步引入的代码，还可以分割异步引入的代码。</p>
