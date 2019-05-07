>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.splitChunksPlugin的配置项</h1>

<p>上篇文章我们尝试了动态引入库进行代码分割，但是上篇文章的插件不是官方推荐的插件，我们现在改用官方推荐的插件。</p>
<p>cnpm install @babel/plugin-syntax-dynamic-import -D</p>

<p>.babelrc中增加插件</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a925a5ef9200bb?w=674&h=222&f=png&s=12951)


<p>而且我们可以给打包出的0.js文件改名字。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a925b30b077424?w=888&h=316&f=png&s=26100)


<p>这样打包出的文件名字就已经成功的修改了。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a925bec914e875?w=320&h=116&f=png&s=3938)


<p>如果我们不想要vendor~这个前缀，需要去修改一个配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a925f9849c1bea?w=334&h=249&f=png&s=9284)


<p>这样打包出的文件就只叫lodash了。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a92607612f4e2c?w=277&h=114&f=png&s=2441)


<p>所以我们可以通过改变配置项来改变打包后的结果，而splitChunksPlugin还有很多不同的配置项，我们接下来研究一下各个配置项的意思。</p>


<h2>2 解读配置项</h2>

```
optimization: {
    splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
    }
}
```


<p>我们依次解读配置项的含义：</p>
<h2>2.1 chunks: "async"</h2>
<p>chunks: "async"指的是做代码分割时，只对异步代码生效。</p>
<p>chunks: "initial"只对同步代码生效。</p>
<p>如果想对同步异步都生效，首先要把chunks配置成"all"，然后webpack会进行到cacheGroups的vendors中,检测引入的库是否在node_modules中，如果检测成功，就会单独把引入的代码打包到vendor中。之前的例子打包成功的文件是vendors~main.js，意思是分割的代码符合cacheGroups中vendors的配置，而他的入口文件是main.js，所以叫vendors~main.js。如果想改名字，就只vendors中加一个配置filename: "vendors.js"。</p>


![](https://user-gold-cdn.xitu.io/2019/5/7/16a927842aa55f6b?w=403&h=140&f=png&s=7799)


![](https://user-gold-cdn.xitu.io/2019/5/7/16a9277b75d08a29?w=229&h=114&f=png&s=2866)


<h2>2.2 minSize: 30000</h2>
<p>如果引入的库/包，大于30kb的话才会做代码分割，如果小于30kb就不会进行代码分割。</p>
<p>但是如果引入的库/包没有在node_modules，webpack就会用cacheGroups中default的配置，打包的文件名就叫default~main.js，也可以通过增加filename来改变文件名。</p>

<h2>2.3 maxSize: 0</h2>
<p>maxSize可配置也可以不用配置，现在配置成maxSize: 50000，如果打包的代码体积是1MB，webpack会尝试二次分割，把打包的文件尽量分成20份。（一般不配置，了解即可）</p>

<h2>2.4 minChunks: 1</h2>
<p>当一个模块被用了至少n次时才会进行代码分割。</p>

<h2>2.5 maxAsyncRequests: 5</h2>
<p>同时加载模块数最多是5个，webpack遇到这个参数时，代码分割到5个文件时，就不进行分割了，超过的代码也不进行代码分割。比如引了10个库，打包5个后，剩下5个不进行代码分割。（默认为5就可以）</p>

<h2>2.6 maxInitialRequests: 3</h2>
<p>入口文件进行加载的时候，最多分割三个文件。（默认为3就可以）</p>

<h2>2.7 automaticNameDelimiter: '~'</h2>
<p>默认文件名字的连接符。</p>

<h2>2.8 name: true</h2>
<p>使cacheGroups中文件名生效。（一般不会改变）</p>

<h2>2.9 cacheGroups（缓存组）</h2>
<p>在2.1中已经解读过了，当chunk和minChunks生效时进行匹配的规则。叫缓存组的原因，比如我们引入了jquery和lodash，打包jquery的时候先不着急生成文件，先放到cacheGroups中缓存着，打包lodash的时候，也缓存中cacheGroups中，当最后把符合文件都缓存好之后，再一起打包生成vendors文件。</p>

<h2>2.10 cacheGroups中的priority （优先级）</h2>
<p>打包lodash的时候，既符合vendors又符合default，就要看哪一个priority的值更大，哪一个值大就打包到哪一个文件中。</p>

<h2>2.11 reuseExistingChunk: true</h2>
<p>打包过程中，如果一个模块已经被打包过了，就会忽略这个模块，去使用之前已经打包过的代码。</p>

<p>除了这些配置项，其实还有很多配置项，如果需要就去查阅文档就可以了。</p>