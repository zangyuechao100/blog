>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>
<h1>1. plugins作用</h1>
<p>plugins可以在webpack运行到某个时刻的时候，自动帮我们做一些事情。（有点类似vue和react的生命周期函数）</p>
<h1>2. 自动生成HTML文件</h1>
<p>我们每次打包时，想自动生成HTML文件，需要使用<font background=#fff5f5 color=#ff502c>html-webpack-plugins</font>这个插件。</p>
<p>使用方法，在webpack.config.js中先引入插件，然后在plugins中实例化插件。</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a2657218225b32?w=656&h=71&f=png&s=8145)

![](https://user-gold-cdn.xitu.io/2019/4/16/16a265732299b4e3?w=348&h=99&f=png&s=4304)

<p>这样每次打包结束之后，会自动生成一个html文件，并把打包生成的js自动引入到这个html文件中，有hash值变化也会自动更新。</p>
<p>如果我们想在每次生成的html中加入一些内容，可以这样配置。先新建一个html模板。</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a265b8be44174f?w=863&h=376&f=png&s=26954)

<p>然后在wepack.config.js中增加以下代码：</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a265cd2dc665dd?w=392&h=147&f=png&s=7222)

<p>这样webpack在打包的时候会以src目录下的index.html为模板，并把内容注入到生成的html文件中。</p>
<p>下面为自动生成的html文件。</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a265e2c5aba976?w=846&h=391&f=png&s=32449)

<h1>3. 重新打包时删除dist</h1>
<p>我们每次打包时，想让webpack自动清理dist目录，删除没有用的文件，就需要使用<font background=#fff5f5 color=#ff502c>clean-webpack-plugins</font>这个插件。</p>
<p>使用方法，在webpack.config.js中先引入插件，然后在plugins中实例化插件。</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a2668cc2337158?w=666&h=115&f=png&s=13318)


![](https://user-gold-cdn.xitu.io/2019/4/16/16a267277ee64f60?w=393&h=175&f=png&s=10267)

<p>这样每次打包之前，webpack会使用<font background=#fff5f5 color=#ff502c>clean-webpack-plugins</font>这个插件删除dist目录下的所有内容。</p>

<p>注意：<font background=#fff5f5 color=#ff502c>clean-webpack-plugins</font>在打包之前执行，<font background=#fff5f5 color=#ff502c>html-webpack-plugins</font>在打包后执行。</p>