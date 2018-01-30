//工程js框架
import LF from 'LF';
import Vue from 'vue';

//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import {
  Card,
  Loading,
  Rate,
  Form,
  FormItem,
  Input,
  Button,
  Dialog,
  Pagination,
  Carousel,
  CarouselItem,
  Message
} from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(Pagination);

Vue.use(Rate);

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)

new Vue({
  el: '#app',
  data: {
    payWayStr: '',
    tradeWayStr: '',
    orderInfo: [],
    orderDtlList: [],
    orderStatusStr: '',
    loading: false,
    formLabelWidth: '90px',
    formLabelHeight: '35px',
    logisticData: {},
    orderId: '',
    pager: {
      size: 3,
      curpage: 1,
      total: 0
    },
  },
  methods: {
    // go(url) {
    //  LF.window.openWindow(url,"_self");
    // },
    goLogin: function() {
      if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
        LF.window.openWindow("/app/login.html", "_self");
      }
    },
    getOrderInfo(orderId) {
      console.log(123);
      var urlParam = LF.window.getParams();
      console.log(JSON.stringify(urlParam));
      var params = {
        "orderId": orderId
      };
      LF.net.getJSON("/merchant/order/detail", params, res => {
        if (res.code == "000") {
          this.orderInfo = res.data;
          this.orderDtlList = res.data.orderDtlList;
          if (this.orderInfo.orderStatus == 1 && this.orderInfo.payStatus == 1) {
            this.orderStatusStr = '已下单'
          } else if (this.orderInfo.orderStatus == 1 && this.orderInfo.payStatus == 0) {
            this.orderStatusStr = '待付款'
          } else if (this.orderInfo.orderStatus == 2) {
            this.orderStatusStr = '已发货'
          } else if (this.orderInfo.orderStatus == 3) {
            this.orderStatusStr = '已签收'
          } else if (this.orderInfo.orderStatus == 4) {
            this.orderStatusStr = '已完成'
          } else if (this.orderInfo.orderStatus == 5) {
            this.orderStatusStr = '已取消'
          };
          if (this.orderInfo.tradeWay == 0) {
            this.tradeWayStr = '送货上门'
          } else if (this.orderInfo.tradeWay == 1) {
            this.tradeWayStr = '到店自提'
          };
          if (this.orderInfo.payWay == 0) {
            this.payWayStr = '现金支付'
          } else {
            this.payWayStr = '线上支付'
          };
          console.log(this.orderInfo, this.orderDtlList);
          console.log(456);
        }
      }, function(xhr, type, errorThrown) {
        console.log("error：" + type);
        console.log("errorThrown：" + errorThrown);
        console.log(789);
      });
    },
    bindStar: function() {

    },
    goGoodsView: function(goodsId,payWay) {
      if(payWay!="1"){return}
      LF.window.openWindow("/app/pages/store/storedetails.html?goodsId=" + goodsId, "_blank");
    },
  },
  /*
   *组件挂在完成响应
   */
  mounted() {
    var urlParam = LF.window.getParams();
    this.orderId = urlParam.orderId;
    this.getOrderInfo(this.orderId);
    this.goLogin();
    this.bindStar();
  },
  components: {
    LfHead,
    LfLeft,
    LfFooter
  }
})