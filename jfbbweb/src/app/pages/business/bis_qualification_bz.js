import LF from 'LF';
import hex_md5  from './../../../js/framework/md5.js';
import Vue from 'vue';
import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue';
import { Message } from 'element-ui'
var vm = new Vue({
	el: '#app',
	data: {
		merchantId:"",
		bizLicUrl:"",
		bizLicUrl:"",
		idCardUrls:"",
		handIdCardUrl:"",
		handIdCardUrlList:"",
		idCardUrlList:""
	},
	methods: {
		getZZ(){
			let params = {
				merchantId:this.merchantId
        	};
        	LF.net.getJSON("/merchant/shop/info",params,res=>{
      			if(res.code==='000'){
      				this.bizLicUrl = res.data.bizLicUrl;
      				this.idCardUrls = res.data.idCardUrls;
      				this.handIdCardUrl = res.data.handIdCardUrl;
					this.handIdCardUrlList = res.data.handIdCardUrlList;
					this.idCardUrlList = res.data.idCardUrlList;
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
		}
	},
	beforeMount(){
    	
    },
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		this.merchantId = LF.cookie.get("merchantId");
    	this.getZZ();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft
	}
})