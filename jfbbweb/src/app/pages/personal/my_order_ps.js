//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Rate,Form,FormItem,Input,Button,Dialog,Pagination,Carousel, CarouselItem,Message,MessageBox } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(Pagination);

Vue.use(Rate);

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)

new Vue({
	el: '#app',
	data: {
        interGoodsStat:[],
        orderLists:[],
        loading:false,
        orderListsIsNull:false,

        commentGood:false,
        formLabelWidth:'90px',
        formLabelHeight:'35px',
        commentForm:{
        	star:null,
        	commentContent:'',
        },
        isAfter:false,
        afterSale:{},
        logisticData:{},
        orderId:'',
        goodsId:'',
        orderDtlId:'',

        searchStr:'',
        orderStatus:'',
        orderStatusDesc:'',
        oldOrderStatus : '',
        pager:{
        	size:3,
        	curpage:1,
        	total:0
        },
	},
	methods: {
		go(url) {
			LF.window.openWindow(url,"_self");
		},
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	submitEvaForm:function(commentForm){
    		if(commentForm.star==null||commentForm.star==''){
                Message({
                    type: 'error',
                    message:"请选择评价星级"
                });
				return;
			}
			if(commentForm.commentContent==''||commentForm.commentContent.length<5){
                Message({
                    type: 'error',
                    message:"评价内容不能少于5个字"
                });
                return;
			}
			var formData = JSON.stringify(this.commentForm);
			var obj = JSON.parse(formData);
			obj["evaType"]=obj.star;
			obj["evaContent"]=obj.commentContent;
			//obj["orderId"]=this.orderId;
			//obj["goodsId"]=this.goodsId;
      obj['orderDtlId'] = this.orderDtlId;
			var _this=this;
			LF.net.getJSON("/goods/eval/add", obj,res=>{
				if(res.code=="000"){
					this.orderList();
				}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, res=>{
				console.log("查询失败");
			});
            this.orderId='';
            this.goodsId='';
            this.commentGood = false;
    	},
    	clickComment:function(orderId,goodsId,orderDtlId){
    		this.commentGood = true;
    		this.goodsId = goodsId;
    		this.orderId = orderId;
        this.orderDtlId = orderDtlId;
            this.commentForm.star = null;
            this.commentForm.commentContent = '';
    	},
        clickLogistic:function(shipperCode,logisticCode){
			 var _this=this;
			 LF.net.getJSON("/logistic/traces/get", {tokenId:LF.cookie.get("tokenId"),shipperCode:shipperCode,logisticCode:logisticCode},res=>{
			 if(res.code=="000"){
				 _this.logisticData=res.data;
				 }else{
                 Message({
                     type: 'error',
                     message:res.errorMessage
                 });
			 }
			 }, res=>{
			 console.log("查询失败");
			 });
        },
        moveLogistic:function(){
            this.logisticData={};
        },
        goOrderdetails:function (orderId) {            
                LF.window.openWindow("/app/pages/personal/my_orderdetails_ps.html?orderId="+orderId,"_self");           
        },
        goMerchant:function (merchantId,houseNumber) {
            if(merchantId == 0){
                LF.window.openWindow("/app/pages/goods.html","_blank");
            }else{
                LF.window.openWindow("/app/pages/store/storeshop.html?houseNumber="+houseNumber+"&merchantId="+merchantId,"_blank");
            }
        },
        confirmGive:function (orderId) {
            var _this=this;
            MessageBox.confirm('是否确认收货?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
		    }).then(() => {
	            LF.net.getJSON("/member/order/affirm", {tokenId:LF.cookie.get("tokenId"),orderId:orderId},res=>{
	                if(res.code=="000"){
	                    _this.orderList();
	                }else{
	                    Message({
	                        type: 'error',
	                        message:res.errorMessage
	                    });
					}
	            }, res=>{
	                console.log("查询失败");
	            });
		    })
        },
            interShopStoreOrder:function(){                                                        
    		LF.net.getJSON("/member/order/stat", {storeFlag:0},res=>{                   
	    		if(res.code=="000"){
	    			this.interGoodsStat = res.data;                     console.log(123,res.data)
			}
		}, res=>{
			console.log("查询失败");
		});
    	},
    	statusChoose:function(status){
                	this.orderStatus = status;
            		this.orderList();
            	},
    	orderList:function(){
                        if(this.oldOrderStatus != this.orderStatus){
                                      this.pager.curpage = 1;
                                      this.oldOrderStatus = this.orderStatus;
                        }
                          var param = {pageNo:this.pager.curpage,pageSize:this.pager.size};
        	             if(this.searchStr) param['searchStr'] = this.searchStr;
			param["tabFlag"] = this.orderStatus;
        	                         this.loading=true;
			LF.net.getJSON("/member/order/list", param,res=>{
				this.loading=false;
                	    		if(res.code=="000"){
                	    			this.orderLists = res.data;                                                     console.log(res.data);
                	    			this.pager.total=res.data.totalCount;
                	    			if(this.orderLists.list.length > 0) this.orderListsIsNull = false;
                	    			else this.orderListsIsNull = true;

                				}
            			}, res=>{
                                                    this.loading=false;
                                                    console.log("查询失败");
                                      });
    	},
    	goPayment:function(orderId){
    		LF.net.getJSON("/integral/confirmPay", {tokenId:LF.cookie.get("tokenId"),orderId:orderId},res=>{
	    		if(res.code=="000"){
	    			this.go("/app/pages/shopping/shopPayCost.html?order="+orderId);
				}
			}, res=>{
                console.log("查询失败");
			});
    	},
    	handleCurrentChange:function(val){
    		this.pager.curpage=val;
     		this.orderList();
    	},
    	search:function(){
    		this.searchStr = this.$refs.search.value;
    		this.orderList();
    	},
    	delOrder:function(orderId){                                                                            console.log(12345, 'id='+orderId)
   //  		LF.net.getJSON("/member/order/del", {orderId:orderId},res=>{   console.log(12,"调取服务   /member/order/del")
	  //   		if(res.code=="000"){                                                             console.log(res,1236)
			// 	this.interShopStoreOrder();
   //  				this.orderList();
			// }else{   console.log(123456,'删除订单失败code001',)
   //                                                  Message({
   //                                                              type: 'error',
   //                                                              message:res.errorMessage
   //                                                  });
		 //             }
	  //            }, res=>{
   //                                      console.log("删除失败");
	  //            });                          
                          MessageBox.confirm('您确定要删除此订单吗?', '提示', {
                                       confirmButtonText: '确定',
                                       cancelButtonText: '取消',
                                       type: 'warning'
                          }).then(() => {
                                      LF.net.getJSON("/member/order/del", {orderId:orderId},res=>{      console.log(12,"调取服务   /member/order/del")
                                                    if(res.code=="000"){                                                               console.log(res,1236)
                                                                Message({
                                                                            type: 'info',
                                                                            message: '删除成功'
                                                                });
                                                                this.interShopStoreOrder();
                                                                this.orderList();
                                                    }else{                                                                                       console.log(123456,'删除订单失败code001',)
                                                                Message({
                                                                            type: 'error',
                                                                            message:res.errorMessage
                                                                });
                                                   }
                                      }, res=>{
                                                    console.log("删除失败");
                                                    Message({
                                                                type: 'error',
                                                                message: JSON.stringify(res)
                                                    });
                                      });
                          }).catch(() => {
                                       Message({
                                                    type: 'info',
                                                    message: '已取消删除'
                                       });
                         });   
    	},
        closeOrder : function(orderId){
                          var _this =this ;var id = orderId;
            // LF.net.getJSON("/merchant/order/close", {orderId:orderId},res=>{
            //     if(res.code=="000"){console.log(res,id);
            //         alert("取消订单成功");
            //         // this.go("/app/pages/personal/my_order_ps.html");
            //     }else{
            //         alert(res.errorMessage);
            //     }
            // }, res=>{
            //     console.log("error：" + JSON.stringify(res));
            // });
                             // var self = this;
             MessageBox.confirm('您确定要取消此订单吗?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
              }).then(() => {
	            if (id != "" && id != null) {
	                LF.net.getJSON("/merchant/order/close", {orderId:orderId}, res => {
	                    if (res.code == "000") {                     
	                    	console.log(res,id);
	                    	this.orderList();
	                         Message({
	                              type: 'info',
	                              message: "取消订单成功"
	                         });
	                    } else {
	                    	console.log(123, 'codeelse');
	                    	Message({
	                    		type: 'error',
	                    		message: res.errorMessage
	                    	});
	                    }
	                }, res => {
	                	Message({
	                            type: 'error：',
	                            message: JSON.stringify(res)
	                	});
	             });
	          }
              }).catch(() => {
                 Message({
               	  type: 'info',
                     message: '已取消删除'
                  });
             });

        },
        choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 8) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555";
        	}
        },
        bindStar:function(){

        },
		goGoodsView:function (goodsId,payWay) {
			if(payWay!="1"){return}
            LF.window.openWindow("/app/pages/store/storedetails.html?goodsId="+goodsId,"_blank");
        },
        openAfterForm:function () {
            LF.net.getJSON("/sys/after/sale", {tokenId:LF.cookie.get("tokenId")},res=>{
                if(res.code=="000"){
                   this.afterSale=res.data;
                   this.isAfter=true;
                }else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
                }
            }, res=>{
                console.log("失败");
            });
        },
	jumpToOrder : function(){
            var param = LF.window.getParams();
            var status = "1";
            if(param&&param['orderType']){
                status = param['orderType'];
                //this.go("/app/pages/personal/my_order_ps.html");
            }
            this.statusChoose(status);
		}
	},
	/*
     *组件挂在完成响应
     */
    mounted(){
    	this.goLogin();
    	// this.choose();
    	this.bindStar();
    	this.interShopStoreOrder();
    	this.jumpToOrder();
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})