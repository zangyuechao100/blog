>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住核心API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，所以可能会省略一些比较基础的内容，但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。</p>

<h1>1.在开发过程中请求接口</h1>

<p>我们正常在开发过程中，肯定会去请求接口，在先进的项目中，我们通常使用axios来请求接口。(接口是假的，只是做例子)</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad506180310d4e?w=734&h=194&f=png&s=12659)


<p>这样项目中就会去进行get请求，拿到结果并打印。</p>

<h1>2.实现请求转发</h1>

<p>但是在实际开发中，开发环境和线上的接口域名往往是不一样的，所以我们通常会写成相对路径的形式。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad50d85a2d88c0?w=539&h=159&f=png&s=10737)


<p>只写成这种形式是肯定不行的，需要借助devServer来实现请求转发。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad51052a955a87?w=462&h=254&f=png&s=12002)


<p>重启服务后，会发现项目请求接口成功代理到了www.example.com这台服务器上。在浏览器network中，查看请求会发现，请求的地址依旧是localhost:9000，但是已经可以成功拿到返回值了。</p>

<h1>3.其他应用</h1>

<h2>3.1 请求另一个接口</h2>

<p>如果开发过程中，后端接口(/api/header.json)还没有开发好，现在有一个临时的mock接口(/api/demo.json)，也可以通过配置来实现这种需求。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad518aa80f854d?w=475&h=393&f=png&s=18642)


<p>这样我们在开发时，直接请求正式接口地址，但是通过proxy做一层代理，实际取的是/api/demo.json中的数据，这样就避免了手动替换接口。</p>

<h2>3.2 请求https接口</h2>

<p>当我们要请求https协议的接口时，要增加一个配置项。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad51fb766ec689?w=480&h=417&f=png&s=19054)

<h2>3.3 bypass 拦截</h2>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad52259cf4317d?w=687&h=439&f=png&s=29877)


<p>这段代码的意思是，如果请求的是一个.html路径，那么就直接返回根路径下index.html中的内容。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad523b81076166?w=676&h=445&f=png&s=28637)


<p>如果改成return false，意思是如果请求的是一个.html路径，就跳过这条转发规则，不经过转发，直接返回内容。</p>

<h2>3.4 根目录下的代理</h2>

<p>如果想对接口根目录下进行代理，需要这样配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad52742eeeed52?w=677&h=437&f=png&s=29063)

<h2>3.5 changeOrigin</h2>

<p>有些网站会对origin做限制，导致我们拿不到数据，所以我们在写转发规则的时候，一般都会加这个配置。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad52977990ccdd?w=682&h=444&f=png&s=30380)


<p>实际proxy的配置项还有很多，比如设置请求头，设置cookie等等，等我们再需要更多配置的时候，去查阅文档就可以了。</p>

<p>注：webpack devServer只在开发环境中生效，在线上时不会有任何效果。</p>


<h1>4.单页面路由</h1>

<p>我们开发单页面应用的时候，配置完路由后，进入/list页面，有时候会遇到cannot GET /list情况，这是为什么呢？因为服务器以为我们要访问后端list页面，所以就会提示我们页面不存在，那么要怎么解决呢？</p>

<p>我们要在devServer中配置一个配置项。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad5b367278b051?w=359&h=265&f=png&s=11004)


<p>原理是配置完后，现在无论访问服务器的任何一个路径，都会把请求转换为对根路径的请求，即index.html</p>


<p>historyApiFallback还可以配置为一个对象。</p>


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad5b77049c6cb7?w=328&h=388&f=png&s=15914)


<p>意思是，如果访问abc.html，就代理到list.html。</p>

<p>当代码上线后，devServer就不好用了，所以需要后端小伙伴仿照historyApiFallback修改配置。</p>