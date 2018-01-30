//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHeader from './../components/header.vue';
import LfFooter from './../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);


/*
 * 实例化Vue实例
 * el：挂在节点，不能挂在到body上。统一规定el全部挂在到body下的唯一的根div。例子参考index.html
 * data:数据初始化，数据有响应式要求，自行查看API哪些能触发视图响应更新
 */
new Vue({
    el: '#app',
    data: {
    	//分类数据
        categoryList: [],
        //分类选择数据
        chooseCategoryList:[],
        //显示分类子界面标志
        categoryLiShow:false,
        //广告数据
        advertList:[],
        //分类详情列表，由分类数据中获取。
        categoryDetalList:[]
    },
    
    /*
     * 方法，方法卸载methods下面，在Vue实例内通过this.methodName来调用方法。
     */
    methods: {
        categoryLiOn(category,event) {
        	console.log("categoryLiOn");
        	if(category){
        		this.chooseCategoryList = category.childList;
        	}
        	this.categoryLiShow = true;
        },
        categoryLiOff(event) {
        	console.log("categoryLiOff");
    		this.categoryLiShow = false;
        },
        getCategoryDetal(){
        	var structureNo = this.categoryList[0].structureNo;
        	LF.net.getJSON("/goods/listByMain", {structureNo:structureNo,pageSize:100,merchantId:""}, res=>{
	    		if(res.code="000"){
					this.categoryDetalList = res.data.goodsList;
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
        }
    },
    /*
     * 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
     */
    beforeMount(){
    	console.log("beforeMount");
    	//初始广告数据
    	LF.net.getJSON("/mkt/advert/list", {adType:1,pageSize:100,merchantId:""}, res=>{
    		if(res.code="000"){
				this.advertList = res.data.advertList;
			}
		}, res=>{
			console.log("error：" + JSON.stringify(res));
		});
    	//初始化分类数据
    	LF.net.getJSON("/goods/category/list", {}, res=>{
    		if(res.code="000"){
    			this.categoryList = res.data.categoryList;
    			this.getCategoryDetal();
    		}
		}, res=>{
			console.log("error：" + JSON.stringify(res));
		});
		
    },
    /*
     *组件挂在完成响应 
     */
    mounted(){
    	console.log("mounted");
    },
    /**
     * 挂在自己的vue组件，命名驼峰方式
     * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
     */
    components: {
        LfHeader,
        LfFooter
    },
})
