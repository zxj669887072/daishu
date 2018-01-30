import LF from 'LF';
import Vue from 'vue'
//引入公共的header和footer
import LfHeader from './../../components/header_new.vue';
import LfFooter from './../../components/footer.vue';
import LfSearch from './../../components/search.vue';
import {
	Button,
	Select,
	Card,
	Loading,
	Col,
	Row,
	Rate,
	Progress,
	Carousel,
	CarouselItem,
	Pagination,
	Tag,
	Message
} from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.use(Card);
Vue.use(Loading);
Vue.use(Col);
Vue.use(Row);
Vue.use(Rate);
Vue.use(Progress);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Pagination);
Vue.use(Tag);
new Vue({
	el: '#app',
	data: {
		fullscreenLoading: false,
		loading2: true,
		price: true,
		brand: true,
		currentBandName: "",
		//currentPrice:"",
		goodsList: [],
		searchList: [],
		brandList: [],
		pageSize: 20,
		currentPage: 1,
		totalPage: 0,
		totalCount: 0,
		categoryList: [],
		merchantId: '',
		structureNo: '',
		structureName: '',
		parentStructureNo: '',
		parentStructureName: '',
		rootStructureNo: '',
		rootStructureName: '',
		brandId: '',
		priceRange: '',
		minPrice: '',
		maxPrice: '',
		childstructureName: '',
		structurename: '',
		strucname: '',
		OrderByEva:0,
		orderByPrice:0,
		priceFlag:false,
		productLoading:false,
		current:false,
		parentId:0,
		searchStr:'',
		classfiyData:{}
	},
	methods: {
		openFullScreen() {
			this.fullscreenLoading = true;
			setTimeout(() => {
				this.fullscreenLoading = false;
			}, 3000);
		},
		//清除品牌搜索
		clearBrand() {
			this.brandId = "";
			this.brand = true;
			this.getSearchList();
		},
		//清除价格搜索
		clearPrice() {
			this.priceRange = "";
			this.price = true;
			this.getSearchList();
		},
		//清除筛选
		clearChoose() {
			this.brand = true;
			this.price = true;
			this.brandId = "";
			this.priceRange = "";
			this.getSearchList();
		},
		//品牌搜索
		brandSearch(brandId, brand) {
			this.brand = false;
			this.currentPage = 1;
			this.brandId = brandId;
			if (brand) {
				this.currentBandName = brand.brandZh + (brand.brandEn !== '' ? '(' + brand.brandEn + ')' : '');
			} else {
				this.currentBandName = "";
			}
			this.getSearchList();
		},
		//价格搜索
		priceSearch(value) {
			if (value) {
				this.priceRange = value;
			} else {
				if (this.minPrice == '' && this.maxPrice == '') {
					Message({
						type: 'info',
						message: "请输入价格范围"
					});
					return;
				}
				this.priceRange = this.minPrice + '-' + this.maxPrice;
			}
			this.price = false;
			this.currentPage = 1;
			this.getSearchList();
			setTimeout(function() {
				// document.getElementById('price').innerHTML = '价格：'+value + '<img @click="clearBrand" src="../../../images/recharge_03.jpg" alt="">' ;
			}, 0)
		},
		//获取商品列表
		getGoodsList(pageSize) {
			var params = {
				"merchantId": this.merchantId,
				"structureNo": this.structureNo,
				"pageSize": pageSize
			};
			var url = "/goods/recommend/list";
			LF.net.getJSON(url, params, res => {
				this.goodsList = res.data.goodsList;
				console.log(this.goodsList, res.data, 123654789)
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		getClassfiy:function(parentId){
			var url = "goods/category/listByParentId";
			LF.net.getJSON(url, {"parentId":this.parentId}, res => {
				if(res.code == '000'){
					this.classfiyData = res.data.categoryList;
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		searchClassfiy:function(structNo,strcutName){
			var obj = {"structureNo":structNo};
			this.childstructureName = strcutName;
			this.structureNo = structNo;
			this.getSearchList(obj);
		},
		//获取品牌列表
		getBrandList(pageSize, pageNo) {
			var params = {
				"merchantId": this.merchantId,
				"structureNo": this.structureNo,
				"pageNo": pageNo,
				"pageSize": pageSize
			};
			var url = "/goods/brand/list";
			LF.net.getJSON(url, params, res => {
				this.brandList = res.data.brandList;
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},

		getSearchList(obj) {
			var params = {
				"merchantId": this.merchantId,
				"structureNo": this.structureNo,
				"searchStr": this.searchStr,
				"brandId": this.brandId,
				"priceRange": this.priceRange,
				"pageNo": this.currentPage,
				"pageSize": this.pageSize
			};
			if(LF.util.isObject(obj)){
				LF.util.extend(params,obj);
			}
			var url = "/goods/sreach/list";
			this.productLoading = true;
			LF.net.getJSON(url, params, res => {
				this.productLoading = false;
				this.searchList = res.data.goodsList;
				this.totalPage = res.data.totalPage;
				this.totalCount = res.data.totalCount;
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		sortEva:function(s){
			this.OrderByEva = s;
			this.getSearchList({'OrderByEva':this.OrderByEva});
			this.orderByPrice = 0;
		},
		sortPrice:function(s){
			if(this.priceFlag){
				this.orderByPrice = 1;
			}else{
				this.orderByPrice = 2;
			}
			this.getSearchList({'orderByPrice':this.orderByPrice});
			this.priceFlag = !this.priceFlag;
			this.OrderByEva = 0;
		},
		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
				this.getSearchList();
			}
		},
		nextPage() {
			if (this.currentPage < this.totalPage) {
				this.currentPage++;
				this.getSearchList();
			}
		},
		sizeChange(value) {
			this.pageSize = value;
			this.currentPage = 1;
			this.getSearchList();
		},
		currentChange(value) {
			if (this.currentPage != value) {
				this.currentPage = value;
				this.getSearchList();
			}
		},
		doSearch() {
			this.currentPage = 1;
			this.getSearchList();
		},

		goDetail(goodsId) {
			LF.window.openWindow("store/storedetails.html?goodsId=" + goodsId);
		},
	},
	beforeMount() {
		console.log("beforeMount");
	},
	mounted() {
		var urlParam = LF.window.getParams();
		this.structureNo = urlParam.structureNo;
		this.strucname = decodeURI(urlParam.structureName);
		this.parentId = decodeURI(urlParam.parentId);
		this.childstructureName = decodeURI(urlParam.childstructureName);
		this.merchantId = urlParam.merchantId ? urlParam.merchantId : '';
		console.log(this.strucname, this.childstructureName)
		console.log("初始化分类数据");
		//初始化分类数据
		LF.net.getJSON("/goods/category/list", {}, res => {
			if (res.code == "000") {
				console.log(res.data, 123456);
				this.categoryList = res.data.categoryList;
				outerloop:
					for (let i = 0; i < this.categoryList.length; i++) {
						let rootCategorys = this.categoryList[i].childList;
						for (let m = 0; m < rootCategorys.length; m++) {
							let parentCategorys = rootCategorys[m].childList;
							for (let n = 0; n < parentCategorys.length; n++) {
								let leafCategory = parentCategorys[n];
								if (leafCategory.structureNo === urlParam.structureNo) {
									this.structureName = leafCategory.structureName;
									this.parentStructureNo = rootCategorys[m].structureNo;
									this.parentStructureName = rootCategorys[m].structureName;
									this.rootStructureNo = this.categoryList[i].structureNo;
									this.rootStructureName = this.categoryList[i].structureName;
									break outerloop;
								}
							};
						};
					};
			}
		}, res => {
			console.log("error：" + JSON.stringify(res));
		});
		this.getClassfiy();
		this.getBrandList(12, 1);
		this.getGoodsList(6);
		this.getSearchList();
	},
/**
 * 挂在自己的vue组件，命名驼峰方式
 * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
 */
	components: {
		LfHeader,
		LfSearch,
		LfFooter
	}
});