>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.不使用Tree Shaking</h1>

<p>首先新建一个工具函数js，里面写入两个方法。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a880e045459d45?w=482&h=189&f=png&s=13267)


<p>在index.js中只引入其中一个函数并调用，然后进行打包。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a880e8d2d89154?w=482&h=189&f=png&s=13267)


<p>我们现在查看打包后的js，发现两个函数都被打包进去了。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a8868259e022b8?w=787&h=104&f=png&s=8954)
![](https://user-gold-cdn.xitu.io/2019/5/5/16a88103df7ace9e?w=1286&h=270&f=png&s=35370)


<p>这样会把没有使用的代码一起打包进最终的js，所以我们需要利用Tree Shaking来优化打包。</p>

<h1>2.Tree Shaking</h1>
<p>注意：Tree Shaking只支持ES Module引入方式。因为持ES Module底层是静态引用的方式，而commonjs是动态引入的方式。</p>
<p>webpack.config.js中，如果mode模式设为development，默认是不进行Tree Shaking的，需要加一个配置项来开启。在plugins同级加一个optimization，增加图中的配置项。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a8814817cc51b3?w=485&h=264&f=png&s=13726)


<p>接着，在package.json中再加一个配置项"sideEffects": false。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a8817542eab599?w=363&h=180&f=png&s=10110)


<p>加这个配置项原因是，如果引入的库没有export，Tree Shaking可能会直接忽略掉这个库，比如引入import "@babel/polly-fill"，而babel/polly-fill没有任何export，就会不打包这个库，为了避免这个情况，我们需要把"sideEffects"的值填上["@babel/polly-fill"]，这样Tree Shaking在打包过程中，就会忽略优化@babel/polly-fill。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a881a93e0220e1?w=450&h=131&f=png&s=9327)


<p>我们设为false的原因是，我们的代码中没有需要忽略的库，所以都需要Tree Shaking。</p>

<p>除了一些库，如果我们引入css的话，Tree Shaking同样会不打包css文件，所以我们一般还会加上这样的配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a885e96cc5b41c?w=291&h=145&f=png&s=5205)


<p>接下来我们重新打包，发现webpack只使用了add方法。</p>


![](https://user-gold-cdn.xitu.io/2019/5/5/16a8866c7d2f833a?w=773&h=115&f=png&s=10577)


<p>可是为什么minus方法还存在呢？因为在development模式下，即使用了Tree Shaking，也不会在打包文件中删除minus，避免调试的时候，因为删除了代码，导致代码行数错误。</p>


<p>如果mode是production，Tree Shaking是自动配置好的，我们也不用配置optimization，但是package.json中的sideEffects还是需要写，并且在production模式下，没有用到的代码会被删除。</p>