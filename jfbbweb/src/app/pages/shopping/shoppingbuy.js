/**
 * Created by zxh on 2017/3/3 0003.
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/header_new.vue';
import LfSearch from '../../../components/search.vue';
import LfFooter from '../../../components/footer.vue';
//引入element-ui组件
import {
    Card,
    Loading,
    Carousel,
    CarouselItem,
    Radio,
    table,
    TableColumn,
    Select,
    Option,
    Tag,
    Form,
    Cascader,
    FormItem,
    Input,
    CheckboxGroup,
    Checkbox,
    Button,
    Dialog,
    MessageBox,
    Message
} from 'element-ui';
/*
 * 使用element-ui组件
 */
 Vue.use(Loading);
 Vue.use(Card);
 Vue.use(Carousel);
 Vue.use(CarouselItem);
 Vue.use(Radio);
 Vue.use(table);
 Vue.use(TableColumn);
 Vue.use(Select);
 Vue.use(Cascader);
 Vue.use(Option);
 Vue.use(Cascader);
 Vue.use(Form);
 Vue.use(FormItem);
 Vue.use(Input);
 Vue.use(CheckboxGroup);
 Vue.use(Checkbox);
 Vue.use(Button);
 Vue.use(Dialog);
 Vue.use(Tag);
 var vue = new Vue({
    el: "#app",
    data: {
        status: '',
        selectNum: '',
        /**
         * 地址选择
         */
         addressinfo: {
            ishidden: true,
            list: [],
            index: -1,
            searchStr: ""
        },
        isOperate: "",
        receivingAddress: "",
        isIdCard:false,
        userInfo: "",
        searchStr: "",
        /**
         * 运费模块
         */
         freight: {
            list: ''

        },
        load: false,
        /**
         * 购物车列表
         */
         item: {},
         totalAmoun: '',
        //是否全球购 0：否 1：是
        isGlobal: false,
        /**
         * 选择的订单付款方式等
         */
         orderCreate: {
            tradeWay: '0',
            payWay: '1',
            remark: '',
            payInter: 0,
            /** 支付的积分*/
            couponAmount: 0,
            /*优惠金额*/
            onlinePayAmount: '',
            /*线上支付金额*/
            payAmount: 0,
            /*实付总额*/
            tokenId: LF.cookie.get("tokenId"),
            goodsStr: '',
            totalAmount: 0,
            merchantId: '',
            consigneeAddrId: '',
            freightFee: '',
            templateId: '',
            redEnvelopeId: ''
        },
        couponAmount: 0,
        redpacket: '',
        redinfo: {
            show: false,
            choiceindex: ''
        },
        isDefault: false,
        cascaderOptions: [],
        selectedOptions: [],
        id: '',
        addressVisible: false,
        addressForm: {
            consigneeName: '',
            mobilePhone: '',
            telPhone: '',
            province: '',
            city: '',
            district: '',
            detailAddr: '',
            addrs: '',
            defaultFlag: '',
            id: '',
            idCard: "",
            selectedOptions: []
        },
        addressRules: {
            /*addrs: [{
                validator: function(rule, value, callback) {                     
                    var _this = vue._data.addressForm;
                    if (value === '') {
                        callback(new Error('请选择所在地址'));
                    } else {
                        callback();
                    }
                },
                trigger: 'change'
            }],*/
            //addrs: [{ required: true, message: '请选择所在地址', trigger: 'change' }],
            consigneeName: [{
                required: true,
                validator: function(rule, value, callback) {
                    var _this = vue._data.addressForm;
                    //console.log(_this.age.split(""))
                    if (value === '') {
                        callback(new Error('请输入名字'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            }],
            idCard: [{
                required: true,
                validator: function(rule, value, callback) {
                    //身份证正则
                    var reg =  /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
                    setTimeout(() => {
                        if (value == '') {
                            callback(new Error('请输入身份证号'));
                        } else if (!/^[0-9]+$/.test(value)) {
                            callback(new Error('请输入数字值'));
                        } else if (!reg.test(value)) {
                            callback(new Error('身份证号格式错误'));
                        } else {
                            callback();
                        }
                    }, 100);
                },
                trigger: 'blur'
            }],
            mobilePhone: [{
                required: true,
                validator: function(rule, value, callback) {
                    var _this = vue._data.addressForm;
                    if (!value) {
                        if (_this.telPhone === '') {
                            return callback(new Error('手机号码和电话号码至少填写一个'));
                        } else {
                            callback();
                        }
                    } else {
                        if (!/^[0-9]+$/.test(value)) {
                            callback(new Error('请输入数字值'));
                        } else {
                            if ((/^1[34578]\d{9}$/.test(value))) {
                                callback();
                            } else {
                                callback(new Error('请输入正确的手机号码'));
                            }
                        }
                    }
                },
                trigger: 'blur'
            }],
            telPhone: [{
                validator: function(rule, value, callback) {
                    var _this = vue._data.addressForm;
                    if (!value) {
                        if (_this.mobilePhone === '') {
                            return callback(new Error('手机号码和电话号码至少填写一个'));
                        } else {
                            callback();
                        }
                    } else {
                        if (!/^[0-9]+$/.test(value)) {
                            callback(new Error('请输入数字值'));
                        } else {
                            if ((/^[1-9]\d{6,7}$/.test(value)) || (/^1[34578]\d{9}$/.test(value))) {
                                callback();
                            } else {
                                callback(new Error('请输入正确的手机号码'));
                            }
                        }
                    }
                    // if (!value) {
                    //   return callback(new Error('手机号码不能为空'));
                    // }
                    //   if (!/^[0-9]+$/.test(value)) {
                    //     callback(new Error('请输入数字值'));
                    //   } else {
                    //     if ((/^1[34578]\d{9}$/.test(value))) {
                    //       callback();
                    //     } else {
                    //       callback(new Error('请输入正确的手机号码'));
                    //     }
                    //   }
                },
                trigger: 'blur'
            }],
            detailAddr: [{
                required: true,
                validator: function(rule, value, callback) {
                    var _this = vue._data.addressForm;
                    //console.log(_this.age.split(""))
                    if (value.length < 6) {
                        callback(new Error('请输入正确的街道地址'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            }],
        }
    },
    methods: {
        handleChange(value) {
            console.log(value);
            var _this = vue._data.addressForm;
            _this.province = value[0];
            _this.city = value[1];
            _this.district = value[2];
        },
        /**
         * 加载三级数据
         */
         cascaderSetdateList: function(pid) {
            var self = this;
            // let loadingInstance = Loading.service({});
            LF.net.getJSON("sys/area/list", {}, function(res) {
                // loadingInstance.close();
                if (res.code === '000') {
                    var list = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].type == 2) {
                            list.push({
                                value: res.data[i].id,
                                label: res.data[i].name,
                                children: []
                            });
                            //cascaderOptions.push({value:res.data.id,label:res.data.name,children:[]});
                        }
                    }
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].type == 3) {
                            for (var j = 0; j < list.length; j++) {
                                if (res.data[i].parentId == list[j].value) {
                                    list[j].children.push({
                                        value: res.data[i].id,
                                        label: res.data[i].name,
                                        children: []
                                    })
                                }
                            }
                        }
                    }
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].type == 4) {
                            for (var j = 0; j < list.length; j++) {
                                for (var k = 0; k < list[j].children.length; k++) {
                                    if (res.data[i].parentId == list[j].children[k].value) {
                                        list[j].children[k].children.push({
                                            value: res.data[i].id,
                                            label: res.data[i].name
                                        })
                                    }
                                }

                            }
                        }
                    }
                    self.cascaderOptions = list;
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            }, function(res) {
                console.log("error：" + JSON.stringify(res));
            });
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
        addaddress: function(url) {
            LF.window.openWindow(url);
            var _this = this;
            var t = setInterval(function() {
                LF.net.getJSON("/member/consignee/addr/list", {
                    tokenId: LF.cookie.get("tokenId")
                }, res => {
                    if (res.code == "000") {
                        if (res.data.list.length > 0) {
                            var flag = 0,
                            addressInfo = null;
                            for (var i = 0; i < res.data.list.length; i++) {
                                addressInfo = res.data.list[i];
                                if (addressInfo.defaultFlag == 1) {
                                    flag = i;
                                    break;
                                }
                            }
                            var good = res.data.list[0];
                            var goodo = res.data.list[flag];
                            res.data.list.splice(0, 1, goodo);
                            res.data.list.splice(flag, 1, good);
                            _this.addressinfo.list = res.data.list;
                            _this.orderCreate.consigneeAddrId = res.data.list[0].id;
                            _this.figureFee();
                            clearInterval(t);
                        }
                    }
                }, res => {
                    console.log("error：" + JSON.stringify(res));
                });
            }, 4000);

        },
        /**
         * 获取运费模板
         */
         getFreightTemp: function() {
            var _this = this;
            LF.net.getJSON("/member/order/freight/list", {
                merchantId: this.item.merchantId
            }, res => {
                if (res.code == "000") {
                    _this.freight.list = res.data.templateList;
                    _this.orderCreate.templateId = res.data.templateList[0].templateId;
                    console.log(_this.freight.list);
                    if (_this.orderCreate.consigneeAddrId != '') {
                        _this.figureFee();
                    }
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 计算运费  需要有收获地址
         */
         figureFee: function() {
            var _this = this;
            var str = "";
            if (_this.item.goodsList != null) {
                _this.item.goodsList.forEach(function(its) {
                    str += its.id + ":" + its.qty + ":" + its.spec + ";"
                });
            }

            if (_this.orderCreate.consigneeAddrId == '') {
                Message({
                    type: 'warning',
                    message: "请选择收货地址"
                });
            } else {
                LF.net.getJSON("/member/order/freight/fee", {
                    goodsStr: str,
                    merchantId: _this.item.merchantId,
                    consigneeAddrId: _this.orderCreate.consigneeAddrId,
                    templateId: _this.orderCreate.templateId
                }, res => {
                    if (res.code == "000") {
                        console.log(res)
                        if (res.data == '') {
                            _this.orderCreate.freightFee = 0;
                        } else {
                            _this.orderCreate.freightFee = res.data.freightFee;
                        }
                    }
                }, res => {
                    console.log("error：" + JSON.stringify(res));
                });
            }

        },

        /**
         * 选择收货地址
         * @param {Object} ind
         */
         choiceAddress: function(ind) {
            var addressInfo = null;
            this.addressinfo.index = ind;
            this.orderCreate.consigneeAddrId = this.addressinfo.list[ind].id;
            addressInfo = this.addressinfo.list[ind];
            this.receivingAddress = addressInfo.provinceName + " " + addressInfo.cityName + " " + addressInfo.districtName + " " + addressInfo.detailAddr;
            this.userInfo = addressInfo.consigneeName + " " + addressInfo.mobilePhone;
            this.isIdCard = addressInfo.identityCard;
            if(this.isGlobal && this.isIdCard.length==0){
                this.editReceiverAddress(this.orderCreate.consigneeAddrId);
            }
        },
        /**
         * 积分
         */
         changeJf: function() {
            if (this.item.integralBal < this.orderCreate.payInter) {
                this.orderCreate.payInter = this.item.integralBal;
            } else if (this.orderCreate.payInter < 0) {
                this.orderCreate.payInter = 0;
            }
        },
        goCars: function(url) {
            LF.window.openWindow(url, "_self");
        },
        /**
         * 下单
         */
         createOrde: function() {
            var _this = this;
            var str = '';
            if(this.isGlobal && this.isIdCard.length == 0){
                Message({
                    type:"error",
                    message:"您尚未完善身份证信息，请完善后提交。"
                });
                return;
            }
            _this.item.goodsList.forEach(function(its) {
                str += its.id + ":" + its.qty + ":" + its.spec + ";"
            });
            str = str.substring(0, str.lastIndexOf(";"));
            _this.orderCreate.goodsStr = str;
            _this.orderCreate.merchantId = _this.item.merchantId;

            var pars = {
                tradeWay: '0',
                payWay: '1',
                remark: '',
                payInter: 0,
                /** 支付的积分*/
                couponAmount: 0,
                /*优惠金额*/
                onlinePayAmount: '',
                /*线上支付金额*/
                payAmount: 0,
                /*实付总额*/
                tokenId: LF.cookie.get("tokenId"),
                goodsStr: '',
                totalAmount: 0,
                merchantId: '',
                consigneeAddrId: ''
            }
                //  ;
            if (_this.redinfo.choiceindex !== '' && _this.redinfo.show) { //选择的红包的钱  优惠的钱哟
                console.log(_this.redpacket.list[_this.redinfo.choiceindex].money, 'red')
                    // pars.couponAmount = _this.redpacket.list[_this.redinfo.choiceindex].money;
                    // _this.orderCreate['couponAmount'] = pars.couponAmount;
                    _this.orderCreate['couponAmount'] = Number(this.couponAmount);
                    _this.orderCreate.redEnvelopeId = _this.redpacket.list[_this.redinfo.choiceindex].recId;
                }else{
                     _this.orderCreate['couponAmount'] = 0;
                    _this.orderCreate.redEnvelopeId = '';
                }
                _this.orderCreate.onlinePayAmount = _this.item.totalPrice - _this.orderCreate.couponAmount;
                _this.orderCreate.payAmount = _this.orderCreate.onlinePayAmount;
                console.log(_this.orderCreate.onlinePayAmount, _this.orderCreate.payAmount, _this.orderCreate.couponAmount)
                // _this.orderCreate.totalAmount = _this.orderCreate.couponAmount + _this.orderCreate.payAmount;
                _this.orderCreate.totalAmount = this.totalAmount;

            //          pars.remark=LF.util.decToHex(pars.remark);
            //          console.log(pars);
            if (_this.orderCreate.consigneeAddrId == '') {
                Message({
                    type: 'warning',
                    message: "请选择收货地址"
                });
            } else {
                console.log(_this.orderCreate);
                LF.net.getJSON("/member/order/create", _this.orderCreate, res => {
                    if (res.code == "000") {
                        console.log(res.data);
                        LF.window.openWindow("/app/pages/shopping/shopPayCost.html?order=" + res.data.orderId + "&&isPayPassword=" + res.data.isPayPassword, "_self"); //res.data.orderNo
                    }
                }, res => {
                    console.log("error：" + JSON.stringify(res));
                });
            }
        },
        /**
         * 获取红包信息
         */
         getRedPacket: function() {
            var _this = this;
            LF.net.getJSON("/member/red/envelope/list", {
                tokenId: LF.cookie.get("tokenId")
            }, res => {
                if (res.code == "000") {
                    console.log(res.data);
                    _this.redpacket = {
                        list: []
                    };
                    res.data.list.forEach(function(item) {
                        if (item.status == 0) {
                            console.log(1, item)
                            _this.redpacket.list.push(item);
                            _this.status = 0;
                        }
                    });
                    /*-------------------------------------------------------------------------------------------------------*/
                    // _this.redpacket.list.push({money:88.66,endTime:"2017-05-28 23:59:59",redEnvelopeId:123,moneyLimit:0.95},{money:200,endTime:"2017-06-28 23:59:59",redEnvelopeId:124,moneyLimit:0.85});
                    console.log(_this.redpacket, 12369)
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        show: function() {
            this.redinfo.show = !this.redinfo.show;
            if (this.redinfo.show == false) {
                this.redinfo.choiceindex = '';
                this.couponAmount = 0;
            }
        },
        choisered: function(currentRow, limit) {
            console.log(currentRow, limit, this.totalAmount)
            if ((100 - limit * 100) / 100 * this.totalAmount >= this.redpacket.list[currentRow].money) {
                this.couponAmount = this.redpacket.list[currentRow].money;
            } else {
                this.couponAmount = ((100 - limit * 100) / 100 * this.totalAmount).toFixed(2);
            };
            this.redinfo.choiceindex = currentRow;
            // this.couponAmount = this.redpacket.list[currentRow].money;
            // console.log(this.redinfo.choiceindex)
        },
        /*
         *获取收货地址
         */
         getaddr: function() {
            var _this = this;
            LF.net.getJSON("/member/consignee/addr/list", {
                tokenId: LF.cookie.get("tokenId")
            }, res => {
                if (res.code == "000") {
                    if (res.data.list.length > 0) {
                        var flag = -1;
                        var addressInfo = null;
                        for (var i = 0; i < res.data.list.length; i++) {
                            addressInfo = res.data.list[i];
                            if (addressInfo.defaultFlag == 1) {
                                _this.receivingAddress = addressInfo.provinceName + " " + addressInfo.cityName + " " + addressInfo.districtName + " " + addressInfo.detailAddr;
                                _this.userInfo = addressInfo.consigneeName + " " + addressInfo.mobilePhone;
                                this.idCard = addressInfo.identityCard;
                                flag = i;
                                if(_this.isGlobal && addressInfo.identityCard.length == 0){
                                    _this.editReceiverAddress(addressInfo.id);
                                    _this.addressVisible = true;
                                }else{
                                    _this.addressVisible = false;
                                }
                                break;
                            }
                        }
                        this.addressinfo.list = res.data.list;
                        if(flag>=0){
                            var good = res.data.list[0];
                            var goodo = res.data.list[flag];
                            res.data.list.splice(0, 1, goodo);
                            res.data.list.splice(flag, 1, good);
                            this.orderCreate.consigneeAddrId = res.data.list[0].id;
                        }
                        this.figureFee();
                    }
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        setDefaultReceiverAddress: function(id) {
            //member/consignee/addr/setDefault
            var _this = this;
            LF.net.getJSON("/member/consignee/addr/setDefault", {
                id: id
            }, res => {
                if (res.code == "000") {
                    _this.getaddr();
                    Message({
                        type: "success",
                        message: "设置默认收货地址成功",
                        onClose: function() {
                            _this.choiceAddress(0);
                        }
                    });
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        removeReceiverAddress: function(id) {
            //member/consignee/addr/del
            var _this = this;
            LF.net.getJSON("/member/consignee/addr/del", {
                id: id
            }, res => {
                if (res.code == "000") {
                    Message({
                        type: "success",
                        message: "删除收货地址成功",
                        onClose: function() {
                            _this.getaddr();
                        }
                    });
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        },
        addReceiverAddress: function() {
            var _this = this;
            _this.addressVisible = true;
            if(_this.isGlobal){
                MessageBox.alert('因全球购商品涉及入境清关，根据海关规定，需要您完善当前收货人身份证信息。若信息不正确、不真实，会导致订单清关失败，无法发货。袋鼠集市全球购承诺严格保密您的个人信息','提示',
                {
                    confirmButtonText: '确定',
                    type:'info'
                });
            }
            //_this.cascaderSetdateList();
            _this.addressForm = {
                consigneeName: '',
                mobilePhone: '',
                telPhone: '',
                province: '',
                city: '',
                district: '',
                detailAddr: '',
                addrs: '',
                defaultFlag: '',
                id: '',
                idCard:'',
                selectedOptions: []
            };
        },
        submitReceiverAddress: function(formName) {
            var _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    var formData = this.addressForm;
                    var param = {
                        consigneeName: formData.consigneeName,
                        mobilePhone: formData.mobilePhone,
                        province: formData.province,
                        city: formData.city,
                        district: formData.district,
                        detailAddr: formData.detailAddr,
                        telephone: formData.telPhone
                    }
                    if(_this.isGlobal){
                        param.identityCard = formData.idCard;
                    }
                    if (formData.defaultFlag) {
                        param["defaultFlag"] = 1;
                    } else {
                        param["defaultFlag"] = 0;
                    }
                    var id = formData['id'];
                    if (LF.util.isEmpty(id) || LF.util.isUndefined(id)) {
                        LF.net.getJSON("member/consignee/addr/add", param, res => {
                            if (res.code == "000") {
                                Message({
                                    type: "success",
                                    message: "保存成功",
                                    onClose: function() {
                                        _this.addressVisible = false;
                                        _this.getaddr();
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: res.errorMessage
                                });
                            }
                        }, res => {
                            console.log("error：" + JSON.stringify(res));
                        });
                    } else {
                        param['id'] = formData['id'];
                        LF.net.getJSON("member/consignee/addr/update", param, res => {
                            if (res.code == "000") {
                                Message({
                                    type: "success",
                                    message: "修改成功",
                                    onClose: function() {
                                        _this.addressVisible = false;
                                        _this.getaddr();
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: res.errorMessage
                                });
                            }
                        }, res => {
                            console.log("error：" + JSON.stringify(res));
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editReceiverAddress: function(id) {
            //member/consignee/addr/get
            var _this = this;
            var data = null;
            this.addressVisible = true;
            if(this.isGlobal){
                MessageBox.alert('因全球购商品涉及入境清关，根据海关规定，需要您完善当前收货人身份证信息。若信息不正确、不真实，会导致订单清关失败，无法发货。袋鼠集市全球购承诺严格保密您的个人信息','提示',
                {
                    confirmButtonText: '确定',
                    type:'info'
                });
            }
            //_this.cascaderSetdateList();
            let loadingInstance = Loading.service({
                'target': document.getElementById("addressVisible"),
                'text': '数据正在加载中...'
            });
            LF.net.getJSON("/member/consignee/addr/get", {
                id: id
            }, res => {
                loadingInstance.close();
                if (res.code == "000") {
                    data = res.data;
                    _this.addressForm = {
                        consigneeName: data.consigneeName,
                        mobilePhone: data.mobilePhone,
                        telPhone: data.telephone,
                        province: data.province,
                        city: data.city,
                        district: data.district,
                        detailAddr: data.detailAddr,
                        defaultFlag: data.defaultFlag,
                        id: data.id,
                        selectedOptions: [data.province, data.city, data.district]
                    }
                    if(data.identityCard){
                       _this.addressForm.idCard = data.identityCard;
                   }
                        //_this.selectedOptions=[data.province,data.city,data.district];
                        if (Number(data.defaultFlag)) {
                            _this.addressForm.defaultFlag = true;
                        } else {
                            _this.addressForm.defaultFlag = false;
                        }
                    }
                }, res => {
                    console.log("error：" + JSON.stringify(res));
                });
        }
    },
    /**
     * 完成之后响应  初始化
     */
     mounted() {
        var param = LF.window.getParams();
        var _this = this;
        if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
            LF.window.openWindow("/app/login.html", "_self");
        } else {
            //购物车列表
            _this.load = true;
            LF.net.getJSON("/shopping/cart/affirm/page", {
                tokenId: LF.cookie.get("tokenId"),
                goodsIdStr: param.goods
            }, res => {
                _this.load = false;
                if (res.code == "000") {
                    this.item = res.data;
                    this.totalAmount = res.data.totalPrice;
                    //res.data.isGlobal = '1';
                    if (res.data.isGlobal == '0') {
                        _this.isGlobal = false;
                    } else {
                        _this.isGlobal = true;
                    }
                    _this.getaddr();
                    _this.getFreightTemp();
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                    return;
                }
            }, res => {
                _this.load = false;
                LF.window.openWindow("/app/index.html", "_self");
                console.log("error：" + JSON.stringify(res));
            });
            _this.getRedPacket();
        }
        _this.cascaderSetdateList();
    },

    components: {
        LfHeader,
        LfSearch,
        LfFooter
    }
})