(this["webpackJsonpbuttes-chaumont-fe"]=this["webpackJsonpbuttes-chaumont-fe"]||[]).push([[0],{17:function(e,t,c){},20:function(e,t,c){},21:function(e,t,c){"use strict";c.r(t);var a=c(0),s=c(2),n=c.n(s),r=c(10),i=c.n(r),l=(c(17),c(5)),o=c.n(l),j=c(9),b=c(11),d=c(1),u=c(3),h=c(8),O=(c(20),c.p+"static/media/strava.a72b2b3c.svg"),m="http://www.strava.com/oauth/authorize?"+"client_id=".concat("57858")+"&response_type=code"+"&redirect_uri=".concat("https://stefanoschrs.com/buttes-chaumont.fr/api","/strava/callback")+"&scope=read",f=[{id:"rank",Header:"Rank"},{id:"name",Header:"Name",accessor:"name"}],x=[].concat(f,[{id:"pr",Header:"Time",accessor:"pr",Cell:function(e){var t=new Date(0);return t.setSeconds(e.cell.value),t.toISOString().substr(11,8)}}]),p=[].concat(f,[{id:"efforts",Header:"Efforts",accessor:"efforts"}]);function g(){return Object(a.jsxs)("div",{className:"StravaButton",children:[Object(a.jsx)("span",{children:"Update my stats"}),Object(a.jsx)("img",{src:O,alt:"Strava Logo"})]})}function v(e){var t=Object(h.useTable)({columns:e.columns,data:e.data},h.usePagination),c=t.getTableProps,n=t.getTableBodyProps,r=t.headerGroups,i=t.prepareRow,l=t.page,o=t.state,j=o.pageIndex,b=o.pageSize,O=t.gotoPage,m=t.previousPage,f=t.nextPage,x=t.setPageSize,p=t.canPreviousPage,g=t.canNextPage,v=Object(s.useState)([]),N=Object(u.a)(v,2),w=N[0],P=N[1];return Object(s.useEffect)((function(){x(10),P(Array(Math.ceil(e.data.length/b)).fill(0).map((function(e,t){return Object(a.jsx)("li",{children:Object(a.jsx)("button",{className:"pagination-link"+(j===t?" is-current":""),"aria-label":"Page "+(t+1),"aria-current":"page",onClick:O(t),children:t+1})},t)})))}),[]),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("table",Object(d.a)(Object(d.a)({style:{height:"200px"},className:"table is-fullwidth"},c()),{},{children:[Object(a.jsx)("thead",{children:r.map((function(e){return Object(a.jsx)("tr",Object(d.a)(Object(d.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(a.jsx)("th",Object(d.a)(Object(d.a)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(a.jsx)("tbody",Object(d.a)(Object(d.a)({},n()),{},{children:l.map((function(e,t){return i(e),Object(a.jsx)("tr",Object(d.a)(Object(d.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return"rank"===e.column.id?Object(a.jsx)("td",Object(d.a)(Object(d.a)({},e.getCellProps()),{},{children:t+1}),e.column.Header):Object(a.jsx)("td",Object(d.a)(Object(d.a)({},e.getCellProps()),{},{children:e.render("Cell")}),e.column.Header)}))}),t)}))}))]})),Object(a.jsxs)("nav",{className:"pagination",role:"navigation","aria-label":"pagination",children:[Object(a.jsx)("button",{className:"pagination-previous",disabled:!p,onClick:m,children:"Previous"}),Object(a.jsx)("button",{className:"pagination-next",disabled:!g,onClick:f,children:"Next"}),Object(a.jsx)("ul",{className:"pagination-list",children:w})]})]})}var N=function(){var e=Object(s.useState)([]),t=Object(u.a)(e,2),c=t[0],n=t[1],r=Object(s.useState)(0),i=Object(u.a)(r,2),l=i[0],d=i[1],h=Object(s.useState)([]),O=Object(u.a)(h,2),f=O[0],N=O[1],w=Object(s.useState)([]),P=Object(u.a)(w,2),k=P[0],S=P[1];return Object(s.useEffect)((function(){function e(){return(e=Object(b.a)(o.a.mark((function e(){var t,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://stefanoschrs.com/buttes-chaumont.fr/api","/segments"));case 2:return t=e.sent,e.next=5,t.json();case 5:(c=e.sent).sort((function(e,t){return e.segmentName>t.segmentName?-1:1})),n([].concat(Object(j.a)(c.slice(2,4)),Object(j.a)(c.slice(0,2))));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(s.useEffect)((function(){if(!c.length)return;N(c.map((function(e,t){return Object(a.jsx)("li",{className:l===t?"is-active":"",onClick:function(){return d(t)},children:Object(a.jsx)("a",{children:e.segmentName})},t)})));var e=c[l];S([Object(a.jsx)("div",{className:"column is-half leaderboard",children:Object(a.jsxs)("div",{className:"box",children:[Object(a.jsx)("h2",{className:"subtitle",children:"Time"}),Object(a.jsx)(v,{columns:x,data:e.entries.sort((function(e,t){return e.efforts-t.efforts}))})]})},e.id),Object(a.jsx)("div",{className:"column is-half leaderboard",children:Object(a.jsxs)("div",{className:"box",children:[Object(a.jsx)("h2",{className:"subtitle",children:"Efforts"}),Object(a.jsx)(v,{columns:p,data:e.entries.sort((function(e,t){return e.pr-t.pr}))})]})},e.id)])}),[c,l]),Object(a.jsxs)("div",{className:"App",children:[Object(a.jsxs)("section",{className:"section home",children:[Object(a.jsx)("div",{className:"overlay"}),Object(a.jsxs)("div",{className:"content",children:[Object(a.jsx)("h1",{className:"title",children:"Parc des Buttes Chaumont"}),Object(a.jsx)("a",{href:m,children:Object(a.jsx)(g,{})})]})]}),Object(a.jsxs)("section",{className:"section",children:[Object(a.jsx)("h1",{className:"title has-text-centered",children:"Leaderboard"}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{className:"tabs is-centered",children:Object(a.jsx)("ul",{children:f})}),Object(a.jsx)("div",{className:"columns",children:k})]}),Object(a.jsxs)("footer",{className:"footer has-text-grey has-background-grey-darker has-text-centered",children:[Object(a.jsxs)("div",{children:["\xa9 buttes-chaumont.fr ",(new Date).getFullYear()]}),Object(a.jsx)("div",{className:"social",children:Object(a.jsx)("a",{rel:"noreferrer noopener nofollow",target:"_blank",href:"https://www.facebook.com/buttes-chaumont.fr/",children:Object(a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(a.jsx)("path",{fill:"#7a7a7a",d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"})})})})]})]})};i.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(N,{})}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.a8e981e1.chunk.js.map