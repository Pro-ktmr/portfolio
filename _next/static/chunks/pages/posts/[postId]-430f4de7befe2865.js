(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[475],{3282:function(t,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[postId]",function(){return n(1634)}])},5745:function(t,s,n){"use strict";n.d(s,{Go:function(){return u},ZP:function(){return l},tS:function(){return _}});var a=n(5893),e=n(1163),r=n(5943),c=n(1664),o=n.n(c),i=n(2261),d=n.n(i);function l(t){var s=t.post,n=t.query;(0,e.useRouter)();return(0,a.jsx)(o(),{href:{pathname:"/posts/".concat(s.postId),query:n},children:(0,a.jsx)("a",{className:d().outer,children:(0,a.jsxs)("div",{className:d().card,children:[(0,a.jsxs)("div",{className:d().eye_catch,children:[(0,a.jsx)("div",{className:d().altCategory,children:s.category}),null!==s.eye_catch?(0,a.jsx)("img",{className:d().image,src:s.eye_catch,alt:s.description,onError:function(t){t.target.style.display="none"}}):(0,a.jsx)(a.Fragment,{})]}),(0,a.jsxs)("div",{className:d().body,children:[(0,a.jsx)("h3",{className:d().title,children:s.title}),(0,a.jsx)("div",{children:(0,a.jsx)(_,{stars:s.stars})}),(0,a.jsx)("div",{className:d().description,children:s.description}),(0,a.jsxs)("div",{className:d().information,children:[(0,a.jsx)(u,{category:s.category,tags:s.tags}),(0,a.jsx)("div",{className:d().duration,children:(0,r.hT)(s.beginning_time,s.ending_time)})]})]})]})})},s.postId)}function _(t){var s=t.stars,n=new Array(s).fill(""),e=new Array(5-s).fill("");return(0,a.jsxs)("span",{className:d().stars,children:[n.map((function(t,s){return(0,a.jsx)("span",{className:"".concat(d().star," ").concat(d().yellow)},s)})),e.map((function(t,s){return(0,a.jsx)("span",{className:"".concat(d().star," ").concat(d().gray)},s)}))]})}function u(t){var s=t.category,n=t.tags;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"".concat(d().badge," ").concat(d().category),children:s}),n.sort().map((function(t){return(0,a.jsx)("span",{className:"".concat(d().badge," ").concat(d().tag),children:t},t)}))]})}},5943:function(t,s,n){"use strict";function a(t){return/^\d{4}-\d{2}$/.test(t)?Date.parse("".concat(t,"-01")):/^\d{4}-\d{2}-\d{2}$/.test(t)?Date.parse(t):-1}function e(t,s){return null===s?"".concat(r(t)," \uff5e"):t===s?r(t):"".concat(r(t)," \uff5e ").concat(r(s)," ")}function r(t){var s;return null!==(s=/^(\d{4})$/.exec(t))?"".concat(parseInt(s[1])," \u5e74"):null!==(s=/^(\d{4})-(\d{2})$/.exec(t))?"".concat(parseInt(s[1])," \u5e74 ").concat(parseInt(s[2])," \u6708"):null!==(s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t))?"".concat(parseInt(s[1])," \u5e74 ").concat(parseInt(s[2])," \u6708 ").concat(parseInt(s[3])," \u65e5"):void 0}n.d(s,{hT:function(){return e},jK:function(){return a},rn:function(){return r}})},1634:function(t,s,n){"use strict";n.r(s),n.d(s,{__N_SSG:function(){return p},default:function(){return h}});var a=n(5893),e=n(9008),r=n.n(e),c=n(1664),o=n.n(c),i=n(1163),d=n(5943),l=n(5910),_=n.n(l),u=n(5745),p=!0;function h(t){t.postId;var s=t.post;(0,i.useRouter)().query;return(0,a.jsxs)("div",{children:[(0,a.jsxs)(r(),{children:[(0,a.jsxs)("title",{children:[s.title,"\uff5c\u30b5\u30fc\u30c1\u3067\u304d\u308b\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u300c\u5e78\u300d"]}),(0,a.jsx)("meta",{name:"description",content:s.description})]}),(0,a.jsx)("div",{className:_().topNav,children:(0,a.jsx)(o(),{href:"/",children:(0,a.jsxs)("a",{children:["\u30b5\u30fc\u30c1\u3067\u304d\u308b\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u300c\u5e78\u300d",(0,a.jsx)("span",{className:_().name,children:"\u2015 \u5317\u6751 \u7950\u7a00"})]})})}),(0,a.jsxs)("article",{className:_().container,children:[(0,a.jsx)("h1",{className:_().title,children:s.title}),(0,a.jsxs)("div",{className:_().status,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(u.tS,{stars:s.stars}),(0,a.jsx)("div",{className:_().duration,children:(0,d.hT)(s.beginning_time,s.ending_time)})]}),(0,a.jsx)("div",{className:_().badges,children:(0,a.jsx)(u.Go,{category:s.category,tags:s.tags})})]}),(0,a.jsx)("div",{className:_().content,dangerouslySetInnerHTML:{__html:s.contentHtml}}),(0,a.jsxs)("div",{className:_().postInfo,children:[(0,a.jsxs)("div",{className:_().row,children:[(0,a.jsx)("div",{className:_().colLeft,children:"\u8a18\u4e8b\u4f5c\u6210\u65e5"}),(0,a.jsx)("div",{className:_().colRight,children:(0,d.rn)(s.created_at)})]}),(0,a.jsxs)("div",{className:_().row,children:[(0,a.jsx)("div",{className:_().colLeft,children:"\u6700\u7d42\u66f4\u65b0\u65e5"}),(0,a.jsx)("div",{className:_().colRight,children:(0,d.rn)(s.updated_at)})]})]})]})]})}},2261:function(t){t.exports={outer:"PostCard_outer__N9JVM",card:"PostCard_card__43pw9",eye_catch:"PostCard_eye_catch__H2Q2p",image:"PostCard_image__ZcZBP",altCategory:"PostCard_altCategory__rCrNw",body:"PostCard_body__GFlPA",title:"PostCard_title__lu7_U",star:"PostCard_star__L4STg",yellow:"PostCard_yellow__GQIL4",gray:"PostCard_gray__SJBLY",description:"PostCard_description__0O_Dq",information:"PostCard_information__3cm0y",badge:"PostCard_badge__Ib7dY",category:"PostCard_category__wQLLd",tag:"PostCard_tag__H3aDu",duration:"PostCard_duration___iTAh"}},5910:function(t){t.exports={topNav:"post_topNav__QLJfX",container:"post_container__hJjJY",title:"post_title__QzVVp",name:"post_name___9Pli",badges:"post_badges__EJ8gk",duration:"post_duration__o7Ren",content:"post_content__qRnWh",postInfo:"post_postInfo__famwY",row:"post_row__CdlG2",colLeft:"post_colLeft__79QoZ",colRight:"post_colRight__Xjxh9",backNav:"post_backNav__n3REM"}}},function(t){t.O(0,[814,774,888,179],(function(){return s=3282,t(t.s=s);var s}));var s=t.O();_N_E=s}]);