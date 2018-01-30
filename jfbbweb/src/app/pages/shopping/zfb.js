/**
 *  
 */
//工程js框架
import LF from 'LF';
import Vue from 'vue';
 
//引入element-ui组件
 

new Vue({
	el:"#app",
	data:{
		html:''
	},
	methods:{
		 
	},
	/**
	 * 完成之后响应  初始化
	 */
	mounted(){
		 var param =LF.window.getParams();
		 this.html=param.ps;
	},
		
	components: {
       
    }
})
