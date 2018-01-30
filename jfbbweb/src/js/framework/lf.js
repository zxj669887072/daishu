/**
 * LF app js framework
 * liyu - v1.0.0 (2015-10-27)
 */
 import * as config from './define';
 import base64encode from './base64';
 import hex_md5 from './md5';

/**
 * 整个框架父类
 */
 var LF = {};
 LF.app = {
	/**
	 * 初始化框架参数
	 */
	 init:function(){

	 }
	};

//日志模块 开始
/**
 * @description 日志模块
 */
 LF.log = {
 	islog: config.debug,
	/**
	 * 信息分组开始
	 * @param {String} d
	 */
	 group:function(d){
	 	if(this.islog) {
	 		console.group(d)
	 	} 
	 },

	/**
	 * 信息分组结束
	 */
	 groupEnd:function(){
	 	if(this.islog) {
	 		console.groupEnd();
	 	}
	 },
	/**
	 * 查询对象
	 * @param {String} d
	 */
	 dir:function(d){
	 	if(this.islog) {
	 		console.dir(d);
	 	}
	 },
	/**
	 * 追踪函数的调用轨迹
	 */
	 trace:function(){
	 	if(this.islog) {
	 		console.trace()
	 	}
	 },
	/**
	 * @description 打印info日志
	 * @param {String} d 打印内容
	 */
	 info: function(d) {
	 	if(this.islog) {
	 		console.info(d);
	 	}
	 },
	/**
	 * @description 打印log日志
	 * @param {String} d 打印内容
	 * @param 可变参数 用于格式刷打印日志，比如：LF.log.log("%d年%d月%d日",2011,3,26); 结果是：2011年3月26日
	 * 支持的占位符有：字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）
	 */
	 log: function(d,...t) {
	 	if(this.islog) {
	 		console.log(d,...t);
	 	}
	 },
	/**
	 * @description 打印debug日志
	 * @param {String} d 打印内容
	 */
	 debug: function(d) {
	 	if(this.islog) {
	 		console.debug(d);
	 	}
	 },
	/**
	 * @description 打印warn日志
	 * @param {String} d 打印内容
	 */
	 warn: function(d) {
	 	if(this.islog) {
	 		console.warn(d);
	 	}
	 },
	/**
	 * @description 打印error日志
	 * @param {String} d 打印内容
	 */
	 error: function(d) {
	 	if(this.islog) {
	 		console.error(d);
	 	}
	 }
	};
	window.alert = function(msg, mode,reback) {
		msg = msg || '';
		mode = mode || 0;
		var top = document.body.scrollTop || document.documentElement.scrollTop;
		var isIe = (document.all) ? true : false;
		var isIE6 = isIe && !window.XMLHttpRequest;
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		var winSize = function(){
			var xScroll, yScroll, windowWidth, windowHeight, pageWidth, pageHeight;
            // innerHeight获取的是可视窗口的高度，IE不支持此属性
            if (window.innerHeight && window.scrollMaxY) {
            	xScroll = document.body.scrollWidth;
            	yScroll = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
            	xScroll = document.body.scrollWidth;
            	yScroll = document.body.scrollHeight;
            } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            	xScroll = document.body.offsetWidth;
            	yScroll = document.body.offsetHeight;
            }

            if (self.innerHeight) {    // all except Explorer
            	windowWidth = self.innerWidth;
            	windowHeight = self.innerHeight;
            } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            	windowWidth = document.documentElement.clientWidth;
            	windowHeight = document.documentElement.clientHeight;
            } else if (document.body) { // other Explorers
            	windowWidth = document.body.clientWidth;
            	windowHeight = document.body.clientHeight;
            }

            // for small pages with total height less then height of the viewport
            if (yScroll < windowHeight) {
            	pageHeight = windowHeight;
            } else {
            	pageHeight = yScroll;
            }

            // for small pages with total width less then width of the viewport
            if (xScroll < windowWidth) {
            	pageWidth = windowWidth;
            } else {
            	pageWidth = xScroll;
            }

            return{
            	'pageWidth':pageWidth,
            	'pageHeight':pageHeight,
            	'windowWidth':windowWidth,
            	'windowHeight':windowHeight
            }
        }();
        //alert(winSize.pageWidth);
        //遮罩层
        var styleStr = 'top:0;left:0;position:absolute;z-index:10000;background:#666;width:' + winSize.pageWidth + 'px;height:' +  (winSize.pageHeight + 30) + 'px;';
        styleStr += (isIe) ? "filter:alpha(opacity=80);" : "opacity:0.8;"; //遮罩层DIV
        var shadowDiv = document.createElement('div'); //添加阴影DIV
        shadowDiv.style.cssText = styleStr; //添加样式
        shadowDiv.id = "shadowDiv";
        //如果是IE6则创建IFRAME遮罩SELECT
        if (isIE6) {
        	var maskIframe = document.createElement('iframe');
        	maskIframe.style.cssText = 'width:' + winSize.pageWidth + 'px;height:' + (winSize.pageHeight + 30) + 'px;position:absolute;visibility:inherit;z-index:-1;filter:alpha(opacity=0);';
        	maskIframe.frameborder = 0;
        	maskIframe.src = "about:blank";
        	shadowDiv.appendChild(maskIframe);
        }
        document.body.insertBefore(shadowDiv, document.body.firstChild); //遮罩层加入文档
        //弹出框
        var styleStr1 = 'display:block;position:fixed;_position:absolute;left:' + (winSize.windowWidth / 2 - 200) + 'px;top:' + (winSize.windowHeight / 2 - 150) + 'px;_top:' + (winSize.windowHeight / 2 + top - 150)+ 'px;'; //弹出框的位置
        var alertBox = document.createElement('div');
        alertBox.id = 'alertMsg';
        alertBox.style.cssText = styleStr1;
        var alertTit = document.createElement('div');
        alertTit.innerHTML="提示";
        alertTit.class="left";
        alertTit.id="alertTit";
        alertBox.appendChild(alertTit);
        //创建弹出框里面的内容P标签
        var alertMsg_info = document.createElement('P');
        alertMsg_info.id = 'alertMsg_info';
        alertMsg_info.innerHTML = msg;
        
        alertBox.appendChild(alertMsg_info);
        //创建按钮
        var btn1 = document.createElement('a');
        btn1.id = 'alertMsg_btn1';
        btn1.href = 'javas' + 'cript:void(0)';
        btn1.className="btn btn-sure" ;
        btn1.innerHTML = '<cite>确定</cite>';
        btn1.onclick = function () {
        	document.body.removeChild(alertBox);
        	document.body.removeChild(shadowDiv);

        	if(reback==1){location.reload();}
        	return true;
        };
        alertBox.appendChild(btn1);
        if (mode === 1) {
        	var btn2 = document.createElement('a');
        	btn2.id = 'alertMsg_btn2';
        	btn2.href = 'javas' + 'cript:void(0)';
        	btn2.innerHTML = '<cite>取消</cite>';
        	btn2.onclick = function () {
        		document.body.removeChild(alertBox);
        		document.body.removeChild(shadowDiv);
        		return false;
        	};
        	alertBox.appendChild(btn2);
        }
        document.body.appendChild(alertBox);
    }
//日志模块 结束
/**
 * @description cookie模块
 */
 LF.cookie = {
 	set:function(c_name,value,expiredays){
 		var exdate = new Date()
 		if(!expiredays){
 			document.cookie = c_name + "=" + escape(value)+";path=/;";
 		}else{
 			exdate.setDate(exdate.getDate() + expiredays * 1);
 			document.cookie = c_name + "=" + escape(value)+
 			";expires=" + exdate.toGMTString()
 		}
 	},
 	get:function(c_name){
 		if(document.cookie.length > 0) {
 			var c_start = document.cookie.indexOf(c_name + "=");
 			if(c_start != -1) {
 				c_start = c_start + c_name.length + 1
 				var c_end = document.cookie.indexOf(";", c_start)
 				if(c_end == -1) c_end = document.cookie.length
 					return unescape(document.cookie.substring(c_start, c_end))
 			}
 		}
 		return "";
 	},
 	del:function(c_name){
 		var exp = new Date();
 		exp.setDate(exp.getDate() - 1);
 		var cval = this.get(c_name);
 		if(cval != null){
 			document.cookie = c_name + "=" + escape(cval)+ ";expires=" + exp.toGMTString()+";path=/;";
 		}
 	},
 	clear:function(){
 		var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
 		if (keys) { 
 			for (var i = keys.length; i--;) {
 				this.del(keys[i]);
 			}
 		} 
 	}
 };
//缓存模块 结束

LF.localstorage = {
	getStarage: function() {
		return localStorage;
	},
	/**
	 * @description 存储key-value
	 * @param {String} key 存储的键值
	 * @param {String} value 存储的内容
	 */
	 put: function(key, value) {
	 	this.getStarage().removeItem(key);
	 	this.getStarage().setItem(key, value);
	 },
	/**
	 * @description 通过key值检索键值
	 * @param {String} key 存储的键值
	 * @return {String}
	 */
	 get: function(key) {
	 	return this.getStarage().getItem(key);
	 },
	/**
	 * @description 通过key值删除键值对
	 * @param {String} key 存储的键值
	 */
	 removeItem: function(key) {
	 	this.getStarage().removeItem(key);
	 },
	/**
	 * @description 获取storage中保存的键值对的数量
	 * @return {Number}
	 */
	 getItemCount: function() {
	 	return this.getStarage().getLength();
	 },
	/**
	 * @description 获取键值对中指定索引值的key值
	 * @return {String}
	 */
	 key: function(index) {
	 	return this.getStarage().key(index);
	 },
	/**
	 * @description 清除应用所有的键值对,不建议使用
	 */
	 clearAll: function() {
	 	this.getStarage().clear();
	 }

	};

/**
 * @description 窗口模块
 */
 LF.window = {
 	ua: navigator.userAgent,
	/**
	 * @description 登录状态检查
	 * @param {Boolean} redirect 是否需要重定向,如果为true,当redirect_url参数为空那么会获取当前路径,作为登录后的重定向路径
	 * @param {String} redirect_url 强制使用自定义的路径作为重定向路径,使用绝对路径,不能使用相对路径
	 */
	 checkLogin:function(redirect=false,redirect_url=""){
	 	var {person:loginflag} = this.isLogin();
	 	if(loginflag == 0){
	 		if(redirect){
	 			if(redirect_url){
	 				LF.window.openWindow(redirect_url,"_self",true);
	 			}else{
	 				let url = window.location.href;
	 				LF.window.openWindow(url,"_self",true);
	 			}
	 		}else{
	 			LF.window.openWindow("/app/login.html","_self");
	 		}
	 	}
	 },
	/**
	 * @description 登录状态检查
	 * @param {Boolean} redirect 是否需要重定向,如果为true,当redirect_url参数为空那么会获取当前路径,作为登录后的重定向路径
	 * @param {String} redirect_url 强制使用自定义的路径作为重定向路径,使用绝对路径,不能使用相对路径
	 */
	 checkBussLogin:function(redirect=false,redirect_url=""){
	 	var {buss:loginflag} = this.isLogin();
	 	if(loginflag == 0){
	 		if(redirect){
	 			if(redirect_url){
	 				LF.window.openWindow(redirect_url,"_self",true);
	 			}else{
	 				let url = window.location.href;
	 				LF.window.openWindow(url,"_self",true);
	 			}
	 		}else{
	 			LF.window.openWindow("/app/login_bz.html","_self");
	 		}
	 	}
	 },
	 isLogin:function(){
	 	var person = 0;
	 	var buss = 0; 
	 	if(LF.cookie.get("userId")){
	 		person = 1;
	 	}
	 	if(LF.cookie.get("bussUserId")){
	 		buss = 1;
	 	}
	 	return {person:person,buss:buss};
	 },
	/**
	 * @description 
	 * @param {String} url 
	 */
	 openWindow: function(url, type = "_blank",check=false) {
	 	if(type === true||check === true){
	 		let {person,buss} = this.isLogin();
			if(url.indexOf("business") > -1){//商家
				if(buss==0){
					if(url.indexOf("login.html")>-1){
						LF.window.openWindow("/app/login_bz.html?return_url="+encodeURIComponent("/app/pages/business/home_bz.html"),"_self");
					}else{
						LF.window.openWindow("/app/login_bz.html?return_url="+encodeURIComponent(url),"_self");
					}
				}else{
					if(type !== true){
						window.open(url, type);
					}else{
						window.open(url, "_blank");
					}
				}
			}else{//个人
				if(person==0){
					if(url.indexOf("login.html")>-1){
						LF.window.openWindow("/app/login.html?return_url="+encodeURIComponent("/app/index.html"),"_self");
					}else{
						LF.window.openWindow("/app/login.html?return_url="+encodeURIComponent(url),"_self");
					}
				}else{
					if(type !== true){
						window.open(url, type);
					}else{
						window.open(url, "_blank");
					}
				}
			}
		}else{
			window.open(url, type);
		}
	},
	getUrl:function(){
		return config.SERVER_BAS_URL;
	},
	/**
	 * @description 获取url路径都带的请求参数
	 * @return {Object}
	 */
	 getParams:function(){
	 	var url = window.location.search;
	 	var theRequest = null;
	 	if (url.indexOf("?") != -1) {
	 		theRequest = new Object();
	 		var str = url.substr(1);
	 		var strs = str.split("&");
	 		for(var i = 0; i < strs.length; i ++) {
	 			theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	 		}
	 	}
	 	if(theRequest!=null)
	 		return  theRequest;
	 	else
	 		return null;
	 }
	};
//页面  结束
//网络 开始
/**
 * @description 网络模块
 */
 LF.noop = function() {};
 LF.net = {
 	jsonType : 'application/json',
 	htmlType : 'text/html',
 	rscript : /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
 	scriptTypeRE : /^(?:text|application)\/javascript/i,
 	xmlTypeRE : /^(?:text|application)\/xml/i,
 	blankRE : /^\s*$/,

 	ajaxSettings : {
 		type: 'GET',
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
 			json: 'application/json',
 			xml: 'application/xml, text/xml',
 			html: 'text/html',
 			text: 'text/plain'
 		},
 		timeout: 0,
 		processData: true,
 		cache: true
 	},
 	param : function(obj, traditional) {
 		var params = [];
 		params.add = function(k, v) {
 			this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
 		};
 		serialize(params, obj, traditional);
 		return params.join('&').replace(/%20/g, '+');
 	},
 	serialize : function(params, obj, traditional, scope) {
 		var self = this;
 		var type, array = LF.util.isArray(obj),
 		hash = LF.util.isPlainObject(obj);
 		obj.forEach(function(key, value) {
 			type = LF.util.type(value);
 			if(scope) {
 				key = traditional ? scope :
 				scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
 			}
			// handle data in serializeArray() format
			if(!scope && array) {
				self.params.add(value.name, value.value);
			}
			// recurse into nested objects
			else if(type === "array" || (!traditional && type === "object")) {
				self.serialize(params, value, traditional, key);
			} else {
				self.params.add(key, value);
			}
		});
 	},
 	appendQuery : function(url, query) {
 		if(query === '') {
 			return url;
 		}
 		return(url + '&' + query).replace(/[&?]{1,2}/, '?');
 	},
 	serializeData : function(options) {
 		if(options.processData && options.data && typeof options.data !== "string") {
 			var contentType = options.contentType;
 			if(!contentType && options.headers) {
 				contentType = options.headers['Content-Type'];
 			}
			if(contentType && ~contentType.indexOf(jsonType)) { //application/json
				options.data = JSON.stringify(options.data);
			} else {
				//暂时不处理其他模式
//				options.data = this.param(options.data, options.traditional);
}
}
//		if(options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
//			options.url = appendQuery(options.url, options.data);
//			options.data = undefined;
//		}
},
ajaxBeforeSend : function(xhr, settings) {
	var context = settings.context
	if(settings.beforeSend.call(context, xhr, settings) === false) {
		return false;
	}
},
ajaxSuccess : function(data, xhr, settings) {
	settings.success.call(settings.context, data, 'success', xhr);
	this.ajaxComplete('success', xhr, settings);
},
	// type: "timeout", "error", "abort", "parsererror"
	ajaxError : function(error, type, xhr, settings) {
		settings.error.call(settings.context, xhr, type, error);
		this.ajaxComplete(type, xhr, settings);
	},
	// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	ajaxComplete : function(status, xhr, settings) {
		settings.complete.call(settings.context, xhr, status);
	},
	_ajax: function(url,options = {}) {
		var self = this;
		if(typeof url === "object") {
			options = url;
			url = undefined;
		}
		var settings = options || {};
		settings.url = url || settings.url;
		
		for(var key in this.ajaxSettings) {
			if(settings[key] === undefined) {
				settings[key] = this.ajaxSettings[key];
			}
		}
		this.serializeData(settings);
		var dataType = settings.dataType;
		if(settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
			settings.url = appendQuery(settings.url, '_=' + $.now());
		}
		var mime = settings.accepts[dataType && dataType.toLowerCase()];
		var headers = {};
		var setHeader = function(name, value) {
			headers[name.toLowerCase()] = [name, value];
		};
		var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
		var xhr = settings.xhr(settings);
		var nativeSetHeader = xhr.setRequestHeader;
		var abortTimeout;

		setHeader('Accept', mime || '*/*');
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

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				xhr.onreadystatechange = LF.noop;
				clearTimeout(abortTimeout);
				var result, error = false;
				var isLocal = protocol === 'file:';
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && isLocal && xhr.responseText)) {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
					result = xhr.responseText;
					try {
						if(dataType === 'script') {
							(1, eval)(result);
						} else if(dataType === 'xml') {
							result = xhr.responseXML;
						} else if(dataType === 'json') {
							result = self.blankRE.test(result) ? null : JSON.parse(result);
						}
					} catch(e) {
						error = e;
					}

					if(error) {
						self.ajaxError(error, 'parsererror', xhr, settings);
					} else {
						self.ajaxSuccess(result, xhr, settings);
					}
				} else {
					var status = xhr.status ? 'error' : 'abort';
					var statusText = xhr.statusText || null;
					if(isLocal) {
						status = 'error';
						statusText = '404';
					}
					self.ajaxError(statusText, status, xhr, settings);
				}
			}
		};
		if(self.ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort();
			self.ajaxError(null, 'abort', xhr, settings);
			return xhr;
		}

		if(settings.xhrFields) {
			for(var name in settings.xhrFields) {
				xhr[name] = settings.xhrFields[name];
			}
		}

		var async = 'async' in settings ? settings.async : true;

		xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);

		for(var name in headers) {
			if(headers.hasOwnProperty(name)) {
				nativeSetHeader.apply(xhr, headers[name]);
			}
		}
		if(settings.timeout > 0) {
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = LF.noop;
				xhr.abort();
				self.ajaxError(null, 'timeout', xhr, settings);
			}, settings.timeout);
		}
		xhr.send(settings.data ? settings.data : null);
		return xhr;
	},
	ajax:function(url,{
		dataType="json",
		type="post",
		data={},
		timeout = 10000,
		success,
		error,
		headers  = {'Content-Type':'application/json;charset=UTF-8'},
		async = true
	}={}){
		if(url.indexOf("/") != 0){
			url = "/" + url;
		}
		var action = url;
		url = config.SERVER_BAS_URL +url;
		
		LF.log.log("send[" + action + "]:" + LF.util.jsonToStr(data));
		var _success = function(data,textStatus,xhr){
			LF.log.log("received[" + action + "]：" + JSON.stringify(data));
			if(data.code == '004'){
				LF.cookie.clear();
				LF.window.openWindow("/app/login.html","_self");
			}else{
				if(!(success === undefined)){
					success(data);
				}	
			}
			
		}
		var _error = function(xhr,type,errorThrown){
			LF.log.log("received[" + action + "]：" + type + "，errorThrown："+errorThrown);
			if(!(error === undefined)){
				var o = {
					
				}
				if(type=="timeout"){
					o.code = "999";
					o.errorMessage = "网络请求超时"; 
				}else if(type=="error"){
					o.code = "998";
					o.errorMessage = "网络请求错误";
				}else if(type=="abort"){
					o.code = "997";
					o.errorMessage = "网络请求取消";
				}else if(type=="parsererror"){
					o.code = "996";
					o.errorMessage = "解析json错误";
				}else{
					o.code = "995";
					o.errorMessage = "系统出错";
				}
				error(o);
			}
		}
		var options = {dataType,type,timeout,headers,async}
		options.data = LF.util.jsonToStr(data);
		options.success = _success;
		options.error = _error;
		this._ajax(url,options);
	},
	post: function(url, data, success, error, timeout = 10000) {
		data = this.dodata(data);
		var type = "post";
		var options = { data, success, error, type, timeout };
		this.ajax(url, options);
	},
	get: function(url, data, success, error, timeout = 10000) {
		var sign = this.dodata(data);
		var type = "get";
		var options = { data, success, type, timeout };
		this.ajax(url, options);
	},
	getJSON: function(url, data, success, error,type = "post",timeout = 10000) {
		
		var [sign,data] = this.dodata(data);
		url += "?sign="+sign;
		var options = { data, success, error, type, timeout };
		this.ajax(url, options);
	},
	dodata:function(data){
		var defaule = config.REQUESTDATA;
		var tokenId = LF.cookie.get("tokenId");
		if(LF.cookie.get("merchantFlag")==1){
			tokenId=LF.cookie.get("bussTokenId");
		}
		if(tokenId){
			defaule.tokenId = tokenId;
		}
		defaule.timestamp = new Date().getTime();
		data = Object.assign({}, defaule, data);
		var keys  = Object.keys(data);
		keys.sort();
		var str = "";
		for(let i in keys){
			str += (keys[i]+"=");
			if(data[keys[i]]||data[keys[i]] == 0){
				str += data[keys[i]];
			}
		}
		str += config.DEFAULTSIGNATUREPWD;
		LF.log.log("待加密字符串:"+str);
		var sign = hex_md5(str);
		return [sign,data];
	},
	upload: function(url, data,success,error,uploadProgress, uploadComplete, uploadFailed,uploadCanceled) {
		if(!LF.util.isFormData(data)){
			var formData = new FormData();
			if(LF.util.isObject(data)){
				formData.append(data.file_name, data.file);
				data = formData;
			}else if(LF.util.isArray(data)){
				data.forEach(function(v){
					formData.append(v.file_name, v.file);
				})
				data = formData;
			}else{
				LF.log.error("无上传文件数据或格式错误");
				return;
			}
		}
		if(url.indexOf("/") != 0){
			url = "/" + url;
		}
		var action = url;
		url = config.SERVER_BAS_URL +url;
		
		var requestData = data;
		var request = new XMLHttpRequest();
		var xDomain = false;
		request.open("POST", url, true);
		request.timeout = 0;
		LF.log.log("send[" + action + "]文件上传");
		request.onreadystatechange = function handleLoad() {
			if(!request || (request.readyState !== 4 && !xDomain)) {
				return;
			}
			if(request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
				return;
			}
			var responseData = request.responseText;
			LF.log.log("received[" + action + "]：" + responseData);
			var rs = JSON.parse(responseData);
			if (typeof success === 'function') {
				success(rs);
			}
			request = null;
		};
		request.onerror = function handleError() {
			var rs = {
				code:'900',
				errorMessage:"系统异常"
			}
			if (typeof error === 'function') {
				error(rs);
			}
			request = null;
		};
		request.ontimeout = function handleTimeout() {
			var rs = {
				code:'901',
				errorMessage:"系统请求超时"
			}
			if (typeof error === 'function') {
				error(rs);
			}
			request = null;
		};

		request.setRequestHeader("Accept", "application/json, text/plain, */*");
		if (typeof uploadProgress === 'function') {
			request.addEventListener('progress', uploadProgress);
		}
		request.send(requestData);
	}
}

//工具类 开始
LF.util = {
	now : function() {
		return Date.now || +new Date();
	},
	formatDate:function (value){
		if(value==null){
			return '';
		}
		var date=new Date(value);
		var y = date.getFullYear();  
		var m = date.getMonth() + 1;  
		m = m < 10 ? ('0' + m) : m;  
		var d = date.getDate();  
		d = d < 10 ? ('0' + d) : d;  
		var h = date.getHours();  
		var minute = date.getMinutes();  
		minute = minute < 10 ? ('0' + minute) : minute;   
		return  y+'-'+m + '-' + d;
	},
	class2type:function(key){
		var class2type={};
		var l = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'];
		for(let i in l){
			class2type["[object " + l[i] + "]"] = l[i].toLowerCase();
		}
		return class2type[key];
	},
	type : function(obj) {
		return obj == null ? String(obj) : this.class2type({}.toString.call(obj)) || "object";
	},
	isObject : function(obj) {
		return this.type(obj) === "object";
	},
	isWindow : function(obj) {
		return obj != null && obj === obj.window;
	},
	isArray: function(object) {
		return Array.isArray || object instanceof Array;
	},
	isFormData:function(e){
		return "undefined" != typeof FormData && e instanceof FormData
	},
	isPlainObject : function(obj) {
		return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	},
	
	replaceTemplate: function(i, j) {
		var k = i;
		for(var l in j) {
			console.debug(typeof(l) + " : " + l);
			console.debug(typeof(j[l]) + " : " + j[l]);
			var m = eval("/\\$\\{" + l.replace(/\//g, "\\/") + "\\}/ig");
			k = k.replace(m, j[l]);
		};
		return k;
	},
	strToJson: function(jsonStr) {
		return JSON.parse(jsonStr);
	},
	jsonToStr: function(jsonObj) {
		return JSON.stringify(jsonObj);
	},
	isUndefined: function(value) {
		if(typeof(value) == "undefined" || value == null) {
			return true;
		} else {
			return false;
		}
	},
	isEmpty: function(value) {
		if(value) {
			return false;
		} else {
			return true;
		}
	},
	isString: function(value) {
		return Object.prototype.toString.call(value) == "[object String]";
	},
	getNowDay: function() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() * 1 + 1;
		var day = date.getDate();
		return year + "-" + month + "-" +
		day;
	},
	getSFM: function(time) {
		var date = new Date();
		date.setTime(time);
		var h = date.getHours();
		if(h < 10) {
			h = "0" + h;
		}
		var m = date.getMinutes();
		if(m < 10) {
			m = "0" + m;
		}
		var s = date.getSeconds();
		if(s < 10) {
			s = "0" + s;
		}
		return h + ":" + m + ":" +
		s;
	},
	getZDTime: function(time) {
		var date = new Date();
		date.setHours(time.split(":")[0]);
		date.setMinutes(time.split(":")[1]);
		date.setSeconds(time.split(":")[2]);
		return date;
	},
	checkRate: function(value) {
		var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		if(!re.test(value)) {
			return false;
		} else {
			return true;
		}
	},
	extend: function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	},
	decToHex: function(str) {
		str = str.replace(/\n/g, " ");
		var res = [];
		for(var i = 0; i < str.length; i++)
			res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
		return "\\u" + res.join("\\u");
	},
	createUUID: function(g) {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for(var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid.replace(/-/g, "");;
	},
	getStringLen: function(Str) {
		var i, len, code;
		if(Str == null || Str == "") return 0;
		len = Str.length;
		for(i = 0; i < Str.length; i++) {
			code = Str.charCodeAt(i);
			if(code > 255) { len++; }
		}
		return len;
	},
	addNum: function(num1, num2) {
		var sq1, sq2, m;
		try { sq1 = num1.toString().split(".")[1].length; } catch(e) { sq1 = 0; }
		try { sq2 = num2.toString().split(".")[1].length; } catch(e) { sq2 = 0; }
		m = Math.pow(10, Math.max(sq1, sq2));
		return(this.multNum(num1, m) + this.multNum(num2, m)) / m;
	},
	multNum: function(arg1, arg2) {
		var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
		try { m += s1.split(".")[1].length } catch(e) {}
		try { m += s2.split(".")[1].length } catch(e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},
	getCodeImg:function(width=120,height=40,type=1){
		let randomNum = function(min, max){
			return Math.floor(Math.random() * (max - min) + min);
		}
		let randomColor = function(min, max) {
			let r = randomNum(min, max);
			let g = randomNum(min, max);
			let b = randomNum(min, max);
			return "rgb(" + r + "," + g + "," + b + ")";
		}
		
		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		let ctx = canvas.getContext('2d');
		ctx.textBaseline = 'bottom';

		/**绘制背景色**/
		ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
		ctx.fillRect(0, 0, width, height);
		/**绘制文字**/
		let str = "";
		if(type == 1){
			str = '1234567890';	
		}else if(type == 2){
			str = 'ABCEFGHJKLMNPQRSTWXY123456789';
		}else{
			str = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ1234567890';
		}
		let code = "";
		for(var i = 0; i < 4; i++) {
			let txt = str[randomNum(0, str.length)];
			code = code + txt;
			ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
			ctx.font = randomNum(15, 40) + 'px SimHei'; //随机生成字体大小
			let x = 10 + i * 25;
			let y = randomNum(25, 45);
			let deg = randomNum(-45, 45);
			//修改坐标原点和旋转角度
			ctx.translate(x, y);
			ctx.rotate(deg * Math.PI / 180);
			ctx.fillText(txt, 0, 0);
			//恢复坐标原点和旋转角度
			ctx.rotate(-deg * Math.PI / 180);
			ctx.translate(-x, -y);
		}
		/**绘制干扰线**/
		for(let i = 0; i < 8; i++) {
			ctx.strokeStyle = randomColor(40, 180);
			ctx.beginPath();
			ctx.moveTo(randomNum(0, width), randomNum(0, height));
			ctx.lineTo(randomNum(0, width), randomNum(0, height));
			ctx.stroke();
		}
		/**绘制干扰点**/
		for(let i = 0; i < 100; i++) {
			ctx.fillStyle = randomColor(0, 255);
			ctx.beginPath();
			ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
			ctx.fill();
		}
		let data = canvas.toDataURL("image/jpeg");
		return {
			code:code,
			codeUrl:data
		};
	}
};
//工具类 结束

//角色管理 开始
(function($) {
	function Role() {
		this.username = "";
		this.usercode = "";
		this.loginsign = "";
		var j = "Role";
		var s = "TOKEN_ID";
		this.loadLoginInfo = function() {
			var k = LF.storage.get(j);
			if(typeof(k) != "undefined") {
				var l = null;
				try {
					l = eval("(" + k + ")");
					this.usercode = l.usercode;
					this.username = l.username;
					this.loginsign = l.loginsign;
				} catch(e) {
					this.loginsign = "0";
					this.username = "";
					this.usercode = "";
				}
			} else {
				this.loginsign = "0";
				this.username = "";
				this.usercode = "";
			}
		};
		this.saveInfo = function(k) {
			this.usercode = k.usercode;
			this.username = k.username;
			this.loginsign = k.loginsign;
			LF.storage.put(j, JSON.stringify(k));
			LF.storage.put(s, k.tokenId);
		};
		this.logout = function() {
			LF.storage.removeItem(s);
			LF.storage.removeItem(j);
			this.loadLoginInfo();
		};
		this.getLoginInfo = function() {
			var str = LF.storage.get(j);
			str = LF.util.strToJson(str);
			return str;
		};
		this.getTokenId = function() {
			var tokenId = LF.storage.get(s);
			if(LF.util.isUndefined(tokenId)) {
				tokenId = "";
			}
			return tokenId;
		}
	};
	Role.prototype.getInstance = function() {
		return window.Role;
	};

	//角色管理结束
	eval("window.Role=new Role()");
}(LF));

//地址对象
(function($) {
	function Address() {
		this.address_id = "";
		//		this.province = "";
		this.city_id = "";
		this.city_name = "";
		//		this.district = "";
		//		this.street = "";
		//		this.community = "";
		this.center_id = "";
		this.building_id = "";
		this.building_name = "";
		this.floor = "";
		this.detail_address = "";
		this.linkman = "";
		this.contact_phone = "";
		this.sex = -1;
		this.addressFlag = "";
		var l = "defalut_address";
		var j = "defalut_city";
		this.loadAddress = function() {
			var defalutAddress = $.util.strToJson($.storage.get(l));
			var defalutCity = $.util.strToJson($.storage.get(j));
			try {
				if(!$.util.isUndefined(defalutAddress)) {
					this.address_id = defalutAddress.address_id;
					//					this.province = defalutAddress.province;
					//					this.district = defalutAddress.district;
					//					this.street = defalutAddress.street;
					//					this.community = defalutAddress.community;
					this.center_id = defalutAddress.center_id;
					this.building_id = defalutAddress.building_id;
					this.building_name = defalutAddress.building_name;
					this.floor = defalutAddress.floor;
					this.detail_address = defalutAddress.detail_address;
					this.linkman = defalutAddress.linkman;
					this.contact_phone = defalutAddress.contact_phone;
					this.sex = defalutAddress.sex;
					this.addressFlag = defalutAddress.addressFlag;
				}
				if(!$.util.isUndefined(defalutCity)) {
					this.city_id = defalutCity.city_id;
					this.city_name = defalutCity.city_name;
				}
			} catch(e) {}
		};
		this.setDeaultAddress = function(k) {
			try {
				if(!$.util.isUndefined(k)) {
					this.address_id = k.address_id;
					this.center_id = k.center_id;
					this.building_id = k.building_id;
					this.building_name = k.building_name;
					this.floor = k.floor;
					this.detail_address = k.detail_address;
					this.linkman = k.linkman;
					this.contact_phone = k.contact_phone;
					this.sex = k.sex;
					this.addressFlag = k.addressFlag;
					var obj = {
						"address_id": k.address_id,
						"center_id": k.center_id,
						"building_id": k.building_id,
						"building_name": k.building_name,
						"floor": k.floor,
						"detail_address": k.detail_address,
						"linkman": k.linkman,
						"contact_phone": k.contact_phone,
						"sex": k.sex,
						"addressFlag": k.addressFlag
					};
					$.storage.put(l, $.util.jsonToStr(obj));
					this.loadAddress();
				}
			} catch(e) {
				this.loadAddress();
			}
		};
		this.clearDefaultAddress = function() {
			var obj = {
				"building_id": this.building_id,
				"building_name": this.building_name,
			};
			$.storage.put(l, $.util.jsonToStr(obj));
			this.loadAddress();
		};
		this.setCity = function(k) {
			if(!$.util.isEmpty(k)) {
				this.city_id = k.city_id;
				this.city_name = k.city_name;
				var obj = {
					"city_id": k.city_id,
					"city_name": k.city_name
				};
				$.storage.put(j, $.util.jsonToStr(obj));
				this.loadAddress();
			}
		}
	}
	eval("window.address=new Address();");
}(LF));

//购物车对象
(function($) {
	function ShoppingCart() {
		this.num = 0;
		this.total_amount = 0;
		this.dishesItems = null;
		this.webviewList = null;
		var j = "dishes_items";
		var l = "shopping_webview";
		var t = "time_stamp"
		this.updateTimestamp = function() {
			var tp = new Date().getTime();
			tp = tp.toString();
			$.storage.removeItem(t);
			$.storage.put(t, tp);
		}
		this.getTimestamp = function() {
			return $.storage.get(t);
		}
		/*
		 * dishes_id 菜品编号
		 * dishes_name 菜品名称
		 * dishes_specification_id 规格编号
		 * dishes_specification_name 规格名称
		 * item_num 份数
		 * amount 单份金额
		 * remain 剩余份额
		 * addtime 添加时间
		 */
		 this.loadShoppingCart = function(id) {
		 	var dishesItemsStr = $.storage.get(j);
			//			console.log("dishesItemsStr="+dishesItemsStr);
			if($.util.isEmpty(dishesItemsStr)) {
				this.dishesItems = [];
				this.total_amount = 0;
				this.num = 0;
			} else {
				this.dishesItems = $.util.strToJson(dishesItemsStr);
				this.num = 0;
				this.total_amount = 0;
				for(var i in this.dishesItems) {
					this.num = Number(this.num) + Number(this.dishesItems[i].item_num);
					this.total_amount = this.total_amount + this.dishesItems[i].amount * this.dishesItems[i].item_num;
				}
			}
			if(!$.util.isEmpty(id)) {
				var shoppingWebviewStr = $.storage.get(l);
				if($.util.isEmpty(shoppingWebviewStr)) {
					this.webviewList = new Array();
					this.webviewList.push(id);
					$.storage.put(l, $.util.jsonToStr(this.webviewList));
				} else {
					this.webviewList = $.util.strToJson(shoppingWebviewStr);
					var flag = false;
					for(var i in this.webviewList) {
						if(this.webviewList[i] == id) {
							flag = true;
						}
					}
					if(!flag) {
						this.webviewList.push(id);
					}
					$.storage.put(l, $.util.jsonToStr(this.webviewList));
				}
			} else {
				var shoppingWebviewStr = $.storage.get(l);
				if($.util.isEmpty(shoppingWebviewStr)) {
					this.webviewList = new Array();
				} else {
					this.webviewList = $.util.strToJson(shoppingWebviewStr);
				}
			}
		};
		this.checkShoppingCart = function() {
			var result = [];
			if(this.dishesItems == null || this.dishesItems.length == 0) {
				return result;
			}
			var time1 = $.storage.get("sales_start_time");
			if($.util.isEmpty(time1)) {
				time1 = "10:30:00";
			}
			var time2 = $.storage.get("sales_end_time");
			if($.util.isEmpty(time2)) {
				time2 = "21:00:00";
			}
			var time3 = "23:59:59";
			var nowTime = new Date().getTime();
			var nowDay = $.util.getNowDay();

			var data1 = $.util.getZDTime(time1);
			var data2 = $.util.getZDTime(time2);
			var data3 = $.util.getZDTime(time3);
			var date4 = new Date();
			date4 = data3.getTime() - 24 * 60 * 60 * 1000;
			var temp = [];
			var testDate = new Date();
			//判断区间

			if(nowTime > data1.getTime() && nowTime <= data2.getTime()) { //10:30-21:00
				for(var i in this.dishesItems) {
					testDate.setTime(this.dishesItems[i].addtime);
					if(data1.getTime() > this.dishesItems[i].addtime) {
						result.push(this.dishesItems[i]);
						//						this.dishesItems.splice(i, 1);
						temp.push(i);
					}
				}
			} else if(nowTime > data2.getTime() && nowTime <= data3.getTime()) { //10:30-23:59:59
				for(var i in this.dishesItems) {
					if(data2.getTime() > this.dishesItems[i].addtime) {
						result.push(this.dishesItems[i]);
						temp.push(i);
					}
				}
			} else {
				for(var i in this.dishesItems) {
					if(date4 >= this.dishesItems[i].addtime) {
						result.push(this.dishesItems[i]);
						temp.push(i);
					}
				}
			}
			for(var i = temp.length - 1; i >= 0; i--) {
				this.dishesItems.splice(temp[i], 1);
			}
			refresh(this.dishesItems);
			this.loadShoppingCart();
			return result;
		};
		this.getDeliveryDate = function() {
			var time1 = $.storage.get("sales_start_time");
			if($.util.isEmpty(time1)) {
				time1 = "10:30:00";
			}
			var nowTime = new Date().getTime();
			var nowDay = $.util.getNowDay();
			var data1 = $.util.getZDTime(time1);
			if(nowTime < data1.getTime()) {
				return nowDay;
			} else {
				var nextTime = nowTime + 24 * 60 * 60 * 1000;
				var data2 = new Date();
				data2.setTime(nextTime);
				var year = data2.getFullYear();
				var month = data2.getMonth() * 1 + 1;
				var day = data2.getDate();
				return year + "-" + month + "-" +
				day;
			}
		};
		this.add = function(dishes) {

			if(this.dishesItems == null) {
				this.loadShoppingCart();
			}
			if(Number(dishes.remain) < Number(dishes.item_num)) {
				return false;
			}
			if($.util.isEmpty(dishes.dishes_id) || $.util.isEmpty(dishes.specification_id) || $.util.isEmpty(dishes.remain) || $.util.isEmpty(dishes.amount) || $.util.isEmpty(dishes.item_num)) {
				return false;
			}
			var retrunFlag = true;
			var flag = false;
			var time = new Date().getTime();
			for(var i in this.dishesItems) {
				if(this.dishesItems[i].dishes_id == dishes.dishes_id &&
					this.dishesItems[i].specification_id == dishes.specification_id) {
					var tempNum = Number(this.dishesItems[i].item_num) + Number(dishes.item_num);
				if((this.dishesItems[i].item_num == dishes.remain || this.dishesItems[i].item_num == 9 || tempNum > 9) && dishes.dishes_id != 1) {
					retrunFlag = false;
					flag = true;
					break;
				} else {
					this.dishesItems[i].item_num = Number(this.dishesItems[i].item_num) + Number(dishes.item_num);
					this.dishesItems[i].remain = dishes.remain;
					this.dishesItems[i].addtime = time;
					flag = true;
					break;
				}
			}
		}
		if(!flag) {
			if($.util.isEmpty(dishes.dishes_id) || $.util.isEmpty(dishes.dishes_name) || $.util.isEmpty(dishes.specification_id) || $.util.isEmpty(dishes.specification_name) || $.util.isEmpty(dishes.remain) || $.util.isEmpty(dishes.amount) || $.util.isEmpty(dishes.item_num) || $.util.isEmpty(dishes.imgurl)) {
				return false;
			} else {
				if(this.dishesItems.length == 0) {
					var mfObj = new Object();
					mfObj.dishes_id = 1;
					mfObj.dishes_name = "米饭";
					mfObj.imgurl = "../images/mf.jpg";
					mfObj.specification_id = 1;
					mfObj.specification_name = "常规";
					mfObj.remain = 99;
					mfObj.amount = 1;
					mfObj.item_num = 0;
					mfObj.addtime = time;
					this.dishesItems.push(mfObj);
				}
				dishes.addtime = time;
				this.dishesItems.push(dishes);
			}
		}
		refresh(this.dishesItems);
		this.loadShoppingCart();
		this.updateTimestamp();
		return retrunFlag;
	};
	this.addList = function(dishesList) {
		var flag = false;
		var time = new Date().getTime();
		for(var i in dishesList) {
			flag = false;
			for(var i in this.dishesItems) {
				if(this.dishesItems[i].dishes_id == dishesList[i].dishes_id &&
					this.dishesItems[i].specification_id == dishesList[i].specification_id) {
					this.dishesItems[i].item_num = Number(this.dishesItems[i].item_num) + Number(dishes.item_num);
						//						this.dishesItems[i].amount += dishesList[i].amount;
						this.dishesItems[i].remain = dishesList[i].remain;
						this.dishesItems[i].addtime = time;
						flag = true;
					}
				}
				if(!flag) {
					dishesList[i].addtime = time;
					this.dishesItems.push(dishesList[i]);
				}
			}
			refresh(this.dishesItems);
			this.loadShoppingCart();
			this.updateTimestamp();
		};
		this.remove = function(dishes) {
			if(this.ishesItems == null) {
				this.loadShoppingCart();
			}
			if($.util.isEmpty(dishes.dishes_id) || $.util.isEmpty(dishes.specification_id) || $.util.isEmpty(dishes.remain) || $.util.isEmpty(dishes.amount) || $.util.isEmpty(dishes.item_num)) {
				return false;
			}
			var flag = -1;
			var time = new Date().getTime();
			for(var i in this.dishesItems) {
				if(this.dishesItems[i].dishes_id == dishes.dishes_id &&
					this.dishesItems[i].specification_id == dishes.specification_id) {
					this.dishesItems[i].item_num = this.dishesItems[i].item_num - dishes.item_num;
					//					this.dishesItems[i].amount -= dishes.amount;
					this.dishesItems[i].remain = dishes.remain;
					this.dishesItems[i].addtime = time;
					if(this.dishesItems[i].item_num <= 0) {
						flag = i;
					}
					break;
				}
			}
			if(flag != -1) {
				if(flag != 0) {
					this.dishesItems.splice(flag, 1);
				}
			}
			if(this.dishesItems.length == 1) {
				this.dishesItems.splice(0, 1);
			}
			refresh(this.dishesItems);
			this.loadShoppingCart();
			this.updateTimestamp();
			return true;
		};
		this.clear = function() {
			this.dishesItems = [];
			$.storage.removeItem(j);
			this.loadShoppingCart();
			this.updateTimestamp();
		};
		this.getShoppingCart = function() {
			return this.dishesItems;
		};

		var refresh = function(data) {
			if($.util.isUndefined(data) || data.length <= 0) {
				$.storage.removeItem(j);
			} else {
				var str = $.util.jsonToStr(data);
				$.storage.put(j, str);
			}
		};

	}
	eval("window.shoppingCart=new ShoppingCart()");
}(LF));

//消息对象
(function($) {
	function Message() {
		this.unreadNum = 0;
		this.unreadMsg = null;
		this.readMsg = null;
		var j = "unreadmsg";
		var l = "readmsg";
		var pushFlag = "pushMessageFlag";
		/*
		 * msg_type 消息类型
		 * msg_id
		 * order_id 订单ID
		 * content 消息内容
		 * desc 消息描述
		 * addtime
		 */
		 this.loadMessage = function() {
		 	var unreadMsgStr = $.storage.get(j + window.Role.usercode);
		 	var readMsgStr = $.storage.get(l + window.Role.usercode);
		 	try {
		 		if($.util.isEmpty(unreadMsgStr)) {
		 			this.unreadNum = 0;
		 			this.unreadMsg = [];
		 			this.readMsg = [];
		 		} else {
		 			this.unreadMsg = $.util.strToJson(unreadMsgStr);
		 			this.unreadNum = this.unreadMsg.length;
		 		}

		 		if(!$.util.isEmpty(readMsgStr)) {
		 			this.readMsg = $.util.strToJson(readMsgStr);
		 		} else {
		 			this.readMsg = [];
		 		}
		 	} catch(e) {
		 		this.unreadNum = 0;
		 	}
		 };
		 this.checkMessage = function() {
		 	try {
		 		var length = this.readMsg.length;
		 		var dayNum = 30;
		 		var nowTime = new Date().getTime();
		 		var lastTime = nowTime - dayNum * 24 * 60 * 60 * 1000;
		 		var removeFlag = false;
		 		var temp = [];
		 		for(var i = length; i > 0; i--) {
		 			if(this.readMsg[i - 1].addtime <= lastTime) {
		 				removeFlag = true;
						//						this.readMsg.splice(i - 1, 1);
						temp.push(i - 1);
					} else {
						break;
					}
				}
				if(removeFlag) {
					refresh(l);
				}
				for(var i in temp) {
					this.readMsg.splice(temp[i], 1);
				}
			} catch(e) {
				this.loadMessage();
			}
		};
		this.add = function(k) {
			if($.util.isUndefined(this.unreadMsg)) {
				this.unreadMsg = [];
			}
			var time = new Date().getTime();
			if(!$.util.isUndefined(k)) {
				k.addtime = time;
				this.unreadMsg.unshift(k);
			}
			refresh(this.unreadMsg, j);
		};
		this.read = function() {
			var length = this.unreadMsg.length;
			if(length <= 0) {
				return;
			}
			var obj = null;
			for(var i = length; i > 0; i--) {
				obj = this.unreadMsg[i - 1];
				this.readMsg.unshift(obj);
				this.unreadMsg.splice(i - 1, 1);
			}
			refresh(this.unreadMsg, j);
			refresh(this.readMsg, l);
		};
		this.clear = function() {
			this.unreadMsg.splice(0, this.unreadMsg.length);
			this.readMsg.splice(0, this.readMsg.length);
			refresh(this.unreadMsg, j);
			refresh(this.readMsg, l);
		};
		this.getUnreadMessage = function() {
			return this.unreadMsg;
		};
		this.getReadMessage = function() {
			return this.readMsg;
		};
		this.getAllMessage = function() {
			return this.unreadMsg.concat(this.readMsg);
		};
		this.setPushMessageFlag = function(k) {
			$.storage.put(pushFlag, k);
		};
		this.getPushMessageFlag = function() {
			return $.storage.get(pushFlag);
		};
		this.delMessageByUUID = function(uuid) {
			var flag = false;
			for(var j in this.readMsg) {
				if(this.readMsg[j].uuid == uuid) {
					flag = true;
					this.readMsg.splice(j, 1)
					refresh(this.readMsg, l);
					break;
				}
			}
			if(!flag) {
				for(var i in this.unreadMsg) {
					if(this.unreadMsg[i].uuid == uuid) {
						flag = true;
						this.unreadMsg.splice(i, 1)
						refresh(this.unreadMsg, j);
						break;
					}
				}
			}
			if(flag) {
				this.loadMessage();
			}
			return flag;
		};
		var refresh = function(msg, k) {
			if(k == j) {
				if(msg.length <= 0) {
					$.storage.removeItem(j + window.Role.usercode);
				} else {
					var str = $.util.jsonToStr(msg);
					$.storage.put(j + window.Role.usercode, str);
				}
			} else if(k == l) {
				if(msg.length <= 0) {
					$.storage.removeItem(l + window.Role.usercode);
				} else {
					var str = $.util.jsonToStr(msg);
					$.storage.put(k + window.Role.usercode, str);
				}
			}
		};
	}
	eval("window.message=new Message()");
}(LF));

export default LF;