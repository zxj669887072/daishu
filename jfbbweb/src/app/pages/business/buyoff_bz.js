import LF from 'LF';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from   '../../../components/busleft.vue';
import LfList from 	 '../../../components/orderlist.vue';
import { Button, Select,Form,FormItem,Input,  Card,Radio, Loading,Col,Row,Carousel,CarouselItem,Pagination,Tabs,TabPane,Option,Dialog,TableColumn,Table,Message,MessageBox} from 'element-ui'

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
    	pager:{
        	size:10,
        	curpage:1,
        	total:0
        },
      	goodsStatusList:[],
      goodinfo:{
      	merchantId:LF.cookie.get("merchantId"),
      	goodsName:'',
      	goodsategoryId:'',
      	priceMin:'',
      	priceMax:'',
      	shopGroupId:'',
      	goodsStatus:'',
      },
      goodlist:'',
      checkd:{
      	       data:[],
               dataStatus:[],
      	       checkall:false
      },
      /**
       *分组信息
       */
    	groupList:'',
    	load:{
    		goodload:false
    	}

    } ,
    methods:{
    	/**
		 * 全选  所有
		 */
		checkall:function(){                                                                  console.log(this.checkd.data)
                    if( navigator.userAgent.indexOf("Firefox")>0){ 
                          this.checkd.checkall = !this.checkd.checkall;
                    };    
   			var _this =this;        
  			if(!_this.checkd.checkall){
  				 _this.checkd.data=[];
                          _this.checkd.dataStatus = [];
  			}else{//全选哦
				_this.checkd.data=[];
                          _this.checkd.dataStatus = [];
				_this.goodlist.forEach(function(item){
					_this.checkd.data.push(item.id);
                                _this.checkd.dataStatus.push(item.goodsStatus);
				});
                        console.log(_this.checkd.data,123);
			}
		},
    clickInput : function(status,tar){console.log(this.checkd.data);
            var _this = this;
             if( navigator.userAgent.indexOf("Firefox")>0){ 
                    if(tar.target.checked == true){        
                                  _this.checkd.data.push(Number(tar.target.value))
                    }else{           
                                if(_this.checkd.data.indexOf(Number(tar.target.value)) != -1){
                                      _this.checkd.data.splice(_this.checkd.data.indexOf(Number(tar.target.value)),1);                                            
                                };                                 
                    };  
              };
              if(_this.checkd.data.length == _this.goodlist.length){
                _this.checkd.checkall = true;
              }else{
                _this.checkd.checkall = false;
              }
        
    },
		/***
		 * 清除查询条件
		 */
		clearsearch:function(){
			var _this =this;
			for(var i in this.goodinfo){
				if(i!='merchantId'){
					_this.goodinfo[i]='';
				}
			}
		},
		goto:function(url,par){
			LF.window.openWindow(url+"?m=4&id="+par);
		},
    gotoGoodsDtl:function(url,par){
      LF.window.openWindow(url+"?goodsId="+par);
    },
		changegood:function(id,type){
      var _this = this;
      if(type == 1){
        MessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            LF.net.getJSON("/merchant/goods/delete", {goodsIds:id,optType:1},res=>{
                if(res.code=="000"){
                 Message({
                   type: 'info',
                   message:"删除商品成功"
                 });
                this.getgoodList();
              }
            }, res=>{
              console.log("error：" + JSON.stringify(res));
            });
          }).catch(() => {
            Message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }else{
        _this.delService(id,type);
      }
		},
    delService: function(id,type){
      LF.net.getJSON("/merchant/goods/delete", {goodsIds:id,optType:type},res=>{
          if(res.code=="000"){
             if(type=='2'){
                         Message({
                             type: 'info',
                             message:"上架商品成功"
                         });
             }else if(type=='3'){
                         Message({
                             type: 'info',
                             message:"下架商品成功"                             
                         });
             }else if(type=='4'){
                         Message({
                             type: 'info',
                             message:"橱窗推荐成功"
                         });
             }else if(type=='5'){
                         Message({
                             type: 'info',
                             message:"取消橱窗推荐成功"
                         });
             }
          this.getgoodList();
        }
      }, res=>{
        console.log("error：" + JSON.stringify(res));
      });
    },
		changeall:function(type){
      var _this = this;
      //type:2 上架
      //type:3 下架
         //只能上架未发布和下架的商品
         //商品状态(1:未发布 2:上架 3:下架 4:图片处理中)
         if(type == 2){
          _this.goodlist.forEach(function(v,k){
            if(v.goodsStatus == 2 || v.goodsStatus == 4){
              if(_this.checkd.data.indexOf(v.id) != -1){
                _this.checkd.data.splice(_this.checkd.data.indexOf(v.id),1);
              }
            }
          });
        }
        if(type == 3){
          _this.goodlist.forEach(function(v,k){
            if(v.goodsStatus == 1 || v.goodsStatus == 3 || v.goodsStatus == 4){
              if(_this.checkd.data.indexOf(v.id) != -1){
                _this.checkd.data.splice(_this.checkd.data.indexOf(v.id),1);
              }
            }
          });
        }
      var it ="";
      if(_this.checkd.data.length>0){
        _this.checkd.data.forEach(function(ids){
          it+=ids+","
        });
				_this.changegood(it,type);
			}else if(_this.checkd.data.length==0 && type==2){
        Message({
          type: 'warning',
          message:"请选择未发布和已下架的商品上架"
        });
      }else if(_this.checkd.data.length==0 && type==3){
        Message({
          type: 'warning',
          message:"请选择已上架的商品下架"
        });
      }else{
        Message({
          type: 'warning',
          message:"请选择商品"
        });
			}

		},
    	/**
    	 *获取商品列表
    	 */
    	getgoodList:function(){
    		this.goodinfo['pageSize']=this.pager.size;
    		this.goodinfo['pageNo']=this.pager.curpage;
    		var _this=this;
    		_this.load.goodload=true;

     		LF.net.getJSON("merchant/goods/list", this.goodinfo, res => {
				if(res.code == "000") {
					_this.goodlist=res.data.goodsList;                 console.log(_this.goodlist,126)
					_this.pager.total=res.data.totalCount;
				}
                _this.load.goodload=false;
			}, function(xhr, type, errorThrown) {
				console.log("error：" + type);
				console.log("errorThrown：" + errorThrown);
			});
    	},
    	/**
    	 *点击分页
    	 * @param {Object} val
    	 */
    	handleCurrentChange:function(val){
             // var _this =this;
             if(this.checkd.checkall){
                    this.checkd.data=[];
                     this.checkd.dataStatus = [];
                    this.checkd.checkall = false;
             };console.log(this.checkd);
    		this.pager.curpage=val;
       		this.getgoodList();
    	}

    },
    /*
     *组件挂在完成响应
     */
    mounted(){
    	LF.net.getJSON("/sys/dict/get", {"type": "goods_status"}, res => {
			if (res.code == '000'){
				this.goodsStatusList = res.data;
    			this.getgoodList();
			}
		}, function(xhr, type, errorThrown) {
			console.log("error：" + type);
			console.log("errorThrown：" + errorThrown);
		});
		LF.net.getJSON("/merchant/shop/group/list", {tokenId:LF.cookie.get("bussTokenId")},res=>{
    		if(res.code=="000"){
				 this.groupList=res.data.groupList;
			}
		}, res=>{
			console.log("error：" + JSON.stringify(res));
		});
    },
      components: {
        LfHeader,
        LfFooter,
        LfLeft,
        LfList
    }
})