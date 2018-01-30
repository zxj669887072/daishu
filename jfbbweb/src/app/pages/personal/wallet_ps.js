//工程js框架
import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHead from '../../../components/head.vue';
import LfLeft from '../../../components/left.vue';
import LfFooter from '../../../components/footer.vue';
import hex_md5  from './../../../js/framework/md5.js';
//引入element-ui组件
import { Card, Loading,Form ,Button,Pagination,DatePicker,FormItem,Input,Carousel, CarouselItem,Message } from 'element-ui';
/*
 * 使用element-ui组件
 */
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

Vue.use(DatePicker)

Vue.use(Pagination);

var vue = new Vue({
	el: '#app',
	data: {
                    willShow:false,
                    num:"",
		pagerOne:{
        	size:10,
        	curpage:1,
        	total:0
        },
        pagerTwo:{
        	size:10,
        	curpage:1,
        	total:0
        },
        pagerThree:{
        	size:10,
        	curpage:1,
        	total:0
        },
        pagerFour:{
        	size:10,
        	curpage:1,
        	total:0
        },
        pagerFive:{
        	size:10,
        	curpage:1,
        	total:0
        },
		pagerSix:{
        	size:10,
        	curpage:1,
        	total:0
        },
        pagerSeven:{
        	size:10,
        	curpage:1,
        	total:0
        },
        pagerEight:{
        	size:10,
        	curpage:1,
        	total:0
        },
		wallet:[],
        incomeRecordByBuy:[],
        incomeRecordByActivity:[],
        expendRecord:[],//余额支出记录
        isNullByBuy:false,
        isNullByActivity:false,
        isNullByRecord:false,

        searchTimeOne:'',//搜索时间
        searchTimeTwo:'',//搜索时间
        searchTimeThree:'',//搜索时间
        searchTimeFour:'',//搜索时间
        searchTimeFive:'',//搜索时间
        searchTimeSix:'',//搜索时间
        searchTimeSeven:'',//搜索时间
        searchTimeEight:'',//搜索时间

        incomeRecordShow:true,//积分收入记录
        expendRecordShow:false,//积分支出记录
        bandicootRecordIncome:false,//袋鼠币支出
        bandicootRecordExpend:false,//袋鼠币支出
        returnIntegralRecord:false,//积分返还记录
        rechargeRecordFlag:true,//余额收入记录标
        balanceExpendRecordFlag:false,//余额支出记录
        reimburseRecordFlag:false,//余额佣金收入

        bandicootIncomeRecordValue:[],//袋鼠币收入集合
        bandicootIncomeRecordIsNull:false,//袋鼠币收入是否有值
        bandicootExpendRecordValue:[],//袋鼠币支出集合
        bandicootExpendRecordIsNull:false,//袋鼠币支出是否有值
        returnIntegralRecordValue:[],//积分返还记录集合
        returnIntegralRecordIsNull:[],//积分返还记录是否有值
        rechargeRecord:[],//余额充值记录集合
        rechargeRecordIsNull:false,//余额充值记录是否有值
        balanceExpendRecord:[],//余额支出记录集合
        balanceExpendRecordIsNull:false,//余额支出记录集合是否有值
        reimburseRecord:[],//退款余额记录集合
        reimburseRecordIsNull:false,//余额支出记录集合是否有值

        buyRecordShow:true,
        activityRecordShow:false,//活动积分记录
        integralActivRecord:true,//积分动态记录
        balanceActivRecord:false,//余额动态记录
        payPassword:false,//支付密码
        //bandicootRecord:false,//袋鼠币动态记录
        ruleForm2: {
            account: '',
            passwordConfirm: '',
            password: '',
            securityCode:'',
        },
        phone:'',
        codeDesc:"发送验证码",
        rules: {
            password: [
                { validator: function(rule, value, callback){
                    if (value === '') {
                      callback(new Error('请输入支付密码'));
                    }else if (!/^[0-9]+$/.test(value)) {
                        callback(new Error('请输入数字值'));
                    }else if (value.length!=6) {
                        callback(new Error('支付密码为6位纯数字'));
                    }else {
                      callback();
                    }
                }, trigger: 'blur' }
            ],
            passwordConfirm: [
                { validator: function(rule, value, callback){
                    var _this = vue._data.ruleForm2 ;
                    if (value === '') {
                      callback(new Error('请再次输入支付密码'));
                    } else if (value !== _this.password) {
                      callback(new Error('两次输入支付密码不一致!'));
                    } else {
                      callback();
                    }
                }, trigger: 'blur' }
            ],
            account: [
                { validator: function(rule, value, callback){
                    if (!value) {
                      return callback(new Error('手机号码不能为空'));
                    }
                    setTimeout(() => {
                      if (!/^[0-9]+$/.test(value)) {
                        callback(new Error('请输入数字值'));
                      } else {
                        if ((/^1[34578]\d{9}$/.test(value))) {
                          callback();

                        } else {
                          callback(new Error('请输入正确的手机号码'));
                        }
                      }
                    }, 100);
                }, trigger: 'blur' }
            ],
            securityCode:[
                { validator: function(rule, value, callback){
                    var _this= vue._data.ruleForm2 ;
                    if (value === '') {
                      callback(new Error('请输入验证码'));
                   } else if(/^[0-9]{4,6}$/.test(value)){
                        callback();
                    }else{
                        callback(new Error('格式不正确'));
                    }
                }, trigger: 'blur' }
            ],
        }
	},
	methods: {
        go(url,target="_self"){
            LF.window.openWindow(url,target);
        },
        submitAjax: function(obj) {
            var self = this;//这样在function中用过self调用vue的this对象。
            LF.net.getJSON("/integral/user/pay/password/edit", obj, function(res) {
                if(res.code==='000'){
                    self.go("/app/pages/personal/payPasswordSuc_ps.html");
                }else{
                    Message({
                        type: 'warning',
                        message:res.errorMessage
                    });
                }
            }, function(res) {
                console.log("error：" + JSON.stringify(res));
            });
        },
        getyzm:function(){
            var _this= this;
            LF.net.getJSON("/integral/sms/send", {tokenId:LF.cookie.get("tokenId"),type:4,phone:LF.cookie.get("account")}, function(res) {
            	if(res.code==='000'){
                    _this.codeDesc= 60;
                    _this.sou=false;
                    var my_interval = setInterval(function () {
                        if (_this.codeDesc>=1) {
                            _this.codeDesc-=1;
                        } else {
                            _this.sou=true;
                            _this.codeDesc="验证码";
                            clearInterval(my_interval);
                        }
                    }, 1000);
                    Message({
                        type: 'info',
                        message:"已发送验证码"
                    });
                }else{
                    _this.sou=true;
                    Message({
                        type: 'error',
                        message:res.errorMessage
                    });
                }
            })
        },
        submitForm(formName) {
            var self = this;;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var formData = JSON.stringify(this.ruleForm2);
                var obj = JSON.parse(formData);
                obj["password"]=hex_md5(obj.password);
                obj["passwordConfirm"]=hex_md5(obj.passwordConfirm);
                obj["account"]=LF.cookie.get("account");
                obj["securityCode"]=obj.securityCode;
                self.submitAjax(obj);
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
    	goLogin:function(){
    		if(LF.cookie.get("tokenId")==null||LF.cookie.get("tokenId")==''){
				LF.window.openWindow("/app/login.html","_self");
			}
    	},
    	walletShow:function(){
            LF.net.getJSON("/member/main", {tokenId:LF.cookie.get("tokenId")},res=>{
	            if(res.code=="000"){
	                this.wallet = res.data;console.log(this.wallet,666)
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
    	},
        search:function(){
        	var time = "";
			if(this.incomeRecordShow ){//积分收入记录
				console.log(1);
				if(!this.searchTimeOne) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeOne));
				this.integralWater(time);
			}else if(this.expendRecordShow){//积分支出记录
				console.log(2);
				if(!this.searchTimeTwo) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeTwo));
				this.integralWaterExpend(time);
			}else if(this.bandicootRecordIncome){//袋鼠币收入
				console.log(3);
				if(!this.searchTimeThree) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeThree));
				this.integralWaterByBandicootIncome(time);
			}else if(this.bandicootRecordExpend){//袋鼠币支出
				console.log(4);
				if(!this.searchTimeFour) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeFour));
				this.integralWaterByBandicootExpend(time);
			}else if(this.returnIntegralRecord){//积分返还记录
				console.log(5);
				if(!this.searchTimeFive) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeFive));
				this.integralWaterByReturnIntegral(time);
			}
        },
        searchTwo:function(){
        	var time = "";
        	if(this.rechargeRecordFlag){//余额收入记录
				console.log(6);
				if(!this.searchTimeSix) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeSix));
				this.rechargeRecordFunction(time);
			}else if(this.balanceExpendRecordFlag){//余额支出记录
				console.log(7);
				if(!this.searchTimeSeven) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeSeven));
				this.balanceExpendRecordFunction(time);
			}else if(this.reimburseRecordFlag){//佣金收入记录
				console.log(8);
				if(!this.searchTimeEight) time = this.getYearMonth(new Date());
        		else time = this.getYearMonth(new Date(this.searchTimeEight));
				this.reimburseRecordFunction(time);
			}
       },
        /**
         * 积分收入分页
         * @param {Object} val
         */
        handleCurrentChangeByOne:function(val){
        	var time = "";
        	if(!this.searchTimeOne) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeOne));

    		this.pagerOne.curpage=val;
     		this.integralWater(time);
    	},
    	/**
         * 积分支出分页
         * @param {Object} val
         */
    	handleCurrentChangeByTwo:function(val){
    		var time = "";
        	if(!this.searchTimeTwo) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeTwo));

    		this.pagerTwo.curpage=val;
     		this.integralWaterExpend(time);
    	},
    	/**
         * 袋鼠币收入分页
         * @param {Object} val
         */
    	handleCurrentChangeByThree:function(val){
    		var time = "";
        	if(!this.searchTimeThree) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeThree));

    		this.pagerThree.curpage=val;
     		this.integralWaterByBandicootIncome(time);
    	},
    	/**
         * 袋鼠币支出分页
         * @param {Object} val
         */
    	handleCurrentChangeByFour:function(val){
    		var time = "";
        	if(!this.searchTimeFour) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeFour));

    		this.pagerFour.curpage=val;
     		this.integralWaterByBandicootExpend(time);
    	},
    	/**
         * 积分返还分页
         * @param {Object} val
         */
    	handleCurrentChangeByFive:function(val){
    		var time = "";
        	if(!this.searchTimeFive) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeFive));

    		this.pagerFive.curpage=val;
     		this.integralWaterByReturnIntegral(time);
    	},
    	/**
         * 余额收入记录分页
         * @param {Object} val
         */
    	handleCurrentChangeBySix:function(val){
    		var time = "";
        	if(!this.searchTimeSix) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeSix));

    		this.pagerFive.curpage=val;
     		this.rechargeRecordFunction(time);
    	},
    	/**
         * 余额支出记录分页
         * @param {Object} val
         */
    	handleCurrentChangeBySeven:function(val){
    		var time = "";
        	if(!this.searchTimeSeven) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeSeven));

    		this.pagerFive.curpage=val;
     		this.balanceExpendRecordFunction(time);
    	},
    	/**
         * 佣金收入记录分页
         * @param {Object} val
         */
    	handleCurrentChangeByEight:function(val){
    		var time = "";
        	if(!this.searchTimeEight) time = this.getYearMonth(new Date());
        	else time = this.getYearMonth(new Date(this.searchTimeEight));

    		this.pagerFive.curpage=val;
     		this.reimburseRecordFunction(time);
    	},

        /**
         * 积分收入记录
         * @param {Object} month
         */
        integralWater:function(month){
            LF.net.getJSON("/member/inter/income/list", {month:month,pageSize:this.pagerOne.size,pageNo:this.pagerOne.curpage},res=>{
	            if(res.code=="000"){
	                this.incomeRecordByBuy = res.data.list;        console.log(this.incomeRecordByBuy,123)
	                this.pagerOne.total=res.data.totalCount;
	                // for(var i = 0;i < this.incomeRecordByBuy.length;i++){
	                // 	if(this.incomeRecordByBuy[i].interStatusStr == 0){
	                // 		this.incomeRecordByBuy[i].interStatusStr = "尚未激活";
	                // 	}else if(this.incomeRecordByBuy[i].interStatusStr == 1){
	                // 		this.incomeRecordByBuy[i].interStatusStr = "返还中";
	                // 	}else if(this.incomeRecordByBuy[i].interStatusStr == 2){
	                // 		this.incomeRecordByBuy[i].interStatusStr = "已返还";
	                // 	}else if(this.incomeRecordByBuy[i].interStatusStr == "等待返还"){
                 //                                   this.incomeRecordByBuy[i].interStatusStr = "尚未激活";
                 //                      }
	                // }
	                if(this.incomeRecordByBuy.length > 0) {
	                    this.isNullByBuy = false;
	                }else {
	                    this.isNullByBuy = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 积分支出记录
         * @param {Object} month
         */
        integralWaterExpend:function(month){
            LF.net.getJSON("/member/inter/outlay/list", {month:month,pageSize:this.pagerTwo.size,pageNo:this.pagerTwo.curpage},res=>{
	            if(res.code=="000"){
	                this.expendRecord = res.data.list;                             console.log(this.expendRecord,123)
	                this.pagerTwo.total=res.data.totalCount;
	                if(this.expendRecord.length > 0) {
	                    this.isNullByRecord = false;
	                }else {
	                    this.isNullByRecord = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 袋鼠币收入记录
         * @param {Object} month
         */
        integralWaterByBandicootIncome:function(month){
            LF.net.getJSON("/member/roo/income/list", {month:month,pageSize:this.pagerThree.size,pageNo:this.pagerThree.curpage},res=>{
	            if(res.code=="000"){
	                this.bandicootIncomeRecordValue = res.data.list;
	                this.pagerThree.total=res.data.totalCount;
	                if(this.bandicootIncomeRecordValue.length > 0) {
	                    this.bandicootIncomeRecordIsNull = false;
	                }else {
	                    this.bandicootIncomeRecordIsNull = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 袋鼠币支出记录
         * @param {Object} month
         */
        integralWaterByBandicootExpend:function(month){
            LF.net.getJSON("/member/roo/outlay/list", {month:month,pageSize:this.pagerFour.size,pageNo:this.pagerFour.curpage},res=>{
	            if(res.code=="000"){
	                this.bandicootExpendRecordValue = res.data.list;
	                this.pagerFour.total=res.data.totalCount;
	                if(this.bandicootExpendRecordValue.length > 0) {
	                    this.bandicootExpendRecordIsNull = false;
	                }else {
	                    this.bandicootExpendRecordIsNull = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 积分返还记录
         * @param {Object} month
         */
        integralWaterByReturnIntegral:function(month){
            LF.net.getJSON("/member/inter/return/list", {month:month,pageSize:this.pagerFive.size,pageNo:this.pagerFive.curpage},res=>{
	            if(res.code=="000"){
	                this.returnIntegralRecordValue = res.data.list;
	                this.pagerFive.total=res.data.totalCount;
	                if(this.returnIntegralRecordValue.length > 0) {
	                    this.returnIntegralRecordIsNull = false;
	                }else {
	                    this.returnIntegralRecordIsNull = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 余额收入记录
         * @param {Object} month
         */
        rechargeRecordFunction:function(month){
            LF.net.getJSON("/member/cash/income/list", {month:month,pageSize:this.pagerSix.size,pageNo:this.pagerSix.curpage},res=>{
	            if(res.code=="000"){
	                this.rechargeRecord = res.data;
	                this.pagerSix.total=res.data.totalCount;
	                if(res.data.list.length > 0) {
	                    this.rechargeRecordIsNull = false;
	                }else {
	                    this.rechargeRecordIsNull = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 余额支出记录
         * @param {Object} month
         */
        balanceExpendRecordFunction:function(month){
            LF.net.getJSON("/member/cash/outlay/list", {month:month,pageSize:this.pagerSeven.size,pageNo:this.pagerSeven.curpage},res=>{
	            if(res.code=="000"){
	                this.balanceExpendRecord = res.data;
	                this.pagerSeven.total=res.data.totalCount;
	                if(res.data.list.length > 0) {
	                    this.balanceExpendRecordIsNull = false;
	                }else {
	                    this.balanceExpendRecordIsNull = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },
        /**
         * 佣金收入记录
         * @param {Object} month
         */
       	reimburseRecordFunction:function(month){
            LF.net.getJSON("/member/cash/bkge/list", {month:month,pageSize:this.pagerEight.size,pageNo:this.pagerEight.curpage},res=>{
	            if(res.code=="000"){
	                this.reimburseRecord = res.data;
	                this.pagerEight.total=res.data.totalCount;
	                if(res.data.list.length > 0) {
	                    this.reimburseRecordIsNull = false;
	                }else {
	                    this.reimburseRecordIsNull = true;
	                }
	            }
            }, res=>{
                console.log("error：" + JSON.stringify(res));
            });
        },

        /**
            rechargeRecord:[],//余额充值记录集合
	        rechargeRecordIsNull:false,//余额充值记录是否有值
	        balanceExpendRecord:[],//余额支出记录集合
	        balanceExpendRecordIsNull:false,//余额支出记录集合是否有值
	        reimburseRecord:[],//退款余额记录集合
	        reimburseRecordIsNull:false,//余额支出记录集合是否有值
         * @param {Object} month
         * @param {Object} opType
         */
        rechargeRecordFun:function(){
            this.rechargeRecordFlag = true;
            this.balanceExpendRecordFlag = false;
            this.reimburseRecordFlag = false;

            this.rechargeRecordFunction(this.getYearMonth(new Date()));
        },
        balanceExpendRecordFun:function(){
            this.rechargeRecordFlag = false;
            this.balanceExpendRecordFlag = true;
            this.reimburseRecordFlag = false;

            this.balanceExpendRecordFunction(this.getYearMonth(new Date()));
        },
        reimburseRecordFun:function(){
            this.rechargeRecordFlag = false;
            this.balanceExpendRecordFlag = false;
            this.reimburseRecordFlag = true;

            this.reimburseRecordFunction(this.getYearMonth(new Date()));
        },
        /**
         * 积分动态所有切换tab,5个方法
         */
        income:function(){
            this.incomeRecordShow = true;//积分收入记录
	        this.expendRecordShow = false;//积分支出记录
	        this.bandicootRecordIncome = false;//袋鼠币收入
	        this.bandicootRecordExpend = false;//袋鼠币支出
	        this.returnIntegralRecord = false;//积分返还记录

	        this.integralWater(this.getYearMonth(new Date()));

        },
        expend:function(){
            this.incomeRecordShow = false;//积分收入记录
	        this.expendRecordShow = true;//积分支出记录
	        this.bandicootRecordIncome = false;//袋鼠币收入
	        this.bandicootRecordExpend = false;//袋鼠币支出
	        this.returnIntegralRecord = false;//积分返还记录

	        this.integralWaterExpend(this.getYearMonth(new Date()));
        },
        bandicootRecordIncomeFun:function(){
        	this.incomeRecordShow = false;//积分收入记录
	        this.expendRecordShow = false;//积分支出记录
	        this.bandicootRecordIncome = true;//袋鼠币收入
	        this.bandicootRecordExpend = false;//袋鼠币支出
	        this.returnIntegralRecord = false;//积分返还记录

	        this.integralWaterByBandicootIncome(this.getYearMonth(new Date()));
        },
        bandicootRecordExpendFun:function(){
        	this.incomeRecordShow = false;//积分收入记录
	        this.expendRecordShow = false;//积分支出记录
	        this.bandicootRecordIncome = false;//袋鼠币收入
	        this.bandicootRecordExpend = true;//袋鼠币支出
	        this.returnIntegralRecord = false;//积分返还记录

	        this.integralWaterByBandicootExpend(this.getYearMonth(new Date()));
        },
        returnIntegralRecordFun:function(){
        	this.incomeRecordShow = false;//积分收入记录
	        this.expendRecordShow = false;//积分支出记录
	        this.bandicootRecordIncome = false;//袋鼠币收入
	        this.bandicootRecordExpend = false;//袋鼠币支出
	        this.returnIntegralRecord = true;//积分返还记录

	        this.integralWaterByReturnIntegral(this.getYearMonth(new Date()));
        },

        buyRecord:function(){
            this.buyRecordShow = true;
            this.activityRecordShow = false;
        },
        activityRecord:function(){
            this.buyRecordShow = false;
            this.activityRecordShow = true;
        },
        integralActivRecordFun:function(){
            this.integralActivRecord = true;
            this.balanceActivRecord = false;
            this.payPassword = false;
            this.bandicootRecord = false;
        },
        balanceActivRecordFun:function(){
            this.integralActivRecord = false;
            this.balanceActivRecord = true;
            this.payPassword = false;
            this.bandicootRecord = false;

            this.rechargeRecordFunction(this.getYearMonth(new Date()));
        },
        payPasswordFun:function(){
            this.integralActivRecord = false;
            this.balanceActivRecord = false;
            this.payPassword = true;
            this.bandicootRecord = false;
        },
        choose:function(){
        	for(var i = 1;i <= 10;i++){
        		if(i == 1) document.getElementById("item"+i).style.color = "#ff3e03";
        		else document.getElementById("item"+i).style.color = "#555";
        	}
        },
        getYearMonth:function(dateStr){
			var year= dateStr.getFullYear();
			var month=dateStr.getMonth()+1;
			month =(month<10 ? "0"+month:month);

			return year+"-"+month;
        },
        prefixPhone:function () {
            var ph=LF.cookie.get("account");
            this.phone=ph.substr(0,3)+"****"+ph.substr(7);
        },
        setPay : function(){
            var _this = this;
            let params = LF.window.getParams();
            if(params&&params['setPay']){
                _this.payPasswordFun();
            }
        },
        goOrderInfo: function(id){
            var _this = this;
            _this.go('./my_orderdetails_ps.html?orderId='+id,"_blank");
        },
        exchange:function(){
            if(this.willShow==false){
                this.willShow=true;
            }else{
                this.willShow=false;
            }
        },
        close:function(){
            if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true;
            }
        },
        fixed:function(num,integration){
                    if(num>=integration){
                        return this.num = integration;
                    }
                    return this.num = parseInt(num);

                },
        sureExchange:function(inter){console.log(inter);
            // document.getElementById('sureex').setAttribute('disabled', true);
            if (!inter || inter== 0 || inter == '') {
                alert("请输入正确的兑换数量");
                return this.num = "";
            } else {
                LF.net.getJSON("/member/inter2roo/exchange", {inter:inter},res=>{
                    if(res.code=="000"){
                        console.log(res);                        
                        window.location.reload();
                    }else{
                            Message({
                                    type: 'warning',
                                    message:res.errorMessage
                            });
                    }
                }, res=>{
                    console.log("error：" + JSON.stringify(res));
                });
            }
        }
	},
	/*
     *组件挂在完成响应
     */
    mounted(){
    	this.goLogin();
    	// this.choose();
    	this.prefixPhone();
        this.walletShow();
        this.integralWater(this.getYearMonth(new Date()));
        this.setPay();
    },
    components: {
        LfHead,
        LfLeft,
        LfFooter
    }
});