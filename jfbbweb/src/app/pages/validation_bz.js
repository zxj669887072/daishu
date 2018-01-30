import LF from 'LF'
import Vue from 'vue'
import LfHeader from './../../components/header_new.vue';
import LfFooter from './../../components/footer.vue';
import hex_md5  from './../../js/framework/md5.js';
import { Button, Select, Card, Loading, Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, TableColumn,Pagination, Row, Col,Form,FormItem,Input,CheckboxGroup,Checkbox,Message } from 'element-ui'
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
var vue=new Vue({
    el: '#app',
    data: {
    	isSend:false,
		isOk:false,
    	info:0,
    	phoneInfo:1,
    	phoneTwo:0,
    	active:1,
    	item:"获取验证码",
        ruleForm2: {
			phone: '',
			passwordConfirm: '',
			password: '',
			securityCode:'',
			type:"2",
			accountType:"1"
		},
		rules2: {
			securityCode:[
	        	{ validator: function(rule, value, callback){
                    var _this= vue._data.ruleForm2 ;
                    var self=vue._data;
 				  if (value === '') { 
			          callback(new Error('请输入验证码'));
			      } else{
                         callback();
			        }
				}, trigger: 'blur' }
	        ],
			password: [
				{ validator: function(rule, value, callback){
					
 					if (value === '') {
 						
			          callback(new Error('请输入新密码'));
			       } else { 
			          /*if (_this.passwordConfirm !== '') {
			            this.$refs.ruleForm2.validateField('passwordConfirm');
			          }*/
			          callback();
			        }
				}, trigger: 'blur' }
			],
			passwordConfirm: [
				{ 	
					validator: function(rule, value, callback){
					
					 var _this= vue._data.ruleForm2 ;
					if (value === '') {
			          callback(new Error('请输入确认密码'));
			        } else if (_this.password !==value ) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
				}, trigger: 'blur' }
			],
			phone: [
				{ validator: function(rule, value, callback){
					var _this=vue._data;
					if (!value) {
			          return callback(new Error('手机号码不能为空'));
			        }
			        setTimeout(() => {
			          if (!/^[0-9]+$/.test(value)) {
			            callback(new Error('请输入数字值'));
			          } else {
			            if ((/^1[34578]\d{9}$/.test(value))) {
                           if(!_this.isSend){
                               LF.net.getJSON("/integral/user/forget/phone/verify", {phone:value,accountType:1}, function(res) {
                                   if(res.code==='000'){
                                       _this.isSend=true;
                                       _this.item= 60;
                                       callback();
                                       var my_interval = setInterval(function () {
                                           if (_this.item>=1) {
                                               _this.item-=1;
                                           } else {
                                               _this.item="请重新接收验证码";
                                               _this.isSend=false;
                                               clearInterval(my_interval);
                                           }
                                       }, 1000);
                                   }else{
                                       _this.isSend=false;
                                       callback(new Error(res.errorMessage));
                                   }
                               }, function(res) {
                                   console.log("error：" + JSON.stringify(res));

                               });
						   }
						   else{
                               callback();
						   }
			              
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
    		LF.window.openWindow(url);
    	},
        	/*var structureNo = this.categoryList[0].structureNo;*/

		codeVerigy: function(obj) {
			//第三种方式 可以选择POST或者GET
			//常规函数，使用function 在方法内的this引用已经改变，所以需要在外面定义this变量
			var self = this;//这样在function中用过self调用vue的this对象。
			LF.net.getJSON("integral/sms/verify", {type:2,phone:this.ruleForm2.phone,securityCode:this.ruleForm2.securityCode}, function(res) {
				if(res.code==='000'){
					self.phoneInfo=0;
					self.phoneTwo=1;
					self.active=2;
				}else{
					console.log(res.errorMessage);
				}
			}, function(res) {
				console.log("error：" + JSON.stringify(res));

			});

		},
		testajaxT: function(obj) {
			//第三种方式 可以选择POST或者GET
			//常规函数，使用function 在方法内的this引用已经改变，所以需要在外面定义this变量
			var self = this;//这样在function中用过self调用vue的this对象。
			LF.net.getJSON("/integral/user/forget/password/edit", obj, function(res) {
				if(res.code==='000'){
					self.phoneInfo=0;
					self.phoneTwo=0;
					self.info=1;
					self.active=3;
					
				}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
				
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
				
			});
			
		},
	      obtain(formName){
	      var _this= this;
        	if(_this.sou){
        		this.$refs[formName].validateField("phone",(errorMessage) => {
		          if (errorMessage) {
		            console.log('error submit!!');
		            return false;
		          } else {
		             var formData = JSON.stringify(this.ruleForm2);
			        var obj = JSON.parse(formData);
		            this.testajax(obj);
		          }
		        });
        	}
		},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var formData = JSON.stringify(this.ruleForm2); 
	        var obj = JSON.parse(formData);
	         var temp = { type: "1"};
        	obj.newParam ='type';
  				obj["type"]=2;
            this.codeVerigy(obj);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFormOne(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var formData = JSON.stringify(this.ruleForm2); 
	            var obj = JSON.parse(formData);
	            obj["securityCode"]=parseInt(obj.securityCode);
	            obj["password"]=hex_md5(obj.password);
	            obj["passwordConfirm"]=hex_md5(obj.passwordConfirm);
	            obj["accountType"]="1";
            this.testajaxT(obj);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
    beforeMount(){
    	console.log("beforeMount");
    },
    /*
     *组件挂在完成响应 
     */
    mounted(){
    	
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


