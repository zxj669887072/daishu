import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue';
import LfList from '../../../components/orderlist.vue';
import {
    Button,
    Select,
    Form,
    FormItem,
    Input,
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
    Dialog,
    TableColumn,
    Table,
    Message,
    MessageBox
} from 'element-ui'

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
Vue.use(Radio)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(TableColumn)
Vue.use(Table)



new Vue({
    el: '#app',
    data: {
        goodinfo: {
            checkd: [],
            checkall: false,
            merchantId: LF.cookie.get("merchantId")
        },
        pager: {
            size: 50,
            curpage: 1,
            total: 0
        },
        newGood: {
            id: "",
            groupName: "",
            sort: ""
        },
        confirmFlag: false,
        dialogClassify: false,
        goodlist: []


    },
    methods: {
        addNew: function() {
            this.newGood = {
                id: "",
                groupName: "",
                sort: ""
            };
            this.dialogClassify = true;
        },
        editgood: function(id, index, groupName) {
            this.newGood.groupName = groupName;
            this.dialogClassify = true;
            this.newGood.id = id;
            this.newGood.sort = index;
        },
        checkall: function() {
            var _this = this;
            if (!_this.goodinfo.checkall) {
                _this.goodinfo.checkd = [];
            } else { //全选哦
                _this.goodinfo.checkd = [];
                var ind = 0;
                _this.goodlist.forEach(function(item) {
                    _this.goodinfo.checkd.push(ind++);
                });
            }
        },
        setSort: function(id, step, callback) {
            var _this = this;
            LF.net.getJSON("merchant/shop/group/sort", {
                "id": id,
                "sort": step
            }, res => {
                if (res.code == "000") {
                    if(callback && typeof callback == 'function'){
                        callback();
                    }else{
                        Message({
                            type: 'success',
                            message: '排序成功',
                            onClose: function() {
                                _this.getGoodList();
                            }
                        });
                    }
                }
            }, res => {
                console.log(JSON.stringify(res));
            });
        },
        /**
         *调整位置  交换js数组
         * @param {Object} step
         * @param {Object} index
         */
        movestep: function(step, index) {
            var _this = this;
            if (step < 0 || step > this.goodlist.length - 1) {
                return;
            } else if (step == 0) {
                _this.goodlist.forEach(function(argGood) {
                    var sort = argGood['sort'];
                    if (sort < index) {
                        sort++;
                    }else if(sort == index){
                        sort = 0;
                    }
                    _this.setSort(argGood['id'], sort);
                });
            } else if (step == _this.goodlist.length - 1) {
                _this.goodlist.forEach(function(argGood) {
                    var sort = argGood['sort'];
                    if (sort > index) {
                        sort--;
                    }else if(sort == index){
                        sort = step;
                    }
                    _this.setSort(argGood['id'], sort);
                });
            } else {
                var good = this.goodlist[step];
                var goodo = this.goodlist[index];
                /* this.goodlist.splice(step, 1, goodo);
                 this.goodlist.splice(index, 1, good);*/
                _this.setSort(goodo.id, step, function() {
                    _this.setSort(good.id, index, function() {
                        Message({
                            type: 'success',
                            message: '排序成功',
                            onClose: function() {
                                _this.getGoodList();
                            }
                        });
                    });
                });
            }
        },
        getGoodList: function() {
            var param = {};
            var _this = this;
            var _par = LF.window.getParams();
            LF.net.getJSON("/merchant/shop/group/list", {
                tokenId: LF.cookie.get("bussTokenId"),
                pageSize: _this.pager.size
            }, res => {
                if (res.code == "000") {
                    console.log(res.data, 147);
                    _this.goodlist = res.data.groupList;
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        deletegood: function(id, index) {
            var self = this;
            MessageBox.confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (id != "" && id != null) {
                    LF.net.getJSON("/merchant/shop/group/delete", {
                        ids: id
                    }, res => {
                        if (res.code == "000") {
                            self.goodlist.forEach(function(argGood) {
                                var sort = argGood['sort'];
                                if (sort > index) {
                                    sort--;
                                }
                                self.setSort(argGood['id'], sort,function(){});
                            });
                            Message({
                                type: 'info',
                                message: "删除成功",
                                onClose: function() {                            
                                    self.getGoodList();
                                }
                            });
                            //self.goodlist.splice(index, 1);
                        } else {
                            Message({
                                type: 'error',
                                message: res.errorMessage
                            });
                        }
                    }, res => {
                        Message({
                            type: 'error：',
                            message: JSON.stringify(res)
                        });
                    });
                }
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        savaClassify: function() {
            var _this = this;
            var sort = _this.newGood.sort || this.goodlist.length;
            if (_this.newGood.groupName == null || _this.newGood.groupName == "") {
                Message({
                    type: 'error',
                    message: "分类名称不能为空"
                });
                return false;
            }
            // if (!/^(?!\d{1,16}$)(?:[a-z\d_]{1,16}|[\u4E00-\u9FA5]{1,8}[a-z\d_]{0,4})$/.test(_this.newGood.groupName)) {
            if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,8}$/.test(_this.newGood.groupName)) {
                Message({
                    type: 'error',
                    message: "不能超过8个字符(不得出现特殊符号)"
                });
                return false;
            };
            _this.confirmFlag = true;
            LF.net.getJSON("/merchant/shop/group/save", {
                merchantId: _this.goodinfo.merchantId,
                groupName: _this.newGood.groupName,
                id: _this.newGood.id,
                sort: sort
            }, res => {
                if (res.code == "000") {
                    Message({
                        type: 'success',
                        message: "保存成功",
                        onClose: function() {
                            _this.dialogClassify = false;
                             _this.confirmFlag = false;
                            _this.getGoodList();
                        }
                    });
                } else {
                    Message({
                        type: 'error',
                        message: "分类名称不能为空"
                    });
                     _this.confirmFlag = false;
                    return false;
                }
            }, res => {
                 _this.confirmFlag = false;
                res = false;
                console.log("error：" + JSON.stringify(res));
            });
        }
    },
    /*
     *组件挂在完成响应
     */
    mounted() {
        this.getGoodList();
    },
    components: {
        LfHeader,
        LfFooter,
        LfLeft,
        LfList
    }
})