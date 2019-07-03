>这次开始学习vue源码的知识，并且把学习的内容都写成笔记，方便以后复习。

<p>这几节最后应该合并起来看，串联后是实现数据驱动的代码，写好了会补上链接</p>

[一、VUE源码笔记之new Vue](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/1.new%20Vue)
<br>
[二、VUE源码笔记之$mount实例挂载](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/2.%24mount%E5%AE%9E%E4%BE%8B%E6%8C%82%E8%BD%BD)
<br>
[三、VUE源码笔记之render](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/3.render)
<br>
[四、VUE源码笔记之createElement]()

<p>本节的内容是：了解createElement做了什么。</p>

<h1>createElement</h1>

<p>Vue.js 利用 createElement 方法创建 VNode，它定义在 src/core/vdom/create-elemenet.js 中：</p>


![](https://user-gold-cdn.xitu.io/2019/7/3/16bb861a82c5c4ae?w=821&h=493&f=png&s=39550)


<p>createElement方法先对 _createElement 做了一层封装，对不传data的情况做了一层处理，然后调用了 _createElement 来创建VNode。</p>

<p>目前来说， _createElement 比较重要的点是normalizeChildren(children) 和 simpleNormalizeChildren(children)方法。</p>


![](https://user-gold-cdn.xitu.io/2019/7/3/16bb864afb6137f4?w=624&h=149&f=png&s=26039)


<p>simpleNormalizeChildren把二维数组拍平。([1,2,[3,4],5])</p>


![](https://user-gold-cdn.xitu.io/2019/7/3/16bb866ac445408c?w=708&h=223&f=png&s=31139)


<p>normalizeChildren会递归调用把多维数组拍平。</p>

<p>经过对 children 的规范化，children 变成了一个类型为 VNode 的 Array。</p>

<p>回到 createElement 函数，规范化 children 后，接下来会去创建一个 VNode 的实例：</p>


![](https://user-gold-cdn.xitu.io/2019/7/3/16bb86b87df4faab?w=1195&h=845&f=png&s=144398)


<p>这里先对 tag 做判断，如果是 string 类型，则接着判断如果是内置的一些节点，则直接创建一个普通 VNode，如果是为已注册的组件名，则通过 createComponent 创建一个组件类型的 VNode，否则创建一个未知的标签的 VNode。 如果是 tag 一个 Component 类型，则直接调用 createComponent 创建一个组件类型的 VNode 节点。</p>

<p>所以vm._render就是经过这些处理，返回了一个VNode节点，然后执行 _update 方法，下面就开始分析 _update方法。</p>

<h1>参考</h1>

[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/prepare/)