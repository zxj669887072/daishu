import LF from 'LF';
import Vue from 'vue'
//引入公共的header和footer
import LfHeader from '.././../../components/header_new.vue';
import LfFooter from '.././../../components/footer.vue';
import { Button, Select, Card, Loading, Col, Row, Rate, Progress, Carousel, CarouselItem, Pagination, Tag } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Rate)
Vue.use(Progress)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tag)

new Vue({
	el: '#app',
	data: {
		user_id: "",
		user_name: "",
		vip_flag: false,
		messageCount: 0,
		shopsCount: 0,
		fullscreenLoading: false,
		loading2: true,
		storeInfo: {},
		structureList: [],
		advertList: [],
		hasFollowStore: false,
		goodsList: [],
		pageSize: 8,
		currentPage: 1,
		totalCount: 0,
		merchantId: '',
		signInEnable: false,
		itemtops: [],
		flag: 0,
		searchStr: '',
		houseNumber:''
	},
	methods: {		
		openFullScreen() {
			this.fullscreenLoading = true;
			setTimeout(() => {
				this.fullscreenLoading = false;
			}, 3000);
		},
		// getStoreInfo(houseNumber,merchantId) {
		getStoreInfo(merchantId) {			 
			var urlParam = LF.window.getParams();
			console.log(JSON.stringify(urlParam));
			// var params = { "houseNumber": houseNumber,"merchantId": merchantId };
			var params = {"merchantId": merchantId };
			var url = "/store/data/details";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.storeInfo = res.data;			
					this.houseNumber = res.data.houseNumber;console.log(res.data,123,this.houseNumber)
					document.title=res.data.shopName+'—袋鼠集市';
					if(res.data.signInEnable) {
						//this.getSignOnStatus();
					}
					this.getFollowStoreStatus();
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		getStructureList() {
			var params = { "merchantId": this.merchantId,"goodsStatus":2, "pageSize": 100, "pageNo": 1 };
			var url = "/merchant/shop/group/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					//先把分类下的商品占好位
					res.data.groupList.forEach(v => {
						v.goodsList = [];
					});
					this.structureList = res.data.groupList;			console.log(this.structureList,66988)
					this.getGoodsList();
					var _this = this;
					/*
					 * 需要等待dom渲染完毕之后再处理，不然可能取得null
					 */
					Vue.nextTick(function() {
						var cEl = _this.$el.querySelectorAll(".content");
						console.log(cEl);
						cEl = [].slice.call(cEl);
						var index = 0;
						var obj = null;
						/*
						 * 获取每个节点的top值
						 */
						cEl.forEach(function(v) {
							var obj = new Object();
							obj.id = index;
							obj.top = _this.getElementTop(v);
							obj.height = _this.getElementHeight(v);
							_this.itemtops.push(obj);
							index++;
						});
						console.log(_this.itemtops);
						//获取滚动Y值，然后通过判定，是否需要改变flag来变更li的class
						var y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
						_this.flag = _this.getFlag(y);
			
					});
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		getGoodsList() {
			for(let i = 0; i < this.structureList.length; i++) {
				var params = { "merchantId": this.merchantId, "shopGroupId": this.structureList[i].id,"goodsStatus":2, "pageNo": this.currentPage, "pageSize": this.pageSize };
				var url = "/merchant/goods/list";
				let index = i;
				LF.net.getJSON(url, params, res => {
					if(res.code == "000") {
						this.$set(this.structureList[i], "goodsList", res.data.goodsList);
					}
					
				}, function(xhr, type, errorThrown) {
					console.log("error：" + type);
					console.log("errorThrown：" + errorThrown);
				});
			}
		},
		sizeChange(value) {
			this.pageSize = value;
			this.currentPage = 1;
			this.getGoodsList();
		},
		currentChange(value) {
			if(this.currentPage != value) {
				this.currentPage = value;
				this.getGoodsList();
			}
		},
		getAdvertList() {
			var params = { "merchantId": this.merchantId };
			var url = "/merchant/advert/list";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.advertList = res.data.list;console.log(this.advertList,1008)
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		getFollowStoreStatus() {
			var params = { "storeId": this.storeInfo.id, "account": LF.cookie.get("account"), "type": 1 };
			var url = "/store/operate/status";
			LF.net.getJSON(url, params, res => {				
				if(res.code == "000") {
					this.hasFollowStore = res.data.status > 0 ? true : false;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});

		},
		getSignOnStatus() {
			var params = { "storeId": this.storeInfo.id, "account": LF.cookie.get("account"), "type": 2 };
			var url = "/store/operate/status";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.hasSignOn = res.data.status > 0 ? true : false;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});

		},
		signOn() {
			LF.window.checkLogin();
			var params = { "storeId": this.storeInfo.id, "account": LF.cookie.get("account") };
			var url = "/store/operate/sign";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.hasSignOn = true;
				} else {
					this.hasSignOn = false;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		followStore() {
			LF.window.checkLogin();
			var params = { "storeId": this.storeInfo.id, "account": LF.cookie.get("account"), "operateType": this.hasFollowStore ? 0 : 1 };
			var url = "/store/operate/follow";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					if(this.hasFollowStore) {
						this.hasFollowStore = false;
					} else {
						this.hasFollowStore = true;
					}
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		goDetail(goodsId) {
			LF.window.openWindow("storedetails.html?goodsId=" + goodsId);
		},
		goBylogin(url) {
			LF.window.openWindow(url, "_self", true);
		},
		goByloginBlank(url) {
			LF.window.openWindow(url, "_blank", true);
		},
		logout: function() {
			LF.cookie.del("account");
			LF.cookie.del("userId");
			LF.cookie.del("userName");
			LF.cookie.del("tokenId");
			LF.window.openWindow("/app/index.html", "_self");
			return;
		},
		getBubble: function() {
			var self = this;
			LF.net.getJSON("/integral/heaher/bubble/num", { tokenId: LF.cookie.get("tokenId") }, function(res) {
				if(res.code === '000') {
					self.messageCount = res.data.msgNum;
					self.shopsCount = res.data.shopCartNum;
				} else {
					console.log(res.errorMessage);
				}
			})
		},
		getElementTop: function(element) {　　　　
			var top = 0;
			while(element) {
				top += element.offsetTop;
				element = element.offsetParent;
			}　　　　
			return top;
		},
		getElementHeight: function(element) {　　　　 var h = element.clientHeight;　　　　 return h;　　 },
		handleScroll: function() {

			var y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
			this.flag = this.getFlag(y);
			//					
		},
		getFlag: function(y) {
			var r = 0;
			var l = this.itemtops.length;
			var value = 0;
			var hjs = 0;
			//找到区间
			for(var i = 0; i < l; i++) {
				value = this.itemtops[i].top;
				hjs = this.itemtops[i].height / 2;
				if(i == 0) {
					if(y >= value && y < (Number(value) + Number(hjs))) {
						r = this.itemtops[i].id;
						break;
					}
				} else if(i == (l - 1)) {
					if(y >= (Number(value) - Number(hjs))) {
						r = this.itemtops[i].id;
						break;
					}
				} else {
					if(y >= (Number(value) - Number(hjs)) && y < (Number(value) + Number(hjs))) {
						r = this.itemtops[i].id;
						break;
					}
				}
			}
			return r;
		},
		goMore(groupId, groupName){
			var urlParam = LF.window.getParams();
			let url = '/app/pages/store/list.html?merchantId=' + this.merchantId + '&houseNumber='+ urlParam.houseNumber +'&shopGroupId=' + groupId + '&groupName=' + encodeURIComponent(groupName);
			
			LF.window.openWindow(url, "_blank");
		},
		doSearch(){
			var urlParam = LF.window.getParams();
			let url = '/app/pages/store/list.html?merchantId=' + this.merchantId + '&houseNumber='+ urlParam.houseNumber +'&shopGroupId=&groupName=' + encodeURIComponent('筛选结果') + '&searchStr=' + this.searchStr;
			
			LF.window.openWindow(url, "_blank");
		},
		onlineSale(){
        			LF.net.getJSON("sys/after/sale", {}, function(res) {
            				var href="";
           				if(res.code==='000'){                    
                    				href="tencent://message/?uin="+res.data.qq+"&Site=qq&Menu=yes"
                    				window.open(href);
                			}else{
                   				console.log(res.errorMessage);
               			}
           			});
    		}, 
	},
	mounted() {		 
		var urlParam = LF.window.getParams();
		this.merchantId = urlParam.merchantId;
		// this.getStoreInfo(urlParam.houseNumber,this.merchantId);
		this.getStoreInfo(this.merchantId);
		this.getStructureList();
		this.getAdvertList();

		
		window.addEventListener('scroll', this.handleScroll);

	},
	/**
	 * 挂在自己的vue组件，命名驼峰方式
	 * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
	 */
	components: {
		LfHeader,
		LfFooter
	}
})