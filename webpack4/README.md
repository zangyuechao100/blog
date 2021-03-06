>之前学习过webpack3的知识，但是webpack4升级后还是有很多变动的，所以这次重新整理一下webpack4的知识点，方便以后复习。

<p>这次学习webpack4不仅仅要会配置，记住API，最好还要理解一下webpack更深层次的知识，比如打包原理等等，进展或许会慢一些，
但是希望我可以通过此次学习掌握webpack，更好地应对以后的工作。
</p>

<h1>目录</h1>
<h2>核心概念</h2>

1.webpack4之图片打包：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/1.%E6%89%93%E5%8C%85%E5%9B%BE%E7%89%87

2.打包静态资源（上）: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/2.%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E4%B8%8A%EF%BC%89

3.打包静态资源（下）: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/3.%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%EF%BC%88%E4%B8%8B%EF%BC%89

4.使用plugins便捷打包：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/4.%E4%BD%BF%E7%94%A8plugins%E4%BE%BF%E6%8D%B7%E6%89%93%E5%8C%85

5.sourceMap：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/5.sourceMap

6.使用webpack提升效率: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/6.%E4%BD%BF%E7%94%A8webpack%E6%8F%90%E5%8D%87%E6%95%88%E7%8E%87

7.热模块更新: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/7.%E7%83%AD%E6%A8%A1%E5%9D%97%E6%9B%B4%E6%96%B0

8.使用babel处理ES6语法: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/8.%E4%BD%BF%E7%94%A8babel%E5%A4%84%E7%90%86ES6%E8%AF%AD%E6%B3%95

<h2>高级概念</h2>

1.Tree Shaking: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/1.Tree%20Shaking

2.production与development区分打包: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/2.production%E4%B8%8Edevelopment%E5%8C%BA%E5%88%86%E6%89%93%E5%8C%85

3.Code Splitting: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/3.Code%20Splitting

4.splitChunksPlugin: https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/4.splitChunksPlugin

5.Lazy Loading懒加载与Chunk：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/5.Lazy%20Loading%E6%87%92%E5%8A%A0%E8%BD%BD%E4%B8%8EChunk

6.打包分析,Preloading,Prefetching：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/6.%E6%89%93%E5%8C%85%E5%88%86%E6%9E%90%2CPreloading%2CPrefetching

7.CSS文件代码分割：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/7.CSS%E6%96%87%E4%BB%B6%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2

8.webpack与浏览器缓存：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/8.webpack%E4%B8%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98

9.Shimming：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/9.Shimming

10.环境变量：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/10.%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F

11.Library打包：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/11.Library%E6%89%93%E5%8C%85

12.PWA打包配置：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/12.PWA%E6%89%93%E5%8C%85%E9%85%8D%E7%BD%AE

13.DevServer实现请求转发与单页面路由：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/13.DevServer%E5%AE%9E%E7%8E%B0%E8%AF%B7%E6%B1%82%E8%BD%AC%E5%8F%91%E4%B8%8E%E5%8D%95%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1

14.配置EsLint：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/14.%E9%85%8D%E7%BD%AEEsLint

15.提升Webpack打包速度的方法：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/15.%E6%8F%90%E5%8D%87Webpack%E6%89%93%E5%8C%85%E9%80%9F%E5%BA%A6%E7%9A%84%E6%96%B9%E6%B3%95

16.多页面应用打包：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E9%AB%98%E7%BA%A7%E6%A6%82%E5%BF%B5/16.%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%89%93%E5%8C%85

<h2>3.底层原理</h2>

1.如何编写loader：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86/1.%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99loader

2.如何编写plugin：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86/2.%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99plugin

3.实现简易webpack：https://github.com/zangyuechao100/blog/tree/master/webpack4/%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86/3.%E5%AE%9E%E7%8E%B0%E7%AE%80%E6%98%93webpack