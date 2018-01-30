/**
 * Created by zzcx on 2017/3/17 0017.
 */
import LF from 'LF';
import * as config from '../../js/framework/define';
import Vue from 'vue';

var vue = new Vue({
    el: '#app',
    data: {

    },
    methods:{
    	test(){
    		var fileEl=this.$el.querySelector('input[id="fileId"]');
			console.log(fileEl);
			var ie=navigator.appName=="Microsoft Internet Explorer" ? true : false; 
			if(ie){ 
				fileEl.click(); 
			}else{
				var a=document.createEvent("MouseEvents");//FF的处理 
				a.initEvent("click", true, true);  
				fileEl.dispatchEvent(a); 
			} 
    	},
        // 上传图片
        uploadImg(e) {
        	//获取file的值。主要优化不需要在input加入form标签。
        	var files = e.target.files || e.dataTransfer.files
      		if (!files.length){
      			return;
      		}
            var file=files[0];
            //文件大小
            var filesize = file.size/1024;
            console.log("filesize:"+filesize);
            //文件路径，可以用于判断文件类型
            var filepath = e.target.value;
            console.log("filepath:"+filepath);
            var filetype = filepath.substring(filepath.lastIndexOf(".")+1).toLowerCase();
            console.log("filetype:"+filetype);
            var re=new RegExp("(jpg|png|gif|ps|jpeg)$");
	        if (re.test(filetype.toLowerCase())){
         		console.log("true");
			}else{
				console.log("false"); 
			}
            /*
             *第一种，直接创建 FormData，将file值添加进去
             */
            var formData = new FormData();
			formData.append('fileId', file);
			
			/*
             *第二种，直接创建 对象
             * file_name:文件上传名字。
             * file:文件值
             */
            var params1 = {
           		"file_name":"filename",
           		"file":file
            };
            /*
             *第三种，直接创建 数组，对象为第二种一致
             * file_name:文件上传名字。
             * file:文件值
             */
            var params2=[
            {
           		"file_name":"filename",
           		"file":file
            }
            ]
           var url = "/integral/image/upload?tokenId=&imageType=0";
//         	this.testUpload(url,formData,function(res){
//				console.log("success",res);
//			},function(res){
//				console.log("error",res);
//			});
			LF.net.upload(url,formData,function(res){
				console.log("success formData",res);
			},function(res){
				console.log("error",res);
			});
			LF.net.upload(url,params1,function(res){
				console.log("success params1",res);
			},function(res){
				console.log("error",res);
			});
			LF.net.upload(url,params2,function(res){
				console.log("success params2",res);
			},function(res){
				console.log("error",res);
			});
        },
        /*
         *仅供调试用 
         */
        testUpload(url, data,success,error,uploadProgress, uploadComplete, uploadFailed,uploadCanceled){
        	
        	if(!LF.util.isFormData(data)){
        		console.log("false");
        		var formData = new FormData();
        		if(LF.util.isObject(data)){
        			formData.append(data.file_name, data.file);
        			data = formData;
        		}else if(LF.util.isArray(data)){
        			data.forEach(function(v){
        				formData.append(v.file_name, v.file);
        			})
        			data = formData;
        		}else{
        			console.log("无数据");
        			return;
        		}
        	}
        	if(url.indexOf("/") != 0){
				url = "/" + url;
			}
			var action = url;
			url = config.SERVER_BAS_URL +url;
			
			var requestData = data;
			var request = new XMLHttpRequest();
			var xDomain = false;
			request.open("POST", url, true);
			request.timeout = 0;
			LF.log.log("send[" + action + "]文件上传");
			request.onreadystatechange = function handleLoad() {
				if(!request || (request.readyState !== 4 && !xDomain)) {
					return;
				}
				if(request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
					return;
				}
				var responseData = request.responseText;
				LF.log.log("received[" + action + "]：" + responseData);
				var rs = JSON.parse(responseData);
				if (typeof success === 'function') {
					success(rs);
			    }
				request = null;
			};
			request.onerror = function handleError() {
				var rs = {
					code:'900',
					errorMessage:"系统异常"
				}
				if (typeof error === 'function') {
					error(rs);
			    }
				request = null;
			};
			request.ontimeout = function handleTimeout() {
				var rs = {
					code:'901',
					errorMessage:"系统请求超时"
				}
				if (typeof error === 'function') {
					error(rs);
			    }
		      	request = null;
		    };
		    
		    request.setRequestHeader("Accept", "application/json, text/plain, */*");
		    if (typeof uploadProgress === 'function') {
		      	request.addEventListener('progress', uploadProgress);
		    }
		    request.send(requestData);
        }
    },
    /*
     *组件挂在完成响应
     */
    mounted(){

    },
    components: {
    }
})
