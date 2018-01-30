//工程js框架
import LF from 'LF';
import Vue from 'vue';
import jQuery from './../../js/lib/jquery-1.8.0.min';
//import './../../js/lib/jquery.jslides';
//引入公共的header和footer
import LfHeader from './../../components/header_new.vue';
import LfSearch from './../../components/search.vue';
import LfFooter from './../../components/footer.vue';
//引入element-ui组件
import {
	Card,
	Loading,
	Carousel,
	CarouselItem,
	Message,
	Dialog
} from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);

/*
 * 实例化Vue实例
 * el：挂在节点，不能挂在到body上。统一规定el全部挂在到body下的唯一的根div。例子参考index.html
 * data:数据初始化，数据有响应式要求，自行查看API哪些能触发视图响应更新
 */
new Vue({
	el: '#app',
	data: {
		searchStr: '',
		//分类数据
		categoryList: [],
		//分类选择标志：
		categoryOn: "",
		oldCategoryOn: "",
		//分类选择数据
		chooseCategoryList: [],
		//显示分类子界面标志
		categoryLiShow: false,
		advertList101: [],
		advertList102: [],
		advertList103:[],
		advertList104:[],
		advertList105:[],
		advertList106:[],
		recommendChannelName: "",
		czckChannelName: "",
		rmpdChannelName: "",
		rmpd1ChannelName: "",
		rmpd2ChannelName: "",
		jx1ChannelName: "",
		//广告图片轮播数据
		advertList: [
			//			{
			//				"picUrl": "../../images/banner.png",
			//				"url": "http://www.baidu.com"
			//			},
			//			{
			//				"picUrl": "../../images/banner.png",
			//				"url": "http://www.baidu.com"
			//			},
			//			{
			//				"picUrl": "../../images/banner.png",
			//				"url": "http://www.baidu.com"
			//			},
		],
		//活动广告数据
		advertList2: [
			//			{
			//				"picUrl": "../../images/ggwd.png",
			//				"url": "http://www.baidu.com"
			//			},
			//			{
			//				"picUrl": "../../images/ggwd.png",
			//				"url": "http://www.baidu.com"
			//			},
			//			{
			//				"picUrl": "../../images/ggwd.png",
			//				"url": "http://www.baidu.com"
			//			},
			//			{
			//				"picUrl": "../../images/ggwd.png",
			//				"url": "http://www.baidu.com"
			//			}

		],
		//超值爆款：listgoods/channel/list alias:hot_style
		czckList: [
			//			{ "butShow": false, "id": "1", "goodsName": "电视机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/dstv.png" },
			//			{ "butShow": false, "id": "2", "goodsName": "电视机", "price": "1000", "jfPrice": "20000", "goodsTag": "2", "picUrl": "../../images/dstv.png" },
			//			{ "butShow": false, "id": "3", "goodsName": "电视机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/dstv.png" },
			//			{ "butShow": false, "id": "4", "goodsName": "电视机", "price": "1000", "jfPrice": "20000", "goodsTag": "2", "picUrl": "../../images/dstv.png" }
		],
		/*
		 * 周边模块
		 * list goods/channel/list
		 * alias:
		 * 服装 clothing
		 * 热门 hot
		 * 生活周边 life
		 * 箱包 luggage
		 */
		pdList: [
			//			{ "id": "1", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/sjj.png" },
			//			{ "id": "2", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/sjj.png" },
			//			{ "id": "3", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/sjj.png" },
			//			{ "id": "4", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/sjj.png" },
			//			{ "id": "5", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/sjj.png" },
			//			{ "id": "6", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/sjj.png" },
			//			{ "id": "7", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/sjj.png" },
			//
			//			{ "id": "8", "goodsName": "照相机", "price": "1000", "jfPrice": "20000", "goodsTag": "1", "picUrl": "../../images/bange.png" }
		],
		zbactive: "hot",
		//周边
		zbpdList: [],
		//服装
		fzpdList: [],
		//热门
		rmpdList: [],
		//热销
		rmpdList1: [],
		//畅销
		rmpdList2: [],
		rmURL: '',
		rxURL: '',
		cxURL: '',
		//箱包
		xbpdList: [],
		/*
		 * 热评模块
		 */
		rpList: [],
		jxList1: [],
		jxList2: [],
		jxURL: '',
		jx2URL: '',
		//推荐商品
		recommendGoods: [],
		//分类详情列表，由分类数据中获取。
		categoryDetalList: [],
		//搜索门牌号
		searchStr: '',
		mobileVisible: false,
		//话费产品列表
		mobileItem: {
			list: [],
			index: 0,
			id: '',
			amount: '',
			desc: ''
		},
		billForm: {
			phone: ''
		},

		flowItem: {
			list: [],
			index: 0,
			id: '',
			amount: '',
			desc: ''
		},
		flowVisible: false,
		flowForm: {
			phone: '',
			flow: ''
		},

		gameVisible: false,
		gameItem: {
			list: [],
			index: 0,
			id: '',
			amount: '',
			desc: ''
		},
		gameForm: {
			account: ''
		},
		gasVisible: false,
		gasItem: {
			list: [],
			index: 0,
			id: '',
			amount: '',
			desc: ''
		},
		gasForm: {
			mobileNo: '',
			gasCardNo: '',
			gasCardName: ''
		},
		payVisible: false
	},

	/*
	 * 方法，所有方法挂载methods下面，在Vue实例内通过this.methodName来调用方法。
	 */
	methods: {
		go(url) {
			LF.window.openWindow(url);
		},
		/*
		 * 根据分类structureNo跳转到具体路分类页面，暂时先跳百度
		 */
		gotoByStructureNo(structureNo, structureName, childstructureName, id) {
			var _this = this;
			if (structureNo == '100064') { //根目录
				return;
			} else if (structureNo == '100072') { //话费
				//查询话费列表
				LF.net.getJSON("/recharge/mobile/item", {
					pageSize: 10
				}, res => {
					if (res.code == "000") {
						_this.mobileItem.list = res.data.list;
						if (_this.mobileItem.list.length > 0) {
							var defaultItem = _this.mobileItem.list[0];
							_this.mobileItem.id = defaultItem.productId;
							_this.mobileItem.amount = defaultItem.productValue;
							_this.mobileVisible = true;
						} else {
							Message({
								type: 'warning',
								message: "暂无产品！"
							});
							_this.mobileVisible = false;
						}
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});

			} else if (structureNo == '100073') { //流量
				//查询话费列表
				LF.net.getJSON("/recharge/flow/item", {
					pageSize: 10
				}, res => {
					if (res.code == "000") {
						_this.flowItem.list = res.data;
						if (_this.flowItem.list.length > 0) {
							var defaultItem = _this.flowItem.list[0];
							_this.flowItem.id = defaultItem.itemId;
							_this.flowItem.amount = defaultItem.productValue;
							_this.flowVisible = true;
						} else {
							Message({
								type: 'warning',
								message: "暂无产品！"
							});
							_this.flowVisible = false;
						}
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});



			} else if (structureNo == '100074') { //游戏列表
				LF.net.getJSON("/recharge/game/item", {
					pageSize: 10
				}, res => {
					if (res.code == "000") {
						_this.gameItem.list = res.data.list;
						if (_this.gameItem.list.length > 0) {
							var defaultItem = _this.gameItem.list[0];
							_this.gameItem.id = defaultItem.itemId;
							_this.gameItem.amount = defaultItem.advicePrice;
							_this.gameItem.desc = defaultItem.itemName;
							_this.gameVisible = true;
						} else {
							Message({
								type: 'warning',
								message: "暂无产品！"
							});
							_this.gameVisible = false;
						}
					} else {
						Message({
							type: 'warning',
							message: "查询失败！"
						});
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			} else if (structureNo == '100075') { //油卡
				LF.net.getJSON("/recharge/gas/item", {
					pageSize: 10
				}, res => {
					if (res.code == "000") {
						_this.gasItem.list = res.data.list;
						if (_this.gasItem.list.length > 0) {
							var defaultItem = _this.gasItem.list[0];
							_this.gasItem.id = defaultItem.itemId;
							_this.gasItem.amount = defaultItem.advicePrice;
							_this.gasItem.desc = defaultItem.itemName;
							_this.gasVisible = true;
						} else {
							Message({
								type: 'warning',
								message: "暂无产品！"
							});
							_this.gasVisible = false;
						}
					} else {
						Message({
							type: 'warning',
							message: "查询失败！"
						});
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			} else {
				if (childstructureName) {
					LF.window.openWindow(encodeURI("list.html?structureNo=" + structureNo + "&structureName=" + structureName + "&childstructureName=" + childstructureName + "&parentId=" + id));
				} else {
					LF.window.openWindow(encodeURI("list.html?structureNo=" + structureNo + "&structureName=" + structureName + "&parentId=" + id));
				}
			}
		},
		clickItem(index, id, amount) {
			var _this = this;
			_this.mobileItem.index = index;
			_this.mobileItem.id = id;
			_this.mobileItem.amount = amount;
		},
		clickFlowItem(index, id, amount) {
			var _this = this;
			_this.flowItem.index = index;
			_this.flowItem.id = id;
			_this.flowItem.amount = amount;
		},
		clickGameItem(index, id, desc, amount) {
			var _this = this;
			_this.gameItem.index = index;
			_this.gameItem.id = id;
			_this.gameItem.desc = desc;
			_this.gameItem.amount = amount;
		},
		clickGasItem(index, id, desc, amount) {
			var _this = this;
			_this.gasItem.index = index;
			_this.gasItem.id = id;
			_this.gasItem.desc = desc;
			_this.gasItem.amount = amount;
		},
		buyBill() {
			var _this = this;
			if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
				LF.window.openWindow("/app/login.html", "_self");
			} else {
				if (_this.billForm.phone == '') {
					Message({
						type: 'warning',
						message: "请输入手机号码！"
					});
					return;
				} else {
					if ((/^[1-9]\d{6,7}$/.test(_this.billForm.phone)) || (/^1[34578]\d{9}$/.test(_this.billForm.phone))) {

					} else {
						Message({
							type: 'warning',
							message: "请输入正确的手机号码！"
						});
						return;
					}
				}
				LF.net.getJSON("/recharge/mobile/createBill", {
					amount: _this.mobileItem.amount,
					mobileNo: _this.billForm.phone
				}, res => {
					if (res.code == "000") {
						//_this.payVisible = true;
						Message({
							type: "success",
							message: "下单成功,正在跳转支付页面...",
							onClose: function() {
								_this.mobileVisible = false;
								LF.window.openWindow("shopping/rechargePayCost.html?recordNo=" + res.data.recordNo + "&amount=" + res.data.totalAmount + "&isPayPassword=1");
							}
						});
					} else {
						Message({
							type: 'warning',
							message: "购买失败！"
						});
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			}
		},
		buyFlow() {
			var _this = this;
			if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
				LF.window.openWindow("/app/login.html", "_self");
			} else {
				if (_this.flowForm.phone == '') {
					Message({
						type: 'warning',
						message: "请输入手机号码！"
					});
					return;
				} else {
					if ((/^[1-9]\d{6,7}$/.test(_this.flowForm.phone)) || (/^1[34578]\d{9}$/.test(_this.flowForm.phone))) {

					} else {
						Message({
							type: 'warning',
							message: "请输入正确的手机号码！"
						});
						return;
					}
				}
				LF.net.getJSON("/recharge/flow/createBill", {
					flow: _this.flowItem.amount,
					adviceprice: '100',
					mobileNo: _this.flowForm.phone
				}, res => {
					if (res.code == "000") {
						//_this.payVisible = true;
						Message({
							type: "success",
							message: "下单成功,正在跳转支付页面...",
							onClose: function() {
								_this.mobileVisible = false;
								LF.window.openWindow("shopping/rechargePayCost.html?recordNo=" + res.data.recordNo + "&amount=" + res.data.totalAmount + "&isPayPassword=1");
							}
						});
					} else {
						Message({
							type: 'warning',
							message: "购买失败！"
						});
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			}
		},
		buyGame() {
			var _this = this;
			if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
				LF.window.openWindow("/app/login.html", "_self");
			} else {
				if (_this.gameForm.account == '') {
					Message({
						type: 'warning',
						message: "请输入游戏账号！"
					});
					return;
				}
				LF.net.getJSON("/recharge/game/createBill", {
					itemId: _this.gameItem.id,
					itemNum: 1,
					rechargeAccount: _this.gameForm.account
				}, res => {
					if (res.code == "000") {
						//_this.payVisible = true;
						Message({
							type: "success",
							message: "下单成功,正在跳转支付页面...",
							onClose: function() {
								_this.mobileVisible = false;
								LF.window.openWindow("shopping/rechargePayCost.html?recordNo=" + res.data.recordNo + "&amount=" + res.data.totalAmount + "&isPayPassword=1");
							}
						});
					} else {
						Message({
							type: 'warning',
							message: "购买失败,请检查账号是否正确！"
						});
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			}
		},
		buyGas() {
			var _this = this;
			if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
				LF.window.openWindow("/app/login.html", "_self");
			} else {
				if (_this.gasForm.mobileNo == '') {
					Message({
						type: 'warning',
						message: "请输入持卡人手机号！"
					});
					return;
				}
				if (_this.gasForm.gasCardName == '') {
					Message({
						type: 'warning',
						message: "请输入持卡人姓名！"
					});
					return;
				}
				if (_this.gasForm.gasCardNo == '') {
					Message({
						type: 'warning',
						message: "请输入持卡人卡号！"
					});
					return;
				}
				LF.net.getJSON("/recharge/gas/createBill", {
					itemId: _this.gasItem.id,
					mobileNo: _this.gasForm.mobileNo,
					gasCardNo: _this.gasForm.gasCardNo,
					gasCardName: _this.gasForm.gasCardName
				}, res => {
					if (res.code == "000") {
						//_this.payVisible = true;
						Message({
							type: "success",
							message: "下单成功,正在跳转支付页面...",
							onClose: function() {
								_this.mobileVisible = false;
								LF.window.openWindow("shopping/rechargePayCost.html?recordNo=" + res.data.recordNo + "&amount=" + res.data.totalAmount + "&isPayPassword=1");
							}
						});
					} else {
						Message({
							type: 'warning',
							message: "购买失败,请检查账号是否正确！"
						});
					}

				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			}
		},
		goByGoodId(id) {
			LF.window.openWindow("store/storedetails.html?goodsId=" + id);
			//			LF.window.openWindow("http://www.baidu.com");
		},
		categoryLiOn(category, event) {

			if (category) {
				this.categoryOn = category.structureNo;
				this.oldCategoryOn = category.structureNo;
				this.chooseCategoryList = category.childList;
			} else {
				this.categoryOn = this.oldCategoryOn;
			}
			//			this.categoryLiShow = true;
		},
		categoryLiOff(event) {

			//console.log("categoryLiOff");

			this.categoryLiShow = false;
			this.categoryOn = "";
		},
		czckLiOn(czck) {
			czck.butShow = true;
		},
		czckLiOff(czck) {
			czck.butShow = false;
		},
		getCategoryDetal() {
			var structureNo = this.categoryList[0].structureNo;
			LF.net.getJSON("/goods/listByMain", {
				structureNo: structureNo,
				pageSize: 100,
				merchantId: ""
			}, res => {
				if (res.code = "000") {
					this.categoryDetalList = res.data.goodsList;
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		changeZB(type) {
			var isE = false;
			this.zbactive = type;
			switch (type) {
				case "hot":
					if (this.rmpdList.length > 0) {
						this.pdList = this.rmpdList;
						isE = true;
					}
					break;
				case "luggage":
					if (this.xbpdList.length > 0) {
						this.pdList = this.xbpdList;
						isE = true;
					}
					break;
				case "life":
					if (this.zbpdList.length > 0) {
						this.pdList = this.zbpdList;
						isE = true;
					}
					break;
				case "clothing":
					if (this.fzpdList.length > 0) {
						this.pdList = this.fzpdList;
						isE = true;
					}
					break;
				default:
					console.log("error");
					break;
			}
			if (!isE) {
				LF.net.getJSON("/goods/channel/list", {
					alias: type,
					pageSize: 8
				}, res => {
					if (res.code == "000") {
						this.pdList = res.data.goodsList;
						switch (type) {
							case "hot":
								this.rmpdList = res.data.goodsList;
								break;
							case "luggage":
								this.xbpdList = res.data.goodsList;
								break;
							case "life":
								this.zbpdList = res.data.goodsList;
								break;
							case "clothing":
								this.fzpdList = res.data.goodsList;
								break;
							default:
								break;
						}
					}
				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			}
		},
		doSearch() {
			if (this.searchStr == '') {
				Message({
					type: 'warning',
					message: '请输入门牌号'
				});
				return;
			}

			LF.net.getJSON("/store/data/details", {
				houseNumber: this.searchStr
			}, res => {
				if (res.code == "000") {
					let storeId = res.data.id;
					if (storeId == '') {
						Message({
							type: 'warning',
							message: '未找到对应的实体店，请重新输入！'
						});
						return;
					}
					LF.window.openWindow("/app/pages/store/storeshop.html?houseNumber=" + this.searchStr + "&merchantId=" + storeId);
				} else {
					Message({
						type: 'warning',
						message: '未找到对应的实体店，请重新输入！'
					});
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		closeService() {
			var mapEle = document.getElementById("Map");
			var parentEle = mapEle.parentNode;
			parentEle.style.display = "none";
		},
		onlineSale() {
			LF.net.getJSON("sys/after/sale", {}, function(res) {
				var href = "";
				if (res.code === '000') {
					//href = "http://wpa.qq.com/msgrd?v=3&uin="+res.data.qq+"&site=qq&menu=yes";
					href = "tencent://message/?uin=" + res.data.qq + "&Site=qq&Menu=yes"
					window.open(href);
				} else {
					console.log(res.errorMessage);
				}
			});
		},
		initS(num) {
			var numpic = num - 1;
			var nownow = 0;
			var inout = 0;
			var TT = 0;
			var SPEED = 5000;


			$('#slides li').eq(0).siblings('li').css({
				'display': 'none'
			});


			var ulstart = '<ul id="pagination">',
				ulcontent = '',
				ulend = '</ul>';
			ADDLI();
			var pagination = $('#pagination li');
			var paginationwidth = $('#pagination').width();
			pagination.eq(0).addClass('current')

			function ADDLI() {
				//var lilicount = numpic + 1;
				for (var i = 0; i <= numpic; i++) {
					ulcontent += '<li>' + '<a href="#">' + (i + 1) + '</a>' + '</li>';
				}

				$('#slides').after(ulstart + ulcontent + ulend);
			}

			pagination.on('click', DOTCHANGE)

			function DOTCHANGE() {

				var changenow = $(this).index();

				$('#slides li').eq(nownow).css('z-index', '9');
				$('#slides li').eq(changenow).css({
					'z-index': '8'
				}).show();
				pagination.eq(changenow).addClass('current').siblings('li').removeClass('current');
				$('#slides li').eq(nownow).fadeOut(400, function() {
					$('#slides li').eq(changenow).fadeIn(500);
				});
				nownow = changenow;
			}

			pagination.mouseenter(function() {
				inout = 1;
			})

			pagination.mouseleave(function() {
				inout = 0;
			})

			function GOGO() {

				var NN = nownow + 1;

				if (inout == 1) {} else {
					if (nownow < numpic) {
						$('#slides li').eq(nownow).css('z-index', '9');
						$('#slides li').eq(NN).css({
							'z-index': '8'
						}).show();
						pagination.eq(NN).addClass('current').siblings('li').removeClass('current');
						$('#slides li').eq(nownow).fadeOut(400, function() {
							$('#slides li').eq(NN).fadeIn(500);
						});
						nownow += 1;

					} else {
						NN = 0;
						$('#slides li').eq(nownow).css('z-index', '9');
						$('#slides li').eq(NN).stop(true, true).css({
							'z-index': '8'
						}).show();
						$('#slides li').eq(nownow).fadeOut(400, function() {
							$('#slides li').eq(0).fadeIn(500);
						});
						pagination.eq(NN).addClass('current').siblings('li').removeClass('current');

						nownow = 0;

					}
				}
				TT = setTimeout(GOGO, SPEED);
			}

			TT = setTimeout(GOGO, SPEED);
		}
	},
	/**
	 * vue有几个生命周期钩子，可以相当于理解jquery的ready方法。
	 * 比如我们需要加载个页面初始化一些数据，可以根据情况放在beforeMount，或者mounted中，区别是一个是在DOM元素挂载之前，一个是挂载完成
	 * 一般可以选择mounted
	 */
	/*
	 * 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
	 */
	beforeMount() {
		console.log("beforeMount");
	},
	/*
	 *组件挂在完成响应
	 */
	mounted() {
		console.log("mounted");
		LF.cookie.del("redId");
		//		return;
		//初始广告数据
		console.log("初始广告数据");

		LF.net.getJSON("/mkt/advert/list", {
			adType: 1,
			pageSize: 100,
			merchantId: ""
		}, res => {
			if (res.code == "000") {				console.log(res.data,'广告数据')
				this.advertList = res.data.advertList;
				this.initS(this.advertList.length);
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});

		LF.net.getJSON("/mkt/advert/list", {
			adType: 2,
			pageSize: 2,
			merchantId: ""
		}, res => {
			if (res.code == "000") {
				this.advertList2 = res.data.advertList;
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});

		LF.net.getJSON("/mkt/advert/list", {
			adType: 101,
			pageSize: 1,
			merchantId: ""
		}, res => {
			if (res.code == "000") {							
				this.advertList101 = res.data.advertList;	console.log(this.advertList101,101)
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
		LF.net.getJSON("/mkt/advert/list", {
			adType: 102,
			pageSize: 1,
			merchantId: ""
		}, res => {
			if (res.code == "000") {
				this.advertList102 = res.data.advertList;	console.log(this.advertList102,102)
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
		LF.net.getJSON("/mkt/advert/list", {
			adType: 103,
			pageSize: 1,
			merchantId: ""
		}, res => {
			if (res.code == "000") {							
				this.advertList103 = res.data.advertList;	console.log(this.advertList103,103)
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
		LF.net.getJSON("/mkt/advert/list", {
			adType: 104,
			pageSize: 1,
			merchantId: ""
		}, res => {
			if (res.code == "000") {	console.log(44444444444444,res.data)						
				this.advertList104 = res.data.advertList;	console.log(this.advertList104,104)
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
		LF.net.getJSON("/mkt/advert/list", {
			adType: 105,
			pageSize: 1,
			merchantId: ""
		}, res => {
			if (res.code == "000") {							
				this.advertList105 = res.data.advertList;	console.log(this.advertList105,105)
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
		LF.net.getJSON("/mkt/advert/list", {
			adType: 106,
			pageSize: 1,
			merchantId: ""
		}, res => {
			if (res.code == "000") {
				this.advertList106 = res.data.advertList;	console.log(this.advertList106,106)
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});

		console.log("初始化分类数据");
		//初始化分类数据
		LF.net.getJSON("/goods/category/list", {}, res => {
			if (res.code == "000") {				console.log(res.data, 123456,'商品分类列表');										
				this.categoryList = res.data.categoryList;
				for (var i = 0; i < this.categoryList.length; i++) {
					if (i == 0) {
						this.categoryList[i].top = "-10px";
					} else {						
						this.categoryList[i].top = (-10 + (-43 * i)) + "px";
					}
				}
				this.getCategoryDetal();
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});


		console.log("初始推荐数据");
		//初始推荐数据
		LF.net.getJSON("/goods/channel/list", {
			alias: "recommend",
			pageSize: 6
		}, res => {
			if (res.code == "000") {				console.log(res.data, res.data.channelName);
				this.recommendGoods = res.data.goodsList;
				this.recommendChannelName = res.data.channelName;				
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});


		console.log("今日特价");
		//初始推荐数据
		LF.net.getJSON("/goods/channel/list", {
			alias: "bargain_day",
			pageSize: 6
		}, res => {
			if (res.code == "000") {				console.log(res.data, res.data.channelName)
				res.data.goodsList.forEach(function(v, i) {
					v.butShow = false;
				});
				this.czckList = res.data.goodsList;
				this.czckChannelName = res.data.channelName;				
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
		//


		console.log("热卖");
		//初始推荐数据
		LF.net.getJSON("/goods/channel/list", {
			alias: "hot",
			pageSize: 10
		}, res => {
			if (res.code == "000") {				console.log( res.data,res.data.channelName)			
				this.rmpdList = res.data.goodsList;
				this.rmpdChannelName = res.data.channelName;				
				this.rmURL = res.data.channelImg;
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});


		console.log("热销");
		//初始推荐数据
		LF.net.getJSON("/goods/channel/list", {
			alias: "hot1",
			pageSize: 10
		}, res => {
			if (res.code == "000") {				console.log( res.data,res.data.channelName)				
				this.rmpdList1 = res.data.goodsList;
				this.rmpd1ChannelName = res.data.channelName;				
				this.rxURL = res.data.channelImg;
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});


		console.log("3C");
		//初始推荐数据
		LF.net.getJSON("/goods/channel/list", {
			alias: "hot2",
			pageSize: 10
		}, res => {
			if (res.code == "000") {				console.log(res.data, res.data.channelName);
				this.rmpdList2 = res.data.goodsList;
				this.rmpd2ChannelName = res.data.channelName;
				this.cxURL = res.data.channelImg;
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});

		//初始推荐数据
		LF.net.getJSON("/goods/channel/list", {
			alias: "overseas",
			pageSize: 10
		}, res => {
			if (res.code == "000") {				console.log(res.data, res.data.channelName);
				this.jxList1 = res.data.goodsList;
				this.jx1ChannelName = res.data.channelName;				
				this.jxURL = res.data.channelImg;
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});		

		console.log("热评产品");
		//初始推荐数据
		LF.net.getJSON("/goods/eval/hot", {
			pageSize: 5
		}, res => {
			if (res.code == "000") {				console.log(res.data,  '热评产品')
				this.rpList = res.data.list;				
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
	},
	/**
	 * 挂在自己的vue组件，命名驼峰方式
	 * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
	 */
	components: {
		LfHeader,
		LfSearch,
		LfFooter
	},
})