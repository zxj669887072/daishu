/**
 * Created by zxh on 2017/3/17 0017.
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
import hex_md5  from './../../../js/framework/md5.js';
import { Button, Select, Card, Radio, Loading, Col, Row, Carousel, CarouselItem, Pagination, Tabs, TabPane, Option,Message,MessageBox} from 'element-ui'

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
Vue.use(Radio)
Vue.use(Option)
var vue = new Vue({
    el: '#app',
    data: {
        isNullGroup:false,
        isNullData:false,
        goodsName:'',
        goodsNo:'',
        priceMin:'',
        priceMax:'',
        minSales:'',
        maxSales:'',
        shopGroupId:'',
        shopGroupDatas:[],
        pageSize:10,
        currentPage: 1,
        totalPage:0,
        totalCount:0,
        goodsList:[],
    },
    methods:{
        go(url){
            LF.window.openWindow(url);
        },
        goLogin:function(){
            if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
                LF.window.openWindow("/app/login.html","_self");
            }
        },
        goGoodsView:function (goodsId) {
            this.go("/app/pages/store/storedetails.html?goodsId="+goodsId);
        },
        findData:function () {
            LF.net.getJSON("/member/dist/store/goods/list", {tokenId:LF.cookie.get("tokenId"),goodsName:this.goodsName,goodsNo:"",priceMin:this.priceMin,priceMax:this.priceMax,minSales:this.minSales,
                maxSales:this.maxSales,shopGroupId:this.shopGroupId,pageSize:100,pageNo:1},res=>{
                if(res.code=="000") {
                    this.isNullData = false;
                    var data =res.data;                         console.log(res.data,123)
                    console.log(data.toString());
                    this.totalPage=data.totalPage;
                    this.totalCount=data.totalCount;
                    this.goodsList=data.list;
                    if(this.goodsList.length==0) {
                        this.isNullData = true;
                    }
                }
            });
        },
        clearTerm:function () {
            this.goodsName='';
            this.goodsNo='';
            this.priceMin='';
            this.priceMax='';
            this.minSales='';
            this.maxSales='';
            this.shopGroupId='';
        },
        findGroupData:function () {
            LF.net.getJSON("/merchant/shop/group/list", {tokenId:LF.cookie.get("tokenId"),userId:LF.cookie.get("userId"),pageSize:100,pageNo:1},res=>{
                if(res.code=="000") {
                    this.isNullGroup = false;
                    var data =res.data;
                    this.shopGroupDatas=data.groupList;
                    if(this.shopGroupDatas.length==0) {
                        this.isNullGroup = true;
                    }
                }
            });
        },
        delData:function (goodsId) {

			 MessageBox.confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
		    }).then(() => {
	            LF.net.getJSON("/member/dist/goods/del", {tokenId:LF.cookie.get("tokenId"),goodsId:goodsId},res=>{
                if(res.code=="000") {
                   this.findData();
                }
                else {
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
                }
            });
		    })
        },
        currentChange(value) {
            if(this.currentPage != value) {
                this.currentPage = value;
                this.findData();
            }
        },
        sizeChange(value) {
            this.pageSize = value;
            this.currentPage = 1;
            this.findData();
        },
        choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 6) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555"; 
        	}
        },
    },
    /*
     *组件挂在完成响应
     */
    mounted(){
        this.goLogin();
        // this.choose();
        this.findGroupData();
        this.findData();
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})