(this["webpackJsonpbuttes-chaumont-fe"]=this["webpackJsonpbuttes-chaumont-fe"]||[]).push([[0],{17:function(e,t,a){},20:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(1),n=a.n(c),r=a(11),i=a.n(r),o=(a(17),a(4)),l=a.n(o),d=a(10),h=a(8),j=a(2),b=a(3),u=a(9),m=(a(20),a.p+"static/media/strava.a72b2b3c.svg"),p="http://www.strava.com/oauth/authorize?"+"client_id=".concat("57858")+"&response_type=code"+"&redirect_uri=".concat("https://stefanoschrs.com/buttes-chaumont","/strava/callback")+"&scope=read",O="https://www.instagram.com/explore/locations/260718750/parc-des-buttes-chaumont/",f=[{id:"rank",Header:"Rank"},{id:"name",Header:"Name",accessor:"name"}],x=[].concat(f,[{id:"pr",Header:"Time",accessor:"pr",Cell:function(e){var t=new Date(0);return t.setSeconds(e.cell.value),t.toISOString().substr(11,8)}}]),g=[].concat(f,[{id:"efforts",Header:"Efforts",accessor:"efforts"}]);function v(){return Object(s.jsxs)("div",{className:"StravaButton",children:[Object(s.jsx)("span",{children:"Update my stats"}),Object(s.jsx)("img",{src:m,alt:"Strava Logo"})]})}function N(e){var t=Object(u.useTable)({columns:e.columns,data:e.data},u.usePagination),a=t.getTableProps,n=t.getTableBodyProps,r=t.headerGroups,i=t.prepareRow,o=t.page,l=t.state,d=l.pageIndex,h=l.pageSize,m=t.gotoPage,p=t.previousPage,O=t.nextPage,f=t.setPageSize,x=t.canPreviousPage,g=t.canNextPage,v=Object(c.useState)([]),N=Object(b.a)(v,2),w=N[0],k=N[1];return Object(c.useEffect)((function(){f(10),k(Array(Math.ceil(e.data.length/h)).fill(0).map((function(e,t){return Object(s.jsx)("li",{children:Object(s.jsx)("button",{className:"pagination-link"+(d===t?" is-current":""),"aria-label":"Page "+(t+1),"aria-current":"page",onClick:m(t),children:t+1})},t)})))}),[]),Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("table",Object(j.a)(Object(j.a)({style:{height:"200px"},className:"table is-fullwidth"},a()),{},{children:[Object(s.jsx)("thead",{children:r.map((function(e){return Object(s.jsx)("tr",Object(j.a)(Object(j.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(s.jsx)("th",Object(j.a)(Object(j.a)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(s.jsx)("tbody",Object(j.a)(Object(j.a)({},n()),{},{children:o.map((function(e,t){return i(e),Object(s.jsx)("tr",Object(j.a)(Object(j.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return"rank"===e.column.id?Object(s.jsx)("td",Object(j.a)(Object(j.a)({},e.getCellProps()),{},{children:t+1}),e.column.Header):Object(s.jsx)("td",Object(j.a)(Object(j.a)({},e.getCellProps()),{},{children:e.render("Cell")}),e.column.Header)}))}),t)}))}))]})),Object(s.jsxs)("nav",{className:"pagination",role:"navigation","aria-label":"pagination",children:[Object(s.jsx)("button",{className:"pagination-previous",disabled:!x,onClick:p,children:"Previous"}),Object(s.jsx)("button",{className:"pagination-next",disabled:!g,onClick:O,children:"Next"}),Object(s.jsx)("ul",{className:"pagination-list",children:w})]})]})}var w=function(){var e=Object(c.useState)([]),t=Object(b.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(0),i=Object(b.a)(r,2),o=i[0],j=i[1],u=Object(c.useState)([]),m=Object(b.a)(u,2),f=m[0],w=m[1],k=Object(c.useState)([]),y=Object(b.a)(k,2),P=y[0],S=y[1],_=Object(c.useState)([]),C=Object(b.a)(_,2),B=C[0],T=C[1],H=Object(c.useState)(!0),I=Object(b.a)(H,2),E=I[0],M=I[1];return Object(c.useEffect)((function(){function e(){return(e=Object(h.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://stefanoschrs.com/buttes-chaumont","/segments"));case 2:return t=e.sent,e.next=5,t.json();case 5:(a=e.sent).sort((function(e,t){return e.segmentName>t.segmentName?-1:1})),n([].concat(Object(d.a)(a.slice(2,4)),Object(d.a)(a.slice(0,2))));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function t(){return(t=Object(h.a)(l.a.mark((function e(){var t,a,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(O);case 2:return t=e.sent,e.next=5,t.text();case 5:a=e.sent,M(!1),c=JSON.parse(a.split("\n").find((function(e){return e.includes("_sharedData")})).match(/{.+}/)[0]).entry_data.LocationsPage[0].graphql.location.edge_location_to_top_posts.edges,T(c.slice(0,15).map((function(e){return Object(s.jsx)("div",{className:"column is-one-fifth post",children:Object(s.jsx)("a",{rel:"nofollow noopener noreferrer",target:"_blank",className:"link",href:"https://instagram.com/p/"+e.node.shortcode,children:Object(s.jsx)("img",{className:"image",src:e.node.thumbnail_src,alt:"Instagram Post "+e.node.shortcode})})},e.node.shortcode)})));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(function(){e.apply(this,arguments)})(),function(){t.apply(this,arguments)}()}),[]),Object(c.useEffect)((function(){if(!a.length)return;w(a.map((function(e,t){return Object(s.jsx)("li",{className:o===t?"is-active":"",onClick:function(){return j(t)},children:Object(s.jsx)("a",{children:e.segmentName})},t)})));var e=a[o];S([Object(s.jsx)("div",{className:"column is-half leaderboard",children:Object(s.jsxs)("div",{className:"box",children:[Object(s.jsx)("h2",{className:"subtitle",children:"Time"}),Object(s.jsx)(N,{columns:x,data:e.entries.sort((function(e,t){return e.efforts-t.efforts}))})]})},e.id+"-time"),Object(s.jsx)("div",{className:"column is-half leaderboard",children:Object(s.jsxs)("div",{className:"box",children:[Object(s.jsx)("h2",{className:"subtitle",children:"Efforts"}),Object(s.jsx)(N,{columns:g,data:e.entries.sort((function(e,t){return e.pr-t.pr}))})]})},e.id+"-efforts")])}),[a,o]),Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("section",{className:"section home",children:[Object(s.jsx)("div",{className:"overlay"}),Object(s.jsxs)("div",{className:"content",children:[Object(s.jsx)("h1",{className:"title",children:"Parc des Buttes Chaumont"}),Object(s.jsx)("a",{href:p,children:Object(s.jsx)(v,{})})]})]}),Object(s.jsxs)("section",{className:"section leaderboards",children:[Object(s.jsx)("h1",{className:"title has-text-centered",children:"Leaderboard"}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)("div",{className:"tabs is-centered",children:Object(s.jsx)("ul",{children:f})}),Object(s.jsx)("div",{className:"columns",children:P})]})]}),Object(s.jsxs)("section",{className:"section history",children:[Object(s.jsx)("h1",{className:"title has-text-centered",children:"History"}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)("p",{className:"paragraph",children:"The Parc des Buttes Chaumont (pronounced [pa\u0281k de byt \u0283om\u0254\u0303]) is a public park situated in northeastern Paris, France, in the 19th arrondissement. Occupying 24.7 hectares (61 acres), it is the fifth-largest park in Paris, after the Bois de Vincennes, Bois de Boulogne, Parc de la Villette and Tuileries Garden."}),Object(s.jsx)("p",{className:"paragraph",children:"Opened in 1867, late in the regime of Napoleon III, it was built according to plans by Jean-Charles Adolphe Alphand, who created all the major parks demanded by the Emperor. The park has 5.5 kilometres (3.4 miles) of roads and 2.2 kilometres (1.4 miles) of paths. The most famous feature of the park is the Temple de la Sibylle, inspired by the Temple of Vesta in Tivoli, Italy, and perched at the top of a cliff fifty metres above the waters of the artificial lake."}),Object(s.jsx)("p",{className:"paragraph",children:Object(s.jsx)("a",{rel:"nofollow noopener noreferrer",target:"_blank",href:"https://en.wikipedia.org/wiki/Parc_des_Buttes_Chaumont",children:Object(s.jsx)("i",{children:"Read More.."})})})]})]}),Object(s.jsxs)("section",{className:"section instagram",children:[Object(s.jsx)("h1",{className:"title has-text-centered",children:"Media"}),Object(s.jsx)("br",{}),Object(s.jsx)("div",{className:"container",children:Object(s.jsxs)("div",{className:"columns is-flex-wrap-wrap",children:[!E&&B,E&&Object(s.jsx)("div",{className:"loading-container",children:Object(s.jsx)("i",{children:"Loading Media.."})})]})})]}),Object(s.jsxs)("footer",{className:"footer has-text-grey has-background-grey-darker has-text-centered",children:[Object(s.jsxs)("div",{children:["\xa9 buttes-chaumont.fr ",(new Date).getFullYear()]}),Object(s.jsxs)("div",{className:"social",children:[Object(s.jsx)("a",{rel:"noreferrer noopener nofollow",target:"_blank",href:"https://www.facebook.com/Buttes-chaumontfr-105725564839140",children:Object(s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(s.jsx)("path",{fill:"#7a7a7a",d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"})})}),Object(s.jsx)("a",{rel:"noreferrer noopener nofollow",target:"_blank",href:"https://github.com/stefanoschrs/buttes-chaumont.fr",children:Object(s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(s.jsx)("path",{fill:"#7a7a7a",d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})})})]})]})]})};i.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(w,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js",{}).then((function(e){console.log(e)})).catch((function(e){return console.log("Registration failed with "+e)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.b7c13930.chunk.js.map