(window.webpackJsonppreact=window.webpackJsonppreact||[]).push([[0],{161:function(e,t,a){e.exports=a(285)},199:function(e){e.exports=JSON.parse('[{"img":"https://asset.zcache.co.uk/assets/graphics/z4/uniquePages/banners/Baby_Hub_2015_728x90.1_2X.jpg","url":"https://www.zazzle.co.uk/baby+gifts?rf=238112296902500890&CMPN=ban_custom_cuteness"},{"url":"https://www.zazzle.co.uk/?rf=238112296902500890&CMPN=ban_zazzle_shop_create","img":"https://asset.zcache.co.uk/assets/graphics/z4/uniquePages/banners/zazzleLogo_shopCreate_468x60.jpg"},{"url":"https://www.amazon.com/dp/B002I0J4VQ?tag=rudix-20&linkCode=ur1","img":"https://images-na.ssl-images-amazon.com/images/G/01/img09/video-games/associates/leaderboard/amazon-ps3-120_728x90.png"},{"url":"https://www.zazzle.co.uk/tanktops?rf=238112296902500890&CMPN=ban_custom_tank_tops_2015","img":"https://asset.zcache.co.uk/assets/graphics/z4/uniquePages/banners/Tank_Tops_2015_728x90.jpg"},{"url":"https://www.amazon.com/b?tag=rudix-20&linkCode=ur1&node=5174","img":"https://images-na.ssl-images-amazon.com/images/G/01/img09/associates/med-rec/music_med-rec.gif"},{"url":"https://www.amazon.com/music/unlimited/hd?tag=rudix-20&linkCode=ur1","img":"https://images-na.ssl-images-amazon.com/images/G/01/associates/080119_US_Katana_ACQ_PD_eg_CV8E_468x60._CB1569025332_.jpg"},{"url":"https://www.amazon.com/dp/B074TJCK8Y/ref=twister_B06XDGTPDP?tag=rudix-20&linkCode=ur1&_encoding=UTF8&psc=1","img":"https://images-na.ssl-images-amazon.com/images/G/01/145155916X/Affiliate_Desktop_300x600._CB1572463427_.jpg"},{"url":"https://www.amazon.com/s/node=3063530011&hidden-keywords=Animated&suppress-ve=true&ie=UTF8/ref=as_acph_gc_animb_77_on?tag=rudix-20&linkCode=ur1","img":"https://images-na.ssl-images-amazon.com/images/G/01/gift-certificates/consumer/2013/anim/merch/assoc/gc_anim_assoc-728x90.png"},{"img":"https://images-na.ssl-images-amazon.com/images/G/01/digital/infinity/associates/associate_banner_728_90_v02._V251152849_.gif","url":"https://www.amazon.com/b/?tag=rudix-20&linkCode=ur1&node=979455011"}]')},28:function(e,t){e.exports={env:{api:"https://rudixauth.herokuapp.com/test/"}}},283:function(e,t,a){},285:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(6),l=a.n(c),o=a(155),i=a(33),s=(a(166),a(153)),m=a(38),u=a(82),p=a(83);function d(){var e=Object(u.a)(["\n  text-align: left;\n  padding: 0px;\n  margin-bottom: 0px;\n\n  padding: 4px;\n  h1 {\n    font-size: 3em;\n    font-weight: lighter;\n    color: #02bac8;\n  }\n  img {\n    width: 60px;\n    float: left;\n    margin-right: 5px;\n  }\n"]);return d=function(){return e},e}function g(){var e=Object(u.a)(["\n  .headertop {\n    height: 50px;\n    text-align: center;\n    background-color: #231f20;\n    img {\n      margin: auto;\n      height: 50px;\n    }\n  }\n"]);return g=function(){return e},e}function f(){var e=Object(u.a)(["\n  font-size: 1.5em;\n  text-align: left;\n  padding: 0px;\n  margin-bottom: 0px;\n  margin-left: 14px;\n  color: palevioletred;\n  font-weight: lighter;\n  clear: both;\n  display: block;\n"]);return f=function(){return e},e}var E=p.a.div(f()),h=p.a.div(g()),w=p.a.div(d()),y=a(288),x=a(289),v=a(10),_=a(52),k=a(24),b=a(291),z=a(144),F=a.n(z),C=a(145),j=a.n(C),O=a(199),N=function(){var e=j()(O)[0];return r.a.createElement("div",{style:{textAlign:"center",marginBottom:5}},r.a.createElement("a",{href:e.url,rel:"nofollow",target:"_top"},r.a.createElement("img",{src:e.img,style:{maxWidth:"100%"},alt:""})))},B=a(293),I=a(89),A=function(e){var t=e.text;return t?t.split(" ").map((function(e){return"#"===e.substring(0,1)?{type:"tag",word:e,key:I()}:"http"===e.substring(0,3)?{type:"url",word:"xxx",key:I()}:{word:e,type:"word",key:I()}})).map((function(e){return"url"===e.type?r.a.createElement(r.a.Fragment,{key:e.key},"dsdsxxxxx"):"tag"===e.type?r.a.createElement("a",{key:e.key,href:"/t/".concat(e.word.toLowerCase().replace("#","").replace(".",""))},r.a.createElement(B.a,{style:{border:"none",cursor:"pointer",margin:4}},e.word.replace("#",""))):"".concat(e.word," ")})):""},P=function(e){var t=e.item,a=t.title||t.text,n=t.urls&&t.urls[0]?t.urls[0]:null;return a=n?a.replace(n,""):a,r.a.createElement(y.a,{datetime:r.a.createElement(F.a,{date:new Date(parseInt(t.date,10))}),author:r.a.createElement("a",{href:"/u/".concat(t.screenName)},r.a.createElement("h2",{style:{fontWeight:"lighter",color:"#ccc"}},t.screenName)),avatar:r.a.createElement(x.a,{src:"https://avatars.io/twitter/".concat(t.screenName),size:"large"}),content:t.replyCount?r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{style:{color:"#fff"}},r.a.createElement(A,{text:a})),r.a.createElement("span",{style:{color:"#FFF"}},r.a.createElement(v.a,{type:"message",style:{color:"#FFF"}})," ".concat(t.replyCount,"    ")),r.a.createElement("span",{style:{color:"#FFF"}},r.a.createElement(v.a,{type:"redo",style:{color:"#FFF"}})," ".concat(t.retweetCount,"    ")),r.a.createElement("span",{style:{color:"#FFF"}},r.a.createElement(v.a,{type:"heart",style:{color:"#FFF"}})," ".concat(t.favoriteCount,"  "))):r.a.createElement("span",{style:{fontWeight:"lighter",color:"#fff",fontSize:"0.9rem"}},r.a.createElement(A,{text:a}))})},S=function(e){var t=e.item,a=e.i,n=t.screenName,c=t.quote,l=t.images,o="/u/".concat(n),i=c?r.a.createElement(P,{item:c,href:o},r.a.createElement(P,{item:t,href:o})):r.a.createElement(P,{item:t,href:o});return r.a.createElement(_.a,{type:"flex",justify:"center"},r.a.createElement(k.a,{xs:23,sm:20,md:18,lg:10},1===a||3===a?r.a.createElement(N,null):null,r.a.createElement(b.a,{style:{marginBottom:5,backgroundColor:"#231f20"},bordered:!1,type:"inner",cover:l?r.a.createElement("img",{alt:"",style:{width:"100%"},src:l[0]}):null},i)))},G=a(290),T=a(28),L=a(50),q=a.n(L),D=a(79),J=a(63),U=a(80),W=a.n(U),M=function(e){var t=Object(n.useState)([]),a=Object(J.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)((function(){(function(){var t=Object(D.a)(q.a.mark((function t(){var a;return q.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,W()(e);case 2:a=t.sent,c(a.data);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]),r},V=function(e){var t=e.prefix,a=e.rows;return r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(G.a,{itemLayout:"horizontal",dataSource:a,renderItem:function(e){return r.a.createElement("span",null,r.a.createElement("a",{href:"/".concat(t,"/").concat(e.key)},r.a.createElement(B.a,{style:{backgroundColor:"#231f20",border:"none",color:"#67d5e4",cursor:"pointer",margin:4}},e.key)),e.value>=2?r.a.createElement(B.a,{style:{border:"none",marginLeft:-5}},"".concat(e.value)):null)}}))},X=function(e){var t=e.tag,a=M("".concat(T.env.api,'twitter/_design/api/_view/tags?reduce=true&group=true&limit=25&skip=25&start_key="').concat(t,'"&update=false')),n=M("".concat(T.env.api,'twitter/_design/api/_view/users?reduce=true&group=true&limit=25&skip=25&start_key="').concat(t,'"&update=false'));return r.a.createElement("div",null,r.a.createElement(_.a,{type:"flex",justify:"center"},r.a.createElement(k.a,{xs:23,sm:20,md:18,lg:10},r.a.createElement(E,null,"Users"),n?r.a.createElement(V,{rows:n.rows,prefix:"u"}):null,r.a.createElement(E,null,"Tags"),a?r.a.createElement(V,{rows:a.rows,prefix:"t"}):null)))},K=a(292).a.Search,Q=function(){var e=Object(n.useState)(null),t=Object(J.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(null),o=Object(J.a)(l,2),i=o[0],s=o[1];return Object(n.useEffect)((function(){var e=function(){var e=Object(D.a)(q.a.mark((function e(){var t;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W()("".concat(T.env.api,'twitter/_design/api/_view/tags?reduce=true&group=true&limit=5&start_key="').concat(i,'"&update=false'));case 2:t=e.sent,c(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();i&&i.length>=3?e():c(null)}),[i]),r.a.createElement(_.a,{type:"flex",justify:"center"},r.a.createElement(k.a,{xs:23,sm:20,md:18,lg:10,style:{marginBottom:20}},r.a.createElement(K,{placeholder:"search for users or tags",onChange:function(e){return s(e.target.value)},style:{color:"#FFF"}}),a?r.a.createElement(G.a,{itemLayout:"horizontal",dataSource:a.rows,renderItem:function(e){return r.a.createElement(G.a.Item,null,r.a.createElement(G.a.Item.Meta,{avatar:r.a.createElement(x.a,{src:"https://avatars.io/twitter/".concat(e.key),size:"large"}),title:r.a.createElement("a",{href:"/u/".concat(e.key),style:{color:"#FFF"}},e.key)}))}}):null))},H=a(89),R=function(e){var t=e.user,a=M("".concat(T.env.api,'twitter/_design/api/_view/users?key="').concat(t,'"&reduce=false&include_docs=true&limit=200&update=false&descending=true'));return r.a.createElement(m.b,null,r.a.createElement(m.a,null,r.a.createElement("title",null,"".concat(t))),a.rows?r.a.createElement(r.a.Fragment,null,r.a.createElement(w,null,r.a.createElement("img",{src:"https://avatars.io/twitter/".concat(a.rows[0].doc.screenName),size:"large",alt:""}),r.a.createElement("h1",null,a.rows[0].doc.screenName)),r.a.createElement(Q,null),r.a.createElement(m.a,null,r.a.createElement("title",null,"".concat(t)),r.a.createElement("meta",{name:"description",content:"".concat(a.rows[0].doc.screenName," : ").concat(a.rows[0].doc.title)})),a.rows.map((function(e,t){return r.a.createElement(S,{key:H(),item:e.doc,i:t})}))):r.a.createElement("div",{style:{textAlign:"center",padding:20}},r.a.createElement(s.a,null)),r.a.createElement(X,{tag:t}))},Y=a(89),$=function(e){var t=e.tag,a=M("".concat(T.env.api,'twitter/_design/api/_view/tags?key="').concat(t,'"&reduce=false&include_docs=true&limit=30&descending=true&update=false')),n=M("https://amazonka.herokuapp.com/insta/".concat(t));return r.a.createElement(m.b,null,r.a.createElement(w,null,r.a.createElement("h1",null,"#".concat(t))),r.a.createElement(Q,null),a.rows&&a.rows[0]?r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,null,r.a.createElement("title",null,"#".concat(t)),r.a.createElement("meta",{name:"description",content:"".concat(a.rows[0].doc.screenName," : ").concat(a.rows[0].doc.title)})),a.rows.map((function(e,t){return r.a.createElement(S,{key:Y(),item:e.doc,i:t})}))):r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(s.a,null)),n&&n.medias?r.a.createElement(r.a.Fragment,null,n.medias.map((function(e,t){return r.a.createElement(_.a,{type:"flex",justify:"center",key:e.media_id},r.a.createElement(k.a,{xs:23,sm:20,md:18,lg:10},6===t||3===t||5===t?r.a.createElement(N,null):null,r.a.createElement(b.a,{style:{marginBottom:5,backgroundColor:"#231f20"},bordered:!1,type:"inner",cover:r.a.createElement("img",{alt:e.text,style:{width:"100%"},src:e.thumbnail})},r.a.createElement("span",{style:{color:"#FFF"}},r.a.createElement(A,{text:e.text})))))}))):null,r.a.createElement(X,{tag:t}))},Z=a(112),ee=function(){var e="abcdefghijklmnopqrstuvwxyz".split("");return r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(Z.a.Group,{size:"small"},e.map((function(e){return r.a.createElement(Z.a,{type:"primary",key:e,href:"/t/".concat(e)},e.toUpperCase())}))))},te=(a(283),function(e){var t=e.match;return r.a.createElement(h,null,r.a.createElement("div",{className:"headertop"},r.a.createElement("img",{src:"/twitterlogo.png",alt:""})),t&&"u"===t.params.id?r.a.createElement(R,{user:t.params.id2}):t&&"t"===t.params.id?r.a.createElement($,{tag:t.params.id2}):r.a.createElement(ee,null),r.a.createElement("div",{style:{textAlign:"center",color:"#02bac8"}},"RudixLabs \xa9 2019 : the site is not associated or affiliated with Twitter"))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement((function(){return r.a.createElement(o.a,null,r.a.createElement("div",null,r.a.createElement(i.a,{path:"/",exact:!0,component:function(){return r.a.createElement(te,{isIndex:!0})}}),r.a.createElement(i.a,{path:"/:id/",exact:!0,render:function(e){return r.a.createElement(te,{match:e.match,isIndex:!1})}}),r.a.createElement(i.a,{path:"/:id/:id2",exact:!0,render:function(e){return r.a.createElement(te,{match:e.match,isIndex:!1})}}),r.a.createElement(i.a,{path:"/:id/:id2/:start_key",exact:!0,render:function(e){return r.a.createElement(te,{match:e.match,isIndex:!1})}})))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[161,1,2]]]);
//# sourceMappingURL=main.decb8ee2.chunk.js.map