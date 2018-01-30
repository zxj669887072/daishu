import Vue from 'vue'
import { Button, Select, Card,Radio, Loading,Col,Row,Carousel,CarouselItem,Pagination,Tabs,TabPane,Option} from 'element-ui'
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
        activeName2:'setails-msg',
        radio:'1',
        options2: [{
          value: '1',
          label: '推荐排序'
        }, {
          value: '2',
          label: '点开来干嘛啊' 
        }],
        value2: '1'
    } 
})