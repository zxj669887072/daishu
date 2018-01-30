//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading,DatePicker,Pagination,Carousel, CarouselItem ,Message,MessageBox} from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(DatePicker);

Vue.use(Pagination);

new Vue({
	el: '#app',
	data: {
		pagerOne:{
        	                          size:10,
        	                          curpage:1,
        	                          total:0
                          },
                        pagerTwo:{
                            	size:10,
                            	curpage:1,
                            	total:0
                        },
                        pagerThree:{
                            	size:10,
                            	curpage:1,
                            	total:0
                        },
		storeeValuateList:[],
		storeeValuateListByOthers:[],
		shopMallEValuate:[],
		storeEval:true,
		shopEval:false,
		saleEval:true,
		othersEval:false,
		searchTimeOne:'',
		searchTimeTwo:'',

		saleEvalIsNull:false,
		othersEvalIsNull:false,
		shopEvalIsNull:false,
	},
	methods: {
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	search:function(){
    		var time = "";                                                                                                                    console.log('<----------------------------------------------------------------->')
    		if(this.saleEval){                                                                                                              console.log(123,'卖家的评价')
    			if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne);  console.log(time,148)                                                    
    			             this.storeeValuate('0','0',5,1,time,"","");
    		}else if(this.othersEval){                                                                                                console.log(456,'给他人的评价',this.$refs)
    			if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne); console.log(time,148)                                                   
    			             this.storeeValuate('0','1',5,1,time,"","");
    		}else if(this.shopEval){                                                                                                  console.log(789,'商户评价')
    			if(this.searchTimeTwo) time = this.getYearMonth(this.searchTimeTwo); console.log(time,148)                                                    
    			             this.storeeValuate('1','1',5,1,time,"","");
    		}
    	},
    	getYearMonth:function(dateStr){console.log(dateStr)
			var year= dateStr.getFullYear();
			var month=dateStr.getMonth()+1;
			month =(month<10 ? "0"+month:month);

			return year+"-"+month;
       	},
    	starFun:function(){
    		var time = "";
    		if(this.saleEval){
    			if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne);
    			this.storeeValuate('0','0',5,1,time,this.$refs.starOne.value,"");
    		}else if(this.othersEval){
    			if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne);
    			this.storeeValuate('0','1',5,1,time,this.$refs.starTwo.value,"");
    		}else if(this.shopEval){
    			if(this.searchTimeTwo) time = this.getYearMonth(this.searchTimeTwo);
    			this.storeeValuate('1','1',5,1,time,this.$refs.starThree.value,"");
    		}
    	},
    	pingFun:function(){
    		var time = "";
    		if(this.saleEval){
    			if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne);
    			this.storeeValuate('0','0',5,1,time,"",this.$refs.pingOne.value);
    		}else if(this.othersEval){
    			if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne);
    			this.storeeValuate('0','1',5,1,time,"",this.$refs.pingTwo.value);
    		}else if(this.shopEval){
    			if(this.searchTimeTwo) time = this.getYearMonth(this.searchTimeTwo);
    			this.storeeValuate('1','1',5,1,time,"",this.$refs.pingThree.value);
    		}
    	},
    	storeeValuate:function(storeFlag,type,pageSize,pageNo,month,evalStar,evaType){
    		var param = {};
    		if(storeFlag == '0'){
			if(type == '0') {
				param = {storeFlag:storeFlag,type:type,pageSize:this.pagerOne.size,pageNo:this.pagerOne.curpage,month:month,evalStar:evalStar,evaType:evaType};
			}else {
				param = {storeFlag:storeFlag,type:type,pageSize:this.pagerTwo.size,pageNo:this.pagerTwo.curpage,month:month,evalStar:evalStar,evaType:evaType};
			}
		} else{
			param = {storeFlag:storeFlag,type:type,pageSize:this.pagerThree.size,pageNo:this.pagerThree.curpage,month:month,evalStar:evalStar,evaType:evaType};
		}
    		LF.net.getJSON("/goods/eval/list",param ,res=>{
	    		if(res.code=="000"){                                             console.log(res,66988)
	    			if(storeFlag == '0'){
	    				if(type == '0') {
	    					this.storeeValuateList = res.data.list;
	    					this.pagerOne.total = res.data.totalCount;
	    					if(this.storeeValuateList.length > 0){
	    						this.saleEvalIsNull = false;
	    					}else{    
	    						this.saleEvalIsNull = true;
	    					}
	    				}else {
	    					this.storeeValuateListByOthers = res.data.list;
	    					this.pagerTwo.total = res.data.totalCount;
	    					if(this.storeeValuateListByOthers.length > 0){
	    						this.othersEvalIsNull = false;
	    					}else{
	    						this.othersEvalIsNull = true;
	    					}
	    				}
	    			} else{
	    				this.shopMallEValuate = res.data.list;
	    				this.pagerThree.total = res.data.totalCount;
	    				if(this.shopMallEValuate.length > 0){
	    						this.shopEvalIsNull = false;
	    					}else{
	    						this.shopEvalIsNull = true;
	    					}
	    			}

				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
        handleCurrentChangeByOne:function(val){
        	var time = "";
        	if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne);

    		this.pagerOne.curpage=val;
     		// this.storeeValuate('0','0',5,1,time,this.$refs.starOne.value,this.$refs.pingOne.value);
                          this.storeeValuate('0','0',5,1,time,"","");
    	},
    	handleCurrentChangeByTwo:function(val){
    		var time = "";
        	if(this.searchTimeOne) time = this.getYearMonth(this.searchTimeOne);

    		this.pagerTwo.curpage=val;
     		// this.storeeValuate('0','1',5,1,time,this.$refs.starTwo.value,this.$refs.pingTwo.value);
                          this.storeeValuate('0','1',5,1,time,"","");
    	},
    	handleCurrentChangeByThree:function(val){                                                      
    		var time = "";
        	if(this.searchTimeTwo) time = this.getYearMonth(this.searchTimeTwo);

    		this.pagerThree.curpage=val;                                      
     		// this.storeeValuate('1','1',5,1,time,this.$refs.starThree.value,this.$refs.pingThree.value);
                          this.storeeValuate('1','1',5,1,time,"","");
    	},
    	storeEvalFun:function(){
    		this.storeEval = true;
    		this.shopEval = false;
    		this.saleEval = true;
			this.othersEval = false;
    	},
    	shopEvalFun:function(){
			this.storeEval = false;
    		this.shopEval = true;
    		this.saleEval = false;
			this.othersEval = false;
    	},
    	saleEvalFun:function(){
    		this.saleEval = true;
			this.othersEval = false;
    	},
    	othersEvalFun:function(){
			this.saleEval = false;
			this.othersEval = true;
    	},
    	choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 9) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555";
        	}
        },
        //删除商品评价
            delAssessment(id) {

                         MessageBox.confirm('是否删除此评论?', '提示', {
                                       confirmButtonText: '确定',
                                       cancelButtonText: '取消',
                                       type: 'warning'
                          }).then(() => {
                                      var params = { "id": id };
                                      var url = "/goods/eval/del";
                                       var _this = this;
                                      LF.net.getJSON(url, params, res => {
                                                    if(res.code == "000") {
                                                                _this.storeeValuate();
                                                                location.reload();
                                                   }else{
                                                                Message({
                                                                            type: 'error',
                                                                            message:res.errorMessage
                                                                });
                                                    }
                                      }, function(xhr, type, errorThrown) {
                                                   console.log("error：" + type);
                                                    console.log("errorThrown：" + errorThrown);
                                      });
                         })

            
        },              
                        goGoodsView:function (goodsId) {                   
                                LF.window.openWindow("/app/pages/store/storedetails.html?goodsId="+goodsId,"_blank");
                        },
                        goMerchantView:function (merchantId,merchantName) {   console.log(merchantId)
                                    if (merchantName == '商城') {
                                              LF.window.openWindow("/app/pages/goods.html","_blank");
                                    } else {
                                               LF.window.openWindow("/app/pages/store/storeshop.html?merchantId="+merchantId,"_blank");
                                    }  
                                
                        },
	},
	/*
     *组件挂在完成响应
     */
    mounted(){
    	this.goLogin();
    	// this.choose();
    	this.storeeValuate('0','0',5,1,"","","");
    	this.storeeValuate('0','1',5,1,"","","");
    	this.storeeValuate('1','1',5,1,"","","");
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})