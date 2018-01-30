/**
 * LF app js framework
 * liyu - v1.0.0 (2015-10-27)
 */


    /**
     * 整个框架父类
     */
    var LF = {};
    //app平台信息 开始
    /**
     * @description 手机平台模块
     */
    LF.app = {
        KEY_SYSTEM_TYPE: "systemType",
        plus:null,
        /**
         * @description 初始化手机平台信息
         */
        init: function() {
            var platformName = "";
            this.plus = mui.os.plus;
            
            if(this.plus){
            	platformName = plus.os.name;
            	LF.log.info("webview  id = [" + plus.webview.currentWebview().id + "]");
            	LF.log.info("webview url = [" + plus.webview.currentWebview().getURL() + "]");
            	
            }else{
//          	platformName = mui.os.wechat ? mui.os.wechat:(mui.os.android ? : mui.os.android : (mui.os.ios ? mui.os.ios: 'pc'));
            }
             //初始化加载用户登录信息
        	window.Role.loadLoginInfo();
            LF.storage.put(this.KEY_SYSTEM_TYPE, platformName);
        },
        /**
         * @description 初获取手机平台信息
         */
        getPlatform: function() {
            return LF.storage.get(this.KEY_SYSTEM_TYPE);
        }
    };
    //APP平台信息 结束

    //日志模块 开始
    /**
     * @description 日志模块
     */
    LF.log = {
        /**
         * @description 打印info日志
         * @param {String} d 打印内容
         */
        info: function(d) {
            console.info(d);
        },
        /**
         * @description 打印log日志
         * @param {String} d 打印内容
         */
        log: function(d) {
            console.log(d);
        },
        /**
         * @description 打印debug日志
         * @param {String} d 打印内容
         */
        debug: function(d) {
            LF.log.zyLog(d);
        },
        /**
         * @description 打印warn日志
         * @param {String} d 打印内容
         */
        warn: function(d) {
            LF.log.zyLog(d);
        },
        /**
         * @description 打印error日志
         * @param {String} d 打印内容
         */
        error: function(d) {
            console.error(d);
        }
    };

    //日志模块 结束

    //缓存模块 开始
    /**
     * @description 缓存模块
     */
    LF.storage = {
    	getStarage:function(){
    		return mui.os.plus ? plus.storage:localStorage;
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

    //页面 开始
    /**
     * @description ready函数，主入口函数
     * @param {Function} m
     */
    LF.ready = function(m) {
    	if(mui.os.plus){
    		mui.plusReady(function() {
	            mui.init({
	                swipeBack: false //关闭右滑关闭功能
	            });
	            LF.app.init();
	            if (typeof m == 'function') {
	                m();
	            }
	        });
    	}else{
			mui.ready(function(){
				LF.app.init();
	            if (typeof m == 'function') {
	                m();
	            }
			})
    	}
    };
    /**
     * @description 原生调用API
     */
    LF.native = {
        /**
         * @description 显示系统等待对话框
         * @param {Function} successCB 拍照操作成功的回调函数
         * * @param {Function} errorCB 拍照操作失败的回调函数
         * @param {Object} options 摄像头拍照参数
         */
        captureImage: function(successCB, errorCB, option) {
            plus.camera.getCamera().captureImage(successCB, errorCB, option);
        },
        /**
         * @description 显示系统等待对话框
         * @param {Function} successCB 拍照操作成功的回调函数
         * * @param {Function} errorCB 拍照操作失败的回调函数
         * @param {Object} options 摄像头拍照参数
         */
        pick: function(successCB, errorCB, option) {
            plus.gallery.pick(successCB, errorCB, option);
        }
    };
    /**
     * @description 通用UI模块
     */
    LF.nativeUI = {
    	/**
         * @description 显示系统等待对话框
         * @param {String} title 等待对话框上显示的提示标题内容
         * @param {Object} options 可设置等待对话框的宽、高、边距、背景等样式
         */
        showWaiting: function(title, options) { //弹出没有进度条消息提示框
        	if(LF.app.plus){
        		plus.nativeUI.showWaiting(title, options)
        	}
            
        },
        /**
         * @description 关闭系统等待对话框
         */
        closeWaiting: function() { //关闭消息提示框
        	if(LF.app.plus){
        		plus.nativeUI.closeWaiting();
        	}
        },
        /**
         * @description 显示自动消失的提示消息
         * @param {String} message 提示消息上显示的文字内容
         * @param {Object} options 可设置提示消息显示的图标、持续时间、位置等
         */
        toast: function(message, options) { //弹出有进度条消息提示框
            var settings = mui.extend({}, STYLE.toastOption, options);
			mui.toast(message,settings);
        },
        /**
         * @description 创建并显示系统样式确认对话框，可设置确认对话框的标题、内容、按钮数目及其文字。 弹出的确认对话框为非阻塞模式，用户点击确认对话框上的按钮后关闭，并通过confirmCB回调函数通知用户点击的按钮索引值。
         * @param {String} title 确认对话框上显示的标题
         * @param {String} message 确认对话框上显示的内容
         * @param {Array} buttons 字符串数组，每项对应在确认对话框上显示一个按钮，用户点击后通过confirmCB返回用户点击按钮的在数组中的索引值
         * @param {Function} confirmCB 回调函数中包括Event参数，可通过其index属性（Number类型）获取用户点击按钮的索引值。
         * @example
         LF.window.confirm("nativeUI", "Are you sure ready?",  ["Yes","No"] ,function(e)｛
         console.log( (e.index==0)?"Yes!":"No!" );
         });
         */
        confirm: function(title, message, buttons, confirmCB) { //弹出至少包含一个至多包含3个按钮的对话框
			mui.confirm(message,title,buttons,confirmCB,type);
        },
        /**
         * @description 创建并显示系统样式确认对话框，可设置确认对话框的标题、内容、按钮数目及其文字。 弹出的确认对话框为非阻塞模式，用户点击确认对话框上的按钮后关闭，并通过confirmCB回调函数通知用户点击的按钮索引值。
         * @param {String} title 确认对话框上显示的标题
         * @param {String} message 确认对话框上显示的内容
         * @param {String} tip 编辑框显示的提示文字
         * @param {Array} buttons 字符串数组，每项对应在确认对话框上显示一个按钮，用户点击后通过confirmCB返回用户点击按钮的在数组中的索引值
         * @param {Function} confirmCB 回调函数中包括Event参数，可通过其index属性（Number类型）获取用户点击按钮的索引值。
         * @example
         LF.window.confirm("nativeUI", "Are you sure ready?",  ["Yes","No"] ,function(e)｛
         console.log( (e.index==0)?"Yes!":"No!" );
         });
         */
        prompt: function(title, message, tip, buttons, confirmCB) { //弹出至少包含一个至多包含3个按钮的对话框
			mui.confirm(message,tip,title,buttons,confirmCB,type);
        },
        /**
         * @description 创建并显示系统样式确认对话框，可设置确认对话框的标题、内容、按钮数目及其文字。 弹出的确认对话框为非阻塞模式，用户点击确认对话框上的按钮后关闭，并通过confirmCB回调函数通知用户点击的按钮索引值。
         * @param {String} title 确认对话框上显示的标题
         * @param {String} message 确认对话框上显示的内容
         * @param {String} buttonCapture  提示对话框上按钮显示的内容
         * @param {Array} buttons 字符串数组，每项对应在确认对话框上显示一个按钮，用户点击后通过confirmCB返回用户点击按钮的在数组中的索引值
         * @param {Function} confirmCB 回调函数中包括Event参数，可通过其index属性（Number类型）获取用户点击按钮的索引值。
         * @example
         LF.window.confirm("nativeUI", "Are you sure ready?",  ["Yes","No"] ,function(e)｛
         console.log( (e.index==0)?"Yes!":"No!" );
         });
         */
        alert: function(title, message, buttonCapture , confirmCB,type) { //弹出至少包含一个至多包含3个按钮的对话框
			mui.alert(message,title,buttonCapture,buttons,confirmCB,type);
        },
    }
    /**
     * @description 窗口模块
     */
    LF.window = {
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
	   },
    	/**
         * @description 初始化子页面
         * @param {Object} options 
         */
		init:function(options){
			mui.init(options);
		},
        /**
         * @description 创建Webview窗口
         * @param {String} id 窗口标识可用于在其它页面中通过getWebviewById来查找指定的窗口，为了保持窗口标识的唯一性，应该避免使用相同的标识来创建多个Webview窗口。 如果传入无效的字符串则使用url参数作为WebviewObject窗口的id值。
         * @param {String} url 新打开Webview窗口要加载的HTML页面地址，可支持本地地址和网络地址。
         * @param {Object} styles 创建Webview窗口的样式（如窗口宽、高、位置等信息）
         * @param {Object} extras 值为JSON类型，设置扩展参数后可以直接通过Webview的点（“.”）操作符获取扩展参数属性值，如： var w=plus.webview.create('url.html','id',{},{preload:"preload webview"}); // 可直接通过以下方法获取preload值 console.log(w.preload); // 输出值为“preload webview”
         * @return {plus.webview.WebviewObject}
         */
        create: function(id, url, styles, extras) {
        	if(!LF.app.plus){
        		return;
        	}
            var settings = mui.extend({}, STYLE.webviewStyle, styles);
            var wv = LF.window.getWebviewById(id);
            if (!LF.util.isUndefined(wv)) {
                wv.setStyle(settings);
                return wv;
            }
            return plus.webview.create(url, id, settings, extras);
        },
        /**
         * @description 预加载webview并在webview页面创建完成之后显示
         * @param {String} id 窗口标识可用于在其它页面中通过getWebviewById来查找指定的窗口，为了保持窗口标识的唯一性，应该避免使用相同的标识来创建多个Webview窗口。 如果传入无效的字符串则使用url参数作为WebviewObject窗口的id值。
         * @param {String} url 新打开Webview窗口要加载的HTML页面地址，可支持本地地址和网络地址。
         * @param {Object} styles 创建Webview窗口的样式（如窗口宽、高、位置等信息）
         * @param {Object} extras 值为JSON类型，设置扩展参数后可以直接通过Webview的点（“.”）操作符获取扩展参数属性值，如： var w=plus.webview.create('url.html','id',{},{preload:"preload webview"}); // 可直接通过以下方法获取preload值 console.log(w.preload); // 输出值为“preload webview”
         * @return {plus.webview.WebviewObject}
         */
        openWindow: function(id, url, styles, extras,closeWV) {
        	if(!LF.app.plus){
        		//TODO 先临时这么处理：手机上顶层跳，PC上parent跳
				if (mui.os.ios || mui.os.android) {
					window.top.location.href = url;
				} else {
					window.parent.location.href = url;
				}
        		return;
        	}
            var settings = mui.extend({}, STYLE.webviewStyle, styles);
            var wv = LF.window.getWebviewById(id);
            if (!LF.util.isUndefined(wv)) {
                wv.setStyle(settings);
            } else {
                wv = plus.webview.create(url, id, settings, extras);
            }
            wv.addEventListener("loaded", function() {
                LF.window.show(wv);
                if(closeWV){
                    setTimeout(function(){
                        closeWV.close();
                    },500);
                }
            });
            return wv;
        },
        /**
         * @description 打开Webview窗口
         * @param {String} id_wvobj 若操作Webview窗口对象显示，则无任何效果。 使用窗口id时，则查找对应id的窗口，如果有多个相同id的窗口则操作最先创建的窗口，若没有查找到对应id的WebviewObject对象，则无任何效果。
         * @param {String} aniShow 如果没有指定窗口动画类型，则使用默认值“fade-in”，即自动选择上一次显示窗口的动画效果，如果之前没有显示过，则使用“none”动画效果。
         * @param {Number} duration 单位为ms，如果没有设置则使用默认窗口动画时间600ms。
         * @param {Function} showedCB 当指定Webview窗口动画时，在动画执行完毕，窗口完全显示时触发回调。
         */
        _show: function(id_wvobj, aniShow, duration, showedCB) {
            if (LF.util.isUndefined(aniShow)) {
                aniShow = STYLE.animation.getOpenAnimation();
            }
            plus.webview.show(id_wvobj, aniShow, duration, showedCB);
        },
        /**
         * @description 打开Webview窗口
         * @param {plus.webview.WebviewObject} wv 若操作Webview窗口对象显示，则无任何效果。 使用窗口id时，则查找对应id的窗口，如果有多个相同id的窗口则操作最先创建的窗口，若没有查找到对应id的WebviewObject对象，则无任何效果。
         */
        show: function(wv) {
            wv.show(STYLE.animation.getOpenAnimation());
        },
        /**
         * @description 隐藏Webview窗口
         * @param {String} id_wvobj 要隐藏的Webview窗口id或窗口对象,使用窗口对象时，若窗口对象已经隐藏，则无任何效果。 使用窗口id时，则查找对应id的窗口，如果有多个相同id的窗口则操作最先打开的，若没有查找到对应id的WebviewObject对象，则无任何效果。
         * @param {String} aniHide 隐藏Webview窗口的动画效果,如果没有指定窗口动画，则使用默认动画效果“none”。
         * @param {Number} duration 隐藏Webview窗口动画的持续时间
         */
        hide: function(id_wvobj, aniHide, duration) {
            if (LF.util.isUndefined(aniHide)) {
                aniHide = STYLE.animation.getCloseAnimation();
            }
            plus.webview.hide(id_wvobj, aniHide, duration);
        },
        /**
         * @description 关闭Webview窗口
         * @param {String} id 窗口标识可用于在其它页面中通过getWebviewById来查找指定的窗口，为了保持窗口标识的唯一性，应该避免使用相同的标识来创建多个Webview窗口。 如果传入无效的字符串则使用url参数作为WebviewObject窗口的id值。
         * @param {String} url 新打开Webview窗口要加载的HTML页面地址，可支持本地地址和网络地址。
         * @param {Object} styles 创建Webview窗口的样式（如窗口宽、高、位置等信息）
         * @param {String} aniClose 如果没有指定窗口动画，则使用默认无动画效果“none”。
         * @param {Number} duration 单位为ms，如果没有设置则使用默认窗口动画时间600ms。
         * @param {Function} showedCB 当指定Webview窗口动画时，在动画执行完毕，窗口完全显示时触发回调。
         */
        _close: function(id_wvobj, aniClose, duration) {
            if (LF.util.isUndefined(aniClose)) {
                aniClose = STYLE.animation.getCloseAnimation();
            }
            plus.webview.close(id_wvobj, aniClose, duration);
        },
        /**
         * @description 关闭Webview窗口
         * @param {plus.webview.WebviewObject} id 窗口标识可用于在其它页面中通过getWebviewById来查找指定的窗口，为了保持窗口标识的唯一性，应该避免使用相同的标识来创建多个Webview窗口。 如果传入无效的字符串则使用url参数作为WebviewObject窗口的id值。
         */
        close: function(wv) {
            wv.close(STYLE.animation.getCloseAnimation())
        },
        /**
         * @description 获取当前窗口的WebviewObject对象
         * @return {plus.webview.WebviewObject}
         */
        currentWebview: function() {
            return plus.webview.currentWebview();
        },
        /**
         * @description 隐藏当前窗口的WebviewObject对象
         */
        hideCurrentWebview: function() {
        	if(!LF.app.plus){
        		return;
        	}
            LF.log.info("hide webview id = [" + plus.webview.currentWebview().id + "]");
            LF.log.info("hide webview url = [" + plus.webview.currentWebview().getURL() + "]");
            return plus.webview.currentWebview().hide(STYLE.animation.getCloseAnimation());
        },
        /**
         * @description 关闭当前窗口的WebviewObject对象
         */
        closeCurrentWebview: function() {
        	if(!LF.app.plus){
        		return;
        	}
            LF.log.info("close webview id = [" + plus.webview.currentWebview().id + "]");
            LF.log.info("close webview url = [" + plus.webview.currentWebview().getURL() + "]");
            return plus.webview.currentWebview().close(STYLE.animation.getCloseAnimation());
        },

        /**
         * @description 查找指定标识的WebviewObject窗口
         * @param {String} id
         * @return {plus.webview}
         */
        getWebviewById: function(id) {
        	if(!LF.app.plus){
        		return;
        	}
            return plus.webview.getWebviewById(id);
        },
        /**
         * @description 获取应用首页WebviewObject窗口对象
         * @return {plus.webview}
         */
        getLaunchWebview: function() {
        	if(!LF.app.plus){
        		return;
        	}
            return plus.webview.getLaunchWebview();
        },
    };
    //页面  结束
    /**
     * @description 窗口事件通讯
     */
    LF.event = {
        /**
         * @description 上拉下拉刷新
         * @param {Object} webviewObj对象或者webview的ID 通知目标窗口
         * @param {String} eventString 通知代码
         * @param {JSON} data 通知内容
         */
        fire: function(webview, eventString, data) {
        	if(!LF.app.plus){
        		return;
        	}
            console.log("通知事件[" + webview + "][" + eventString + "]");
            if (LF.util.isString(webview)) {
                console.log("通知类型[string]:" + webview);
                mui.fire(LF.window.getWebviewById(webview), eventString, data);
            } else {
                if(webview != null){
                    console.log("通知类型[webviewObk]:" + webview.id);
                    mui.fire(webview, eventString, data);
                }else{
                    console.log("通知类型[webviewObk]:is null");
                }
            }
        },
        listener: function(eventString, eventListener) {
        	if(!LF.app.plus){
        		return;
        	}
            window.addEventListener(eventString, eventListener);
        }
    };
    //网络 开始
    /**
     * @description 网络模块
     */
    LF.net = {
    	ajax:function(url,options){
    		if(!options.dataType){
    			options.dataType = "json";
    		}
    		if(!options.type){
    			options.type = "post";
    		}
    		if(!options.data){
    			options.data = {};
    		}
    		if(!options.timeout){
    			options.timeout = 10000;
    		}
    		if(!options.crossDomain){
    			options.crossDomain = true;
    		}
    		if(!options.headers){
//  			options.headers = {'Content-Type':'application/x-www-form-urlencoded'};
    			options.headers = {'Content-Type':'application/json;charset=UTF-8'};
    		}
    		console.log("url="+url);
    		var action = url.substring(url.lastIndexOf("/"));
    		LF.log.log("send[" + action + "]["+options.data.validation+"]:" + LF.util.jsonToStr(options.data));
    		var success = options.success;
    		var error = options.error;
    		var _success = function(data,textStatus,xhr){
    			LF.log.log("received[" + action + "]：" + JSON.stringify(data));
    			if(!(success === undefined)){
    				success(data);
    			}
    		}
    		var _error = function(xhr,type,errorThrown){
    			LF.log.log("received[" + action + "]：" + type + "，errorThrown："+errorThrown);
    			if(!(error === undefined)){
    				var o = '{"result_code":"-1", "result_msg":"系统异常！"}';
    				o = JSON.parse(o);
    				error(o);
    			}
    		}
    		
    		options.data = LF.util.jsonToStr(options.data);
    		options.success = _success;
    		options.error = _error;
    		mui.ajax(url,options);
    	},
    	post:function(url,data,success,error,type,timeout){
    		if(!type){
    			type="post";
    		}
    		if(!timeout){
    			timeout=10000;
    		}
    		var options = {};
    		options.data = data;
    		options.success = success;
    		options.error = error;
    		options.type = type;
    		options.timeout = timeout;
    		this.ajax(url,options);
    	},
    	getJSON: function(url,data,success,error){
    		var type = "post";
    		var timeout = 10000;
    		
    		var defaule = LF.util.strToJson(LF.util.jsonToStr(REQUESTDATA));
    		data = mui.extend(true, defaule, data);
    		var signaturePwd = window.Role.getSignaturePwd();
    		var ignature = base64encode(LF.util.jsonToStr(data.data)) + data.name + signaturePwd;
    		data.validation = hex_md5(ignature);
    		
    		var options = {};
    		options.data = data;
    		options.success = success;
    		options.error = error;
    		options.type = type;
    		options.timeout = timeout;
    		
    		this.ajax(url,options);
    	},
        getJSON1: function(url, data, successProc, errProc) {
        	if(!type){
    			type="post";
    		}
    		if(!timeout){
    			timeout=10000;
    		}
            var xhr = null;
            xhr = new plus.net.XMLHttpRequest();
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.open(type, url);
            var timeoutObj = setTimeout(function() {
                xhr.abort();
                var o = '{"result_code":"9", "result_msg":"网络繁忙，请稍后再试！"}';
                o = JSON.parse(o);
                if (!(errProc === undefined))
                    errProc(o);
            }, timeout);
            //数据签名生成
            var defaule = LF.util.strToJson(LF.util.jsonToStr(REQUESTDATA));
            var sendData = mui.extend(true, defaule, data);
            var signaturePwd = window.Role.getSignaturePwd();
            var ignature = base64encode(LF.util.jsonToStr(data.data)) + sendData.name + signaturePwd;
            sendData.validation = hex_md5(ignature);
            var action = url.substring(url.lastIndexOf("/"));
            LF.log.log("send[" + action + "][" + signaturePwd + "]:" + LF.util.jsonToStr(sendData));
            
            mui.ajax(url,{
				data:JSON.stringify(sendData),
				dataType:'json',//服务器返回json格式数据
				type:type,//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				headers:{'Content-Type':'application/x-www-form-urlencoded'},
				success:function(data){
					console.log("data:"+JSON.stringify(data));
				},
				error:function(xhr,type,errorThrown){
					//异常处理；
					console.log(type);
					console.log(errorThrown);
				}
			});
            return;
            xhr.onreadystatechange = function() {
                var resultText = null;
                var resultJson = null;
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resultText = xhr.responseText;
                        clearTimeout(timeoutObj);
                    } else {
                        resultText = '{"result_code":"9", "result_msg":"无法连接到服务器！"}';
                        resultText = JSON.parse(resultText);
                        if (!(errProc === undefined))
                            errProc(resultText);
                        clearTimeout(timeoutObj);
                        return;
                    }
                } else {
                    return;
                }
                try {
                    clearTimeout(timeoutObj);
                    LF.log.log("received[" + action + "]：" + unescape(resultText.replace(/\\/g, "%")));
                    resultJson = eval("(" + resultText + ")");
                    //					resultJson = LF.util.strToJson(resultText);
                    if (resultJson.result_code == 6) {
                        if (window.Role.loginsign != "0") {
                            window.Role.logout();
                            window.address.loadAddress();
                            window.address.clearDefaultAddress();
                            LF.event.fire(LF.window.getLaunchWebview(), "userChange");
                            LF.window.toast("用户登录过期，请重新登录");
                        }
                    } else {
                        if (!(successProc === undefined))
                            successProc(resultJson);
                    }
                    //					var data = JSON.parse(resultText);
                } catch (e) {
                    console.log(e);
                    resultText = '{"result_code":"-1", "result_msg":"系统出错!"}';
                    resultJson = JSON.parse(resultText);
                    if (!(errProc === undefined))
                        errProc(resultJson);
                }
            };
            xhr.send(LF.util.jsonToStr(sendData));
        },
        /**
         * @description 上传
         * @param {String} url 上传服务器路径
         * @param {Array} files 文件，可以是多个或者一个,数组中存放对象，对象模式为：{path:"",key:""}
         * @param {Object} data 参数
         * @param {Function} successBC 上传成功回调函数
         */
        upload: function(url, files, data, successBC, errorCB) {
            if (files.length <= 0) {
                plus.nativeUI.alert("没有添加上传文件！");
                return;
            }
            var wt = plus.nativeUI.showWaiting();
            var task = plus.uploader.createUpload(url, {
                    method: "POST"
                },
                function(t, status) { //上传完成
                    if (status == 200) {
                        //LF.window.toast("上传成功");//t.responseText
                        wt.close();
                        if (typeof successBC == 'function') {
                            successBC(t);
                        }

                    } else {
                        wt.close();
                        if (typeof errorCB == 'function') {
                            errorCB(t);
                        }
                    }
                }
            );
            if (!LF.util.isUndefined(data)) {
                task.addData("data", data);
            }
            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                task.addFile(f.path, {
                    key: f.name
                });
            }
            task.start();
        },
        taskArr: new Array(),
        isStartTask: false,
    }


    LF.statistic = {
        /**
         * @description 存储key-value
         * @param {String} key 存储的键值
         * @param {String} label 存储的内容
         */
        eventTrig: function(key, label) {
            if (typeof(label) == "undefined") {
                label = "";
            }
            plus.statistic.eventTrig(key,label);
        }
    };

    //工具类 开始
    LF.util = {
        //var base64EncodeChars : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        //var base64DecodeChars : new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
        replaceTemplate: function(i, j) {
            var k = i;
            for (var l in j) {
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
            if (typeof(value) == "undefined" || value == null) {
                return true;
            } else {
                return false;
            }
        },
        isEmpty: function(value) {
            if (value) {
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
            if(h<10){
                h = "0"+h;
            }
            var m = date.getMinutes();
            if(m<10){
                m = "0"+m;
            }
            var s = date.getSeconds();
            if(s<10){
                s = "0"+s;
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
            if (!re.test(value)) {
                return false;
            } else {
                return true;
            }
        },
        decToHex: function(str) {
            str = str.replace(/\n/g," ");
            var res = [];
            for (var i = 0; i < str.length; i++)
                res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
            return "\\u" + res.join("\\u");
        },
        createUUID : function(g){
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid.replace(/-/g, "");;
        },
        getStringLen : function(Str){
            var   i,len,code;
            if(Str==null || Str == "")   return   0;
            len   =   Str.length;
            for   (i   =   0;i   <   Str.length;i++)
            {
                code   =   Str.charCodeAt(i);
                if   (code   >   255) {len ++;}
            }
            return len;
        },
        addNum: function(num1,num2){
            var sq1,sq2,m;
            try{sq1=num1.toString().split(".")[1].length;} catch(e){sq1=0;}
            try{sq2=num2.toString().split(".")[1].length;} catch(e){sq2=0;}
            m=Math.pow(10,Math.max(sq1,sq2));
            return ( this.multNum(num1,m) + this.multNum(num2,m) ) / m;
        },
        multNum:function(arg1,arg2){
            var m=0,s1=arg1.toString(),s2=arg2.toString();
            try{m+=s1.split(".")[1].length}catch(e){}
            try{m+=s2.split(".")[1].length}catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
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
            if (typeof(k) != "undefined") {
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
                } catch (e) {
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
            if (m >= 0) {
                l = l.substr(0, m);
            };
            if (this.loginsign != "1") {
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
            if (LF.util.isUndefined(signaturePwd)) {
                signaturePwd = DEFAULTSIGNATUREPWD;
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
                if (!$.util.isUndefined(defalutAddress)) {
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
                if (!$.util.isUndefined(defalutCity)) {
                    this.city_id = defalutCity.city_id;
                    this.city_name = defalutCity.city_name;
                }
            } catch (e) {}
        };
        this.setDeaultAddress = function(k) {
            try {
                if (!$.util.isUndefined(k)) {
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
            } catch (e) {
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
            if (!$.util.isEmpty(k)) {
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
        this.updateTimestamp = function(){
            var tp = new Date().getTime();
            tp = tp.toString();
            $.storage.removeItem(t);
            $.storage.put(t,tp);
        }
        this.getTimestamp = function(){
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
            if ($.util.isEmpty(dishesItemsStr)) {
                this.dishesItems = [];
                this.total_amount = 0;
                this.num = 0;
            } else {
                this.dishesItems = $.util.strToJson(dishesItemsStr);
                this.num = 0;
                this.total_amount = 0;
                for (var i in this.dishesItems) {
                    this.num = Number(this.num) + Number(this.dishesItems[i].item_num);
                    this.total_amount = this.total_amount + this.dishesItems[i].amount * this.dishesItems[i].item_num;
                }
            }
            if (!$.util.isEmpty(id)) {
                var shoppingWebviewStr = $.storage.get(l);
                if ($.util.isEmpty(shoppingWebviewStr)) {
                    this.webviewList = new Array();
                    this.webviewList.push(id);
                    $.storage.put(l, $.util.jsonToStr(this.webviewList));
                } else {
                    this.webviewList = $.util.strToJson(shoppingWebviewStr);
                    var flag = false;
                    for (var i in this.webviewList) {
                        if (this.webviewList[i] == id) {
                            flag = true;
                        }
                    }
                    if (!flag) {
                        this.webviewList.push(id);
                    }
                    $.storage.put(l, $.util.jsonToStr(this.webviewList));
                }
            } else {
                var shoppingWebviewStr = $.storage.get(l);
                if ($.util.isEmpty(shoppingWebviewStr)) {
                    this.webviewList = new Array();
                } else {
                    this.webviewList = $.util.strToJson(shoppingWebviewStr);
                }
            }
        };
        this.checkShoppingCart = function() {
            var result = [];
            if (this.dishesItems == null || this.dishesItems.length == 0) {
                return result;
            }
            var time1 = $.storage.get("sales_start_time");
            if ($.util.isEmpty(time1)) {
                time1 = "10:30:00";
            }
            var time2 = $.storage.get("sales_end_time");
            if ($.util.isEmpty(time2)) {
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

            if (nowTime > data1.getTime() && nowTime <= data2.getTime()) { //10:30-21:00
                for (var i in this.dishesItems) {
                    testDate.setTime(this.dishesItems[i].addtime);
                    if (data1.getTime() > this.dishesItems[i].addtime) {
                        result.push(this.dishesItems[i]);
                        //						this.dishesItems.splice(i, 1);
                        temp.push(i);
                    }
                }
            } else if (nowTime > data2.getTime() && nowTime <= data3.getTime()) { //10:30-23:59:59
                for (var i in this.dishesItems) {
                    if (data2.getTime() > this.dishesItems[i].addtime) {
                        result.push(this.dishesItems[i]);
                        temp.push(i);
                    }
                }
            } else {
                for (var i in this.dishesItems) {
                    if (date4 >= this.dishesItems[i].addtime) {
                        result.push(this.dishesItems[i]);
                        temp.push(i);
                    }
                }
            }
            for (var i = temp.length - 1; i >= 0; i--) {
                this.dishesItems.splice(temp[i], 1);
            }
            refresh(this.dishesItems);
            this.loadShoppingCart();
            return result;
        };
        this.getDeliveryDate = function() {
            var time1 = $.storage.get("sales_start_time");
            if ($.util.isEmpty(time1)) {
                time1 = "10:30:00";
            }
            var nowTime = new Date().getTime();
            var nowDay = $.util.getNowDay();
            var data1 = $.util.getZDTime(time1);
            if (nowTime < data1.getTime()) {
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

            if (this.dishesItems == null) {
                this.loadShoppingCart();
            }
            if(Number(dishes.remain) < Number(dishes.item_num)){
                return false;
            }
            if ($.util.isEmpty(dishes.dishes_id) || $.util.isEmpty(dishes.specification_id) || $.util.isEmpty(dishes.remain) || $.util.isEmpty(dishes.amount) || $.util.isEmpty(dishes.item_num) ) {
                return false;
            }
            var retrunFlag = true;
            var flag = false;
            var time = new Date().getTime();
            for (var i in this.dishesItems) {
                if (this.dishesItems[i].dishes_id == dishes.dishes_id &&
                    this.dishesItems[i].specification_id == dishes.specification_id) {
                    var tempNum = Number(this.dishesItems[i].item_num) + Number(dishes.item_num);
                    if((this.dishesItems[i].item_num == dishes.remain || this.dishesItems[i].item_num == 9 || tempNum > 9)&& dishes.dishes_id != 1){
                        retrunFlag = false;
                        flag = true;
                        break;
                    }else{
                        this.dishesItems[i].item_num = Number(this.dishesItems[i].item_num) + Number(dishes.item_num);
                        this.dishesItems[i].remain = dishes.remain;
                        this.dishesItems[i].addtime = time;
                        flag = true;
                        break;
                    }
                }
            }
            if (!flag) {
                if ($.util.isEmpty(dishes.dishes_id) || $.util.isEmpty(dishes.dishes_name) || $.util.isEmpty(dishes.specification_id) || $.util.isEmpty(dishes.specification_name) || $.util.isEmpty(dishes.remain) || $.util.isEmpty(dishes.amount) || $.util.isEmpty(dishes.item_num) || $.util.isEmpty(dishes.imgurl)) {
                    return false;
                } else {
                    if (this.dishesItems.length == 0) {
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
            for (var i in dishesList) {
                flag = false;
                for (var i in this.dishesItems) {
                    if (this.dishesItems[i].dishes_id == dishesList[i].dishes_id &&
                        this.dishesItems[i].specification_id == dishesList[i].specification_id) {
                        this.dishesItems[i].item_num = Number(this.dishesItems[i].item_num) + Number(dishes.item_num);
                        //						this.dishesItems[i].amount += dishesList[i].amount;
                        this.dishesItems[i].remain = dishesList[i].remain;
                        this.dishesItems[i].addtime = time;
                        flag = true;
                    }
                }
                if (!flag) {
                    dishesList[i].addtime = time;
                    this.dishesItems.push(dishesList[i]);
                }
            }
            refresh(this.dishesItems);
            this.loadShoppingCart();
            this.updateTimestamp();
        };
        this.remove = function(dishes) {
            if (this.ishesItems == null) {
                this.loadShoppingCart();
            }
            if ($.util.isEmpty(dishes.dishes_id) || $.util.isEmpty(dishes.specification_id) || $.util.isEmpty(dishes.remain) || $.util.isEmpty(dishes.amount) || $.util.isEmpty(dishes.item_num)) {
                return false;
            }
            var flag = -1;
            var time = new Date().getTime();
            for (var i in this.dishesItems) {
                if (this.dishesItems[i].dishes_id == dishes.dishes_id &&
                    this.dishesItems[i].specification_id == dishes.specification_id) {
                    this.dishesItems[i].item_num = this.dishesItems[i].item_num - dishes.item_num;
                    //					this.dishesItems[i].amount -= dishes.amount;
                    this.dishesItems[i].remain = dishes.remain;
                    this.dishesItems[i].addtime = time;
                    if (this.dishesItems[i].item_num <= 0) {
                        flag = i;
                    }
                    break;
                }
            }
            if (flag != -1) {
                if (flag != 0) {
                    this.dishesItems.splice(flag, 1);
                }
            }
            if (this.dishesItems.length == 1) {
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
            if ($.util.isUndefined(data) || data.length <= 0) {
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
            var unreadMsgStr = $.storage.get(j+window.Role.usercode);
            var readMsgStr = $.storage.get(l+window.Role.usercode);
            try {
                if ($.util.isEmpty(unreadMsgStr)) {
                    this.unreadNum = 0;
                    this.unreadMsg = [];
                    this.readMsg = [];
                } else {
                    this.unreadMsg = $.util.strToJson(unreadMsgStr);
                    this.unreadNum =  this.unreadMsg.length;
                }

                if (!$.util.isEmpty(readMsgStr)) {
                    this.readMsg = $.util.strToJson(readMsgStr);
                } else {
                    this.readMsg = [];
                }
            } catch (e) {
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
                for (var i = length; i > 0; i--) {
                    if (this.readMsg[i - 1].addtime <= lastTime) {
                        removeFlag = true;
                        //						this.readMsg.splice(i - 1, 1);
                        temp.push(i - 1);
                    } else {
                        break;
                    }
                }
                if (removeFlag) {
                    refresh(l);
                }
                for (var i in temp) {
                    this.readMsg.splice(temp[i], 1);
                }
            } catch (e) {
                this.loadMessage();
            }
        };
        this.add = function(k) {
            if ($.util.isUndefined(this.unreadMsg)) {
                this.unreadMsg = [];
            }
            var time = new Date().getTime();
            if (!$.util.isUndefined(k)) {
                k.addtime = time;
                this.unreadMsg.unshift(k);
            }
            refresh(this.unreadMsg, j);
        };
        this.read = function() {
            var length = this.unreadMsg.length;
            if (length <= 0) {
                return;
            }
            var obj = null;
            for (var i = length; i > 0; i--) {
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
        this.delMessageByUUID = function(uuid){
            var flag = false;
            for(var j in this.readMsg){
                if(this.readMsg[j].uuid == uuid){
                    flag = true;
                    this.readMsg.splice(j, 1)
                    refresh(this.readMsg, l);
                    break;
                }
            }
            if(!flag){
                for(var i in this.unreadMsg){
                    if(this.unreadMsg[i].uuid == uuid){
                        flag = true;
                        this.unreadMsg.splice(i, 1)
                        refresh(this.unreadMsg, j);
                        break;
                    }
                }
            }
            if(flag){
                this.loadMessage();
            }
            return flag;
        };
        var refresh = function(msg, k) {
            if (k == j) {
                if (msg.length <= 0) {
                    $.storage.removeItem(j+window.Role.usercode);
                } else {
                    var str = $.util.jsonToStr(msg);
                    $.storage.put(j+window.Role.usercode, str);
                }
            } else if (k == l) {
                if (msg.length <= 0) {
                    $.storage.removeItem(l+window.Role.usercode);
                } else {
                    var str = $.util.jsonToStr(msg);
                    $.storage.put(k+window.Role.usercode, str);
                }
            }
        };
    }
    eval("window.message=new Message()");
}(LF));

