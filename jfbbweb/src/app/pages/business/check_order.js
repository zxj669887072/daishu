import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from   '../../../components/busleft.vue';
import LfList from 	 '../../../components/orderlist.vue';
import { Button, Select,Form,FormItem,Input, Card, Loading,Col,Row,Carousel,CarouselItem,Pagination,Tabs,TabPane,DatePicker,Message} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(DatePicker)

var vue =new Vue({
    el: '#app',
    data: {
    	pager:{
           size:10,
           curpage:1,
           total:0
       },
       data:{
           start:'',
           minAmount:'',
           maxAmount:'',
           merchantId:LF.cookie.get("merchantId")
       },
       listdata:''


   } ,
   methods:{

    	/**
    	 *获取商品列表
    	 */
        getgoodList:function(){console.log(this.data);
         var _this =this ;
         var param ={
            minAmount:_this.data.minAmount,
            maxAmount:_this.data.maxAmount,
            merchantId:_this.data.merchantId
        };

        if(_this.data.start!=''){
            param['startDate']=LF.util.formatDate(_this.data.start[0]);
            param['endDate']=LF.util.formatDate(_this.data.start[1]);
        }
        param['pageSize']=_this.pager.size;
        param['pageNo']=_this.pager.curpage;
        LF.net.getJSON("/merchant/order/check", param, res => {
            if(res.code == "000") {
              _this.pager.total=res.data.totalCount;
              _this.listdata=res.data.list;
          }
      }, function(xhr, type, errorThrown) {
        console.log("error：" + type);
        console.log("errorThrown：" + errorThrown);
    });
    },
    handleCurrentChange:function(val){

    }

},
    /*
     *组件挂在完成响应
     */
     mounted(){
       this.getgoodList();
   },
   components: {
    LfHeader,
    LfFooter,
    LfLeft,
    LfList
}
})