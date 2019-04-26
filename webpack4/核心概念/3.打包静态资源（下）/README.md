>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>
<h1>1.配置css-loader</h1>
<h2>1.1 importLoaders</h2>
<p>我们在scss文件中再引入一个scss。</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a26203380ffa4a?w=468&h=222&f=png&s=11900)

<p>此时webpack在打包的时候有可能就不经过postcss-loader和sass-loader。所以我们要添加options。</p>


![](https://user-gold-cdn.xitu.io/2019/4/16/16a262268fbf1265?w=363&h=380&f=png&s=13240)

<p>importLoaders:num 这里的数量指的是当前loader之后loader的数量</p>
<p>importLoaders:2 的意思是：引入的scss文件也要进行postcss-loader和sass-loader的过程。</p>

<h1>2.css模块化</h1>
<p>我们之前引入css的方法会作用于全局，可能会影响到其他模块的样式，所以我们引入了css模块化的概念。</p>
<p>比如：我们动态创建一个img标签，添加到body中，再引入一个js方法，把相同的逻辑写到里面并调用，这样body中就会有两个img标签，而之前引入css的方式会作用两个标签。</p>



![](https://user-gold-cdn.xitu.io/2019/4/16/16a263000a01276f?w=663&h=286&f=png&s=21765)

![](https://user-gold-cdn.xitu.io/2019/4/16/16a262efaa7f222f?w=645&h=309&f=png&s=22233)

<p>现在我们在options中添加一个modules的配置项。</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a26315bb686b36?w=302&h=324&f=png&s=10948)

<p>引入css的方式变为：</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a262e870fbceb1?w=657&h=324&f=png&s=25148)

<p>这样css样式就只会影响单独的模块，和其他的模块不会有任何的冲突。</p>

<h1>3.打包字体文件</h1>
<p>引用阿里iconfont文件时，css中会引用字体文件，而webpack并不认识字体文件，所以需要使用file-loader。</p>

![](https://user-gold-cdn.xitu.io/2019/4/16/16a264596ad6e0b1?w=306&h=159&f=png&s=6279)

<p>然后再进行webpack打包就不会有任何问题了。</p>