>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.模块分析</h1>

<p>我们这一次会实现一个类似webpack的工具，首先来写模块分析部分。</p>

<p>代码地址：</p>

[代码仓库](https://github.com/zangyuechao100/blog/tree/master/webpack4/%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86/3.%E5%AE%9E%E7%8E%B0%E7%AE%80%E6%98%93webpack/bundler)

<p>先把目录搭好，src下有三个js文件，每个文件里面对应以下内容：</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4be43a03eee0a?w=233&h=130&f=png&s=2075)


<p>word.js</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4be45941daee4?w=371&h=117&f=png&s=4415)


<p>message.js</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4be4650d82869?w=422&h=173&f=png&s=11545)


<p>index.js</p>

![](https://user-gold-cdn.xitu.io/2019/6/12/16b4be4509b5ba8b?w=457&h=128&f=png&s=7811)


<p>现在这个代码在浏览器中是没有办法运行的，需要借助类似webpack这种工具才可以，所以我们需要借助node.js实现一个打包工具。</p>

<p>和src同级，我们新建一个bundler.js。</p>

<p>创建一个函数，用来分析打包入口文件，支持传入一个参数（文件路径），然后利用node读取文件内容。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4bef8f3b29d61?w=702&h=294&f=png&s=27315)


<p>而index中引用了message.js，我们需要把引用的文件名提取出来，要借助@babel/parser分析我们的源代码。</p>


```
cnpm install @babel/parser --save
```

<p>@babel/parser提供了一个parse方法，第一个参数传入文件内容，第二个参数传一个对象。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4bf90111a61af?w=872&h=359&f=png&s=39941)


<p>方法返回的对象是一个抽象语法树（AST）。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4bfa15ffb9f13?w=507&h=328&f=png&s=11279)


<p>对象里面有一个program.body，内容是这样的：</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4bfc55df6c792?w=510&h=464&f=png&s=16733)


<p>第一个Node的type是ImportDeclaration，意思是引入声明语句，我们index.js中第一行确实是引入语句。第二个Node的type是ExpressionStatement，意思是表达式语句，我们第二行写的console.log()，确实是表达式语句。所以借助这个工具，我们就可以分析文件之间的依赖关系。</p>

<p>为了找出所有的依赖关系，我们要遍历所有type是ImportDeclaration的语句，自己写会比较麻烦，还可以借助@babel/traverse</p>

```
cnpm install --save @babel/traverse
```

<p>traverse是一个函数，第一个参数接受抽象语法树，第二个参数是一个对象。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4c0469c09ca19?w=971&h=534&f=png&s=60327)


<p>抽象语法树中有元素的type是ImportDeclaration时，就会执行ImportDeclaration函数，它接受的参数可以解构出一个node，它就是所有type是ImportDeclaration的元素，就是我们所有的依赖，里面哟一个source，value值就是文件名，所以我们就可以把所有文件名都存起来</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4c0a09b918c98?w=492&h=395&f=png&s=15229)


<p>声明一个数组，把所有node中的soure.value都push到数组中。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4c0f712b70ee9?w=1017&h=567&f=png&s=75126)


<p>这样入口分析就已经分析好了，但是这时候分析的依赖都是相对路径，我们要把它改为绝对路径，或者是相对于根路径的相对路径，这样才不会有问题，所以要借助node中的path。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4c1578a1d60d9?w=799&h=137&f=png&s=21519)


<p>但是我们为了方便以后开发，现在应该把绝对路径和相对路径都存好，所以把原先的数组变成对象，用以下方法存起来。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4c1c097cc2d13?w=913&h=223&f=png&s=30199)


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4c1c1761cea9b?w=291&h=59&f=png&s=2576)


<p>对象的key是相对路径，value是绝对路径。</p>

<p>然后就返回入口文件名，和文件所有依赖的内容。</p>


![](https://user-gold-cdn.xitu.io/2019/6/12/16b4c1d7027ccbb4?w=937&h=779&f=png&s=84131)


<p>但是我们用的ES Module引入文件，浏览器无法识别这个语法，就要依赖@babel/core。</p>

```
cnpm install --save @babel/core
```

<p>@babel/core提供了一个方法，transformFromAst，可以把抽象语法树转化成浏览器可以运行的代码。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b50ead809ccced?w=432&h=122&f=png&s=6783)


<p>传入的参数中还可以配置ES6转ES5的插件，所以要先安装一下@babel/preset-env。</p>


```
cnpm install --save @babel/preset-env
```

<p>函数会返回一个对象，里面有一个code属性，code属性中就是我们浏览器可以运行的代码。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b50efb900dbfa6?w=569&h=120&f=png&s=6203)


<p>最后返回我们分析的结果。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b50f04e90a4686?w=969&h=929&f=png&s=98022)


![](https://user-gold-cdn.xitu.io/2019/6/13/16b50f1794f7067c?w=568&h=104&f=png&s=8009)


<p>返回的结果意思是：入口文件是index.js；引用的依赖是message.js，地址是src/message.js；浏览器中可以运行的代码是code中的内容。</p>

<h1>2.依赖图谱</h1>

<p>我们现在只分析了入口文件的依赖，接下来我们要开始分析其他依赖，从message开始，一层一层把所有依赖都分析完。</p>

<p>我们再创建一个函数，用来制作依赖图谱，利用类似递归的方式，调用moduleAnalyser逐层分析依赖内容，并把它们都放到一个数组中。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b510e2633fa240?w=1095&h=476&f=png&s=54681)


<p>最后生成的数组。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b510e35d56c1dc?w=566&h=293&f=png&s=23155)


<p>然后我们把它整合成一个对象，用路径作为key，依赖和代码作为value，并且返回这个对象。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b5113955f008b1?w=1121&h=704&f=png&s=74660)


<p>对象的内容。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b5112c2f5a3dbe?w=572&h=284&f=png&s=21423)


<h1>3.生成代码</h1>

<p>拿到依赖图谱，现在要开始生成浏览器可以运行的代码了。</p>

<p>先看生成的代码中，存在require和exports两个方法，但是浏览器中没有这两个方法，所以我们要先定义这两个方法，然后把生成的代码片段利用闭包的形式执行。</p>

<p>require函数中，通过传入路径拿到对应的代码，利用eval()执行，如果require中有依赖，继续执行require时拿到的就是相对路径，需要转成绝对路径，直接去我们之前创建的对象中取就可以。</p>

<p>exports是一个空对象即可，这样导出的内容会被存到exports中。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b513d75b71ac4b?w=1306&h=716&f=png&s=88247)


<p>然后把生成的代码格式化一下，复制到浏览器中执行。</p>


![](https://user-gold-cdn.xitu.io/2019/6/13/16b513e388ab06f5?w=1884&h=324&f=png&s=46130)


<p>就打印出say hello了。</p>

<p>这样，我们就已经实现了一个简易的webpack打包工具了，具体代码可以去我的github仓库里面看。</p>