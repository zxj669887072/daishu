import LF from 'LF'
import Vue from 'vue'
import LfHeader from './../components/header_new.vue';
import LfFooter from './../components/footer.vue';
import hex_md5  from './../js/framework/md5.js';
import { Button, Select, Card, Loading, Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, TableColumn,Pagination, Row, Col,Form,FormItem,Input,Message } from 'element-ui'
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
var vm =new Vue({
    el: '#app',
    data: {
    	user_id:"",
        user_name:"",
        vip_flag:false,
        messageCount:0,
        shopsCount:0,
        codeUrl:"",
        code:"",
        ruleForm2: {
			account: '',
			checkPass: '',
			password: '',
            accountType:'1',
            code:''
		},
		rules2: {
			password: [
				{ validator: function(rule, value, callback){
					if (value === '') {
			          callback(new Error('请输入密码'));
			        } else {
			          /*if (this.ruleForm2.checkaccount !== '') {
			            this.$refs.ruleForm2.validateField('checkaccount');
			          }*/
			          callback();
			        }
				}, trigger: 'blur' }
			],
			checkPass: [
				{ validator: function(rule, value, callback){
					if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== this.ruleForm2.account) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
				}, trigger: 'blur' }
			],
                    code: [
                      { validator: function(rule, value, callback){
                        let code = value.toLowerCase();
                        if (value === '') {
                              callback(new Error('请输入验证码'));
                            }else if(value.toLowerCase()!=vm.code){
                              callback(new Error('验证码错误'));
                            } else {
                              callback();
                            }
                      }, trigger: 'blur' }
                    ],
			account: [
				{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('手机号码不能为空'));
			        }
			        setTimeout(() => {
			          if (!/^[0-9]+$/.test(value)) {
			            callback(new Error('请输入数字值'));
			          } else {
			            if ((/^1[34578]\d{9}$/.test(value))) {
			              callback();
			              
			            } else {
			              callback(new Error('请输入正确的手机号码'));
			            }
			          }
			        }, 100);
				}, trigger: 'blur' }
			]
		}
    },
    
    /*
     * 方法，所有方法挂载methods下面，在Vue实例内通过this.methodName来调用方法。
     */
    methods: {
    	go(url){
    		console.log(url+"进入此方法");
    		LF.window.openWindow(url);
    	},
      closeService(){
        var mapEle = document.getElementById("Map");
        var parentEle = mapEle.parentNode;
        parentEle.style.display = "none";
    },
        reloadCodeimg(){
            let codeObj = LF.util.getCodeImg();
              this.code = codeObj.code.toLowerCase();
              this.codeUrl = codeObj.codeUrl;
      },
        	/*var structureNo = this.categoryList[0].structureNo;*/
        testajax: function(obj) {
            LF.cookie.del("bussAccount");
            LF.cookie.del("bussUserId");
            LF.cookie.del("bussUserName");
            LF.cookie.del("merchantFlag");
            LF.cookie.del("bussTokenId");
            LF.cookie.del("merchantId");
            let p = LF.window.getParams();
            let return_url = "";
            if(p&&p.return_url){
            	return_url = decodeURIComponent(p.return_url);
            }
			var self = this;
			LF.net.getJSON("integral/user/login", obj, function(res) {
				if(res.code=='000'){
					//将登录信息保存在session
                    LF.cookie.set("bussAccount",res.data.account);
                    LF.cookie.set("bussUserId",res.data.userId);
                    LF.cookie.set("bussUserName",res.data.nickName);
                    LF.cookie.set("merchantFlag",'1');
					LF.cookie.set("bussTokenId",res.data.tokenId);
					LF.cookie.set("merchantId",res.data.merchantId);
					if(return_url){
						LF.window.openWindow(return_url,"_self",true);
					}else{
						LF.window.openWindow("/app/pages/business/home_bz.html","_self");
					}
				}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, function(res) {
				var res = JSON.parse(res);
			});
		},
      	submitForm(formName) {
      		var self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var formData = JSON.stringify(this.ruleForm2); 
            var obj = JSON.parse(formData);
            obj["password"]=hex_md5(obj.password);
            obj["accountType"]=1;
            self.testajax(obj);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addKeyEvent(){
        document.onkeydown = function(e){
          if(e.keyCode == 13){
            document.getElementById("submitBtn").click();
          }
        }
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
    beforeMount(){
    	/*console.log("beforeMount");*/
     /*   if(LF.cookie.get("userId")&&(LF.cookie.get("tokenId")||LF.cookie.get("bussTokenId"))){
        	if(LF.cookie.get("merchantFlag")==0){
                LF.window.openWindow("/app/index.html","_self");
			}
			else{
                LF.window.openWindow("/app/pages/business/home_bz.html","_self");
			}
		}*/
        this.reloadCodeimg();
    },
    /*
     *组件挂在完成响应 
     */
    mounted(){
    	this.addKeyEvent();
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


