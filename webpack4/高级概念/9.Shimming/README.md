>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.Shimming的作用</h1>
<p>假设我们现在有这样的场景。</p>

<p>index.js代码如下：</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab684020b37f9b?w=364&h=259&f=png&s=14842)


<p>index.ui.js代码如下：</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab68c42b6417d8?w=480&h=110&f=png&s=6785)


<p>如果此时我们直接打包代码，是不能执行的，因为index.ui.js中没有引入jquery，所以不能使用$。不止是本地文件，有可能第三方库中也引用了jquery，但是我们直接去改库的代码是不太现实的。此时，就可以用shimming来解决这个问题。</p>

<h1>2.配置插件</h1>

<p>首先要引入webpack模块，然后配置插件</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab688ae8ee0683?w=626&h=122&f=png&s=16547)


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab688c17612771?w=403&h=254&f=png&s=15407)


<p>插件的意思是：遇到$，就会在模块中引入jquery，把模块名命名为$。即自动帮我们</p>

```
import $ from 'jquery';
```

<p>如果我们现在只想使用lodash中的join方法，还可以这么配置：</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab6942866a279e?w=480&h=167&f=png&s=14382)


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab69571ec350a5?w=413&h=280&f=png&s=16958)


<p>这样配置之后，遇到_join，就会把lodash中的join方法引入到模块中。</p>

<h1>3.Shimming的其他使用方法</h1>

<p>我们在模块中打印this，会发现this并不是window，它指向的是模块本身。</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab697982f69fcd?w=412&h=89&f=png&s=5712)


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab698738a7411a?w=573&h=152&f=png&s=4120)


<p>而我们有时候想让每一个模块的this都指向window，那么改怎么办呢？</p>

<p>这时候就要先安装一个插件</p>

```
cnpm install -D imports-loader
```

<p>然后去对webpack做一些配置</p>


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab69ad8e701a35?w=489&h=323&f=png&s=13186)


![](https://user-gold-cdn.xitu.io/2019/5/14/16ab69b37209c569?w=595&h=146&f=png&s=6267)

