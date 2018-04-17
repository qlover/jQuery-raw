// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function addEvent(element, type, handler) {
	// 模拟将该元素的 addEventListener 
	element.addEventListener = undefined;

	// element.events 	用于存放所有 type 事件类型的处理事件对象
	// 					也就是每一个 type 就是一个 handlers
	// handlers 		每个元素存放每一个 type 处理事件的对象
	var handlers;
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		// -> 为每个事件处理程序分配一个唯一的ID
		if (!handler.$$guid) handler.$$guid = addEvent.guid++;
		// create a hash table of event types for the element
		// -> 为元素创建事件类型哈希表
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		// -> 为每个元素/事件对创建一个事件处理程序的哈希表
		handlers = element.events[type];
		// 如果没有对 type 处理事件人这个对象
		if (!handlers) {
			// 则说明 events 也不存在
			// 所以两个都初始化为空 对象
			handlers = element.events[type] = {};
			// -> 存储现有的事件处理程序(如果有)
			// 用元素得到对应的 on+type 处理事件是否存在，如果有则
			if (element["on" + type]) {
				// 将这个处理事件存入
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		// -> 将事件处理程序存入对象中
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		// -> 分配一个全局事件处理程序来完成所有工作。
		element["on" + type] = handleEvent;
		// console.log(handlers)
	}
};
// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
	// 模拟将该元素的 removeEventListener 
	element.removeEventListener = undefined;

	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	// -> 获取事件对象( IE 使用全局事件对象)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	// 得到该元素的 那个处理每种 type 的 handlers 对象
	var handlers = this.events[event.type];
	// execute each event handler
	// -> 执行每个事件处理程序
	// 遍历处理该 type 的那个 hanlders
	// 因为，可以用 addEvent 绑定多个相同的 type 处理事件
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		// 执行并判断是否返回 false
		console.log('ready run', this.$$handleEvent.name)
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
			console.log(this.$$handleEvent.name, 'is return false')
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};