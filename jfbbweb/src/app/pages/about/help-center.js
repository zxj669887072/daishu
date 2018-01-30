import LF from 'LF';
import Vue from 'vue';
//引入公共的header和footer
import LfHeader from '../../../components/header_new.vue';
import LfFooter from '../../../components/footer.vue';
import LfSearch from '../../../components/search.vue';
import {Message, Card,Carousel,CarouselItem,Tree,Select,Button} from 'element-ui'  ;

Vue.use(Card)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Button)

new Vue({
             el: '#app',
             data: {
                          searchStr:'', 
                          show:false,
                    introduce:false,              //关于蓝山
                    management:false,       //经营理念
                    recruit:false,                   //招贤纳士

                   aboutMarket:false,         //关于袋鼠集市
                   integral:false,                  //通用积分
                   understandInt:false,         //了解积分
                   intRule:false,                     //积分规则
                   distribution:false,              //会员分享消费
                   settled:false,                   //商家入驻

                    user:false,                       //用户
                   vip:false,                           //分销会员
                   shop:false,                        //商户
                   operate:false,                    //运营中心

                   opipion:false,                    //意见建议
                   registration:false,              //用户注册协议
                   privacy:false,                     //隐私政策

                   contactUS:false,                //联系我们
                   customer:false,                  //客服服务
                          helpMsg: [{
                                      label: '关于我们',
                                      children: [{
                                              label: '>关于蓝山集势',                                                                                                      
                                          },{
                                            label: '>经营理念',
                                          },{
                                            label: '>招贤纳士',
                                          }]
                                    },{
                                      label: '袋鼠集市',
                                      children: [{
                                              label: '>关于袋鼠集市',                                                        
                                          },{
                                            label: '>通用积分',
                                          },{
                                            label: '>了解积分',
                                          },{
                                            label: '>积分规则',
                                          },{
                                            label: '>会员分享消费',
                                          },{
                                            label: '>商家入驻',
                                          }]
                                    },{
                                      label: '合作推广',
                                      children: [{
                                            label: '>用户',                                                        
                                          },{
                                            label: '>分销会员',
                                          },{
                                            label: '>商户',
                                          },{
                                            label: '>运营中心',
                                          }]
                                    },{
                                      label: '意见反馈',
                                      children: [{
                                            label: '>意见建议',                                                        
                                          },{
                                            label: '>用户注册协议',
                                          },{
                                            label: '>隐私政策',
                                          }]
                                    },{
                                      label: '联系我们',
                                      children: [{
                                            label: '>联系我们',                                                        
                                          },{
                                            label: '>客服服务',
                                          }]
                                    }],                     
                          defaultProps: {
                                  children: 'children',
                                  label: 'label'
                          }                       
            },
             methods: {
                          handleNodeClick(data,node,item) {console.log(data,node,item,'-------------------------------------------------------------------------------------------------');
                             //所有tree元素
                          //   var tree = document.getElementsByClassName('el-tree');console.log(tree,'tree=============');
                          //   //关于我们
                          //   var about = document.getElementById('about');console.log(about,typeof(about),about instanceof Object)
                          //   var abNodes = about.getElementsByClassName('el-tree-node');console.log(abNodes)
                          //   //袋鼠集市
                          //   var market = document.getElementById('market');console.log(market)
                          //   var maNodes = market.getElementsByClassName('el-tree-node');console.log(maNodes)
                          //   //合作推广
                          //   var cooperation = document.getElementById('cooperation');console.log(cooperation)
                          //   var coNodes = cooperation.getElementsByClassName('el-tree-node');console.log(coNodes)
                          //   //意见反馈
                          //   var opinion = document.getElementById('opinion');console.log(opinion)
                          //   var opNodes = opinion.getElementsByClassName('el-tree-node');console.log(abNodes)
                          //   //联系我们
                          //   var contact = document.getElementById('contact');console.log(contact)
                          //   var coNodes = contact.getElementsByClassName('el-tree-node');console.log(coNodes,'------------------------------------->')                          
                          // node.parent.childNodes.forEach(function(item,index){
                          //           if(data.label == item.data.label ){
                          //                   console.log(item,data.label,index);
                          //                   if(node.parent.data.label == '关于我们'){     console.log(abNodes[index+1],'关于我们')
                          //                               console.log(abNodes[index+1].innerText)                                                        
                          //                   }else if (node.parent.data.label == '袋鼠集市') {   console.log(maNodes[index+1])
                                                       
                          //                   }
                          //           }
                          // });
                                  
                            

                            // console.log(about.getElementsByClassName('el-tree-node__content')[0],123)
                            // console.log(this);
                            // this.show = true;
                            if(data.label == ">关于蓝山集势"){this.introduce = true;this.$refs.tree.$children[0].$children[1].$el.style.color= '#f37e01';}else{this.introduce = false;this.$refs.tree.$children[0].$children[1].$el.style.color= ''};
                            if(data.label == ">经营理念"){this.management = true;this.$refs.tree.$children[0].$children[2].$el.style.color= '#f37e01';}else{this.management = false;this.$refs.tree.$children[0].$children[2].$el.style.color= ''};                            
                            if(data.label == ">招贤纳士"){this.recruit = true;this.$refs.tree.$children[0].$children[3].$el.style.color= '#f37e01';}else{this.recruit = false;this.$refs.tree.$children[0].$children[3].$el.style.color= ''};

                            if(data.label == ">关于袋鼠集市"){this.aboutMarket = true;this.$refs.tree.$children[1].$children[1].$el.style.color= '#f37e01';}else{this.aboutMarket = false;this.$refs.tree.$children[1].$children[1].$el.style.color= '';};
                            if(data.label == ">通用积分"){this.integral = true;this.$refs.tree.$children[1].$children[2].$el.style.color= '#f37e01';}else{this.integral = false;this.$refs.tree.$children[1].$children[2].$el.style.color= '';};
                            if(data.label == ">了解积分"){this.understandInt = true;this.$refs.tree.$children[1].$children[3].$el.style.color= '#f37e01';}else{this.understandInt = false;this.$refs.tree.$children[1].$children[3].$el.style.color= '';};
                            if(data.label == ">积分规则"){this.intRule = true;this.$refs.tree.$children[1].$children[4].$el.style.color= '#f37e01';}else{this.intRule = false;this.$refs.tree.$children[1].$children[4].$el.style.color= '';};
                            if(data.label == ">会员分享消费"){this.distribution = true;this.$refs.tree.$children[1].$children[5].$el.style.color= '#f37e01';}else{this.distribution = false;this.$refs.tree.$children[1].$children[5].$el.style.color= '';};
                            if(data.label == ">商家入驻"){this.settled = true;this.$refs.tree.$children[1].$children[6].$el.style.color= '#f37e01';}else{this.settled = false;this.$refs.tree.$children[1].$children[6].$el.style.color= '';};

                            if(data.label == ">用户"){this.user = true;this.$refs.tree.$children[2].$children[1].$el.style.color= '#f37e01';}else{this.user = false;this.$refs.tree.$children[2].$children[1].$el.style.color= '';};
                            if(data.label == ">分销会员"){this.vip = true;this.$refs.tree.$children[2].$children[2].$el.style.color= '#f37e01';}else{this.vip = false;this.$refs.tree.$children[2].$children[2].$el.style.color= '';};
                            if(data.label == ">商户"){this.shop = true;this.$refs.tree.$children[2].$children[3].$el.style.color= '#f37e01';}else{this.shop = false;this.$refs.tree.$children[2].$children[3].$el.style.color= '';};
                            if(data.label == ">运营中心"){this.operate = true;this.$refs.tree.$children[2].$children[4].$el.style.color= '#f37e01';}else{this.operate = false;this.$refs.tree.$children[2].$children[4].$el.style.color= '';};

                            if(data.label == ">意见建议"){this.opipion = true;this.$refs.tree.$children[3].$children[1].$el.style.color= '#f37e01'}else{this.opipion = false;this.$refs.tree.$children[3].$children[1].$el.style.color= ''};
                            if(data.label == ">用户注册协议"){this.registration = true;this.$refs.tree.$children[3].$children[2].$el.style.color= '#f37e01'}else{this.registration = false;this.$refs.tree.$children[3].$children[2].$el.style.color= ''};
                            if(data.label == ">隐私政策"){this.privacy = true;this.$refs.tree.$children[3].$children[3].$el.style.color= '#f37e01'}else{this.privacy = false;this.$refs.tree.$children[3].$children[3].$el.style.color= ''};

                            if(data.label == ">联系我们"){this.contactUS = true;this.$refs.tree.$children[4].$children[1].$el.style.color= '#f37e01'}else{this.contactUS = false;this.$refs.tree.$children[4].$children[1].$el.style.color= ''};
                            if(data.label == ">客服服务"){this.customer = true;this.$refs.tree.$children[4].$children[2].$el.style.color= '#f37e01'}else{this.customer = false;this.$refs.tree.$children[4].$children[2].$el.style.color= ''};
                          },
                          getName:function(name){'>'+name
                            if('>'+name == ">关于蓝山集势"){this.introduce = true;this.$refs.tree.$children[0].node.expanded = true;this.$refs.tree.$children[0].$children[1].$el.style.color= '#f37e01';}else{this.aboutMarket = false;this.$refs.tree.$children[1].$children[1].$el.style.color= '';};
                            if('>'+name == ">经营理念"){this.management = true;this.$refs.tree.$children[0].node.expanded = true;this.$refs.tree.$children[0].$children[2].$el.style.color= '#f37e01';}else{this.management = false;this.$refs.tree.$children[0].$children[2].$el.style.color= ''};                       
                            if('>'+name == ">招贤纳士"){this.recruit = true;this.$refs.tree.$children[0].node.expanded = true;this.$refs.tree.$children[0].$children[3].$el.style.color= '#f37e01';}else{this.recruit = false;this.$refs.tree.$children[0].$children[3].$el.style.color= ''};

                            if('>'+name == ">关于袋鼠集市"){this.aboutMarket = true;this.$refs.tree.$children[1].node.expanded = true;this.$refs.tree.$children[1].$children[1].$el.style.color= '#f37e01';}else{this.aboutMarket = false;this.$refs.tree.$children[1].$children[1].$el.style.color= '';};
                            if('>'+name == ">通用积分"){this.integral = true;this.$refs.tree.$children[1].node.expanded = true;this.$refs.tree.$children[1].$children[2].$el.style.color= '#f37e01';}else{this.integral = false;this.$refs.tree.$children[1].$children[2].$el.style.color= '';};
                            if('>'+name == ">了解积分"){this.understandInt = true;this.$refs.tree.$children[1].node.expanded = true;this.$refs.tree.$children[1].$children[3].$el.style.color= '#f37e01';}else{this.understandInt = false;this.$refs.tree.$children[1].$children[3].$el.style.color= '';};
                            if('>'+name == ">积分规则"){this.intRule = true;this.$refs.tree.$children[1].node.expanded = true;this.$refs.tree.$children[1].$children[4].$el.style.color= '#f37e01';}else{this.intRule = false;this.$refs.tree.$children[1].$children[4].$el.style.color= '';};
                            if('>'+name == ">会员分享消费"){this.distribution = true;this.$refs.tree.$children[1].node.expanded = true;this.$refs.tree.$children[1].$children[5].$el.style.color= '#f37e01';}else{this.distribution = false;this.$refs.tree.$children[1].$children[5].$el.style.color= '';};
                            if('>'+name == ">商家入驻"){this.settled = true;this.$refs.tree.$children[1].node.expanded = true;this.$refs.tree.$children[1].$children[6].$el.style.color= '#f37e01';}else{this.settled = false;this.$refs.tree.$children[1].$children[6].$el.style.color= '';};

                            if('>'+name == ">用户"){this.user = true;this.$refs.tree.$children[2].node.expanded = true;this.$refs.tree.$children[2].$children[1].$el.style.color= '#f37e01';}else{this.user = false;this.$refs.tree.$children[2].$children[1].$el.style.color= '';};
                            if('>'+name == ">分销会员"){this.vip = true;this.$refs.tree.$children[2].node.expanded = true;this.$refs.tree.$children[2].$children[2].$el.style.color= '#f37e01';}else{this.vip = false;this.$refs.tree.$children[2].$children[2].$el.style.color= '';};
                            if('>'+name == ">商户"){this.shop = true;this.$refs.tree.$children[2].node.expanded = true;this.$refs.tree.$children[2].$children[3].$el.style.color= '#f37e01';}else{this.shop = false;this.$refs.tree.$children[2].$children[3].$el.style.color= '';};
                            if('>'+name == ">运营中心"){this.operate = true;this.$refs.tree.$children[2].node.expanded = true;this.$refs.tree.$children[2].$children[4].$el.style.color= '#f37e01';}else{this.operate = false;this.$refs.tree.$children[2].$children[4].$el.style.color= '';};

                            if('>'+name == ">意见建议"){this.opipion = true;this.$refs.tree.$children[3].node.expanded = true;this.$refs.tree.$children[3].$children[1].$el.style.color= '#f37e01'}else{this.opipion = false;this.$refs.tree.$children[3].$children[1].$el.style.color= ''};
                            if('>'+name == ">用户注册协议"){this.registration = true;this.$refs.tree.$children[3].node.expanded = true;this.$refs.tree.$children[3].$children[2].$el.style.color= '#f37e01'}else{this.registration = false;this.$refs.tree.$children[3].$children[2].$el.style.color= ''};
                            if('>'+name == ">隐私政策"){this.privacy = true;this.$refs.tree.$children[3].node.expanded = true;this.$refs.tree.$children[3].$children[3].$el.style.color= '#f37e01'}else{this.privacy = false;this.$refs.tree.$children[3].$children[3].$el.style.color= ''};

                            if('>'+name == ">联系我们"){this.contactUS = true;this.$refs.tree.$children[4].node.expanded = true;this.$refs.tree.$children[4].$children[1].$el.style.color= '#f37e01'}else{this.contactUS = false;this.$refs.tree.$children[4].$children[1].$el.style.color= ''};
                            if('>'+name == ">客服服务"){this.customer = true;this.$refs.tree.$children[4].node.expanded = true;this.$refs.tree.$children[4].$children[2].$el.style.color= '#f37e01'; }else{this.customer = false;this.$refs.tree.$children[4].$children[2].$el.style.color= ''};
                            
                          },
                          check(q,w,e){
                                console.log(q,w,e)
                          },
                          isShow:function(){
                                    alert(123)
                          },
                          remove:function(store, data) {  
                             store.remove(data);  
                          },  

                          renderContent:function(createElement, { node, data, store }) {  
                                       var self = this;  
                                        return createElement('span', [  
                                                            createElement('span', node.label),  
                                                             createElement('span', {attrs:{  
                                                                  style:"float: right; margin-right: 20px"  
                                                             }},[  
                                                                      createElement('el-button',{attrs:{  
                                                                        size:"mini"  
                                                                    },on:{  
                                                                         click:function() {  
                                                                              console.info("点击了节点" + data.id + "的添加按钮");  
                                                                              store.append({ id: self.baseId++, label: 'testtest', children: [] }, data);  
                                                                          }  
                                                                    }},"添加"),  
                                                                     createElement('el-button',{attrs:{  
                                                                       size:"mini"  
                                                                      },on:{  
                                                                       click:function() {  
                                                                             console.info("点击了节点" + data.id + "的删除按钮");  
                                                                            store.remove(data);  
                                                                          }  
                                                                     }},"删除"),  
                                                              ]),  
                                        ]);  
                        } ,
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
                        	go(url) {
                                       LF.window.openWindow(url);
                          },
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
             beforeMount(){
             },
             mounted() {console.log(location.href)
                   var  name = location.hash.replace('#','');console.log(name,5555);console.log(this.$refs.tree,147);
                           name = decodeURI(name);console.log(name,666)                   
                    this.getName(name);
                  
                    console.log(this.$refs.tree.$children[0].$children[1].$el);
                    // this.$refs.tree.$children[0].$children[1].$el.style.color = 'red';
                    // this.$refs.tree.$children[0].$children[1].$el.setAttribute('class', 'active');
             },
components: {
  LfHeader,
  LfSearch,
  LfFooter
},
})