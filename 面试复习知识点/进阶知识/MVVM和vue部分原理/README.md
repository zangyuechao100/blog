<h1>1. 说一下使用jquery和使用框架的区别</h1>

<p>数据和视图分离，以数据驱动视图。</p>

<p>jquery没有实现数据和视图分离，违反了开放封闭原则。直接操作dom，没有通过修改数据修改dom。</p>

<p>vue中实现了现数据和视图分离，修改数据自动修改视图。只关系数据，DOM操作被封装。</p>

<h1>2. 说一下对MVVM的理解</h1>

<h2>2.1 先了解一下mvc</h2>

![](https://user-gold-cdn.xitu.io/2019/7/10/16bd9f84cf512b8b?w=1072&h=900&f=png&s=155603)

<p>view-视图，controller-控制器，model-数据</p>

<p>view触发事件(controller),controller修改model(数据)，数据驱动视图的改变。</p>

<h2>2.2 MVVM</h2>


![](https://user-gold-cdn.xitu.io/2019/7/10/16bd9fc1e80e0d31?w=730&h=338&f=png&s=73042)


<p>view-视图，model-数据，viewModel-连接view和model的桥梁</p>
<p>view通过事件绑定来操作model，model通过数据绑定操作视图</p>

<p>MVVM不算是一种创新，但其中ViewModel是一种创新，真正结合前端场景的创新。</p>

<h2>2.3 解答</h2>

<p>MVVM - Model View ViewModel</p>
<p>三者之间的联系，参考上面的图</p>
<p>viewModel的理解，是连接view和model的桥梁</p>

<h1>3. Vue三要素</h1>

<p>响应式：vue如何监听到data的每个属性变化</p>
<p>模板引擎：vue的模板如何被解析，指令如何处理</p>
<p>渲染：vue的模板如何渲染成html，以及渲染过程</p>

<h1>4. vue如何实现响应式</h1>

<h2>4.1 什么是响应式</h2>

<p>修改data属性之后，vue立刻监听到</p>
<p>属性被代理到vm上</p>

<h2>4.2 Object.defineProperty</h2>


```
var obj = {}
var name = 'zhangsan'
Object.defineProperty(obj, 'name', {
    get: function () {
        console.log('get')
        return name
    },
    set: function (val) {
        console.log('set')
        name = val
    }
})

```

<h2>4.3 模拟</h2>

```
var vm = {}

var data = {
    name: 'zs',
    age: 18
}

var key
for (key in data) {
    (function(key){
        Object.defineProperty(vm, key, {
            get: function () {
                return data[key]
            },
            set: function (val) {
                data[key] = val
            }
        })
    })(key)
}
```

<h1>5. vue如何解析模板</h1>
<h2>5.1 模板是什么</h2>
<p>模板的本质就是字符串，有逻辑：v-if，v-for等，与html格式很像，但是有很大的区别，最终还是要转换成html来显示。</p>
<p>模板最终必须转换成js代码，因为：有逻辑，必须用js才能实现，转换为html页面，必须用js渲染。因此模板最后要转换成一个js函数（render函数）</p>

<h2>5.2 render函数</h2>

```
<div id="app">
    <p>{{price}}</p>
</div>

转换成

with (this) { // this就是vm
    return _c( // _c就是this._c 也就是vm._c
        'div',
        {
            attrs: {'id': 'app'}  
        },
        [
            _c('p', [_v(_s(price))]) // price就是vm.price 就是data.price
        ]
    )
}
```

<p>_c函数的作用其实就是snabbdom中的h函数（借鉴了思想）</p>

<p>render函数返回的是vnode</p>


![](https://user-gold-cdn.xitu.io/2019/7/12/16be425459f42eea?w=1498&h=903&f=png&s=547534)


<p>vue中的patch和snabbdom中的patch用法基本上也是相同的</p>

<p>updateComponent中实现了patch功能，页面首次渲染执行了updateComponent，data中每次修改属性，触发updateComponent。</p>

<h1>6. vue实现流程</h1>

<p>第一步：解析模板成render函数</p>
<p>第二步：响应式开始监听</p>
<p>第三步：首次渲染，显示页面，且绑定依赖</p>
<p>第四步：data属性变化，触发rerender</p>