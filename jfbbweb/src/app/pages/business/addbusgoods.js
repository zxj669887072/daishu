import LF from 'LF';
import Vue from 'vue';
import '../../../ueditor/ueditor.config.js';
import '../../../ueditor/ueditor.all.min.js';
import '../../../ueditor/lang/zh-cn/zh-cn.js';

import LfHeader from '../../../components/bhead.vue';
import LfFooter from '../../../components/footer.vue';
import LfLeft from '../../../components/busleft.vue';
import LfList from '../../../components/orderlist.vue';

//import LfEdit from '../../../components/ctxtedit.vue';
import {
	Button,
	Select,
	Form,
	FormItem,
	Input,
	Card,
	Radio,
	Loading,
	Col,
	Row,
	Carousel,
	CarouselItem,
	Pagination,
	Tabs,
	TabPane,
	Option,
	Dialog,
	TableColumn,
	Upload,
	Message
} from 'element-ui'

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
Vue.use(Upload)
const TOOLBARS = [
	[
		'fullscreen', 'source', '|', 'undo', 'redo', '|',
		'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
		'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
		'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
		'directionalityltr', 'directionalityrtl', 'indent', '|',
		'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
		'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
		'emotion', 'map', 'insertframe', 'insertcode', 'pagebreak', 'template', 'background', '|',
		'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
		'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
		'preview', 'searchreplace', 'drafts', 'help'
	]
];

new Vue({
	el: '#app',
	data: {
		//ueditorConfig:{},
		ueEditor: null,
		submitMsg: '确认添加',
		titleMsg: '添加商品',
		uploadVisible:false,
		desUrlList:[],
		deliveryForm: {
			exCompany: "",
			exNo: ""
		},
		deliveryRules: {
			exCompany: [{
				required: true,
				message: '请选择所属分类',
				trigger: 'blur'
			}]
		},
		upload: {
			imageType: 1
		},
		head: {
			'Content-Type': 'multipart/form-data'
		},
		uploadurl: '',
		dialogImageUrl: '',
		previewImageUrl:'',
		dialogVisible: false,
		previewVisible:false,
		/**
		 *发布的商品信息
		 */
		goodinfo: {
			toShopFlag: '0',
			winRecommFlag: '1',
			shopGroupId: '',
			goodsTag: '1',
			spcelist: '',
			spec: '',
			goodsName: '',
			goodsBuyPoint: '',
			price: '',
			bkge: 0,
			rbkge: 0,
			weight: 0,
			qty: '',
			mainUrls: '',
			mainUrllist: [],
			description: '',
			id: '',
			selectvalue: ''
		},
		verifyInfo: {
			goodsName: {
				verinfo: '商品名称不能为空',
				data: false
			},
			selectvalue: {
				verinfo: '所属分类不能为空',
				data: false
			},
			price: {
				verinfo: '商品价格不能为空',
				data: false
			},
			bkgeSize: {
				verinfo: '商品佣金不能大于商品价格',
				data: false
			},
			qty: {
				verinfo: '商品库存不能为空',
				data: false
			},
			qtyZero: {
				verinfo: '请填写正确的商品库存数量',
				data: false
			},
			spcelist: {
				verinfo: '规格组合至少要有一条',
				data: false
			}

		},
		merchantId: LF.cookie.get("merchantId"),
		/**
		 *商品展示查询信息
		 */
		goodlistinfo: {
			shopgroup: ''
		},
		file: '',
		detailFile: '',
		loading: false
	},
	methods: {
		/**
		 *商品详细信息
		 */
		addClass: function() {
			LF.window.openWindow("/app/pages/business/goodclass_bz.html?m=2&mid=0", "_self");
		},
		geteditinfo: function(evl) {
			this.goodinfo.description = evl;
			console.log(this.goodinfo.description);
		},
		uploadbefore: function() {
			if (this.goodinfo.mainUrllist != null && this.goodinfo.mainUrllist.length >= 5) {
				Message({
					type: 'warning',
					message: "最多保存五张图片"
				});
				return false;
			}
		},
		uploadDetailbefore: function(file,filelist) {
			if (this.desUrlList != null && this.desUrlList.length >= 99) {
				Message({
					type: 'warning',
					message: "最多保存九十九张图片"
				});
				return false;
			}
		},
		uploadFile: function(argFile) {
			var _this = this;
			var file = argFile.file;
			/*if (this.file == '') {
				file = this.$el.querySelector('.list-box input[type="file"]');
			} else {
				file = this.file;
			}*/
			console.log(file)
			//file.setAttribute("name", 'file');
			//file.setAttribute("enctype", 'multipart/form-data');
			var formNode = document.createElement('form');
			formNode.enctype = 'multipart/form-data';
			//var clone = file.cloneNode(true);
			//this.file = file;
			//formNode.appendChild(file);
			var formData = new FormData(formNode);
			formData.append('file', file);
			var url = '/integral/image/upload?tokenId=' + LF.cookie.get("bussTokenId") + "&imageType=1";

			_this.loading = true;
			LF.net.upload(url, formData, function(response) {
				_this.loading = false;
				if (_this.goodinfo.mainUrllist == null || _this.goodinfo.mainUrllist == '') {
					_this.goodinfo.mainUrllist = [];
				}
				_this.goodinfo.mainUrllist.push({
					name: response.data.split("goods")[1],
					url: response.data
				});
			}, function(res) {
				console.log("error", res);
			});
			/*axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
           }).then(function(response) {
                if(_this.goodinfo.mainUrllist==null||_this.goodinfo.mainUrllist==''){
                	_this.goodinfo.mainUrllist=[];
                }
                _this.goodinfo.mainUrllist.push({name:response.data.data.split("icon")[1],url:response.data.data});
            }).catch(function(error) {
                console.log(error);
            })*/
		},
		uploadDetailFile: function(argFile) {
			var fileObj = argFile.file;
			var _this = this;
			/*var file;
			if (this.detailFile == '') {
				file =  this.$el.querySelector('#uploadDscFile input[type="file"]');
			} else {
				file = this.detailFile;
			}*/
			//console.log(file)
			//file.setAttribute("name", 'file');
			//file.setAttribute("enctype", 'multipart/form-data');
			var formNode = document.createElement('form');
			formNode.enctype = 'multipart/form-data';
			//var clone = file.cloneNode(true);
			//this.detailFile = file;
			//formNode.appendChild(file);
			var formData = new FormData(formNode);
			formData.append('file', fileObj);
			 var url = '/integral/image/upload?tokenId='+LF.cookie.get("bussTokenId")+"&imageType=1" ;
			_this.loading = true;
			LF.net.upload(url, formData, function(response) {
				_this.loading = false;
				if (_this.desUrlList == null || _this.desUrlList == '') {
					_this.desUrlList = [];
				}
				_this.desUrlList.push({
					name: response.data.split("goods")[1],
					url: response.data
				});
			}, function(res) {
				_this.loading = false;
				console.log("error", res);
			});
		},
		handleRemove(file, fileList) {
			this.goodinfo.mainUrllist = fileList;
			// console.log(this.goodinfo.mainUrllist);
		},
		handleDetailRemove(file, fileList) {
			this.desUrlList = fileList;
		},
		handlePictureCardPreview(file) {
			this.previewImageUrl = file.url;
			this.previewVisible = true;
		},
		handlePictureDetailPreview(file) {
			this.previewImageUrl = file.url;
			this.previewVisible = true;
		},
		/**
		 *验证提交的时候
		 */
		verify: function(name, event) {
			console.log(name);
			if (!this.goodinfo[name] && 'qtyZero' != name && 'bkgeSize' != name) { //当name没有值的情况
				this.verifyInfo[name].data = true;
				console.log(this.goodinfo[name], this.verifyInfo, this.goodinfo);
				return false;
			} else {
				if ('qty' == name) {
					if (this.goodinfo.qty <= 0) {
						this.verifyInfo['qtyZero'].data = true;
						return false;
					} else {
						this.verifyInfo['qtyZero'].data = false;
						return true;
					}
				};
				if(name == 'price'){console.log(String(this.goodinfo[name]))
					if(String(this.goodinfo[name]).split(".")[1]){
						if(String(this.goodinfo[name]).split(".")[1].length>2){
							Message({
								type: 'warning',
								message: "商品价格最多保留2位小数"
							});
							return false;
						}
					}
					// this.goodinfo[name] = Number(this.goodinfo[name]).toFixed(2);
				}
				if (this.goodinfo.rbkge > 0 && this.goodinfo.price > 0 && this.goodinfo.rbkge > this.goodinfo.price) {
					this.verifyInfo['bkgeSize'].data = true;
					return false;
				} else {
					this.verifyInfo['bkgeSize'].data = false;
				}
				this.verifyInfo[name].data = false;
				return true;
			};
		},
		/**
		 *添加规格
		 */
		addSpec: function() {
			if (this.goodinfo.spec == '') {
				Message({
					type: 'warning',
					message: "规格不能为空"
				});
			} else {

				if (this.goodinfo.spcelist == '') {
					this.goodinfo.spcelist = [];
				}
				// else{
				// 	this.goodinfo.spcelist = [];
				// };
				var arr = this.goodinfo.spec.split("||");
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] != '') {
						this.goodinfo.spcelist.push(arr[i]);
					}
				}

				this.verify('spcelist');
			};
			this.goodinfo.spec = '';
		},
		/**
		 *规格移除
		 * @param {Object} idx
		 */
		removespec: function(idx) {
			this.goodinfo.spcelist.splice(idx, 1);
			if (this.goodinfo.spcelist.length == 0) {
				this.goodinfo.spcelist = '';
			}
		},
		/**
		 *保存商品
		 */
		savegood: function() {
			//校验你想校验的值，比如goodsName
			var res = true;
			var _this = this;
			for (var it in _this.verifyInfo) {console.log(it,656)
				if (!_this.verify(it)) {
					res = false;
				}
			}
			_this.goodinfo.shopGroupId = _this.goodinfo.selectvalue;
			if (_this.goodlistinfo.shopgroup.length > 0 && (_this.goodinfo.shopGroupId == null || _this.goodinfo.shopGroupId == '')) {
				Message({
					type: 'warning',
					message: "请选择分组信息"
				});
				return;
			} else {
				//_this.goodinfo.shopGroupId="";
			}
			if (res) {
				console.log("保存");
				var spc = '',
					urls = '';
				if (_this.goodinfo.spcelist.length > 0) {
					_this.goodinfo.spcelist.forEach(function(item) {
						spc += item + "||";
					});
				}
				// _this.goodinfo.spcelist = '';
				if (_this.goodinfo.mainUrllist != null && _this.goodinfo.mainUrllist.length > 0) {
					_this.goodinfo.mainUrllist.forEach(function(item) {
						urls += item.url + ";";
					});
				};
				if (urls == '' || urls == null) {
					Message({
						type: 'warning',
						message: "请您上传商品图片后再添加保存"
					});
					return;
				};
				_this.goodinfo.spcelist = '';
				_this.goodinfo.mainUrllist = '';
				spc = spc.substring(0, spc.lastIndexOf("||"));
				urls = urls.substring(0, urls.lastIndexOf(";"));
				_this.goodinfo.spec = spc;
				if (_this.goodinfo.rbkge == '' || _this.goodinfo.rbkge == null) {
					_this.goodinfo.bkge = 0;
				}else {
					_this.goodinfo.bkge = _this.goodinfo.rbkge;		
				}
				console.log(_this.goodinfo.rbkge,666)
				_this.goodinfo.mainUrls = urls;
				_this.goodinfo['merchantId'] = _this.merchantId;
				_this.ueEditor.ready(function() {
					//获取html内容，返回: <p>hello</p>
					_this.goodinfo.description = _this.ueEditor.getContent();
				});									console.log(123,_this.goodinfo)
				LF.net.getJSON("/merchant/goods/save", _this.goodinfo, res => {
					if (res.code == "000") {
						Message({
							type:"success",
							message:"保存成功",
							onClose:function(){
								LF.window.openWindow("/app/pages/business/buyoff_bz.html", "_self");
							}
						});
					}
				}, res => {
					console.log("error：" + JSON.stringify(res));
				});

			} else {
				return;
			}
		},

		/**
		 *获取分组信息
		 */
		getGoodList: function() {
			var param = {
				tokenId: LF.cookie.get("bussTokenId")
			};
			var _this = this;
			LF.net.getJSON("/merchant/shop/group/list", param, res => {
				if (res.code == "000") {
					if (res.data.groupList.length > 0) {
						_this.goodinfo.shopGroupId = res.data.groupList[0].id;
					}
					_this.goodlistinfo.shopgroup = res.data.groupList;
					console.log(_this.goodlistinfo.shopgroup,888);
				}
			}, res => {
				console.log("error：" + JSON.stringify(res));
			});
		},
		/**
		 *获取商品信息，  如果有  设置进去，没有就算了
		 */
		getGoodInfo: function() {
			var param = LF.window.getParams();
			var _this = this;
			if (param.id != null) {
				this.titleMsg = "编辑商品",
				this.submitMsg = "确认保存",
				LF.net.getJSON("/goods/details", {
					goodsId: param.id
				}, res => {
					if (res.code == "000") {
						console.log(res.data,777);
						for (var i in _this.goodinfo) {
							if (i == 'spcelist') {
								_this.goodinfo.spcelist = res.data.spec.split("||");
							} else if (i == 'mainUrllist') {
								var lis = res.data.mainUrls.split(";");
								var urllist = [];
								for (var j = 0; j < lis.length; j++) {
									urllist.push({
										name: j + 1,
										url: lis[j]
									});
								}
								_this.goodinfo.mainUrllist = urllist;
							} else {
								_this.goodinfo[i] = res.data[i];
							}
						}
						_this.goodinfo.spec = "";
						_this.goodinfo.selectvalue = res.data['shopGroupId'];						
						//_this.goodinfo.spec = '';
						_this.ueEditor.ready(function() {
							//设置编辑器的内容
							_this.ueEditor.setContent(_this.goodinfo.description);
							//获取html内容，返回: <p>hello</p>
							var html = _this.ueEditor.getContent();
							//获取纯文本内容，返回: hello
							//var txt = _this.ueEditor.getContentTxt();
						});
					}
				}, res => {
					console.log("error：" + JSON.stringify(res));
				});
			}
		},
		ueditorReady() {
			var _this = this;
			this.ueEditor = UE.getEditor('gooInfoContainer', {
				UEDITOR_HOME_URL: '../../../ueditor/',
				toolbars: TOOLBARS,
				serverUrl: "",
				initialFrameHeight: 300,
				minFrameHeight: 300,
				autoHeightEnabled: false,
				scaleEnabled: false,
				elementPathEnabled : false,
				//wordCount:false
				//topOffset:400
			});
			this.addButton();
		},
		setImgContent(){
			var _this = this;
			_this.uploadVisible = false;
			var html = "";
			var url = '';
			for(var i = 0;i<_this.desUrlList.length;i++){
				url = _this.desUrlList[i].url;
				html+='<p><img src='+url+' style="width:100%;max-width:100%;"><p>';
			}
			_this.ueEditor.ready(function() {
				//获取html内容，返回: <p>hello</p>
				var _html = _this.ueEditor.getContent();
				//设置编辑器的内容
				_this.ueEditor.setContent(_html+html);
				//获取纯文本内容，返回: hello
				//var txt = _this.ueEditor.getContentTxt();
			});
		},
		addButton:function(){
			var _this = this;
			UE.registerUI('button',function(editor,uiName){
			    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
			    editor.registerCommand(uiName,{
			        execCommand:function(){
			        	_this.desUrlList = [];
			            _this.uploadVisible = true;
			        }
			    });

			    //创建一个button
			    var btn = new UE.ui.Button({
			        //按钮的名字
			        name:uiName,
			        //提示
			        title:uiName,
			        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
			        cssRules :'background-position: -380px 0;',
			        //点击时执行的命令
			        onclick:function () {
			            //这里可以不用执行命令,做你自己的操作也可
			           editor.execCommand(uiName);
			        }
			    });

			    //当点到编辑内容上时，按钮要做的状态反射
			    editor.addListener('selectionchange', function () {
			        var state = editor.queryCommandState(uiName);
			        if (state == -1) {
			            btn.setDisabled(true);
			            btn.setChecked(false);
			        } else {
			            btn.setDisabled(false);
			            btn.setChecked(state);
			        }
			    });

			    //因为你是添加button,所以需要返回这个button
			    return btn;
			});
		}
	},
	/*
	 *组件挂在完成响应
	 */
	mounted() {
		this.uploadurl = LF.window.getUrl() + "/integral/image/upload";
		this.ueditorReady();
		this.getGoodInfo();
		this.getGoodList();
	},
	components: {
		LfHeader,
		LfFooter,
		LfLeft,
		LfList,
		//LfEdit
	}
})