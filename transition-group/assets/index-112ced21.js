(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const R={};function ue(e){R.context=e}const At=(e,t)=>e===t,he=Symbol("solid-proxy"),tt=Symbol("solid-track"),ge={equals:At};let nt=at;const V=1,z=2,rt={owned:null,cleanups:null,context:null,owner:null},Pe={};var v=null;let d=null,_=null,F=null,q=null,we=0;const[vt,Ve]=N(!1);function te(e,t){const n=_,r=v,s=e.length===0,i=s?rt:{owned:null,cleanups:null,context:null,owner:t===void 0?r:t},o=s?e:()=>e(()=>M(()=>X(i)));v=i,_=null;try{return H(o,!0)}finally{_=n,v=r}}function N(e,t){t=t?Object.assign({},ge,t):ge;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(d&&d.running&&d.sources.has(n)?s=s(n.tValue):s=s(n.value)),ut(n,s));return[ct.bind(n),r]}function Le(e,t,n){const r=Se(e,t,!0,V);ie(r)}function K(e,t,n){const r=Se(e,t,!1,V);ie(r)}function Ct(e,t,n){nt=Ot;const r=Se(e,t,!1,V),s=Q&&xe(v,Q.id);s&&(r.suspense=s),r.user=!0,q?q.push(r):ie(r)}function k(e,t,n){n=n?Object.assign({},ge,n):ge;const r=Se(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,ie(r),ct.bind(r)}function st(e,t,n){let r,s,i;arguments.length===2&&typeof t=="object"||arguments.length===1?(r=!0,s=e,i=t||{}):(r=e,s=t,i=n||{});let o=null,l=Pe,a=null,u=!1,c=!1,h="initialValue"in i,f=typeof r=="function"&&k(r);const w=new Set,[g,p]=(i.storage||N)(i.initialValue),[C,A]=N(void 0),[x,P]=N(void 0,{equals:!1}),[y,S]=N(h?"ready":"unresolved");if(R.context){a=`${R.context.id}${R.context.count++}`;let m;i.ssrLoadFrom==="initial"?l=i.initialValue:R.load&&(m=R.load(a))&&(l=m[0])}function O(m,b,$,D){return o===m&&(o=null,h=!0,(m===l||b===l)&&i.onHydrated&&queueMicrotask(()=>i.onHydrated(D,{value:b})),l=Pe,d&&m&&u?(d.promises.delete(m),u=!1,H(()=>{d.running=!0,j(b,$)},!1)):j(b,$)),b}function j(m,b){H(()=>{b===void 0&&p(()=>m),S(b!==void 0?"errored":"ready"),A(b);for(const $ of w.keys())$.decrement();w.clear()},!1)}function E(){const m=Q&&xe(v,Q.id),b=g(),$=C();if($!==void 0&&!o)throw $;return _&&!_.user&&m&&Le(()=>{x(),o&&(m.resolved&&d&&u?d.promises.add(o):w.has(m)||(m.increment(),w.add(m)))}),b}function T(m=!0){if(m!==!1&&c)return;c=!1;const b=f?f():r;if(u=d&&d.running,b==null||b===!1){O(o,M(g));return}d&&o&&d.promises.delete(o);const $=l!==Pe?l:M(()=>s(b,{value:g(),refetching:m}));return typeof $!="object"||!($&&"then"in $)?(O(o,$,void 0,b),$):(o=$,c=!0,queueMicrotask(()=>c=!1),H(()=>{S(h?"refreshing":"pending"),P()},!1),$.then(D=>O($,D,void 0,b),D=>O($,void 0,ht(D),b)))}return Object.defineProperties(E,{state:{get:()=>y()},error:{get:()=>C()},loading:{get(){const m=y();return m==="pending"||m==="refreshing"}},latest:{get(){if(!h)return E();const m=C();if(m&&!o)throw m;return g()}}}),f?Le(()=>T(!1)):T(!1),[E,{refetch:T,mutate:p}]}function He(e){return H(e,!1)}function M(e){if(_===null)return e();const t=_;_=null;try{return e()}finally{_=t}}function it(e,t,n){const r=Array.isArray(e);let s,i=n&&n.defer;return o=>{let l;if(r){l=Array(e.length);for(let u=0;u<e.length;u++)l[u]=e[u]()}else l=e();if(i){i=!1;return}const a=M(()=>t(l,s,o));return s=l,a}}function Pt(e){Ct(()=>M(e))}function se(e){return v===null||(v.cleanups===null?v.cleanups=[e]:v.cleanups.push(e)),e}function ot(){return v}function Et(e,t){const n=v,r=_;v=e,_=null;try{return H(t,!0)}catch(s){Fe(s)}finally{v=n,_=r}}function lt(e){if(d&&d.running)return e(),d.done;const t=_,n=v;return Promise.resolve().then(()=>{_=t,v=n;let r;return Q&&(r=d||(d={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0}),r.done||(r.done=new Promise(s=>r.resolve=s)),r.running=!0),H(e,!1),_=v=null,r?r.done:void 0})}function qe(){return[vt,lt]}function _t(e){q.push.apply(q,e),e.length=0}function be(e,t){const n=Symbol("context");return{id:n,Provider:Tt(n),defaultValue:e}}function $e(e){let t;return(t=xe(v,e.id))!==void 0?t:e.defaultValue}function Be(e){const t=k(e),n=k(()=>ke(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let Q;function Lt(){return Q||(Q=be({}))}function ct(){const e=d&&d.running;if(this.sources&&(!e&&this.state||e&&this.tState))if(!e&&this.state===V||e&&this.tState===V)ie(this);else{const t=F;F=null,H(()=>me(this),!1),F=t}if(_){const t=this.observers?this.observers.length:0;_.sources?(_.sources.push(this),_.sourceSlots.push(t)):(_.sources=[this],_.sourceSlots=[t]),this.observers?(this.observers.push(_),this.observerSlots.push(_.sources.length-1)):(this.observers=[_],this.observerSlots=[_.sources.length-1])}return e&&d.sources.has(this)?this.tValue:this.value}function ut(e,t,n){let r=d&&d.running&&d.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(d){const s=d.running;(s||!n&&d.sources.has(e))&&(d.sources.add(e),e.tValue=t),s||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&H(()=>{for(let s=0;s<e.observers.length;s+=1){const i=e.observers[s],o=d&&d.running;o&&d.disposed.has(i)||((o&&!i.tState||!o&&!i.state)&&(i.pure?F.push(i):q.push(i),i.observers&&ft(i)),o?i.tState=V:i.state=V)}if(F.length>1e6)throw F=[],new Error},!1)}return t}function ie(e){if(!e.fn)return;X(e);const t=v,n=_,r=we;_=v=e,Ue(e,d&&d.running&&d.sources.has(e)?e.tValue:e.value,r),d&&!d.running&&d.sources.has(e)&&queueMicrotask(()=>{H(()=>{d&&(d.running=!0),_=v=e,Ue(e,e.tValue,r),_=v=null},!1)}),_=n,v=t}function Ue(e,t,n){let r;try{r=e.fn(t)}catch(s){return e.pure&&(d&&d.running?(e.tState=V,e.tOwned&&e.tOwned.forEach(X),e.tOwned=void 0):(e.state=V,e.owned&&e.owned.forEach(X),e.owned=null)),e.updatedAt=n+1,Fe(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ut(e,r,!0):d&&d.running&&e.pure?(d.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function Se(e,t,n,r=V,s){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:v,context:null,pure:n};return d&&d.running&&(i.state=0,i.tState=r),v===null||v!==rt&&(d&&d.running&&v.pure?v.tOwned?v.tOwned.push(i):v.tOwned=[i]:v.owned?v.owned.push(i):v.owned=[i]),i}function pe(e){const t=d&&d.running;if(!t&&e.state===0||t&&e.tState===0)return;if(!t&&e.state===z||t&&e.tState===z)return me(e);if(e.suspense&&M(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<we);){if(t&&d.disposed.has(e))return;(!t&&e.state||t&&e.tState)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let s=e,i=n[r+1];for(;(s=s.owner)&&s!==i;)if(d.disposed.has(s))return}if(!t&&e.state===V||t&&e.tState===V)ie(e);else if(!t&&e.state===z||t&&e.tState===z){const s=F;F=null,H(()=>me(e,n[0]),!1),F=s}}}function H(e,t){if(F)return e();let n=!1;t||(F=[]),q?n=!0:q=[],we++;try{const r=e();return kt(n),r}catch(r){n||(q=null),F=null,Fe(r)}}function kt(e){if(F&&(at(F),F=null),e)return;let t;if(d){if(!d.promises.size&&!d.queue.size){const r=d.sources,s=d.disposed;q.push.apply(q,d.effects),t=d.resolve;for(const i of q)"tState"in i&&(i.state=i.tState),delete i.tState;d=null,H(()=>{for(const i of s)X(i);for(const i of r){if(i.value=i.tValue,i.owned)for(let o=0,l=i.owned.length;o<l;o++)X(i.owned[o]);i.tOwned&&(i.owned=i.tOwned),delete i.tValue,delete i.tOwned,i.tState=0}Ve(!1)},!1)}else if(d.running){d.running=!1,d.effects.push.apply(d.effects,q),q=null,Ve(!0);return}}const n=q;q=null,n.length&&H(()=>nt(n),!1),t&&t()}function at(e){for(let t=0;t<e.length;t++)pe(e[t])}function Ot(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:pe(r)}for(R.context&&ue(),t=0;t<n;t++)pe(e[t])}function me(e,t){const n=d&&d.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){const s=e.sources[r];s.sources&&(!n&&s.state===V||n&&s.tState===V?s!==t&&(!s.updatedAt||s.updatedAt<we)&&pe(s):(!n&&s.state===z||n&&s.tState===z)&&me(s,t))}}function ft(e){const t=d&&d.running;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!t&&!r.state||t&&!r.tState)&&(t?r.tState=z:r.state=z,r.pure?F.push(r):q.push(r),r.observers&&ft(r))}}function X(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const i=s.pop(),o=n.observerSlots.pop();r<s.length&&(i.sourceSlots[o]=r,s[r]=i,n.observerSlots[r]=o)}}if(d&&d.running&&e.pure){if(e.tOwned){for(t=0;t<e.tOwned.length;t++)X(e.tOwned[t]);delete e.tOwned}dt(e,!0)}else if(e.owned){for(t=0;t<e.owned.length;t++)X(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}d&&d.running?e.tState=0:e.state=0,e.context=null}function dt(e,t){if(t||(e.tState=0,d.disposed.add(e)),e.owned)for(let n=0;n<e.owned.length;n++)dt(e.owned[n])}function ht(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Fe(e){throw e=ht(e),e}function xe(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:xe(e.owner,t):void 0}function ke(e){if(typeof e=="function"&&!e.length)return ke(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=ke(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Tt(e,t){return function(r){let s;return K(()=>s=M(()=>(v.context={[e]:r.value},Be(()=>r.children))),void 0),s}}const Rt=Symbol("fallback");function Ke(e){for(let t=0;t<e.length;t++)e[t]()}function Nt(e,t,n={}){let r=[],s=[],i=[],o=0,l=t.length>1?[]:null;return se(()=>Ke(i)),()=>{let a=e()||[],u,c;return a[tt],M(()=>{let f=a.length,w,g,p,C,A,x,P,y,S;if(f===0)o!==0&&(Ke(i),i=[],r=[],s=[],o=0,l&&(l=[])),n.fallback&&(r=[Rt],s[0]=te(O=>(i[0]=O,n.fallback())),o=1);else if(o===0){for(s=new Array(f),c=0;c<f;c++)r[c]=a[c],s[c]=te(h);o=f}else{for(p=new Array(f),C=new Array(f),l&&(A=new Array(f)),x=0,P=Math.min(o,f);x<P&&r[x]===a[x];x++);for(P=o-1,y=f-1;P>=x&&y>=x&&r[P]===a[y];P--,y--)p[y]=s[P],C[y]=i[P],l&&(A[y]=l[P]);for(w=new Map,g=new Array(y+1),c=y;c>=x;c--)S=a[c],u=w.get(S),g[c]=u===void 0?-1:u,w.set(S,c);for(u=x;u<=P;u++)S=r[u],c=w.get(S),c!==void 0&&c!==-1?(p[c]=s[u],C[c]=i[u],l&&(A[c]=l[u]),c=g[c],w.set(S,c)):i[u]();for(c=x;c<f;c++)c in p?(s[c]=p[c],i[c]=C[c],l&&(l[c]=A[c],l[c](c))):s[c]=te(h);s=s.slice(0,o=f),r=a.slice(0)}return s});function h(f){if(i[c]=f,l){const[w,g]=N(c);return l[c]=g,t(a[c],w)}return t(a[c])}}}function L(e,t){return M(()=>e(t||{}))}function fe(){return!0}const Oe={get(e,t,n){return t===he?n:e.get(t)},has(e,t){return t===he?!0:e.has(t)},set:fe,deleteProperty:fe,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:fe,deleteProperty:fe}},ownKeys(e){return e.keys()}};function Ee(e){return(e=typeof e=="function"?e():e)?e:{}}function Te(...e){let t=!1;for(let r=0;r<e.length;r++){const s=e[r];t=t||!!s&&he in s,e[r]=typeof s=="function"?(t=!0,k(s)):s}if(t)return new Proxy({get(r){for(let s=e.length-1;s>=0;s--){const i=Ee(e[s])[r];if(i!==void 0)return i}},has(r){for(let s=e.length-1;s>=0;s--)if(r in Ee(e[s]))return!0;return!1},keys(){const r=[];for(let s=0;s<e.length;s++)r.push(...Object.keys(Ee(e[s])));return[...new Set(r)]}},Oe);const n={};for(let r=e.length-1;r>=0;r--)if(e[r]){const s=Object.getOwnPropertyDescriptors(e[r]);for(const i in s)i in n||Object.defineProperty(n,i,{enumerable:!0,get(){for(let o=e.length-1;o>=0;o--){const l=(e[o]||{})[i];if(l!==void 0)return l}}})}return n}function Mt(e,...t){const n=new Set(t.flat());if(he in e){const s=t.map(i=>new Proxy({get(o){return i.includes(o)?e[o]:void 0},has(o){return i.includes(o)&&o in e},keys(){return i.filter(o=>o in e)}},Oe));return s.push(new Proxy({get(i){return n.has(i)?void 0:e[i]},has(i){return n.has(i)?!1:i in e},keys(){return Object.keys(e).filter(i=>!n.has(i))}},Oe)),s}const r=Object.getOwnPropertyDescriptors(e);return t.push(Object.keys(r).filter(s=>!n.has(s))),t.map(s=>{const i={};for(let o=0;o<s.length;o++){const l=s[o];l in e&&Object.defineProperty(i,l,r[l]?r[l]:{get(){return e[l]},set(){return!0},enumerable:!0})}return i})}function It(e){const t="fallback"in e&&{fallback:()=>e.fallback};return k(Nt(()=>e.each,e.children,t||void 0))}function ne(e){let t=!1;const n=e.keyed,r=k(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return k(()=>{const s=r();if(s){const i=e.children,o=typeof i=="function"&&i.length>0;return t=n||o,o?M(()=>i(s)):i}return e.fallback},void 0,void 0)}const jt=be();function gt(e){let t=0,n,r,s,i,o;const[l,a]=N(!1),u=Lt(),c={increment:()=>{++t===1&&a(!0)},decrement:()=>{--t===0&&a(!1)},inFallback:l,effects:[],resolved:!1},h=ot();if(R.context&&R.load){const g=R.context.id+R.context.count;let p=R.load(g);if(p&&(s=p[0])&&s!=="$$f"){(typeof s!="object"||!("then"in s))&&(s=Promise.resolve(s));const[C,A]=N(void 0,{equals:!1});i=C,s.then(x=>{if(x||R.done)return x&&(o=x),A();R.gather(g),ue(r),A(),ue()})}}const f=$e(jt);f&&(n=f.register(c.inFallback));let w;return se(()=>w&&w()),L(u.Provider,{value:c,get children(){return k(()=>{if(o)throw o;if(r=R.context,i)return i(),i=void 0;r&&s==="$$f"&&ue();const g=k(()=>e.children);return k(p=>{const C=c.inFallback(),{showContent:A=!0,showFallback:x=!0}=n?n():{};if((!C||s&&s!=="$$f")&&A)return c.resolved=!0,w&&w(),w=r=s=void 0,_t(c.effects),g();if(x)return w?p:te(P=>(w=P,r&&(ue({id:r.id+"f",count:0}),r=void 0),e.fallback),h)})})}})}const qt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Bt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...qt]),Ft=new Set(["innerHTML","textContent","innerText","children"]),Dt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),We=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),Vt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Ht={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Ut(e,t,n){let r=n.length,s=t.length,i=r,o=0,l=0,a=t[s-1].nextSibling,u=null;for(;o<s||l<i;){if(t[o]===n[l]){o++,l++;continue}for(;t[s-1]===n[i-1];)s--,i--;if(s===o){const c=i<r?l?n[l-1].nextSibling:n[i-l]:a;for(;l<i;)e.insertBefore(n[l++],c)}else if(i===l)for(;o<s;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[i-1]&&n[l]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--i],c),t[s]=n[i]}else{if(!u){u=new Map;let h=l;for(;h<i;)u.set(n[h],h++)}const c=u.get(t[o]);if(c!=null)if(l<c&&c<i){let h=o,f=1,w;for(;++h<s&&h<i&&!((w=u.get(t[h]))==null||w!==c+f);)f++;if(f>c-l){const g=t[o];for(;l<c;)e.insertBefore(n[l++],g)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const ze="_$DX_DELEGATE";function Kt(e,t,n,r={}){let s;return te(i=>{s=i,t===document?e():B(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function I(e,t,n){const r=document.createElement("template");if(r.innerHTML=e,t&&r.innerHTML.split("<").length-1!==t)throw`The browser resolved template HTML does not match JSX input:
${r.innerHTML}

${e}. Is your HTML properly formed?`;let s=r.content.firstChild;return n&&(s=s.firstChild),s}function Ae(e,t=window.document){const n=t[ze]||(t[ze]=new Set);for(let r=0,s=e.length;r<s;r++){const i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,en))}}function pt(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Wt(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function zt(e,t){t==null?e.removeAttribute("class"):e.className=t}function Xt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=i=>s.call(e,n[1],i))}else e.addEventListener(t,n)}function Yt(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let i,o;for(i=0,o=s.length;i<o;i++){const l=s[i];!l||l==="undefined"||t[l]||(Xe(e,l,!1),delete n[l])}for(i=0,o=r.length;i<o;i++){const l=r[i],a=!!t[l];!l||l==="undefined"||n[l]===a||!a||(Xe(e,l,!0),n[l]=a)}return n}function Jt(e,t,n){if(!t)return n?pt(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,i;for(i in n)t[i]==null&&r.removeProperty(i),delete n[i];for(i in t)s=t[i],s!==n[i]&&(r.setProperty(i,s),n[i]=s);return n}function Gt(e,t={},n,r){const s={};return r||K(()=>s.children=re(e,t.children,s.children)),K(()=>t.ref&&t.ref(e)),K(()=>Qt(e,t,n,!0,s,!0)),s}function J(e,t,n){return M(()=>e(t,n))}function B(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return re(e,t,r,n);K(s=>re(e,t(),s,n),r)}function Qt(e,t,n,r,s={},i=!1){t||(t={});for(const o in s)if(!(o in t)){if(o==="children")continue;s[o]=Ye(e,o,null,s[o],n,i)}for(const o in t){if(o==="children"){r||re(e,t.children);continue}const l=t[o];s[o]=Ye(e,o,l,s[o],n,i)}}function Zt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Xe(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,i=r.length;s<i;s++)e.classList.toggle(r[s],n)}function Ye(e,t,n,r,s,i){let o,l,a;if(t==="style")return Jt(e,n,r);if(t==="classList")return Yt(e,n,r);if(n===r)return r;if(t==="ref")i||n(e);else if(t.slice(0,3)==="on:"){const u=t.slice(3);r&&e.removeEventListener(u,r),n&&e.addEventListener(u,n)}else if(t.slice(0,10)==="oncapture:"){const u=t.slice(10);r&&e.removeEventListener(u,r,!0),n&&e.addEventListener(u,n,!0)}else if(t.slice(0,2)==="on"){const u=t.slice(2).toLowerCase(),c=Vt.has(u);if(!c&&r){const h=Array.isArray(r)?r[0]:r;e.removeEventListener(u,h)}(c||n)&&(Xt(e,u,n,c),c&&Ae([u]))}else if((a=Ft.has(t))||!s&&(We[t]||(l=Bt.has(t)))||(o=e.nodeName.includes("-")))t==="class"||t==="className"?zt(e,n):o&&!l&&!a?e[Zt(t)]=n:e[We[t]||t]=n;else{const u=s&&t.indexOf(":")>-1&&Ht[t.split(":")[0]];u?Wt(e,u,t,n):pt(e,Dt[t]||t,n)}return n}function en(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),R.registry&&!R.done&&(R.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>{for(;r&&r.nodeType!==8&&r.nodeValue!=="pl-"+e;){let s=r.nextSibling;r.remove(),r=s}r&&r.remove()}));n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function re(e,t,n,r,s){for(R.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(R.context)return n;if(i==="number"&&(t=t.toString()),o){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=Z(e,n,r,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(R.context)return n;n=Z(e,n,r)}else{if(i==="function")return K(()=>{let l=t();for(;typeof l=="function";)l=l();n=re(e,l,n,r)}),()=>n;if(Array.isArray(t)){const l=[],a=n&&Array.isArray(n);if(Re(l,t,n,s))return K(()=>n=re(e,l,n,r,!0)),()=>n;if(R.context){if(!l.length)return n;for(let u=0;u<l.length;u++)if(l[u].parentNode)return n=l}if(l.length===0){if(n=Z(e,n,r),o)return n}else a?n.length===0?Je(e,l,r):Ut(e,n,l):(n&&Z(e),Je(e,l));n=l}else if(t instanceof Node){if(R.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=Z(e,n,r,t);Z(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function Re(e,t,n,r){let s=!1;for(let i=0,o=t.length;i<o;i++){let l=t[i],a=n&&n[i];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))s=Re(e,l,a)||s;else if(typeof l=="function")if(r){for(;typeof l=="function";)l=l();s=Re(e,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||s}else e.push(l),s=!0;else{const u=String(l);u==="<!>"?a&&a.nodeType===8&&e.push(a):a&&a.nodeType===3?(a.data=u,e.push(a)):e.push(document.createTextNode(u))}}return s}function Je(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function Z(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let i=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(s!==l){const a=l.parentNode===e;!i&&!o?a?e.replaceChild(s,l):e.insertBefore(s,n):a&&l.remove()}else i=!0}}else e.insertBefore(s,n);return[s]}const tn=!1;function nn(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function rn([e,t],n,r){return[n?()=>n(e()):e,r?s=>t(r(s)):t]}function sn(e){try{return document.querySelector(e)}catch{return null}}function on(e,t){const n=sn(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}function ln(e,t,n,r){let s=!1;const i=l=>typeof l=="string"?{value:l}:l,o=rn(N(i(e()),{equals:(l,a)=>l.value===a.value}),void 0,l=>(!s&&t(l),l));return n&&se(n((l=e())=>{s=!0,o[1](i(l)),s=!1})),{signal:o,utils:r}}function cn(e){if(e){if(Array.isArray(e))return{signal:e}}else return{signal:N({value:""})};return e}function un(){return ln(()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state}),({value:e,replace:t,scroll:n,state:r})=>{t?window.history.replaceState(r,"",e):window.history.pushState(r,"",e),on(window.location.hash.slice(1),n)},e=>nn(window,"popstate",()=>e()),{go:e=>window.history.go(e)})}function an(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,i){if(n)return!(n=!1);const o={to:s,options:i,defaultPrevented:!1,preventDefault:()=>o.defaultPrevented=!0};for(const l of e)l.listener({...o,from:l.location,retry:a=>{a&&(n=!0),l.navigate(s,i)}});return!o.defaultPrevented}return{subscribe:t,confirm:r}}const fn=/^(?:[a-z0-9]+:)?\/\//i,dn=/^\/+|(\/)\/+$/g;function G(e,t=!1){const n=e.replace(dn,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function de(e,t,n){if(fn.test(t))return;const r=G(e),s=n&&G(n);let i="";return!s||t.startsWith("/")?i=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?i=r+s:i=s,(i||"/")+G(t,!i)}function hn(e,t){if(e==null)throw new Error(t);return e}function mt(e,t){return G(e).replace(/\/*(\*.*)?$/g,"")+G(t)}function gn(e){const t={};return e.searchParams.forEach((n,r)=>{t[r]=n}),t}function pn(e,t,n){const[r,s]=e.split("/*",2),i=r.split("/").filter(Boolean),o=i.length;return l=>{const a=l.split("/").filter(Boolean),u=a.length-o;if(u<0||u>0&&s===void 0&&!t)return null;const c={path:o?"":"/",params:{}},h=f=>n===void 0?void 0:n[f];for(let f=0;f<o;f++){const w=i[f],g=a[f],p=w[0]===":",C=p?w.slice(1):w;if(p&&_e(g,h(C)))c.params[C]=g;else if(p||!_e(g,w))return null;c.path+=`/${g}`}if(s){const f=u?a.slice(-u).join("/"):"";if(_e(f,h(s)))c.params[s]=f;else return null}return c}}function _e(e,t){const n=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function mn(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,i)=>s+(i.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function yt(e){const t=new Map,n=ot();return new Proxy({},{get(r,s){return t.has(s)||Et(n,()=>t.set(s,k(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function wt(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return wt(r).reduce((i,o)=>[...i,...s.map(l=>l+o)],[])}const yn=100,bt=be(),ve=be(),Ce=()=>hn($e(bt),"Make sure your app is wrapped in a <Router />");let ae;const De=()=>ae||$e(ve)||Ce().base,wn=e=>{const t=De();return k(()=>t.resolvePath(e()))},bn=e=>{const t=Ce();return k(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},$n=()=>Ce().location;function Sn(e,t="",n){const{component:r,data:s,children:i}=e,o=!i||Array.isArray(i)&&!i.length,l={key:e,element:r?()=>L(r,{}):()=>{const{element:a}=e;return a===void 0&&n?L(n,{}):a},preload:e.component?r.preload:e.preload,data:s};return $t(e.path).reduce((a,u)=>{for(const c of wt(u)){const h=mt(t,c),f=o?h:h.split("/*",1)[0];a.push({...l,originalPath:c,pattern:f,matcher:pn(f,!o,e.matchFilters)})}return a},[])}function xn(e,t=0){return{routes:e,score:mn(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const i=e[s],o=i.matcher(n);if(!o)return null;r.unshift({...o,route:i})}return r}}}function $t(e){return Array.isArray(e)?e:[e]}function St(e,t="",n,r=[],s=[]){const i=$t(e);for(let o=0,l=i.length;o<l;o++){const a=i[o];if(a&&typeof a=="object"&&a.hasOwnProperty("path")){const u=Sn(a,t,n);for(const c of u){r.push(c);const h=Array.isArray(a.children)&&a.children.length===0;if(a.children&&!h)St(a.children,c.pattern,n,r,s);else{const f=xn([...r],s.length);s.push(f)}r.pop()}}}return r.length?s:s.sort((o,l)=>l.score-o.score)}function An(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function vn(e,t){const n=new URL("http://sar"),r=k(a=>{const u=e();try{return new URL(u,n)}catch{return console.error(`Invalid path ${u}`),a}},n,{equals:(a,u)=>a.href===u.href}),s=k(()=>r().pathname),i=k(()=>r().search,!0),o=k(()=>r().hash),l=k(()=>"");return{get pathname(){return s()},get search(){return i()},get hash(){return o()},get state(){return t()},get key(){return l()},query:yt(it(i,()=>gn(r())))}}function Cn(e,t="",n,r){const{signal:[s,i],utils:o={}}=cn(e),l=o.parsePath||(m=>m),a=o.renderPath||(m=>m),u=o.beforeLeave||an(),c=de("",t),h=void 0;if(c===void 0)throw new Error(`${c} is not a valid base path`);c&&!s().value&&i({value:c,replace:!0,scroll:!1});const[f,w]=N(!1),g=async m=>{w(!0);try{await lt(m)}finally{w(!1)}},[p,C]=N(s().value),[A,x]=N(s().state),P=vn(p,A),y=[],S={pattern:c,params:{},path:()=>c,outlet:()=>null,resolvePath(m){return de(c,m)}};if(n)try{ae=S,S.data=n({data:void 0,params:{},location:P,navigate:j(S)})}finally{ae=void 0}function O(m,b,$){M(()=>{if(typeof b=="number"){b&&(o.go?u.confirm(b,$)&&o.go(b):console.warn("Router integration does not support relative routing"));return}const{replace:D,resolve:Y,scroll:U,state:oe}={replace:!1,resolve:!0,scroll:!0,...$},W=Y?m.resolvePath(b):de("",b);if(W===void 0)throw new Error(`Path '${b}' is not a routable path`);if(y.length>=yn)throw new Error("Too many redirects");const le=p();if((W!==le||oe!==A())&&!tn){if(u.confirm(W,$)){const xt=y.push({value:le,replace:D,scroll:U,state:A()});g(()=>{C(W),x(oe)}).then(()=>{y.length===xt&&E({value:W,state:oe})})}}})}function j(m){return m=m||$e(ve)||S,(b,$)=>O(m,b,$)}function E(m){const b=y[0];b&&((m.value!==b.value||m.state!==b.state)&&i({...m,replace:b.replace,scroll:b.scroll}),y.length=0)}K(()=>{const{value:m,state:b}=s();M(()=>{m!==p()&&g(()=>{C(m),x(b)})})});{let m=function(b){if(b.defaultPrevented||b.button!==0||b.metaKey||b.altKey||b.ctrlKey||b.shiftKey)return;const $=b.composedPath().find(le=>le instanceof Node&&le.nodeName.toUpperCase()==="A");if(!$||!$.hasAttribute("link"))return;const D=$.href;if($.target||!D&&!$.hasAttribute("state"))return;const Y=($.getAttribute("rel")||"").split(/\s+/);if($.hasAttribute("download")||Y&&Y.includes("external"))return;const U=new URL(D);if(U.origin!==window.location.origin||c&&U.pathname&&!U.pathname.toLowerCase().startsWith(c.toLowerCase()))return;const oe=l(U.pathname+U.search+U.hash),W=$.getAttribute("state");b.preventDefault(),O(S,oe,{resolve:!1,replace:$.hasAttribute("replace"),scroll:!$.hasAttribute("noscroll"),state:W&&JSON.parse(W)})};var T=m;Ae(["click"]),document.addEventListener("click",m),se(()=>document.removeEventListener("click",m))}return{base:S,out:h,location:P,isRouting:f,renderPath:a,parsePath:l,navigatorFactory:j,beforeLeave:u}}function Pn(e,t,n,r,s){const{base:i,location:o,navigatorFactory:l}=e,{pattern:a,element:u,preload:c,data:h}=r().route,f=k(()=>r().path);c&&c();const w={parent:t,pattern:a,get child(){return n()},path:f,params:s,data:t.data,outlet:u,resolvePath(g){return de(i.path(),g,f())}};if(h)try{ae=w,w.data=h({data:t.data,params:s,location:o,navigate:l(w)})}finally{ae=void 0}return w}const En=I("<a link></a>",2),_n=e=>{const{source:t,url:n,base:r,data:s,out:i}=e,o=t||un(),l=Cn(o,r,s);return L(bt.Provider,{value:l,get children(){return e.children}})},Ln=e=>{const t=Ce(),n=De(),r=Be(()=>e.children),s=k(()=>St(r(),mt(n.pattern,e.base||""),kn)),i=k(()=>An(s(),t.location.pathname)),o=yt(()=>{const c=i(),h={};for(let f=0;f<c.length;f++)Object.assign(h,c[f].params);return h});t.out&&t.out.matches.push(i().map(({route:c,path:h,params:f})=>({originalPath:c.originalPath,pattern:c.pattern,path:h,params:f})));const l=[];let a;const u=k(it(i,(c,h,f)=>{let w=h&&c.length===h.length;const g=[];for(let p=0,C=c.length;p<C;p++){const A=h&&h[p],x=c[p];f&&A&&x.route.key===A.route.key?g[p]=f[p]:(w=!1,l[p]&&l[p](),te(P=>{l[p]=P,g[p]=Pn(t,g[p-1]||n,()=>u()[p+1],()=>i()[p],o)}))}return l.splice(c.length).forEach(p=>p()),f&&w?f:(a=g[0],g)}));return L(ne,{get when(){return u()&&a},children:c=>L(ve.Provider,{value:c,get children(){return c.outlet()}})})},Ge=e=>{const t=Be(()=>e.children);return Te(e,{get children(){return t()}})},kn=()=>{const e=De();return L(ne,{get when(){return e.child},children:t=>L(ve.Provider,{value:t,get children(){return t.outlet()}})})};function Qe(e){e=Te({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=Mt(e,["href","state","class","activeClass","inactiveClass","end"]),n=wn(()=>e.href),r=bn(n),s=$n(),i=k(()=>{const o=n();if(o===void 0)return!1;const l=G(o.split(/[?#]/,1)[0]).toLowerCase(),a=G(s.pathname).toLowerCase();return e.end?l===a:a.startsWith(l)});return(()=>{const o=En.cloneNode(!0);return Gt(o,Te(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!i(),[e.activeClass]:i(),...t.classList}},get["aria-current"](){return i()?"page":void 0}}),!1,!1),o})()}var ye=e=>e instanceof Element;function Ne(e,t){if(t(e))return e;if(typeof e=="function"&&!e.length)return Ne(e(),t);if(Array.isArray(e)){const n=[];for(const r of e){const s=Ne(r,t);s&&(Array.isArray(s)?n.push.apply(n,s):n.push(s))}return n.length?n:null}return null}function On(e,t=ye,n=ye){const r=k(e),s=k(()=>Ne(r(),t));return s.toArray=()=>{const i=s();return Array.isArray(i)?i:i?[i]:[]},s}function Me(e,t){if(t(e))return e;if(typeof e=="function"&&!e.length)return Me(e(),t);if(Array.isArray(e))for(const n of e){const r=Me(n,t);if(r)return r}return null}function Tn(e,t=ye,n=ye){const r=k(e);return k(()=>Me(r(),t))}const Ie=()=>{},Ze=(e,t)=>t();function Rn(e,t){const n=M(e),r=n?[n]:[],{onEnter:s=Ze,onExit:i=Ze}=t,[o,l]=N(t.appear?[]:r),[a]=qe();let u,c=!1;function h(g,p){if(!g)return p&&p();c=!0,i(g,()=>{He(()=>{c=!1,l(C=>C.filter(A=>A!==g)),p&&p()})})}function f(g){const p=u;if(!p)return g&&g();u=void 0,l(C=>[p,...C]),s(p,g??Ie)}const w=t.mode==="out-in"?g=>c||h(g,f):t.mode==="in-out"?g=>f(()=>h(g)):g=>{f(),h(g)};return Le(g=>{const p=e();return M(a)?(a(),g):(p!==g&&(u=p,He(()=>M(()=>w(g)))),p)},t.appear?void 0:n),o}function Nn(e,t){const n=M(e),{onChange:r}=t;let s=new Set(t.appear?void 0:n);const i=new WeakSet,[o,l]=N([],{equals:!1}),[a]=qe(),u=t.exitMethod==="remove"?Ie:h=>{l(f=>(f.push.apply(f,h),f));for(const f of h)i.delete(f)},c=t.exitMethod==="remove"?Ie:t.exitMethod==="keep-index"?(h,f,w)=>h.splice(w,0,f):(h,f)=>h.push(f);return k(h=>{const f=o(),w=e();if(w[tt],M(a))return a(),h;if(f.length){const g=h.filter(p=>!f.includes(p));return f.length=0,r({list:g,added:[],removed:[],unchanged:g,finishRemoved:u}),g}return M(()=>{const g=new Set(w),p=w.slice(),C=[],A=[],x=[];for(const y of w)(s.has(y)?x:C).push(y);let P=!C.length;for(let y=0;y<h.length;y++){const S=h[y];g.has(S)||(i.has(S)||(A.push(S),i.add(S)),c(p,S,y)),P&&S!==p[y]&&(P=!1)}return!A.length&&P?h:(r({list:p,added:C,removed:A,unchanged:x,finishRemoved:u}),s=g,p)})},t.appear?[]:n.slice())}const Mn=I('<div class="flex"><button class="btn"> Resource</button><button class="btn"> Transition</button><button class="btn"> Appear</button></div>',8),In=I('<div class="wrapper-h flex-wrap"><button class="btn">+ 1</button><button class="btn">- 1</button><button class="btn">toggle 0</button><button class="btn">toggle 1</button><button class="btn">toggle 2 & 3</button><button class="btn">toggle wrapper</button></div>',14),jn=I('<div class="wrapper-h flex-wrap space-x-0 gap-4"></div>',2),qn=I("<p>Suspended</p>",2),Bn=I("<p>Hello</p>",2),Fn=I('<div class="node">ID 1</div>',2),Dn=I('<div class="node">ID 2</div>',2),Vn=I('<div class="node">ID 3</div>',2),Hn=I('<div class="node">ID 0</div>',2),Un=I('<div class="node bg-yellow-600 cursor-pointer">.</div>',2),ce=e=>{se(()=>{e.style.filter="grayscale(60%)",e.style.zIndex="0"})},Kn=()=>{const[e,t]=N(!1),[n,r]=N(!1),[s,i]=N(!0),[o,l]=N(!0),[a,u]=N([{n:1},{n:2},{n:3},{n:4},{n:5}]),[c,h]=N(!1);let f=()=>{};const[w]=st(c,()=>new Promise(A=>f=A)),[g,p]=qe(),C=localStorage.getItem("transition-group-appear")==="true";return[(()=>{const A=Mn.cloneNode(!0),x=A.firstChild,P=x.firstChild,y=x.nextSibling,S=y.firstChild,O=y.nextSibling,j=O.firstChild;return x.$$click=()=>{f(),h(E=>!E)},B(x,()=>c()?"Stop":"Start",P),y.$$click=()=>{f(),c()||p(()=>h(E=>!E))},B(y,()=>g()?"Stop":"Start",S),O.$$click=()=>{localStorage.setItem("transition-group-appear",String(!C)),window.location.reload()},B(O,C?"Disable":"Enable",j),A})(),(()=>{const A=In.cloneNode(!0),x=A.firstChild,P=x.nextSibling,y=P.nextSibling,S=y.nextSibling,O=S.nextSibling,j=O.nextSibling;return x.$$click=()=>u(E=>[...E,{n:(E[E.length-1]?.n??-1)+1}]),P.$$click=()=>u(E=>E.length>0?E.slice(0,E.length-1):E),y.$$click=()=>t(E=>!E),S.$$click=()=>r(E=>!E),O.$$click=()=>i(E=>!E),j.$$click=()=>l(E=>!E),A})(),(()=>{const A=jn.cloneNode(!0);return B(A,L(gt,{get fallback(){return qn.cloneNode(!0)},get children(){return L(ne,{get when(){return o()},get children(){return M(()=>{K(w);const x=On(()=>[Bn.cloneNode(!0),"World",k((()=>{const y=k(()=>!!e());return()=>y()&&(()=>{const S=Hn.cloneNode(!0);return J(O=>{Pt(()=>console.log("mounted",O.isConnected)),ce(O)},S),S})()})()),L(ne,{get when(){return n()},get children(){const y=Fn.cloneNode(!0);return J(ce,y),y}}),L(ne,{get when(){return s()},get children(){return[(()=>{const y=Dn.cloneNode(!0);return J(ce,y),y})(),(()=>{const y=Vn.cloneNode(!0);return J(ce,y),y})()]}}),L(It,{get each(){return a()},children:({n:y},S)=>(()=>{const O=Un.cloneNode(!0),j=O.firstChild;return J(ce,O),O.$$click=()=>u(E=>{const T=E.slice();return T.splice(S(),1),T}),B(O,y+1,j),O})()})],y=>y instanceof HTMLElement),P={duration:600,easing:"cubic-bezier(0.4, 0, 0.2, 1)"};return Nn(x.toArray,{appear:C,onChange({added:y,finishRemoved:S,unchanged:O,removed:j}){y.forEach(T=>{queueMicrotask(()=>{T.isConnected&&(T.style.opacity="0",T.style.transform="translateY(10px)",T.animate([{opacity:0,transform:"translateY(-36px)"},{opacity:1,transform:"translateY(0)"}],{...P,fill:"both"}))})}),O.forEach(T=>{const{left:m,top:b}=T.getBoundingClientRect();T.isConnected&&queueMicrotask(()=>{const{left:$,top:D}=T.getBoundingClientRect();T.animate([{transform:`translate(${m-$}px, ${b-D}px)`},{transform:"none"}],P)})});const E=j.map(T=>T.getBoundingClientRect());j.forEach(T=>{T.style.transform="none",T.style.position="absolute"}),queueMicrotask(()=>{j.forEach((T,m)=>{if(!T.isConnected)return S([T]);const{left:b,top:$}=E[m],{left:D,top:Y}=T.getBoundingClientRect(),U=T.animate([{transform:`translate(${b-D}px, ${$-Y}px)`},{opacity:0,transform:`translate(${b-D}px, ${$-Y+36}px)`}],P);m===j.length-1&&U.finished.then(()=>S(j)).catch(()=>S(j))})})}})})}})}})),A})()]},Wn=Kn;Ae(["click"]);const zn=I('<div class="wrapper-h h-26 relative"><h4 class="absolute m-auto pointer-events-none"></h4><button class="btn absolute left-16"></button></div>',6),Xn=I('<p class="absolute right-16">Suspended</p>',2),Yn=I('<div class="absolute z-1 right-16 p-4 bg-green-600 rounded">A</div>',2),Jn=I('<div class="absolute z-1 right-16 p-4 bg-orange-600 rounded">B</div>',2),Gn=I('<div class="flex"><button class="btn"> Resource</button><button class="btn"> Appear</button></div>',6),Qn=I("<h1>Toggle</h1>",2),Zn=I("<h1>Switch</h1>",2),je=localStorage.getItem("transition-group-appear")==="true";function er(e){const t=Tn(()=>e.children,i=>i instanceof HTMLElement),n=(i,o)=>{if(!i.isConnected)return o();const l=i.animate([{opacity:0,transform:"translate(100px)"},{opacity:1,transform:"translate(0)"}],{duration:800});s.set(i,l);const a=()=>{o(),s.delete(i)};l.finished.then(a).catch(a)},r=(i,o)=>{if(!i.isConnected)return o();const l=i.getBoundingClientRect().left;s.get(i)?.cancel();const a=i.getBoundingClientRect().left;i.animate([{opacity:1,transform:`translate(${l-a}px)`},{opacity:0,transform:"translate(-100px)"}],{duration:1e3}).finished.then(o).catch(o)},s=new Map;return Rn(t,{onEnter(i,o){queueMicrotask(()=>n(i,o))},onExit(i,o){r(i,o)},mode:e.mode,appear:je})}const et=e=>{se(()=>{e.style.filter="grayscale(60%)",e.style.zIndex="0"})};function ee(e){const{withFallback:t,mode:n}=e,[r,s]=N(!0);let i=0;return(()=>{const o=zn.cloneNode(!0),l=o.firstChild,a=l.nextSibling;return B(l,n),a.$$click=()=>s(!r()),B(a,()=>r()?"Hide":"Show"),B(o,L(gt,{get fallback(){return Xn.cloneNode(!0)},get children(){return M(()=>(K(e.resource),L(er,{mode:n,get children(){return L(ne,{get when(){return r()},get fallback(){return t&&(()=>{const u=Jn.cloneNode(!0),c=u.firstChild;return J(et,u),B(u,i++,null),u})()},get children(){const u=Yn.cloneNode(!0),c=u.firstChild;return J(et,u),B(u,i++,null),u}})}})))}}),null),o})()}const tr=()=>{const[e,t]=N(!1);let n=()=>{};const[r]=st(e,()=>new Promise(s=>n=s));return[(()=>{const s=Gn.cloneNode(!0),i=s.firstChild,o=i.firstChild,l=i.nextSibling,a=l.firstChild;return i.$$click=()=>{n(),t(u=>!u)},B(i,()=>e()?"Stop":"Start",o),l.$$click=()=>{localStorage.setItem("transition-group-appear",String(!je)),window.location.reload()},B(l,je?"Disable":"Enable",a),s})(),Qn.cloneNode(!0),L(ee,{mode:"parallel",resource:r}),L(ee,{mode:"out-in",resource:r}),L(ee,{mode:"in-out",resource:r}),Zn.cloneNode(!0),L(ee,{mode:"parallel",withFallback:!0,resource:r}),L(ee,{mode:"out-in",withFallback:!0,resource:r}),L(ee,{mode:"in-out",withFallback:!0,resource:r})]},nr=tr;Ae(["click"]);const rr=I('<nav class="fixed top-2 left-2 flex space-x-4"></nav>',2),sr=I('<div class="p-24 box-border w-full min-h-screen space-y-4 bg-gray-800 text-white"></div>',2);Kt(()=>L(_n,{get children(){return[(()=>{const e=rr.cloneNode(!0);return B(e,L(Qe,{class:"text-yellow-400",href:"/list",children:"/list"}),null),B(e,L(Qe,{class:"text-yellow-400",href:"/switch",children:"/switch"}),null),e})(),(()=>{const e=sr.cloneNode(!0);return B(e,L(Ln,{get children(){return[L(Ge,{path:"/list",get element(){return L(Wn,{})}}),L(Ge,{path:"/switch",get element(){return L(nr,{})}})]}})),e})()]}}),document.getElementById("root"));