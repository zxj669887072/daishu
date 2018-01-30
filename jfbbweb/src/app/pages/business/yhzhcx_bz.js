import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
import { Button, Select, Card, Radio, Loading, Col, Row, Carousel, CarouselItem, Pagination, Tabs, TabPane, Option } from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Option)

new Vue({
	el: '#app',
	data: {
		merchantId: '',
		accountHolders: '',
		bankKey: '',
		bankName: '',
		bankAccount: '',
		bankOpenName: ''
	},
	methods: {
		getAccountInfo() {
			var params = { "merchantId": this.merchantId };
			var url = "/merchant/bank/info";
			LF.net.getJSON(url, params, res => {
				if (res.code == '000'){
					this.accountHolders = res.data.accountHolders;
					this.bankKey = res.data.bankKey;
					this.bankAccount = res.data.bankAccount;
					this.bankOpenName = res.data.bankOpenName;
					
					LF.net.getJSON("/sys/dict/get", {"type": "bank_key"}, res => {
						if (res.code == '000'){
							res.data.forEach(v=>{
								if(this.bankKey == v.value){
									this.bankName = v.label;
								}
							});
						}
					}, function(xhr, type, errorThrown) {
						console.log("error：" + type);
						console.log("errorThrown：" + errorThrown);
					});
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		}
	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		this.merchantId = LF.cookie.get("merchantId");
		this.getAccountInfo();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})