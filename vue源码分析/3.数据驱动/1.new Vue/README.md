>这次开始学习vue源码的知识，并且把学习的内容都写成笔记，方便以后复习。

<p>这几节最后应该合并起来看，串联后是实现数据驱动的代码，写好了会补上链接</p>

[一、VUE源码笔记之new Vue](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/1.new%20Vue)
<br>
[二、VUE源码笔记之$mount实例挂载](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/2.%24mount%E5%AE%9E%E4%BE%8B%E6%8C%82%E8%BD%BD)
<br>
[三、VUE源码笔记之render](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/3.render)
<br>
[四、VUE源码笔记之createElement](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/4.createElement)


<p>本节的内容是：了解new Vue发生了什么。</p>

<h1>1. new Vue</h1>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b926906b8b010b?w=787&h=223&f=png&s=21271)


<p>首先，会执行Vue原型链上的init方法，这个init方法是在initMixin中定义的，我们去看一下init方法。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b926985e0cbe4b?w=285&h=238&f=png&s=10054)


<p>我们分块来看init方法，init先统计了uid，然后合并了配置。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b926a4dd61663a?w=778&h=697&f=png&s=74897)


 <p>接着进行初始化生命周期，初始化事件中心，初始化渲染，初始化data、props、computed、watcher 等等。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b926c225f7b6b2?w=786&h=551&f=png&s=56019)

 
 <p>我们这次先看一下initState，其他的放在以后再看。</p>

<p>initState先初始化props，methods和data，再看initData</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b926bdd98c3ed0?w=554&h=377&f=png&s=35359)


<p>看initData会检查传入的data的是不是一个对象，如果不是一个对象就抛出一个警告。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b926f12aa1a449?w=789&h=701&f=png&s=73479)


<p>接着遍历data中的key，如果和props或者methods中有重名就抛出一个警告。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b926ff2b312bf1?w=755&h=685&f=png&s=66494)


<p>如果没有重名，就会进行对每一个key进行proxy操作。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92727082b4157?w=306&h=98&f=png&s=5311)


<p>proxy方法就是利用Object.defineProperty对vm进行set和get代理，这样我们在vue中使用this.message就可以访问到data中的message，（实际上this.message等价于this._data.message）。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92746a9df552a?w=773&h=231&f=png&s=29285)


<p>最后init执行了$mount实例挂载，挂载的目标就是把模板渲染成最终的 DOM。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92779c4e407a9?w=353&h=103&f=png&s=5632)



<h1>参考</h1>

[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/prepare/)