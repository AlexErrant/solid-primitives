(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerpolicy&&(l.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?l.credentials="include":o.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();const m={};function se(e){m.context=e}const ie=(e,t)=>e===t,C={equals:ie};let K=X;const p=1,L=2,V={owned:null,cleanups:null,context:null,owner:null};var a=null;let w=null,u=null,h=null,g=null,U=0;function D(e,t){const n=u,s=a,o=e.length===0,l=o?V:{owned:null,cleanups:null,context:null,owner:t||s},r=o?e:()=>e(()=>A(()=>_(l)));a=l,u=null;try{return S(r,!0)}finally{u=n,a=s}}function H(e,t){t=t?Object.assign({},C,t):C;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=o=>(typeof o=="function"&&(o=o(n.value)),J(n,o));return[G.bind(n),s]}function N(e,t,n){const s=P(e,t,!1,p);v(s)}function oe(e,t,n){K=ue;const s=P(e,t,!1,p);s.user=!0,g?g.push(s):v(s)}function O(e,t,n){n=n?Object.assign({},C,n):C;const s=P(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,v(s),G.bind(s)}function le(e){return S(e,!1)}function A(e){let t,n=u;return u=null,t=e(),u=n,t}function Q(e){return a===null||(a.cleanups===null?a.cleanups=[e]:a.cleanups.push(e)),e}function W(){return a}function re(e){const t=O(e),n=O(()=>$(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}function G(){const e=w;if(this.sources&&(this.state||e))if(this.state===p||e)v(this);else{const t=h;h=null,S(()=>M(this),!1),h=t}if(u){const t=this.observers?this.observers.length:0;u.sources?(u.sources.push(this),u.sourceSlots.push(t)):(u.sources=[this],u.sourceSlots=[t]),this.observers?(this.observers.push(u),this.observerSlots.push(u.sources.length-1)):(this.observers=[u],this.observerSlots=[u.sources.length-1])}return this.value}function J(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&S(()=>{for(let o=0;o<e.observers.length;o+=1){const l=e.observers[o],r=w&&w.running;r&&w.disposed.has(l),(r&&!l.tState||!r&&!l.state)&&(l.pure?h.push(l):g.push(l),l.observers&&Y(l)),r||(l.state=p)}if(h.length>1e6)throw h=[],new Error},!1)),t}function v(e){if(!e.fn)return;_(e);const t=a,n=u,s=U;u=a=e,fe(e,e.value,s),u=n,a=t}function fe(e,t,n){let s;try{s=e.fn(t)}catch(o){e.pure&&(e.state=p),Z(o)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?J(e,s):e.value=s,e.updatedAt=n)}function P(e,t,n,s=p,o){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:a,context:null,pure:n};return a===null||a!==V&&(a.owned?a.owned.push(l):a.owned=[l]),l}function T(e){const t=w;if(e.state===0||t)return;if(e.state===L||t)return M(e);if(e.suspense&&A(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<U);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===p||t)v(e);else if(e.state===L||t){const o=h;h=null,S(()=>M(e,n[0]),!1),h=o}}function S(e,t){if(h)return e();let n=!1;t||(h=[]),g?n=!0:g=[],U++;try{const s=e();return ce(n),s}catch(s){h||(g=null),Z(s)}}function ce(e){if(h&&(X(h),h=null),e)return;const t=g;g=null,t.length&&S(()=>K(t),!1)}function X(e){for(let t=0;t<e.length;t++)T(e[t])}function ue(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:T(s)}for(m.context&&se(),t=0;t<n;t++)T(e[t])}function M(e,t){const n=w;e.state=0;for(let s=0;s<e.sources.length;s+=1){const o=e.sources[s];o.sources&&(o.state===p||n?o!==t&&T(o):(o.state===L||n)&&M(o,t))}}function Y(e){const t=w;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=L,s.pure?h.push(s):g.push(s),s.observers&&Y(s))}}function _(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),o=n.observers;if(o&&o.length){const l=o.pop(),r=n.observerSlots.pop();s<o.length&&(l.sourceSlots[r]=s,o[s]=l,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)_(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function ae(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Z(e){throw e=ae(e),e}function $(e){if(typeof e=="function"&&!e.length)return $(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=$(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function b(e,t){return A(()=>e(t||{}))}function he(e){let t=!1,n=!1;const s=re(()=>e.children),o=O(()=>{let l=s();Array.isArray(l)||(l=[l]);for(let r=0;r<l.length;r++){const i=l[r].when;if(i)return n=!!l[r].keyed,[r,i,l[r]]}return[-1]},void 0,{equals:(l,r)=>l[0]===r[0]&&(t?l[1]===r[1]:!l[1]==!r[1])&&l[2]===r[2]});return O(()=>{const[l,r,i]=o();if(l<0)return e.fallback;const f=i.children,c=typeof f=="function"&&f.length>0;return t=n||c,c?A(()=>f(r)):f})}function E(e){return e}function de(e,t,n){let s=n.length,o=t.length,l=s,r=0,i=0,f=t[o-1].nextSibling,c=null;for(;r<o||i<l;){if(t[r]===n[i]){r++,i++;continue}for(;t[o-1]===n[l-1];)o--,l--;if(o===r){const d=l<s?i?n[i-1].nextSibling:n[l-i]:f;for(;i<l;)e.insertBefore(n[i++],d)}else if(l===i)for(;r<o;)(!c||!c.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[l-1]&&n[i]===t[o-1]){const d=t[--o].nextSibling;e.insertBefore(n[i++],t[r++].nextSibling),e.insertBefore(n[--l],d),t[o]=n[l]}else{if(!c){c=new Map;let y=i;for(;y<l;)c.set(n[y],y++)}const d=c.get(t[r]);if(d!=null)if(i<d&&d<l){let y=r,B=1,k;for(;++y<o&&y<l&&!((k=c.get(t[y]))==null||k!==d+B);)B++;if(B>d-i){const ne=t[r];for(;i<d;)e.insertBefore(n[i++],ne)}else e.replaceChild(n[i++],t[r++])}else r++;else t[r++].remove()}}}function ge(e,t,n,s={}){let o;return D(l=>{o=l,t===document?e():z(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{o(),t.textContent=""}}function pe(e,t,n){const s=document.createElement("template");s.innerHTML=e;let o=s.content.firstChild;return n&&(o=o.firstChild),o}function ye(e,t,n={}){const s=Object.keys(t||{}),o=Object.keys(n);let l,r;for(l=0,r=o.length;l<r;l++){const i=o[l];!i||i==="undefined"||t[i]||(R(e,i,!1),delete n[i])}for(l=0,r=s.length;l<r;l++){const i=s[l],f=!!t[i];!i||i==="undefined"||n[i]===f||!f||(R(e,i,!0),n[i]=f)}return n}function z(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return j(e,t,s,n);N(o=>j(e,t(),o,n),s)}function R(e,t,n){const s=t.trim().split(/\s+/);for(let o=0,l=s.length;o<l;o++)e.classList.toggle(s[o],n)}function j(e,t,n,s,o){for(m.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(m.context)return n;if(l==="number"&&(t=t.toString()),r){let i=n[0];i&&i.nodeType===3?i.data=t:i=document.createTextNode(t),n=x(e,n,s,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(m.context)return n;n=x(e,n,s)}else{if(l==="function")return N(()=>{let i=t();for(;typeof i=="function";)i=i();n=j(e,i,n,s)}),()=>n;if(Array.isArray(t)){const i=[],f=n&&Array.isArray(n);if(q(i,t,n,o))return N(()=>n=j(e,i,n,s,!0)),()=>n;if(m.context){if(!i.length)return n;for(let c=0;c<i.length;c++)if(i[c].parentNode)return n=i}if(i.length===0){if(n=x(e,n,s),r)return n}else f?n.length===0?F(e,i,s):de(e,n,i):(n&&x(e),F(e,i));n=i}else if(t instanceof Node){if(m.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=x(e,n,s,t);x(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function q(e,t,n,s){let o=!1;for(let l=0,r=t.length;l<r;l++){let i=t[l],f=n&&n[l];if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))o=q(e,i,f)||o;else if(typeof i=="function")if(s){for(;typeof i=="function";)i=i();o=q(e,Array.isArray(i)?i:[i],Array.isArray(f)?f:[f])||o}else e.push(i),o=!0;else{const c=String(i);f&&f.nodeType===3&&f.data===c?e.push(f):e.push(document.createTextNode(c))}}return o}function F(e,t,n=null){for(let s=0,o=t.length;s<o;s++)e.insertBefore(t[s],n)}function x(e,t,n,s){if(n===void 0)return e.textContent="";const o=s||document.createTextNode("");if(t.length){let l=!1;for(let r=t.length-1;r>=0;r--){const i=t[r];if(o!==i){const f=i.parentNode===e;!l&&!r?f?e.replaceChild(o,i):e.insertBefore(o,n):f&&i.remove()}else l=!0}}else e.insertBefore(o,n);return[o]}function me(e){return e!==null&&(typeof e=="object"||typeof e=="function")}function I(e,...t){return typeof e=="function"?e(...t):e}var ee=Object.entries,we=Object.keys,xe=e=>W()?Q(e):e;function be(e){const t={...e},n={},s=new Map,o=i=>{const f=s.get(i);if(f)return f[0]();const c=H(t[i],{name:typeof i=="string"?i:void 0});return s.set(i,c),delete t[i],c[0]()},l=(i,f)=>{const c=s.get(i);if(c)return c[1](f);i in t&&(t[i]=I(f,[t[i]]))};for(const i of we(e))n[i]=void 0,Object.defineProperty(n,i,{get:o.bind(void 0,i)});return[n,(i,f)=>(me(i)?A(()=>{le(()=>{for(const[c,d]of ee(I(i,n)))l(c,()=>d)})}):l(i,f),n)]}var Se=(e,t)=>Object.entries(e).forEach(([n,s])=>t(n,s));function te(e,t,n,s){return e.addEventListener(t,n,s),xe(e.removeEventListener.bind(e,t,n,s))}const Ae=e=>{const t={};return ee(e).forEach(([n])=>t[n]=!1),t};function ve(e){let t=0,n,s;return()=>(s||D(o=>{n=e(o),s=o}),t++,W()&&Q(()=>{t--,queueMicrotask(()=>{t||!s||(s(),s=void 0,n=void 0)})}),n)}const Ee=(e,t=!1,n=!0)=>{const s=window.matchMedia(e);if(!n)return()=>s.matches;const[o,l]=H(s.matches);return te(s,"change",()=>l(s.matches)),o};function Ce(e,t={}){if(!window.matchMedia)return t.fallbackState??Ae(e);const{mediaFeature:n="min-width",watchChange:s=!0}=t,[o,l]=be((()=>{const r={};return Se(e,(i,f)=>{const c=window.matchMedia(`(${n}: ${f})`);r[i]=c.matches,s&&te(c,"change",d=>l(i,d.matches))}),r})());return o}Ee.bind(null,"(prefers-color-scheme: dark)",!1,!0);const Le=pe("<div><p></p><p>Other content</p></div>"),Ne={sm:"640px",lg:"1024px",xl:"1280px"},Oe=()=>{const e=Ce(Ne);return oe(()=>{console.log("sm",e.sm),console.log("lg",e.lg),console.log("xl",e.xl)}),(()=>{const t=Le.cloneNode(!0),n=t.firstChild;return z(n,b(he,{get children(){return[b(E,{get when(){return e.xl},children:"Extra Large"}),b(E,{get when(){return e.lg},children:"Large"}),b(E,{get when(){return e.sm},children:"Small"}),b(E,{get when(){return!e.sm},children:"Smallest"})]}})),N(s=>{const o={"text-tiny flex flex-column":!0,"text-small":e.sm,"text-base flex-row":e.lg,"text-huge":e.xl},l=e.lg?"50px":"10px";return s._v$=ye(t,o,s._v$),l!==s._v$2&&t.style.setProperty("gap",s._v$2=l),s},{_v$:void 0,_v$2:void 0}),t})()};ge(()=>b(Oe,{}),document.getElementById("root"));
