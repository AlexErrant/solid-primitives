import{o as I,e as M,i as E,b as S,S as T,p as U,t as g}from"./index-85cb5273.js";import{b as O,t as D,d as R,e as F,f as V}from"./index-505316fb.js";function G(e,t,s,n){return e.addEventListener(t,s,n),D(e.removeEventListener.bind(e,t,s,n))}function $(e,t){const{push:s,execute:n}=O();return[(r,u,l)=>{const c=G(e,r,u,l??t);return s(c),c},I(n)]}let X=L;const b=1,m=2,Y={owned:null,cleanups:null,context:null,owner:null};var a=null;let v=null,f=null,i=null,p=null,x=0;function Q(e,t){const s=f,n=a,r=e.length===0,u=r?Y:{owned:null,cleanups:null,context:null,owner:t===void 0?n:t},l=r?e:()=>e(()=>k(()=>y(u)));a=u,f=null;try{return w(l,!0)}finally{f=s,a=n}}function k(e){if(f===null)return e();const t=f;f=null;try{return e()}finally{f=t}}function W(e){return a===null||(a.cleanups===null?a.cleanups=[e]:a.cleanups.push(e)),e}function j(){return a}function q(e,t,s){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&w(()=>{for(let r=0;r<e.observers.length;r+=1){const u=e.observers[r],l=v&&v.running;l&&v.disposed.has(u),(l&&!u.tState||!l&&!u.state)&&(u.pure?i.push(u):p.push(u),u.observers&&P(u)),l||(u.state=b)}if(i.length>1e6)throw i=[],new Error},!1)),t}function z(e){if(!e.fn)return;y(e);const t=a,s=f,n=x;f=a=e,B(e,e.value,n),f=s,a=t}function B(e,t,s){let n;try{n=e.fn(t)}catch(r){e.pure&&(e.state=b,e.owned&&e.owned.forEach(y),e.owned=null),A(r)}(!e.updatedAt||e.updatedAt<=s)&&(e.updatedAt!=null&&"observers"in e?q(e,n):e.value=n,e.updatedAt=s)}function C(e){const t=v;if(e.state===0||t)return;if(e.state===m||t)return d(e);if(e.suspense&&k(e.suspense.inFallback))return e.suspense.effects.push(e);const s=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<x);)(e.state||t)&&s.push(e);for(let n=s.length-1;n>=0;n--)if(e=s[n],e.state===b||t)z(e);else if(e.state===m||t){const r=i;i=null,w(()=>d(e,s[0]),!1),i=r}}function w(e,t){if(i)return e();let s=!1;t||(i=[]),p?s=!0:p=[],x++;try{const n=e();return H(s),n}catch(n){s||(p=null),i=null,A(n)}}function H(e){if(i&&(L(i),i=null),e)return;const t=p;p=null,t.length&&w(()=>X(t),!1)}function L(e){for(let t=0;t<e.length;t++)C(e[t])}function d(e,t){const s=v;e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];r.sources&&(r.state===b||s?r!==t&&C(r):(r.state===m||s)&&d(r,t))}}function P(e){const t=v;for(let s=0;s<e.observers.length;s+=1){const n=e.observers[s];(!n.state||t)&&(n.state=m,n.pure?i.push(n):p.push(n),n.observers&&P(n))}}function y(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),n=e.sourceSlots.pop(),r=s.observers;if(r&&r.length){const u=r.pop(),l=s.observerSlots.pop();n<r.length&&(u.sourceSlots[l]=n,r[n]=u,s.observerSlots[n]=l)}}if(e.owned){for(t=0;t<e.owned.length;t++)y(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function J(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function A(e){throw e=J(e),e}function K(e){let t=0,s,n;return()=>(n||Q(r=>{s=e(r),n=r}),t++,j()&&W(()=>{t--,queueMicrotask(()=>{t||!n||(n(),n=void 0,s=void 0)})}),s)}var N={passive:!0},Z={x:0,y:0,isInside:!1,sourceType:null};function ee(e=window,t,s={}){const{touch:n=!0,followTouch:r=!0}=s,[u,l]=$(e,N),c=o=>t({x:o.pageX,y:o.pageY,sourceType:"mouse"});if(u("mousemove",c),u("dragover",c),n){const o=h=>{h.touches.length&&t({x:h.touches[0].clientX,y:h.touches[0].clientY,sourceType:"touch"})};u("touchstart",o),r&&u("touchmove",o)}return l}function te(e=window,t,s={}){const{touch:n=!0}=s,[r,u]=$(e,N);let l=!1,c=!n;function o(h){this==="mouse"?l=h:c=h,t(l||c)}return r("mouseover",o.bind("mouse",!0)),r("mouseout",o.bind("mouse",!1)),r("mousemove",o.bind("mouse",!0),{passive:!0,once:!0}),n&&(r("touchstart",o.bind("touch",!0)),r("touchend",o.bind("touch",!1))),u}function _(e,t={}){const[s,n]=R({...Z,...t.initialValue}),r=u=>{ee(u,n,t),te(u,n.bind(void 0,"isInside"),t)};return typeof e!="function"?r(e):M(()=>r(e())),s}_.bind(void 0,void 0,void 0);const ne=g('<div><div class="ball bg-green-500"></div><p class="font-bold text-green-500 opacity-50">normal</p><p class="font-bold text-yellow-600 opacity-50">debounced</p><p class="font-bold text-cyan-500 opacity-50">throttled</p></div>'),se=g('<div class="ball bg-yellow-600"></div>'),re=g('<div class="ball bg-cyan-500"></div>'),oe=()=>{const e=_(),t=F([()=>e.x,()=>e.y],([n,r])=>({x:n,y:r}),200),s=V(()=>({x:e.x,y:e.y}),200);return(()=>{const n=ne.cloneNode(!0),r=n.firstChild,u=r.nextSibling;return E(n,S(T,{get when(){return t()},keyed:!0,children:({x:l,y:c})=>(()=>{const o=se.cloneNode(!0);return o.style.setProperty("transform",`translate(${l}px, ${c}px)`),o})()}),u),E(n,S(T,{get when(){return s()},keyed:!0,children:({x:l,y:c})=>(()=>{const o=re.cloneNode(!0);return o.style.setProperty("transform",`translate(${l}px, ${c}px)`),o})()}),u),U(()=>r.style.setProperty("transform",`translate(${e.x}px, ${e.y}px)`)),n})()};export{oe as default};
