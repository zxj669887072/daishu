import LF from 'LF';
import * as config from './../../../js/framework/define';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue';

import { Message,Cascader,Loading } from 'element-ui';
Vue.use(Loading)
Vue.use(Cascader);
var vm = new Vue({
	el: '#app',
	data: {
		merchantId:"",
		ruleForm:{
			merchantId:"",
			houseNumber:"",
			shopName:"",
			shopType:"",
			logo:"",
			province:1,
			city:"",
			district:"",
			street:"",
			email:"",
			servBear:"",
			winTitle:"",
			depositSetting:"",
			retPeriod:"",
		},
		retPeriodList:[],
		selectedOptions:[],
		areaList:[],
		loading:true
	},
	computed:{
		options:function(){
			var rs = [];
			if(this.areaList.length > 0){
				rs = this.doData(this.areaList,0);
			}
			return rs;
		},
		logImg:function(){
			var rs = "../images/store_03.jpg";
			if(this.ruleForm.logo){
				rs = this.ruleForm.logo;
			}
			return rs;
		},
	},
	methods: {
		doData(data,parentId){
			var self = this;
			var rs = [];
			var temp = null;
			data.forEach(function(v,i){
				if(parentId == v.parentId){
					temp = new Object();
					temp.value=v.id;
					temp.label=v.name;
					if(v.type != '4'){
						temp.children = self.doData(data,v.id)	
					}
					rs.push(temp);
				}
			})
			return rs;
		},
		getInfo(){
			let params = {
				merchantId:this.merchantId
	    	};
	    	LF.net.getJSON("/merchant/shop/info",params,res=>{
	  			if(res.code==='000'){
					this.ruleForm.merchantId = res.data.merchantId;
					this.ruleForm.houseNumber= res.data.houseNumber;
					this.ruleForm.shopName= res.data.shopName;
					this.ruleForm.shopType= res.data.shopType;
					this.ruleForm.logo= res.data.logo;
					this.ruleForm.province=res.data.province;
					this.ruleForm.city= res.data.city;
					this.ruleForm.district= res.data.district;
					this.ruleForm.street= res.data.street;
					this.ruleForm.email= res.data.email;
					this.ruleForm.servBear= res.data.servBear;
					this.ruleForm.winTitle= res.data.winTitle;
					this.ruleForm.depositSetting= res.data.depositSetting;
					this.ruleForm.retPeriod= res.data.retPeriod;
	  				this.selectedOptions.push(this.ruleForm.province);
	  				this.selectedOptions.push(this.ruleForm.city);
	  				this.selectedOptions.push(this.ruleForm.district);
//	  				this.getCity(this.ruleForm.province);	
//	  				this.getDistrict(this.ruleForm.city)
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  			this.loading = false;
	  		},res=>{
	  			this.loading = false;
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		getProvince(){
			let params = {
				parentId:""
	    	};
	    	LF.net.getJSON("/sys/area/list",params,res=>{
	  			if(res.code==='000'){
	  				this.areaList = res.data;
	  				this.getInfo();
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  		},res=>{
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		getZD(){
			let params = {
				type:"refund_period"
	    	};
	    	LF.net.getJSON("/sys/dict/get",params,res=>{
	  			if(res.code==='000'){
	  				this.retPeriodList = res.data;
	  				this.getProvince();
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  		},res=>{
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		uploadImg(){
			var _this = this;
 			var formNode = this.$el.querySelector('form[id="imgform"]');
            var formData = new FormData(formNode);
            LF.net.upload("/integral/image/upload?tokenId="+LF.cookie.get("bussTokenId")+"&imageType=2",formData,function(res){
				if(res.code == '000'){
                	_this.ruleForm.logo = res.data;
                	Message({
						type: 'success',
						message:"图片上传成功!"
					});	
                }else{
                	Message({
						type: 'warning',
						message:res.errorMessage
					});
                }
			},function(res){
				Message({
					type: 'error',
					message:"图片上传失败!"
				});
			});
		},
		updatechoose(){
			console.log("updatechoose");
			var fileEl=this.$el.querySelector('input[id="fileId"]');
			console.log(fileEl);
//			ileEl.click(); 
			var ie=navigator.appName=="Microsoft Internet Explorer" ? true : false; 
			if(ie){ 
				fileEl.click(); 
			}else{
				var a=document.createEvent("MouseEvents");//FF的处理 
				a.initEvent("click", true, true);  
				fileEl.dispatchEvent(a); 
			} 
		},
		submitForm(){
			this.loading = true;
			this.ruleForm.province = this.selectedOptions[0];
			this.ruleForm.city = this.selectedOptions[1];
			this.ruleForm.district = this.selectedOptions[2];
	    	LF.net.getJSON("/merchant/shop/save",this.ruleForm,res=>{
	    		this.loading = false;
	  			if(res.code==='000'){
	  				this.districtList = res.data;
	  				this.district = this.ruleForm.district;
                    location.reload();
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  		},res=>{
	  			this.loading = false;
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		}
	},
	beforeMount(){
		
    },
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		//获取登录人ID
    	this.merchantId = LF.cookie.get("merchantId");
    	this.getZD();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})
