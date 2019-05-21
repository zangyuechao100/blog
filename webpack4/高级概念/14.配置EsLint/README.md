>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.使用EsLint约束代码</h1>

<p>首先要安装EsLint。</p>

```
cnpm install -D eslint
```

<p>然后生成一个配置文件。</p>

```
npx eslint --init
```

<p>我们可以通过这行命令来检测我们src中代码是否符合规范。</p>

```
npx eslint src
```


![](https://user-gold-cdn.xitu.io/2019/5/21/16ada1ed04bcf0f3?w=385&h=118&f=png&s=5619)


![](https://user-gold-cdn.xitu.io/2019/5/21/16ada20105961c08?w=535&h=517&f=png&s=29783)


<p>如果有很多报错，我们每一行都读报错，每一个文件去修改，会变得很麻烦，所以我们可以利用vscode装一个插件，eslint这个插件。这样编辑器就会自动帮我们把不合规范的代码标红。</p>

<p>有时候我们不想遵循某个规则，可以通过rules跳过这条规则。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16ada28ff486b80c?w=658&h=167&f=png&s=10034)


<p>编辑器会提示我们，这是依据哪一条规则提示报错，我们就可以拷贝这条规则，在rules配置一下。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16ada2a5e9911d68?w=477&h=503&f=png&s=26292)


<p>这样就不会在报红了。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16ada2a9f82163c5?w=307&h=144&f=png&s=5191)


<p>如果在某些规则中，不能使用document，需要在.eslintrc.js中增加一个配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16ada2f1c281a95b?w=493&h=559&f=png&s=28006)


<h1>2.webpack中配置EsLint</h1>

<p>首先要安装一个loader。</p>

```
cnpm install eslint-loader -D
```

<p>然后对js文件用eslint-loader</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16adaa759cac429c?w=421&h=328&f=png&s=11750)


<p>然后在devServer中增加一个配置项。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16adaaa4bab09364?w=357&h=344&f=png&s=15232)


<p>这样我们在开发过程中，如果有代码不符合规范，就会直接在浏览器上加一个蒙层，显示报错信息。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16adaac5a1d882fa?w=797&h=312&f=png&s=14277)


<p>在检测过程中，如果存在一些浅显的问题，我们可以通过增加一个配置项自动修复。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16adab107a7cc0e4?w=338&h=168&f=png&s=5732)


<p>eslint-loader必须在打包前执行，所以loader顺序是不能错的，如果怕顺序发生错误，可以加上force: 'pre'，保证eslint-loader加载顺序。</p>


![](https://user-gold-cdn.xitu.io/2019/5/21/16adab44e26ff21f?w=345&h=324&f=png&s=10927)


<p>类似的配置项还有很多，可以对照文档再深入了解。</p>

<h1>3.git提交检测</h1>

<p>在webpack中配置Eslint会影响打包速度，所以我们还可以通过git提交代码时，触发钩子，进行eslint检测。</p>

<p>不过这种方式就没有办法在浏览器中“可视化”错误代码了，如果有需要可以查一下对应文档。</p>

