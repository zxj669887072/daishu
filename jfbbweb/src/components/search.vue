<style>
	.head{
		overflow: inherit;
		display:inline-block;
	}
	.search2 .text {
	    border: none;
	    float: left;
	    height: 32px;
	    width: 225px;
	    margin: 0px;
	    margin-left: 5px;
	    font-size: 12px;
	    line-height: 32px;
	    padding:0;
	}

	.search2 dd .btn {
	    width: 64px;
	    height: 34px;
	    float: right;
	    cursor: pointer;
	    border: none;
	    border-radius: 0;
	    background: url(../images/search_07.png) no-repeat center #f37e01;
	}
	.settled_top {
	    padding-top: 10px;
	    overflow: inherit;
	    background: #FFF;
	    height: 72px;
	}
	.search2{
	    position: relative;
	    overflow: inherit;
	    height: 36px;
	    width: 300px;
	    margin-top: 4px;
	    float: right;
	    margin-left: 50px;
	    border: 2px solid #f37e01;
	    background: #fff;
	    box-sizing: border-box;
	}
	.search_wrap{
	    position: absolute;
	    top: 31px;
	    left: -2px;
	    z-index: 1;
	    background: #fff;
	    border: 2px solid #f37e01;
	    _overflow: hidden;
	    box-shadow: 1px 1px 3px #ededed;
	    -webkit-box-shadow: 1px 1px 3px #ededed;
	    height: auto;
	    width: 300px;
	    z-index:9;
	    box-sizing:border-box;
	}
	.search_wrap .active{
	    display: block;
	}
	.search_wrap li{
	    color: #000;
	    font: 14px arial;
	    line-height: 22px;
	    padding: 0 8px;
	    position: relative;
	    cursor: default;
	    padding: 5px 5px;
	    text-align: left;
	}
</style>
<template>
<div class="search2">
    <dl>
        <dt><input name="" type="text" class="text c-9" @focus="doSearchStr()"  @keydown="doSearchStr()" @keyup="doSearchStr()" v-model="searchStr" placeholder="请输入店铺名称或门牌号" /></dt>
        <dd><input name="" type="button" value="" @click="clickSearch()" class="btn" /></dd>
    </dl>
    <ul class="search_wrap" v-if="searchDataList.length>0">
        <li v-for="searchData in searchDataList">
            <!-- <a :href=" 'http://www.kangaromall.com/app/pages/store/storeshop.html?houseNumber='+searchData.houseNumber+'&merchantId='+searchData.id" target="_blank"> -->
            <a href="#" @click="go('/app/pages/store/storeshop.html?houseNumber='+searchData.houseNumber+'&merchantId='+searchData.id)">
                <!-- <img :src="searchData.logo" alt="" style="width: 50px;"> -->
                <span>{{searchData.shopName}}</span>
                <span>{{searchData.houseNumber}}</span>
            </a>
        </li>
    </ul>
</div>
</template>
<script>
import LF from 'LF';
import Vue from 'Vue';
import {
	Message
} from 'element-ui';

	export default {	
		data() {
			return {
                searchStr: '',
				searchDataList:[]
			}
		},
		computed: {

		},
		methods: {			
			doSearchStr() {
				var _this = this;
				if (this.searchStr === '') {
					_this.searchDataList = [];
					return;
				}
				/*if(reg.test(_this.searchStr)){
					LF.net.getJSON("/store/data/details", {
					houseNumber: this.searchStr
					}, res => {
						if (res.code == "000") {
							let storeId = res.data.id;
							if (storeId == '') {
								Message({
									type: 'info',
									message: "未找到对应的实体店，请重新输入"
								});
								return;
							}
							_this.searchDataList.push(res.data);
						} else {
							Message({
								type: 'info',
								message: "未找到对应的实体店，请重新输入"
							});
						}
					}, res => {
						console.log("error：" + JSON.stringify(res));
					});
				}else{*/
					LF.net.getJSON("/store/merchant/selectByParams",{'queryParams':this.searchStr},res => {
						if(res.code === '000'){
							let storeId = res.data.id;console.log(res.data,res.data.list ,res.data.list.length ==0)
							// if (storeId == '') {
							if (res.data.list.length == 0) {
								Message({
									type: 'info',
									message: "未找到对应的实体店，请重新输入"
								});
								return;
							}
							_this.searchDataList = res.data.list;
						}
					},res =>{

					});
			},
			clickSearch(){
				var _this = this;
				if (this.searchStr == '') {
					Message({
						type: 'info',
						message: "请输入门牌号或实体店名称"
					});
					_this.searchDataList = [];
					return;
				}
				_this.doSearchStr();
			},
			stopPropagation(e) {
				e = e || window.event;
				if(e.stopPropagation) { //W3C阻止冒泡方法
					e.stopPropagation();
				} else {
					e.cancelBubble = true; //IE阻止冒泡方法
				}
			},
			go(url) {
				if(window.location.host == 'localhost:3000' || window.location.host == '119.23.71.113:82'  || window.location.host == 'www.kangaromall.com' || window.location.host == 'kangaromall.com'){console.log(url,'http://www.kangaromall.com'+url)
                  LF.window.openWindow(url,'_self');
              }else if(window.location.host == 'www.lanshanjishi.com' || window.location.host == 'lanshanjishi.com'){
                LF.window.openWindow('http://www.kangaromall.com'+url,'_self');
              }   
			}
		},
		beforeMount() {},
		mounted() {
			var _this = this;
			document.getElementsByTagName("body")[0].onclick=function(e){
				_this.searchDataList=[];
				_this.stopPropagation(e);
			};
        },
		destroyed() {},
		components: {}
	}
</script>