//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHeader from './../../../components/header_new.vue';
import LfFooter from './../../../components/footer.vue';
//引入element-ui组件
import { Card, Loading, Carousel, CarouselItem } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);

/*
 * 实例化Vue实例
 * el：挂在节点，不能挂在到body上。统一规定el全部挂在到body下的唯一的根div。例子参考index.html
 * data:数据初始化，数据有响应式要求，自行查看API哪些能触发视图响应更新
 */
new Vue({
	el: '#app',
	data: {
		
		
	},

	/*
	 * 方法，所有方法挂载methods下面，在Vue实例内通过this.methodName来调用方法。
	 */
	methods: {
		go(url) {
			LF.window.openWindow(url);
		},
		/*
		 * 根据分类structureNo跳转到具体路分类页面，暂时先跳百度
		 */
		gotoByStructureNo(structureNo) {
			LF.window.openWindow("list.html?structureNo="+structureNo);
		},
		goByGoodId(id) {
			LF.window.openWindow("store/storedetails.html?goodsId="+id);
//			LF.window.openWindow("http://www.baidu.com");
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
		console.log("beforeMount");
	},
	/*
	 *组件挂在完成响应 
	 */
	mounted() {
		console.log("mounted");

//		return;
		//初始广告数据
		
	},
	/**
	 * 挂在自己的vue组件，命名驼峰方式
	 * 例子：组件名称：LfHeader 标签为：<lf-header></lf-header>
	 */
	components: {
		LfHeader,
		LfFooter
	},
})