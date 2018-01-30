import Vue from 'vue'
import { Button, Select, Card, Radio,Loading, Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, TableColumn,Pagination, Row, Col } from 'element-ui'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
//Vue.component(Button.name, Button)
//Vue.component(Select.name, Select)
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
new Vue({
	el: '#app',
	data: {
		fullscreenLoading: false,
		loading2: true,
    radio:'1',
		tableData:[{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
	},
	methods: {
		openFullScreen() {
			this.fullscreenLoading = true;
			setTimeout(() => {
				this.fullscreenLoading = false;
			}, 3000);
		}
	}
})
