function f(n){
	return n<=2 ? 1:f(n-1)+f(n-2)
}
console.log(f)
var onmessage=function(event){
	var numb =event.data
	console.log("分线程接收主线程数据："+numb)
	var result =f(numb)
	postMessage(result)
	console.log("分线程向主线程发送："+result)
}