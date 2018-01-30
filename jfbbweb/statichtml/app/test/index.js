import LF from 'LF';
import Vue from 'vue';

new Vue({
	el: "#app",
	data: {
		title: "test index"
	},
	methods: {
		go: function(url) {
			LF.window.openWindow(url);
		},
		testajax: function() {
			var params = { "name": "USER", "version": "1.3.2", "validation": "d751daa9015272c8545f45fd033cf023", "data": { "phone": "18670083796", "password": "af8f9dffa5d420fbc249141645b962ee", "app_id": "", "client_id": "e09d1361894a0c91bc5360fdcd5ea395", "system_name": "Android", "system_version": "4.2.2", "uuid": "864895026478089", "app_version": "8.0.0" } }
			//			var url = "http://192.168.2.120:80/json"
			var url = "http://testv1301.chushen.me/user/login";
//			var url = "http://v130.chushen.space/user/login";
			//第一种方式，了解就好，代码中不使用
//			LF.net.ajax(url, {
//				data: params,
//				dataType: "json",
//				timeout: 10000,
//				type: "post",
//				success: function(data) {
//					console.log(JSON.stringify(data));
//				},
//				error: function(xhr, type, errorThrown) {
//					console.log("error：" + type);
//					console.log("errorThrown：" + errorThrown);
//				}
//			});
			//第二种方式 强制POST请求 
//			LF.net.post(url, params, function(res) {
//				console.log(JSON.stringify(res));
//			}, function(xhr, type, errorThrown) {
//				console.log("error：" + type);
//				console.log("errorThrown：" + errorThrown);
//			});
			//上面2中都不使用，使用下面getJSON最清爽的。
			
			var params2 = { "account":"15712015006","password":"e10adc3949ba59abbe56e057f20f883e" }
			//第三种方式 可以选择POST或者GET
			
			//常规函数，使用function 在方法内的this引用已经改变，所以需要在外面定义this变量
			var self = this;//这样在function中用过self调用vue的this对象。
			LF.net.getJSON("integral/user/login", params2, function(res) {
				console.log(JSON.stringify(res));
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
			});
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解
			LF.net.getJSON("/integral/user/login", params2, res=>{
				console.log(JSON.stringify(res));
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
		},
		/*
		 * 这个纯属测试跨域用的
		 */
		testajax2: function(options) {
			var LF = {};
		    LF.noop = function(){}
		    /*
		     *ajax 
		     */
		    var ajaxSettings = {
				type: 'POST',
				beforeSend: LF.noop,
				success: LF.noop,
				error: LF.noop,
				complete: LF.noop,
				context: null,
				xhr: function(protocol) {
					return new window.XMLHttpRequest();
				},
				accepts: {
					script: 'text/javascript, application/javascript, application/x-javascript',
					json: "application/json",
					xml: 'application/xml, text/xml',
					html: "text/html",
					text: 'text/plain'
				},
				timeout: 0,
				processData: true,
				cache: true
			};
			var ajaxBeforeSend = function(xhr, settings) {
				var context = settings.context
				if(settings.beforeSend.call(context, xhr, settings) === false) {
					return false;
				}
			};
			var ajaxSuccess = function(data, xhr, settings) {
				settings.success.call(settings.context, data, 'success', xhr);
				ajaxComplete('success', xhr, settings);
			};
			// type: "timeout", "error", "abort", "parsererror"
			var ajaxError = function(error, type, xhr, settings) {
				settings.error.call(settings.context, xhr, type, error);
				ajaxComplete(type, xhr, settings);
			};
			// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
			var ajaxComplete = function(status, xhr, settings) {
				settings.complete.call(settings.context, xhr, status);
			};
			var url = 'https://testv130.chushen.me/user/login';
    		var params = { "name": "USER", "version": "1.3.2", "validation": "d751daa9015272c8545f45fd033cf023", "data": { "phone": "18670083796", "password": "af8f9dffa5d420fbc249141645b962ee", "app_id": "", "client_id": "e09d1361894a0c91bc5360fdcd5ea395", "system_name": "Android", "system_version": "4.2.2", "uuid": "864895026478089", "app_version": "8.0.0" } }
			if(typeof url === "object") {
				options = url;
				url = undefined;
			}
			var settings = options || {};
			settings.data = params;
			settings.url = url || settings.url;
			for(var key in ajaxSettings) {
				if(settings[key] === undefined) {
					settings[key] = ajaxSettings[key];
				}
			}

			var dataType = settings.dataType;

			if(settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
				settings.url = appendQuery(settings.url, '_=' + $.now());
			}
			console.log(settings)
			var mime = settings.accepts[dataType && dataType.toLowerCase()];
			console.log("mime:" + mime);

			var headers = {};
			var setHeader = function(name, value) {
				headers[name.toLowerCase()] = [name, value];
			};
			var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;

			var xhr = settings.xhr(settings);

			var nativeSetHeader = xhr.setRequestHeader;
			var abortTimeout;

			//		
			//		setHeader('X-Requested-With', 'XMLHttpRequest');
			setHeader('Accept', mime || '*/*');
			//		
			//		
			if(!!(mime = settings.mimeType || mime)) {
				if(mime.indexOf(',') > -1) {
					mime = mime.split(',', 2)[0];
				}
				xhr.overrideMimeType && xhr.overrideMimeType(mime);
			}

			if(settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
				setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
			}
			if(settings.headers) {
				for(var name in settings.headers)
					setHeader(name, settings.headers[name]);
			}
			xhr.setRequestHeader = setHeader;

			if(ajaxBeforeSend(xhr, settings) === false) {
				xhr.abort();
				ajaxError(null, 'abort', xhr, settings);
				return xhr;
			}

			if(settings.xhrFields) {
				for(var name in settings.xhrFields) {
					xhr[name] = settings.xhrFields[name];
				}
			}
			//		

			var async = 'async' in settings ? settings.async : true;

			document.getElementById("content").innerHTML = "开始……";
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						var response = xhr.responseText;
						console.log("xhr.responseText:" + xhr.responseText);
						document.getElementById("content").innerHTML = "结果：" + response;
					} else {
						console.log("xhr.responseText:" + xhr.responseText);
						document.getElementById("content").innerHTML = "不允许跨域请求。";
					}
				} else {
					document.getElementById("content").innerHTML += "<br/>执行状态 readyState：" + xhr.readyState;
				}
			};

			xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);
			console.log("headers:" + JSON.stringify(headers));
//			for(var name in headers) {
//				if(headers.hasOwnProperty(name)) {
//					nativeSetHeader.apply(xhr, headers[name]);
//				}
//			}
			//	      console.log("settings.url:"+settings.url);
			xhr.send(JSON.stringify(params));
			return;
			if(settings.timeout > 0) {
				abortTimeout = setTimeout(function() {
					xhr.onreadystatechange = $.noop;
					xhr.abort();
					ajaxError(null, 'timeout', xhr, settings);
				}, settings.timeout);
			}

			//		xhr.send(settings.data ? settings.data : null);

		}

	},
	mounted: function() {
		LF.log.log("%d年%d月%d日", 2011, 3, 26);
		this.testajax();
	}

});