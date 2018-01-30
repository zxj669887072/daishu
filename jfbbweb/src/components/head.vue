<template>
    <div class="head">
		<div class="w1000">
			<div class="logo left"><a href="/app/pages/goods.html" target="_self" ><img src="/images/logo2.png" /></a></div>
			<ul class="menu left">
			<li>
				<a href="#" @click="goLogout()">退出</a>
			</li>
			<li><a href="/app/pages/personal/home_ps.html">首页</a></li>
			<li><a href="#">账户设置 <img src="../images/arrow_lower.png" width="10" height="5"></a><ul>
			<a href="/app/pages/personal/account_ps.html"  target="_self">账户资料</a>
            <a href="/app/pages/personal/update_pwd_ps.html" target="_self">修改密码</a>
            <a href="/app/pages/personal/harvest_address_ps.html" target="_self">收货地址</a></ul></li>
			<li><a href="/app/pages/personal/message.html">消息<div class="ico">{{message}}</div></a></li>
				<li><a href="/app/pages/shopping/shoppingcart.html">购物车<div class="ico">{{buyCartCount}}</div></a></li>
			</ul>
			<dl class="right">
				<dt><img :src="icon" /></dt>
				<dd><span class="f18">♡ </span><strong>&nbsp;&nbsp;{{nickNme}}</strong></dd>
				<dd style=" width:70%">帐号：<strong>{{account}}</strong></dd>
			</dl>
			<!--<div class="shopping right f14"><a href="/app/pages/shopping/shoppingcart.html">我的购物车<span class="ico">{{buyCartCount}}</span></a></div>-->
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import LF from 'LF';
    export default {
        data () {
            return {
            	buyCartCount:0,
            	message:0,
				icon:'',
                nickNme:'',
				account:''
            }
        },
        methods: {
            goLogout:function(){
                LF.cookie.del("account");
                LF.cookie.del("userId");
                LF.cookie.del("userName");
                LF.cookie.del("tokenId");
                LF.window.openWindow("/app/pages/goods.html","_self");
			},
        	buyCart(){
        		LF.net.getJSON("/integral/heaher/bubble/num", { tokenId:LF.cookie.get("tokenId") }, res => {
					if(res.code == "000") {
						this.buyCartCount = res.data.shopCartNum;
						this.message = res.data.msgNum;                                   console.log(res.data,555);
					}
				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
		    },
			getUser:function () {
                LF.net.getJSON("/integral/user/info", { tokenId:LF.cookie.get("tokenId") }, res => {
                    if(res.code == "000") {                                                                                                                 
                        this.icon = res.data.icon;
                        this.nickNme = res.data.nickName;
                        this.account=res.data.account.substr(0,3)+"****"+res.data.account.substr(7);
                    }
                }, res => {
                    console.log("error：" + JSON.stringify(res));
                });
            }
        },
        mounted(){
        	this.buyCart();
        	this.getUser();
        },
        beforeMount(){
            console.log("header beforeMount");
            //获取登录人ID
            if(LF.cookie.get("tokenId")){
                this.user_id = LF.cookie.get("userId");
            }
        },
    }
</script>