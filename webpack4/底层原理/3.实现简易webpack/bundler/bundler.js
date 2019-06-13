const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
    // 借助node中的fs模块，读取js内容
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = parser.parse(content, {
        sourceType: 'module' // 入口文件是ES Module的话，sourceType填写module。
    });
    const dependencies = {}; // 所有文件依赖
    traverse(ast, {
        ImportDeclaration ({ node }) { // 如果抽象语法树中包含引入语句，就执行这个函数
            const dirname = path.dirname(filename);
            const newFile = path.join(dirname, node.source.value);
            dependencies[node.source.value] = newFile;
        }
    })

    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })

    return {
        filename,
        dependencies,
        code
    }
}

const makeDependenciesGraph = (entry) => {
    // 分析文件的路径
    const entryModule = moduleAnalyser(entry);
    const graphArray = [entryModule];
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const { dependencies } = item;
        if (dependencies) {
            for (let j in dependencies) { // dependencies是一个对象，可能有很多键值对
                graphArray.push(moduleAnalyser(dependencies[j])); // 分析的结果都放到graphArray里面
            }
        }
    }

    const graph = {}; // 把数组整合到对象中
    graphArray.forEach((item) => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })
    return graph;
}

const generateCode = (entry) => {
    const graph = JSON.stringify(makeDependenciesGraph(entry)); // 如果不进行字符串处理，闭包中传入的就是[Object Object]

    // 返回的应该是一串代码，并且用闭包防止污染全局
    return `
        (function (graph) {
            function require (module) {
                // 相对路径转绝对路径，因为require执行后如果还有依赖，执行require拿到的是相对路径
                function localRequire (relativePath) {
                    // 去对象中取绝对路径
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function (require, exports, code) {
                    // 再执行require的时候，就是执行我们传入的require，都会转成绝对路径
                    eval(code);
                })(localRequire, exports, graph[module].code);
                return exports; // 下个模块引用的时候能拿到结果
            };
            require('${entry}')
        })(${graph});
    `;
}

const code = generateCode('./src/index.js');

console.log(code);



