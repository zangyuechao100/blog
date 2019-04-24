>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>
<h1>1.sourceMap是什么</h1>
sourceMap本质上是一个映射关系，它知道dist目录下生成的js，对应src目录下相应js的行数。
<p>sourceMap文件中是VLQ编码集合，把打包生成的代码和源代码做一个映射。</p>
<h1>2.应用场景</h1>
我们打包后调试js时，如果控制台有报错，我们关注的不是打包后生成文件哪里报错，而是源代码中哪里报错，这个时候就会用到sourceMap。
<h1>3.使用方法</h1>
首先要在<font background=#fff5f5 color=#ff502c>webpack.config.js</font>中开启source-map，这样就会打包出<font background=#fff5f5 color=#ff502c>.map</font>文件。

![](https://user-gold-cdn.xitu.io/2019/4/23/16a4aa8441dc473a?w=318&h=145&f=png&s=6886)

<h2>3.1 例</h2>
<p>首先，我们创建一个index.js，在文件中写一行错误的代码。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4f032dbdcc4ca?w=248&h=104&f=png&s=1969)

<p>现在我们先关掉source-map（把值设为none），然后打包，打开生成的html。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4f0b936be52b8?w=912&h=120&f=png&s=7438)

<p>点击报错信息</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4f0bae232e8d6?w=574&h=153&f=png&s=8245)

<p>此时，会显示打包生成后的文件，哪里报错，但是这样不方便我们调试代码。所以我们开启source-map，重新打包。</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4f0cffb2b6fc0?w=921&h=111&f=png&s=7446)

<p>点击报错信息</p>

![](https://user-gold-cdn.xitu.io/2019/4/24/16a4f0d214efbc76?w=297&h=106&f=png&s=3661)

<p>这样，就和开发时对应js文件的行数对应上了。</p>

<h1>4.devtool的其他常用参数</h1>
<p>除了<font background=#fff5f5 color=#ff502c>source-map</font>，devtool还有一些其他的配置项。</p>
<h2>4.1 包含inline的配置参数</h2>
<p>使用包含inline的配置项，比如<font background=#fff5f5 color=#ff502c>inline-source-map</font>，会将map文件中的内容通过DataURL(base64)的方式，写在打包的文件中，这样打包出的文件就不包含map文件了。</p>
<h2>4.2 包含cheap的配置参数</h2>
<p>在不包含cheap的配置中，map映射的报错信息会精确到某一行的某一列，但是加上cheap，就只会提示到第几行报错，可以提高打包性能。比如<font background=#fff5f5 color=#ff502c>cheap-source-map</font>。</p>
<p>另外cheap还有一个作用，它只会对我们的业务代码做映射，不会对引入的库做映射。</p>
<h2>4.3 包含module的配置参数</h2>
<p>包含cheap，不会对引入的库做映射，若我们想让它对引入的库也做映射，就加上module。比如<font background=#fff5f5 color=#ff502c>cheap-module-source-map</font>。</p>
<h2>4.4 包含eval的配置参数</h2>
<p>eval会通过eval()来生成map映射关系。比如<font background=#fff5f5 color=#ff502c>eval</font>。</p>
<h2>4.5 推荐使用的配置项</h2>
<p>在平常开发中，推荐使用<font background=#fff5f5 color=#ff502c>cheap-module-eval-source-map</font>，这样报错提示比较完全，打包速度也比较快。</p>
<p>而线上代码如果也需要map映射的话，推荐使用<font background=#fff5f5 color=#ff502c>cheap-module-source-map</font>，这样报错提示会更好一些。</p>