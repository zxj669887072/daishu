import LF from 'LF';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
//引入公共的header和footer
import LfHeader from './../components/header_new.vue';
import LfFooter from './../components/footer.vue';
import LfSearch from './../components/search.vue';
import jQuery from '../js/lib/jquery-1.8.0.min';

import {
  Message,
  Card,
  Carousel,
  CarouselItem,
  Loading
} from 'element-ui'

Vue.use(Card)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Loading);
Vue.use(VueLazyload, {
        error: '../images/error.png',
        loading: '../images/loading-1.gif',
        attempt: 1 

})

new Vue({
  el: '#app',
  data: {
    left: 0,
    searchStr: '',
    //广告图片轮播数据
    advertList: [],
    redPackageInfo:{
      "money":0,
      "moneyLimit":0,
      "endTime":""
    },
    willShow:false,
    load:true
  },
  methods: {
    go(url) {
      if(window.location.host == 'localhost:3000' || window.location.host == '119.23.71.113:82'  || window.location.host == 'www.kangaromall.com' || window.location.host == 'kangaromall.com'){console.log(url,'http://www.kangaromall.com'+url)
          LF.window.openWindow(url,'_self');
      }else if(window.location.host == 'www.lanshanjishi.com' || window.location.host == 'lanshanjishi.com'){
        LF.window.openWindow('http://www.kangaromall.com'+url,'_self');
      }    
    },

    doSearch() {
      if (this.searchStr == '') {
        Message({
          type: 'warning',
          message: "请输入门牌号！"
        });
        return;
      }

      LF.net.getJSON("/store/data/details", {
        houseNumber: this.searchStr
      }, res => {
        if (res.code == "000") {
          let storeId = res.data.id;
          if (storeId == '') {
            Message({
              type: 'warning',
              message: "未找到对应的实体店，请重新输入！"
            });
            return;
          }
          LF.window.openWindow("/app/pages/store/storeshop.html?houseNumber=" + this.searchStr + "&merchantId=" + storeId, "_self");
        } else {
          Message({
            type: 'warning',
            message: "未找到对应的实体店，请重新输入！"
          });
        }
      }, res => {
        Message({
          type: 'error',
          message: res.errorMessage
        });
        console.log("error：" + JSON.stringify(res));
      });
    },
    closeService() {
      var mapEle = document.getElementById("Map");
      var parentEle = mapEle.parentNode;
      parentEle.style.display = "none";
    },
    onlineSale() {
      LF.net.getJSON("sys/after/sale", {}, function(res) {
        var href = "";
        if (res.code === '000') {
          //href = "http://wpa.qq.com/msgrd?v=3&uin="+res.data.qq+"&site=qq&menu=yes";
          href = "tencent://message/?uin=" + res.data.qq + "&Site=qq&Menu=yes"
          window.open(href);
        } else {
          console.log(res.errorMessage);
        }
      });
    },
    goToAdverFun(url) {
      if (url) {
        LF.window.openWindow(url);
      } else {
        url = $('#index_banner_con .banner_menu ul li.hover').find('a').attr('href');
        if (url) {
          LF.window.openWindow(url);
        }
      }
    },
    changeBannerFun(a, b) {
      a = a >= 0 ? a : 0;
      b = b >= 0 ? b : 0;
      // console.log(a,b);
      $('#index_banner_con .banner_menu ul li:eq(' + b + ')').removeClass('hover');
      $('#index_banner_con .banner_menu ul li:eq(' + a + ')').addClass('hover');
    },
    getRedPackgeInfo() {      
      //var param = LF.window.getParams();
      let redId = LF.cookie.get("redId");
      var _this = this;
      if(LF.util.isEmpty(redId) || LF.util.isUndefined(redId)){
        this.willShow = false;
        return false;
      }
      this.willShow = true;
      LF.net.getJSON("member/red/envelope/get", {'redId':redId}, function(res) {
        if (res.code === '000') {
          _this.redPackageInfo = res.data;
          LF.cookie.del("redId");
        }
      },res=>{

      });
    },
    closeRedPackge:function(){
      this.willShow = false;
      LF.cookie.del("redId");
    }
  },
  beforeMount() {},
  mounted() {
    console.log("mounted");
    console.log("初始广告数据");
    LF.net.getJSON("/mkt/advert/list", {
      adType: 3,
      pageSize: 4,
      merchantId: ""
    }, res => {
      if (res.code == "000") {
        this.advertList = res.data.advertList;
        console.log(res.data.advertList, 666); 
      }
    }, res => {
      console.log("error：" + JSON.stringify(res));
    });
    this.getRedPackgeInfo();
    console.log(window.location,999)

  },
  components: {
    LfHeader,
    LfSearch,
    LfFooter
  },
})