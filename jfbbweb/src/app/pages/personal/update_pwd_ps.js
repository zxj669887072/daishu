//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
import hex_md5  from './../../../js/framework/md5.js';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem,Form,FormItem,Input,Button,Message } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
 Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
var  vue =new Vue({
	el: '#app',
	data: {
		ruleForm2: {
			oldPassword: '',
			passwordConfirm: '',
			password: ''
		},
		rules2: {
			oldPassword: [
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
			passwordConfirm: [
				{ validator: function(rule, value, callback){
					if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== vue._data.ruleForm2.password) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
				}, trigger: 'blur' }
			],
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
			]
		}
	},
	methods: {
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	updatePassword:function(obj){
    		LF.net.getJSON("/integral/user/password/edit", obj,res=>{
	    		if(res.code=="000"){ 
	    			//修改成功
	    			LF.window.openWindow("/app/login.html","_self");
	    		}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
	    		}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
    	submitForm(formName) {
      		var self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var formData = JSON.stringify(this.ruleForm2); 
            var obj = JSON.parse(formData);
            obj["oldPassword"]=hex_md5(obj.oldPassword);
            obj["password"]=hex_md5(obj.password);
            obj["passwordConfirm"]=hex_md5(obj.passwordConfirm);
            self.updatePassword(obj);
            
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
	/*
     *组件挂在完成响应 
     */
    mounted(){
    	this.goLogin();
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})