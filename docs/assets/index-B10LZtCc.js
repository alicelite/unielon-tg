import{j as m,m as A,U as st,X as N,r as R,R as _n,C as Ln,T as lt,s as E,B as Ye,Y as Fn,o as Ve,$ as Mn}from"./index-BgmPsFMa.js";const Rn={history:"./images/icons/clock-solid.svg",merge:"./images/icons/bx-merge.svg",pending:"./images/icons/transfer-pending.svg",refresh:"./images/icons/refresh.svg",search:"./images/icons/search.svg",send:"./images/icons/arrow-left-right.svg",swap:"./images/icons/swap-fill.svg",receive:"./images/icons/qrcode.svg",trade:"./images/icons/trade1.svg",add:"./images/icons/addition.svg","right-arrow":"./images/icons/arrow-up-right.svg",right:"./images/icons/arrow-right.svg",left:"./images/icons/arrow-left.svg",down:"./images/icons/down.svg",discord:"./images/icons/discord.svg",twitter:"./images/icons/twitter.svg",doge:"./images/icons/wallet-logo.png",qrcode:"./images/icons/qrcode.svg",user:"/images/icons/user-solid.svg",wallet:"/images/icons/wallet-solid.svg",settings:"./images/icons/gear-solid.svg",grid:"./images/icons/grid-solid.svg",delete:"/images/icons/delete.svg",success:"/images/icons/success.svg",check:"/images/icons/check.svg",eye:"/images/icons/eye.svg","eye-slash":"../../../assets/images/eye-slash.svg",copy:"./images/icons/copy-solid.svg",transfer:"./images/icons/transfer.svg",close:"./images/icons/xmark.svg","circle-check":"/images/icons/circle-check.svg",pencil:"/images/icons/pencil.svg","circle-info":"/images/icons/circle-info.svg","circle-question":"/images/icons/circle-question.svg"},Dn=["success","delete","doge"];function vt(t){const{icon:e,color:n,size:a,style:r,containerStyle:s,onClick:i,children:o}=t;if(!e)return m.jsx("div",{onClick:i,style:Object.assign({},{color:n?A[n]:"#FFF",fontSizes:a||st.icon,display:"flex"},s,r||{},i?{cursor:"pointer"}:{}),children:o});const l=Rn[e];return Dn.includes(e)?m.jsx("img",{src:l,alt:"",style:Object.assign({},s,{width:a||st.icon,height:a||st.icon})}):l?m.jsx("div",{style:s,children:m.jsx("div",{onClick:i,style:Object.assign({},{color:n?A[n]:"#FFF",width:a||st.icon,height:a||st.icon,backgroundColor:n?A[n]:"#FFF",maskImage:`url(${l})`,maskSize:"cover",maskRepeat:"no-repeat",maskPosition:"center",WebkitMaskImage:`url(${l})`,WebkitMaskSize:"cover",WebkitMaskRepeat:"no-repeat",WebkitMaskPosition:"center"},r||{},i?{cursor:"pointer"}:{})})}):m.jsx("div",{})}const X={display:"flex",minHeight:36,borderRadius:4,justifyContent:"center",alignItems:"center",flexDirection:"row",overflow:"hidden",cursor:"pointer",alignSelf:"stretch",paddingLeft:N.small,paddingRight:N.small},zn={default:Object.assign({},X,{backgroundColor:A.black_dark}),default_:Object.assign({},X,{backgroundColor:A.black_gray}),primary:Object.assign({},X,{backgroundColor:A.yellow,height:"40px"}),failed:Object.assign({},X,{backgroundColor:A.failed,height:"40px"}),success:Object.assign({},X,{backgroundColor:"rgb(99, 179, 70)",height:"40px"}),danger:Object.assign({},X,{backgroundColor:A.red,height:"40px"}),bar:Object.assign({},X,{backgroundColor:A.black_dark,height:"75px",justifyContent:"space-between",paddingTop:N.medium,paddingBottom:N.medium})},$n={default:{backgroundColor:"#998340"},default_:{backgroundColor:"#383535"},failed:{backgroundColor:"rgba(255, 255, 255, 0.5)"},primary:{backgroundColor:A.yellow_dark},success:{backgroundColor:"rgb(99, 179, 70)"},danger:{backgroundColor:A.red_dark},bar:{backgroundColor:"#383535"}},J={textAlign:"center",flexShrink:1,flexGrow:0,zIndex:2,color:A.white,paddingLeft:N.tiny,paddingRight:N.tiny},me={default:J,default_:J,primary:Object.assign({},J,{color:A.black}),success:Object.assign({},J,{color:A.white}),danger:Object.assign({},J,{color:A.white}),bar:Object.assign({},J,{textAlign:"left",fontWeight:"bold"}),failed:{}},ge={marginLeft:N.extraSmall,zIndex:1},pe={marginRight:N.extraSmall,zIndex:1},Wn={cursor:"not-allowed",opacity:.5};function as(t){const{text:e,subText:n,style:a,textStyle:r,children:s,RightAccessory:i,LeftAccessory:o,onClick:l,icon:c,disabled:u,full:p,iconStyle:d}=t,h=t.preset||"default",[w,S]=R.useState(!1),b=Object.assign({},zn[h],a,w&&!u?$n[h]:{},u?Wn:{},p?{flex:1}:{}),k=Object.assign({},me[h],r),v=Object.assign({},me[h],{color:A.white_muted,marginTop:5,fontWeight:"normal"});return h==="bar"?m.jsxs("div",{style:b,onMouseEnter:()=>S(!0),onMouseLeave:()=>S(!1),onClick:u?void 0:l,children:[m.jsxs(_n,{children:[o&&m.jsx("div",{style:pe,children:o}),c&&m.jsx(vt,{icon:c,color:"white",style:{marginRight:N.tiny,...d}}),m.jsxs(Ln,{justifyCenter:!0,gap:"zero",children:[e&&m.jsx(lt,{text:e,style:k}),n&&m.jsx(lt,{text:n,style:v})]}),s]}),i&&m.jsx("div",{style:ge,children:i})]}):m.jsxs("div",{style:b,onClick:u?void 0:l,onMouseEnter:()=>S(!0),onMouseLeave:()=>S(!1),children:[o&&m.jsx("div",{style:pe,children:o}),c&&m.jsx(vt,{icon:c,style:{marginRight:N.tiny,backgroundColor:k.color,...d}}),e&&m.jsx(lt,{style:k,text:e,preset:"regular-bold"}),s,i&&m.jsx("div",{style:ge,children:i})]})}const Tt={display:"flex",flexDirection:"row",gap:E.md,backgroundColor:A.black_dark,alignItems:"center",justifyContent:"center",borderRadius:5},Un={auto:Object.assign({},Tt,{paddingTop:E.lg,paddingBottom:E.lg,paddingLeft:E.lg,paddingRight:E.lg,minHeight:50}),style1:Object.assign({},Tt,{height:"75px",paddingTop:E.sm,paddingBottom:E.sm,paddingLeft:E.lg,paddingRight:E.lg}),style2:Object.assign({},Tt,{paddingTop:E.sm,paddingBottom:E.sm,paddingLeft:E.lg,paddingRight:E.lg})};function rs(t){const{style:e,preset:n,...a}=t,r=Object.assign({},Un[n||"auto"],e);return m.jsx(Ye,{style:r,...a})}const he={backgroundColor:"#1C1919",display:"flex",flex:1,flexDirection:"column",justifyItems:"center",gap:E.lg,alignSelf:"stretch",overflowY:"auto",overflowX:"hidden"},Hn={large:Object.assign({},he,{alignItems:"stretch",padding:N.large,paddingTop:0}),middle:Object.assign({},he,{alignItems:"center",justifyContent:"center",width:285,alignSelf:"center"})};function ss(t){const{style:e,preset:n,justifyContent:a,...r}=t,s=Hn[n||"large"],i=Object.assign({},s,a?{justifyContent:"center"}:{},e);return m.jsx(Ye,{style:i,...r})}const be=()=>{};let ee={},Xe={},Ge=null,Be={mark:be,measure:be};try{typeof window<"u"&&(ee=window),typeof document<"u"&&(Xe=document),typeof MutationObserver<"u"&&(Ge=MutationObserver),typeof performance<"u"&&(Be=performance)}catch{}const{userAgent:ye=""}=ee.navigator||{},H=ee,y=Xe,ve=Ge,ht=Be;H.document;const $=!!y.documentElement&&!!y.head&&typeof y.addEventListener=="function"&&typeof y.createElement=="function",Ke=~ye.indexOf("MSIE")||~ye.indexOf("Trident/");var x="classic",qe="duotone",I="sharp",T="sharp-duotone",Yn=[x,qe,I,T],Vn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},xe={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Xn=["kit"],Gn=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,Bn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Kn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},qn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},Qn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},Jn={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},Zn={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},ta={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Qe={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},ea=["solid","regular","light","thin","duotone","brands"],Je=[1,2,3,4,5,6,7,8,9,10],na=Je.concat([11,12,13,14,15,16,17,18,19,20]),it={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},aa=[...Object.keys(Jn),...ea,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",it.GROUP,it.SWAP_OPACITY,it.PRIMARY,it.SECONDARY].concat(Je.map(t=>"".concat(t,"x"))).concat(na.map(t=>"w-".concat(t))),ra={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},sa={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},ia={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},ke={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const D="___FONT_AWESOME___",Rt=16,Ze="fa",tn="svg-inline--fa",q="data-fa-i2svg",Dt="data-fa-pseudo-element",oa="data-fa-pseudo-element-pending",ne="data-prefix",ae="data-icon",Oe="fontawesome-i2svg",la="async",ca=["HTML","HEAD","STYLE","SCRIPT"],en=(()=>{try{return!0}catch{return!1}})(),nn=[x,I,T];function gt(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[x]}})}const an={...Qe};an[x]={...Qe[x],...xe.kit,...xe["kit-duotone"]};const B=gt(an),zt={...ta};zt[x]={...zt[x],...ke.kit,...ke["kit-duotone"]};const ut=gt(zt),$t={...Zn};$t[x]={...$t[x],...ia.kit};const K=gt($t),Wt={...Qn};Wt[x]={...Wt[x],...sa.kit};const fa=gt(Wt),ua=Gn,rn="fa-layers-text",da=Bn,ma={...Vn};gt(ma);const ga=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Nt=it,nt=new Set;Object.keys(ut[x]).map(nt.add.bind(nt));Object.keys(ut[I]).map(nt.add.bind(nt));Object.keys(ut[T]).map(nt.add.bind(nt));const pa=[...Xn,...aa],ct=H.FontAwesomeConfig||{};function ha(t){var e=y.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function ba(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}y&&typeof y.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=ba(ha(n));r!=null&&(ct[a]=r)});const sn={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ze,replacementClass:tn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ct.familyPrefix&&(ct.cssPrefix=ct.familyPrefix);const at={...sn,...ct};at.autoReplaceSvg||(at.observeMutations=!1);const f={};Object.keys(sn).forEach(t=>{Object.defineProperty(f,t,{enumerable:!0,set:function(e){at[t]=e,ft.forEach(n=>n(f))},get:function(){return at[t]}})});Object.defineProperty(f,"familyPrefix",{enumerable:!0,set:function(t){at.cssPrefix=t,ft.forEach(e=>e(f))},get:function(){return at.cssPrefix}});H.FontAwesomeConfig=f;const ft=[];function ya(t){return ft.push(t),()=>{ft.splice(ft.indexOf(t),1)}}const W=Rt,L={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function va(t){if(!t||!$)return;const e=y.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=y.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const s=n[r],i=(s.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=s)}return y.head.insertBefore(e,a),t}const xa="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function dt(){let t=12,e="";for(;t-- >0;)e+=xa[Math.random()*62|0];return e}function rt(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function re(t){return t.classList?rt(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function on(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ka(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(on(t[n]),'" '),"").trim()}function At(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function se(t){return t.size!==L.size||t.x!==L.x||t.y!==L.y||t.rotate!==L.rotate||t.flipX||t.flipY}function Oa(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},s="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),o="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(s," ").concat(i," ").concat(o)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function Aa(t){let{transform:e,width:n=Rt,height:a=Rt,startCentered:r=!1}=t,s="";return r&&Ke?s+="translate(".concat(e.x/W-n/2,"em, ").concat(e.y/W-a/2,"em) "):r?s+="translate(calc(-50% + ".concat(e.x/W,"em), calc(-50% + ").concat(e.y/W,"em)) "):s+="translate(".concat(e.x/W,"em, ").concat(e.y/W,"em) "),s+="scale(".concat(e.size/W*(e.flipX?-1:1),", ").concat(e.size/W*(e.flipY?-1:1),") "),s+="rotate(".concat(e.rotate,"deg) "),s}var wa=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function ln(){const t=Ze,e=tn,n=f.cssPrefix,a=f.replacementClass;let r=wa;if(n!==t||a!==e){const s=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),o=new RegExp("\\.".concat(e),"g");r=r.replace(s,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(o,".".concat(a))}return r}let Ae=!1;function jt(){f.autoAddCss&&!Ae&&(va(ln()),Ae=!0)}var Sa={mixout(){return{dom:{css:ln,insertCss:jt}}},hooks(){return{beforeDOMElementCreation(){jt()},beforeI2svg(){jt()}}}};const z=H||{};z[D]||(z[D]={});z[D].styles||(z[D].styles={});z[D].hooks||(z[D].hooks={});z[D].shims||(z[D].shims=[]);var F=z[D];const cn=[],fn=function(){y.removeEventListener("DOMContentLoaded",fn),xt=1,cn.map(t=>t())};let xt=!1;$&&(xt=(y.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(y.readyState),xt||y.addEventListener("DOMContentLoaded",fn));function Pa(t){$&&(xt?setTimeout(t,0):cn.push(t))}function pt(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?on(t):"<".concat(e," ").concat(ka(n),">").concat(a.map(pt).join(""),"</").concat(e,">")}function we(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var _t=function(e,n,a,r){var s=Object.keys(e),i=s.length,o=n,l,c,u;for(a===void 0?(l=1,u=e[s[0]]):(l=0,u=a);l<i;l++)c=s[l],u=o(u,e[c],c,e);return u};function Ea(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const s=t.charCodeAt(n++);(s&64512)==56320?e.push(((r&1023)<<10)+(s&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Ut(t){const e=Ea(t);return e.length===1?e[0].toString(16):null}function Ca(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function Se(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function Ht(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=Se(e);typeof F.hooks.addPack=="function"&&!a?F.hooks.addPack(t,Se(e)):F.styles[t]={...F.styles[t]||{},...r},t==="fas"&&Ht("fa",e)}const{styles:G,shims:Ia}=F,Ta={[x]:Object.values(K[x]),[I]:Object.values(K[I]),[T]:Object.values(K[T])};let ie=null,un={},dn={},mn={},gn={},pn={};const Na={[x]:Object.keys(B[x]),[I]:Object.keys(B[I]),[T]:Object.keys(B[T])};function ja(t){return~pa.indexOf(t)}function _a(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!ja(r)?r:null}const hn=()=>{const t=a=>_t(G,(r,s,i)=>(r[i]=_t(s,a,{}),r),{});un=t((a,r,s)=>(r[3]&&(a[r[3]]=s),r[2]&&r[2].filter(o=>typeof o=="number").forEach(o=>{a[o.toString(16)]=s}),a)),dn=t((a,r,s)=>(a[s]=s,r[2]&&r[2].filter(o=>typeof o=="string").forEach(o=>{a[o]=s}),a)),pn=t((a,r,s)=>{const i=r[2];return a[s]=s,i.forEach(o=>{a[o]=s}),a});const e="far"in G||f.autoFetchSvg,n=_t(Ia,(a,r)=>{const s=r[0];let i=r[1];const o=r[2];return i==="far"&&!e&&(i="fas"),typeof s=="string"&&(a.names[s]={prefix:i,iconName:o}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:i,iconName:o}),a},{names:{},unicodes:{}});mn=n.names,gn=n.unicodes,ie=wt(f.styleDefault,{family:f.familyDefault})};ya(t=>{ie=wt(t.styleDefault,{family:f.familyDefault})});hn();function oe(t,e){return(un[t]||{})[e]}function La(t,e){return(dn[t]||{})[e]}function U(t,e){return(pn[t]||{})[e]}function bn(t){return mn[t]||{prefix:null,iconName:null}}function Fa(t){const e=gn[t],n=oe("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Y(){return ie}const le=()=>({prefix:null,iconName:null,rest:[]});function wt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=x}=e,a=B[n][t],r=ut[n][t]||ut[n][a],s=t in F.styles?t:null;return r||s||null}const Ma={[x]:Object.keys(K[x]),[I]:Object.keys(K[I]),[T]:Object.keys(K[T])};function St(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e,a={[x]:"".concat(f.cssPrefix,"-").concat(x),[I]:"".concat(f.cssPrefix,"-").concat(I),[T]:"".concat(f.cssPrefix,"-").concat(T)};let r=null,s=x;const i=Yn.filter(l=>l!==qe);i.forEach(l=>{(t.includes(a[l])||t.some(c=>Ma[l].includes(c)))&&(s=l)});const o=t.reduce((l,c)=>{const u=_a(f.cssPrefix,c);if(G[c]?(c=Ta[s].includes(c)?fa[s][c]:c,r=c,l.prefix=c):Na[s].indexOf(c)>-1?(r=c,l.prefix=wt(c,{family:s})):u?l.iconName=u:c!==f.replacementClass&&!i.some(p=>c===a[p])&&l.rest.push(c),!n&&l.prefix&&l.iconName){const p=r==="fa"?bn(l.iconName):{},d=U(l.prefix,l.iconName);p.prefix&&(r=null),l.iconName=p.iconName||d||l.iconName,l.prefix=p.prefix||l.prefix,l.prefix==="far"&&!G.far&&G.fas&&!f.autoFetchSvg&&(l.prefix="fas")}return l},le());return(t.includes("fa-brands")||t.includes("fab"))&&(o.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(o.prefix="fad"),!o.prefix&&s===I&&(G.fass||f.autoFetchSvg)&&(o.prefix="fass",o.iconName=U(o.prefix,o.iconName)||o.iconName),!o.prefix&&s===T&&(G.fasds||f.autoFetchSvg)&&(o.prefix="fasds",o.iconName=U(o.prefix,o.iconName)||o.iconName),(o.prefix==="fa"||r==="fa")&&(o.prefix=Y()||"fas"),o}class Ra{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(s=>{this.definitions[s]={...this.definitions[s]||{},...r[s]},Ht(s,r[s]);const i=K[x][s];i&&Ht(i,r[s]),hn()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:s,iconName:i,icon:o}=a[r],l=o[2];e[s]||(e[s]={}),l.length>0&&l.forEach(c=>{typeof c=="string"&&(e[s][c]=o)}),e[s][i]=o}),e}}let Pe=[],Z={};const et={},Da=Object.keys(et);function za(t,e){let{mixoutsTo:n}=e;return Pe=t,Z={},Object.keys(et).forEach(a=>{Da.indexOf(a)===-1&&delete et[a]}),Pe.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(s=>{typeof r[s]=="function"&&(n[s]=r[s]),typeof r[s]=="object"&&Object.keys(r[s]).forEach(i=>{n[s]||(n[s]={}),n[s][i]=r[s][i]})}),a.hooks){const s=a.hooks();Object.keys(s).forEach(i=>{Z[i]||(Z[i]=[]),Z[i].push(s[i])})}a.provides&&a.provides(et)}),n}function Yt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(Z[t]||[]).forEach(i=>{e=i.apply(null,[e,...a])}),e}function Q(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(Z[t]||[]).forEach(s=>{s.apply(null,n)})}function V(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return et[t]?et[t].apply(null,e):void 0}function Vt(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||Y();if(e)return e=U(n,e)||e,we(yn.definitions,n,e)||we(F.styles,n,e)}const yn=new Ra,$a=()=>{f.autoReplaceSvg=!1,f.observeMutations=!1,Q("noAuto")},Wa={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return $?(Q("beforeI2svg",t),V("pseudoElements2svg",t),V("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;f.autoReplaceSvg===!1&&(f.autoReplaceSvg=!0),f.observeMutations=!0,Pa(()=>{Ha({autoReplaceSvgRoot:e}),Q("watch",t)})}},Ua={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:U(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=wt(t[0]);return{prefix:n,iconName:U(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(f.cssPrefix,"-"))>-1||t.match(ua))){const e=St(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||Y(),iconName:U(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=Y();return{prefix:e,iconName:U(e,t)||t}}}},j={noAuto:$a,config:f,dom:Wa,parse:Ua,library:yn,findIconDefinition:Vt,toHtml:pt},Ha=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=y}=t;(Object.keys(F.styles).length>0||f.autoFetchSvg)&&$&&f.autoReplaceSvg&&j.dom.i2svg({node:e})};function Pt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>pt(n))}}),Object.defineProperty(t,"node",{get:function(){if(!$)return;const n=y.createElement("div");return n.innerHTML=t.html,n.children}}),t}function Ya(t){let{children:e,main:n,mask:a,attributes:r,styles:s,transform:i}=t;if(se(i)&&n.found&&!a.found){const{width:o,height:l}=n,c={x:o/l/2,y:.5};r.style=At({...s,"transform-origin":"".concat(c.x+i.x/16,"em ").concat(c.y+i.y/16,"em")})}return[{tag:"svg",attributes:r,children:e}]}function Va(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:s}=t;const i=s===!0?"".concat(e,"-").concat(f.cssPrefix,"-").concat(n):s;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:i},children:a}]}]}function ce(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:s,symbol:i,title:o,maskId:l,titleId:c,extra:u,watchable:p=!1}=t,{width:d,height:h}=n.found?n:e,w=a==="fak",S=[f.replacementClass,r?"".concat(f.cssPrefix,"-").concat(r):""].filter(P=>u.classes.indexOf(P)===-1).filter(P=>P!==""||!!P).concat(u.classes).join(" ");let b={children:[],attributes:{...u.attributes,"data-prefix":a,"data-icon":r,class:S,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(d," ").concat(h)}};const k=w&&!~u.classes.indexOf("fa-fw")?{width:"".concat(d/h*16*.0625,"em")}:{};p&&(b.attributes[q]=""),o&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(c||dt())},children:[o]}),delete b.attributes.title);const v={...b,prefix:a,iconName:r,main:e,mask:n,maskId:l,transform:s,symbol:i,styles:{...k,...u.styles}},{children:O,attributes:C}=n.found&&e.found?V("generateAbstractMask",v)||{children:[],attributes:{}}:V("generateAbstractIcon",v)||{children:[],attributes:{}};return v.children=O,v.attributes=C,i?Va(v):Ya(v)}function Ee(t){const{content:e,width:n,height:a,transform:r,title:s,extra:i,watchable:o=!1}=t,l={...i.attributes,...s?{title:s}:{},class:i.classes.join(" ")};o&&(l[q]="");const c={...i.styles};se(r)&&(c.transform=Aa({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const u=At(c);u.length>0&&(l.style=u);const p=[];return p.push({tag:"span",attributes:l,children:[e]}),s&&p.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),p}function Xa(t){const{content:e,title:n,extra:a}=t,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},s=At(a.styles);s.length>0&&(r.style=s);const i=[];return i.push({tag:"span",attributes:r,children:[e]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:Lt}=F;function Xt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(f.cssPrefix,"-").concat(Nt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(Nt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(Nt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const Ga={found:!1,width:512,height:512};function Ba(t,e){!en&&!f.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Gt(t,e){let n=e;return e==="fa"&&f.styleDefault!==null&&(e=Y()),new Promise((a,r)=>{if(n==="fa"){const s=bn(t)||{};t=s.iconName||t,e=s.prefix||e}if(t&&e&&Lt[e]&&Lt[e][t]){const s=Lt[e][t];return a(Xt(s))}Ba(t,e),a({...Ga,icon:f.showMissingIcons&&t?V("missingIconAbstract")||{}:{}})})}const Ce=()=>{},Bt=f.measurePerformance&&ht&&ht.mark&&ht.measure?ht:{mark:Ce,measure:Ce},ot='FA "6.6.0"',Ka=t=>(Bt.mark("".concat(ot," ").concat(t," begins")),()=>vn(t)),vn=t=>{Bt.mark("".concat(ot," ").concat(t," ends")),Bt.measure("".concat(ot," ").concat(t),"".concat(ot," ").concat(t," begins"),"".concat(ot," ").concat(t," ends"))};var fe={begin:Ka,end:vn};const bt=()=>{};function Ie(t){return typeof(t.getAttribute?t.getAttribute(q):null)=="string"}function qa(t){const e=t.getAttribute?t.getAttribute(ne):null,n=t.getAttribute?t.getAttribute(ae):null;return e&&n}function Qa(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(f.replacementClass)}function Ja(){return f.autoReplaceSvg===!0?yt.replace:yt[f.autoReplaceSvg]||yt.replace}function Za(t){return y.createElementNS("http://www.w3.org/2000/svg",t)}function tr(t){return y.createElement(t)}function xn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?Za:tr}=e;if(typeof t=="string")return y.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(s){a.setAttribute(s,t.attributes[s])}),(t.children||[]).forEach(function(s){a.appendChild(xn(s,{ceFn:n}))}),a}function er(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const yt={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(xn(n),e)}),e.getAttribute(q)===null&&f.keepOriginalSource){let n=y.createComment(er(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~re(e).indexOf(f.replacementClass))return yt.replace(t);const a=new RegExp("".concat(f.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const s=n[0].attributes.class.split(" ").reduce((i,o)=>(o===f.replacementClass||o.match(a)?i.toSvg.push(o):i.toNode.push(o),i),{toNode:[],toSvg:[]});n[0].attributes.class=s.toSvg.join(" "),s.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",s.toNode.join(" "))}const r=n.map(s=>pt(s)).join(`
`);e.setAttribute(q,""),e.innerHTML=r}};function Te(t){t()}function kn(t,e){const n=typeof e=="function"?e:bt;if(t.length===0)n();else{let a=Te;f.mutateApproach===la&&(a=H.requestAnimationFrame||Te),a(()=>{const r=Ja(),s=fe.begin("mutate");t.map(r),s(),n()})}}let ue=!1;function On(){ue=!0}function Kt(){ue=!1}let kt=null;function Ne(t){if(!ve||!f.observeMutations)return;const{treeCallback:e=bt,nodeCallback:n=bt,pseudoElementsCallback:a=bt,observeMutationsRoot:r=y}=t;kt=new ve(s=>{if(ue)return;const i=Y();rt(s).forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0&&!Ie(o.addedNodes[0])&&(f.searchPseudoElements&&a(o.target),e(o.target)),o.type==="attributes"&&o.target.parentNode&&f.searchPseudoElements&&a(o.target.parentNode),o.type==="attributes"&&Ie(o.target)&&~ga.indexOf(o.attributeName))if(o.attributeName==="class"&&qa(o.target)){const{prefix:l,iconName:c}=St(re(o.target));o.target.setAttribute(ne,l||i),c&&o.target.setAttribute(ae,c)}else Qa(o.target)&&n(o.target)})}),$&&kt.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function nr(){kt&&kt.disconnect()}function ar(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const s=r.split(":"),i=s[0],o=s.slice(1);return i&&o.length>0&&(a[i]=o.join(":").trim()),a},{})),n}function rr(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=St(re(t));return r.prefix||(r.prefix=Y()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=La(r.prefix,t.innerText)||oe(r.prefix,Ut(t.innerText))),!r.iconName&&f.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function sr(t){const e=rt(t.attributes).reduce((r,s)=>(r.name!=="class"&&r.name!=="style"&&(r[s.name]=s.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return f.autoA11y&&(n?e["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(a||dt()):(e["aria-hidden"]="true",e.focusable="false")),e}function ir(){return{iconName:null,title:null,titleId:null,prefix:null,transform:L,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function je(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=rr(t),s=sr(t),i=Yt("parseNodeAttributes",{},t);let o=e.styleParser?ar(t):[];return{iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:L,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:o,attributes:s},...i}}const{styles:or}=F;function An(t){const e=f.autoReplaceSvg==="nest"?je(t,{styleParser:!1}):je(t);return~e.extra.classes.indexOf(rn)?V("generateLayersText",t,e):V("generateSvgReplacementMutation",t,e)}let M=new Set;nn.map(t=>{M.add("fa-".concat(t))});Object.keys(B[x]).map(M.add.bind(M));Object.keys(B[I]).map(M.add.bind(M));Object.keys(B[T]).map(M.add.bind(M));M=[...M];function _e(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!$)return Promise.resolve();const n=y.documentElement.classList,a=u=>n.add("".concat(Oe,"-").concat(u)),r=u=>n.remove("".concat(Oe,"-").concat(u)),s=f.autoFetchSvg?M:nn.map(u=>"fa-".concat(u)).concat(Object.keys(or));s.includes("fa")||s.push("fa");const i=[".".concat(rn,":not([").concat(q,"])")].concat(s.map(u=>".".concat(u,":not([").concat(q,"])"))).join(", ");if(i.length===0)return Promise.resolve();let o=[];try{o=rt(t.querySelectorAll(i))}catch{}if(o.length>0)a("pending"),r("complete");else return Promise.resolve();const l=fe.begin("onTree"),c=o.reduce((u,p)=>{try{const d=An(p);d&&u.push(d)}catch(d){en||d.name==="MissingIcon"&&console.error(d)}return u},[]);return new Promise((u,p)=>{Promise.all(c).then(d=>{kn(d,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),u()})}).catch(d=>{l(),p(d)})})}function lr(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;An(t).then(n=>{n&&kn([n],e)})}function cr(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:Vt(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Vt(r||{})),t(a,{...n,mask:r})}}const fr=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=L,symbol:a=!1,mask:r=null,maskId:s=null,title:i=null,titleId:o=null,classes:l=[],attributes:c={},styles:u={}}=e;if(!t)return;const{prefix:p,iconName:d,icon:h}=t;return Pt({type:"icon",...t},()=>(Q("beforeDOMElementCreation",{iconDefinition:t,params:e}),f.autoA11y&&(i?c["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(o||dt()):(c["aria-hidden"]="true",c.focusable="false")),ce({icons:{main:Xt(h),mask:r?Xt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:p,iconName:d,transform:{...L,...n},symbol:a,title:i,maskId:s,titleId:o,extra:{attributes:c,styles:u,classes:l}})))};var ur={mixout(){return{icon:cr(fr)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=_e,t.nodeCallback=lr,t}}},provides(t){t.i2svg=function(e){const{node:n=y,callback:a=()=>{}}=e;return _e(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:s,prefix:i,transform:o,symbol:l,mask:c,maskId:u,extra:p}=n;return new Promise((d,h)=>{Promise.all([Gt(a,i),c.iconName?Gt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(w=>{let[S,b]=w;d([e,ce({icons:{main:S,mask:b},prefix:i,iconName:a,transform:o,symbol:l,maskId:u,title:r,titleId:s,extra:p,watchable:!0})])}).catch(h)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:s,styles:i}=e;const o=At(i);o.length>0&&(a.style=o);let l;return se(s)&&(l=V("generateAbstractTransformGrouping",{main:r,transform:s,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},dr={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return Pt({type:"layer"},()=>{Q("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(s=>{a=a.concat(s.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(f.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},mr={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:s={}}=e;return Pt({type:"counter",content:t},()=>(Q("beforeDOMElementCreation",{content:t,params:e}),Xa({content:t.toString(),title:n,extra:{attributes:r,styles:s,classes:["".concat(f.cssPrefix,"-layers-counter"),...a]}})))}}}},gr={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=L,title:a=null,classes:r=[],attributes:s={},styles:i={}}=e;return Pt({type:"text",content:t},()=>(Q("beforeDOMElementCreation",{content:t,params:e}),Ee({content:t,transform:{...L,...n},title:a,extra:{attributes:s,styles:i,classes:["".concat(f.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:s}=n;let i=null,o=null;if(Ke){const l=parseInt(getComputedStyle(e).fontSize,10),c=e.getBoundingClientRect();i=c.width/l,o=c.height/l}return f.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([e,Ee({content:e.innerHTML,width:i,height:o,transform:r,title:a,extra:s,watchable:!0})])}}};const pr=new RegExp('"',"ug"),Le=[1105920,1112319],Fe={FontAwesome:{normal:"fas",400:"fas"},...qn,...Kn,...ra},qt=Object.keys(Fe).reduce((t,e)=>(t[e.toLowerCase()]=Fe[e],t),{}),hr=Object.keys(qt).reduce((t,e)=>{const n=qt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function br(t){const e=t.replace(pr,""),n=Ca(e,0),a=n>=Le[0]&&n<=Le[1],r=e.length===2?e[0]===e[1]:!1;return{value:Ut(r?e[0]:e),isSecondary:a||r}}function yr(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(qt[n]||{})[r]||hr[n]}function Me(t,e){const n="".concat(oa).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const i=rt(t.children).filter(d=>d.getAttribute(Dt)===e)[0],o=H.getComputedStyle(t,e),l=o.getPropertyValue("font-family"),c=l.match(da),u=o.getPropertyValue("font-weight"),p=o.getPropertyValue("content");if(i&&!c)return t.removeChild(i),a();if(c&&p!=="none"&&p!==""){const d=o.getPropertyValue("content");let h=yr(l,u);const{value:w,isSecondary:S}=br(d),b=c[0].startsWith("FontAwesome");let k=oe(h,w),v=k;if(b){const O=Fa(w);O.iconName&&O.prefix&&(k=O.iconName,h=O.prefix)}if(k&&!S&&(!i||i.getAttribute(ne)!==h||i.getAttribute(ae)!==v)){t.setAttribute(n,v),i&&t.removeChild(i);const O=ir(),{extra:C}=O;C.attributes[Dt]=e,Gt(k,h).then(P=>{const de=ce({...O,icons:{main:P,mask:le()},prefix:h,iconName:v,extra:C,watchable:!0}),It=y.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(It,t.firstChild):t.appendChild(It),It.outerHTML=de.map(jn=>pt(jn)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function vr(t){return Promise.all([Me(t,"::before"),Me(t,"::after")])}function xr(t){return t.parentNode!==document.head&&!~ca.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Dt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Re(t){if($)return new Promise((e,n)=>{const a=rt(t.querySelectorAll("*")).filter(xr).map(vr),r=fe.begin("searchPseudoElements");On(),Promise.all(a).then(()=>{r(),Kt(),e()}).catch(()=>{r(),Kt(),n()})})}var kr={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=Re,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=y}=e;f.searchPseudoElements&&Re(n)}}};let De=!1;var Or={mixout(){return{dom:{unwatch(){On(),De=!0}}}},hooks(){return{bootstrap(){Ne(Yt("mutationObserverCallbacks",{}))},noAuto(){nr()},watch(t){const{observeMutationsRoot:e}=t;De?Kt():Ne(Yt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const ze=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),s=r[0];let i=r.slice(1).join("-");if(s&&i==="h")return n.flipX=!0,n;if(s&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(s){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},e)};var Ar={mixout(){return{parse:{transform:t=>ze(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=ze(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:s}=e;const i={transform:"translate(".concat(r/2," 256)")},o="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(o," ").concat(l," ").concat(c)},p={transform:"translate(".concat(s/2*-1," -256)")},d={outer:i,inner:u,path:p};return{tag:"g",attributes:{...d.outer},children:[{tag:"g",attributes:{...d.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...d.path}}]}]}}}};const Ft={x:0,y:0,width:"100%",height:"100%"};function $e(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function wr(t){return t.tag==="g"?t.children:[t]}var Sr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?St(n.split(" ").map(r=>r.trim())):le();return a.prefix||(a.prefix=Y()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:s,maskId:i,transform:o}=e;const{width:l,icon:c}=r,{width:u,icon:p}=s,d=Oa({transform:o,containerWidth:u,iconWidth:l}),h={tag:"rect",attributes:{...Ft,fill:"white"}},w=c.children?{children:c.children.map($e)}:{},S={tag:"g",attributes:{...d.inner},children:[$e({tag:c.tag,attributes:{...c.attributes,...d.path},...w})]},b={tag:"g",attributes:{...d.outer},children:[S]},k="mask-".concat(i||dt()),v="clip-".concat(i||dt()),O={tag:"mask",attributes:{...Ft,id:k,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[h,b]},C={tag:"defs",children:[{tag:"clipPath",attributes:{id:v},children:wr(p)},O]};return n.push(C,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(v,")"),mask:"url(#".concat(k,")"),...Ft}}),{children:n,attributes:a}}}},Pr={provides(t){let e=!1;H.matchMedia&&(e=H.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const s={...r,attributeName:"opacity"},i={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return e||i.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...s,values:"1;0;1;1;0;1;"}}),n.push(i),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:e?[]:[{tag:"animate",attributes:{...s,values:"1;0;0;0;0;1;"}}]}),e||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...s,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Er={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},Cr=[Sa,ur,dr,mr,gr,kr,Or,Ar,Sr,Pr,Er];za(Cr,{mixoutsTo:j});j.noAuto;j.config;j.library;j.dom;const Qt=j.parse;j.findIconDefinition;j.toHtml;const Ir=j.icon;j.layer;j.text;j.counter;var wn={exports:{}},Tr="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Nr=Tr,jr=Nr;function Sn(){}function Pn(){}Pn.resetWarningCache=Sn;var _r=function(){function t(a,r,s,i,o,l){if(l!==jr){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}t.isRequired=t;function e(){return t}var n={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:Pn,resetWarningCache:Sn};return n.PropTypes=n,n};wn.exports=_r();var Lr=wn.exports;const g=Fn(Lr);function We(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?We(Object(n),!0).forEach(function(a){tt(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):We(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Ot(t){"@babel/helpers - typeof";return Ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ot(t)}function tt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Fr(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,s;for(s=0;s<a.length;s++)r=a[s],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function Mr(t,e){if(t==null)return{};var n=Fr(t,e),a,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)a=s[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Jt(t){return Rr(t)||Dr(t)||zr(t)||$r()}function Rr(t){if(Array.isArray(t))return Zt(t)}function Dr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function zr(t,e){if(t){if(typeof t=="string")return Zt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Zt(t,e)}}function Zt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function $r(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Wr(t){var e,n=t.beat,a=t.fade,r=t.beatFade,s=t.bounce,i=t.shake,o=t.flash,l=t.spin,c=t.spinPulse,u=t.spinReverse,p=t.pulse,d=t.fixedWidth,h=t.inverse,w=t.border,S=t.listItem,b=t.flip,k=t.size,v=t.rotation,O=t.pull,C=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":s,"fa-shake":i,"fa-flash":o,"fa-spin":l,"fa-spin-reverse":u,"fa-spin-pulse":c,"fa-pulse":p,"fa-fw":d,"fa-inverse":h,"fa-border":w,"fa-li":S,"fa-flip":b===!0,"fa-flip-horizontal":b==="horizontal"||b==="both","fa-flip-vertical":b==="vertical"||b==="both"},tt(e,"fa-".concat(k),typeof k<"u"&&k!==null),tt(e,"fa-rotate-".concat(v),typeof v<"u"&&v!==null&&v!==0),tt(e,"fa-pull-".concat(O),typeof O<"u"&&O!==null),tt(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(C).map(function(P){return C[P]?P:null}).filter(function(P){return P})}function Ur(t){return t=t-0,t===t}function En(t){return Ur(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var Hr=["style"];function Yr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Vr(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=En(n.slice(0,a)),s=n.slice(a+1).trim();return r.startsWith("webkit")?e[Yr(r)]=s:e[r]=s,e},{})}function Cn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(l){return Cn(t,l)}),r=Object.keys(e.attributes||{}).reduce(function(l,c){var u=e.attributes[c];switch(c){case"class":l.attrs.className=u,delete e.attributes.class;break;case"style":l.attrs.style=Vr(u);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?l.attrs[c.toLowerCase()]=u:l.attrs[En(c)]=u}return l},{attrs:{}}),s=n.style,i=s===void 0?{}:s,o=Mr(n,Hr);return r.attrs.style=_(_({},r.attrs.style),i),t.apply(void 0,[e.tag,_(_({},r.attrs),o)].concat(Jt(a)))}var In=!1;try{In=!0}catch{}function Xr(){if(!In&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function Ue(t){if(t&&Ot(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Qt.icon)return Qt.icon(t);if(t===null)return null;if(t&&Ot(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function Mt(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?tt({},t,e):{}}var He={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},Tn=Ve.forwardRef(function(t,e){var n=_(_({},He),t),a=n.icon,r=n.mask,s=n.symbol,i=n.className,o=n.title,l=n.titleId,c=n.maskId,u=Ue(a),p=Mt("classes",[].concat(Jt(Wr(n)),Jt((i||"").split(" ")))),d=Mt("transform",typeof n.transform=="string"?Qt.transform(n.transform):n.transform),h=Mt("mask",Ue(r)),w=Ir(u,_(_(_(_({},p),d),h),{},{symbol:s,title:o,titleId:l,maskId:c}));if(!w)return Xr("Could not find icon",u),null;var S=w.abstract,b={ref:e};return Object.keys(n).forEach(function(k){He.hasOwnProperty(k)||(b[k]=n[k])}),Gr(S[0],b)});Tn.displayName="FontAwesomeIcon";Tn.propTypes={beat:g.bool,border:g.bool,beatFade:g.bool,bounce:g.bool,className:g.string,fade:g.bool,flash:g.bool,mask:g.oneOfType([g.object,g.array,g.string]),maskId:g.string,fixedWidth:g.bool,inverse:g.bool,flip:g.oneOf([!0,!1,"horizontal","vertical","both"]),icon:g.oneOfType([g.object,g.array,g.string]),listItem:g.bool,pull:g.oneOf(["right","left"]),pulse:g.bool,rotation:g.oneOf([0,90,180,270]),shake:g.bool,size:g.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:g.bool,spinPulse:g.bool,spinReverse:g.bool,symbol:g.oneOfType([g.bool,g.string]),title:g.string,titleId:g.string,transform:g.oneOfType([g.string,g.object]),swapOpacity:g.bool};var Gr=Cn.bind(null,Ve.createElement),mt=(t=>(t[t.P2PKH=0]="P2PKH",t[t.P2SH=1]="P2SH",t))(mt||{}),te=(t=>(t[t.MAINNET=0]="MAINNET",t[t.TESTNET=1]="TESTNET",t))(te||{}),Nn=(t=>(t[t.UNIELON=0]="UNIELON",t))(Nn||{});const Br=/Chrome\//i.test(navigator.userAgent);if(Br){const t=navigator.userAgent.match(/Chrome\/(\d+[^.\s])/);t&&t.length>=2&&Number(t[1])}const is=[{value:mt.P2PKH,label:"P2PKH",name:"Legacy (P2PKH)",hdPath:"m/44'/3'/0'/0",displayIndex:0,isUnielonLegacy:!1},{value:mt.P2SH,label:"P2SH",name:"Pay-to-Script-Hash (P2SH)",hdPath:"m/44'/3'/0'/0",displayIndex:1,isUnielonLegacy:!0}],os=[{value:Nn.UNIELON,name:"Unielon",addressTypes:[mt.P2PKH,mt.P2SH]}];te.MAINNET,te.TESTNET;const Kr=".sats",qr=".unielon",Et={display:"flex",flexDirection:"row",alignItems:"center",backgroundColor:"#2a2626",paddingLeft:15.2,paddingRight:15.2,paddingTop:11,paddingBottom:11,borderRadius:5,minHeight:"36.5px",alignSelf:"stretch"},Ct=Object.assign({},Mn.regular,{display:"flex",flex:1,borderWidth:0,outlineWidth:0,backgroundColor:"rgba(0,0,0,0)",alignSelf:"stretch"}),Qr={messagePrefix:`Dogecoin Signed Message:
`,bech32:"D",bip32:{public:49990397,private:49988504},pubKeyHash:30,scriptHash:22,wif:158};function Jr(t){const{placeholder:e,style:n,...a}=t,[r,s]=R.useState("password");return m.jsxs("div",{style:Et,children:[m.jsx("input",{placeholder:e||"Password",type:r,style:Object.assign({},Ct,n),...a}),r==="password"&&m.jsx(vt,{icon:"eye-slash",style:{marginLeft:N.tiny},onClick:()=>s("text"),color:"textDim"}),r==="text"&&m.jsx(vt,{icon:"eye",style:{marginLeft:N.tiny},onClick:()=>s("password")})]})}function Zr(t){const{placeholder:e,disabled:n,style:a,...r}=t,s=Object.assign({},Ct,a,n?{color:A.textDim}:{});return m.jsx("div",{style:Et,children:m.jsx("input",{placeholder:e||"Amount",type:"number",style:s,disabled:n,...r})})}const ts=t=>{const{placeholder:e,onAddressInputChange:n,addressInputData:a,style:r,...s}=t;if(!a||!n)return m.jsx("div",{});const[i,o]=R.useState(a.address),[l,c]=R.useState(a.domain?a.address:""),[u,p]=R.useState(""),[d,h]=R.useState(""),[w,S]=R.useState(a.domain||a.address),[b]=R.useState();R.useEffect(()=>{n({address:i,domain:l?w:"",inscription:b})},[i]);const k=v=>{const O=v.target.value;S(O),u&&p(""),l&&c(""),d&&h(""),i&&o("");const C=O.toLowerCase();if(C.endsWith(Kr)||C.endsWith(qr))console.log(C,"teststr===");else try{if(!require("bitcoinjs-lib").address.toOutputScript(O,Qr)){h("Recipient address is invalid");return}o(O)}catch(P){h("Recipient address is invalid"),console.log(P)}};return m.jsxs("div",{style:{alignSelf:"stretch"},children:[m.jsx("div",{style:Object.assign({},Et,{flexDirection:"column",minHeight:"50px"}),children:m.jsx("input",{placeholder:"Address, name.elon",type:"text",style:Object.assign({},Ct,r),onChange:async v=>{k(v)},defaultValue:w,...s})}),u&&m.jsx(lt,{text:u,preset:"regular",color:"error"}),m.jsx(lt,{text:d,preset:"regular",color:"error"})]})};function es(t){const{placeholder:e,containerStyle:n,style:a,disabled:r,autoFocus:s,...i}=t;return m.jsx("div",{style:Object.assign({},Et,n),children:m.jsx("input",{placeholder:e,type:"text",disabled:r,autoFocus:s,style:Object.assign({},Ct,a,r?{color:A.textDim}:{}),...i})})}function ls(t){const{preset:e}=t;return e==="password"?m.jsx(Jr,{...t}):e==="amount"?m.jsx(Zr,{...t}):e==="address"?m.jsx(ts,{...t}):m.jsx(es,{...t})}function cs(t){const{children:e}=t;return m.jsx("div",{className:"layout",style:{display:"flex",flexDirection:"column",width:"100vw",height:"100vh",overflowY:"auto",overflowX:"hidden"},children:e})}export{mt as A,as as B,ss as C,Tn as F,ls as I,cs as L,Nn as R,vt as a,rs as b,os as c,is as d};
