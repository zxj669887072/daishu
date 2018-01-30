<template>
	<div class="head">
		<div class="w1000">
			<div class="logo left"><a href="/app/pages/business/home_bz.html" target="_self" ><img src="/images/logo2.png" /></a></div>

			<ul class="menu left">
				<li>
					<a href="#" @click="goLogout()">退出</a>
				</li>
				<li>
					<a href="/app/pages/business/home_bz.html">首页</a>
				</li>
				<li>
					<a href="#">门店设置<img src="/images/arrow_lower.png" width="10" height="5" /></a>
					<ul>
						<a href="stores_information_bz.html">门店信息</a>
						<a href="account_setting_bz.html">账户设置</a>
						<a href="bis_qualification_bz.html">营业资质</a>
						<!--<a href="#">图片空间</a>-->
						<a href="contact_bz.html">联系方式</a>
					</ul>
				</li>
				<li>
					<a href="/app/pages/business/message.html">消息
						<template v-if="messageCount > 0"><div class="ico">{{messageCount}}</div></template>
					</a>
				</li>
			</ul>
			<dl class="right">
				<dt><img :src="shopLogo" /></dt>
				<dd><span class="f18">♡ </span>{{attentionNum}}<strong>&nbsp;&nbsp;{{shopName}}</strong></dd>
				<dd style=" width:70%">门牌号：<strong>{{houseNumber}}</strong></dd>
			</dl>
		</div>
	</div>
</template>

<script>
	import LF from 'LF';
	export default {
		data() {
			return {
				merchantId: "",
				messageCount: 0,
				shopLogo: '',
				shopName: '',
				houseNumber: '',
				attentionNum: 0

			}
		},
		computed: {},
		methods: {
			getStoreInfo(merchantId) {
				var urlParam = LF.window.getParams();
				console.log(JSON.stringify(urlParam));
				var params = { "merchantId": merchantId };
				var url = "/merchant/shop/info";
				LF.net.getJSON(url, params, res => {
					if(res.code == "000") {
						this.shopLogo = res.data.logo;
						this.houseNumber = res.data.houseNumber;
						this.shopName = res.data.shopName;
					}
				}, function(xhr, type, errorThrown) {
					console.log("error：" + type);
					console.log("errorThrown：" + errorThrown);
				});
			},
			go: function(url) {
				LF.window.openWindow(url);
			},
            goLogout:function(){
                LF.cookie.del("bussAccount");
                LF.cookie.del("bussUserId");
                LF.cookie.del("bussUserName");
                LF.cookie.del("merchantFlag");
                LF.cookie.del("bussTokenId");
                LF.cookie.del("merchantId");
                LF.cookie.del("account");
                LF.cookie.del("userId");
                LF.cookie.del("userName");
                LF.cookie.del("tokenId");
                LF.window.openWindow("/app/login_bz.html","_self");
            },
		},
		beforeMount() {
			console.log("header beforeMount");
			//获取商家ID
			this.merchantId = LF.cookie.get("merchantId");
			if(this.merchantId) {
				LF.net.getJSON("/integral/heaher/bubble/num", { "merchantId": this.merchantId }, res => {
					if(res.code == '000') {
						this.messageCount = res.data.msgNum;	console.log(res.data,555)
					}
				}, function(xhr, type, errorThrown) {
					console.log("error：" + type);
					console.log("errorThrown：" + errorThrown);
				});
				
				this.getStoreInfo(this.merchantId);
			}
		},
		mounted() {
			LF.window.checkBussLogin(true);
		},
		destroyed() {},
		components: {}
	}
</script>
<style>

</style>