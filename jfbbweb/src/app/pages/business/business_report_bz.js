import LF from 'LF';
import Vue from 'vue';
import echarts from '../../../js/lib/echarts.min.js';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
import {
	Button,
	Select,
	Card,
	Radio,
	Loading,
	Col,
	Row,
	Carousel,
	CarouselItem,
	Pagination,
	Tabs,
	TabPane,
	Option,
	DatePicker,
	Message
} from 'element-ui'

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
Vue.use(DatePicker)
new Vue({
	el: '#app',
	data: {
		data: {
			start: '',
			merchantId: LF.cookie.get("merchantId")
		},
		chartData: {
			xAxis: [],
			yAxis: {
				amount: [],
				num: []
			}
		},
		pager: {
			size: 10,
			curpage: 1,
			total: 0
		}
	},
	methods: {
		getReportList: function(type) {			
			var _this = this;
			var param = {
				merchantId: _this.data.merchantId
			};
			_this.chartData = {
				xAxis: [],
				yAxis: {
					amount: [],
					num: []
				}
			};
			param.queryTime = type;
			if(!LF.util.isEmpty(type) && _this.data.start != ''){
				_this.data.start = "";
			}
			if (_this.data.start != '') {
				param['startDate'] = LF.util.formatDate(_this.data.start[0]);
				param['endDate'] = LF.util.formatDate(_this.data.start[1]);
			}
			//if(type!=1 || type!=2 || type!=3){param.queryTime =''}
			//param.start = '';
			//param.queryTime = type;
			//param['merchantId'] = LF.cookie.get("merchantId");
			LF.net.getJSON("merchant/order/statistical", param, res => {
				if (res.code == "000") {
					//_this.chartData = res.data;
					for (var i = 0; i < res.data.length; i++) {
						_this.chartData.xAxis.push(res.data[i]['countDate']);
						_this.chartData.yAxis.amount.push(res.data[i]['amount']);
						_this.chartData.yAxis.num.push(res.data[i]['num']);
					}
					_this.initChart();
				}
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
		},
		initChart: function() {
			var myChart = echarts.init(document.getElementById('main'));
			var _this = this;
			var option = {
				title: {
					//text: '2000-2016年中国汽车销量及增长率'
				},
				tooltip: {
					trigger: 'axis'
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				grid: {
					containLabel: true
				},
				legend: {
					data: ['收入', '销量']
				},
				xAxis: [{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: _this.chartData.xAxis
				}],
				yAxis: [{
					type: 'value',
					name: '销量',
					position: 'right',
					axisLabel: {
						formatter: '{value}'
					}
				}, {
					type: 'value',
					name: '收入',
					position: 'left'
				}],
				series: [{
					name: '销量',
					type: 'line',
					smooth: true,
					symbol: "rectangle",
					symbolSize: 6,
					showAllSymbol: true,
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'top',
						}
					},
					lineStyle: {
						normal: {
							width: 3,
							shadowColor: 'rgba(0,0,0,0.4)',
							shadowBlur: 10,
							shadowOffsetY: 10
						}
					},
					markPoint: {
						data: [{
							type: "max",
							name: "最大值"
						}, {
							type: "min",
							name: "最小值"
						}]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					},
					data: _this.chartData.yAxis.num
				}, {
					name: '收入',
					type: 'bar',
					yAxisIndex: 1,
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					data: _this.chartData.yAxis.amount
				}]
			};
			myChart.setOption(option);
		}
	},
	/*
	 *组件挂在完成响应
	 */
	 mounted() {
	 	this.getReportList("");
	 },
	 components: {
	 	LfHeader,
	 	LfFooter,
	 	LfLeft
	 }
	})