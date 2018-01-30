import LF from 'LF';
import Vue from 'vue'
//引入公共的header和footer
import LfHeader from './../../../components/header_new.vue';
import LfFooter from './../../../components/footer.vue';
import { Button, Select, Card, Loading,Col,Row,Rate,Progress,Carousel,CarouselItem,Pagination,Tag,Message} from 'element-ui'
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
    	goodsList: [],
    	searchList: [],
		pageSize: 15,
		currentPage: 1,
		totalPage: 0,
		totalCount: 0,
		merchantId: '',
		shopGroupId: '',
		groupName: '',
		searchStr: 'aa',
		priceRange: '',
		minPrice: '',
		maxPrice: '',
		hasFollowStore: false
	},
	methods: {
		openFullScreen() {
			this.fullscreenLoading = true;
			setTimeout(() => {
				this.fullscreenLoading = false;
			}, 3000);
		},
		getStoreInfo() {
			var urlParam = LF.window.getParams();
			console.log(JSON.stringify(urlParam));
			var params = { "houseNumber": urlParam.houseNumber };
			var url = "/store/data/details";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.storeInfo = res.data;	console.log(res.data,66933)
					if(res.data.signInEnable) {
						this.getFollowStoreStatus();
						//this.getSignOnStatus();
					}
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
	    getSearchList() {
	      	var params = {"merchantId": this.merchantId, "shopGroupId": this.shopGroupId, "goodsName": this.searchStr, "pageNo": this.currentPage, "pageSize": this.pageSize };
	      	var url = "/merchant/goods/list";
	      	LF.net.getJSON(url, params, res=>{
			    this.searchList = res.data.goodsList;
				this.totalPage = res.data.totalPage;
				this.totalCount = res.data.totalCount;
	      	}, function(xhr, type, errorThrown) {
		        console.log("error：" + type);
		        console.log("errorThrown：" + errorThrown);
		    });
	    },
	    prevPage(){
	    	if (this.currentPage > 1) {
	    		this.currentPage--;
	    		this.getSearchList();
	    	}
	    },
	    nextPage(){
	    	if (this.currentPage < this.totalPage) {
	    		this.currentPage++;
	    		this.getSearchList();
	    	}
	    },
	    sizeChange(value){
	    	this.pageSize = value;
	    	this.currentPage = 1;
	    	this.getSearchList();
	    },
	    currentChange(value){
	    	if (this.currentPage != value){
		    	this.currentPage = value;
		    	this.getSearchList();
	    	}
	    },
	    goDetail(goodsId){
	    	LF.window.openWindow("storedetails.html?goodsId="+goodsId);
	    },
        doSearch(){
            this.shopGroupId = '';
            this.groupName = '筛选结果'
            this.getSearchList();
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
		}
	},
	mounted(){
		var urlParam = LF.window.getParams();
		this.searchStr = urlParam.searchStr ? decodeURI(urlParam.searchStr) : '';
		this.shopGroupId = urlParam.shopGroupId;
		this.merchantId = urlParam.merchantId;
		this.groupName = decodeURIComponent(urlParam.groupName);
		console.log("初始化分类数据");
		this.getStoreInfo();
	    this.getSearchList();
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
