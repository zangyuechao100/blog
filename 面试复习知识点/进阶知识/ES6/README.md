<p>在工作和面试中，基础知识必须牢固，今天开始，不仅要继续读源码类知识，还要复习基础知识。</p>

<h1>1.ES6模块化如何使用，开发环境如何打包</h1>

<h2>1.1 环境配置</h2>
<p>因为模块化以及下面的知识会用到ES6语法，所以我们要利用babel来进行ES6语法转ES5语法。(babel官网有教程)</p>

<p>首先安装插件</p>

```
cnpm install --save-dev @babel/core @babel/cli @babel/preset-env
```

<p>接着安装babel-cli</p>

```
cnpm install -g babel-cli
```

<p>具体配置直接去babel官网看就可以了。</p>


<p>模块化需要利用webpack或者rollup等打包工具。</p>

<p>webpack配置参照我之前的webpack博客就可以了。</p>

<p>rollup直接参照官方文档就可以了。</p>

<h3>1.1.1 rollup和webpack</h3>

<p>rollup功能单一，webpack功能强大。</p>


<h2>1.2 模块化的基本语法</h2>

<p>这里使用的ES Module。</p>


```
// a.js
let a = 1;
export default a;

// b.js
export function fn1 () {
    console.log('fn1');
}
```

```
import a from './a.js';
import {fn1} from './b.js'
```

<h2>1.3 解答</h2>

<p>语法：import export 注意有无default</p>
<p>babel编译ES6语法，模块化可用webpack和rollup</p>

<h1>2.Class和普通构造函数有何区别</h1>

<h2>2.1 基本语法</h2>

```
// 普通构造函数
function MathHandle (x, y) {
    this.x = x
    this.y = y
}

MathHandle.prototype.add = function () {
    return this.x + this.y
}

let mathAdd = new MathHandle(3, 4)

console.log(mathAdd.add())
```


```
// Class
class MathHandle {
    constructor (x, y) {
        this.x = x
        this.y = y
    }

    add () {
        return this.x + this.y
    }
}

let mathAdd = new MathHandle(31, 4)
console.log(mathAdd instanceof MathHandle)

typeof MathHandle // "function"
```

<p>Class是构造函数的语法糖， typeof MathHandle是一个函数。</p>

<h2>2.2 语法糖本质</h2>

```
// 普通构造函数
typeof MathHandle // "function"
MathHandle.prototype.constructor === MathHandle // true
mathAdd.__proto__ === MathHandle.prototype // true

// ES6中依然成立
typeof MathHandle // "function"
MathHandle.prototype.constructor === MathHandle // true
mathAdd.__proto__ === MathHandle.prototype // true
```

<p>所以Class和构造函数没有任何区别，所以Class只是普通构造函数的语法糖。</p>

<h2>2.3 继承</h2>

<p>Class继承的语法</p>

```
class Animal {
    constructor (name) {
        this.name = name
    }

    eat () {
        console.log(`${this.name} eat`)
    }
}

class Dog extends Animal {
    constructor (name) {
        super(name)
        this.name = name
    }

    bark () {
        console.log(`${this.name} bark`)
    }
}

let dog = new Dog('hash')

dog.bark();
dog.eat();
```

<h2>2.4 解答</h2>

<p>Class在语法上更加贴合面向对象的写法</p>
<p>Class实现继承更加易读，易理解</p>
<p>本质上是语法糖</p>

<h1>3.Promise的基本使用和原理</h1>

<p>这里只先介绍一下promise，后面会更详细的复习promise</p>

<h2>3.1 语法</h2>

```
// ES5写法
function loadImg (src, callback, fail) {
    let img = document.createElement('img');

    img.onload = function () {
        callback(img);
    }

    img.onerror = function () {
        fail();
    } 

    img.src = src;
}

let src = 'https://apiimages.renwu188.com/956eea1e2f5b4d4996ef0ee3f564cdc3.png'
loadImg(src, function (img) {
    console.log(img.width)
}, function () {
    console.log('error')
})
```
<p>用promise改写</p>

```
// promise
function loadImg (src) {
    const promise = new Promise(function (resolve, reject) {
        let img = document.createElement('img');
        img.onload = function () {
            resolve(img);
        }
        img.onerror = function () {
            reject();
        }
        img.src = src;
    })
    return promise;
}

let src = 'https://apiimages.renwu188.com/956eea1e2f5b4d4996ef0ee3f564cdc3.png';
let result = loadImg(src);
result.then(function (img) {
    console.log(img.width);
    return img;
}, function () {
    console.log('error');
})

result.then(function (img) {
    console.log(img.height);
})
```

<h2>解答</h2>

<p>关于promise后面会写一篇详细的文章。</p>

<h1>4.ES6其他功能</h1>
<p>这些功能可以去网上查阅博客，这里就简单的写一下使用语法。</p>
<h2>4.1 let/const<h2>

```
let i = 10;
i = 100; // 正确

const i = 10;
i = 100; // 报错
```

<h2>4.2 多行字符串/模板变量<h2>

```
const name = 'zs';
let a = `my name is ${name}`

let html = `
    <div>
        <p>test</p>
    </div>
`
console.log(html)
```

<h2>4.3 解构赋值<h2>

```
const obj = {
    a: 1,
    b: 2,
    c: 3
}

const {a, c} = obj;
console.log(a, c);

const arr = [1, 3, 5];
const [x, y, z] = arr;
console.log(x, y, z);
```

<h2>4.4 块级作用域<h2>

```
var obj = {a: 1, b: 2};
for (var item in obj) {
    console.log(item);
}
console.log(item); // 'b'

// es6
const obj = {a: 1, b: 2};
for (let item in obj) {
    console.log(item);
}
console.log(item); // undefined
```

<h2>4.5 函数默认参数<h2>

```
function sayName (name = 'zs') {
	console.log(name)
}
```

<h2>4.6 箭头函数</h2>

```
let sayName = (name) => {
    console.log(name)
}
```

<p>注意this指向问题</p>


```
function fn () {
    console.log(this) // {a: 100}

    let arr = [1]

    arr.map(function () {
        console.log(this) // window
    })

    arr.map(() => {
        console.log(this) // {a: 100}
    })
}

fn.call({a: 100})
```

<h1>参考</h1>

[揭秘一线互联网企业前端JavaScript高级面试](https://coding.imooc.com/class/chapter/190.html#Anchor)