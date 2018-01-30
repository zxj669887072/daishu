import LF from 'LF';
import Vue from 'vue';
// import LfHeader from '../../../components/header_new.vue';
import LfHeader from './../../../components/header_new.vue';
import LfSearch from '../../../components/search.vue';
import LfFooter from '../../../components/footer.vue';
import LfImgzoom from './../../../components/imgzoom.vue'
import { Button, Select, Card, Radio, Loading, Col, Row, Carousel, CarouselItem, Pagination, Tabs, TabPane, Option, RadioGroup, Message } from 'element-ui'

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
Vue.use(RadioGroup)



new Vue({
    el: '#app',
    data: {
        show:false,
        searchStr: '',
        activeName2: 'store-car',
        radio: '0',
        isConcern: 0,
        load: {
            load1: false,
            loadeval: false
        },
        value2: '1',
        /*
         *商品详情信息
         */
        storeinfo: [],
        storeGoodName:"",
        /**
         * 显示 的大图信息
         */
        storeBigImg: "",
        /**
         * 展示图片的选择
         */
        storelitImgClassIndex: 0,
        /**
         *规格 选择的是乜嘢规格
         */
        storeinfospec: '',
        /**
         * 重量
         */
        storeinfoweight: '',
        /**
         *商品件数控制
         */
        storeqty: { num: 1, qty: '', hasBuy: true, goodsId: '' },
        /**
         *左侧商品推荐  数据
         */
        goodsList: [],
        /**
         *评价
         */
        evalList: '',
        pager: {
            size: 10,
            curpage: 1,
            total: 0
        },
        imgurl: '',
        shareid: '',
        structureName:"",
        structureNo:"",
        childStructureName:"",
        childStructureNo:"",
        houseNumber:"",
        merchantId:""
    },
    methods: {
        doSearch() {
            if (this.searchStr == '') {
                Message({
                    type: 'warning',
                    message: "请输入门牌号！"
                });
                return;
            };

            LF.net.getJSON("/store/data/details", { houseNumber: this.searchStr }, res => {
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
        mainImg: function(item, index) {
            this.storeBigImg = item;
            this.storelitImgClassIndex = index;
        },
        sureSpec: function(item) {
            this.storeinfospec = item;
            this.hasBuy();
        },
        sureWeight: function(item) {
            this.storeinfoweight = item;
            this.hasBuy();
        },
        addNum: function(its) {
          var num = Number(this.storeqty.num);
          its = Number(its);
            if (num + its <= 0) {
                Message({
                    type: 'warning',
                    message: "输入商品数量不得少于1"
                });
            } else if (num + its > this.storeqty.qty) {
                Message({
                    type: 'warning',
                    message: "库存不足"
                });
            } else {
                this.storeqty.num = num + its;
                //this.storeinfo.qty=this.storeqty.qty-this.storeqty.num;
            }
        },
        /**
         *数量的光标移除事件
         */
        blurNum: function() {
            if (this.storeqty.num >= this.storeqty.qty) {
                this.storeqty.num = this.storeqty.qty;
            } else if (this.storeqty.num < 1) {
                this.storeqty.num = 1;
            }
            //this.storeinfo.qty=this.storeqty.qty-this.storeqty.num;
        },
        /**
         *左侧推荐商品列表  跳转
         * @param {Object} item
         */
        goodsTo: function(item) {
            LF.window.openWindow("storedetails.html?goodsId=" + item.id);
        },
        /**
         *添加到购物车
         */
        addToCars: function(number) {console.log(number);
            this.hasBuy();
            var _this = this;
            if (this.storeqty.hasBuy) {
                if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
                    LF.window.openWindow("/app/pages/store/storedetails.html?goodsId=" + _this.storeqty.goodsId+"&number="+number, "_self", true);
                    // LF.window.openWindow('storedetails',"/app/login.html","_self");
                } else {
                    LF.net.getJSON("/shopping/cart/add", {
                        tokenId: LF.cookie.get("tokenId"),
                        goodsId: _this.storeqty.goodsId,
                        qty: _this.storeqty.num,
                        spec: _this.storeinfospec,
                        shareId: _this.shareid
                    }, res => {
                        if (res.code == "000") {
                            Message({
                                type: 'info',
                                message: "添加购物车成功"
                            });
                            _this.$refs.header.getBubble();
                        }
                    }, res => {
                        console.log("error：" + JSON.stringify(res));
                    });
                }

            }
        },
        /**
         *立即购买
         */
        buyShop: function(number) {           
            this.hasBuy();
            var _this = this;
            if (this.storeqty.hasBuy) {
                if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
                    LF.window.openWindow("/app/pages/store/storedetails.html?goodsId=" + _this.storeqty.goodsId+"&number="+number, "_self", true);
                } else {
                    /*LF.net.getJSON("/shopping/cart/add", {
                        tokenId: LF.cookie.get("tokenId"),
                        goodsId: _this.storeqty.goodsId,
                        qty: _this.storeqty.num,
                        spec: _this.storeinfospec,
                        shareId: _this.shareid
                   }, res => {*/
                       // if (res.code == "000") {
                            var good = _this.storeqty.goodsId + ":" + _this.storeqty.num + ":" + _this.storeinfospec;
                            LF.window.openWindow("/app/pages/shopping/shoppingbuy.html?goods=" + good, "_self");
                        //}
                   // }, res => {
                        console.log("error：" + JSON.stringify(res));
                   // });
                }

            }
        },
        /**
         *判断是否可以购买
         */
        hasBuy: function() {
            var res = true;
            if (this.storeinfospec == '') {
                res = false;
            }
            if (this.storeinfo.weight > 0 && this.storeinfoweight == '') {
                res = false;
            }
            this.storeqty.hasBuy = res;
        },
        /**
         *评价
         * @param {Object} no
         * @param {Object} pagesize
         */
        getevalList: function() {
            var _par = LF.window.getParams();
            var _this = this;
            var param = { goodsId: _par.goodsId, pageSize: _this.pager.size, pageNo: _this.pager.curpage };
            if (this.radio != null && this.radio != '0') {
                param['evaType'] = this.radio;
            }
            _this.load.loadeval = true;
            LF.net.getJSON("/goods/details/eval/list", param, res => {
                if (res.code == "000") {
                    _this.load.loadeval = false;
                    _this.pager.total = res.data.totalCount;
                    this.evalList = res.data;
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         *评价分页
         * @param {Object} val
         */
        handleCurrentChange: function(val) {
            this.pager.curpage = val;
            this.getevalList();
        },
        /**
         *跳到第几页
         */
        changeeva: function() {
            this.pager.curpage = 1;
            this.getevalList();
        },
        getImg: function() {
            LF.net.getJSON("/member/dist/share/goodsurl", { goodsId: this.storeqty.goodsId }, res => {
                if (res.code == "000") {
                    this.imgurl = res.data;
                    this.shareid = res.data.goodsUrl.split("shareId=")[1];
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        goShopList(structureNo, structureName, childstructureName,parentId) {
            if(childstructureName){
                LF.window.openWindow(encodeURI("/app/pages/list.html?structureNo=" + structureNo + "&structureName=" + structureName + "&childstructureName=" + childstructureName + "&parentId=" + parentId));
            }else{
                LF.window.openWindow(encodeURI("/app/pages/list.html?structureNo=" + structureNo + "&structureName=" + structureName + "&parentId=" + parentId ));
            }
        },
        /**
         * [followStore description] 关注商品
         * @param  {[type]} goodsId [商品id]
         * @return {[type]}         [description]
         */
        followStore: function(id) {
            var goodsId = "";
            let params = null;
            if (this.isConcern == 1) {
                Message({
                    message: "您已关注此商品",
                    type: "info"
                });
                return;
            }
            if (id) {
                goodsId = id;
            } else {
                params = LF.window.getParams();
                goodsId = params['goodsId'];
            }
            LF.net.getJSON("follow/store/goods/add", { goodsId: goodsId }, res => {
                if (res.code == "000") {
                    Message({
                        message: "关注成功",
                        type: "success"
                    });
                    this.isConcern = 1;
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        goStoreShop:function(){
            var houseNumber = this.storeinfo['houseNumber'];
            var merchantId = this.storeinfo['merchantId'];
            if(houseNumber &&　merchantId!=0){
                LF.window.openWindow(encodeURI("/app/pages/store/storeshop.html?houseNumber="+houseNumber+"&merchantId="+merchantId));
            }else{
                LF.window.openWindow(encodeURI("/app/pages/goods.html"));
            }
        }
    },
    /*
     *组件挂在完成响应
     */
    mounted() {
        // var browser=navigator.appName;console.log(browser,1,navigator.appCodeName,2,navigator.appVersion,3,navigator.userAgent);alert(navigator.userAgent)        
        
        var _par = LF.window.getParams();
        var _this = this;
        var structureName = "";
        var structureNo = "";
        if (_par == null) {
            _par = {};
        };
        console.log(_par);
        if (_par.goodsId == null) {
            //404
            _par.goodsId = 1;
        };
        if (_par.number == null) {            
           _this.storeqty.num = 1;
        }else{
            _this.storeqty.num = _par.number; 
        };
        /**
         * 商品详细信息
         */
        _this.storeqty.goodsId = _par.goodsId;              
        _this.load.Load1 = true;
        LF.net.getJSON("/goods/details", { goodsId: _par.goodsId }, res => {
            //console.log(res);
            if (res.code == "000") {                console.log(res.data,9999)
                _this.load.Load1 = false;
                res.data.spec = res.data.spec.split("||");
                if (res.data.spec.length == 1) {
                    _this.storeinfospec = res.data.spec[0];
                };
                if (res.data.giftFlag == 1) {
                    _this.show = true;
                };
                _this.storeqty.qty = res.data.qty;                       
                console.log(_this.storeqty,333)
                //res.data.mainUrlList = res.data.mainUrls.split(";");
                _this.storeBigImg = res.data.mainBigUrlList[0];
                _this.storeinfo = res.data;                                     console.log(_this.storeinfo,444)
                document.title = res.data.goodsName+'—袋鼠集市平台';
                _this.isConcern = res.data.isConcern;
                _this.storeGoodName = "";
                if(_this.storeinfo.goodsName.length>18){
                    _this.storeGoodName = _this.storeinfo.goodsName.slice(0,18)+'...';
                }else{
                     _this.storeGoodName = _this.storeinfo.goodsName;
                }
                /**
                 * structureName:"",
        structNo:"",
        childStructureName:"",
        childStructureNo:""
                 */
                structureName = _this.storeinfo.structureName.split(",").filter(function(n){return n});
                structureNo = _this.storeinfo.structureNo.split(",").filter(function(n){return n});
                _this.structureName = structureName[0];
                _this.childStructureName = structureName[1];
                _this.structureNo = structureNo[0];
                _this.childStructureNo = structureNo[1];
                _this.storeinfoweight = res.data.weight;
                //this.advertList = res.data.advertList;
            }
            //console.log(_this.load);
        }, res => {
            console.log("error：" + JSON.stringify(res));
        });
        /**
         * 左侧商品推荐信息
         */
        LF.net.getJSON("/goods/recommend/list", { merchantId: '', structureNo: '' }, res => {
            if (res.code == "000") {
                this.goodsList = res.data.goodsList;
            }
        }, res => {
            console.log("error：" + JSON.stringify(res));
        });
        _this.getevalList();
       // _this.getImg();
    },
    components: {
        LfHeader,
        LfSearch,
        LfFooter,
        LfImgzoom
    }
})
