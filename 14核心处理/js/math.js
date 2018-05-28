// 定义 math 模块
// define(function() {
// 	var add = function(x, y) {
// 		return x + y;
// 	};　　
// 	return {
// 		add: add
// 	};　
// });


// 如果加载该模块时，必须要 jQuery 的话，则
define(['jquery'], function($){
	function add(a, b){
		return a + b;
	}
	return {
		add : add
	}
})
