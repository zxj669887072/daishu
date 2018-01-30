<template>
	<div class="leftbox">
				<dl>
					<dt><img src="/images/left_03.png"/>订单管理</dt>
					<dd>
						<a href="orderlist_bz.html?m=1&mid=0"  :class="{'org':menu==1}">订单管理</a>
					</dd>
				</dl>
				<dl>
					<dt><img src="/images/left_07.png"/>商品管理</dt>
					<dd>
						<a href="goodclass_bz.html?m=2&mid=0" :class="{'org':menu==2}">商品分类管理</a>
						<a href="buyoff_bz.html?m=3" :class="{'org':menu==3}">商品列表</a>
						<a href="addbusgoods.html?m=4" :class="{'org':menu==4}">添加商品</a>
					</dd>
				</dl>
				<dl>
					<dt><img src="/images/left_08.png"/>售后管理</dt>
					<dd>
						<a href="/app/pages/business/assessment_bz.html?m=5" :class="{'org':menu==5}">评价管理</a>
					</dd>
				</dl>
				<dl>
					<dt><img src="/images/left_01.png"/>财务管理</dt>
					<dd>
						<a href="/app/pages/business/account_bz.html?m=6" :class="{'org':menu==6}">我的账户</a>
						<a href="/app/pages/business/check_order.html?m=7" :class="{'org':menu==7}">订单对账</a>
						<a href="/app/pages/business/yhzhcx_bz.html?m=8" :class="{'org':menu==8}">银行账户</a>
					</dd>
				</dl>
				<dl>
					<dt><img src="/images/left_09.png"/>经营分析</dt>
					<dd>
						<a href="/app/pages/business/business_report_bz.html">业务报表</a>
					</dd>
				</dl>
				<dl>
					<dt><img src="/images/left_11.png" width="17" height="17"/>系统设置</dt>
					<dd>
						<a href="/app/pages/business/advertising_management.html?m=10" :class="{'org':menu==10}">广告管理</a>
						<!--<a href="/app/pages/business/shipping_template_bz.html?m=11" :class="{'org':menu==11}">运费模板设置</a>-->
					</dd>
				</dl>
			</div>
</template>

<script>
import LF from 'LF'; 

	export default {
    	props:[
             
        ],
       data() {
			return {
				 menu:0
			}
		},
        computed: {
	        
        },
        mounted() {
        	this.setM();
	    	 
		},
        methods: {
        	setM:function(){
	        	var _this =this ;
				var _par =LF.window.getParams();
		    	if(_par!=null){
		    		console.log(_par.m);
		    		_this.menu=_par.m;
		    	}
        	}
        },
        beforeMount(){
         
        },
        components: {}
    }
</script>

<style>
	.leftbox dd .org{
		color: #FF4400;
		font-weight: 600;
	}
</style>