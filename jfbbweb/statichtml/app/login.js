import Vue from 'vue'
import { Button, Select, Card, Loading, Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, TableColumn,Pagination, Row, Col,Form,FormItem,Input } from 'element-ui'
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

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
new Vue({
    el: '#app',
    data: {
        ruleForm2:'model'

    },

    methods: {
        openFullScreen() {
            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
            }, 3000);
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
})


