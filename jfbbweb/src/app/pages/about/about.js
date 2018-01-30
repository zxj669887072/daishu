//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHeader from '../../../components/header_new.vue';
import LfFooter from '../../../components/footer.vue';
import LfSearch from '../../../components/search.vue';
import {Message } from 'element-ui';
/*
 * 实例化Vue实例
 * el：挂在节点，不能挂在到body上。统一规定el全部挂在到body下的唯一的根div。例子参考index.html
 * data:数据初始化，数据有响应式要求，自行查看API哪些能触发视图响应更新
 */
new Vue({
    el: '#app',
    data: {
        //搜索门牌号
        searchStr: ''
    },

	/*
	 * 方法，所有方法挂载methods下面，在Vue实例内通过this.methodName来调用方法。
	 */
    methods: {
        go(url) {
            LF.window.openWindow(url);
        },
        closeService(){
        var mapEle = document.getElementById("Map");
        var parentEle = mapEle.parentNode;
        parentEle.style.display = "none";
    },
    onlineSale(){
        LF.net.getJSON("sys/after/sale", {}, function(res) {
            var href="";
           if(res.code==='000'){
                    //href = "http://wpa.qq.com/msgrd?v=3&uin="+res.data.qq+"&site=qq&menu=yes";
                    href="tencent://message/?uin="+res.data.qq+"&Site=qq&Menu=yes"
                    window.open(href);
                }else{
                   console.log(res.errorMessage);
               }
           });
    },
        doSearch(){
            if (this.searchStr == ''){
                Message({
                    type: 'warning',
                    message:"请输入门牌号！"
                });
                return;
            }

            LF.net.getJSON("/store/data/details", { houseNumber: this.searchStr }, res => {
                if(res.code == "000") {
                    let storeId = res.data.id;
                    if (storeId == ''){
                        Message({
                            type: 'warning',
                            message:"未找到对应的实体店，请重新输入！"
                        });
                        return;
                    }
                    LF.window.openWindow("/app/pages/store/storeshop.html?houseNumber="+this.searchStr + "&merchantId=" + storeId);
                } else {
                    Message({
                        type: 'warning',
                        message:"未找到对应的实体店，请重新输入！"
                    });
                }
            }, res => {
                console.log("error：" + JSON.stringify(res));
            });
        }
    },
    /**
     * vue有几个生命周期钩子，可以相当于理解jquery的ready方法。
     * 比如我们需要加载个页面初始化一些数据，可以根据情况放在beforeMount，或者mounted中，区别是一个是在DOM元素挂载之前，一个是挂载完成
     * 一般可以选择mounted
     */
	/*
	 * 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
	 */
    beforeMount() {

    },
	/*
	 *组件挂在完成响应
	 */
    mounted() {
    },
    /**
     * 挂在自己的vue组件，命名驼峰方式
     * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
     */
    components: {
        LfHeader,
        LfSearch,
        LfFooter
    },
})