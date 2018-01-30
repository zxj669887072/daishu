/**
 * Created by lanfeng on 2016/5/10.
 */


//开发服务器路径
var SERVER_BAS_URL = "http://120.77.213.110:8281/api";//开发
//var SERVER_BAS_URL = "http://portal.kangaromall.com/api";//生产
//var SERVER_BAS_URL = "http://192.168.2.169:8080/config/api";//开发
//var SERVER_BAS_URL = "http://127.0.0.1:8888/api";//开发

var REQUESTDATA = {
	"appType":"",
	"deviceNo":"865982025170278",
	"deviceToken":"23fc08c4 332168b4 4f973c95 df44321f 3559c85f 45c532b2 9e6fe7bb 50c439c3",
	"phoneModel":"iphone 6 plus",
	"versionNo":1,
	"appVersion":"0.0.1",
	"osVersion":"9.2.1",
	"sysType": "1", 
	"appKey": "888888",
	"timestamp":"",
	"tokenId":""
};

var DEFAULTSIGNATUREPWD = "44d6d569341947ec947c711a18574de5";

var debug = true;

export {SERVER_BAS_URL,REQUESTDATA,DEFAULTSIGNATUREPWD,debug};