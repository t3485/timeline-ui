function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function find(array, count, item, cmp) {
	var i = Math.floor(count / 2),
		left = 0,
		right = count - 1;
	while (i >= left && i <= right) {
		var r = cmp(item, array[i]);
		console.log(i, left, right, item.date, array[i].date)
		if (r == 0) break;
		if (r < 0) right = i - 1;
		else left = i + 1;
		i = Math.floor((left + right) / 2);
	}
	return i + 1;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}

export {formatDate, find}