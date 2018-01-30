<template>
	<div class="padding20" >
		<div class="hover">
			<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table4">
				<tr>
					<td width="36%"><strong>商品</strong></td>
					<td width="10%" align="center"><strong>数量</strong></td>
					<td width="10%" align="center"><strong>金额</strong></td>
					<td width="14%"><strong>买家</strong></td>
					<td width="10%" align="center"><strong>实收款</strong></td>
					<td width="10%" align="center"><strong>订单状态</strong></td>
					<td width="10%" align="center"><strong>操作</strong></td>
				</tr>

				<template v-for="(item,index) in list.list">
					<tr>
						<td height="30" style="text-align:left;" bgcolor="#f7f7f7" colspan="7"> <span>{{item.createDate}}</span>&nbsp;&nbsp; 订单号：<a href=" javaScript:void(0)" @click="goOrderdetails(item.orderId)"><span class="blue"><strong>{{item.orderNo}}</strong></span></a>
						</td>

					</tr>

					<tr v-for="(iorder,idx) in item.orderDtls">
						<td class="table">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="width:21%;">
										<div class="imgbox">
											<a href="javaScript:void(0)" @click="gotoGoodsDtl(iorder.goodsId,item.payWay)"><img :src="iorder.picUrl" width="80px" height="80px"/></a>
										</div>
									</td>
									<td style="text-align:left;width:79%;">
										<a style="display:inline-block;margin-left:10px;"  href="javaScript:void(0)" @click="gotoGoodsDtl(iorder.goodsId,item.payWay)">{{iorder.goodsName}}<br />
										<span class="c-9">{{iorder.spec}}</span><br />
										<span class="c-9">单价：￥{{iorder.price}}</span><br />
										<span class="c-9" v-if="iorder.giveInter"> {{iorder.giveInter}} 积分</span><br />
										</a></td>
								</tr>
							</table>
						</td>
						<td align="center">{{iorder.qty}}</td>
						<td align="center">￥{{iorder.qty*iorder.price }}</td>
						<td class="blue" v-if="idx==0" v-bind:rowspan="item.orderDtls.length"><img src="/images/hom_21.jpg" width="12" height="11" /> {{item.consigneeName}}<br />
							<img src="/images/hom_25.jpg" width="9" height="12" /> {{item.mobilePhone}}</td>
						<td align="center" :rowspan="item.orderDtls.length" v-if="idx == 0">
							<template v-if="idx==0">
								¥<strong class="f14">{{item.totalAmount}}</strong><br /> <span v-if="item.payInter">{{item.payInter}} 积分</span>

							<!--<a href="#" class="blue" style="width:100%; float:left">修改价格</a>-->
							</template>
						</td>
						<td v-if="idx==0" v-bind:rowspan="item.orderDtls.length"  align="center"><span class="c-9">{{item.orderStatusStr}}</span>
						</td>
						<td align="center" style="line-height:20px;" :rowspan="item.orderDtls.length" v-if="idx == 0">
							<template v-if="idx==0">

								<!--确认收款（订单没有完成（已经支付的））-->
								<input name="input3" @click="showDeliveryShow(item.orderId)" v-if="item.orderStatus==1 && item.payStatus==1" type="button" value="确认发货" style="margin-top:8px; margin-bottom:5px;" />

								<input name="input3" @click="accept(item.orderId)" v-if="item.orderStatus ==1 && item.payStatus==0 && item.payWay==0" type="button" value="确认收款" style="margin-top:8px; margin-bottom:5px;" />

								<br />
								<a href="#" @click="goOrderdetails(item.orderId)" class="blue">订单详情</a> <br />
								<!--关闭订单（订单状态为已完成或者已下单但是没有支付）-->
								<!--<a href="#" @click="close(item.orderId)" class="blue" v-if="item.payStatus==0 && ( item.orderStatus==1 || item.orderStatus==4)">关闭订单</a>-->

							</template>

						</td>
					</tr>
				</template>

			</table>
		</div>
		<el-dialog title="确认发货" v-model="confirmDeliveryShow" class="delivery-dialog" >
			<div class="delivery-wrap">
				<el-form  :rules="deliveryRules" ref="deliveryForm"  :model="deliveryForm" label-width="100px">
			  		<el-form-item label="快递公司" prop="exCompany">
				    		<el-select v-model="deliveryForm.exCompany" placeholder="请选择快递公司" style="width:180px;">
					      		<el-option
						      		v-for="item in deliveryData.options"
						      		:label="item.companyName"
						      		:value="item.companyCode">
						    	</el-option>
				    		</el-select>
				  	</el-form-item>
				  	<el-form-item label="快递单号" prop="exNo" >
				    		<el-input v-model="deliveryForm.exNo" style="width:180px;"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    		<el-button type="primary"  @click="confirmDevliver('deliveryForm',deliveryData.orderId)">确认</el-button>
				    		<el-button @click="confirmDeliveryShow = false" >取消</el-button>
				  	</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!-- <el-dialog title="订单详细信息" v-model="dialogShow" class="order-dialog">
			<div class="ordercon">
				<div class="left">
					<div class="head"><font>订单信息</font></div>
					<div class="content">
						<div> <span>订单号:</span>{{orderdetail.orderNo}}</div>
						<div> <span>收货地址:</span>{{orderdetail.detailAddr}}</div>
						<div> <span>收货人:</span>{{orderdetail.consigneeName}}</div>
						<div> <span>联系电话:</span>{{orderdetail.mobilePhone}}</div>
						<div> <span>运单号:</span>{{orderdetail.freightNumber}}</div>
						<div> <span>运费:</span>{{orderdetail.freightFee}}</div>
						<div> <span>物流公司:</span>{{orderdetail.logisticsName}}</div>
					</div>

				</div>
				<div class="right">
					<div class="state">
						<span>订单状态为：
						<template v-if="orderdetail.orderStatus==1">已下单</template>
						<template v-else-if="orderdetail.orderStatus==2">已发货</template>
						<template v-else-if="orderdetail.orderStatus==3">已签收</template>
						<template v-else-if="orderdetail.orderStatus==4">已完成</template>
						<template v-else-if="orderdetail.orderStatus==5">已取消</template></span>
						<span>交易方式：<template v-if="orderdetail.tradeWay==0">送货上门</template>
						<template v-else>到店自提</template></span>
						<span>支付状态：<template v-if="orderdetail.payStatus==0">未支付</template>
						<template v-else>已支付</template></span>
						<span>付款方式：<template v-if="orderdetail.payWay==0">现金支付</template>
						<template v-else>线上支付</template></span>
					</div>
					<div class="">备注：{{orderdetail.remark}}</div>
					<div class="">优惠金额：{{orderdetail.couponAmount}}</div>
					<div class="">线上支付金额(等于实付金额)：{{orderdetail.onlinePayAmount}}</div>
					<div class="">总金额：{{orderdetail.totalAmount}}</div>
					<div class="">支付积分：{{orderdetail.payInter}}</div>
					<div class="">实付金额(总)：{{orderdetail.payAmount}}</div>
					<div class="">返佣金额(总)：{{orderdetail.bkge}}</div>
					<div class="">商品数量：{{orderdetail.goodsQty}}</div>
					<div class="">下单时间：{{orderdetail.createDate}}</div>
					<div class="">支付时间：{{orderdetail.payDate}}</div>

				</div>
			</div>
		  <el-table :data="orderdetail.orderDtlList" v-if="orderdetail.orderDtlList!=null">
		    <el-table-column property="goodsName" label="商品名称" width="150"></el-table-column>
		    <el-table-column property="name" label="规格" width="200"></el-table-column>
		    <el-table-column property="price" label="单价"></el-table-column>
		    <el-table-column property="qty" label="数量"></el-table-column>
		    <el-table-column property="cnvInter" label="兑换积分"></el-table-column>
		  </el-table>
		</el-dialog> -->
	</div>
</template>

<script>
	import LF from 'LF';
	import Vue from 'Vue';
	import { Message,MessageBox} from 'element-ui'

	export default {
		props: [
			"list"
		],
		data() {
			return {
				deliveryForm : {
					exCompany :"",
					exNo : ""
				},
				deliveryRules : {
					exCompany:[{
						required: true, message: '请选择快递公司', trigger: 'blur'
					}],
					exNo:[{
						required: true, message: '请输入快递单号', trigger: 'blur'
					}]
					// exNo:[
					// 	{ validator: function(rule, value, callback){
     //                						if (!value) {
     //                  							 callback(new Error('请输入快递单号'));
     //                						};
                    						// setTimeout(() => {
                    							// if(!/^\d{9,}$/.test(value)){
                    							// 	callback(new Error('请输入正确的快递单号'));
                    							// }
                      							// if (!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
                        					// 			callback(new Error('请输入正确的快递单号(不得包含中文)'));
                      							// } else {
                        					// 			if ((/\d{14}$/.test(value))) {
                          			// 					callback();
                        					// 			} else {
                          			// 					callback(new Error('请输入正确的快递单号'));
                        					// 			}
                      							// }
                    						// }, 100);
     //            					}, trigger: 'blur' }
					// ]
				},
				dialogShow:false,
				deliveryData :{
					options:[],
					orderId : ""
				},
				confirmDeliveryShow:false,
				/**
				  *弹出   商品详细  信息
				  */
				orderdetail:''
			}
		},
		computed: {

		},
		methods: {
			/**
			 * 订单详情弹出层
			 */
			// showRoderinfo:function(id){
				//this.$emit('increment');
				// var _this =this ;

				// LF.net.getJSON("/merchant/order/detail", {orderId:id},res=>{
		  		//   	if(res.code=="000"){
		  		//   		_this.dialogShow=true;
				// 		_this.orderdetail=res.data;
				// 		console.log(res.data);
				// 	}else{
    				//		alert(res.errorMessage);
				// 	}
				// }, res=>{
				// 	console.log("error：" + JSON.stringify(res));
				// });
			// },
			goOrderdetails:function(orderId) {    console.log(123)  ; console.log(orderId);
                         	 		 LF.window.openWindow("/app/pages/business/my_orderdetails_bz.html?orderId="+orderId,"_self");
             		},
			/**
			  *确认
			  */
			confirmDevliver:function(formName,id){console.log(this.deliveryForm.exNo )				
				if(!/^\d{9,}$/.test(this.deliveryForm.exNo)){

				                         alert( "请输入正确的快递单号");return

				};console.log(123);
				let _this =this ;
				let param = {
					"orderId" : id
				};
				_this.$refs[formName].validate((valid)=>{	console.log(148963)
					if(valid){
						var formData = _this.deliveryForm;
						param['shipperCode'] = formData['exCompany'];
						param['logisticCode'] = formData['exNo'];
						_this.submitConfirm(param);
					}else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			submitConfirm : function(param){
				var _this = this;
				LF.net.getJSON("/merchant/order/goods/sendout", param,res=>{						 
		    			if(res.code=="000"){
						_this.$emit('increment');
						_this.confirmDeliveryShow = false;
						Message({
                            type: 'info',
                            message:"确认发货成功",
                            onClose:function(){
                            	window.location.reload();
                            }
                        });
                        //alert("确认发货成功",0,1);
					}else{
                        Message({
                            type: 'error',
                            message:res.errorMessage
                        });
                        //alert(res.errorMessage);
					}
				}, res=>{
					console.log("error：" + JSON.stringify(res));
				});
			},
			/**
			 * 确认发货弹出层
			 */
			showDeliveryShow : function(id){
			//  ;
				var _this = this;
				_this.deliveryForm = {
					exCompany :"",
					exNo : ""
				};
				let params = {
	    		};
		    	LF.net.getJSON("/logistic/express/list",params,res=>{
		  			if(res.code==='000'){
		  				_this.confirmDeliveryShow=true;
		  				_this.deliveryData['options'] = res.data;
		  			}else{
		  				Message({
							type: 'warning',
							message:res.errorMessage
						});
						//alert(res.errorMessage);
					}
		  		},res=>{
		  			Message({
						type: 'error',
						message:res.errorMessage
					});
					//alert(res.errorMessage);
		  		});
		  		_this.deliveryData['orderId'] = id;
			},
			accept:function(id){
				var _this =this ;
				LF.net.getJSON("/merchant/order/acceptance", {orderIds:id},res=>{
		    		if(res.code=="000"){
                         Message({
                            type: 'info',
                            message:"确认收款成功"
                        });
                        //alert("确认收款成功");
						_this.$emit('increment');
					}else{
						if(res.code=="207"){
							Message({
								"type":"info",
								"message":"您的余额不足，请您及时充值！",
								"onClose":function(){
									LF.window.openWindow('/app/pages/business/recharge_bz.html?confirmCollection=true',"_self");
								}
							});
						}
                       // alert(res.errorMessage);
					}
				}, res=>{
					console.log("error：" + JSON.stringify(res));
				});
			},
            gotoGoodsDtl:function(par,payway){
            	if(payway=='0'){return}
                LF.window.openWindow("/app/pages/store/storedetails.html?goodsId="+par);
            },
			close:function(id){
				var _this =this ;
				LF.net.getJSON("/merchant/order/close", {orderId:id},res=>{
		    		if(res.code=="000"){
                         Message({
                            type: 'info',
                            message:"关闭订单成功"
                        });
                        //alert("关闭订单成功");
						_this.$emit('increment');
					}else{
                         Message({
                            type: 'error',
                            message:res.errorMessage
                        });
                        //alert(res.errorMessage);
					}
				}, res=>{
					console.log("error：" + JSON.stringify(res));
				});
			}
		},
		beforeMount() {},
		mounted() {
		},
		destroyed() {},
		components: {}
	}
</script>

<style>
.order-dialog .el-dialog{
	width: 850px;
}
.delivery-dialog .el-form-item{
	text-align:left;
}
</style>