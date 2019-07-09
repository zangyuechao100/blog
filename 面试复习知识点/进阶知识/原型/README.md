<p>在工作和面试中，基础知识必须牢固，今天开始，不仅要继续读源码类知识，还要复习基础知识。</p>

<h1>1. zepto中的原型</h1>

<p>我们只给出大概实现思路</p>

```
(function (window) {

    var zepto = {}

    zepto.init = function (selector) {
        // 省略复杂处理逻辑，只取原型相关的逻辑
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelectorAll(selector))
        return zepto.Z(dom ,selector)
    }

    function Z (dom ,selector) {
        var i, len
        len = dom ? dom.length : 0
        for (i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }

    zepto.Z = function (dom ,selector) {
        // 注意 new出现了
        return new Z(dom ,selector)
    }

    var $ = function (selector) {
        return zepto.init(selector)
    }

    // 挂载到全局
    window.$ = $

    $.fn = {
        css: function (key, value) {

        },
        html: function (value) {

        }
    }

    Z.prototype = $.fn // $.fn为了扩展原型方法

    
})(window)
```

<h1>2.jquery中的原型</h1>


```
(function (window) {
    var jQuery = function (selector) {
        // 省略复杂的逻辑 提取原型相关逻辑
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = {
        css: function (key, value) {
        },
        html: function (value) {
        }
    }

    var init = jQuery.fn.init = function (selector) {
        var slice = Array.prototype.slice
        var dom = slice.call(document.querySelector(selector))
        var i, len = dom ? dom.length : 0

        for (i = 0; i < len; i++) {
            this[i] = dom[i]
        }

        this.length = len
        this.selector = selector || ''
    }

    init.prototype = jQuery.fn // jQuery.fn为了扩展原型方法

    window.$ = jQuery
})(window)
```

<h1>3. 原型扩展</h1>

<p>jquery和zepto原型中，都把原型上的方法赋值到了一个对象上，原因是为了扩展原型方法。所以对于原型扩展举例，zepto和jquery的插件机制比较合适。</p>


```
$.fn.getName = function (name) {
    return name
}
```

<p>好处：</p>

<p>1. 只有$会暴露在window全局变量</p>
<p>2. 将插件扩展统一到$.fn.xxx这一个接口，方便使用</p>