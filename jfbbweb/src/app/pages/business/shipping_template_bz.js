import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue'
import { Loading,Dialog,Form,FormItem,Select,Option,Button,Input,RadioGroup,Radio,Table,TableColumn,Message} from 'element-ui'
Vue.use(Loading)

Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(Radio);

Vue.use(Table);
Vue.use(TableColumn);

// 注册
Vue.filter('area-show', function (value) {
	let rs = value.replace(/\|\|/g,",");
	return rs;
})

new Vue({
	el: '#app',
	data: {
		dialogFormVisible:false,
		loading:true,
		dialogloading:false,
		templateData: {
          templateId: '',
          companyCode: '',
          companyName: '',
          priceType: '0',
          list: []
        },
        listdata:{
        	expressChoose:"",
        	expressArea:"",
        	expressAreaName:"",
        	frontWeight:"",//首重
        	frontQuantity:"",//首件
        	frontFreight:"",//首费
        	afterWeight:"",//续重
        	afterQuantity:"",//续件
        	afterFreight:"",//续费
        	defaultFlag:"0",//是否默认 (1:是 0:否)
        },
        areaList:[],
        bmList:[],
        kdList:[]
	},
	watch:{
		'templateData.companyCode':{
			handler: function (value, oldValue){
				for(let i in this.kdList){
					if(this.kdList[i].companyCode == value){
						this.templateData.companyName = this.kdList[i].companyName
						break;
					}
				}
			}
		},
		'templateData.priceType':{
			handler: function (value, oldValue){
				this.listdata.frontWeight = "";
				this.listdata.frontQuantity = "";
				this.listdata.frontFreight = "";
				this.listdata.afterWeight = "";
				this.listdata.afterQuantity = "";
				this.listdata.afterFreight = "";
			}
		},
		'dialogFormVisible':{
			handler: function (value, oldValue){
				if(!value){
					this.clear();
				}
			}
		}
	},
	methods: {
		getArea(){
			let params = {
				parentId:0
	    	};
	    	LF.net.getJSON("/sys/area/list",params,res=>{
	  			if(res.code==='000'){
	  				this.areaList = res.data;
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
		getKD(){
			let params = {
	    	};
	    	LF.net.getJSON("/logistic/express/list",params,res=>{
	  			if(res.code==='000'){
	  				this.kdList = res.data;
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
		getMB(){
			let params = {
				merchantId:this.merchantId
	    	};
	    	LF.net.getJSON("/merchant/logistics/template/list",params,res=>{
	    		this.loading = false;
	  			if(res.code==='000'){
	  				this.bmList = res.data.templateList;
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
		addexpress(){
			if(!this.listdata.expressChoose){
				Message({
					type: 'warning',
					message:"请选择地区"
				});
				return;
			}
			console.log("this.listdata.expressArea="+this.listdata.expressArea);
			if(this.checkStr(this.listdata.expressArea,this.listdata.expressChoose)){
				Message({
					type: 'warning',
					message:"请勿重复添加"
				});
				return;
			}
			this.listdata.expressArea = this.doStr(this.listdata.expressArea,this.listdata.expressChoose);
			for(let i in this.areaList){
				if(this.areaList[i].id==this.listdata.expressChoose){
					this.listdata.expressAreaName = this.doStr(this.listdata.expressAreaName,this.areaList[i].name);;
				}
			}
		},
		addmbList(){
			let flag = false;
			if(this.templateData.priceType == '0'){
				if((!this.listdata.frontWeight)||(!this.listdata.frontFreight)||(!this.listdata.afterWeight)||(!this.listdata.afterFreight)){
					flag = true;	
				}
			}else{
				if((!this.listdata.frontQuantity)||(!this.listdata.frontFreight)||(!this.listdata.afterQuantity)||(!this.listdata.afterFreight)){
					flag = true;	
				}
			}
			if(flag){
				Message({
					type: 'warning',
					message:"请完善相关信息"
				});
				return;
			}
			let obj = {};
			obj.expressArea = this.listdata.expressArea;
			obj.expressAreaName = this.listdata.expressAreaName;
			obj.frontWeight = this.listdata.frontWeight;
			obj.frontQuantity = this.listdata.frontQuantity;
			obj.frontFreight = this.listdata.frontFreight;
			obj.afterWeight = this.listdata.afterWeight;
			obj.afterQuantity = this.listdata.afterQuantity;
			obj.afterFreight = this.listdata.afterFreight;
			obj.defaultFlag = this.listdata.defaultFlag;
			if(this.templateData.priceType == '0'){
				obj.front = obj.frontWeight;
				obj.after = obj.afterWeight;
			}else{
				obj.front = obj.frontQuantity;
				obj.after = obj.afterQuantity;
			}
			this.templateData.list.push(obj);
		},
		submitData(){
			let flag = false;
			if((!this.templateData.companyCode) ||this.templateData.list.length == 0){
				flag = true;
			}
			if(flag){
				Message({
					type: 'warning',
					message:"请完善相关信息"
				});
				return;
			}
			this.dialogloading = true;
	    	LF.net.getJSON("/merchant/logistics/template/edit",this.templateData,res=>{
	  			if(res.code==='000'){
	  				this.getMB();
	  				this.dialogFormVisible = false;
	  				this.clear();
	  			}else{
	  				Message({
						type: 'warning',
						message:res.errorMessage
					});
				}
	  			this.dialogloading = false;
	  		},res=>{
	  			this.dialogloading = false;
	  			Message({
					type: 'error',
					message:res.errorMessage
				});
	  		});
		},
		deleteRow(index){
			this.templateData.list.splice(index,1);
		},
		update(data){
			if(data.priceType == '0'){
				data.list.forEach(function(v){
					v.front = v.frontWeight;
					v.after = v.afterWeight;
				})
			}else{
				data.list.forEach(function(v){
					v.front = obj.frontQuantity;
					v.after = obj.afterQuantity;
				})
			}
			this.templateData.templateId = data.templateId;
			this.templateData.companyCode = data.companyCode;
			this.templateData.companyName = data.companyName;
			this.templateData.priceType = data.priceType;
			this.templateData.list = data.list;
			
			this.dialogFormVisible = true;
		},
		copy(data){
			this.loading = true;
			this.templateData.templateId = "";
			this.templateData.companyCode = data.companyCode;
			this.templateData.companyName = data.companyName;
			this.templateData.priceType = data.priceType;
			this.templateData.list = data.list;
			LF.net.getJSON("/merchant/logistics/template/edit",this.templateData,res=>{
	  			if(res.code==='000'){
	  				this.getMB();
	  				this.clear();
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
		clear(){
			this.templateData.templateId = "";
			this.templateData.companyCode = "";
			this.templateData.companyName = "";
			this.templateData.priceType = "";
			this.templateData.list = [];
			
			this.listdata.expressChoose="";
			this.listdata.expressArea="";
			this.listdata.expressAreaName="";
			this.listdata.frontWeight="";
			this.listdata.frontQuantity="";
			this.listdata.frontFreight="";
			this.listdata.afterWeight="";
			this.listdata.afterQuantity="";
			this.listdata.afterFreight="";
			this.listdata.defaultFlag="";
		},
		del(id){
			if(confirm("确定删除该数据吗")){
				this.loading = true;
				let params = {
					templateId:id
				};
				LF.net.getJSON("/merchant/logistics/template/del",params,res=>{
		  			if(res.code==='000'){
		  				this.getMB();
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
			}
		},
		doStr(data,value){
			let rs = "";
			if(data){
				rs = data+"||"+value;
			}else{
				rs = value;
			}
			return rs;
		},
		checkStr(data,value){
			data = data.toString();
			var rs = false;
			var rl = data.split("||");
			for(let i in rl){
				if(rl[i] == value){
					rs = true;
				}
			}
			return rs;
		}
	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		//获取登录人ID
    	this.merchantId = LF.cookie.get("merchantId");
    	this.getArea();
    	this.getKD();
    	this.getMB();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})