>这次开始学习vue源码的知识，并且把学习的内容都写成笔记，方便以后复习。

<p>这几节最后应该合并起来看，串联后是实现数据驱动的代码，写好了会补上链接</p>

[一、VUE源码笔记之new Vue](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/1.new%20Vue)
<br>
[二、VUE源码笔记之$mount实例挂载](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/2.%24mount%E5%AE%9E%E4%BE%8B%E6%8C%82%E8%BD%BD)
<br>
[三、VUE源码笔记之render](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/3.render)

<p>本节的内容是：初步了解render。</p>

<h1>render</h1>

<p>上一节写到_render方法，我们现在来看看 _render的定义，它的定义在 src/core/instance/render.js文件中。</p>


![](https://user-gold-cdn.xitu.io/2019/7/1/16bacc3fcac6b39c?w=785&h=552&f=png&s=56911)


<p>首先拿到render方法，然后在下面执行render函数，并返回一个vnode。我们在平时的开发工作中手写 render方法的场景比较少，用的基本都是template，之前在$mounted方法中会把template编译成render 方法，现在我们直接写一个render方法举个例子。</p>

```
<div id="app">
  {{ message }}
</div>
```

<p>相当于</p>

```
render: function (createElement) {
  return createElement('div', {
     attrs: {
        id: 'app'
      },
  }, this.message)
}
```

<p>这个createElement就是vm.$createElement</p>


![](https://user-gold-cdn.xitu.io/2019/7/1/16bacc9501816e88?w=764&h=193&f=png&s=29626)


<p>从代码中查询vm.$createElement的定义，发现还有一个 _c方法，实际上， _c 方法，它是被模板编译成的 render 函数使用，而 vm.$createElement 是用户手写 render 方法使用的， 这俩个方法支持的参数相同，并且内部都调用了 createElement 方法。</p>

<p>所以，vm._render 最终是通过执行 createElement 方法并返回的是 vnode，它是一个虚拟 Node。接下来分析createElement之前，会再了解一下VNode。</p>

<h1>参考</h1>

[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/prepare/)