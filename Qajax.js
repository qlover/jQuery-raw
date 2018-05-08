var Qajax = (function(){
	var i, defalutOption, xhr, rStatus, ajaxInfo,
		status, result, ajax, ajaxSuccess;

	// 提示信息
	ajaxInfo = {
		'200': 'success',
		'404': 'faile'
	};
	// 默认参数
	defalutOption = {
		url: false,
		type: 'GET',
		data: null,
		success: false,
		complete: false
	};

	ajax = function(options){
		// 处理参数
		for(i in defalutOption){
			options[i] = options[i] || defalutOption[i];				
		}
		// XHR 对象
		xhr = new XMLHttpRequest();

		xhr.open(options.type, options.url);
		// 监听
		xhr.onreadystatechange = function(){

			rStatus = xhr.readyState;
			
			if ( rStatus == 4 ) {
			
				status = xhr.status;

				if (status >= 200 && status < 300 || status == 304) {

					result = xhr.responseText;

					ajaxSuccess(result);
				}

			}

		};

		// post
		if (options.type.toLowerCase() === 'post') {

			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode')

		}

		xhr.send(options.data);

		function ajaxSuccess(data){

			options.success && options.success(data, options, status, xhr);

			options.complete && options.complete(ajaxInfo[''+status]);

		};

	};
	
	return ajax;
})();
