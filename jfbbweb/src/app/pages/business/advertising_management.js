import LF from 'LF';
import * as config from './../../../js/framework/define';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue';

import { Message,Cascader,Loading,MessageBox } from 'element-ui';
Vue.use(Loading)
Vue.use(Cascader);
var vm = new Vue({
	el: '#app',
	data: {
		loading:true,
		loading2:false,
		merchantId:"",
		advertising:[],
		goodsList:[],
		ruleForm:{
			id:"",
			adTitle:"",
			adPic:"",
			goodsId:"",
		}
	},
	computed:{},
	methods: {
		getGGList(){
			let params = {
	    		};
	    	LF.net.getJSON("/merchant/advert/list",params,res=>{
	    		this.loading = false;
	  			if(res.code==='000'){console.log(res.data);
	  				this.advertising = res.data.list;	console.log(this.advertising,666)
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
		},
		getGoods(){
			let params = {
				merchantId:this.merchantId
	    	};
	    	LF.net.getJSON("/merchant/goods/list",params,res=>{
	  			if(res.code==='000'){
	  				this.goodsList = res.data.goodsList;console.log(this.goodsList,999)
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
			this.loading2 = true;
			var _this = this;
 			var formNode = this.$el.querySelector('form[id="imgform"]');
            var formData = new FormData(formNode);
            
            LF.net.upload("/integral/image/upload?tokenId="+LF.cookie.get("bussTokenId")+"&imageType=3",formData,function(res){
            	_this.loading2 = false;
				if(res.code == '000'){
                	_this.ruleForm.adPic = res.data;
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
				_this.loading2 = false;
				Message({
					type: 'error',
					message:"图片上传失败!"
				});
			});
		},
		updatechoose(){
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
		save(){console.log(this.ruleForm.goodsId)
			this.loading2 = true;
			if(!this.ruleForm.adTitle){
				Message({
					type: 'warning',
					message:"请填写广告标题"
				});
				return;
			}
			if(!this.ruleForm.adPic){
				Message({
					type: 'warning',
					message:"请上传广告图片"
				});
				return;
			}
			if(!this.ruleForm.goodsId){
				Message({
					type: 'warning',
					message:"请选择链接商品"
				});
				return;
			}
			var action = "";console.log(this.ruleForm)
			if(this.ruleForm.id){
				action = "/merchant/advert/edit";
			}else{
				action = "/merchant/advert/add";
			}
			this.loading = true;
			LF.net.getJSON(action,this.ruleForm,res=>{
                this.loading = false;
	  			if(res.code==='000'){
	  				this.getGGList()
	  				this.$el.querySelector('#light').style.display='none';
	  				this.$el.querySelector('#fade').style.display='none';
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
		},
		del(id){
			MessageBox.confirm('您确定要删除该广告吗?', '提示', {
                                       	confirmButtonText: '确定',
                                       	cancelButtonText: '取消',
                                       	type: 'warning'
	                          }).then(() => {
	                                      LF.net.getJSON("/merchant/advert/del",{id:id},res=>{
                    this.loading = false;
		  			if(res.code==='000'){
		  				this.getGGList()
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
	                          }).catch(() => {
	                                       Message({
	                                                    type: 'info',
	                                                    message: '已取消删除'
	                                       });
	                         });  						
		},
		update(data){console.log(data);			
			this.ruleForm.id = data.id;
			this.ruleForm.adTitle = data.adTitle;
			this.ruleForm.adPic = data.adPic;
			this.ruleForm.goodsId = data.goodsId;
			this.$el.querySelector('#light').style.display='block';
			this.$el.querySelector('#fade').style.display='block';
		},
		ggsort(id,type){
			this.loading = true;
			let params = {
				id:id,
				sortType:type
			};
		    	LF.net.getJSON("/merchant/advert/sort",params,res=>{
	                		this.loading = false;
	  			if(res.code==='000'){
	  				this.getGGList();
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
//		if(LF.cookie.get("bussTokenId") == null || LF.cookie.get("bussTokenId") == '') {
//			LF.window.openWindow("/app/login.html", "_self");
//		} else {
			//获取登录人ID
	    	this.merchantId = LF.cookie.get("merchantId");
	    	this.getGoods();
	    	this.getGGList();
//		}
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})
