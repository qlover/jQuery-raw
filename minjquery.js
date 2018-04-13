// jQuery 的结构
(function(window) {
	var jQuery = (function() {

		// jQuery 中一些初始化的变量
		var arr = [];
		var document = window.document;
		var getProto = Object.getPrototypeOf;
		var slice = arr.slice;
		var concat = arr.concat;
		var push = arr.push;
		var indexOf = arr.indexOf;
		// 这里用于 type 判断，先手动给，后面有方法
		var class2type = {
		    "[object Boolean]": "boolean",
		    "[object Number]": "number",
		    "[object String]": "string",
		    "[object Function]": "function",
		    "[object Array]": "array",
		    "[object Date]": "date",
		    "[object RegExp]": "regexp",
		    "[object Object]": "object",
		    "[object Error]": "error",
		    "[object Symbol]": "symbol"
		};
		var toString = class2type.toString;
		var hasOwn = class2type.hasOwnProperty;
		var fnToString = hasOwn.toString;
		var ObjectFunctionString = fnToString.call( Object );
		var support = {};

		function DOMEval( code, doc){}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module




		var
			versiont = '3.1.1',
			// 切记写了构造器就紧接着写原型！！！
			jQuery = function(selector, context) {
				console.log('jquery', selector, context);
				return new jQuery.fn.init(selector, context);
			};

		// jQuery 原型
		jQuery.fn = jQuery.prototype = {
			constructor: jQuery,

			each : function(){ },

		};

		// jQuery extend() 
		// => jQuery.isArray()
		// => jQuery.isPlainObject()
		// => jQuery.isFunction()
		jQuery.extend = jQuery.fn.extend = function() {
			var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// 判断是否为深拷贝
			if (typeof target === "boolean") {
				deep = target;

				// 参数后移
				target = arguments[i] || {};
				i++;
			}

			// 处理 target 是字符串或奇怪的情况，isFunction(target) 可以判断 target 是否为函数
			if (typeof target !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}

			// 判断是否 jQuery 的扩展
			if (i === length) {
				target = this; // this 做一个标记，可以指向 jQuery，也可以指向 jQuery.fn
				i--;
			}

			for (; i < length; i++) {

				// null/undefined 判断
				if ((options = arguments[i]) != null) {

					// 这里已经统一了，无论前面函数的参数怎样，现在的任务就是 target 是目标对象，options 是被拷贝对象
					for (name in options) {
						src = target[name];
						copy = options[name];

						// 防止死循环，跳过自身情况
						if (target === copy) { // 防止 options[name] == target
							continue;
						}

						// 深拷贝，且被拷贝对象是 object 或 array
						// 这是深拷贝的重点
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
							// 说明被拷贝对象是数组
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && Array.isArray(src) ? src : [];
								// 被拷贝对象是 object
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// 递归拷贝子属性
							target[name] = extend(deep, clone, copy);

							// 常规变量，直接 =
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			return target;
		}
		
		// 扩展的第一批静态方法
		jQuery.extend({
				
				isFunction: function( obj ) {
					return jQuery.type( obj ) === "function";
				},
				
				isWindow: function( obj ) {
					return obj != null && obj === obj.window;
				},

				type: function( obj ) {
					if ( obj == null ) {
						return obj + "";
					}
					return typeof obj === "object" || typeof obj === "function" ?
						class2type[ toString.call( obj ) ] || "object" :
						typeof obj;
				},

				// 建立一个数组，结果仅供内部使用
				makeArray: function( arr, results ) {
					var ret = results || [];

					if ( arr != null ) {
						if ( isArrayLike( Object( arr ) ) ) {
							jQuery.merge( ret,
								typeof arr === "string" ?
								[ arr ] : arr
							);
						} else {
							push.call( ret, arr );
						}
					}

					return ret;
				},

				// 合并数组
				merge: function( first, second ) {
					var len = +second.length,
						j = 0,
						i = first.length;

					for ( ; j < len; j++ ) {
						first[ i++ ] = second[ j ];
					}

					first.length = i;

					return first;
				},
		});


		function isArrayLike(obj){
			var length = !!obj && "length" in obj && obj.length,
				type = jQuery.type( obj );

			if ( type === "function" || jQuery.isWindow( obj ) ) {
				return false;
			}

			return type === "array" || length === 0 ||
				typeof length === "number" && length > 0 && ( length - 1 ) in obj;
		}

		// Sizzle 类的声明，也是个闭包
		var Sizzle = (function(){ })( window );


		// ....
		// ....
		


		// jQuery 3.1.1 将 init 方法单独的抽了出来
		var rootjQuery,

			rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
			// 这里其实就是把在原型里面写的单独拿出来写了
			// jQuery.fn.init === jQuery.prototype.init 
			// 而 jQuery.fn === jQuery.prototype
			// 在找节点的时候是从右向左找，不要问为什么，这个效率更高
			// root 作为备用
			init = jQuery.fn.init = function( selector, context, root ) {
				var match, elem;

				// $(""), $(null), $(undefined), $(false)
				if ( !selector ) {
					return this;
				}
				// 表示 document 
				// 默认 rootjQuery ,而 rootjQuery = jQuery(document)
				// rootjQuery 对根的引用
				root = root || rootjQuery;
				

				// 匹配字符串
				if( typeof selector === 'string' ){
					console.log('string')
					// 如果是字符串，先强行匹配一次以 <> 开头并以 </> 结尾的字符串
					if ( selector[ 0 ] == '<' &&
						selector[ selector.length - 1 ] == '>' &&
						selector.length >= 3 ) {
						// 因为后面匹配用的是 match ，而 match 被正则匹配出来是个数组
						// 这里是强行创建一个数组
						match = [ null, selector, null ];
					} else {
						match = rquickExpr.exec( selector );
					}


					// 然后在处理其它的字符串情况，包括 #id
					if ( match && ( match[ 1 ] || !context ) ) {

						// 因为 需要 parseHTML() 方法
						// 又因该方法小涉及的对象比较多，后面讲述
						

						// 得到处理 html 
						// $(html)
						if ( match[1] ) {
							// 记得返回 this 因为 链式
							return this;
						} 
						// $(#id)
						else {
							console.log('id')
							// 匹配到的 id 值存放在第三个元素中
							elem = document.getElementById(match[2]);
							if (elem) {
								this[0] = elem;
								this.length = 1;
							}

							// 返回 this
							return this;
						}
						
					}
					// $(expr, jQuery )
					// 该用法是在后一个上下文中查找前一个匹配的匹配
					else if ( !context || context.jquery ) {
						console.log('msg', context)
						// return ( context || root ).find( selector );

					// $(expr, Element)
					// 相当于 $(context).find()
					} else {
						// return this.constructor( context ).find( selector );
					}

				}
				// $(DOMElement)
				else if ( selector.nodeType ) {
					console.log('nodetype')
					this[ 0 ] = selector;
					this.length = 1;
					console.log('over', this)
					return this;
				}
				// $(function(){})
				else if ( jQuery.isFunction( selector ) ) {
					alert("ready 事件");
				}
				return jQuery.makeArray( selector, this );
			};

		// jQuery.fn.init.prototype = jQuery.fn;
		// 因为该方法就是直接在原型上写的 jQuery.fn.init，所以 init 已经存在于原型上了
		// 只是这个时候又单独拿出来了，所以为了方便简洁，将 jQuery.fn.init 代替成了 init
		// 这是 jQuery 的写法
		init.prototype = jQuery.fn;


		// 取得对文档的中心引用
		// 并且还有个作用，就是当 init 初始化完后，jQuery(document) 又会初始化一次 
		// 并将 rootjQuery 设置为 document jQuery 对象
		rootjQuery = jQuery( document );

		return jQuery;
	})();
	window.jQuery = window.$ = jQuery;
})(window);