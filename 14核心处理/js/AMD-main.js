

// AMD 加载规范的文件入口

//  jQuery 3.1.1 在 AMD 规范处，用 define() 定义了该模块
// 也可以看出 AMD 规范用 require() 加载，define() 定义
// 这个地方的 jquery 则是在 jQuery 内部用 define() 定义的模块
// 也就是说在 jQuery 源码，那部分，实现了 AMD 的规范
// require(['jquery'], function($){
// 	// $ 是数组第一个参数的引用
// 	console.log($().jquery)//=> 3.1.1
// })


// requireJS 还提供 config()
// 可在这里面配置加载
require.config({
	paths: {
		"jquery": "../../jquery-2.0.3",
	}
})

require(['jquery'], function($){
	// $ 是数组第一个参数的引用
	console.log($().jquery)//=> 2.0.3
})
// require.js要求，每个模块是一个单独的js文件
// 	这样的话，如果加载多个模块，就会发出多次HTTP请求，会影响网页的加载速度
// http://requirejs.org/docs/optimization.html


// 加载 math 模块 
require(['js/math.js'], function(math){
	console.log(math.add(1,2));//=> 3
})
// math 如果有依赖 jQuery 则加载 jQuery ,后结果还是 3