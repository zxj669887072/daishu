//工程js框架
// import LF from 'LF';
import Vue from 'vue';
import LF from 'LF'
import * as config from '../../../js/framework/define';
import Promise from 'promise/polyfill';  
 

//引入公共的header和footer
/*import LfHeader from './../components/header_new.vue';
import LfFooter from './../components/footer.vue';*/


/*import Vue from 'vue'*/
import { RadioGroup,Radio,Button, Select,Option, Cascader,Card, Loading, Upload,Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, TableColumn,Pagination, Row, Col,Form,FormItem,Input,CheckboxGroup,Checkbox,Message  } from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
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

Vue.use(Upload)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(RadioGroup)
Vue.use(Radio)

Vue.use(CheckboxGroup)
Vue.use(Checkbox)
if (!window.Promise) {  
  window.Promise = Promise;  
}  
var vue=new Vue({
    el: '#app',
    data: {
    backgroundImg:'',
      active: 0,
      tokenId:'',
      account:'',
      imageUrl: '',
      phone:'',
      doorNumber:'',
      doorName:'',
      headName:'',
      manage_type:[],
      headPhone:'',//领导人电话
      Yeor :'',//是否有实体店
      pattern :'',//经营模式
      businessType : [] , //经营类型
      shopNames :'',//商铺名称
      operatorName :'', 
      bizLicNo : '',
      manageLocation : '',
      bizLicRange :'' ,
      cascaderOptions: [],
      selectedOptions:[],
      srcA:'../../../images/upload1.png',
      srcB:'../../../images/upload1.png',
      srcC:'../../../images/upload1.png',
      ruleForm2: {
      		merchantProperty:'',
      		applyAccount:'',
			referrer: '',
			passwordConfirm: '',
			password: '',
			age:'',
			servHouseNumber:'',
			shopName:'',
			shopPicName:'',
			sex:'',			
			type: [],
			province:'',
			city:'',
			district:'',
			  street:'',
		      phyFlag:'',
		      manageModel:'',
		      manageType:[],
	        value: '',
	      
		},
		rules2: {
            type: [
	            { type: 'array', required: true, message: '请仔细阅读用户协议', trigger: 'blur' }
	        ],
	        sex:[
            	{ required: true, message: '请选择性别', trigger: 'change' }
            ],
            phyFlag:[
            	{ required: true, message: '请选择店铺类型', trigger: 'change' }
            ],
            manageModel:[
            	{ required: true, message: '请选择经营模式', trigger: 'change' }
            ],
            manageType:[
	            { type: 'array', required: true, message: '请选择经营类型', trigger: 'blur' }
	        ],
             region: [
	            { required: true, message: '请选择地址', trigger: 'change' }
	          ],
	        shopName:[
	        	{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('店面名称不能为空'));
			       }else{
			       	 callback();
			       }
				}, trigger: 'blur' }
	        ],
	        shopPicName:[
	        	{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('网店负责人姓名不能为空'));
			       }else{
			       	 callback();
			       }
				}, trigger: 'blur' }
	        ],
	        shopPicPhone:[
	        	{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('手机号码不能为空'));
			       }
					setTimeout(() => {
			          
			            if ((/^1[34578]\d{9}$/.test(value))) {
			              callback();
			              
			            } else {
			              callback(new Error('请输入正确的手机号码'));
			            }
			        }, 100);
				}, trigger: 'blur' }
	        ],
	        street:[
	        	{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('网店负责人姓名不能为空'));
			       }else{
			       	 callback();
			       }
				}, trigger: 'blur' }
	        ],
	        applyName:[
	        	{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('网店负责人姓名不能为空'));
			       }else{
			       	 callback();
			       }
				}, trigger: 'blur' }
	        ],
	        applyIdCard:[
	        	{ validator: function(rule, value, callback){
					if (!value) {
			          return callback(new Error('网店负责人姓名不能为空'));
			       }else{
			       	 callback();
			       }
				}, trigger: 'blur' }
	        ],
			referrer: [
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
    methods: {
       handleAvatarScucess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      onclickButton:function(){
      		document.getElementById("file").click();
      },
      onclickButtonOne:function(){
      		document.getElementById("fileId").click();
      },
      onclickButtonTwo:function(){
      		document.getElementById("fileFace").click();
      },
      previewFile:function(event) {
      		var self =this;
      		var file = event.path[0];
      		console.log(file)
      		/*var file=this.$el.querySelector('input[id="file"]');*/
            var formNodeOne = document.createElement('form');
            formNodeOne.enctype='multipart/form-data';
            formNodeOne.appendChild(file);  
            var formData = new FormData(formNodeOne);
            console.log(formData)
			if(file) {
            LF.net.upload('/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                self.srcA=res.data;
                console.log(res.data)
                },function(res){
                    console.log("error",res);
                });
			} else {
				self.backgroundImg = "";
			}
			document.body.appendChild(file);
		},
		previewFileA:function(event) {
      		var self =this;
      		var file = event.path[0];
      		console.log(file)
      		/*var file=this.$el.querySelector('input[id="file"]');*/
            var formNodeOne = document.createElement('form');
            formNodeOne.enctype='multipart/form-data';
            formNodeOne.appendChild(file);  
            var formData = new FormData(formNodeOne);
            console.log(formData)
			if(file) {
                LF.net.upload('/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                    self.srcB=res.data;
                    console.log(res.data)
                },function(res){
                    console.log("error",res);
                });
			} else {
				self.backgroundImg = "";
			}
			document.body.appendChild(file);
		},
		previewFileFace:function(event) {
      		var self =this;
      		var file = event.path[0];
            var formNode = document.createElement('form');
            formNode.enctype='multipart/form-data';
            formNode.appendChild(file);
            var formData = new FormData(formNode);
            console.log(formData)
			if(file) {
                LF.net.upload( '/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                    self.srcC=res.data;
                    console.log(self.srcC)
                },function(res){
                    console.log("error",res);
                });
			} else {
				self.backgroundImg = "";
			}
			 document.body.appendChild(file);
		},
		  handleChange(value) {
	        console.log(value[0]);
	        var _this= vue._data.ruleForm2 ;
	        _this.province=value[0];
	        _this.city=value[1];
	        _this.district=value[2];
	      },
	  handleChange(value) {
        console.log(value[0]);
        var _this= vue._data.ruleForm2 ;
        _this.province=value[0];
        _this.city=value[1];
        _this.district=value[2];
      },
      /**
       * 三级联动点击事件
       * @param {Object} value
       */
      handleItemChange:function(value){
      		//console.log(value);
      		var _this =this;
      		var id =value[value.length-1];
      		var th ;
      		//console.log(value.length);
      		_this.cascaderOptions.forEach(function(city){
      			if(city.value==id){
      				_this.cascaderSetdate(city.children,id,value.length);
      				return ;
      			}
      			if(city.children.length>0){
      				city.children.forEach(function(child){
      					if(child.value==id){
		      				_this.cascaderSetdate(child.children,id,value.length);
		      				return ;
      					}
      				});
      			}
      		});
      },
      /**
       * 三级联动
       * @param {Object} val
       * @param {Object} pid
       */
      cascaderSetdate:function(val,pid,length){
      	var _this= LF.cookie.get("tokenId");
      	var obj ={"tokenId":_this,"parentId":pid};
      	if(val.length==0){
      		LF.net.getJSON("sys/area/list", obj, function(res) {
				if(res.code==='000'){
					res.data.forEach(function(areas){
						if(length>1){
						val.push({value:areas.id,label:areas.name});	
						}else{
							val.push({value:areas.id,label:areas.name,children:[]});	
						}

					});
					 
				}else{
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
			});
      	}
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(formName) {
      		var self = this;
      		console.log(this.$refs);
      		
	        this.$refs[formName].validate((valid) => {
	        	console.log(valid);
	          if (valid) {
	            var formData = JSON.stringify(this.ruleForm2); 
	            var obj = JSON.parse(formData);
	            obj["merchantProperty"]="1";
	            obj["applyAccount"]=self.account;
	            obj["type"]=1;
	           	obj["phyFlag"]=parseInt(obj.phyFlag);
	            obj["manageModel"]=parseInt(obj.manageModel);
	            obj["handIdCardUrl"]=self.srcA;
	           	obj["idCardUrls"]=self.srcB;
	            obj["idCardUrls"]+=";";
	            obj["idCardUrls"]+=self.srcC;
	            if(obj["manageType"].length>0){
	            	var manan="";
	            	obj["manageType"].forEach(function(value, index, array) {
					  if(array[index]!=null){
					  	console.log(array[index])
					  	 manan += array[index]+",";
					  }
					});
					if(manan!=undefined){
						var newstr=manan.substring(0,manan.length-1);
						console.log(manan)
						 obj["manageType"]=newstr;
					}
					
					
	            }else{
	            	obj["manageType"]= '';
	            }
	            self.testajax(obj);
	          } else {
	          	
	            console.log('error submit!!');
	            return false;
	          }
	        });
      },
      testajax: function(obj) {
        
			var self = this;//这样在function中用过self调用vue的this对象。
			console.log(obj.type)
			LF.net.getJSON("website/seller/apply", obj, function(res) {
				if(res.code==='000'){
					LF.window.openWindow("/app/pages/information/message.html","_self");
				}else{
					console.log(obj);
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
				}
			}, function(res) {
				console.log("error：" + JSON.stringify(res));
				var res = JSON.parse(res);
				
			});
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解
			
		},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
    },

    /*
     *组件挂在完成响应 
     */
    mounted(){
        	if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
			this.account=LF.cookie.get("account");
			this.tokenId=LF.cookie.get("tokenId");
			var self = this;//这样在function中用过self调用vue的this对象。
			self.cascaderSetdate(self.cascaderOptions,"0");
			LF.net.getJSON("sys/dict/get", { adType: 1, pageSize: 100, merchantId: "",tokenId:this.tokenId,type:"manage_type"}, res => {
				if(res.code == "000") {
					console.log(res.data)
					this.manage_type = res.data;
					console.log(res.data.advertList);
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
			LF.net.getJSON("website/seller/status", { adType: 1, pageSize: 100, merchantId: "",applyAccount:this.account,type:"manage_type"}, res => {
				if(res.code == "000") {
					if(res.data.applyStatus=="2"){
						LF.window.openWindow("/app/pages/information/message.html","_self");
					}else if(res.data.applyStatus=="1"){
						LF.window.openWindow("/app/pages/information/message.html","_self");
					}
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
			//箭头函数，使用箭头函数可以不需要在外面定义this，在{}中，可以直接使用this代表vue的this对象。
			//箭头函数相关使用请自行百度了解
			
	}
    
})

/*new Vue({
  el :'#phone',
  data
})*/