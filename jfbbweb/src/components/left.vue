<template>
	<div class="leftbox sheng-left">
    	<dl>
        <dt><img src="../images/left_01.png"/>我的钱包</dt>
         <dd><a href="/app/pages/personal/wallet_ps.html?m=1" :class="{'org':menu==1}"><strong id="item1">我的钱包</strong></a></dd>
        <dd>
            <a href="/app/pages/personal/myRedPackets_ps.html?m=2" :class="{'org':menu==2}"><strong id="item2">我的红包</strong></a>
        </dd>
        <dd>
            <a href="/app/pages/personal/bdyhzh_ps.html?m=3" :class="{'org':menu==3}"><strong id="item3">绑定银行账户</strong></a>
        </dd>
        </dl>
        <dl>
            <dt><img src="../images/left_02.png"/>我的店铺</dt>
            <dd>
                 <!-- <a href="/app/pages/personal/distribution_shop_ps.html?m=4" :class="{'org':menu==4}"><strong id="item4">我分销的店铺</strong></a> -->
                 <a href="/app/pages/personal/distribution_goods_ps.html?m=5" :class="{'org':menu==5}"><strong id="item5">我分销的商品</strong></a>
                 <a href="/app/pages/personal/my_distribution_ps.html?m=6" :class="{'org':menu==6}"><strong id="item12">我的分销商</strong></a>
                 <a href="/app/pages/personal/myvirtualstore_ps.html?m=7" :class="{'org':menu==7}"><strong id="item6">我的虚拟店铺</strong></a>
               <!--  <a href="/app/pages/personal/goodclass_ps.html?m=" :class="{'org':menu==}"><strong id="item7">商品分类管理</strong></a>-->
            </dd>
        </dl>
        <dl>
        <dt><img src="../images/left_03.png"/>我的订单</dt>
        <dd><a href="/app/pages/personal/my_order_ps.html?m=8" :class="{'org':menu==8}"><strong id="item8">我的订单</strong></a></dd>
        </dl>
        <dl>
        <dt><img src="../images/left_04.png"/>评价管理</dt>
        <dd><a href="/app/pages/personal/evaluation_manage_ps.html?m=9" :class="{'org':menu==9}"><strong id="item9">评价管理</strong></a></dd>
        </dl>
       <dl>
        <dt><img src="../images/left_05.png"/>我的关注</dt>
        <dd><a href="/app/pages/personal/focus_shop_ps.html?m=10" :class="{'org':menu==10}"><strong id="item10">我关注的店铺</strong></a></dd>
<dd><a href="/app/pages/personal/focus_shop_goods2_ps.html?m=11" :class="{'org':menu==11}"><strong id="item11">我关注的商品</strong></a></dd>
        </dl>

  </div>
</template>
<script>
	import LF from 'LF';
	import Vue from 'Vue';


	export default {
		data() {
			return {
                 menu:0
			}
		},
		computed: {

		},
		methods: {

		},
		beforeMount() {},
		mounted() {
            var _this =this ;
            var _par =LF.window.getParams();
            if(_par!=null){
            console.log(_par.m);
            _this.menu=_par.m;
            }
        },
		destroyed() {},
		components: {}
	}
</script>
<style>
    .leftbox dd .org{
        color: #FF4400;
        font-weight: 600;
    }
</style>