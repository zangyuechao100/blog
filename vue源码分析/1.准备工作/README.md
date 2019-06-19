>这次开始学习vue源码的知识，并且把学习的内容都写成笔记，方便以后复习。

<p>本节的内容是：了解vue源码目录设计，为后面做源码分析做好准备。</p>

<h1>1.目录结构</h1>


```
src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```

<h2>compiler</h2>
<p>编译器代码的存放目录，可以把template生成render函数。包括把模板解析成抽象语法树(AST)，抽象语法树(AST)生成render函数，优化vdom渲染等功能。</p>

<h2>core</h2>
<p>core 目录包含了 Vue.js 的核心代码，包括虚拟DOM，Vue实例化，全局API，抽象出来的通用组件，数据观测的核心代码等</p>

<h2>platform</h2>
<p>包含平台相关的代码，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。</p>

<h2>sfc</h2>
<p>把.vue 文件内容解析成一个 JavaScript 的对象。</p>

<h2>shared</h2>
<p>包含整个代码库通用的代码</p>

<h1>2.源码构建过程</h1>

<p>首先我们在package.json中，看到npm run build运行的是scripts中的build.js文件。</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b6ffdcc63ffd70?w=1193&h=159&f=png&s=26391)


<p>然后我们打开scripts中的build.js。</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b6ffe606ff97af?w=914&h=331&f=png&s=27422)


<p>看到这个js中先引入依赖，然后引入了config.js中的getAllBuilds，我们再去看看config.js中的代码。</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b6fff2d9454a56?w=778&h=225&f=png&s=19204)


<p>config.js文件的最后暴露了一个方法，这个方法会遍历builds拿到所有的key，然后通过map方法调用genConfig函数。那么遍历的builds对象中有什么内容呢？我只截取了一部分：</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b7004e0615d1b4?w=800&h=686&f=png&s=61752)


<p>我们发现这个是打包不同版本的vue使用的编译配置。</p>

<p>每一个entry中都有一个resolve函数，这个resolve函数定义在了上面。</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b7006eae38b374?w=759&h=261&f=png&s=20972)


<p>函数首先把拿到的字符串web/entry-runtime.js通过split分割，拿到web，又去aliases中获取对应的值。aliases内容如下： </p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b7006fc475eee7?w=743&h=389&f=png&s=40382)


<p>aliases中，通过nodejs的方法，获取src目录下对应的文件，并把内容暴露出去。</p>

<p>回到config.js中的resolve方法，以web/entry-runtime.js为例</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b70150d352dbac?w=582&h=193&f=png&s=16299)


<p>resolve方法通过path.resolve(aliases[base], p.slice(base.length + 1))返回了src/platforms/web下的entry-runtime.js文件。</p>

<p>再以dist/vue.runtime.common.dev.js为例</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b701461b06c58e?w=578&h=200&f=png&s=15597)


<p>aliases中没有对应的配置，所以函数进入到path.resolve(__dirname, '../', p)的逻辑中，就是在dist中生成vue.runtime.common.dev.js。</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b7015fefc765a2?w=618&h=200&f=png&s=16788)


![](https://user-gold-cdn.xitu.io/2019/6/19/16b7019721198f0e?w=506&h=228&f=png&s=17248)


![](https://user-gold-cdn.xitu.io/2019/6/19/16b7019556b30e6c?w=663&h=201&f=png&s=16482)


<p>format是打包生成文件的格式。有umd，cmd，es三种方法，对应不同打包方式导出的方式。</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b701a3e8612b58?w=663&h=185&f=png&s=15055)


<p>banner就是在对应文件上生成注释，写明打包时间、作者、版本等信息。</p>

<p>再看这个方法中的genConfig</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b701c555074325?w=729&h=42&f=png&s=6806)


![](https://user-gold-cdn.xitu.io/2019/6/19/16b701c82f10eaab?w=597&h=597&f=png&s=37511)


<p>genConfig方法拿到每个key对应的value值之后，重新生成了一个config配置（rollup打包的配置），返回到build.js中。</p>

<p>拿到配置之后，根据传入的参数（package.json中传入的变量），进行相应的过滤，然后运行build方法。</p>


![](https://user-gold-cdn.xitu.io/2019/6/19/16b70217cf212898?w=1015&h=405&f=png&s=33560)


<p>build方法执行一系列逻辑，都是生成rollup打包配置的过程，最后打包成功。</p>

<h1>3.额外知识点</h1>

<p>我们之前在用vue-cli脚手架时会让我们选择Runtime Only 和 Runtime + Compiler，其实他们的区别是Runtime Only会借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，代码会更轻量；Runtime + Compiler会在客户端编译模板，这个过程会有性能损耗，而且代码体积会更大一些，所以推荐用Runtime Only。</p>