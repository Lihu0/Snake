import{r as h,f as y,R as L,a as O,h as P,p as k,i as x,j as D,k as m,l as V}from"./runtime.D2cl73cO.js";import{i as b,g as w,j as M,k as d,r as S,h as H,l as N,m as B}from"./disclose-version.DRDAhnZQ.js";const Q=1,W=2,X=4,Z=8,q=64,z=1,F=2,G=4,J=8,ee=["beforeinput","click","dblclick","contextmenu","focusin","focusout","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"],E=["touchstart","touchmove","touchend"],te={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},ne="http://www.w3.org/2000/svg",I=new Set,p=new Set;function re(t,e){h(()=>U(t,e()))}function U(t,e){const r=t.__nodeValue,o=j(e);H&&t.nodeValue===o?t.__nodeValue=o:r!==o&&(t.nodeValue=o,t.__nodeValue=o)}function oe(t,e,r,o){N(t),e===void 0?o!==null&&o(t):e(t,r)}function j(t){return typeof t=="string"?t:t==null?"":t+""}function Y(t,e){b();const r=w();return e.target.appendChild(r),y(()=>A(t,{...e,anchor:r}),!1)}function ae(t,e){var f,l;b();const r=e.target,o=r.firstChild,a=M(o,!0),n=B;d(a);let c=null;a===null&&(c=w(),r.appendChild(c));let u=!1;try{return y(()=>{const s=A(t,{...e,anchor:c});return d(null),u=!0,s},!1)}catch(s){if(!u&&e.recover!==!1&&a!==null)return console.error("ERR_SVELTE_HYDRATION_MISMATCH",s),S(a),o.remove(),(l=(f=a[a.length-1])==null?void 0:f.nextSibling)==null||l.remove(),d(null),Y(t,e);throw s}finally{d(n)}}function A(t,e){const r=new Set,o=e.target,a={d:null,e:null,i:e.intro||!1,p:null,r:null,t:L};let n;const c=h(()=>{e.context&&(O({}),P.c=e.context),e.props||(e.props={}),e.events&&(e.props.$$events=e.events),n=t(e.anchor,e.props)||{},e.context&&k()},a,!0);a.e=c;const u=g.bind(null,o),f=g.bind(null,document),l=s=>{for(let _=0;_<s.length;_++){const i=s[_];r.has(i)||(r.add(i),o.addEventListener(i,u,E.includes(i)?{passive:!0}:void 0),document.addEventListener(i,f,E.includes(i)?{passive:!0}:void 0))}};return l(x(I)),p.add(l),C.set(n,()=>{for(const _ of r)o.removeEventListener(_,u);p.delete(l);const s=a.d;s!==null&&S(s),D(a.e)}),n}let C=new WeakMap;function se(t){const e=C.get(t);e==null||e()}function ue(t,e,r,o,a){var n={capture:o,passive:a};function c(u){if(g(e,u),!u.cancelBubble)return r.call(this,u)}e.addEventListener(t,c,n),(e===document.body||e===window||e===document)&&h(()=>()=>{e.removeEventListener(t,c,n)})}function ce(t){for(var e=0;e<t.length;e++)I.add(t[e]);for(var r of p)r(t)}function g(t,e){var v;var r=t.ownerDocument,o=e.type,a=((v=e.composedPath)==null?void 0:v.call(e))||[],n=a[0]||e.target;e.target!==n&&m(e,"target",{configurable:!0,value:n});var c=0,u=e.__root;if(u){var f=a.indexOf(u);if(f!==-1&&(t===document||t===window)){e.__root=t;return}var l=a.indexOf(t);if(l===-1)return;f<=l&&(c=f+1)}for(n=a[c]||e.target,m(e,"currentTarget",{configurable:!0,get(){return n||r}});n!==null;){var s=n.parentNode||n.host||null,_="__"+o,i=n[_];if(i!==void 0&&!n.disabled)if(V(i)){var[R,...T]=i;R.apply(n,[e,...T])}else i.call(n,e);if(e.cancelBubble||s===t||n===t)break;n=s}e.__root=t,n=t}export{te as A,ee as D,X as E,J as P,G as a,z as b,F as c,ce as d,re as e,Q as f,Z as g,ae as h,W as i,q as j,oe as k,ue as l,Y as m,ne as n,j as s,U as t,se as u};