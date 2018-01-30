import Vue from 'vue'
import { Button, Form, FormItem, Input } from 'element-ui'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

//Vue.use(ElementUI)
new Vue({
	el: '#app',
	data: {
		ruleForm2: {
			pass: '',
			checkPass: '',
			age: ''
		},
		rules2: {
			pass: [
				{ validator: function(rule, value, callback){
					if (value === '') {
			          callback(new Error('请输入密码'));
			        } else {
			          if (this.ruleForm2.checkPass !== '') {
			            this.$refs.ruleForm2.validateField('checkPass');
			          }
			          callback();
			        }
				}, trigger: 'blur' }
			],
			checkPass: [
				{ validator: function(rule, value, callback){
					if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== this.ruleForm2.pass) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
				}, trigger: 'blur' }
			],
			age: [
				{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('年龄不能为空'));
			        }
			        setTimeout(() => {
			          if (!/^[0-9]+$/.test(value)) {
			            callback(new Error('请输入数字值'));
			          } else {
			            if (value < 18) {
			              callback(new Error('必须年满18岁'));
			            } else {
			              callback();
			            }
			          }
			        }, 1000);
				}, trigger: 'blur' }
			]
		}
	},
	methods: {
		submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
	}
})