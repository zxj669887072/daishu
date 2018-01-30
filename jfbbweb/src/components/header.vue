<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<template>
    <div class="header">
		<div class="header-center">
			<div class="center-left">
			    <a href=" /app/index.html" target="_self" id="jump"><div class="five-font">首页&nbsp;&nbsp;</div></a>
			</div>
			<div class="center-left" v-if="user_id">
                <div class="first-font" v-text="user_name"></div>
                <div class="two-font" v-if="vip_flag">{{vip_flag ? "VIP":""}}</div>
                <div class="three-font"></div>
                <div class="four-font"><i class="fa fa-envelope-o"></i></div>
                <a href="/app/pages/message.html"><div class="five-font">消息(<span v-text="messageCount"></span>)</div></a>
                <a href="javascript:void(0);" @click="logout()" target="_self" v-if="user_id"><div class="five-font">退出</div></a>
            </div>
			<div class="center-right">
				<a href="javascript:void(0);" v-if="user_id" @click="go('/app/pages/shopping/shoppingcart.html')">
					<i class="fa fa-shopping-cart"></i>
					<span >
						购物车(<span v-text="shopsCount"></span>)
					</span>
				</a>
				<!--
					/app/login.html 使用项目部署的绝对路径
                -->
				<a href="/app/login.html" target="_self" v-if="!user_id">登录</a>
				<a href="/app/login_bz.html" target="_self" v-if="!user_id">商家登录</a>
				<span class="line" v-if="!user_id"></span>
				<a href="/app/pages/register.html" target="_self" v-if="!user_id">免费注册</a>
				<a href="/app/pages/personal/home_ps.html" v-if="user_id">个人中心</a>
				<span class="line"></span>
				<a href="/app/pages/information/applyForAccount.html" target="_self">入驻开店</a>
				<span class="line"></span>
				<a href="javascript:void(0);" id="onlineSale" target="_blank">客服</a>
				<span class="line"></span>
				<!--<a href="javascript:void(0);">更多<i class="fa fa-plus"></i></a>-->
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import LF from 'LF';
    export default {
        data () {
            return {
            	user_id:"",
            	user_name:"",
            	vip_flag:false,
            	messageCount:0,
            	shopsCount:0,
            }
        },
        computed: {
        },
        methods: {
            sethref:function(){
                var url = window.location.pathname ;
                if(url  == '/app/pages/shopping/shoppingcart.html'   ||  url=='/app/pages/shopping/shoppingbuy.html'  ||  url=='/app/pages/shopping/shoporder.html'  ||  url=='/app/pages/shopping/shopPayCost.html'){
                        var a = document.getElementById('jump');console.log(a);
                        a.setAttribute('href','/app/pages/goods.html');
                }                
            },
        	goBylogin(url){
        		LF.window.openWindow(url,"_self",true);
        	},
        	goByloginBlank(url){
                LF.window.openWindow(url,"_blank",true);
            },
        	go:function(url){
        		LF.window.openWindow(url,"_self");
        	},
        	logout:function(){
                LF.cookie.del("account");
                LF.cookie.del("userId");
                LF.cookie.del("userName");
                LF.cookie.del("tokenId");
                LF.window.openWindow("/app/index.html","_self");
                return;
            },
        	getBubble:function(){
        	    var self=this;
        	    LF.net.getJSON("/integral/heaher/bubble/num", {tokenId:LF.cookie.get("tokenId")}, function(res) {
                 if(res.code==='000'){
                     self.messageCount=res.data.msgNum;
                     self.shopsCount=res.data.shopCartNum;
                   }else{
                     console.log(res.errorMessage);
                   }
                })
        	},
            onlineSale : function(){
                var self=this;
                LF.net.getJSON("sys/after/sale", {}, function(res) {                 
                var href="";
                var onlineSale = document.getElementById("onlineSale");
                 if(res.code==='000'){
                    //href = "http://wpa.qq.com/msgrd?v=3&uin="+res.data.qq+"&site=qq&menu=yes";
                    href="tencent://message/?uin="+res.data.qq+"&Site=qq&Menu=yes"
                    //tencent://message/?uin=1234567890&Site=qq&Menu=yes
                     onlineSale.href=href;
                   }else{
                     console.log(res.errorMessage);
                   }
                })
            }
        },
        beforeMount(){
	    	//获取登录人ID
	    	if(LF.cookie.get("tokenId")){
                this.user_id = LF.cookie.get("userId");
                this.getBubble();
	    		this.user_name ="Hi , "+ LF.cookie.get("userName");
	    		var vip = LF.cookie.get("vip_flag");
		    	var messageCount = LF.cookie.get("messageCount");
		    	if(LF.cookie.get("shopsCount")){
		    		this.shopsCount = LF.cookie.get("shopsCount");
		    	}
	    	}
	    },
        mounted() {
            this.sethref();
            this.onlineSale();
        },
        destroyed(){
        },
        components: {}
    }
</script>