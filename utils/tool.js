export function timeInterval(t){
	if(!t) return ''
	const date = new Date(t); // 根据时间戳创建Date对象
	const year = date.getFullYear(); // 获取年份
	const month = date.getMonth() + 1; // 获取月份，需要加1
	const day = date.getDate(); // 获取日期
	const hour = date.getHours(); // 获取小时
	const minute = date.getMinutes(); // 获取分钟
	const second = date.getSeconds(); // 获取秒数
	
	const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	return formattedDate
}