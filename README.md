跨域：

受限于同源策略的影响，不同协议或不同域名或不同端口号之间进行通信时，会有跨域问题。

解决方案1：jsonp

script标签本身是没有跨域问题的，它会将返回的内容当做js代码来执行。

前端大体实现：首先，声明一个回调方法; 然后，创建一个script，src指向请求地址(地址上把回调方法做为参数传递回去）。

服务端实现： 返回一个(回调方法+json格式结果的数据内填充形式)的结果。

解决议案2：cors

服务端响应时，设置”Access-Control-Allow-Origin"域信息来实现

解决方案3：降域

适用场景：当主域相同，子域不同时。可能通过又向设置document.domain=主域 的形式来进行通信

解决方案4：postMessage;

大致形式：

window.postMessage(data, origin);

window.onmessage = function(e){
	console.log(e.data);
}

解决方案5：借用iframe+代理页面实现

提交请求时走iframe，服务端拿到数据后，做一次页面跳转(url上赋代要返回的数据)，跳转到代理页面，因代理页面和发送请求页面是同一域名下的，所有以可进行数据交互操作。





