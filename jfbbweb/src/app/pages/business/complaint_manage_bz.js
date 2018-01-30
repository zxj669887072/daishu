import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
import { Button, Select, Card, Radio, Loading, Col, Row, Carousel, CarouselItem, Pagination, Tabs, TabPane, Option,Message } from 'element-ui'

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
		starOptions: [{
			value: '1',
			label: '五星'
		}, {
			value: '2',
			label: '四星'
		}, {
			value: '3',
			label: '三星'
		}, {
			value: '2',
			label: '二星'
		}, {
			value: '1',
			label: '一星'
		}],
		evalOptions: [{
			value: '1',
			label: '好评'
		}, {
			value: '2',
			label: '中评'
		}, {
			value: '3',
			label: '差评'
		}],
		pageSize: 6,
		currentPage: 1,
		totalPage: 0,
		totalCount: 0,
		assessmentList: [],
		merchantId: '',
		star: '',
		eval: '',
		merchantId: '',
		receiveContent: '',
		isShow: false,
		currentId:''
	},
	methods: {
		getAssessmentList() {
			var params = { "merchantId": this.merchantId, "pageNo": this.currentPage, "pageSize": this.pageSize };
			var url = "/merchant/goods/eval/list";
			LF.net.getJSON(url, params, res => {
				this.totalCount = res.data.totalCount;
				res.data.list.forEach(v=>{
					if(v.evaType != ''){
						v.evaType = parseInt(v.evaType);
					}
				});
				this.assessmentList = res.data.list;
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		sizeChange(value) {
			this.pageSize = value;
			this.currentPage = 1;
			this.getAssessmentList();
		},
		currentChange(value) {
			if(this.currentPage != value) {
				this.currentPage = value;
				this.getAssessmentList();
			}
		},
		//删除商品评价
		delAssessment(id) {
			var params = { "id": id };
			var url = "/merchant/goods/eval/del";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.getAssessmentList();
				}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		//评价回复
		doReceive() {
			if(this.receiveContent == ''){
                Message({
                    type: 'info',
                    message:"请输入回复内容！"
                });
				return;
			}
			var params = { "id": this.currentId, "evaContent": LF.util.decToHex(this.receiveContent) };
			var url = "/merchant/goods/eval/replay";
			LF.net.getJSON(url, params, res => {
				if(res.code == "000") {
					this.hideModel();
				}else {
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		showModel(id){
			this.currentId = id;
			this.isShow = true;
		},
		hideModel(){
			this.isShow = false;
		}

	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		var urlParam = LF.window.getParams();
		this.merchantId = urlParam.merchantId;
		this.getAssessmentList();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})