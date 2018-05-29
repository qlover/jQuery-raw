(function(){
	var animate = function(elem, option, complete){
		var timerId,
			init = parseInt(elem.style['left']),
			end = option.left,
			duration = option.duration || 2000,
			ie,
			pos,
			time = function(){return (+new Date)},
			begTime = time(),
			remaining, timePecent, tmp,
			doAnimation = function(){
				// 计算出每秒需要移动的多少距离
				remaining =  time() - begTime;
				// 计算出时间比
				timePecent = remaining / duration;
				// 得到需要移动的数, 如果 ie 为正数则为负数, 负数则为正数
				tmp = -((ie * timePecent) + init)
				// 最后取绝对值
				pos = Math.abs(tmp > end ? end : tmp);
				// console.log(remaining, timePecent,  tmp, pos)
				// 最后,移动 left 到 500
				if( timePecent >= 1 ){
					elem.style['left'] = pos + 'px';
					clearInterval(timerId);
					timerId = null;

					complete && complete.call(elem);
				} else {
					elem.style['left'] = pos + 'px';
				}
			};

		ie = end > init ? -(end - init) : end - init;
		timerId = setInterval(doAnimation, 8);
	}
});