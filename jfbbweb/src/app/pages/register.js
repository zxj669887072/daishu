import LF from 'LF'
import Vue from 'vue'
import LfHeader from './../../components/header_new.vue';
import LfFooter from './../../components/footer.vue';
import hex_md5 from './../../js/framework/md5.js';
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
  Message
} from 'element-ui'
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

Vue.use(CheckboxGroup)
Vue.use(Checkbox)
var vue = new Vue({
  el: '#app',
  data: {
    item: "发送验证码",
    isDisabled: false,
    // countdown:60,
    flag: false,
    isSend: false,
    isOk: false,
    active: 1,
    flate: '',
    fact: "",
    ruleForm2: {
      phone: '',
      passwordConfirm: '',
      password: '',
      securityCode: '',
      invitation2Register:"",
      type: []
    },
    rules2: {
      type: [{
        type: 'array',
        required: true,
        message: '请仔细阅读用户协议',
        trigger: 'blur'
      }],
      securityCode: [{
        validator: function(rule, value, callback) {
          var _this = vue._data.ruleForm2;
          var self = vue._data;
          if (value === '') {
            callback(new Error('请输入验证码'));
          } else {
            if (!self.isOk) {
              if (_this.phone == '') {
                callback(new Error("请输入手机号码"));
                return;
              }
              let params = {
                type: 1,
                phone: _this.phone,
                securityCode: _this.securityCode
              };
              LF.net.getJSON("/integral/sms/verify", params, res => {
                if (res.code == '000') {
                  self.isOk = true;
                  callback();
                } else {
                  Message({
                    type: 'warning',
                    message: "验证码错误"
                  });
                  _this.securityCode = '';
                  self.isOk = false;
                  callback(new Error("验证码错误"));
                }
              });
            } else {
              callback();
            }
          }
          if (!value) {
            callback(new Error('请输入验证码'));
          } else {
            if (!this.isOk) {
              if (_this.phone == '') {
                callback(new Error("请输入手机号码"));
                return;
              } else {
                callback();
              }
            } else {
              callback();
            }
          }
        },
        trigger: 'blur'
      }],
      password: [{
        validator: function(rule, value, callback) {
          var _this = vue._data.ruleForm2;
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            /*if (_this.passwordConfirm !== '') {
              this.$refs.ruleForm2.validateField('passwordConfirm');
            }*/
            callback();
          }
        },
        trigger: 'blur'
      }],
      passwordConfirm: [{
        validator: function(rule, value, callback) {
          var _this = vue._data.ruleForm2;
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (_this.password !== value) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      }],
      phone: [{
        validator: function(rule, value, callback) {
          if (!value) {
            return callback(new Error('手机号码不能为空'));
          }
          if ((/^1[34578]\d{9}$/.test(value))) {
            callback();

          } else {
            callback(new Error('请输入正确的手机号码'));
          }
        },
        trigger: 'blur'
      }],
      invitation2Register:[{
        validator: function(rule, value, callback) {
          if(value){
            var regHouseNumber =  /^0?\d{9}$/;
            var regPhone =  /^1[34578]\d{9}$/;
            if(regHouseNumber.test(value) || regPhone.test(value)){
              callback();
            }else{
              callback(new Error('请输入正确的门牌号或手机号码'));
            }
          }else{
            callback();
          }
        }
      }]
    }
  },

  /*
   * 方法，所有方法挂载methods下面，在Vue实例内通过this.methodName来调用方法。
   */
  methods: {
    go(url) {
      console.log(url + "进入此方法");
      LF.window.openWindow(url);
    },
    sendSms() {
      if (this.ruleForm2.phone == '') {
        return;
      }
      self = this;
      LF.net.getJSON("/integral/sms/send", {
        type: 1,
        phone: this.ruleForm2.phone
      }, function(res) {
        if (res.code === '000') {
          self.item = 60;
          self.isSend = true;
          self.isDisabled = true;
          var my_interval = setInterval(function() {
            if (self.item >= 1) {
              self.item -= 1;
            } else {
              self.isSend = false;
              self.isDisabled = false;
              self.item = "发送验证码";
              clearInterval(my_interval);
            }
          }, 1000);
        } else {
          self.isSend = false;
          self.isDisabled = false;
        }
      })
    },
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          LF.net.getJSON("/integral/user/register", {
            phone: this.ruleForm2.phone,
            houseNumber: this.ruleForm2.invitation2Register,
            password: hex_md5(this.ruleForm2.password),
            passwordConfirm: hex_md5(this.ruleForm2.passwordConfirm)
          }, function(res) {
            if (res.code === '000') {
              self.fact = "imagetop";
              self.flate = "";
              self.active = 2;
              LF.cookie.set("redId", res.data.redId);
              self.toLogin(self.ruleForm2.phone, hex_md5(self.ruleForm2.password));
            } else {
              Message({
                  message: res.errorMessage,
                  type: "error"
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    toLogin: function(phone, pass) {
      LF.net.getJSON("/integral/user/login", {
        account: phone,
        password: pass
      }, function(res) {
        if (res.code == '000') {
          //将登录信息保存在session
          LF.cookie.set("account", res.data.account);
          LF.cookie.set("userId", res.data.userId);
          LF.cookie.set("userName", res.data.nickName);
          LF.cookie.set("merchantFlag", '0');
          LF.cookie.set("tokenId", res.data.tokenId);
          //LF.cookie.set("redId",res.data.redId);
          LF.window.openWindow("/app/index.html", "_self");
        } else {
          console.log(res.errorMessage);
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  /**
   * vue有几个生命周期钩子，可以相当于理解jquery的ready方法。
   * 比如我们需要加载个页面初始化一些数据，可以根据情况放在beforeMount，或者mounted中，区别是一个是在DOM元素挂载之前，一个是挂载完成
   * 一般可以选择mounted
   */
  /*
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
   */
  beforeMount() {
    console.log("beforeMount");
  },
  /*
   *组件挂在完成响应 
   */
  mounted() {

  },
  /**
   * 挂在自己的vue组件，命名驼峰方式
   * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
   */
  components: {
    LfHeader,
    LfFooter

  },
})