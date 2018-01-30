import LF from 'LF';
import Vue from 'vue';
import hex_md5  from './../../js/framework/md5.js';
import LfImgzoom from './../../components/imgzoom.vue';

/*
 * 解决ie下table中需要引入template的问题
 * 使用下面方法注册组件，只能使用这个方法，.vue组件模式不行
 */
Vue.component("my-tr", {
	  template: '<tr>' +
	            '<th>' +
	            '<div v-text="itsp.goodsName"></div>' +
	        	'</th></tr><tr class="shop-splic"><td colspan="5"><div class="line"></div></td></tr>',
	  props: ["itsp"]
});
new Vue({
	el: "#app",
	data: {
		title: "test index",
		rawHtml:"<span>a</span>",
		carList: [
			{ "merchantId": 5, "merchantName": "御膳房", "contactPhone": "", "goodsList": [{ "id": 240, "goodsName": "剃须刀", "price": 233, "jfPrice": "", "goodsTag": "1", "picUrl": "", "qty": 1, "joinDate": "", "spec": "1", "merchantId": 5, "toShopFlag": "0" }] }, 
			{ "merchantId": 31, "merchantName": "诺克萨斯", "contactPhone": "", "goodsList": [{ "id": 31, "goodsName": "联想", "price": 1555, "jfPrice": 1500, "goodsTag": "1", "picUrl": "", "qty": 2, "joinDate": "", "spec": "1", "merchantId": 31, "toShopFlag": "1" }] }
		]
	},
	methods: {
		go: function(url) {
			LF.window.openWindow(url);
		},
		testajax: function() {
			var params1 = {"merchantId": "就", "structureNo": 132 }
			var params2 = { "account":"15712015006","password":"e10adc3949ba59abbe56e057f20f883e" }
			//第三种方式 可以选择POST或者GET
			//常规函数，使用function 在方法内的this引用已经改变，所以需要在外面定义this变量
			var self = this;//这样在function中用过self调用vue的this对象。
			LF.net.getJSON("/goods/recommend/list", params1, function(res) {
				console.log(JSON.stringify(res));
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
			});
			return;
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解
			LF.net.getJSON("/integral/user/login", params2, res=>{
				console.log(JSON.stringify(res));
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
		}
//		md5t(){
//			var s = 'appKey=888888appType=appVersion=0.0.1deviceNo=865982025170278deviceToken=23fc08c4 332168b4 4f973c95 df44321f 3559c85f 45c532b2 9e6fe7bb 50c439c3merchantId=就osVersion=9.2.1phoneModel=iphone 6 plusstructureNo=132sysType=1timestamp=20170228171657228tokenId=99d2e32136bc40acb30d9bc92155a9f3versionNo=144d6d569341947ec947c711a18574de5';
//			var si = hex_md5(s);
//			console.log(si);
//		}

	},
	
	/*
	 * 
	 */
	mounted: function() {
		LF.log.log("%d年%d月%d日", 2011, 3, 26);
		this.testajax();
//		this.md5t();
	},
	components: {
		LfImgzoom
	},

});