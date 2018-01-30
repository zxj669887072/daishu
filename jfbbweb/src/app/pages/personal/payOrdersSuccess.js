import LF from 'LF';
import Vue from 'vue'
//引入公共的header和footer
import LfHeader from '../../../components/header_new.vue';
import LfFooter from '../../../components/footer.vue';
import { Button, Select, Card, Loading,Col,Row,Rate,Progress,Carousel,CarouselItem,Pagination,Tag,Message} from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Rate)
Vue.use(Progress)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tag)

new Vue({
	el: '#app',
	data: {
		orderNo:"",
		oredrAmount : "",
		totalIntegral : ""
	},
	methods: {
		//integral/pay/order/query
		queryPayInfo:function(){
			var _this = this;
			var param = LF.window.getParams();
			var orderId = param['orderId'];
			LF.net.getJSON("integral/pay/order/query", {tokenId:LF.cookie.get("tokenId"),"orderId":orderId}, res => {
				if(res.code === "000"){
					_this.orderNo = res.data.orderNo;
					_this.oredrAmount = res.data.payAmount;
					_this.totalIntegral = res.data.payInter;
				}
			},res=>{});
		}
	},
	mounted(){
		this.queryPayInfo();
	},
	/**
	 * 挂在自己的vue组件，命名驼峰方式
	 * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
	 */
	 components: {
	 	LfHeader,
	 	LfFooter
	 }
	})
