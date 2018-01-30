import LF from 'LF';
import Vue from 'vue';
import LfHeader from './../../../components/header_new.vue';
import LfFooter from './../../../components/footer.vue';
import { RadioGroup,Radio,Button, Select,Option, Cascader,Card, Loading, Upload,Dialog,Carousel, CarouselItem, Steps,Step,Tabs,TabPane, Table, TableColumn,Pagination, Row, Col,Form,FormItem,Input,CheckboxGroup,Checkbox ,TimePicker,DatePicker,Message } from 'element-ui'
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
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(RadioGroup)
Vue.use(Radio)

Vue.use(CheckboxGroup)
Vue.use(Checkbox)

Vue.use(TimePicker)
Vue.use(DatePicker)
var vue =new Vue({
	el: '#app',
	data: {
		srcA:'',
		upload: {
			imageType: 1
		},
		head: {
			'Content-Type': 'multipart/form-data'
		},
		uploadurl: '',
		dialogImageUrl:'',
		dialogVisible: false,
		goodinfo:{
			toShopFlag:'0',
			winRecommFlag:'1',
			shopGroupId:'',
			goodsTag:'1',
			spcelist:'',
			spec:'',
			goodsName:'',
			goodsBuyPoint:'',
			price:'',
			bkge:'',
			weight:'',
			qty:'',
			mainUrls:'',
			mainUrllist:[{name:'2',url:"http://120.77.213.110:81/integral/icon/201703/1703201459349356.jpg"}],
			description:'',
			id:''
		},
		cascaderOptions: [],
      	selectedOptions:[],
      	merchantProperty:1,
		tokenId:'',
		account:'',
		memberName:'',
		duties:'',
        visible:false,
        vluas:0,
		ruleForm2: {
      		merchantProperty:'',
      		applyAccount:'',
      		centerName:'',
      		managerName:'',
      		sex:'',
      		managerPhone:'',
      		province:'',
      		city:'',
      		district:'',
      		street:'',
      		memberList:[],
      		envPicList:[],
      		applyName:'',
      		applyCardId:'',
      		backCardPic:'',
      		memberName:'',
      		duties:'',
      		teamPic:'',
      		applyCardPic:'',
      		frontCardPic:'',
		},
		rules2: {	
			
		},
		file:''
	},

	methods: {
		
		onclickButtonOne:function(){
      		document.getElementById("fileFace").click();
      },
      previewFile:function(event) {
      		var self =this;
      		var file = event.path[0];
      		/*var file=this.$el.querySelector('input[id="file"]');*/
            var formNode = document.createElement('form');
            formNode.enctype='multipart/form-data';
            formNode.appendChild(file);
            var formData = new FormData(formNode);
			if(file) {
				LF.net.upload( '/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                    self.ruleForm2.teamPic=res.data;
                },function(res){
                    console.log("error",res);
                });
			} else {
				self.backgroundImg = "";
			}
                document.body.appendChild(file);
		},
		onclickButtonB:function(){
      		document.getElementById("fileB").click();
      },
      previewFileB:function(event) {
      		var self =this;
      		var file = event.path[0];
      		/*var file=this.$el.querySelector('input[id="file"]');*/
            var formNode = document.createElement('form');
            formNode.enctype='multipart/form-data';
            formNode.appendChild(file);
            var formData = new FormData(formNode);
			if(file) {
             LF.net.upload('/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                 self.ruleForm2.applyCardPic=res.data;
                },function(res){
                    console.log("error",res);
                });
			} else {
				self.backgroundImg = "";
			}
                document.body.appendChild(file);
		},
		onclickButtonC:function(){
      		document.getElementById("fileC").click();
      },
      previewFileC:function(event) {
      		var self =this;
      		var file = event.path[0];
      		/*var file=this.$el.querySelector('input[id="file"]');*/
            var formNode = document.createElement('form');
            formNode.enctype='multipart/form-data';
            formNode.appendChild(file);
            var formData = new FormData(formNode);
			if(file) {
                LF.net.upload('/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                    self.ruleForm2.applyCardPic=res.data;
                },function(res){
                    console.log("error",res);
                });
			} else {
				self.backgroundImg = "";
			}
                document.body.appendChild(file);
		},
		onclickButtonD:function(){
      		document.getElementById("fileD").click();
      },
      previewFileD:function(event) {
      		var self =this;
      		var file = event.path[0];
      		/*var file=this.$el.querySelector('input[id="file"]');*/
            var formNode = document.createElement('form');
            formNode.enctype='multipart/form-data';
            formNode.appendChild(file);
            var formData = new FormData(formNode);
			if(file) {
                LF.net.upload('/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                    self.ruleForm2.applyCardPic=res.data;
                },function(res){
                    console.log("error",res);
                });
			} else {
				self.backgroundImg = "";
			}
                document.body.appendChild(file);
		},
		 uploadbefore:function(){
    	 	if(this.goodinfo.mainUrllist!=null &&this.goodinfo.mainUrllist.length>=5){
                Message({
                    type: 'warning',
                    message:"最多保存五张图片"
                });
            	return false;
            } 
    	 },
    	uploadFile:function(){
    		var _this=this;
    		var file;
    		if(this.file==''){
    			file=this.$el.querySelector('input[class="el-upload__input"]');
    		}else{
    			file= this.file;
    		}
    		file.setAttribute("name",'file');
    		file.setAttribute("enctype",'multipart/form-data');
    		var formNode = document.createElement('form');
            formNode.enctype='multipart/form-data';
            var clone = file.cloneNode(true);
            this.file=file;
            formNode.appendChild(file);
            var formData = new FormData(formNode);
            LF.net.upload('/integral/image/upload?tokenId='+LF.cookie.get("tokenId")+"&imageType=6",formData,function(res){
                if(_this.goodinfo.mainUrllist==null||_this.goodinfo.mainUrllist==''){
                    _this.goodinfo.mainUrllist=[];
                }
                _this.goodinfo.mainUrllist.push({name:res.data.split("icon")[1],url:res.data});
            },function(res){
                console.log("error",res);
            });
    	},
		handleRemove(file, fileList) {
			this.goodinfo.mainUrllist=fileList;
			console.log(this.goodinfo.mainUrllist);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},    
		 handleChange(value) {
	        console.log(value[0]);
	        var _this= vue._data.ruleForm2 ;
	        _this.province=value[0];
	        _this.city=value[1];
	        _this.district=value[2];
	      },
	      addNumber:function(){
	      	var self=this;
	      	this.ruleForm2.memberList.push({memberName:self.memberName,duties:self.duties,vluas:self.vluas});
	      	self.vluas+=1;
	      	for(var i=0 ; i<this.ruleForm2.memberList.length;i++){
	      		this.ruleForm2.memberList[i].vluas=i;
	      	}
	      },
	      removeNumber:function(e){
	      	var self = this ;
	      	for(var i=0 ; i<this.ruleForm2.memberList.length;i++){
	      		this.ruleForm2.memberList[i].vluas=i;
	      	}
	      	this.ruleForm2.memberList.splice(e.path[0].attributes["values"].value,1);
	      	for(var i=0 ; i<this.ruleForm2.memberList.length;i++){
	      		this.ruleForm2.memberList[i].vluas=i;
	      	}
	      },
	       submitForm(formName) {
      		var self = this;
      		console.log(this.$refs);
      		
	        this.$refs[formName].validate((valid) => {
	        	console.log(valid);
	          if (valid) {
	            var formData = JSON.stringify(this.ruleForm2); 
	            var obj = JSON.parse(formData);
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
			LF.net.getJSON("website/operation/apply", obj, function(res) {
				if(res.code==='000'){
					LF.window.openWindow("/app/pages/information/merchantsPayCost.html","_self");
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
		go(url) {
			LF.window.openWindow(url);
		},
		/*
		 * 根据分类structureNo跳转到具体路分类页面，暂时先跳百度
		 */
		gotoByStructureNo(structureNo) {
			LF.window.openWindow("list.html?structureNo="+structureNo);
		},
		goByGoodId(id) {
			LF.window.openWindow("store/storedetails.html?goodsId="+id);
//			LF.window.openWindow("http://www.baidu.com");
		}
		
	},
	beforeMount() {
		console.log("beforeMount");
	},

	mounted() {
			if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
			this.uploadurl =LF.window.getUrl()+"/integral/image/upload";
			this.account=LF.cookie.get("account");
			this.tokenId=LF.cookie.get("tokenId");
			var self = this;//这样在function中用过self调用vue的this对象。
			self.cascaderSetdate(self.cascaderOptions,"0");
	},
	components: {
		LfHeader,
		LfFooter
	},
})