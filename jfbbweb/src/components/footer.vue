<style rel="stylesheet/scss" lang="scss" scoped>
/*fooder*/

.abs-bottom{
	position: absolute;
	bottom:0;
	width:100%;
}
.clearfix:after{content:'';display: block;clear: both;height: 0;}
</style>
<template>
	<div class="fooder" id="footer" style="position: relative;">
		<div class="w1000 clearfix" style="width:1200px;">
			<dl>
				<dt>关于我们</dt>
				<dd>
					<a href="/app/pages/about/help-center.html#关于蓝山集势 " target="_self" @click='goHelpCenter("关于蓝山集势")'>关于蓝山集势</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#经营理念" target="_self" @click='goHelpCenter("经营理念")'>经营理念</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#招贤纳士" target="_self" @click='goHelpCenter("招贤纳士")'>招贤纳士</a>
				</dd>
			</dl>
			<dl>
				<dt>袋鼠集市</dt>
				<dd>
					<a href="/app/pages/about/help-center.html#关于袋鼠集市" @click='goHelpCenter("关于袋鼠集市")'>关于袋鼠集市</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#通用积分" @click='goHelpCenter("通用积分")'>通用积分</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#了解积分" @click='goHelpCenter("了解积分")'>了解积分</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#积分规则" @click='goHelpCenter("积分规则")'>积分规则</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#会员分享消费" @click='goHelpCenter("会员分享消费")'>会员分享消费</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#商家入驻" @click='goHelpCenter("商家入驻")'>商家入驻</a>
				</dd>
			</dl>
			<dl>
				<dt>合作推广</dt>
				<dd>
					<a href="/app/pages/about/help-center.html#用户" @click='goHelpCenter("用户")'>用户</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#分销会员" @click='goHelpCenter("分销会员")'>分销会员</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#商户" @click='goHelpCenter("商户")'>商户</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#运营中心" @click='goHelpCenter("运营中心")'>运营中心</a>
				</dd>
			</dl>
			<dl>
				<dt>意见反馈</dt>
				<dd>
					<a href="/app/pages/about/help-center.html#意见建议" @click='goHelpCenter("意见建议")'>意见建议</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#用户注册协议" @click='goHelpCenter("用户注册协议")'>用户注册协议</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#隐私政策" @click='goHelpCenter("隐私政策")'>隐私政策</a>
				</dd>
			</dl>
			<dl>
				<dt>联系我们</dt>
				<dd>
					<a href="/app/pages/about/help-center.html#联系我们" @click='goHelpCenter("联系我们")'>联系我们</a>
				</dd>
				<dd>
					<a href="/app/pages/about/help-center.html#客服服务" @click='goHelpCenter("客服服务")'>客服服务</a>
				</dd>
			</dl>
			<div class="right">
				<div class="wechat left" style="height:131px;position: relative;">
					<img src="../images/wechat.png" height="110"  width="115"/>
					<p style="text-align: center;color:#000;font:12px bold;margin-top:-2px;width: 115px;position: absolute;bottom:0; ">微信公众号</p>
				</div>
				<div class="left" style="height:131px;position: relative;">
						<img src="../images/app_download.png" style="margin: 0 0 0 15px;" height="110"  width="115"/>
						<p style="text-align: center;color:#000;font:12px bold;margin-top:-2px;margin-left:15px;position: absolute;bottom:0; width:115px">袋鼠集市下载</p>
				</div>
				<div class="left" style="height:131px;position: relative;">
						<div style="width:115px;height:105px;padding:5px;"><img src="../images/jifen.png" style="margin: 0 0 0 15px;" height="100"  width="105"/></div>
						<p style="text-align: center;color:#000;font:12px bold;position: absolute;bottom:0; left:20px;width:105px">袋鼠管家下载</p>
				</div>
			</div>
		</div>
		<h1 style="border-top:1px solid #ccc;width: 100%;"></h1>
		<div class="w1000 " style="clear: both;text-align: center;padding:20px 0;width:1200px;">
			<div style="/* border-top: 1px solid #ccc; */ padding-top: 20px;width: 90%; margin: auto;" @click='goHelpCenter("客服服务")' >深圳蓝山集势网络科技有限公司 版权所有
			</div>
			<div style=" width: 90%; margin: auto;"><a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备17047141号</a></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data() {
			return {}
		},
		computed: {},
		methods: {
			goHelpCenter: function(name){
				console.log(name);
				window.open(" /app/pages/about/help-center.html#" + name,"_self");
				location.reload();
			}
		},
		mounted() {
		},
		destroyed() {},
		components: {}
	}
</script>