
// 首先将 root 变成 global 方便理解
(function(global, factory) {

	// 3. CommonJS  --> exports || module.exports
	// CommonJS 以 exports 提供对外接口
	if (typeof exports === 'object' &&
		// 并且 jQuery 还完整的判断了 exports 的宿主对象 module
		typeof module.exports === 'object') {
		// 则用 module.exports 对外接口
		// 进一步判断当前全局是否是 Node 环境
		module.exports = global.document ?  // 因为只有 window 才有 document
			// 如果不是，则用 global 的环境定义模块， 也就是工厂方法的第二个参数 noGlobal
			factory( global, true):  // 参数2 为 true ，则在 aQuery 内部判断不为全局
			// 否则 ，重新为 exports 定义
			function( w ) {
				if ( !w.document ) {
					throw new Error( "aQuery requires a window with a document" );
				}
				// 因为还是不满足 CommonJS 所以还是交给工厂方法判断
				return factory( w );
			};
	}
	// 如果不是 CommonJS/Node
	else{
		// 则交给工厂方法判断
		factory( global );
	}

// 最后判断当前的全局是 window 还是 global 
// Node 环境下 typeof window 会返回 undefined
})( typeof window !== 'undefined' ? window : this , function(window, noGlobal) {
	// jQuery 在工厂方法中传入的两个参数
	// window 浏览器对象
	// noGlobal 用于判断是否是 global 
	// 		Node 的全局变量
	// 定义该模块核心类
	var aQuery = function aQuery(){
		return new aQuery.prototype.init();
	}
	aQuery.fn = aQuery.prototype = {
		constructor : aQuery,
		aquery : '+1.0.0',
		init : function(){

		}
	}
	aQuery.version = '1.0.0';
	aQuery.fn.init.prototype = aQuery.fn;

	// 在工厂方法中检测是否支持 AMD 规范
	// 1. AMD --> define.amd
	if (typeof define === 'function' && define.amd) {
		// 则用 define() 定义
		// define(['aquery'], factory);
		
		// 实现 AMD 规范
		// 模块名 aquery
		// 没有依赖
		// 工厂方法，为模块初始化要执行的函数或对象
		//		因为 AMD 规范也可以直接返回
		define("aquery", [], function() {
			return jQuery;
		});
	}



	// 如果不是 Node 全局变量，则就是是 window 
	// 2. 浏览器全局变量(root 即 window)
	if( !noGlobal ) {
		// window.aQuery = factory() return => aQuery
		window.aQuery = aQuery;
	}


	// 暴露公共方法
	// 这也是为了给浏览器全局变量设置
	return aQuery;
});
