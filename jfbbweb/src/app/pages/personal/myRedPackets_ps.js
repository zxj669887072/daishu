  //工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
import hex_md5  from './../../../js/framework/md5.js';

var vue = new Vue({
	el: '#app',
	data: {
        pageSize:10,
        dataByUnuseds:[],
        dataByUseds:[],
        dataByBads:[],
        isNullUnused:false,
        isNullBad:false,
        isNullused:false,
	},
	methods:{
             go(url){
                         LF.window.openWindow(url);
             },
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
			LF.window.openWindow("/app/login.html","_self");
		}
    	},
            getRedPackets:function(pageNo){
                         LF.net.getJSON("/member/red/envelope/list", {tokenId:LF.cookie.get("tokenId"),pageSize:this.pageSize,pageNo:pageNo},res=>{
                                      if(res.code=="000"){
                                                    var list=res.data.list;                                                                                                 console.log(list,123,res);                                                                                                                                                                      
                                                   if(list.length==0){                                                                                                        console.log(!this.isNullused,this.dataByUnuseds)
                                                              this.isNullUnused=true;
                                                              this.isNullused=true;
                                                              this.isNullBad=true;
                                                   }else{console.log(123456)
                                                              for (var i=0;i<list.length;i++){
                                                                            var status=list[i].status;
                                                                            if(status==0) {
                                                                                        this.dataByUnuseds.push(list[i]);
                                                                           }else if(status==1){
                                                                                        this.dataByUseds.push(list[i]);
                                                                           }else{                                            
                                                                                        this.dataByBads.push(list[i]);
                                                                           }
                                                              }
                                                              if(this.dataByUnuseds.length==0){
                                                                            this.isNullUnused=true;
                                                              };
                                                              if(this.dataByUseds.length==0){
                                                                            this.isNullused=true;
                                                              };
                                                              if(this.dataByBads.length==0){
                                                                            this.isNullBad=true;
                                                              }
                                                   };
                                       }
                          });
            },
        choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 2){
                    document.getElementById("item"+i).style.color = "#ff3e03";
                }else{
                    document.getElementById("item"+i).style.color = "#555";
                }
        	}
        }
	},
	/*
     *组件挂在完成响应
     */
    mounted(){
      LF.cookie.del("redId");
    	this.goLogin();
    	// this.choose();
        this.getRedPackets(1);
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
})