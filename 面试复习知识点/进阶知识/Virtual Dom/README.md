<h1>1.vdom是什么？为何存在vdom？</h1>

<p>virtual dom，虚拟dom，用js模拟DOM结构。</p>

<p>DOM变化对比放在JS层来做，提高重绘性能。</p>

<h2>1.2 代码演示</h2>

<p>需求：根据数据生成表格，点击按钮，数据改变，表格内容也跟着改变。</p>

<h3>1.2.1 jquery实现</h3>

```
var data = [
            {
                name: '张三',
                age: 20,
                address: '北京'
            },
            {
                name: '李四',
                age: 19,
                address: '深圳'
            },
            {
                name: '王五',
                age: 22,
                address: '上海'
            }
        ]

        // 渲染函数
        function render (data) {
            var $container = $('#container')
            $container.html('')
            var $table = $('<table>')
            $table.append('<tr><td>name</td><td>age</td><td>address</td></tr>')
            data.forEach(function (item) {
                $table.append('<tr><td>'+ item.name +'</td><td>'+ item.age + '</td><td>' + item.address+ '</td></tr>')
            })
            $container.append($table)
        }

        // 改变数据
        $('#btn').click(function () {
            data[0].name = '小红'
            data[2].age = 33
            // re-render
            render(data)
        })

        // 首次渲染
        render(data)
```

<p>遇到的问题：</p>

<p>dom操作是昂贵的，js运行效率高。</p>
<p>尽量减少dom操作。</p>
<p>项目越复杂，影响就越严重。</p>

<h1>2.vdom如何应用，核心API是什么？</h1>

<p>通过介绍snabbdom来学习vdom。</p>

<h2>2.1 核心API</h2>

<p>h函数和patch函数。</p>

<p>
    h('标签名', {属性}, ['子元素'])
</p>
<p>
    h('标签名', {属性}, '子元素')
</p>

<p>
    patch(container, vnode)
</p>

<p>
    patch(node, newVnode)
</p>

<p>h函数生成vnode，patch函数用来首次生成dom，以及比对两个vnode，找出差异，针对差异生成新的dom</p>

```
var snabbdom = window.snabbdom

// 定义patch
var patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])

// 定义h
var h = snabbdom.h

var container = document.getElementById('container')

// 生成vnode
var vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item1'),
    h('li.item', {}, 'Item2')
])

patch(container, vnode)

document.getElementById('btn').addEventListener('click', function () {
    var newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item1'),
        h('li.item', {}, 'ItemB'),
        h('li.item', {}, 'Item3'),
    ])

    patch(vnode, newVnode)
})
```

<h2>2.2 重做1.2.1中的代码</h2>

```
var snabbdom = window.snabbdom

// 定义patch
var patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])

// 定义h
var h = snabbdom.h

var data = [
    {
        name: '张三',
        age: 20,
        address: '北京'
    },
    {
        name: '李四',
        age: 19,
        address: '深圳'
    },
    {
        name: '王五',
        age: 22,
        address: '上海'
    }
]

data.unshift({
    name: 'name',
    age: 'age',
    address: 'address'
})

var container = document.getElementById('container')

var vnode 
function render (data) {
    var newVnode = h('table', {}, data.map(function (item) {
        var tds = []
        var i
        for (i in item) {
            if (item.hasOwnProperty(i)) {
                tds.push(h('td', {}, item[i] + ''))
            }
        }
        return h('tr', {}, tds)
    }))

    if (vnode) {
        patch(vnode, newVnode)
    } else {
        patch(container, newVnode)   
    }
    vnode = newVnode
}

document.getElementById('btn').addEventListener('click', function () {
    data[3].name = '小红'
    data[2].age = 33
    // re-render
    render(data)
})

render(data)
```

<h1>3.介绍一下diff算法</h1>

<h2>3.1 为什么使用diff算法</h2>

<p>DOM操作是昂贵的，因此要减少dom操作，找出本次DOM必须更新的节点来更新，其他的不更新。</p>

<p>这个找出的过程，就需要diff算法。</p>

<h2>3.2 实现过程</h2>

<p>
    patch(container, vnode)
</p>

<p>
    patch(node, newVnode)
</p>

<p>我们只需要简单了解即可，所以从这两个方法入手。</p>


```
// vdom结构
{
    "tag": "div",
    "attr": {
        "id": "list"
    },
    children: [
        {
            "tag": "div",
            "attr": {
                "className": "item"
            },
            "children": ["item1"]
        }
    ]
}

// patch(dom, node)  大概实现逻辑
function createElement(vnode) {
    var tag = vnode.tag
    var attrs = vnode.attrs || {}
    var children = vnode.children || []
    
    if (!tag) {
        return null
    }
    
    // 创建
    var elem = document.createElement(tag)
    
    // 属性
    var attrName
    for (attrName in attrs) {
        if (attrs.hasOwnProperty(attrName)) {
          elem.setAttribute(attrName, attrs[attrName])  
        }
    }
    
    // 子元素
    children.forEach(function (childVnode) {
        // 给elem添加子元素
        elem.appendChild(createElement(childVnode))
    })
    
    return elem
}


```


```
// patch(vnode, newVnode) 大概实现逻辑
function updateChildren (vnode, newVnode) {
    var children = vnode.children || []
    var newChildren = vnode.children || []
    
    children.forEach(fucntion (childVnode, index) {
        var newChildVnode = newChildren[index]
        if (childVnode.tag === childVnode.tag) {
            // 递归深层次对比
            updateChildren(childVnode, childVnode)
        } else {
            // 替换
            replaceNode(childVnode, newChildVnode)
        }
    }) 
}

function replaceNode () {
    // 省略dom替换操作
}

```

<p>其他内容不深入研究，只做到现在了解即可。</p>

