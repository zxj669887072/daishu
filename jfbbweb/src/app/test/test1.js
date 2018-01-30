import Vue from 'vue'
import { Message,Cascader,Button, Select, Card,Radio,Loading, Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, Upload,TableColumn,Pagination, Row, Col ,Form,FormItem, Input,CheckboxGroup,Checkbox,Option,TimePicker,Switch,DatePicker,RadioGroup,Dialog } from 'element-ui'
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

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Dialog)

Vue.use(Row)
Vue.use(Col)

Vue.use(RadioGroup)
Vue.use(Radio)


Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)


new Vue({
	el: '#app',
	data: {
		cte:'',
		options:[{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedOptions: [],
        selectedOptions2: [],
		ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
		ruleForm2: {
			pass: '',
			checkPass: '',
			age: '',
			type:''
		},
		rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
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
		},
		fullscreenLoading: false,
		loading2: true,
    radio:'1',
		tableData:[{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
           dialogImageUrl: '',
        dialogVisible: false
	},
	methods: {
		handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
		sizechange(value) {
        	console.log("sizechange"+value);
        },
        currentchange(value) {
        	console.log("currentchange"+value);
        },
		handleChange(value) {
        	console.log(value);
        },
		openFullScreen() {
			this.fullscreenLoading = true;
			setTimeout(() => {
				this.fullscreenLoading = false;
			}, 3000);
		},
		submitForm2(formName) {
	        this.$refs[formName].validateField("age",(errorMessage) => {
	          if (errorMessage) {
	            alert('error submit!');
	            return false;
	          } else {
	            alert('submit!!');
	          }
	        });
        },
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
        },
        testtip(){
        	Message({
				type: 'warning',
				message:"请填写正确的手机号码"
			});
        }
	}
})
