//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem } from 'element-ui';
/*
 * 使用element-ui组件
 */
 Vue.use(Loading);
 Vue.use(Card);
 Vue.use(Carousel);
 Vue.use(CarouselItem);

 new Vue({
   el: '#app',
   data:{
    willShow : false,
    num:"",
    wallet : [],
    basicInformation:[],
    incomeRecordByBuy:[],
    incomeRecordByActivity:[],
    expendRecord:[],
    isNullByBuy:false,
    isNullByActivity:false,
    isNullByRecord:false,
    incomeRecordShow:true,
    expendRecordShow:false,
    buyRecordShow:true,
    activityRecordShow:false
},
methods: {
  go(url){
      LF.window.openWindow(url);
  },
  goLogin:function(){
      if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
        LF.window.openWindow("/app/login.html","_self");
    }
},
mainPage:function(){
  LF.net.getJSON("/member/main", {tokenId:LF.cookie.get("tokenId")},res=>{
      if(res.code=="000"){
         this.basicInformation = res.data;
     }
 }, res=>{
    console.log("error：" + JSON.stringify(res));
});
},
exchange:function(){
            /*if(this.willShow){
                this.willShow=false;
            }else{
                this.willShow=true;
            }*/
            this.willShow = !this.willShow;
        },
        close:function(){
            /*if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true;
            }*/
            this.willShow = !this.willShow;
        },
        fixed:function(num,integration){
            if(num>=integration){
                return this.num = integration;
            }
            return this.num = parseFloat(num).toFixed(4);

        },
        walletShow:function(){
            LF.net.getJSON("/member/main", {tokenId:LF.cookie.get("tokenId")},res=>{
                if(res.code=="000"){
                    this.wallet = res.data;
                }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        sureExchange:function(inter){
            if (!inter || inter== 0) {
                alert("请输入正确的兑换数量");
                return this.num = "";
            } else {
                LF.net.getJSON("/member/inter2roo/exchange", {inter:inter},res=>{
                    if(res.code=="000"){
                        console.log(res);
                        // alert('兑换成功');
                        window.location.reload();
                    }
                }, res=>{
                    console.log("error：" + JSON.stringify(res));
                });
            }
        },
    	/*search:function(){
    		if(this.buyRecordShow){
    			this.integralWater(this.$refs.selectIncomeByOne.value,'5');
    		}else if(this.activityRecordShow){
    			this.integralWater(this.$refs.selectIncomeByOne.value,'4');
    		}else if(this.expendRecordShow){
    			this.integralWater(this.$refs.selectIncome.value,'2');
    		}
    	},
    	goWithdrawal(type){
			LF.window.openWindow("/app/pages/business/withdrawal_bz.html?type=" + type);
		},
    	integralWater:function(month,opType){
			LF.net.getJSON("/member/inter/list", {tokenId:LF.cookie.get("tokenId"),month:month,opType:opType},res=>{
    		if(res.code=="000"){
    			if(opType == 5){
    				this.incomeRecordByBuy = res.data.list;
    				if(this.incomeRecordByBuy.length > 0) {
    					this.isNullByBuy = false;
    				}else {
    					this.isNullByBuy = true;
    				}
    			}else if(opType == 4){
					this.incomeRecordByActivity = res.data.list;
    				if(this.incomeRecordByActivity.length > 0) {
    					this.isNullByActivity = false;
    				}else {
    					this.isNullByActivity = true;
    				}
    			}else if(opType == 2){
    				this.expendRecord = res.data.list;
    				if(this.expendRecord.length > 0) {
    					this.isNullByRecord = false;
    				}else {
    					this.isNullByRecord = true;
    				}
    			}
			}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
       },*/
       expend:function(){
          this.buyRecordShow = false;
          this.activityRecordShow = false;
          this.incomeRecordShow = false;
          this.expendRecordShow = true;
      },
      income:function(){
          this.buyRecordShow = true;
          this.activityRecordShow = false;
          this.incomeRecordShow = true;
          this.expendRecordShow = false;
      },
      buyRecord:function(){
          this.buyRecordShow = true;
          this.activityRecordShow = false;
      },
      activityRecord:function(){
          this.buyRecordShow = false;
          this.activityRecordShow = true;
      },
  },
	/*
     *组件挂在完成响应
     */
     mounted(){
      this.goLogin();
      this.mainPage();
      this.walletShow();
	/*	this.integralWater("",'5');
		this.integralWater("",'4')
		this.integralWater("",'2');*/
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})