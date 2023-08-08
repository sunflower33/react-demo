### JSX
JSX 是 Javascript 语法拓展，可以让你在 Javascript 文件中书写类似 HTML 的标签
1. JSX 浏览器是不认识的，所以利用脚手架中SWC或者Babel进行编辑，转换成浏览器识别的代码
2. JSX and React 是相互独立的东西。但他们经常一起使用，但你可以单独使用他们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 Javascript 的库
3. JSX 转换成JS的流程
    JSX ---> 由Balel等转化成JS对象（虚拟DOM） ---> 由ReactDom转换成DOM
4. JSX语法与HTML之间的写法区别
    html原生标签要小写
    标签必须要闭合
    class和for是JS关键，在作为标签属性要写成className和htmlFor
    html标签的原生属性要使用驼峰式命名，自定义属性则随意
    大括号使用Javascript，但对象和函数是不能直接放到JSX {} 中的
    属性使用大括号
    添加注释，在大括号内添加注释
    唯一根标签
5. 样式
    行间样式, style
    全局样式，xxx.css
    局部样式, xxx.module.css
