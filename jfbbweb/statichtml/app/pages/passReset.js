import Vue from 'vue'
import { Button, Select, Card, Loading, Carousel, CarouselItem } from 'element-ui'
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

//Vue.use(ElementUI)

new Vue({
    el: '#app',
    data: {
        fullscreenLoading: false,
        loading2: true
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