>这次开始学习vue源码的知识，并且把学习的内容都写成笔记，方便以后复习。

<p>这几节最后应该合并起来看，串联后是实现数据驱动的代码，写好了会补上链接</p>

[一、VUE源码笔记之new Vue](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/1.new%20Vue)
<br>
[二、VUE源码笔记之$mount实例挂载](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/2.%24mount%E5%AE%9E%E4%BE%8B%E6%8C%82%E8%BD%BD)
<br>
[三、VUE源码笔记之render](https://github.com/zangyuechao100/blog/tree/master/vue%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/3.%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8/3.render)

<p>本节的内容是：了解$mount实例挂载。</p>

<h1>1. $mount:实例挂载</h1>

<p>我们本次分析的是带 compiler 版本的 $mount 实现。</p>

<p>代码中，首先缓存了Vue原型链上的$mount，然后重新定义了这个方法，先判断el是不是body或者html标签，如果是就抛出警告。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92ecfce766720?w=796&h=372&f=png&s=35894)


<p>接下来，如果没有render函数，vue会把el或者template转换成render。我们分段来看：</p>

<p>如果有template（el和template都是在new Vue中定义的），且根据template是不是字符串进行不同逻辑处理。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92f1a32236829?w=734&h=547&f=png&s=51534)


<p>如果没有template就会获取el，并把el处理成字符串。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92f3f21ac1583?w=350&h=90&f=png&s=4538)


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92f406808900a?w=599&h=231&f=png&s=19719)


<p>处理后，生成render函数，把render挂在到option上，这部分我们后面会仔细写。最后执行了mount方法，这个mount方法就是我们之前缓存的$mount，在之前的文件中已经定义过了。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92f58c3010534?w=878&h=579&f=png&s=62711)


<p>去看缓存的mount方法，发现执行了mountComponent函数。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b92f90bc541086?w=549&h=199&f=png&s=18272)


<p>再去看mountComponent函数，我们还是分成不同部分来看，如果刚刚没有生成render，就会抛出一个 警告。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b9313905bfbd9b?w=917&h=665&f=png&s=66937)


<p>之后定义了一个UpdateComponent方法，传入到下面的watcher当中。mark是性能埋点用到的逻辑，我们之后执行的else里面的逻辑。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b9316eaa52ade3?w=833&h=592&f=png&s=58216)


![](https://user-gold-cdn.xitu.io/2019/6/26/16b931889090c5ca?w=828&h=293&f=png&s=33440)


<p>所以我们再去看一下Watcher的定义，Watcher是一个class，上半部分定义了接受参数</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b9319203d94903?w=642&h=727&f=png&s=56499)


<p>然后初始化了一些参数，这些参数我们后期再看，暂时用不到。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b9319841c66913?w=647&h=502&f=png&s=43451)


<p>下面的逻辑会判断传入的expOrFn是不是一个函数，我们这里传入的是函数，所以会把this.getter赋值为UpdateComponent函数，并且下面执行了get函数</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b931a6c48f9b92?w=610&h=458&f=png&s=36169)


<p>get中又执行了getter方法，也就是执行了UpdateComponent</p>

![](https://user-gold-cdn.xitu.io/2019/6/26/16b931b9f9e715c7?w=705&h=316&f=png&s=23529)


<p>调用了vm中的_update方法，先执行  _render函数生成VNode（虚拟DOM），然后再执行 _update 更新 DOM。</p>


![](https://user-gold-cdn.xitu.io/2019/6/26/16b931c239a9a776?w=417&h=79&f=png&s=5410)


<p>Watcher 在这里起到两个作用，一个是初始化的时候会执行回调函数，另一个是当 vm 实例中的监测的数据发生变化的时候执行回调函数，这块儿我们会在之后的详细讲。</p>

<p>这里的重点其实就是通过 _render函数生成VNode， _update更新DOM，接下来我们会分析两个函数中的细节部分。</p>


<h1>参考</h1>

[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/prepare/)