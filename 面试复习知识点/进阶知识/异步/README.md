<p>在工作和面试中，基础知识必须牢固，今天开始，不仅要继续读源码类知识，还要复习基础知识。</p>

<h1>1. 什么是单线程，和异步有什么关系？</h1>
<h2>1.1 单线程</h2>
<p>单线程 - 只有一个线程，同一时间只能做一件事。</p>


```
console.log(100)
setTimeout(() => {
    console.log(200)
}, 1000)
console.log(300)
console.log(400)
```
<h2>1.2 原因</h2>

<p>原因 - 避免DOM渲染的冲突。</p>

<p>详细解释：浏览器需要修改DOM，JS可以修改DOM，JS执行的时候，浏览器DOM渲染会暂停。两段JS也不能同时执行，都修改DOM就冲突了。</p>

<p>webworker支持多线程，但是不能访问DOM。</p>

<h2>1.3 异步</h2>

<p>解决方案 - 异步。</p>

<p>问题一：没按照书写方式执行，可读性差。</p>
<p>问题二：callback不容易模块化。（后期维护代码不好排查问题）</p>

<h2>1.4 解答</h2>

<p>单线程就是同时只做一件事，两段JS代码不能同时执行。</p>
<p>原因就是为了避免DOM渲染的冲突。</p>
<p>异步是单线程的解决方案，但是也存在相应的问题。</p>

<h1>2. 什么是event-loop？</h1>

<p>事件轮询，JS实现异步的具体解决方案。</p>

<p>同步代码，直接执行。</p>

<p>异步函数先放在异步队列中。</p>

<p>待同步函数执行完毕，轮询执行异步队列的函数。</p>

<p>涉及到宏任务和微任务的知识，可以参考网上的博客。</p>

<h1>3. jquery的Deferred</h1>

```
var ajax = $.ajax('data.json')
ajax.then(function () {
    // 成功
}, function () {
    // 失败
})
.then(function () {
    // 成功
}, function () {
    // 失败
})

// 或者
ajax.done(function () {
    console.log('success')
}).fail(function () {
    console.log('fail')
}).done(function () {
    console.log('success2')
}).done(function () {
    console.log('success3')
})
```

<h2>使用jQuery Deferred</h2>

```
function handleWait () {
    var dtd = $.Deferred() // 创建Deferred实例

    var wait = function (dtd) {
        var task = function () {
            console.log('执行完成')
            dtd.resolve() // 成功
            // dtd.reject() // 失败
        }

        setTimeout(task, 1000)
        return dtd.promise() // 加promise的原因是防止外面修改resolve或者reject状态
    }


    return wait(dtd)
}

// 返回的promise对象后需要$.when处理一下
var result = handleWait()
$.when(result).then(function () {
    console.log('success 1')
}, function () {
    console.log('error 1')
})

// 但是reject的时候，不能写成链式操作，需要拆开写
$.when(result).then(function () {
    console.log('success 1')
}, function () {
    console.log('error 1')
})
$.when(result).then(function () {
    console.log('success 2')
}, function () {
    console.log('error 2')
})
```

<h1>4. Promise的基本使用和原理</h1>

<h2>4.1 基本语法</h2>

<p>基本语法在ES6中已经介绍过，这里就忽略了。</p>

<h2>4.2 异常捕获</h2>

<p>无论有多少个then，统一用catch捕获异常</p>

```
result.then(function () {
    // 成功
}).then(function () {
    // 成功
}).catch(function (err) {
    // 捕获异常
})
```

<h2>4.3 多个串联</h2>

<p>可以通过第一个then返回一个promise对象，实行串联。</p>

```
function loadText (src) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: src,
            success: function (data) {
                resolve(data)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

var src1 = './data.txt'
var result1 = loadText(src1)
var src2 = './data2.txt'
var result2 = loadText(src2)

result1.then(function (data) {
    console.log('data1' + data)
    return result2
}).then(function (data) {
    console.log('data2' + data)
})
```

<h2>4.4 Promise.all Promise.race</h2>

<p>Promise.all接受一个promise对象数组，待全部完成后统一执行then中的success，then中接受的参数是一个数组，里面是所有的返回内容</p>

```
Promise.all([result1, result2]).then((datas) => {
    console.log(datas)
})
```

<p>Promise.race接受一个promise对象数组，只要有一个完成就执行then中的success，then中接受的参数是最先返回的内容</p>

```
Promise.race([result1, result2]).then((data) => {
    console.log(data)
})
```


<h2>4.5 Promise状态</h2>

<p>初始状态： pending</p>

<p>成功：fulfilled</p>

<p>失败：rejected</p>

<h1>5. 介绍一下async/await（和Promise的区别、联系）</h1>

<p>async/await是最直接的同步写法</p>

<h2>5.1 基本语法</h2>

```
function loadText (src) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: src,
            success: function (data) {
                resolve(data)
            },
            error: function (err) {
               
                reject(err)
            }
        })
    })
}

async function handleLoadText () {
    let result1 = await loadText('./data.txt')
    console.log(result1)
    let result2 = await loadText('./data2.txt')
    console.log(result2)
}

handleLoadText()
```
<h2>5.2 解答</h2>

<p>使用了Promise，并没有和Promise冲突</p>
<p>完全是同步的写法，再也没有回调函数</p>

<h1>6. 总结当前JS解决异步的方案</h1>

<p>jquery Deferred</p>

<p>promise</p>

<p>async await</p>

<p>generator</p>