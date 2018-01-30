/**
 *
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
//引入element-ui组件
import {
	Loading,
	Pagination,
	Card,
	Switch,
	Tabs,
	TabPane,
	Button,
	Message
} from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Pagination);
Vue.use(Card);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)

var vue = new Vue({
	el: "#app",
	data: {
		activeName: 'first',
		loading: false,
		index: 1,
		msgList:[],
		totalCount:0,
		pager: {
			size: 5,
			curpage: 1,
			total: 0
		},
	},
	methods: {
		handleClick(tab, event) {
			this.index = Number(tab['index'])+1;
			this.getMsgList();
		},
		handleCurrentChange: function(val) {
			this.pager.curpage = val;
			this.getMsgList();
		},
		getMsgList: function() {
			var _this = this;
			this.loading = true;
			//msgType
			//pageSize
			//pageNo
			var param = {
				'msgType': this.index,
				'pageSize': this.pager.size,
				'pageNo': this.pager.curpage
			};
			LF.net.getJSON("integral/message/list", param, res => {
				this.loading = false;
				if (res.code == "000") {
					_this.msgList = res.data.list;
					_this.totalCount = res.data.totalCount;
					_this.pager.total = res.data.totalCount;
				}
			}, res => {
				this.loading = false;
				console.log("查询失败");
			});
		}
	},
	mounted() {
		this.getMsgList();
	},

	components: {
		LfHeader,
		LfFooter,
		LfLeft,
	}
})