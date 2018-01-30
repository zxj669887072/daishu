/**
 * Created by zxh on 2017/3/3 0003.
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/header_new.vue';
import LfSearch from '../../../components/search.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem,Message } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);

new Vue({
	el:"#app",
	data:{
		selectArr:{
			store:[],
			shop:[],
			checkall:false,
			shopAll:0,
			shopSize:0
		},
		searchStr:"",
		/**
		 * 购物车列表
		 */
		carList:[],
	},
	methods:{
		checkValue:function(value,ID){console.log(value <= 0,value,ID);
			var self = this;
			if(value <= 0){value = 1;
				self.carList.forEach(function(item){
					item.goodsList.forEach(function(its){
						if(its.id == ID ){
							Message({
				                        			type: 'warning',
				                        			message:"商品数量不能小于1"
				                    		});
							// alert("商品数量不能小于1");
							its.qty =1;
						}					 
					});
				});
			};	
		},
		/**
		 * 修改商品数量
		 * @param {Object} index  商店的序列
		 * @param {Object} indexshop 商店里商品的序列
		 * @param {Object} val  +-
		 */		
		addCarshop:function(index,indexshop,val,sp){			
			//后台交互  交互完成之后再修改
			var num =parseInt(this.carList[index].goodsList[indexshop].qty);
			console.log(num);
			if(isNaN(num)){
				num=0;
			}
			if( num+val <1){
                Message({
                    type: 'warning',
                    message:"数量不能少于1"
                });
			}else{	
				// var num
				console.log(123456,LF.cookie.get("tokenId"));
				console.log(this.carList[index].goodsList[indexshop].id);
				console.log(sp,(num+val));
				LF.net.getJSON("/shopping/cart/edit", {tokenId:LF.cookie.get("tokenId"),
					goodsId:this.carList[index].goodsList[indexshop].id,spec:sp,qty:num+val}, res=>{
		    		if(res.code=="000"){									console.log(123);
		 				this.carList[index].goodsList[indexshop].qty= num+val;
		 				this.calcCheckall();
		 				this.$refs.header.getBubble();
					}else{
                        Message({
                            type: 'error',
                            message:res.errorMessage
                        });
					}
				}, res=>{
					console.log("error：" + JSON.stringify(res),4444);
				});
			}

		},
		/**
		 * 全选  所有
		 */
		checkall:function(){							console.log(this.selectArr.checkall)
			if( navigator.userAgent.indexOf("Firefox")>0){              				
            				this.selectArr.checkall = !this.selectArr.checkall;
        			};        								
 			var _this =this;
			if(!_this.selectArr.checkall){
				_this.selectArr.shop=[];
				_this.selectArr.store=[];
			}else{//全选哦
				_this.selectArr.shop=[];
				_this.selectArr.store=[];
				_this.carList.forEach(function(item){
					_this.selectArr.store.push(item.merchantId);
					item.goodsList.forEach(function(its){
						_this.selectArr.shop.push((its.id+'-'+its.spec));
					});
				});
			};								console.log(_this.selectArr.shop,546);
			_this.calcCheckall();
		},
		/**
		 * 商品全选  商铺
		 * @param {Object} 商品id
		 */
		checkstore:function(id,tar){						
			if( navigator.userAgent.indexOf("Firefox")>0){  
            				if(tar.target.checked == true){ 				
	 				this.selectArr.store.push(id)
	 			}else{		 				
	 				if(this.selectArr.store.indexOf(id)>-1){
	 					this.selectArr.store.splice(this.selectArr.store.indexOf(id),1)
	 				};	
	 			};							
        			};					
			if(this.selectArr.store.length == this.carList.length){
				this.selectArr.checkall = true;
			}else{
				this.selectArr.checkall = false;
			};
			var _this =this;
			var checked=false;
			//商铺 全选
			_this.selectArr.store.forEach(function(item){
				if(item==id){
					checked=true;
					return;
				}
			});
			_this.carList.forEach(function(item){
				if(item.merchantId==id){
					//全部去掉
					item.goodsList.forEach(function(its){
						for(var i =0;i<_this.selectArr.shop.length;i++){
							if((its.id+'-'+its.spec)==_this.selectArr.shop[i]){
								_this.selectArr.shop.splice(i,1);
							}
						}
					});
					if(checked){//全选
						item.goodsList.forEach(function(its){
							_this.selectArr.shop.push((its.id+'-'+its.spec));
						});
					}else{
						for(var i =0;i<_this.selectArr.store.length;i++){
							if(id==_this.selectArr.store[i]){
								_this.selectArr.store.splice(i,1);
							}
						}
					}
				}
			});
			_this.calcCheckall();			
 		},
 		/**
 		 * 统计合计金额
 		 */
 		calcCheckall:function(ID,tar){ 			
 			var _this=this;
 			if(tar){
 				if( navigator.userAgent.indexOf("Firefox")>0){ 
	 				if(tar.target.checked == true){ 				
		 				_this.selectArr.shop.push(tar.target.value)
		 			}else{		 				
		 				if(_this.selectArr.shop.indexOf(tar.target.value)>-1){
		 					_this.selectArr.shop.splice(_this.selectArr.shop.indexOf(tar.target.value),1)
		 				};
		 			};									 
	        			}; 
	        		};
 			
 	
 		var storeARR = [],goodmsg='',num= 0; 		
		_this.selectArr.shop.forEach(function(good){
			_this.carList.forEach(function(list){		
				if(list.merchantId==ID){									
					for(var i = 0;i<list.goodsList.length;i++){	
						if(good == (list.goodsList[i].id+'-'+list.goodsList[i].spec)){
							num++;
						}								
					};						
					if(num == list.goodsList.length ){
						_this.selectArr.store.push(ID);
					}else{
						if(_this.selectArr.store.indexOf(ID)>-1){_this.selectArr.store.splice(_this.selectArr.store.indexOf(ID),1)};				
					}										
				}
			});
		});	
		if(this.selectArr.shop.length == 0){					console.log(this.selectArr.shop,999);
			this.selectArr.store = []
		};
		if(this.selectArr.store.length == this.carList.length){
			this.selectArr.checkall = true;
		}else{
			this.selectArr.checkall = false;
		};
		
			
 			_this.selectArr.shopAll=0;
            			_this.selectArr.shopSize=0; 			
 			console.log(_this.selectArr.shop,'this.selectArr.shop');
 			console.log(_this.carList);
 			_this.selectArr.shop.forEach(function(ids){
 				_this.carList.forEach(function(item){
					item.goodsList.forEach(function(its){
						 if(ids==(its.id+'-'+its.spec)){
						 	if(its.qty <= 0){
						 		console.log(188022)
						 	};
						 					console.log(its.qty,its.price);
						 	_this.selectArr.shopAll+=its.qty*its.price;
						 	_this.selectArr.shopSize+=its.qty;											
						 };						 
					});
				});
 			});
			 _this.selectArr.shopAll= Number(_this.selectArr.shopAll).toFixed(2);console.log(_this.selectArr.shopAll,333333); 			
 		},
 		/**
 		 * 删除商品  ok
 		 * @param {Object} id
 		 * @param {Object} sp
 		 */
 		delCar:function(id,sp,price,qty){
            var _this=this;
 			LF.net.getJSON("/shopping/cart/del", {tokenId:LF.cookie.get("tokenId"),goodsId:id,spec:sp}, res=>{
	    		if(res.code=="000"){
                    Message({
                        type: 'info',
                        message:"商品删除成功"
                    });
	 				 this.$refs.header.getBubble();
	 				 this.loadcars();
                    if(_this.selectArr.shop.length>0){
                    	var i=0;
                    	var isHas=false;
                        _this.selectArr.shop.forEach(function(ids){
                        	if(ids==(id+'-'+sp)){
								isHas=true;
                        		return true;
							}else{
                                i++;
							}
                        });
						if(isHas) {
                            _this.selectArr.shop.splice(i,1);
                            _this.selectArr.shopAll = (_this.selectArr.shopAll - price).toFixed(2);
                            _this.selectArr.shopSize=_this.selectArr.shopSize-qty;
                        }
					}
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
 		},
 		deleteall:function(){
 			var _this=this;
 			if(_this.selectArr.shop.length>0){
 				var i=0;
 				_this.selectArr.shop.forEach(function(ids){
 					i++;
 				_this.carList.forEach(function(item){
					item.goodsList.forEach(function(its){
						 if(ids==(its.id+'-'+its.spec)){
						 	LF.net.getJSON("/shopping/cart/del", {tokenId:LF.cookie.get("tokenId"),goodsId:its.id,spec:its.spec}, res=>{
					    		if(res.code=="000"){
					    			//_this.calcCheckall();
								}
								if(i==_this.selectArr.shop.length){
                                    _this.selectArr.shop=[];
                                    _this.selectArr.store=[];
                                    _this.selectArr.shopAll=0;
                                    _this.selectArr.shopSize=0;
                                    _this.selectArr.checkall=false;
								}
							}, res=>{
								console.log("error：" + JSON.stringify(res));
							});
						 }
					});
				});
 			});
 			 this.loadcars();
 			 this.$refs.header.getBubble();
 			}else{
                Message({
                    type: 'warning',
                    message:"请选择商品"
                });
 			}


 		},
 		/**
 		 * 加载购物车
 		 */
 		loadcars:function(){
 			var _this = this;
 			LF.net.getJSON("/shopping/cart/list", {tokenId:LF.cookie.get("tokenId")}, res=>{
				console.log(res);
	    		if(res.code=="000"){
	 				this.carList = res.data;					console.log(this.carList,123456)
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
 		},
 		/**
 		 * 结算
 		 */
 		clearCars:function(){
 			var goodsId="";
 			var _this =this;
 			var mgid ='';
 			var flag=false;							console.log(_this.selectArr.shop);
			_this.selectArr.shop.forEach(function(ids){
				_this.carList.forEach(function(item){
					item.goodsList.forEach(function(its){
					 	if(ids==(its.id+'-'+its.spec)){
					 		if(item.merchantId!=mgid && mgid!=''){
					 			flag=true;
					 		}else{
					 			mgid=item.merchantId;
					 		}
					 		goodsId=goodsId+its.id+":"+its.qty+":"+its.spec+",";
					 	}
					});
				});
			});
			goodsId=goodsId.substring(0,goodsId.lastIndexOf(","));
			if(flag){
            				Message({
                				type: 'warning',
                				message:"一次只能选择一个店铺"
            				});
			}else{
				if(goodsId!=null && goodsId!=''){
					LF.window.openWindow("/app/pages/shopping/shoppingbuy.html?goods="+goodsId,"_self");
				}
			}
			// if(goodsId!=null){
			//  	LF.net.getJSON("/shopping/cart/list", {tokenId:LF.cookie.get("tokenId"),goodsIdStr:JSON.stringify(goodsId)}, res=>{
		 	//    		if(res.code=="000"){

			// 		}
			// 	}, res=>{
			// 		console.log("error：" + JSON.stringify(res));
			// 	});
			//  }
 		},
 		doSearch(){
		            if (this.searchStr == ''){
		                Message({
							type: 'warning',
							message:"请输入门牌号！"
						});
		                return;
		            }

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
		goGoodsView:function (goodsId) {
            		LF.window.openWindow("/app/pages/store/storedetails.html?goodsId="+goodsId,"_blank");
        		},
	},
	/**
	 * 完成之后响应  初始化
	 */
	mounted(){
		var _this = this;
		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
			LF.window.openWindow("/app/login.html","_self");
		}
		this.loadcars();
    	window.onresize = _this.footerPosition;console.log(this.$refs.header)
	},

	components: {
        LfHeader,
        LfSearch,
        LfFooter
    }
})
