//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
import hex_md5 from './../../../js/framework/md5.js';

//引入element-ui组件
import {
    Button,
    Select,
    Card,
    Loading,
    Carousel,
    CarouselItem,
    Steps,
    Step,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Pagination,
    Row,
    Col,
    Form,
    FormItem,
    Input,
    CheckboxGroup,
    Checkbox,
    Option,
    Message
} from 'element-ui'
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

Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Option)
var vue = new Vue({
    el: '#app',
    data: {
        idCardDesc: '',
        phone: '',
        delId: '',
        isRZ: true,
        isEmpty: false,
        isChange: false,
        codeDesc: "发送验证码",
        sou: true,
        bankList: [],
        bankInfos: [],
        ruleForm2: {
            idCard: '',
            realName: '',
            securityCode: '',
            bankAccount: '',
            bankKey: '',
            bankOpenName: ''
        },
        rules2: {
            idCard: [{
                validator: function(rule, value, callback) {
                    setTimeout(() => {
                        //身份证正则
                        var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
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
            bankAccount: [{
                validator: function(rule, value, callback) {
                    setTimeout(() => {
                        if (value == '') {
                            callback(new Error('请输入银行卡号'));
                        } else if (!/^[0-9]+$/.test(value)) {
                            callback(new Error('请输入数字值'));
                        } else if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
                            callback(new Error('请输入正确的银行账号'));
                        } else {
                            callback();
                        }
                    }, 100);
                },
                trigger: 'blur'
            }],
            bankKey: [{
                validator: function(rule, value, callback) {
                    setTimeout(() => {
                        if (value == '') {
                            callback(new Error('请选择所属银行'));
                        } else {
                            callback();
                        }
                    }, 100);
                },
                trigger: 'blur'
            }],
            bankOpenName: [{
                validator: function(rule, value, callback) {
                    setTimeout(() => {
                        if (value == '') {
                            callback(new Error('请输入开户行'));
                        } else {
                            callback();
                        }
                    }, 100);
                },
                trigger: 'blur'
            }],
            realName: [{
                validator: function(rule, value, callback) {
                    setTimeout(() => {
                        if (value == '') {
                            callback(new Error('请输入真实姓名'));
                        } else {
                            callback();
                        }
                    }, 100);
                },
                trigger: 'blur'
            }],
            securityCode: [{
                validator: function(rule, value, callback) {
                    if (value === '') {
                        callback(new Error('请输入验证码'));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            }]
        }
    },
    methods: {
        go(url) {
            LF.window.openWindow(url);
        },
        goLogin: function() {
            if (LF.cookie.get("tokenId") == null || LF.cookie.get("tokenId") == '') {
                LF.window.openWindow("/app/login.html", "_self");
            }
        },
        getyzm() {
            // if(this.ruleForm2.idCard==''  ||  this.ruleForm2.realName==''   ||  this.ruleForm2.bankAccount==''  ||  this.ruleForm2.bankKey==''){
            //                Message({
            //                            type: 'error',
            //                            message:'请输入有效信息后再获取验证码'
            //              });
            //                return;
            // }else 
            // if(!/^([1-9]{1})(\d{15}|\d{18})$/.test(this.ruleForm2.bankAccount)){
            //              Message({
            //                            type: 'error',
            //                            message:'银行卡号输入不正确'
            //              });
            //               return; 
            // };
            var _this = this;
            LF.net.getJSON("/integral/sms/send", {
                tokenId: LF.cookie.get("tokenId"),
                type: 5,
                phone: LF.cookie.get("account")
            }, function(res) {
                if (res.code === '000') {
                    _this.codeDesc = 60;
                    _this.sou = false;
                    var my_interval = setInterval(function() {
                        if (_this.codeDesc >= 1) {
                            _this.codeDesc -= 1;
                        } else {
                            _this.sou = true;
                            _this.codeDesc = "验证码";
                            clearInterval(my_interval);
                        }
                    }, 1000);
                    Message({
                        type: 'info',
                        message: "验证码已发送"
                    });
                } else {
                    _this.sou = true;
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            })
        },
        submitRz: function() {
            if (this.ruleForm2.idCard == '' || this.ruleForm2.realName == '' || this.ruleForm2.securityCode == '') {
                return;
            };
            var self = this;
            LF.net.getJSON("/member/realname/auth", {
                tokenId: LF.cookie.get("tokenId"),
                realName: this.ruleForm2.realName,
                idCard: this.ruleForm2.idCard,
                securityCode: this.ruleForm2.securityCode
            }, function(res) {
                if (res.code === '000') {
                    location.reload();
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            })
        },
        getBankList: function() {
            var self = this;
            LF.net.getJSON("/sys/dict/get", {
                tokenId: LF.cookie.get("tokenId"),
                type: "bank_key"
            }, function(res) {
                if (res.code === '000') {
                    self.bankList = res.data;
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            })
        },
        getPersonalInfo: function() {
            var self = this;
            LF.net.getJSON("/integral/user/info", {
                tokenId: LF.cookie.get("tokenId")
            }, function(res) {
                if (res.code === '000') {
                    self.isRZ = false;
                    if (res.data.realName != null && res.data.realName != '' && res.data.idCard != null && res.data.idCard != '') {
                        self.isRZ = true;
                        self.ruleForm2.idCard = res.data.idCard;
                        self.ruleForm2.realName = res.data.realName;
                        self.idCardDesc = res.data.idCard.substr(0, 4) + "********" + res.data.idCard.substr(12);
                    }
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            })
        },
        getBankInfo: function() {
            var self = this;
            LF.net.getJSON("/member/bank/list", {
                tokenId: LF.cookie.get("tokenId")
            }, function(res) {
                if (res.code === '000') {
                    self.bankInfos = res.data.list;
                    if (self.bankInfos == '') {
                        self.bankInfos = [];
                    }
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            })
        },
        submitBd: function(formName) {
            console.log(123, this.$refs[formName]);
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(456)


                    LF.net.getJSON("/member/bank/binding", {
                        tokenId: LF.cookie.get("tokenId"),
                        realName: this.ruleForm2.realName,
                        idCard: this.ruleForm2.idCard,
                        securityCode: this.ruleForm2.securityCode,
                        bankAccount: this.ruleForm2.bankAccount,
                        bankKey: this.ruleForm2.bankKey,
                        bankOpenName: this.ruleForm2.bankOpenName
                    }, function(res) {
                        if (res.code === '000') {
                            location.reload();
                        } else {
                            Message({
                                type: 'error',
                                message: res.errorMessage
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });



            // if(this.ruleForm2.idCard==''||this.ruleForm2.realName==''||this.ruleForm2.securityCode==''||this.ruleForm2.bankAccount==''
            // ||this.ruleForm2.bankKey==''){
            //     return;
            // }
            // var self = this;
            // LF.net.getJSON("/member/bank/binding", {tokenId:LF.cookie.get("tokenId"),realName:this.ruleForm2.realName,idCard:this.ruleForm2.idCard,securityCode:this.ruleForm2.securityCode
            // ,bankAccount:this.ruleForm2.bankAccount,bankKey:this.ruleForm2.bankKey,bankOpenName:this.ruleForm2.bankOpenName}, function(res) {
            //     if(res.code==='000'){
            //         location.reload();
            //     }else{
            //         Message({
            //             type: 'error',
            //             message:res.errorMessage
            //         });
            //     }
            // })



        },
        delBd: function(id, bankAccount) {
            this.delId = id;
            this.ruleForm2.bankAccount = bankAccount;
            this.isChange = true;
        },
        delBdOk: function() {
            if (this.ruleForm2.securityCode == '') {
                return;
            }
            LF.net.getJSON("/member/bank/unbinding", {
                tokenId: LF.cookie.get("tokenId"),
                securityCode: this.ruleForm2.securityCode,
                bankAccountId: this.delId
            }, function(res) {
                if (res.code === '000') {
                    location.reload();
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            })
        },
        prefixPhone: function() {
            var ph = LF.cookie.get("account");
            this.phone = ph.substr(0, 3) + "****" + ph.substr(7);
        },
        setDefalut: function(id, bankAccount) {
            LF.net.getJSON("/member/bank/default/set", {
                tokenId: LF.cookie.get("tokenId"),
                bankAccountId: id
            }, function(res) {
                if (res.code === '000') {
                    location.reload();
                } else {
                    Message({
                        type: 'error',
                        message: res.errorMessage
                    });
                }
            })
        },
        choose: function() {
            for (var i = 1; i <= 10; i++) {
                if (i == 3) {
                    document.getElementById("item" + i).style.color = "#ff3e03";
                } else {
                    document.getElementById("item" + i).style.color = "#555";
                }
            }
        }
    },
    /*
     *组件挂在完成响应
     */
    mounted() {
        this.prefixPhone();
        this.getPersonalInfo();
        if (this.isRZ) {
            this.getBankList();
            this.getBankInfo();
        }
        // this.choose();
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})
console.log(vue.$data.isChange);