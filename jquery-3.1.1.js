console.log('\njQuery3.1.1 >>>>');
/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	// // 该方法生成一个新的 jQuery 对象
	// ret 就是新生成对象
	// 而 ret 的 prevObject 指向调用该方法的那个 jQuery 对象
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		// 将 elems 合并到 jQuery 对象中
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		// 实现对象栈
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	// 回溯方法
	end: function() {
		// 如果该对象有 prevObject 就返回其上一个对象
		// 没有则返回 jQuery() 
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	// jQuery 对象的一个标识符
	// 由 jQuery + 版本号 + 随机数，并将非数字去掉
	// 这个 expando 是 静态的，还有个在 Sizzle 中，那个表示的是实例的
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	// 判断 obj 是否为空
	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// 用于生成驼峰的命名
	// Convert dashed to camelCase; used by the css and data modules
	// -> 将冲向CamelCase；使用CSS和数据模块
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	// -> 微软忘了增加他们的供应商前缀
	// $.camelCase('name'); //=> "name"
	// $.camelCase('-ms-name'); //=> "msName"
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
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

	// 判断元素 elem 是否在 arr 中
	inArray: function( elem, arr, i ) {
		// item 出现的位置
		// start 从那个索引开始查找到末尾
		// array.indexOf(item,start)
		// 查找数组中 item 出现的位置
		// 查到返回 item 所有索引，否则返回 -1
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	// 将 second 合并到 first 中
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

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	// 主要用于事件处理函数的标识,一个事件处理函数就有一个 guid 
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	// 这个 expando 是每 Sizzle 引擎解析出来对象的唯一标识
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes -> 检测 XML 节点
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

// 检查是否一种元素是另一个dom元素的后代
// 如果第二个参数是文本或注释节点，将返回false。
Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		// console.info('$> $.fn.init')
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}
		// console.info('$/> $.fn.init')
		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	// 向当前 jQuery 数组对象添加 jQuery 对象
	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},
	// 用来替换 andSelf() 
	// 也就在 DOM 操作的最后将自己添加到 jQuery 数组中
	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
// 匹配不是空白部分
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *            整个回调队列只能被一次 fire()
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *            当前 fire() 会记录上一次 fire() 的参数
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *					-> 将确保只能添加一次回调(列表中没有重复)。
 *            不能添加相同的回调函数
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *             回调中有返回 false 则整个队列后面不再执行
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	// 1. 处理 options 
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );


	// createOptions() 返回的是一个对象
	// 键值分别是 flag 和 boolean
	// console.info('$> Callbacks', options);
	// 默认为空对象


	// 定义四个 flag 
	var // Flag to know if list is currently firing
		// 是否正在触发
		firing,

		// Last fire value for non-forgettable list
		// 记录执行的回调
		memory,

		// Flag to know if list was already fired
		// 是否已经被触发
		fired,

		// Flag to prevent firing
		// 记录是否只调一次回调
		locked,

		// Actual callback list
		// 真实传入的回调列表
		list = [],

		// Queue of execution data for repeatable lists
		// 执行的队列
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		// 当前触发回调的索引(根据需要通过添加/删除修改)
		firingIndex = -1,

		// Fire callbacks
		// 遍历可执行队列，并执行回调
		fire = function() {
			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			// 对所有挂起的准备执行,允许索引发生更改
			fired = firing = true;
			// 循环可执行队列长度次数
			for ( ; queue.length; firingIndex = -1 ) {
				// shift()
				// 从数组中移除第一个元素并返回
				memory = queue.shift();

				while ( ++firingIndex < list.length ) {
					// console.log('>while', list[ firingIndex ].name, memory);

					// Run callback and check for early termination
					// 运行回调并检查是否提前终止
					// apply() 和 call()
					// 参数固定用 call()
					// 参数不固定用 apply()
					// 两个方法的第一个参数分别都是 context ，但这里用 apply()
					// 而 memory 是以数组的形式记下
					// 	[
					// 		执行的当前对象(也就是 Callbacks 返回的对象), 
					// 		形参
					// 	]
					// 	因为回调列表有会有很多方法
					// 	又因为不明确传入的方法参数是否只有一个
					// 	所以用 apply()
					// console.log('options.stopOnFalse', options.stopOnFalse)
					// console.log('options.memory', options.memory)
					// 当调用该方法返回的是 false 时并且
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						// 跳到末尾，忘记数据，这样 add() 就不会重新启动
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it -> 如果我们把它处理完的话，忘了这些数据吧
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good -> 如果我们结束了 firing 
			// 就是参数是 once 传入时 
			if ( locked ) {
				// console.log('is locked');
				// Keep an empty list if we have data for future add calls 
				// -> 如果我们有未来添加调用的数据，则保留一个空列表。
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				//  -> 否则这个对象是用掉的
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		// Callbacks() 返回的对象，就是它
		self = {
			// 并且该对象的这几个add, remove, empty, disable, lock, firewith, fire 将返回 this

			// Add a callback or a collection of callbacks to the list
			// 将回调或回调集合添加到列表中
			add: function() {
                // console.log('$> Callback.self.add', arguments)
				// 如果回调列表不是 "" 或是 [] 就添加
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					// -> 如果我们有过去运行的内存，我们应该在添加
					// 也就是如果有运行过的回调，并且当前没有在运行的回调，并且当前没有在运行
					if ( memory && !firing ) {
						// 重置回调索引
						firingIndex = list.length - 1;
						// 将运行过的再次添加
						queue.push( memory );
					}

					// 向回调列表中添加
					( function add( args ) {
						// 在内部遍历传入的回调集合
						// 用的是 jQuery.each() 
						// _ 表示索引
						// arg 表示 value
						jQuery.each( args, function( _, arg ) {
							// 如果是函数
							if ( jQuery.isFunction( arg ) ) {
								// unique 是options 对象的一个键
								// 表示是只添加过一次
								
								// 没有添加过，或者 arg 没有在 list 中
								if ( !options.unique || !self.has( arg ) ) {
									// 将 arg 压入 list
									list.push( arg );
								}
							}
							// 如果不是函数
							// arg 存在，长度存在，并且类型为 string
							else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								// -> 递归查检
								add( arg );
							}
						} );
					} )( arguments );

					// 也就是如果有运行过的回调，并且当前没有在运行
					if ( memory && !firing ) {
						// 则执行
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			// 移除一个回调在 list 中
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						// splice() 删除替换元素，这种方法会改变原始数组！。
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// -> 检查 list 中 是否有回调
			// If no argument is given, return whether or not list has callbacks attached.
			// -> 如果没有给定参数，则返回List是否附加了回调。
			has: function( fn ) {
				return fn ?
					// 因为 list 是一个数组，所以用 jQuery.inArray() 判断
					jQuery.inArray( fn, list ) > -1 :
					// 返回长是否大于 0 
					list.length > 0;
			},

			// Remove all callbacks from the list
			// 清空所有回调
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// -> 禁用 fire() 和 add()
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				// 将执行队列，调用一次 falg ，memory 和 list 都清空
				locked = queue = [];
				list = memory = "";
				return this;
			},
			// 使回调列表变假
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// -> 禁用 fire()
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			// --> 也禁用.add，除非我们有内存(因为它没有效果)中止任何待执行的执行
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			// 调用到 Callbcaks 的 fire ，传入的 上下文和参数, 在该内部拼成一个待执行回调
			fireWith: function( context, args ) {
                // console.log('$> Callback.self.fireWith')
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					// 如果当前没有正在执行的，则执行
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			// 该方法是 Callbacks 返回的对象所执行的 fire
			// 传入参数调用 fireWith()
			fire: function() {
                // console.log('$> Callback.self.fire')
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			// -> 要知道回调是否至少已被调用过一次
			fired: function() {
				// 返回是否已经触发的布尔值
				return !!fired;
			},

            // 用于测试
            _firing: firing,
            _memory: memory,
            _fired: fired,
            _locked: locked,
            _queue: queue,
            _list : list,
            _getList : function(){
                return list;
            },
		};
	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

// jQuery Defrred 对象
jQuery.extend( {

	// Deferred() 构造器
	Deferred: function( func ) {
        console.info('$> $.Deferred')
		// 创建三个 $.Callbacks 对象
		// 分别表示处理中(progress)，完成(done)和失败(fail)三个状态
        // 同样也对应三种回调
        //  resolve -> doneCallbacks
        //  reject  -> failCallbacks
        //  notify  -> progressCallbacks
        // 并且都是只执行一次的回调队列
        //  memory : 执行当前 fire(上一个参数), 从队列头到尾执行 fire(当前参数)
        //  once + memory: 所有 fire(第一个参数) 都执行一次
         
        // tuples 表示的就是数据的集合，一个元素就代表一种 deferred 回调队列对象
        // 第一个元素为处理中队列 ProgressList
        // 第二个元素为完成队列 DoneList
        // 第三个元素为失败队列 FailList
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
                ["notify", "progress", jQuery.Callbacks("memory"),
                    jQuery.Callbacks("memory"), 2
                ], 
                ["resolve", "done", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 0, "resolved"
                ], 
                ["reject", "fail", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 1, "rejected"
                ]
			],
            // 初始化状态
			state = "pending",
            // 可以理解成内部类，也是附加在最终 deferred 上的 promise 
			promise = {
                // 返回状态
				state: function() {
					return state;
				},
                // 不管 resolve 和 reject 都交给 done() 和 fail() 执行
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
                // 添加在拒绝延迟对象时调用的处理程序
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
                // -> 保持管道为后部
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
                /**
                 * 添加三种不同的 List 回调
                 * @param  {Function} onFulfilled DoneList 回调
                 * @param  {Function} onRejected  FailList 回调
                 * @param  {Functio} onProgress  ProgressList 回调
                 * @return {[type]}             [description]
                 */
				then: function( onFulfilled, onRejected, onProgress ) {
                    // 在该方法内部只做了这两件事
                    console.log('$> Deferred.promise.then', arguments);
                    var maxDepth = 0;
                    // console.log('$> promise.then this', this)
                    // 这里的 this 表示当前 deferred 对象
                    
                    // 第一件事声明一个内部函数
                    // 该方法返回一个函数，这个函数做为回调传入到对应 List 的第三个位置的 Callbacks 对象的回调
                    /**
                     * 内部生成回调函数的方法
                     * @param  {Number} depth    [description]
                     * @param  {object} deferred 一个新的 Deferred 对象,并不污染 then() 当前的 this 
                     * @param  {handler} handler  到头就是 then() 传进来再在后面 $.each() 判断后存在的那三个回调之一
                     * @param  {object} special  主要用于判断是否传入的 progressCallbacks 方法
                     * @return {[type]}          [description]
                     */
                    function resolve( depth, deferred, handler, special ) {
                        return function () {
							var that = this, 
                                // 得到 最外部 传入的回调函数
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}
                                    // 得到最外部的三个回调之一的返回值
									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
                                    // 如果返回值是 promise 对象
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
                                // -> 只有普通处理器(解析)捕获和拒绝异常
                                //  如果传入的有 progressCallbacks 回调
                                //      则为 mightThrow 
                                //      否则重新定义一个
								process = special ?
									mightThrow :
									function() {
                                        // 执行,如果有异常
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

                    // 第二件下，返回一个新的 Promise 对象
                    // 这也是为什么，3.1.1 的 then() 返回的不再是最开始的 this
					return jQuery.Deferred( function( newDefer ) {
                        // 分别向三个不同的 List 中的第二个，第二个
                        // 是第二个 Callbacks 对象添加回调队列
                        
						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise(); // 最后返回的是一个新的 promise 对象
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
                // 1. 组合 promise 
                // 2. 直接返回该 promise
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
            // 最终返回的 deferred 对象
			deferred = {
                // 用于测试
                _tuples : tuples,
            };

		// Add list-specific methods
        // -> 添加特定于列表的方法
        // 其实就是遍历 tuples ，为每种状态的队列动态生成以下方法
        //  progress() done() fail() 三种回调的执行
        //  notifyWith() resolveWith() rejectWith() 
        //  notify() resolve() reject() 这些方法
		jQuery.each( tuples, function( i, tuple ) {
			var
                // 将回调函数列表取得
                list = tuple[ 2 ], 
                // 再将最后的状态得到
				stateString = tuple[ 5 ]; 

            // progress() done() fail() 方法在这里被添加
			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			// progress() done() fail() 三个方法其实就是一个 Callbacks.add()
            promise[ tuple[ 1 ] ] = list.add;

			// Handle state
            // 操作状态字符串
			if ( stateString ) {
                // 则向该 list 添加三个回调到回调队列
				list.add(
                    // 第一个回调
					function __state() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
                        // 更改当前状态
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
                    // [3-i] 从后向前取回调列表的 disable() 方法
                    // 第二个回调，就是该 list 的 disable() 
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
                    // 直接取 progress_callbacks.lock()
					tuples[ 0 ][ 2 ].lock
				);
                
            }
			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
            // 不管是那种回调队列，最后一个元素始终会是 fire()
			list.add( tuple[ 3 ].fire );

            // console.log('\t> list', list._getList());

            // 这也说明了调用每种状态的方法其实就是调用对应的 xxxWith() 然后最后返回 this
			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
            // 与上面样，组装 xxxWith() 方法，而具体的函数体则是该回调对象的 fireWith()
			deferred[ tuple[ 0 ] ] = function() {
                // console.log(`\t> ${deferred[ tuple[ 0 ] + With ]}()`)
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
            // 得到 xxxWith() 方法体
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );
        // 三种 deferred 回调队列的回调 执行对应 deferred 回调队列的 fire()
        // 三种 notify(), resolve(), reject() 分别调用 xxxWith() 方法
        // 而三种 xxxWith() 方法对应三种 deferred 回调队列的 fireWith()

		// Make the deferred a promise
        // 调用内部的 promise.promise() 将 promise 附加到 deferred 对象中
		promise.promise( deferred );

		// Call given func if any
        // 如果 $.Deferred() 传入的函数
		if ( func ) {
            // 则先调用该函数，早于返回值的调用
            // 并且该函数接收一个参数，就是准备返回的这个 deferred 
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}

/**
 * 对一个方法有 set/get 时,并且还有多种操作时,主要就是用于重载
 * @param  {$}   elems     当前操作的 jQuery 数组对象
 * @param  {Function} fn        用于处理得到的 key,value 做 get/set 操作
 * @param  {object}   key     分三种情况, 字符串, 对象, null
 * @param  {object}   value     传入的值,可以是字符串,可以是函数
 *                              当是函数时, value(index, oldPropertyValue ) 获取当前对象索引为 index 的 key 的原来的值
 * @param  {number}   chainable true 表示可以链式调用 fales 表示不能
 * @param  {undefined}   emptyGet  目前未知
 * @param  {boolean}   raw       判断 value 是否是一个函数 true 表示不是 fale 则是
 * @return 用 chainable 判断,如果为 treu 返回元素自己,如果为 false 则不返回自己            
 */
// 其中有个未知的就是 key 为 null 时
/*
fn 回调用于 get/set 
fn(elem, key) -> get
fn(elem, key, value) -> set

key, value 分别是键和值,操作 fn 的 fn(elem, key, value) -> set
如果只有 key 则操作 fn 的 get fn(elem, key) -> get
key 是一个对象,则递归执行 access
当 key, value 分别是键和函数时, value 为 value(index, oldPropertyValue)
	执行时 oldPropertyValue 的值是 fn(elem, key) -> get 
	其返回值就是 fn(elem, key, value) -> set 的 value 

 */
function access( elems, fn, key, value, chainable, emptyGet, raw ) {
	// console.info('$> access ->', arguments);
	var i = 0,
		len = elems.length,
		// 记录 key 是否是 null
		bulk = key == null;

	// Sets many values
	// 设置多个值,也就是说 key 传进来是一个对象
	if ( jQuery.type( key ) === "object" ) {
		// console.log('/t> set many values')
		// 允许链式调用
		chainable = true;
		// 遍历 key 
		// 因为 access() 该方法是一个一个处理参数,并不能直接处理多个,所以要递归
		for ( i in key ) {
			// 其实这里面还是走的是设置一个值
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	// 设置一个值
	} else if ( value !== undefined ) {
		// console.log('\t> set one value');
		// 允许链式调用
		chainable = true;

		// 判断 value ,就是传入的值是否是一个函数
		if ( !jQuery.isFunction( value ) ) {
			// console.log('\t> value not Function')
			// 然后用 raw 记录
			raw = true;
		}
		// 用于测试传入的 value 是否是函数
		else{
			// console.log('\t> value is Function')
		}

		// 当 key 为 null 时, $.fn.html() $.fn.text() 时被调用
		if ( bulk ) {
			// console.log('\t> bulk', bulk)
			// Bulk operations run against the entire set
			// -> 大容量操作对整个集合运行
			// value 不是函数
			if ( raw ) {
				// console.log('\t\t> bulk value not Function');
				// 操作 fn(value); 
				fn.call( elems, value );
				// 并且让该回调只执行一次
				fn = null;

			// ...except when executing function values
			} 
			// value 是一个函数
			else {
				// console.log('\t\t> bulk value is Function');
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};

			}
		}

		// 如果回调存在
		if ( fn ) {
			// console.log('\t> have fn');
			// 则循环执行 fn
			// 将每一个 elem, key, name 都交给 fn 处理
			for ( ; i < len; i++ ) {
				fn(
					// fn(elem, name, value)
					// elem = elems[i]
					// name = key
					elems[ i ], key, raw ?
					// 用 raw 记录的 value 为 true 不是一个函数
					// value = value
					value :
					// 是一个函数, raw 为 false
					// 则调用 value ,this 为当前 元素
					// 注意,这里的 value 的第二个参数是 fn(elem, key) get 操作,不在是 set
					// 也就是说此时的回调的返回值就是做为 value 的参数二 
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
					// 最后 value 的返回就当做 fn(elem, key, value) 的 value 值
				);
			}
		}
	}

	// 如果需要返回当前 jQuery 对象
	if ( chainable ) {
		// console.log('$/> access chainable', chainable)
		// 则直接返回当前对象
		return elems;
	}

	// Gets
	if ( bulk ) {
		// console.log('$/> access bulk', bulk)
		return fn.call( elems );
	}

	// 如果 key 不是一个 object, 是字符串, 数组也是一样，直接返回
	// 则直接执行回调 fn
	// 此时 fn 的返回值就是 该方法的最终返回值
	// console.log('$/> access');
	// 如果当前 jQuery 数组对象中长度不为 0 
	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
// 用于在 jQuery 内部测试
// =============================== 内部测试 access ====================================== //
/*
$.fn.prop() 方法为例
/*
$.fn.prop: function( name, value ) {
	return access( this, jQuery.prop, name, value, arguments.length > 1 );
}
有这四种用法
get
	.prop( propertyName )

set
	.prop( propertyName, value )
	.prop( properties)
	.prop( propertyName, function )

	jQuery.prop(elem, name, value)
	$.acc( elems, fn, key, value, chainable, emptyGet, raw )
*/
{

var $ = jQuery;
var b1 = $('#btn1');
var b2 = $('#btn2');

// 准备一个类 arguments 的数组
var name, value;
var $arguments;
/*
// .prop( attributeName ) 第一种情况
console.log('第一种情况')
name = 'id';
$arguments = [name];
console.log(
	access(b1, function $prop(elem, name, value){
		console.log('$> fn', arguments);
		// 内部利用 hook 方法得到最后结果
		return elem[name];
	}, name, value, $arguments.length > 1)
);//=> btn1


// .prop( propertyName, value ) 第二种情况
console.log('第二种情况')
name = 'id';
value = 'bootstrap';
$arguments = [name, value];
console.log(
	access(b1, function $prop(elem, name, value){
		console.log('$> fn', arguments);
		// 内部利用设置 elem 的 id 值为 bootstrap
		// 但是因为是设置,返回的值并不是 access 最终返回的值
		// 而在 chainable 中返回
		return ( elem[ name ] = value );
	}, name, value, $arguments.length > 1)
);//=> jQuery.fn.init [button#bootstrap]


// .prop( properties) 第三种情况
console.log('第三种情况')
//  name 为一个对象
name = {
	'id': 'r-btn1'
};
$arguments = [name];
console.log(
	access(b1, function $prop(elem, name, value){
		console.log('$> fn', arguments);
		// 内部利用设值
		return ( elem[ name ] = value );
	}, name, value, $arguments.length > 1)
);//=> jQuery.fn.init [button#r-btn1]


// .prop( propertyName, function ) 第四种情况
console.log('第四种情况')
name = 'id'; // 有 name 
// 并且 value 还是一个方法,这是主要是为了模拟外部调用,所以不写成匿名方法
value = function(index, oldPropertyValue ){
	console.log('$> value', arguments);
	// 返回的值就是最后要 set 的值
	return "superBtn"
};
$arguments = [name, value];
console.log(
	access(b2, function $prop(elem, name, value){
		console.log('$> fn', arguments);
		// 该回调会被调用两次,第一次 get ,第二次 set
		if(!value){
			return elem[name]
		}else{
			return ( elem[ name ] = value)
		}
	}, name, value, $arguments.length > 1)
);//=> jQuery.fn.init [button#superBtn]

// 测试 key == null 的情况, $.fn.html() $.fn.text()
value = `<a href="?sub=php">PHP</a>`;
$arguments = [value];
console.log(
	access(b2, function(value){
		// 此时的 value 就是外部传入的那个 value 
		// 然后 $.fn.html() 就在这里面处理 value 
		console.log('$> value', value);//=> <a href="?sub=php">PHP</a>
	}, null, value, $arguments.length)
);

//*/
}
// =============================== 内部测试 access ====================================== //



// 判断元素是什么类型
var acceptData = function( owner ) {
	// console.info('$> acceptData ->', arguments);
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};



// Data 构造器
function Data() {
	// console.info('$> Data', arguments);
	// jQuery.expando 是 jQuery 的一个标识符
	this.expando = jQuery.expando + Data.uid++;
}
// 将 uid 初始为 1
// 就是存放的是缓存索引
Data.uid = 1;

// Data 原型
// 有以下几个方法 cache,set,get,access,remove,hasData
Data.prototype = {
	// 建立一个 cache
	cache: function( owner ) {

		// Check if the owner object already has a cache
		// 检查当前对象的 expando 是否已经存在，也就是检查是否已经有缓存
		var value = owner[ this.expando ];

		// If not, create one
		// 如果没有，则创建缓存
		if ( !value ) {
			// 该对象就是 jQuery 缓存内部本身的一个缓存对象
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				// 判断这个对象是否合格
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		// 有缓存则直接返回
		return value;
	},
	// 设置 key, value
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// 操作三个参数
		// Always use camelCase key (gh-2257)
		// 骆驼命名法
		if ( typeof data === "string" ) {
			// jQuery.camelCase() 方法专门用于生成一个驼峰命名的 key 
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		// 操作两个参数
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			// 返回所有缓存
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	// 该方法结合了 get 和 set 
	// 并返回 key 或者是 value 
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			// 用数组形式的 key 去删除
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			}
			// 如果不是一个数组，只是一个 键 
			else {
				// 则强行构建一个数组
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;
			// 删除
			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		// cache 为空的时候，删除整个缓存
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	// 判断是否有缓存
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
// -目-前-应-该-是-用-于-存-放-缓-存-的-两-个-变-量-对-象-
// 看了 $.event 现在知道了这两个缓存对象是什么了

// 用于 DOM 事件，$.event 中的缓存都在这
// 主要缓存两个对象，events 和 handle
// event 东西比较多，比如绑定了一个 click 事件，则 events['click'] = []
// handle 则是 addEvenetListener 添加的那个回调
var dataPriv = new Data();

// 用于 $ , 就是 jQuery 通用
var dataUser = new Data();
// dataPriv.expando < dataUser.expando;


// 用于测试
jQuery.dp = dataPriv;
jQuery.du = dataUser;



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

// 取参数中的值
// 将字符串数字转换成数字
// 将数组，对象字符串转换成对应的数组，对象的对象
// 其它则返回本身 
function getData( data ) {
	console.info('$> getData', arguments);
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	// -> 只有在不更改字符串的情况下才转换为数字
	if ( data === +data + "" ) {
		return +data;
	}

	// 如果是一个对象字符串
	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}


// 从 DOM 中搜索以 data- 开头属性的函数
function dataAttr( elem, key, data ) {
	// console.info('$> dataAttr', elem, key, data)
	var name;

	// 也就是取 data-* 的属性
	// 当 data 为 undefined 时 并且 元素是节点元素
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	// -> 如果内部没有发现任何东西，请尝试获取任何来自HTML 5数据的数据-*属性
	if ( data === undefined && elem.nodeType === 1 ) {
		// 得到将 key 变成小写后的键
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		// 调用原生 API，得到该属性值
		data = elem.getAttribute( name );
		// console.log('\t> dataAttr', name, data);
		// 如果 data 的值是字符串，也就是有值，有 name 这个缓存 data- 数据
		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}
			console.log('\t> data', data)
			// Make sure we set the data so it isn't changed later
			// -> 确保设置数据，以便以后不再更改
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
// dataAttr 用于测试
// dataAttr(jQuery('#top')[0], 'id');//=> > data #top
// dataAttr(jQuery('#mid')[0], 'id');//=> > data null



// $.data
jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );
// $.fn.data
jQuery.fn.extend( {
	data: function( key, value ) {
		// console.iinfo('$> jQuery.fn.data ->', key, value);
		var i, name, data,
			// 得到这一组 jQuery 对象的第一个 DOM 对象
			elem = this[ 0 ],
			// 并取得这个元素的所有属性
			attrs = elem && elem.attributes;

		// 当没有参数时，获得所有的值
		// Gets all values
		if ( key === undefined ) {
			// 如果当前  jQuery 数组不为空
			if ( this.length ) {
				// 从当前的 dataUser 得到这组对象的所有缓存
				// 这个 get() 是 Data.prototype 下的方法
				data = dataUser.get( elem );

				// nodeType 值
				// 1  ELEMENT_NODE
				// 2  ATTRIBUTE_NODE
				// 判断这个 jQuery 数组对象中是不是 ELEMENT_NODE
				// console.log('\t>', dataPriv.get( elem, "hasDataAttrs" ));
				// "dataAttr" 对象的这个键表示是否有属性缓存的标识
				if ( elem.nodeType === 1 && !dataPriv.get( elem, "dataAttr" ) ) {
					// 搜索该元素的所有属性
					// 也就是看该元素有没有以 data- 开头的属性
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								console.log('$.fn.data() -> dataAttr');
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					// 设置了属性缓存，就将标识设置为 true
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// 设置多个值
		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}
		// elem = this, 
		// fn = function(value){}, 
		// key = null, 
		// value = value, 
		// chainable = arguments.length > 1, 
		// emptyGet = null, 
		// raw = true
		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			// 这是就是 access 中空参的那个 fn 调用
			if ( elem && value === undefined ) {
				console.log('return 空参 fn 被调用 ')
				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				// console.log('$.fn.data() -> return access() -> dataAttr')
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
// RegExp.source 返回匹配可用的文本
// 应该是匹配一个浮点数
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );

var rcheckableType = ( /^(?:checkbox|radio)$/i );
// 匹配标签名
var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
// 匹配脚本类型
var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
// -> 我们必须关闭这些标记以支持XHTML
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

/**
 * 获取指定上下文中的所有节点或所有指定节点
 * @param  {object} context 上下文
 * @param  {tag} tag     指定的节点
 * @return {array} ret   数组结果
 */
function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}
// 用于测试 getAll()
jQuery.getAll = getAll;


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;
/**
 * 返回文档片段对象
 * @param  {object} elems     被操作的元素集合
 * @param  {object} context   上下文
 * @param  {[type]} scripts   [description]
 * @param  {[type]} selection [description]
 * @param  {[type]} ignored   [description]
 * @return {[type]}           [description]
 */
function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		// 上下文一般为 document 
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/**
 * 事件绑定函数-> 其实只对参数校正
 * @param  {jQuery}   elem     事件绑定元素
 * @param  {string|object}   types    事件名或事件处理对象
 * @param  {string}   selector 过滤的选择器
 * @param  {object}   data     传递的参数，evenet.data
 * @param  {Function} fn       处理程序
 * @param  {number}   one      绑定次数
 * @return {[type]}            [description]
 */
function on( elem, types, selector, data, fn, one ) {
	// console.info('$> innner on')
	// 该方法有个很重要的思想就是重组参数,让每个形参位上都有值
	// 也就是说如果在外部像这样的调用时 on(elem, 'click', function(){})
	// 其形参 selector 应该是 undefined
	// 形参 data 也应该是 undefined 
	// 这个时候就需要重组参数
	// 其实就是以不同的方法调用
	// 再看下面的时候,将 types 当做第一个形参
	// 因为在外部调用时,只有 4 个参数
	
	// type 用于局部变量存入 types 是对象情况的每一个键
	// origFn 在内部存放 fn 的引用
	var origFn, type;

	// Types can be a map of types/handlers
	// types 可以是单个事件名，多个事件名
	// types 为对象时, 先处理
	if ( typeof types === "object" ) {
		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {
			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		// 递归执行每一个
		for ( type in types ) {
			// console.log('\t> recursion on')
			on( elem, type, selector, data, types[ type ], one );
		}
		// 直接返回该元素
		return elem;
	}

	// 外部调用只有两个参数
	if ( data == null && fn == null ) {
		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	}
	// 外部调用只有三个参数
	else if ( fn == null ) {
		if ( typeof selector === "string" ) {
			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {
			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}

	// 经过上面的判断形参位都已经被重组
	// 这个时候,如果  fn 为 false ,则表示直接返回 false 阻止默认行为
	if ( fn === false ) {
		fn = returnFalse;
	}
	// 如果为其它情况则直接返回该元素
	else if ( !fn ) {
		return elem;
	}

	// 次数等于一时
	// 当其它正常流程走完,则调用  $.fn.off() 将该绑定的事件取消掉
	if ( one === 1 ) {
		// 得到传入的 fn 引用
		origFn = fn;
		// 在内部重新定义 fn 
		fn = function( event ) {

			// Can use an empty set, since event contains the info 
			// jQuery() 得到一个空的 jQuery 对象
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		// -> 使用相同的GUID，以便调用者可以使用OrigFn删除
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}

	// 到这该  on() 方法只是重组参数来校正参数
	// 而真正的源头是 jQuery.event
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 * -> 用于管理事件的辅助函数--而不是公共接口的一部分
 * -> 为迪恩·爱德华兹的AdEvent图书馆提供许多创意的道具。
 */
jQuery.event = {

	// 该对象用于记录某个事件是否已经被添加
	// 并没有什么用
	global: {},


	// 添加事件，类 addEvent 的 addEvent()
	// 也是 $.fn.on() 最终添加事件的地方
	/**
	 * 绑定事件的源头
	 * @param {Element|object} elem     元素对象
	 * @param {string|object} types    事件名或集合
	 * @param {function} handler  处理的函数
	 * @param {data} data     附带传入的数据
	 * @param {string} selector 选择器，用于过滤
	 */
	add: function( elem, types, handler, data, selector ) {
		// console.info('$> $.event.on', arguments)
		// 一大堆的属性
		// 分开来看
		// type, origType, data, handler, guid, selector, needsContext, namespaces
		// 这几个属性是用于构造一个 handleObj 对象的属性
		var handleObjIn, 
			eventHandle,  // 与 addEvent 的 handleEvent 函数一样
			tmp,
			events, 
			t, 
			handleObj,  // 事件处理对象
			special, 
			handlers,  // 该 type 类型事件的处理对象 存在于 dataPriv['events'][type]
			type,  // 事件类型
			namespaces, 
			origType, // 原始事件类型
			// 查看 elem 的在 dataPriv 上的缓存是什么数据
			// 如果是 文本或注释节点，则不添加事件
			elemData = dataPriv.get( elem );
			// console.log('\> elemData', elemData)
		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		// -> 不要将事件附加到noData或文本/注释节点(但允许普通对象)
		if ( !elemData ) {
			return;
		}
		// console.log('\t> handler.handler', handler);
		
		// Caller can pass in an object of custom data in lieu of the handler
		// 如果  handler 是一个事件处理对象，并且有 handler 属性
		if ( handler.handler ) {
			console.log('\t> handleObjIn', handleObj)
			// 构造一个小的 handleObjIn 外部对象
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// -> 确保无效的选择器在附加时间引发异常
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		// 确保这个 handler 是有 guid 的， 用于 find/remove 它
		if ( !handler.guid ) {
			// $.guid 是一个静态的 guid 
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		// -> 元素的事件结构和主处理程序，如果这是第一个
		// 初始化 events 和 handle 两个对象
		
		// 整个关键,  elemData 从缓存得到的两个对象  events handle
		// 之后可见都是对这两个对象筛选 ,分组

		// 初始化 events 
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		// 初始化 handle
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function ( e ) {
				// console.log('\t> eventHandle')
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				// -> 放弃jQuery.Event.trigger()和在页卸载后调用事件时
				// 最终执行在这
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		// 多个事件数组
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		// 每个事件都处理
		while ( t-- ) {
			// 参数处理
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			// 得到事件类型，和原始事件类型，也就是说事件类型有没有 on 开头的
			type = origType = tmp[ 1 ];
			// 得到是否有命名空间,就是事件中没有得点
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			// -> 必须有一个类型，没有附加名称空间的处理程序。
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			// -> 如果事件更改其类型，则使用已更改类型的特殊事件处理程序
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			// 根据是否已定义selector，决定使用哪个特殊事件api，如果没有非特殊事件，则用type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			// type状态发生改变，重新定义特殊事件
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			// -> handleObj 是传递给所有处理程序
			// 进行浅拷贝
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			// 如果添加的不是第一个，也就是说该 type 事件没有添加过
			// events[ type ] 对应的 事件处理列表
			if ( !( handlers = events[ type ] ) ) {
				// 就让该事件处理列表为一个空数组
				handlers = events[ type ] = [];
				// delegateCount 用来记录是否委托数
				// 通过传入的selector判断，此刻就能派上用场了
				// 1 表示是委托
				// 0 表示普通绑定
				// 但此时有两种情况
				// 	- 元素本身有事件
				// 	- 元素又要处理委托事件
				// 这个主要交给 $.event.handler() 来处理
				handlers.delegateCount = 0;

				// 采用自定义事件或者浏览器接口绑定事件

				// Only use addEventListener if the special events handler returns false
				// addEventListener 也只是添加过了一次
				// 目前 special.setup 只支持的是 focusion 和 focusout 两个事件
		        // 如果获取特殊事件监听方法失败，则使用addEventListener进行添加事件
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			// -> 添加到事件列表, delegates 要在前面
			// 这也就是判断是否存在委托
			if ( selector ) {
				// 如果有委托则在队列头添加执行对象
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				// 否则添加再后面
				handlers.push( handleObj );
			}
			// 这样就达到了事件队列的委托在前，自身事件在后的顺序
			// 这样也跟浏览器事件执行的顺序一致了


			// Keep track of which events have ever been used, for event optimization
			// 在 $.event.global 中注册，该 type 事件已经被添加
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	// 事件的执行
	// nativeEvent 是 $.event.add 方法传来的参数
	// 是一个 arguments 一个类数组
	dispatch: function( nativeEvent ) {
		// console.info('$> $.event.dispatch');
		// Make a writable jQuery.Event from the native event object
		// 把 nativeEvent 变成可读写，jQuery 认可的 event
		var event = jQuery.event.fix( nativeEvent );
		// event.__proto__ == $.Event.prototype //=> true
		var i, 
			j, 
			ret, 
			matched, 
			handleObj, 
			handlerQueue,  // 
			// 得到一个 arguments 的副本
			args = new Array( arguments.length ),
			// 从 缓存 中搜索处理的事件
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			// 得到特殊的事件
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		// 将 args 的第一个元素置为 $.Event 对象
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		// 对 handlers 处理，区分事件类型，并按照顺序排好
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );
		// console.log('\t> handlerQueue', handlerQueue)
		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					// 传递参数，将 handleObj 参数交给 event 
					event.handleObj = handleObj;
					event.data = handleObj.data;

					// 最终执行在这里
					// 先执行特殊的事件，或者是原生的事件, 再执行 events 中的事件
					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							// 阻止默认行为和冒泡
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}
		// console.info('$/> $.event.dispatch', event.result)
		return event.result;
	},

	// 在 dispatch 执行的时候，对事件进行校正
	// 区分原生与委托事件；
	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// -> 查找委托处理程序
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			// 火狐浏览器右键或者中键点击时，会错误地冒泡到document的click事件，并且stopPropagation也无效
			!( event.type === "click" && event.button >= 1 ) ) {


			// 在当前元素的父辈或者祖先辈有可能存在着事件绑定
			// 根据冒泡的特性，我们的依次从当前节点往上遍历一直到绑定事件的节点
			// 取出每个绑定事件的节点对应的事件处理器
			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				// 过滤一些不能点击的节点
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";
						// 用 sizzle 引擎去查找
						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}
		// console.info('handlerQueue ->', handlerQueue)
		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	// 将原生的 event 事件修复成一个可读可写且有统一接口的对象
	// 这个对象就是 $.Event
	fix: function( originalEvent ) {
		// 用来判断 originalEvent 是否是一个 $.Event 对象
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	// 几个特殊的事件
	// 这也是用来做模拟事件的
	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {
	// console.log('$> $.Event', arguments);
	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	// 阻止默认操作
	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	// 停止冒泡
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	// 阻止剩下的事件处理程序被执行
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// 原型上的三个事件操作方法
// $.fn.on 和 $.fn.one 都是调用了 on() 这个方法
// 所以 on() 这个才是绑定事件的主要方法
// 而 $.fn.off() 是自己实现
jQuery.fn.extend( {

	// 绑定事件
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	// 绑定一次事件
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	// 取消事件绑定
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


// 用于测试
// jQuery('button').on('click', function _cb1(event) {
// 	console.log(event, jQuery.dp)
// });
// jQuery('button').on('click', function _cb2(event) {
// 	console.log(event, jQuery.du)
// });




var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	// 匹配 XHTML 标签
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	// 匹配 checked="checked" or checked 这种字符串
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	// 判断 elem 的 nodeName 是否等于 table 
	if ( jQuery.nodeName( elem, "table" ) &&
		// 并且查看内容 content 是否不等于 文档片段(Documnet-Fragment)
		// 如果不是则该 content 的第一个元素的 NodeName 是否是 tr 
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		// 如果都成立
		// 则返回该元素的第一个 tobody 或是该元素本身
		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	// 否则直接返回该元素
	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
// -> 替换脚本元素的 type 属性，以便安全地进行DOM操作
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
// -> 还原脚本元素的 type 属性，以便安全地进行DOM操作
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

// 一些 $.fn 中操作 DOM 的核心方法
// 该方法只出现于 parseHTML() 和 domManip()
/**
 * 操作 DOM 的核心方法
 * @param  {$}   collection 当前的$对象
 * @param  {object}   args       需要添加的任意形式的对象
 * @param  {Function} callback   回调
 * @param  {[type]}   ignored    [description]
 * @return {$}              遵从 jQuery 最后返回自己
 */
// 主要用于 $.fn.append, $.fn.after, $.fn.before
function domManip( collection, args, callback, ignored ) {
	console.info('$> domManip', arguments)
	// Flatten any nested arrays
	// 就是将伪的 arguments 转换成 array，类 $.fn.append() 传入的参数的类数组
	// 切记 args 是传入的 arguments 数组
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,  // 当前 $ 对象的长度
		// 如果当前的jQuery对象是一个合集对象
		// 那么意味着通过文档碎片构件出来的dom，只能是副本克隆到每一个合集对象中
		// 如果该 $ 为集合
		// 如果该 $ 不集合,则 iNoClone = 0
		iNoClone = l - 1,  // 多个节点操作需要克隆
		value = args[ 0 ], // 得到类 $.fn.append() 传入的第一个参数
		// 也就是 $.fn.after() $.fn.append() 参数是函数的情况
		// 记录第一个参数是否是函数，如果是函数则表示 $.fn.append(function(index, html){})
		isFunction = jQuery.isFunction( value );  
	// We can't cloneNode fragments that contain checked, in WebKit
	// 先执行参数一是函数的情况
	if ( isFunction ||
			// 或者当前是有 jQuery 数组有对象
			// 且外部调用时传入的参数是字符串
			// 且是 checked=checked 或 checked 和情况
			( l > 1 && typeof value === "string" &&
				// rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i
				!support.checkClone && rchecked.test( value ) )
	) {
		console.log('\t> value is Function')
		// 遍历每个 jQuery 对象
		return collection.each( function( index ) {
			// 用 $.fn.eq() 得到索引的元素
			var self = collection.eq( index );
			// 如果是处理函数
			if ( isFunction ) {
				// args[0] 返回外部传入的那个函数的返回值
				args[ 0 ] = value.call( this, index, self.html() );
				console.log('\t> args[0]', args[0])
			}
			// 递归处理多个 jQuery 对象的情况
			// 到这里也就说明了第二次调用 domManip() 时
			// 参数就不再是函数，而是外部回调返回的那个值
			domManip( self, args, callback, ignored );
		} );
	}

	// 执行插入
	// 外部参数不再是一个函数
	console.log('\t> no a Function')
	// 如果当前 jQuery 对象数组有元素
	if ( l ) {
		console.log('\t> insert');
		// 得到 fragment
		// args -> 数组包括的 HTML,Node,jQuery,也就是将添加到 fragment 中的元素集合
		// collection[ 0 ].ownerDocument -> 根的引用 #document
		// false
		// collection -> 遍历的当前对象
		// ignored -> undefined
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		// fragment  => #document-fragment
		// fragment.childNodes => NodeList   // fragment 片段中添加的需要添加的元素

		// 如果片段中只有一个需要添加的元素
		if ( fragment.childNodes.length === 1 ) {
			// 则让片段就为该片段的第一个元素
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		// 如果存在有添加的元素
		if ( first || ignored ) {
			// 得到片段中的所有 script 标签
			// 将用 $.map 替换对应的 type 
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			// 记录是否有 script 标签
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			// -> 对最后一项使用原始片段而不是第一个，因为它最终可能在某些情况下被错误地清空
			for ( ; i < l; i++ ) {
				node = fragment;

				// 如果是当前的 $ 为集合
				// 因为 i 从 0 开始
				// 如果当前 $ 不是集合则 iNoClone 是为 0 
				if ( i !== iNoClone ) {
					// 则深度克隆一次当前的 node 
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					// -> 保存对克隆脚本的引用，以便以后恢复。
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}
				// 真执行插入的操作,处理时，接收一个节点，和索引值 i 
				// 回调，this 指向当前回调的 elem，这点很重要
		        // 很重要,collection[ i ] == $(this)
				callback.call( collection[ i ], node, i );
			}

			// 然后处理有 script 的情况
			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) && // 再次出现 access()
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}
	console.info('$/> domManip')
	return collection;
}

// 用于测试
jQuery.dom = domManip;
jQuery.mt = manipulationTarget;


function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	// 将 html 标签替换成 XHTML 标签格式
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	// $.clone 克隆元素
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	// 设置与获取纯文本内容
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				// get
				// jQuery.text == Sizzle.getText
				jQuery.text( this ) :
				// set
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						// 用 textContent 设置文本值
						// 主要是因为考虑到兼容
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	// 向当前的元素添加元素
	append: function() {
		// 返回一个 domManip() 
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				// 该方法主要用于兼容 tbody 在 IE 5- 中不存在的情况下得到元素
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	// 设置或获取 html 文本
	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;
			// 如果 value 为空 并且当前元素是元素节点
			if ( value === undefined && elem.nodeType === 1 ) {
				// 则直接返回 innerHTML
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			// -> 看看我们是否可以走捷径，只需使用innerHTML
			
			// 如果值等于字符串 且 不是script, link, style 这样的标签值
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				// rtagName 匹配标签名,也就是说,如果标签名不是 option 或者 是 tr ,td 这样的标签
				// wrapMap[option|thead|col|tr|td] 
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				// 则将 value 变成 XHTML 标签格式
				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						// 移除元素节点,并且预防内存泄漏
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							// 设置 innerHTML 
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				// -> 如果使用innerHTML引发异常，请使用回退方法
				} catch ( e ) {}
			}

			if ( elem ) {
				// 清空,然后添加
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

// /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i
// 应该是匹配一个非像素的字符串单位，而是百分比或者其它
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

// 获取元素 CSSStyleDeclaration 对象
// 也就是计算后的所有样式, getComputedStyle() 获取
var getStyles = function( elem ) {
	console.log('$> getStyles')
		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		// 兼容的获得 getComputedStyle 的父对象
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};
// 用于测试 getStyles
jQuery.gStyle = getStyles;

( function() {
	// 应该是用于兼容
	
	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// -> 同时执行像素位置和盒位置的可靠性测试只需要一个布局
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		// -> 这是单例，我们只需要执行一次
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();

/**
 * 从计算后的样式中获取一个元素的属性名的值, 
 * @param  {object} elem     DOM 元素
 * @param  {string} name     属性名
 * @param  {objecct} computed 计算后的样式对象
 * @return {[type]}          [description]
 */
function curCSS( elem, name, computed ) {
	console.info('$> curCSS', arguments)
	var width, minWidth, maxWidth,
		ret,  // 存放计算后的样式的值
		// style 元素对象实例
		style = elem.style;

	// 当有传入计算后的样式的对象时，则用该对象，否则重新获取，
	computed = computed || getStyles( elem );

	// console.log('\t> style computed', style == computed)//=> false 

	// Support: IE <=9 only -> 支持 IE <= 9
	// getPropertyValue is only needed for .css('filter') (#12537)
	// 如果计算后的样式存在
	if ( computed ) {
		// getpRopertyValue() 只用于获取 filter 属性
		// 如果不是 filter 属性则直接  computed[name] 获取
		ret = computed.getPropertyValue( name ) || computed[ name ];

		// $.contains = Sizzle.contains 判断后一个元素是否是前一个元素的后代
		// 		如果第二个参数是文本或注释节点，$。包含()将返回false。
		// 如果为空 并且 elem 不是 document 的后代
		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			// 则用 $.style 获取
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// -> 这违反了 CSSOM 的草案
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() &&
			// 如果匹配出来不是一个像素单位
			rnumnonpx.test( ret ) && 
			// 匹配出来 是 margin 开头的字符串单位
			rmargin.test( name ) )
		{

			// Remember the original values
			// 记住原始的值
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			// -> 输入新值以求出新值
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		// IE 返回 zIndex 的值是一个整数，这里为了统一将它变成字符串
		ret + "" :
		ret;
}
// 用于测试 curCSS
jQuery.cs = curCSS;

function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	// 转换 normal 的值
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	// 各供应商的前缀
	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	// 准备一个空的 style 样式元素
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
// -> 返回映射到潜在供应商前缀属性的CSS属性
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	// 如果不是供应商的名称，直接返回
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	// 则检查供应商的名称
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				console.log('$> $.cssHooks.opacity.get', arguments)
				if ( computed ) {

					// We should always get a number back from opacity
					// -> 我们应该总是从不透明中得到一个数字。
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	// -> 不要自动将“px”添加到这些可能没有单位的属性中。
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	// $.style 设置与取值
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		// 如果元素不存在，或者是文档节点，注释节点，或者没有行内样式
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		// 确保名字
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			// 该元素的 style 行内样式对象
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		// 看是否有钩子
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		// 检查设置的值是否是存在
		// 设置属性值
		if ( value !== undefined ) {
			console.log('\t> $.style set')
			// 记录传入的是什么类型
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			// 传入字符串，并且是 += 或 -= 的字符串的数字
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			// -> 确保不设置 null 和 NaN
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// 传入数字
			if ( type === "number" ) {
				// $.cssNumber 匹配属性后面加 px 的属性值，否则加上 px 后缀
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			// 如果不支持 backgroundClip 并且 值为 "" ，并且属性中有 background 时
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				// console.log('\t> has background')
				// 将 style 属性的该属性变成 inherit
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			// 有钩子用钩子
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {
				// 如果利用钩子将值设置成功
				
				// 再用普通的方法将该 style 对象中设置
				style[ name ] = value;
			}

		}
		// 获取属性值
		else {
			console.log('\t> $.style get')
			// If a hook was provided get the non-computed value from there
			// 有钩子则用钩子设置
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			// 否则直接用普通方法直接设置
			return style[ name ];
		}
	},

	// $.css()  取值
	/**
	 * 取值，因为只有 style 才可以设置
	 * @param  {object} elem   当前元素
	 * @param  {string} name   属性字符串
	 * @param  {boolean|""} extra  限定符，暂时不知道做什么,取值可以是空串，true, false
	 * @param  {object} styles 计算后的样式对象
	 * @return {string}        最后返回的该属性的值
	 */
	/* css 也利用了和 attr, prop 一样的机制 Hook 机制 */
	css: function( elem, name, extra, styles ) {
		// console.info('$> $.css', arguments)
		var val, num, hooks,
			// 驼峰命名
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		// 确保属性名是对的
		name = jQuery.cssProps[ origName ] ||
			// 添加供应商的前缀，如果不需要则直接是过滤后的原生属性名
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		// -> 尝试前缀名称，后面跟着无前缀名称
		// 就是检查当前的这个属性名名字和或者是原生属性名的名字是否有钩子
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		// 如果有钩子
		if ( hooks && "get" in hooks ) {
			// 钩子取值 --> get 
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that、
		// 如果没有钩子
		if ( val === undefined ) {
			// 则从 curCSS() 取值
			val = curCSS( elem, name, styles );
		}
		// 其实不管是普通和钩子，都会从 curCSS() 去获取
		// 也就是说 curCSS() 才是真正获取属性值的地方

		// Convert "normal" to computed value
		// 将 normal 转换成计算的值
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		// -> 如果强制或提供了限定符，则使用数值表示，Val看起来是数字的。
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		// console.log('$/> $.css')
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			console.log('$> $.cssHooks[height/width]', arguments)
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	// $.fn.css 
	// 主要还是用 access 函数进行参数的整合，结果同样在回调中处理
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			// access 的 css 回调
			var styles, len,
				map = {}, // 返回的多个属性的值的对象
				i = 0;

			// 处理 name 传入的 key 是数组时
			if ( jQuery.isArray( name ) ) {
				// 得到当前元素的所有计算后的样式
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					// 向 map 依次添加对应的属性
					// name[ i ] 就是数组中的每一个属性名
					// 把属性名将给 $.css, 返回最终处理后的结果
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			// 同样的，如果 name 不是一个数组
			// 然后对 value 判断
			return value !== undefined ?
				// 如果 value 有值，则表示设置 --> get 
				jQuery.style( elem, name, value ) :
				// 如果 value 没值，则表示获取 --> set
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		console.log('$> $.attr', arguments)
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		// 对于 text, comment 和 attribute nodes 不处理
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		// 如果连这个函数都不支持，就用 $.prop 方法
		if ( typeof elem.getAttribute === "undefined" ) {
			console.log('\t> getAttribute == undefined')
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined

		// 同样和 $.prop 判断一样，看元素是不是一个 Element 或者是否是一个非 XML 元素
		// 先判断是否是特殊情况，如果是，那就复制 hooks
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			// jQuery.expr = Sizzle.selectors
			// Expr = Sizzle.selectors 
			// Sizzle.selctors.match = Sizzle.matchExpr
			// Sizzle.matchExpr = {}
			// Sizzle.matchExpr.bool = new RegExp( "^(?:" + booleans + ")$", "i" )
			
			// 将 name 变成小写
			// jQuery 式的判断，查看在 attr 钩子中是否有这个键
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				// 或者看 name 是否是 HTML 属性是布尔值的
				// 如果是就调用  boolHook
				// 	boolHook 是一个用于布尔值属性的钩子，且只有 set 方法
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		// 如果有值
		if ( value !== undefined ) {
			
			// 但如果值为 null ，则移除该属性值
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			// 设置
			// 如果有钩子处理则优先钩子处理
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}
			// 否则正常处理
			elem.setAttribute( name, value + "" );
			return value;
		}

		// 取值
		// 钩子处理优先
		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}
		// 普通处理
		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	// attr 钩子
	// 但它只处理 type 这个 HTML 属性，并且钩子只处理 set 
	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	// elem DOM 对象
	// 以 Element.prop | Element[prop]
	prop: function( elem, name, value ) {
		console.log('$> $.prop ->', elem, name, value)
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		// 对于 text, comment 和 attribute nodes 不处理
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// 先判断是否是特殊情况，如果是，那就复制 hooks
		// 如果元素不是 ELEMENT_NODE 或者非一个 XML 元素
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			console.log('\t> not XML', nType)
			// Fix name and attach hooks
			
			// jQuery 式的判断，看没有有 name 这个键
			name = jQuery.propFix[ name ] || name;
			// jQuery 式的判断，看钩子中有没有 name 这个键
			hooks = jQuery.propHooks[ name ];
			console.log('\t> name, hooks ->', name, hooks)
		}
		// 设置值
		// 	看到这先暂停，因为需要看 hooks 才能明白
		if ( value !== undefined ) {
			console.log('\t> $.prop set')

			// 查看得到的这个  hooks 中有没有 set 方法
			// 如果有利用钩子进行 set 
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				console.log('\t> prop hook set value')
				return ret;
			}
			console.log('\t> prop direct set value')
			// 如果上面钩子没有 set 方法，则走普通方法直接赋值
			return ( elem[ name ] = value );
		}

		// 得到值
		// 同样取值也是一样，查看 hooks 中有没有 get 方法
		// 如果有利用钩子进行 get 
		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			console.log('\t> $.prop get')
			return ret;
		}
		console.log('\t> $.prop direct get value')
		// 如果钩子没有 get 方法，则走普通方法护直接取值
		return elem[ name ];
	},

	// prop 钩子
	// 但只有一个需要执行钩子中的操作就是 tabIndex
	// 其它的只是一个修正
	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// 该方法主要用于兼容 IE9 - IE11
				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	// 保留值属性名字修正
	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	// 将多个类名组合成多个类名之间一个空格的字符串
	function stripAndCollapse( value ) {
		// 匹配出不是空白部分的数组
		var tokens = value.match( rnothtmlwhite ) || [];
		// 然后用 join 将数组以空格分开
		return tokens.join( " " );
	}

// 返回元素的 class 属性的值
function getClass( elem ) {
	// 如果该元素有 getAttribute 属性，则返回该元素的 class 属性，否则空串
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

// 为原型扩展的 class 操作
jQuery.fn.extend( {
	// 添加 class 
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;
		// 先处理传入函数的情况
		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		// 其次处理字符串的情况
		if ( typeof value === "string" && value ) {
			// 匹配以空格分开的所有类名数组
			classes = value.match( rnothtmlwhite ) || [];

			// 遍历每一个元素
			while ( ( elem = this[ i++ ] ) ) {
				// 得到当前元素原先的所有 class 类名
				curValue = getClass( elem );
				// 如果是元素节点，然后将元素类样式名字组合成一个空格分开
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				// 如果都满足以上两个条件
				if ( cur ) {
					j = 0;
					// 遍历每一个需要添加的类名
					while ( ( clazz = classes[ j++ ] ) ) {
						// 如果遍历添加的类名不再原先类名中
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							// 则在原先的基础上添加这个需要添加的类名
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					// 得到最后需要添加的类名字符串
					// 同样是用 stripAndCollapse() 用一个空格分开
					finalValue = stripAndCollapse( cur );
					// 如果最后处理的类名串和原先的类名串不相等
					if ( curValue !== finalValue ) {
						// 则调用原生 API 添加
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}
		return this;
	},
	// 移除 class
	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;
		// 同样先处理函数的情况
		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		// 如果没有参数
		if ( !arguments.length ) {
			// 直接调用 $.fn.attr() 将该元素的 class 清空
			return this.attr( "class", "" );
		}

		// 如果有类名串
		if ( typeof value === "string" && value ) {
			// 同样的得到以空格分开的类名字符串数组
			classes = value.match( rnothtmlwhite ) || [];

			// 遍历每一个元素
			while ( ( elem = this[ i++ ] ) ) {
				// 得到原先的所有 class 类名串
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				// 同样的操作
				// 	前后都加上空格，主要是为了移除方便
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				// 都满足以上两个条件
				if ( cur ) {
					j = 0;
					// 遍历每一个类名
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						// 如果类名存在
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							// 则将这个类名替换成空串
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					// 最后将所有的类名中以一个空格分开
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						// 重新设置回去
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	/**
	 * 切换 class 
	 * @param  {string} value    class name
	 * @param  {boolean} stateVal true 添加 class, false 则移除 class
	 * @return {[type]}          [description]
	 */
	toggleClass: function( value, stateVal ) {
		console.info('$> toggleClass')
		// 判断 value 是什么类型
		var type = typeof value;

		// 先处理 $.fn.toggleClass(className, state) 情况
		if ( typeof stateVal === "boolean" && type === "string" ) {
			// 如果为 true 添加
			// false 则删除
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		// 再处理函数情况
		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		// 最后其它情况
		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				// 取当前 jQuery 对象
				self = jQuery( this );
				// 得到以空格分开的类名数组
				classNames = value.match( rnothtmlwhite ) || [];

				// 遍历每一个类名
				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					// 用 $.fn.hasClass() 
					
					// 如果存在
					if ( self.hasClass( className ) ) {
						// 移除
						self.removeClass( className );
					} else {
						// 不存在就添加
						self.addClass( className );
					}
				}

			}
			// Toggle whole class name
			// 处理 $.fn.toggleClass(state) 这种情况，虽然已经过时
			else if ( value === undefined || type === "boolean" ) {
				console.log('\t> state', value)
				// 得到原先的类名串
				className = getClass( this );
				if ( className ) {

					// Store className if set
					// 如果有，则用 __className__ 属性将这个放入该元素的缓存
					dataPriv.set( this, "__className__", className );

					console.log('$.dp', dataPriv.get(this, "__className__"));
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				// -> 如果元素有一个类名，或者如果我们被传递为“false”，
				// -> 然后删除整个类名(如果有一个类名，则上面所保存的类名)。
				// -> 否则就把以前保存的东西拿回来(如果有的话)，
				// -> 如果没有存储任何内容，则返回到空字符串。
				// 重新设置
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						// 传入的为 false 则返回空串
						"" :
						// 否则返回缓存中的那一个原先的类名串
						dataPriv.get( this, "__className__" ) || "" // 如果没有则还是返回空
					);
				}
			}
		} );
	},

	/**
	 * 判断是否有某个 class 
	 * @param  {string}  selector class name
	 * @return {Boolean}          
	 */
	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		// 遍历当前 jQuery 对象集合
		while ( ( elem = this[ i++ ] ) ) {
			// 如果是元素节点
			if ( elem.nodeType === 1 &&
				// stripAndCollapse() 将元素类样式名字组合成一个空格分开
				// 并且该类名在组合后的字符串中则表示有
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	// 参数三种情况
	// 空 	返回值
	// 一个参数 	设置值
	// 函数	函数处理
	val: function( value ) {
		// hooks 钩子
		// isFunction 判断 value 是否是一个函数
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		// 取值，空参情况 
		// 取第一个元素的值，然后直接返回
		if ( !arguments.length ) {
			// 如果该元素存在
			if ( elem ) {
				// 相似吧
				// 得到该标签 type 属性为 option 或 select 的钩子处理机制
				// 如果没有则
				hooks = jQuery.valHooks[ elem.type ] ||
					// 得到该标签的名的钩子处理
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];


				// get
				// 如果有钩子走钩子处理
				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {

					return ret;
				}

				// 没则走普通方式
				ret = elem.value;

				// Handle most common string cases
				// 处理字符串情况的值
				if ( typeof ret === "string" ) {
					// 去掉换行
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				// 返回
				return ret == null ? "" : ret;
			}

			return;
		}

		// 记录 value 是否是一个函数
		isFunction = jQuery.isFunction( value );

		// 遍历当前 jQuery 对象数组
		return this.each( function( i ) {
			// 存入 value() 返回值
			var val;
			// ELEMENT_NODE 情况
			if ( this.nodeType !== 1 ) {
				return;
			}

			// 如果是函数
			if ( isFunction ) {
				// value() 的返回值
				// 调用了 value()
				// 并且，注意，还又一次调用了 val() 取值，所以间接的调用  getter
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				// 否则是参数函数的引用
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			// 为 null 
			if ( val == null ) {
				val = "";

			}
			// 将数字转换成字符串
			else if ( typeof val === "number" ) {
				val += "";

			}
			// 如果是 数组，分别转换成字符串
			else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
				// console.log('\t> jQuery.isArray', val)
			}

			// 同样钩子优先处理
			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			// 如果这里得到了钩子处理
			// 或者该钩子里有 set 
			// 或者该钩子的 set 方法设值失败
			// 		set 设值只有 select 标签才执行
			// console.log('$/> val()');
			if ( !hooks || !( "set" in hooks ) || 
				// 钩子设值，直接在这里操作，如果设置不成功则就走下面的普通设置
				// 调用的 $.valHooks.select.set(elem, name) 
				// 但是，也看得出来传入了三个参数，第三个参数
				hooks.set( this, val, "value") === undefined
			) {
				// console.log('$/> val() if')
				// 普通设值
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	// val 钩子
	// 处理两个，一是 option, 另一个是 select
	valHooks: {
		option: {
			get: function( elem ) {
				// console.log('$> valHooks.option.get')
				// jQuery.find = Sizzle
				// attr = Sizzle.attr(elem, name)
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				// console.info('$> valHooks.select.set', arguments)
				// 接收到了第三个参数  "value"
				// 也不知道这个参数有什么用目前还不清楚
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				// console.info('$/> valHooks.select.set', values)
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
// 在内部为 Radios and checkboxes 也做了扩展
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

// $.event 的扩展
jQuery.extend( jQuery.event, {

	// $.event.trigger
	/**
	 *  $.fn.trigger() 的源头
	 * @param  {string|object} event        事件类型或者是
	 * @param  {array} data         传递的数据
	 * @param  {object} elem         DOM 元素
	 * @param  {[type]} onlyHandlers 触发掩码，true 取消默认行为
	 * @return {[type]}              [description]
	 */
	/**
	 * 并且该方法主要用于完成这几个操作
	 * 1. 命名空间过滤
	 * 2. 模拟事件对象
	 * 3. 返回事件数据合集
	 * 4. $.event.special 
	 * 5. 模拟冒泡
	 * 		把当前 elem 存入数组；
	 *		查找当前 elem 的父元素，如果符合，push 到数组中，重复第一步，否则下一步；
	 *		遍历数组，从 data cache 中查看是否绑定 type 事件，然后依次执行
	 * 6. 处理事件
	 * 
	 */
	trigger: function( event, data, elem, onlyHandlers ) {
		// console.log('$> $.event.trigger', arguments)
		var i, cur, tmp, bubbleType, ontype, handle, special,
			// 模拟的事件冒泡过程中的元素
			eventPath = [ elem || document ],
			// 得到事件类型
			// 有两种情况
			// 1. event 是 Object 时取得该 object 的 type 
			// 2. event 就是一个事件名时
			type = hasOwn.call( event, "type" ) ? event.type : event,
			// 取命名空间
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		// 如果元素为文本或注释
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		// 仅对focus/blur事件变种成focusin/out进行处理
        // 如果浏览器原生支持focusin/out，则确保当前不触发他们
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		// 1. 命名空间处理
		// 处理后的事件名还有点
		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		// 2. 模拟事件对象
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		// -> 触发器位掩码：1用于本机处理程序；2用于jQuery(始终为true)
		// 对象 event 预处理
		
		// 表示已经用 trigger 触发
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		// 清除事件返回数据，以重新使用
		event.result = undefined;
		// 如果该事件没有 target 
		if ( !event.target ) {
			// 转交 target 
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		// 3. 返回的事件数据
		// 如果 data 为空，则传入处理函数的是event，否则由data和event组成
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		// 尝试通过特殊事件进行处理，必要时候退出函数
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		// 5. 模拟事件的冒泡
		// 如果需要冒泡，特殊事件不需要阻止冒泡，且elem不是window对象
        // onlyHandlers为true 表示不冒泡
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			// 冒泡时是否需要转成别的事件(用于事件模拟)
			bubbleType = special.delegateType || type;
			// 如果不是变形来的foucusin/out事件
			if ( !rfocusMorph.test( bubbleType + type ) ) {
                // 则定义当前元素父节点
				cur = cur.parentNode;
			}
			// 遍历自身及所有父节点
			for ( ; cur; cur = cur.parentNode ) {
				// 推入需要触发事件的所有元素队列
				eventPath.push( cur );
				// 存入下一个 cur 
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			// 如果循环中最后一个 cur 是 document，那么事件是需要最后触发到window对象上的
            // 将window对象推入元素队列
			if ( tmp === ( elem.ownerDocument || document ) ) {
				// defaultView 是 document 的属性，获取 document 的父亲，就是 window 
				// 		使用 defaultView 只有一种情况就是 FF 访问子框架内的样式 iframe 时使用
				// parentWindow 目前不清楚
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}
		// console.log('\t>eventPath', eventPath);

		// Fire handlers on the event path
		// 6. 事件处理
		// 触发所有该事件对应元素的事件处理器
		i = 0;
		// 遍历所有元素，并确保事件不需要阻止冒泡
		// isPropagationStopped() == returnFalse()
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			// 看事件是委托还是普通绑定
			event.type = i > 1 ?
				bubbleType :  // 委托 
				special.bindType || type;  // 特殊事件的普通绑定或者是一般的普通绑定

			// jQuery handler
			// 从 dataPriv 缓存中得到该元素的 events 对象下的处理函数
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			// 如果有
			if ( handle ) {
				// 则执行
				handle.apply( cur, data );
			}

			// Native handler
			// 取原生事件处理函数，相当于 elem.onload 这样绑定的方法
			handle = ontype && cur[ ontype ];
			// 判断该处理是否存在，并判断该元素的类型，元素节点或根节点
			if ( handle && handle.apply && acceptData( cur ) ) {
				// 则将得到事件的返回值
				event.result = handle.apply( cur, data );
				// 如果该事件返回是 false 
				if ( event.result === false ) {
					// 则阻止默认行为
					event.preventDefault();
				}
			}
		}
		// 将上一个事件类型保存
		event.type = type;

		// If nobody prevented the default action, do it now
		// 如果不阻止默认行为，则立即执行
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {
			// 尝试通过特殊事件触发默认动作
			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// -> 调用具有与事件同名的目标上的本机DOM方法。
				// Don't do default actions on window, that's where global variables be (#6170)
				// -> 不要在窗口上做默认操作，这是全局变量存在的地方(#6170)
				
				// 调用一个原生的DOM方法具有相同名称的名称作为事件的目标。
                // 例如对于事件click，elem.click()是触发该事件
                // 并确保不对window对象阻止默认事件
                
                // 该元素的 elem[type] 是个函数
                // 并且 elem 不是 window 
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					// 防止我们触发FOO()来触发其默认动作时，onFOO事件又触发了
					tmp = elem[ ontype ];

					if ( tmp ) {
						// 清楚掉这个原生的 ontype 
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					// 当我们已经将事件向上起泡时，防止相同事件再次触发
					jQuery.event.triggered = type;
					// 触发事件
					elem[ type ]();
					// 完成清楚标记
					jQuery.event.triggered = undefined;
					// 事件触发完了，可以把监听重新绑定回去
					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}
		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		// 重写事件
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);
		// 用 $.event.trigger 触发
		jQuery.event.trigger( e, null, elem );
	}

} );

// 触发事件方法
jQuery.fn.extend( {
	// 事件触发器
	// type 	事件类型
	// data 	事件传递的参数
	trigger: function( type, data ) {
		// 为当前的每一个 jQuery 元素都执行
		return this.each( function() {
			// 到头会发现，该方法的处理是交给 $.event.trigger 
			// 所以还要用上 $.event
			// 给 $.event.trigger(event, data, elem, onlyHandlers) 三个参数
			// 1. 事件的 type
			// 2. 传递的数据
			// 3. 当前的自己
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );

// 原型上的事件
jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	// 绑定处理方法
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			// 如果参数大于两个，则用 on 也就是用 disptach() 触发
			this.on( name, null, data, fn ) :
			// 否则用 trigger 触发
			this.trigger( name );
	};
} );

// 专们扩展的 hover 
jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;

// jQuery 对 FF 不支持 focusin 和 focusout 事件的处理

// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	// 这里会发现用的在内部用的是 focus 和 blur 事件绑定
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			// 该方法主要用于 FF 中模拟 focusion 和 focusout 事件的绑定
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			// 移除事件
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// 匹配 [] 结尾的串
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;
/**
 * 传统序列化方法，也就是单个序列一个对象的情况
 * @param  {object} prefix      遍历的键
 * @param  {object} obj         值
 * @param  {boolean} traditional 
 * @param  {Function} add         处理函数
 * @return {[type]}             [description]
 */
function buildParams( prefix, obj, traditional, add ) {
	var name;

	// 如果是一个普通数组
	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		// 序列化这个值是数组的情况
		jQuery.each( obj, function( i, v ) {
			// traditional 为真
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				// -> 将每个阵列项目视为标量
				// 则直接将 prefix 当前 key , 遍历的 v 当作 value 
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				// -> 项是非标量(数组或对象)，对其数字索引进行编码。
				buildParams(
					// 如果 v 不是一个标题，并且不为 null
					// 则递归序列
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	}
	// traditional 为假并且 obj 是一个普通对象
	else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	}
	// 否则直接用 add 序列化
	else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
// -> 将表单元素数组或一组键值序列化为查询字符串， 就是用 & 连接起来的一个字符串
// 创建一个数组、一个纯文本对象或 jquery 对象的序列化表示
// 该对象适合于 url 查询字符串或 ajax 请求中使用
// 如果传入 jquery 对象，则它应该包含具有 name/value 属性的输入元素。
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		// 内部的一个闭包, 用于将有 key 有 value 的元素变成  key = value 字符串
		// 添加到上层作用域中的 s 数组中
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			// -> 如果值是函数，则调用它并使用其返回
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;
			// encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	// 如果是数组
	// 或者是一个 jQuery 对象并且不是一个纯粹的对象, 且这个对象是有 name 和 value 属性的
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		// 遍历这个元素集合
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		// -> 如果是传统的，则用“旧”方式(1.3.2或更高版本)进行编码。)，否则将递归编码params。
		for ( prefix in a ) {
			// 这个方法同样是序列化的一个方法
			// 单个序列一个 key 的情况
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	// 最后返回这个 s 
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType  -> 键是 dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// 用于测试
jQuery.oga = originAnchor;
jQuery.pfs = prefilters;
jQuery.tps = transports;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
// jQuery.ajaxPrefilter and jQuery.ajaxTransport 的基本 "构造器"
function addToPrefiltersOrTransports( structure ) {
	// console.info('$> addToPrefiltersOrTransports', structure)
	// 返回的函数，接收两个参数
	// dataTypeExpression 
	// func 
	// dataTypeExpression is optional and defaults to "*"
	return function _pot( dataTypeExpression, func ) {
		console.info('$> _pot', arguments)
		// 如果只传入一个参数时 func 则重组参数
		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			// 将 dataTypeExpression 参数默认置于 "*"
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			// 将传入的 dataTypeExpression 以空格转换成数组
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		// 如果 Func 是一个函数
		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			// 遍历 dataTypeExpression
			// 只有传入多个 dataTypeExpression 过滤条件时，才会执行多次添加，否则就是一次添加
			while ( ( dataType = dataTypes[ i++ ] ) ) {
				// console.log('\t> _pot while i', (i-1))
				// console.log('\t> addToPrefiltersOrTransports -> dataType', dataType)
				// Prepend if requested
				// 如果第一个字符为 + 
				if ( dataType[ 0 ] === "+" ) {
					// console.log('\t> _pot has +')
					// 则从第一个字符向后取完
					dataType = dataType.slice( 1 ) || "*"; // 否则默认就是 * 
					// 则在起始位置添加一个
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				// -> 否则追加
				} else {
					// 用于测试替换
					// 这里就是看 dataType 这个符号属性是否是一个数组，不是则默认赋值一个数组
					// var res = ( structure[ dataType ] = structure[ dataType ] || [] );
					// console.log('\t> _pot no +', res);
					// 最后则在该符号属性属性中添加一个该方法
					// res.push( func );
					// 则在末尾添加
					// console.log('structure[ dataType ]', dataType);
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
	// 注意，reutrn 返回的这个 _pot 是一个方法，方法，是在 addToPrefiltersOrTransports 中返回的方法
	// 就是用 curry 返回的方法，也就是说在这个 _pot 中是在 addToPrefiltersOrTransports 中传入的那个对象中添加方法
}

// 用于测试
jQuery.att = addToPrefiltersOrTransports;

// Base inspection function for prefilters and transports
/**
 * prefilters and transports 的检查
 * @param  {[type]} structure       prefilters 或 transports
 * @param  {object} options         处理后的请求参数
 * @param  {object} originalOptions 原生的参数
 * @param  {object} jqXHR           jqXHR 对象
 * @return {[type]}                 [description]
 */
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	console.info('$> ipfot', arguments);
	var
		// 准备一个空的对象，用于暂时存放与之对应的 dateType 为 true 
		inspected = {},
		// 记录是否是一个请求分发器
		seekingTransport = ( structure === transports );

	// 用于内部调用每种 过滤器 或 分发器 的 dataType 类型的处理函数的返回值
	// 如果是一个分发器, 则直接返回 类型处理函数的 相反值
	// 如果是一个过滤器, 则最终返回的是 false 
	// 什么都不是则直接返回
	function inspect( dataType ) {
		console.info('\t$> ipfot inspect', dataType)
		var selected;
		// 设置该类型为 true 在 inspected 对象中
		inspected[ dataType ] = true;
		
		jQuery.each(

			// 遍历 prefilters 或 transports 中的 dataType 类型的值
			structure[ dataType ] || [], // 如果没值则是空,
			// 当然,如果没 dataType 这种 type 则 也不会有 prefilterOrFactory 这个处理函数
			function _inner_insect( _, prefilterOrFactory ) {
				console.log('\t\t> _inner_insect')
				// 前置过滤器 或 请求分发器的 类型处理函数源头
				
				// 得到这个方法的返回值 dataTypeOrTransport
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				// 如果返回的是字符串, 在 jQuery 内部只有 json jsonp 这种类型情况才会执行
				// 也就是说这里是专门针对 jsonp 的,因为下面源码中只有 json jsonp 时处理函数返回了值
				// 见 ajaxPrefilter('json jsonp')
				if ( typeof dataTypeOrTransport === "string" &&
					// 并且如果不是一个请求分发器
					// 且 类型处理函数返回的值不在临时存放 dataType 的对象中
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					// 则当前的请求参数的 datatypes 在头添加类型处理返回后的类型字符串 
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				}
				// 否则就是请求分发器
				else if ( seekingTransport ) {
					// 则直接返回 类型处理函数返回的值的 取反值
					return !( selected = dataTypeOrTransport );
				}
			}
		);
		// 否则直接返回
		return selected;
	}

	// options.dataTypes[ 0 ] 当前请求的 dataTypes 中的第一个类型
	return inspect( options.dataTypes[ 0 ] ) ||
		 !inspected[ "*" ] && inspect( "*" );
}// 该方法并不是很重要, 主要还是为了给过滤器或分发器绑定一系列的处理函数做处理

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * -> 给定请求和原始响应的链转换
 * Also sets the responseXXX fields on the jqXHR instance
 * -> 还在 JQXHR 实例上设置 responseXX 字段
 */
/**
 * 类型转换器
 * @param  {object}  s         处理后的参数
 * @param  {object}  response  请求的响应
 * @param  {jqXHR}  jqXHR     请求对象
 * @param  {Boolean} isSuccess 判断是否成功
 * @return {[type]}            [description]
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		// -> 使用数据类型的副本进行工作，以防我们需要修改它来转换
		dataTypes = s.dataTypes.slice();
	// dataTypes 可以是 text, xml, json, jsonp, script, html


	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// 得到第一个元素
	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {
		// responseFields 是
		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

// $.ajax 的扩展
jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
    // 两个用于记录请求改变时,是否忽略头信息
	lastModified: {},
	etag: {},

	// ajax 调用的内部参数列表
	// 可在 $.ajax() 内部用外部的覆盖
	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		// 用于 prefilters[*](s) -> s.contents 的正则匹配
		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		// 用于转换器 ajaxConvert
		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	// 全局参数设置
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	// 前置过滤器
	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	// 请求分发
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
    // ajax 请求主方法
	ajax: function( url, options ) {
/*----------校正参数-----------*/
        // console.info('$> $.ajax')
		// If url is an object, simulate pre-1.5 signature
        // 如果只传入一个对象，则强制构建一个完整的形参列表
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
        // 这也是一种强制型的将 options 变成一个对象
		options = options || {};

        // 内部声明一大堆的变量
		var 
            transport,

			// URL without anti-cache param
            // 不带 # 后面信息的 URL 
			cacheURL,

			// Response headers
            // 响应的头
			responseHeadersString,
			responseHeaders,

			// timeout handle
            // 超时处理回调
			timeoutTimer,

			// Url cleanup var 
            // 内部的 URL 锚，其实就是一个 a 标签
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
            // -> 请求状态(发送时为 false，完成时为 true)
			completed,

			// To know if global events are to be dispatched
            // 否是分派全局事件
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
            // 内部用的 options 参数
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
            // 回调中的上下文
			callbackContext = s.context || s, // 如果参数有则参数中的上下文，没有则参数这个 options 对象

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
            // 指定一个全局的上下文
			globalEventContext = s.context &&
                // 如果回调上下文是一个 DOM 元素或者 是 jQuery 对象
				( callbackContext.nodeType || callbackContext.jquery ) ?
                    // 则包装该对象做上下文
					jQuery( callbackContext ) :
                    // 是 jQuery.event 作上下文
					jQuery.event,

			// Deferreds
            // 内部的两个回调队列
			deferred = jQuery.Deferred(),  // 延迟队列
			// 不管成功失败 都执行的回调队列
			completeDeferred = jQuery.Callbacks( "once memory" ), // 回调队列，并且记忆只执行一次回调队列

			// Status-dependent callbacks
            // 状态码
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
            // 请求头，他们所有只发送一次
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
            // 设置默认中止信息
			strAbort = "canceled",

			// Fake xhr
		jqXHR = {
			readyState: 0,

			// Builds headers hashtable if needed
            // 获取请求头的信息
			getResponseHeader: function( key ) {
				var match;
                // 请求完成时
				if ( completed ) {
					if ( !responseHeaders ) {
						responseHeaders = {};
						while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
							responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
						}
					}
					match = responseHeaders[ key.toLowerCase() ];
				}
				return match == null ? null : match;
			},

			// Raw string
            // 获取所有的请求头信息
			getAllResponseHeaders: function() {
                // 前提是请求成功
				return completed ? responseHeadersString : null;
			},

			// Caches the header
            // 缓存这个头
			setRequestHeader: function( name, value ) {
                // 当如果没有请求时，
				if ( completed == null ) {
					name = requestHeadersNames[ name.toLowerCase() ] =
						requestHeadersNames[ name.toLowerCase() ] || name;
					requestHeaders[ name ] = value;
				}
				return this;
			},

			// Overrides response content-type header
			overrideMimeType: function( type ) {
				if ( completed == null ) {
					s.mimeType = type;
				}
				return this;
			},

			// Status-dependent callbacks
            // 状态码
            // 变里有点类似 Hook 的写法
            // map 是一个 Hook 的对象写法，每一个键就是一个返回的状态码，而对的值则是一个处理函数
            // map = { 404: function(){}}
			statusCode: function( map ) {
				var code;
                // 如果存在这个对象
				if ( map ) {
                    // 并且请求完成
					if ( completed ) {

						// Execute the appropriate callbacks
                        // 则执行这个适当的回调
						jqXHR.always( map[ jqXHR.status ] );
					} else {

						// Lazy-add the new callbacks in a way that preserves old ones
						for ( code in map ) {
							statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
						}
					}
				}
				return this;
			},

			// Cancel the request
            // 清除这次请求
			abort: function( statusText ) {
				var finalText = statusText || strAbort;
				if ( transport ) {
					transport.abort( finalText );
				}
				done( 0, finalText );
				return this;
			}
		};

		// Attach deferreds
        // 将 promise 附加到 jqXHR 上
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
        // -> 如果示提供协议，则添加协议
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
        // 得到 url ，并添加协议
		s.url = ( ( url || s.url || location.href ) + "" )
            // rprotocol 匹配 //
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
        // 得到请求类型, 如果有别名，则从别名得到
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
        // 提取 dataTypes 列表
        // dataType -> 期望返回的数据类型
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
        // 如果没设置跨域请求
		if ( s.crossDomain == null ) {
            // 内部的一个 url 锚
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
                // 内部的一个锚，其实就是一个 a 标签
                // 将这个 a  标签的 href 设置为传入后并添加了协议的 url
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
                // originAnchor 是一个外部的 a 锚
                // protocol 用于获取链接的协议
                // host 用于获取链接的主机
                // 这里最后返回一个 Boolean,用于最后判断是否要跨域请求
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
                // 如果出现异常，则直接设为跨域请求
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
        // 如果请求的数据已经是一个字符串
        // 如果请求的数据存在
        // 并且 data 是一个对象 -> processData 为 true
        // 并且 data 不是一个字符串
		if ( s.data && s.processData && typeof s.data !== "string" ) {
            // 将数据序列化
            // 如果参数的 traditional 为 true 则同传统的方式序列化
			s.data = jQuery.param( s.data, s.traditional );
		}

		// console.log('\t> 预处理之前', s.cache);//=> undefined
/*---------------- 预处理 ----------------------*/
		// Apply prefilters
        // 应用前置过滤器
		var ripot = inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
		// console.log('ripot', ripot)
/*---------------- /预处理 ----------------------*/

/*---------- 过滤后校正参数-----------*/
		// If request was aborted inside a prefilter, stop there
        // -> 如果请求在预筛选器中被中止，请在此停止
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
        // 如果要触发全局事件，则分派全局事件
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
        // -> 等待一组新的请求
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
        // 将请求类型转换为大写
		s.type = s.type.toUpperCase();

		// Determine if request has content
        // rnoContext  = /^(?:GET|HEAD)$/  匹配是不是 GET 或 HEAD 请求
        // 匹配除 GET 和 HEAD 请求
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
        // 缓存去掉 # 后面链接的 URL
		cacheURL = s.url.replace( rhash, "" );
        // console.log('cacheURL', cacheURL)
		// More options handling for requests with no content
        // GET 和 HEAD 请求
        // 这里做了一是将原来地址中的 _= 的参数替换成或加上一个时间戳
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
            // 获取到 # 后面链接的部分
			uncached = s.url.slice( cacheURL.length );
            // console.log('uncached', uncached)
			// If data is available, append data to url
            // 如果有数据，则将之前序列化的数据加到 url 后面
			if ( s.data ) {
                // ！！！ 这里是在缓存的 url 中操作，并没有在原 url 上操作
                // rquery 匹配 ? 
                // 这里则是如果地址上已经有 ? 则用 & 连接，否则用 ? 连接
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
                // -> 删除数据，以便在最终重试中不使用它
				delete s.data;
			}

			// Add or update anti-cache param if needed
            // 如果需要则添加或更新 # 后面的信息
            // 这里面是 GET 或 HEAD 请求，这两个请求不会受 cache 参数的影响
            // 且这个参数的最后一次校正在预处理器中
			if ( s.cache === false ) { // 并且该参数也说明了，如果是 script 和 json 则默认是 false 
				// 这里的 cache 则是从预处理器被重置后的值，预处理会将 cache 重置为 false
				// 在请求的 URL 后面加上一个时间戳，以确保每次请求浏览器下载的脚本被重新请求

                // rantiCache  /([?&])_=[^&]*/
                // 匹配 ?_= 或 &_=
                // 也就是将缓存的地址中的以 _= xxx 的参数全部替换成开头的 ? 或 & 
				cacheURL = cacheURL.replace( rantiCache, "$1" );
                // console.log('cacheURL', cacheURL)
                
                // 如果缓存的 URL 后面有 ? 则用 & 连接，否则有 ? 连接
                // 然后加上 _= Date.now() 
                // 最后再加上之前缓存了的 #后面的参数
                uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
                // console.log('uncached', uncached)
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;
            // console.log('s.url', s.url)

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
        // -> 如果这个是编码内容则将 %20 变成 +
        // 如果有数据
        // 并且数组是一个对象
		} else if ( s.data && s.processData &&
            // 并且内容类型头开头是 application/x-www-form-urlencoded
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
            // 则将 %20 替换成 +
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        // 是否忽略 HTTP 头信息
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
        // -> 如果正在发送数据，则设置正确的标头
        // 如果数据存在 
        // 并且不是 GET 或 HEAD 请求
        // 并且有内容头或原始参数中有内容头
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
            // 则设置此次的请求头
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
        // 根据 dataType 设置服务器的接受 header
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
        // 是否有额外的头信息
		for ( i in s.headers ) {
            // 有则添加到请求上
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
        // 如果参数中有 beforeSend() 事件
		if ( s.beforeSend &&
            // 且 如果该事件返回 false 
            // beforeSend(jqXHR, s)
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false ||
            // 或者是已经完成 
            completed ) )
        {

			// Abort if not done already and return
            // 者阻止当前的请求
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		// 中止不再是取消
		strAbort = "abort";

/*---------- /过滤后校正参数结束-----------*/

/*----------/校正参数-----------*/

/*----添加回调队列---*/
		
		// Install callbacks on deferreds
		// 添加回调到给个对象上
		completeDeferred.add( s.complete ); // progressCallbacks 队列, 外面的 complete()
		jqXHR.done( s.success ); // doneCallbacks 队列, 外面的 success()
		jqXHR.fail( s.error ); // failCallbacks 队列,外面的 error()

/*----/添加回调队列结束---*/


/*-------------------执行请求----------------------*/

/*-----------------得到请求分发器----------------*/
		// Get transport
		// 得到请求分发器
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
/*-----------------得到请求分发器----------------*/

		// If no transport, we auto-abort
		// 如果没有请求分发器
		if ( !transport ) {
			done( -1, "No Transport" );
		}
		// 如果有请求分发器
		else {
			// 首先将请求状态设置为准备中
			jqXHR.readyState = 1;

			// Send global event
			// 发送全局的事件
			if ( fireGlobals ) {
				// 触发全局下的 ajaxSend() 事件
				// ajaxSend(jqXHR, options)
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			// 如果请求已经完成,则直接返回 jqXHR
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			// 异步并且有超时
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				// 设置请求为发送时 => false ; true 为 完成 
				completed = false;
				// 发送请求 !!! 这里请求的源头,请求从这里发送出去
				transport.send( requestHeaders, done );
			}
			// 捕获可能会出现的异常
			catch ( e ) {

				// Rethrow post-completion exceptions
				// 如果已经完成,则重新抛出完成后的异步
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				// 传播他人为结果
				done( -1, e );
			}
		}


/*-------------------/执行请求----------------------*/

		// Callback for when everything is done
		// -> 当一切都完成时回调
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}


        // console.info('$/> $.ajax', jqXHR);
		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};



// 为全局 ajax 请求设置一个 xhr
// 这个属性就是返回一个新的 XMLHttpRequest 对象
jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {
		// 如果支持该对象，则什么都不做
	}
};

// 全局请求成功信息对象
var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		// -> 文件协议总是产生状态代码0，假设200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		// -> 有时IE应该是204时返回1223。
		1223: 204
	},
	// 用于记录是否支持原生  XHR 对象
	xhrSupported = jQuery.ajaxSettings.xhr();

// 是否支持跨域请求，这里用的是最标准的解决的 CORS 方式跨域
// 双感叹号强制转换成布尔值
// withCredentials 是原生 XHR 的一个属性
// 	该属性用于 它指示了是否该使用类似 
// 		cookies,authorization headers(头部授权) 或者 
// 		TLS 客户端证书这一类资格证书
// 		来创建一个跨站点访问控制（cross-site Access-Control）请求
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
// 是否支持 ajax 
support.ajax = xhrSupported = !!xhrSupported;


// 普通分发器, 第一个分发器类型
// $.tps['*'] 的默认第一个方法，其参数为一个请求参数对象
// 相当于 addToPrefiltersOrTransports(transports)( func ) 形式
// 参数一没有，则默认是 * 
jQuery.ajaxTransport( function _star( options ) {
	var 
		// 内部三种回调的管理者
		callback,
		// 失败时的回调
		errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	// -> 只有通过 XMLHttpRequest 支持才允许跨域。
	// 是否支持跨域
	// 或者是 xhrSupported 是支持的 并且 用户请求时 crossDomain 属性为 false, 就是不跨域请求
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		// 则返回一个对象
		// 该对象有两个方法
		return {
			// 这里则是最底层的发送请求的 send() 方法
			// 不跨域的 send() 方法
			/**
			 * 普通情况的源头 send() 方法
			 * @param  {object} headers  请求头信息
			 * @param  {function} complete 完成时的回调
			 * @return {[type]}          [description]
			 */
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				// open() 方法最多可以接收 5 个参数
				// 第四个参数则是：用于身份验证目的的可选用户名；默认情况下，这是空值。
				// 第五个参数则是：用于身份验证的可选密码；默认情况下，这是空值。
				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);// 所以 jQuery 中把这个都考虑到了

				// Apply custom fields if provided
				// 是否存在外部定义的原生 XHR 属性
				// xhrFields 也是请求参数的一个属性，用于设置原生的 XHR 对象
				if ( options.xhrFields ) {
					// 有则应用
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				// 如果需要则覆盖 mime 类型
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// 看到这先暂停，因为需要看其它的一些内容，看完了预处理和发分器再回来看下面的源码

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set Headers
				// 设置头信息
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				// 内部定义一个回调,接收一个类型名称,用于调用不同的回调
				// 可接收三种情况
				// 1. abort 中止
				// 2. erro 失败
				// 3. 完成 
				callback = function( type ) {
					// 返回一个函数, 就是不同类型传入执行的不现的函数在此绑定
					return function() {
						// 如果回调存在
						if ( callback ) {
							// 将所有的 xhr 事件全部清空
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
							// 中止
							if ( type === "abort" ) {
								// 直接调用原生 abort()
								xhr.abort();
							}
							// 失败
							else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									// 给完成回调两个参数
									complete( 0, "error" );
								} else {
									// 给完成回调两个参数
									// 1. 请求状态码
									// 2. 请求状态信息
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							}
							// 不是失败也不是中止, 直接完成
							else {
								// 为完成回调四个参数
								complete(
									// 全局请求成功信息对象的xhr请求的状态码 或者是 xhr请求的状态码
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									// 请求状态信息
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									// 请求的 text 内容
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									// 原生方法 getAllResponseHeaders()
									// 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回null
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				// 完成时的 onload 事件
				xhr.onload = callback();
				// 失败时的事件
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				// 如果请求已经被中止
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				}
				// 否则请求没被中止
				else {
					// 将用 readystatechange 事件
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						// 超时前检查就绪状态
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// -> 允许先调用onError
							// but that will not handle a native abort
							// -> 但这不能处理本机中止
							// Also, save errorCallback to a variable
							// -> 另外，将错误调用保存到变量中
							// as xhr.onerror cannot be accessed
							// -> 由于xhr.onError无法访问
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				// 创建中止回调
				callback = callback( "abort" );
				// 到该 send() 方法最后, callback 也就变成了 abort() 方法了
				try {

					// Do send the request (this may raise an exception)
					// 请求发送的源头，这时可能会出现异步
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
// -> 当未提供显式数据类型时，防止脚本的自动执行
// $.pfs['*'] 的默认第一个方法
// 这里就是相当于 addToPrefiltersOrTransports(prefilters)( func ) 形式
// 参数一没有，则默认是 *, * 类型方式的处理函数
// _star() 参数一接收一个 options 对象
jQuery.ajaxPrefilter( function _star( s ) {
	console.info('$> prefilter["*"]', arguments);//=> 这里有三个参数
	// 接收的这三个参数在
	// 	inspectPrefiltersOrTransports() 
	// 	-> inspcet() 
	// 	-> _inner_inspcet(_, prefilterOrFactory) 
	// 	-> 内部的 prefilterOrFactory() 这个地方指定的
	// 如果请求为跨域
	if ( s.crossDomain ) {
		// 则将
		// s.contents.script = false;
		// 用于测试
		// contents 在 ajaxSettings 中，用于内部 $.ajax() 的参数
		var sc = s.contents;
		console.log('\t> sc->', sc)
		// 其 sc.script 也是一个正则，就是下面的全局设置中被设置
		sc.script = false;
		// 如果是跨域，则将 匹配 script 重置为 false
		// 跨域就是：
	}
} );// 当然具体参数的传递和怎么被执行的还要看 inspectPrefiltersOrTransports() 这个方法

// Install script dataType
// -> 安装脚本数据类型
// 在外部设置一个全局的 ajax 请求参数
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	// 扩展全局的 ajaxSettings.contens 
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
// -> 处理缓存的特殊情况和交叉域
// 为 script 类型预处理
// 如果 dataType 为 script ，则
jQuery.ajaxPrefilter( "script", function( s ) {
	console.info('$> 预处理器处理 script 类型')
	if ( s.cache === undefined ) {
		// 则将缓存重置为 false 
		s.cache = false;
	}
	if ( s.crossDomain ) {
		// 类型重置为 GET 
		// 因为 在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求
		s.type = "GET";
	}
} );

// 跨域分发器,第二个分发器类型
// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	// -> 此传输仅处理跨域请求
	if ( s.crossDomain ) {
		var script, callback;
		// 与不跨域的情况差不多
		return {
			// 跨域的 send() 方法
			send: function( _, complete ) {

				// 得到一个 script 标记,设置其属性
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} )
				// 并绑定事件
				.on(
					"load error",
					callback = function( evt ) {
						// 一旦完成或失败就移除这个标记
						script.remove();
						// 清空回调
						callback = null;
						if ( evt ) {
							// 完成回调
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				// 将这个 script 动态添加到面面中
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var 
	// 用于记录上一个 jsonp 的请求回调函数
	oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
// 全局的 ajax 请求参数设置
jQuery.ajaxSetup( {
	jsonp: "callback",
	// 产生一个用 expando 产生的 jsonpCallback 回调函数名
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and in`stall callbacks for jsonp requests
// -> 检测、规范化选项并在JSONP请求的“停止回调”中
// 为 json jsonp 类型添加处理函数
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName,

		// 指定向全局上的那个 jsonp 回调函数
		overwritten,

		// jsonp 回调接收到的参数
		responseContainer,
	
		// rjsonp = /(=)\?(?=&|$)|\?\?/
		// jsonProp 就是用来判断 url , data, 是否有 jonsp 的特征
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ? // 如果匹配 ?= 形式的 url 
			"url" : // 则就是 'url'
			typeof s.data === "string" && 
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	// -> 如果预期的数据类型是“JSONP”，或者我们要设置一个参数
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		// 得到 callback 名字
		// 这里的 callbackName 是 url 中 callback=? 中的 ? 部分
		callbackName = s.jsonpCallback =
			// 如果有则用，没有则用内部的产生 ? 部分
			jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() : 
			s.jsonpCallback;

		// Insert callback into url or form data
		// 插入回调 url 或表单数据
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		// -> 使用数据转换器在脚本执行后检索 json
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		// 强制变成 json 类型
		s.dataTypes[ 0 ] = "json";

		// Install callback
		// 将回调添加到 window 上，这个回调相当于 08预处理 中的原生 jsonp 中的 jsonpCallback_test 函数
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			// 直接用 responseContainer 接收到参数
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		// 无论请求成功与否
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			// -> 如果以前的值不存在-删除它
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			// -> 否则，恢复先前存在的值。
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			// 将回调存入到 oldCallbacks 中
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			// -> 如果它是一个函数，并且我们有一个响应
			// 如果回调中携带参数
			// 且 overwritten 是一个函数
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				// 则执行, 这也是 jsonp 回调函数的执行源头
				overwritten( responseContainer[ 0 ] );
			}
			// 最后清除掉
			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		// -> 委托给脚本
		// 返回给 inspectPrefiltersOrTransports() 方法中的 inspect()
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
// -> 附加一组函数来处理常见的ajax事件
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );

// $.fn.bind 这些的绑定方法没有完全的从源码中移除
jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );
console.log('=-=-=-=-=-= Outer -=-=-=-=-=-=-');