<style rel="stylesheet/scss" lang="scss" scoped>
	* {
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    -o-box-sizing: border-box;
	    -ms-box-sizing: border-box;
	    box-sizing: border-box;
	    padding: 0;
	    margin: 0;
	}
	.zoom-content{
		position: relative;
		
		.minimg-content{
                                      position: relative;
			cursor:move;
			width: 348px;
			height: 348px;
			.target-img{
				width: 100%;
				height: 100%;
                                           position: relative;
                                           z-index: 0;
			}
			.zoom-mask{
				position: absolute;
				width: 203.75px;
				height: 203.75px;
				border: 1px solid #aaa;
    			           background: rgba(254,222,79,.5);
				top: 0;
				left: 0;
                                           z-index: 2;
			}
                                .giftFlag{
                                            position: absolute;
                                            top: 0;
                                            right: 0;
                                            z-index: 1;
                                }
		}

		.zoom-content-max{
			z-index: 888;
			position: absolute;
			width: 540px;
			height: 540px;
			top: 0;
			left: 420px;
			overflow:hidden;
			border: 1px solid #EEEEEE;
			.bigimg{
				position: absolute;
				height: 800px;
				width: 800px;
				z-index: 777;
				left: 0;
				top: 0;
			}
		}
	}
</style>
<template>
    <div class="zoom-content">
    	<div class="minimg-content" @mouseenter="imgover" @mouseleave="imgout" @mousemove="imgmove">
	    	<img class="target-img"   :src="url"/>
	    	<div class="zoom-mask animation" v-if="maskshow" :style="{top:maskY+'px',left:maskX+'px'}"></div>
                     <img class="giftFlag" src="../images/haitao.png" alt="海淘" v-if="isshow">
    	</div>
    	<div class="zoom-content-max" v-if="maskshow">
    		<img class="bigimg animation" :src="url" :style="{top:maxY+'px',left:maxX+'px'}"/>
    	</div>
	</div>
</template>
<script type="text/ecmascript-6">
    export default {
    	props:[
            "url",
            "isshow"
        ],
        data () {
            return {
            	bl:0.675,
            	mask:151.87,
            	bigbs:1.78,
            	img:"",
            	maskshow:false,
            	minX:0,
            	minY:0,
            	maskX:0,
            	maskY:0
            }
        },
        computed: {
        	maxX(){
        		var r = 0;
        		r = (this.maskX*this.bigbs).toFixed(2);
        		r = 0 -r;
        		return r;
        	},
        	maxY(){
        		var r = 0;
        		r = (this.maskY*this.bigbs).toFixed(2);
        		r = 0 -r;
        		return r;
        	}
        },
        methods: {
        	imgover(event){
        		this.maskshow = true;
        	},
        	imgout(event){
        		this.maskshow = false;
        	},
        	imgmove(event){
        		let left = this.getX(event.target.parentNode);
        		let top = this.getY(event.target.parentNode);
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        		this.minX = event.clientX-left + scrollLeft;
        		this.minY = event.clientY-top + scrollTop;
        		//计算蒙板位置
        		if(this.minY-this.mask<=0){
        			this.maskY = 0;
        		}else if((this.minY-this.mask).toFixed(2)>=146.25){
        			this.maskY = 146.25;
        		}else{
        			this.maskY = (this.minY-this.mask).toFixed(2);
        		}
        		if(this.minX-this.mask<=0){
        			this.maskX = 0;
        		}else if((this.minX-this.mask).toFixed(2)>=215){
        			this.maskX = 215;
        		}else{
        			this.maskX = (this.minX-this.mask).toFixed(2);
        		}
        	},
        	getX(obj){
        		var parObj=obj;
		        var left=obj.offsetLeft;
		        while(parObj=parObj.offsetParent){
		            left+=parObj.offsetLeft;
		        }
		        return left;
        	},
        	getY(obj){
		        var parObj=obj;
		        var top=obj.offsetTop;
		        while(parObj = parObj.offsetParent){
		            top+=parObj.offsetTop;
		        }
		     	return top;
		    }
        },
        beforeMount(){},
        mounted(){

        },
        destroyed(){
        },
        components: {}
    }
</script>