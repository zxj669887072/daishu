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

//日志模块 结束

//缓存模块 开始
/**
 * @description 缓存模块
 */
LF.storage = {
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
//缓存模块 结束

LF.sessionstorage = {
	getStarage: function() {
		return sessionStorage;
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
	 * @description 
	 * @param {String} url 新打开Webview窗口要加载的HTML页面地址，可支持本地地址和网络地址。
	 */
	openWindow: function(url, type = "_blank") {
		window.open(url, type);
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
		headers  = {'Content-Type':'application/x-www-form-urlencoded'},
		async
	}={}){
		var action = url.substring(url);
		url = config.SERVER_BAS_URL +url;
		
		LF.log.log("send[" + action + "]:" + LF.util.jsonToStr(data));
		var _success = function(data,textStatus,xhr){
			LF.log.log("received[" + action + "]：" + JSON.stringify(data));
			if(!(success === undefined)){
				success(data);
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
		
		var sign = this.dodata(data);
		var defaule = config.REQUESTDATA;
		data = Object.assign({}, defaule, data);
		data.timestamp = "20170228171657228";
		url += "?sign="+sign;
		var options = { data, success, error, type, timeout };
		this.ajax(url, options);
	},
	dodata:function(data){
		console.log("data:"+JSON.stringify(data));
		var defaule = config.REQUESTDATA;
		data = Object.assign({}, defaule, data);
		data.timestamp = new Date().getTime();
		var appSecret = hex_md5(data.appKey);
		var keys  = Object.keys(data);
		keys.sort();
		var str = "";
		for(let i in keys){
			str += (keys[i]+"=");
			if(data[keys[i]]){
				str += data[keys[i]];
			}
		}
		str += appSecret;
		console.log("str:"+str);
		var sign = hex_md5(str);
		return sign;
	},
	upload: function(url, files, data, successBC, errorCB) {}
}

//工具类 开始
LF.util = {
	now : function() {
		return Date.now || +new Date();
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
		return obj == null ? String(obj) : class2type({}.toString.call(obj)) || "object";
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
	}
};
//工具类 结束

//角色管理 开始
(function($) {
	function Role() {
		this.username = "";
		this.usercode = "";
		this.loginsign = "";
		this.enterprise_id = "";
		this.enterprise_introduce = "";
		this.user_type = "";
		this.enterprise_type = "";
		var j = "Role";
		var s = "signaturePwd";
		this.loadLoginInfo = function() {
			var k = LF.storage.get(j);
			if(typeof(k) != "undefined") {
				var l = null;
				try {
					l = eval("(" + k + ")");
					this.usercode = l.usercode;
					this.username = l.username;
					this.loginsign = l.loginsign;
					this.enterprise_id = l.enterprise_id;
					this.enterprise_introduce = l.enterprise_introduce;
					this.user_type = l.user_type;
					this.enterprise_type = l.enterprise_type;
				} catch(e) {
					this.loginsign = "0";
					this.username = "";
					this.usercode = "";
					this.enterprise_id = "";
					this.user_type = "";
					this.enterprise_type = "";
					this.enterprise_introduce = "";
				}
			} else {
				this.loginsign = "0";
				this.username = "";
				this.usercode = "";
				this.enterprise_id = "";
				this.user_type = "";
				this.enterprise_type = "";
				this.enterprise_introduce = "";
			}
		};
		this.checkRole = function(k) {
			this.loadLoginInfo();
			var l = k;
			var m = k.indexOf("?");
			if(m >= 0) {
				l = l.substr(0, m);
			};
			if(this.loginsign != "1") {
				return "2";
			};
			return "1";
		};
		this.saveInfo = function(k) {
			this.usercode = k.usercode;
			this.username = k.username;
			this.loginsign = k.loginsign;
			this.enterprise_id = k.enterprise_id;
			LF.storage.put(j, JSON.stringify(k));
			LF.storage.put(s, k.signaturePwd);
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
		this.getSignaturePwd = function() {
			var signaturePwd = LF.storage.get(s);
			if(LF.util.isUndefined(signaturePwd)) {
				signaturePwd = config.DEFAULTSIGNATUREPWD;
			}

			return signaturePwd;
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