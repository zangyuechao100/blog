>这次开始学习vue源码的知识，并且把学习的内容都写成笔记，方便以后复习。

<p>本节的内容是：了解vue源码入口文件。</p>

<h1>入口文件</h1>

<p>我们上一节分析了Vue.js的构建过程，我们这次分析的是 Runtime + Compiler 构建出来的 Vue.js，它的入口是src/platforms/web/entry-runtime-with-compiler.js。</p> 

<p>但是这个js不是vue最开始的入口，这个文件里面从别的文件里面引用了Vue，并且在文件的最后导出的Vue'</p>


![](https://user-gold-cdn.xitu.io/2019/6/20/16b753a1b572d159?w=1620&h=248&f=png&s=71209)


![](https://user-gold-cdn.xitu.io/2019/6/20/16b753a3f45a3686?w=694&h=206&f=png&s=22704)


<p>然后我们一层一层向上找，最后发现vue的入口是src/core/index.js</p>


![](https://user-gold-cdn.xitu.io/2019/6/20/16b753b2b8b9a452?w=1548&h=1194&f=png&s=209036)


<p>Vue本质是一个函数，下面一些Mixin函数都是在向Vue的原型上扩充方法，我们在后续的笔记中会分析每个Mixin都是做什么的，在此就先略过。使用函数扩展原型是因为这种方式比较好扩展，可以把方法拆分到不同的文件中。</p>

<p>另外一个注意的点是initGlobalAPI</p>


![](https://user-gold-cdn.xitu.io/2019/6/20/16b7544de3ee9c84?w=1602&h=316&f=png&s=88207)


<p>initGlobalAPI定义在 src/core/global-api/index.js，这里的内容也会在后面的笔记中详细的列出。</p>
 
<p>所以Vue本质上就是一个用 Function 实现的 Class，然后它的原型 prototype 以及它本身都扩展了一系列的方法和属性，具体的内容我们后面再详细介绍。</p>
