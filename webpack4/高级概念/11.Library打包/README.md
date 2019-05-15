>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.Library打包</h1>
<p>我们之前打包都是在项目中打包，如果我们想开发一个库，要怎么打包呢？</p>
<p>现在我们就模拟开发一个库，首先npm init -y，创建package.json，然后写两个js，里面写两个简单的函数，然后在index.js中引入这两个函数。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abb83c56d495bd?w=514&h=411&f=png&s=23552)


![](https://user-gold-cdn.xitu.io/2019/5/15/16abb83d45806e40?w=400&h=115&f=png&s=5566)


![](https://user-gold-cdn.xitu.io/2019/5/15/16abb83b36a28ec1?w=514&h=140&f=png&s=10968)


<p>安装webpack和webpack-cli。</p>


```
cnpm install --save webpack webpack-cli
```

<p>创建webpack.config.js，写入配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abb89920a2f8a6?w=571&h=275&f=png&s=19400)


<p>当别人使用我们的库的时候，引入方式有可能是CMD，AMD，ES6三种方式，所以我们加一个配置项。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abb8c929926803?w=572&h=314&f=png&s=19024)


<p>有时候，还有可能利用script标签引入js，这时候就需要再增加一个配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abb8e4e0854897?w=576&h=169&f=png&s=10902)


<p>这样，webpack就帮我们生成了一个全局变量library，就没有任何问题了。</p>

<h1>2.library和libraryTaget</h1>

<p>这两个属性可以配合使用，比如这种情况：</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abb9517171723e?w=517&h=166&f=png&s=10777)


<p>这个组合的意思是，生成一个全局变量，挂载到this上，这时候，就不能用MD，AMD，ES6三种方式引入库了。还可以写成window，global。</p>

<h1>3.引入第三方库</h1>

<p>如果我们的库引入第三方库lodash，而用户使用我们的库的时候，又引入了lodash，这样打包出来的代码就会包括两份lodash，所以我们要增加一个配置来解决这个问题。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abba0779c34acc?w=555&h=312&f=png&s=19343)


<p>这样打包的时候，就不会把lodash打包到我们的库中，但是在使用的过程中，需要手动引入lodash。</p>

<p>externals除了数组，还可以写成对象。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abba3fffc93848?w=571&h=421&f=png&s=23291)


<p>这个意思是，如果使用我们代码的环境是commonjs，lodash加载的时候，名字必须为lodash。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abba6c368cd5d4?w=362&h=159&f=png&s=5976)


<p>root: '_'的意思是，如果通过script标签方式引入，就必须在全局注册一个下划线变量</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abba89f63354e6?w=285&h=87&f=png&s=3319)


<p>最后一种方式的意思是，无论用哪一个方式引入，都命名为lodash。</p>

<p>其实真正写一个库的打包配置很麻烦，还包括了一些按需引用的功能，我们只是做了一个初步的了解，等真正要打包库的时候，再作深入了解。</p>

<p>如果我们想让别人很方便引用我们的库，还需要做一些配置，在package.json里面，把main入口配置成我们打包生成的文件。</p>


![](https://user-gold-cdn.xitu.io/2019/5/15/16abbad56fa36441?w=395&h=469&f=png&s=22899)

<p>库写完了后，可以去npm官网申请账号登录后，在本地命令行中输入</p>


```
npm adduser
```

<p>会让我们输入账号和密码，添加完之后，可以运行</p>


```
npm publish
```

<p>这样就会把代码发到npm仓库中，别人使用的时候，npm安装就可以使用了。</p>