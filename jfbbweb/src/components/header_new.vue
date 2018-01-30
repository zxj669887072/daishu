<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<template>
	<div class="top" id='top'>
		<div class="w1000">
			<div class="left" v-if="user_id">
                <a href="/app/pages/personal/home_ps.html" v-if="user_id" v-text="user_name"></a>
				<div  v-if="vip_flag" v-text="vip_flag ? 'VIP':''"></div>
			</div>
			<div class="left" v-if="user_id">
				<div><a href="/app/pages/personal/message.html">&nbsp;&nbsp;消息(<span v-text="messageCount"></span>)</a></div>
			</div>
			<div class="left" v-if="user_id">
				<div><a href="#" @click="logout()" target="_self">&nbsp;&nbsp;退出</a></div>
			</div>
			<div class="right">
				<a href="/app/pages/shopping/shoppingcart.html" v-if="user_id" >
					<i class="fa fa-shopping-cart"></i>
					<span >
						购物车(<span v-text="shopsCount"></span>)
					</span>
				</a>
                                                   <a href="/app/pages/personal/home_ps.html" v-if="user_id">个人中心</a>

				<a href="#" target="_self" v-if="!user_id"  @click= "go('/app/login.html')">登录</a>
				<span class="line" v-if="!user_id">|</span>
				<a href="#" target="_self" v-if="!user_id" @click= "go('/app/pages/register.html')">免费注册</a>
				<span class="line" v-if="!user_id">|</span>
				<a href="#" target="_self" v-if="!user_id" @click= "go('/app/login_bz.html')">商家登录</a>
				<span class="line" v-if="!user_id">|</span>
				<a href="#" target="_self" v-if="!user_id" @click= "go('/app/pages/information/applyForAccount.html')">入驻开店</a>

				<span class="line">|</span>
				<a href="/app/pages/about/help-center.html#联系我们" @click='goHelpCenter("联系我们")'>联系我们</a>
				<span class="line">|</span>
				<a href="/app/pages/about/help-center.html" target="_self">帮助中心</a>
				<span class="line">|</span>
				<a href="/app/pages/about/help-center.html#关于蓝山集势"  @click='goHelpCenter("关于蓝山集势")'>关于蓝山集势</a>
				<span class="line"></span>
				<a style="display: none;" href="javascript:void(0);" id="onlineSale" >更多<i class="fa fa-plus"></i></a>
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
                LF.window.openWindow("/app/pages/goods.html","_self");
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
            sethref:function(){
                var url = window.location.pathname ;
                if(url != "/app/index.html"){
                        var a = document.getElementById('jump');
                        if(a){
                            a.setAttribute('href','/app/pages/goods.html');
						}

                }
            },
            onlineSale : function(){
                var self=this;
                LF.net.getJSON("sys/after/sale", {}, function(res) {
                var href="";
                var onlineSale = document.getElementById("onlineSale");
                 if(res.code==='000'){
                     //href = "http://wpa.qq.com/msgrd?v=3&uin="+res.data.qq+"&site=qq&menu=yes";
                        href="tencent://message/?uin="+res.data.qq+"&Site=qq&Menu=yes"
                     if(onlineSale)onlineSale.href=href;
                   }else{
                     console.log(res.errorMessage);
                   }
                })
            },
            goHelpCenter: function(name){
                console.log(name);
                window.open(" /app/pages/about/help-center.html#" + name,"_self");
                location.reload();
            },
            go(url) {
              if(window.location.host == 'localhost:3000' || window.location.host == '119.23.71.113:82'  || window.location.host == 'www.kangaromall.com' || window.location.host == 'kangaromall.com'){console.log(url,'http://www.kangaromall.com'+url)
                  LF.window.openWindow(url,'_self');
              }else if(window.location.host == 'www.lanshanjishi.com' || window.location.host == 'lanshanjishi.com'){
                LF.window.openWindow('http://www.kangaromall.com'+url,'_self');
              }  
            },

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
                
                this.onlineSale();
        },
        destroyed(){
        },
        components: {}
    }
</script>