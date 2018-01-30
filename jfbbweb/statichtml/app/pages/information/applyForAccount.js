import Vue from 'vue'
import { Button, Select, Card, Loading, Upload,Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, TableColumn,Pagination, Row, Col } from 'element-ui'
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

Vue.use(Upload)

new Vue({
    el: '#app',
    data: {
      active: 0,
      imageUrl: ''
    },
    methods: {
      next() {
        if (this.active++ > 5) this.active = 0;
      },
      handleAvatarScucess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        if (!isLt3M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isLt3M;
      }
    }
})