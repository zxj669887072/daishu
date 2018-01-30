<template>
	 <div class="c-txtedit">
		<div class="ment">
			<ul>
				<li @click="changetit('undo')"><button><i class="fa fa-undo"></i></button></li>
				<li @click="changetit('redo')"><button><i class="fa fa-repeat"></i></button></li>
				<li @click="changetit('bold')"><button>加粗</button></li>
				<li @click="changetit('italic')"><button><em style="    font-style: italic;">斜体</em></button></li>
				<li @click="changetit('underline')"><button><u><b>U</b></u></button></li>
				<li @click="changetit('strikeThrough')"><button><strike>abc</strike></button></li>
				<li id="upload">
					<button>
						<i class="fa fa-file-image-o " @mousemove="addfile"></i>
						<input type="file" id="uploadfile" class="upload" v-on:change="previewFile"   enctype="multipart/form-data" />
					</button>
				</li>
				 <li @click="changetit('justifyLeft')"><button><i class="fa fa-align-left"></i></button></li>
				 <li @click="changetit('justifyCenter')"><button><i class="fa fa-align-center  "></i></button></li>
				 <li @click="changetit('justifyRight')"><button><i class="fa fa-align-right"></i></button></li>
				 <li @click="changetit('justifyFull')"><button><i class="fa fa-align-justify"></i></button></li>
			</ul>
			
		</div>
		<div  id="txtcontent" class="txtcontent" contenteditable   v-model="msg" @blur="contentblur"  v-html="editmsg">
			
		</div>
	</div>
</template>

<script>
	import LF from 'LF';
	import Vue from 'Vue';
	 
	
	export default {
		props: [
			"editmsg"
		],
		data() {
			return {
				 backgroundImg:'',
				 file:'',
				 msg:''
				 
			}
		},
		computed: {
		},
		methods: { 
			changetit:function(e){
                document.execCommand(e, false, true);
			},
			addfile:function(event){
				var inputs = document.createElement('input');
				var _this =this;
				console.log(this.$el.querySelector('#upload'));
				inputs.setAttribute("type","file");
				inputs.id="uploadfile";
				inputs.style.cssText="position: absolute; top: 0; left: 0;opacity: 0;";
				inputs.setAttribute("enctype",'multipart/form-data');
				this.$el.querySelector('#upload').appendChild(inputs );
				inputs.addEventListener("change",_this.previewFile);
			},
		  	previewFile:function(event) {
	      		var self  =this;
	    		var file=this.$el.querySelector('#uploadfile');
	    		file.setAttribute("name",'file');
	    		file.setAttribute("enctype",'multipart/form-data');
	    		var formNode = document.createElement('form');
	            formNode.enctype='multipart/form-data';
	            var clone = file.cloneNode(true);
	            this.file=file;
	            formNode.appendChild(file);
	            var formData = new FormData(formNode);
	            var url = '/integral/image/upload?tokenId='+LF.cookie.get("bussTokenId")+"&imageType=1" ;
				if(file) {
					LF.net.upload(url,formData,function(res){
		                var tt =self.$el.querySelector("div.txtcontent");
		                console.log(tt);
		                var img =document.createElement("img");
		                img.setAttribute("src",res.data);
		                self.inner(img.outerHTML);
		                //tt.appendChild(img);
		                self.contentblur();
		                },function(res){
		                    console.log("error",res);
		                });
				}  
			},
			inner:function(html){
				  var dthis=document.getElementById("txtcontent");//要插入内容的某个div,在标准浏览器中 无需这句话    
            //dthis.focus();  
             var sel, range;   
             if (window.getSelection)    
              {    
                     // IE9 and non-IE    
                     sel = window.getSelection();    
                     if (sel.getRangeAt && sel.rangeCount) {    
                     range = sel.getRangeAt(0);    
                     range.deleteContents();    
                     var el = document.createElement('div');    
                     el.innerHTML = html;    
                     var frag = document.createDocumentFragment(), node, lastNode;    
                     while ( (node = el.firstChild) )    
                      {    
                         lastNode = frag.appendChild(node);    
                      }    
  
                 range.insertNode(frag);    
                     if (lastNode) {    
                     range = range.cloneRange();    
                     range.setStartAfter(lastNode);    
                     range.collapse(true);    
                     sel.removeAllRanges();    
                     sel.addRange(range);    
                     }    
                    }    
             }     
             else if (document.selection && document.selection.type !='Control')     
             {            
                 //在非标准浏览器中 要先让你需要插入html的div 获得焦点    
            	 ierange= document.selection.createRange();//获取光标位置    
                 ierange.pasteHTML(html);    //在光标位置插入html 如果只是插入text 则就是fus.text="..."    
                      
  
             }    
			},
			contentblur:function(){
				var cont =this.$el.querySelector('.txtcontent');
				var html=cont.innerHTML;
				html=html.replace(/\"/g,"'");  
				this.$emit('increment',html);
			} 
		},
		beforeMount() {
			//this.contentblur();
			 
		},
		mounted() {
			console.log(this.editmsg);
		},
		destroyed() {},
		components: {}
	}
</script>

<style>
.el-dialog{
	width: 850px;
}
button{
	padding: 0 4px;
}
.ment{
	
}
</style>