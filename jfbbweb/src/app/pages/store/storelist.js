//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHeader from '../../../components/header_new.vue';
import LfSearch from '../../../components/search.vue';
import LfFooter from '../../../components/footer.vue';
import { Button, Select, Card, Loading,Col,Row,Carousel,CarouselItem,Pagination,Tabs,TabPane,Message} from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)

new Vue({
	el: '#app',
	data: {
		activeName:'store-car',
		searchStr:'',
		classifyList:[],
		classfyRight:[],
		classifyName:'',
		loading:false,
		//搜索门牌号
		searchStr: '',
		advertList:[]
	},
	methods: {
		go(url){
    		LF.window.openWindow(url,"_self");
    	},
    	doSearch(){
                    if (this.searchStr == ''){
                          Message({
                                      type: 'warning',
                                      message:"请输入门牌号！"
                          });
                        return;
                    };

                    LF.net.getJSON("/store/data/details", { houseNumber:this.searchStr }, res => {
                        if(res.code == "000") {
                            let storeId = res.data.id;
                            if (storeId == ''){
                                Message({
                                    type: 'warning',
                                    message:"未找到对应的实体店，请重新输入！"
                                });
                                return;
                            }
                            LF.window.openWindow("/app/pages/store/storeshop.html?houseNumber="+this.searchStr + "&merchantId=" + storeId,"_self");
                        } else {
                            Message({
                                type: 'warning',
                                message:"未找到对应的实体店，请重新输入！"
                            });
                        }
                    }, res => {
                        Message({
                            type: 'error',
                            message:res.errorMessage
                        });
                        console.log("error：" + JSON.stringify(res));
                    });
            },
    	listByClassify(classify){
    		this.loading = true;
    		this.classifyName = classify.classifyName;
    		LF.net.getJSON("/store/listByClassify", {classifyNo:classify.classifyNo},res=>{
                this.loading = false;
	    		if(res.code=="000"){
					this.classfyRight = res.data.classifyStoreList;                    console.log(this.classfyRight);
				}
			}, res=>{
                this.loading = false;
				console.log("error：" + JSON.stringify(res));
			});
	    },
	    goStoreShop(houseNumber, merchantId){
	      this.go("storeshop.html?houseNumber="+houseNumber+"&merchantId="+merchantId);
	    },
		doSearch(){
			if (this.searchStr == ''){
                Message({
                    type: 'warning',
                    message:"请输入门牌号！"
                });
				return;
			}
			
			LF.net.getJSON("/store/data/details", { houseNumber: this.searchStr }, res => {
				if(res.code == "000") {
					let storeId = res.data.id;
					if (storeId == ''){
                        Message({
                            type: 'warning',
                            message:"未找到对应的实体店，请重新输入！"
                        });
						return;
					}
					LF.window.openWindow("storeshop.html?houseNumber="+this.searchStr + "&merchantId=" + storeId);
				} else {
                    Message({
                        type: 'warning',
                        message:"未找到对应的实体店，请重新输入！"
                    });
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		adverFun:function(){
			LF.net.getJSON("/mkt/advert/list", { adType: 1, pageSize: 100, merchantId: "" }, res => {
			if(res.code == "000") {
				this.advertList = res.data.advertList;
			}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		}
	},
	/*
     *组件挂在完成响应
     */
    mounted(){
    	var that = this;
    	LF.net.getJSON("/store/classify/list", {},res=>{
    		if(res.code=="000"){
				this.classifyList = res.data.classifyList;
				if(this.classifyList.length>0){
                    this.listByClassify(res.data.classifyList[0]);
				}
			}
		}, res=>{
			console.log("error：" + JSON.stringify(res));
		});
		
		this.adverFun();
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
