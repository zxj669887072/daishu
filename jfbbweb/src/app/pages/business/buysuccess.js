import LF from 'LF';
import Vue from 'vue';
import LfSearch from '../../../components/search.vue';
import { Card, Loading, Carousel, CarouselItem ,Radio,Message} from 'element-ui';

new Vue({
	el:"#app",
	data:{		
		searchStr:""
	},
	methods:{					
		doSearch(){
		            if (this.searchStr == ''){
		                Message({
							type: 'warning',
							message:"请输入门牌号！"
						});
		                return;
		            }

		            LF.net.getJSON("/store/data/details", { houseNumber:this.searchStr }, res => {
		                if(res.code == "000") {
		                    let storeId = res.data.id;
		                    if (storeId == ''){
		                    	Message({
									type: 'warning',
									message:"未找到对应的实体店，请重新输入！"
								});
		                        return;
		                    }
		                    LF.window.openWindow("/app/pages/store/storeshop.html?houseNumber="+this.searchStr + "&merchantId=" + storeId,"_self");
		                } else {
		                   	Message({
								type: 'warning',
								message:"未找到对应的实体店，请重新输入！"
							});
		                }
		            }, res => {
		        		Message({
							type: 'error',
							message:res.errorMessage
						});
		                console.log("error：" + JSON.stringify(res));
		            });
        		},
	},
	components: {
		LfSearch
	}
});
