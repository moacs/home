(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-171375e7"],{"1fba":function(t,e,s){"use strict";s("60bd")},2768:function(t,e,s){},"2e1d":function(t,e,s){},"60bd":function(t,e,s){},6996:function(t,e,s){"use strict";s("2e1d")},7267:function(t,e,s){"use strict";s.r(e);var i=s("8a6c"),n={name:"HsClock",data:()=>({hours:"00",minutes:"00",seconds:"00"}),mounted(){setInterval(this.clock,1e3)},methods:{clock(){let t=(new Date).getHours(),e=(new Date).getMinutes(),s=(new Date).getSeconds();this.$data.hours=t<10?"0"+t:t,this.$data.minutes=e<10?"0"+e:e,this.$data.seconds=s<10?"0"+s:s}}},o=(s("accd"),s("c304")),a=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"hs-clock"},[e("div",{staticClass:"time"},[e("span",{ref:"hour",staticClass:"hour"},[t._v(t._s(t.hours))]),e("div",{staticClass:"text"},[t._v("时")]),e("span",{ref:"minute",staticClass:"minute"},[t._v(t._s(t.minutes))]),e("div",{staticClass:"text"},[t._v("分")]),e("span",{ref:"second",staticClass:"second"},[t._v(t._s(t.seconds))]),e("div",{staticClass:"text"},[t._v("秒")])])])}),[],!1,null,"3bf0698a",null).exports,c={name:"Weather",data:()=>({showWeather:!0}),mounted(){window.WIDGET={CONFIG:{modules:"12034",background:5,tmpColor:"E4C600",tmpSize:14,cityColor:"E4C600",citySize:14,aqiColor:"#E4C600",aqiSize:14,weatherIconSize:24,alertIconSize:18,padding:"0px 0px 0px 0px",shadow:"1",language:"auto",borderRadius:5,fixed:"false",vertical:"middle",horizontal:"left",key:"e05c4ce44b7e43c6a9303e68cc42a48c"}},this.TOOL.getCDN("https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0","text/javascript",()=>{this.$nextTick(()=>{let t=document.getElementById("hs-weather");this.chartObserve||(this.chartObserve=new ResizeObserver(([{contentRect:t}])=>{0!==t.width&&(this.showWeather=!(t.width>180))}),this.chartObserve.observe(t),this.$once("hook:beforeDestroy",(function(){this.chartObserve.unobserve(t)})))})})}},r=(s("1fba"),{name:"HomeHead",components:{Clock:a,Weather:Object(o.a)(c,(function(){var t=this._self._c;return t("div",{directives:[{name:"show",rawName:"v-show",value:this.showWeather,expression:"showWeather"}],attrs:{id:"hs-weather"}},[t("div",{attrs:{id:"he-plugin-simple"}})])}),[],!1,null,"28f44e35",null).exports},props:{headBgConfig:{type:Object,default:()=>({clear:!1,white:!1,grossGlass:!0})}},data(){return{showMenu:!1,selectedTake:"常用热门",takes:[],journals:[],currentJournal:{},links:[{iconfontClass:"iconfont icon-md-home",text:"花森小窝",url:"http://huasen.cc/",isArticle:!1},{iconfontClass:"iconfont icon-md-stats",text:"更新日志",url:this.$store.state.appConfig.article.course,isArticle:!0},{iconfontClass:"iconfont icon-md-at",text:"关于我们",url:this.$store.state.appConfig.article.about,isArticle:!0}]}},computed:{...Object(i.d)(["showWrapLeft","user"]),showGrossGlass(){return!!(this.showMenu&&document.body.clientWidth<=1024)},signText(){return this.user.token?this.user.name:"注册登录"}},mounted(){this.querySites(),this.queryJournals(),this.initMenu()},methods:{...Object(i.c)(["commitAll"]),querySites(){this.API.findSiteByCode({},{notify:!1}).then(t=>{this.commitAll({sites:t.data})})},queryJournals(){this.API.findJournal({},{notify:!1}).then(t=>{0!==t.data.length&&(this.journals=t.data,this.handleSelectJournal(this.journals[0]._id))})},handleSelectJournal(t){this.journals.find(e=>e._id===t)&&this.API.findJournalInformationById({_id:t}).then(t=>{this.selectJournal(t.data)})},selectJournal(t){this.currentJournal=t,this.commitAll({categorySites:t.series})},hiddenWrapLeft(){this.commitAll({showWrapLeft:!this.showWrapLeft})},sign(){this.user.token?this.commitAll({showWrapPerson:!0}):this.commitAll({showWrapSign:!0})},hiddenMenu(){this.showMenu=!this.showMenu},initMenu(){let t=this.LODASH.debounce(()=>{document.body.clientWidth>1024?this.showMenu=!0:this.showMenu=!1},100,{leading:!0,trailing:!0});window.addEventListener("resize",t),this.$once("hook:beforeDestory",()=>{window.removeEventListener("resize",t)}),this.$nextTick(()=>{let t=new Event("resize",{bubbles:!0,cancelable:!1});document.dispatchEvent(t)})},jump(t,e){let s=t.url;0===e?this.TOOL.openPage(s):this.TOOL.jumpToRead(this,s)}}}),l=(s("6996"),Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",{directives:[{name:"rightMenu",rawName:"v-rightMenu"}],staticClass:"home-head",class:{clear:!t.showGrossGlass&&t.headBgConfig.clear,white:t.headBgConfig.white,"gross-glass":t.showGrossGlass||t.headBgConfig.grossGlass}},[e("section",{staticClass:"fold",on:{click:t.hiddenWrapLeft}},[e("i",{staticClass:"iconfont icon-md-barcode"})]),e("section",{staticClass:"menu",on:{click:t.hiddenMenu}},[e("i",{staticClass:"iconfont icon-md-menu"})]),t.showMenu?e("section",{staticClass:"collapse"},[e("ul",{staticClass:"links"},t._l(t.links,(function(s,i){return e("li",{key:i,on:{click:function(e){return t.jump(s,i)}}},[e("i",{staticClass:"icon",class:s.iconfontClass}),e("span",{staticClass:"text"},[t._v(t._s(s.text))])])})),0)]):t._e(),e("section",{staticClass:"today"},[e("div",{staticClass:"clock-group"},[e("Clock")],1),e("div",{staticClass:"weather-group"},[e("Weather")],1)]),t.showMenu?e("section",{staticClass:"take"},[e("el-dropdown",{staticClass:"dropdown",attrs:{trigger:"click"},on:{command:t.handleSelectJournal}},[e("span",{staticClass:"el-dropdown-link pointer"},[t._v(" "+t._s(t.currentJournal.name||"无订阅源")+" "),e("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.journals,(function(s){return e("el-dropdown-item",{key:s._id,attrs:{command:s._id}},[t._v(" "+t._s(s.name)+" ")])})),1)],1)],1):t._e(),t.showMenu?e("section",{staticClass:"sign",on:{click:t.sign}},[t._v(" "+t._s(t.signText||"花酱大人")+" ")]):t._e()])}),[],!1,null,"60e7b2ad",null));e.default=l.exports},accd:function(t,e,s){"use strict";s("2768")}}]);