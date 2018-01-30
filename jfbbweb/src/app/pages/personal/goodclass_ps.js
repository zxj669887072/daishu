import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/head.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from   '../../../components/left.vue';
import LfList from 	 '../../../components/orderlist.vue';
import { Button, Select, Card,Radio,Form,FormItem,Input, Loading,Col,Row,Carousel,CarouselItem,Pagination,Tabs,TabPane,Option,Dialog,TableColumn,Table,Message} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Option)
	Vue.use(Dialog)
	Vue.use(TableColumn)
	Vue.use(Table)


 
new Vue({
    el: '#app',
    data: { 
    	goodinfo:{
    		checkd:[],
    		checkall:false,
    	},
    	pager:{
        	size:4,
        	curpage:1,
        	total:0
       },
       goodlist:[]
    	
    	 
    } ,
    methods:{ 
    	addNew:function(){
    		this.goodlist.push({id:"",groupName:"",sort:"",createate:""});
    	},
    	checkall:function(){
    		var _this =this;
			if(!_this.goodinfo.checkall){
				_this.goodinfo.checkd=[];
			}else{//全选哦
				_this.goodinfo.checkd=[];
				var ind=0;
				_this.goodlist.forEach(function(item){
					_this.goodinfo.checkd.push(ind++);
				});
			}
    	},
    	/**
    	 *调整位置  交换js数组 
    	 * @param {Object} step
    	 * @param {Object} index
    	 */
    	movestep:function(step,index){
    		if(step<0||step>this.goodlist.length-1){
    			return ;
    		}else{
    			var good=this.goodlist[step];
    			var goodo=this.goodlist[index];
    			this.goodlist.splice(step,1,goodo);
    			this.goodlist.splice(index,1,good);
    		}
    	},
    	deletegood:function(id,index){
    	 	if(id!=null &&id!=""){
    	 		LF.net.getJSON("/merchant/shop/group/delete", {ids:id},res=>{
	    			if(res.code=="000"){
                        Message({
                            type: 'info',
                            message:"删除成功"
                        });
					}
					else{
                        Message({
                            type: 'warning',
                            message:res.errorMessage
                        });
					}
				}, res=>{
					res=false;
					console.log("error：" + JSON.stringify(res));
				});
    	 	}
			this.goodlist.splice(index,1);
    	},
    	deletecheckd:function(){
    		console.log(this.goodinfo.checkd);
    		var _this =this;
    		var ids='';
    		
    		if(_this.goodinfo.checkd.length>0){
    			_this.goodinfo.checkd.forEach(function(ite){
	    	 		if(_this.goodlist[ite].id!=""){
	    	 			ids+=_this.goodlist[ite].id+",";
	    	 		}
	    		});
    			LF.net.getJSON("/merchant/shop/group/delete", {ids:ids},res=>{
	    			if(res.code=="000"){
                        Message({
                            type: 'info',
                            message:"删除成功"
                        });
	    				_this.getGoodList();
					}
					else{
                        Message({
                            type: 'waring',
                            message:res.errorMessage
                        });
					}
				}, res=>{
				res=false;
					console.log("error：" + JSON.stringify(res));
				});
    		}else{
                Message({
                    type: 'error',
                    message:"请至少选择一项"
                });
    		}
    		
    		
    	},
     	
    	savaAll:function(){
    		var _this =this;
    		console.log(this.goodlist);
        		if(_this.goodlist.length>0){console.log(123456789,_this.goodlist.length,_this.goodlist[_this.goodlist.length-1])
    			var res =true;
    			var so=1;
    	// 		_this.goodlist.forEach(function(item){
    	// 			LF.net.getJSON("/merchant/shop/group/save", {groupName:item.groupName,id:item.id,sort:so++},res=>{
			  //   		if(res.code=="000"){
     //                                                                            Message({
     //                                                                                type: 'info',
     //                                                                                message:"保存成功"
     //                                                                            });
     //                                                            }else{
     //                                                                            Message({
     //                                                                                type: 'error',
     //                                                                                message:res.errorMessage
     //                                                                            });
					// 	}
					// }, res=>{
					// res=false;
					// 	console.log("error：" + JSON.stringify(res));
					// });
    	// 		});
                                       _this.goodlist.forEach(function(item){console.log(item)
                                                    if(item.groupName == '' || item.groupName == null){
                                                                Message({
                                                                             type: 'error',
                                                                             message:'分类名称不能为空'
                                                                });
                                                                return res=false;
                                                     };  
                                                     if(!/^(?!\d{1,16}$)(?:[a-z\d_]{1,16}|[\u4E00-\u9FA5]{1,8})$/.test(item.groupName)){
                                                                Message({
                                                                             type: 'error',
                                                                             message:'请输入正确的分类(不得超过8个汉字)'
                                                                });
                                                                return res=false;                                                    
                                                    };                                                    
                                       });
                                       if(res){console.log(156)
                                                    _this.goodlist.forEach(function(item){
                                                                LF.net.getJSON("/merchant/shop/group/save", {groupName:item.groupName,id:item.id,sort:so++},res=>{
                                                                            if(res.code=="000"){
                                                                                        Message({
                                                                                                     type: 'info',
                                                                                                     message:"保存成功"
                                                                                        });
                                                                             }else{
                                                                                        Message({
                                                                                                     type: 'error',
                                                                                                     message:res.errorMessage
                                                                                        });
                                                                            }
                                                                }, res=>{
                                                                            res=false;
                                                                            console.log("error：" + JSON.stringify(res));
                                                                });
                                                    });
                                       } 
    			
    		}else{
                                    Message({
                                        type: 'error',
                                        message:"请新增分组"
                                    });
    		}
    		
    	},
    	getGoodList:function(){
    		var param ={};
    		var _this =this ;
    		var _par =LF.window.getParams();
			LF.net.getJSON("/merchant/shop/group/list", {},res=>{
	    		if(res.code=="000"){
					 console.log(res.data);
					 _this.goodlist=res.data.groupList;
				}
			}, res=>{
				console.log("error：" + JSON.stringify(res));
			});
    	},
        choose:function(){
        	for(var i = 1;i <= 12;i++){
        		if(i == 7) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555"; 
        	}
        }
    },
    /*
     *组件挂在完成响应 
     */
    mounted(){ 
    	this.choose();
    	if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
			LF.window.openWindow("/app/login.html","_self", false);
		}else{
			 this.getGoodList();
		}
		 
    },
      components: {
        LfHeader,
        LfFooter,
        LfLeft,
        LfList
    }
})