(()=>{var e={2:(e,t,a)=>{var r=a(2199),o=a(4664),n=a(5950);e.exports=function(e){return r(e,n,o)}},79:(e,t,a)=>{var r=a(3702),o=a(80),n=a(4739),l=a(8655),i=a(1175);function s(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var r=e[t];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=n,s.prototype.has=l,s.prototype.set=i,e.exports=s},80:(e,t,a)=>{var r=a(6025),o=Array.prototype.splice;e.exports=function(e){var t=this.__data__,a=r(t,e);return!(a<0||(a==t.length-1?t.pop():o.call(t,a,1),--this.size,0))}},104:(e,t,a)=>{var r=a(3661);function o(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var a=function(){var r=arguments,o=t?t.apply(this,r):r[0],n=a.cache;if(n.has(o))return n.get(o);var l=e.apply(this,r);return a.cache=n.set(o,l)||n,l};return a.cache=new(o.Cache||r),a}o.Cache=r,e.exports=o},181:e=>{e.exports=function(e){var t=[];if(null!=e)for(var a in Object(e))t.push(a);return t}},289:(e,t,a)=>{var r=a(2651);e.exports=function(e){return r(this,e).get(e)}},294:e=>{e.exports=function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}},346:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},361:e=>{var t=/^(?:0|[1-9]\d*)$/;e.exports=function(e,a){var r=typeof e;return!!(a=null==a?9007199254740991:a)&&("number"==r||"symbol"!=r&&t.test(e))&&e>-1&&e%1==0&&e<a}},392:e=>{e.exports=function(e,t){return null==e?void 0:e[t]}},659:(e,t,a)=>{var r=a(1873),o=Object.prototype,n=o.hasOwnProperty,l=o.toString,i=r?r.toStringTag:void 0;e.exports=function(e){var t=n.call(e,i),a=e[i];try{e[i]=void 0;var r=!0}catch(e){}var o=l.call(e);return r&&(t?e[i]=a:delete e[i]),o}},695:(e,t,a)=>{var r=a(8096),o=a(2428),n=a(6449),l=a(3656),i=a(361),s=a(7167),u=Object.prototype.hasOwnProperty;e.exports=function(e,t){var a=n(e),p=!a&&o(e),c=!a&&!p&&l(e),b=!a&&!p&&!c&&s(e),v=a||p||c||b,f=v?r(e.length,String):[],d=f.length;for(var h in e)!t&&!u.call(e,h)||v&&("length"==h||c&&("offset"==h||"parent"==h)||b&&("buffer"==h||"byteLength"==h||"byteOffset"==h)||i(h,d))||f.push(h);return f}},938:e=>{e.exports=function(e){var t=this.__data__,a=t.delete(e);return this.size=t.size,a}},945:(e,t,a)=>{var r=a(79),o=a(8223),n=a(3661);e.exports=function(e,t){var a=this.__data__;if(a instanceof r){var l=a.__data__;if(!o||l.length<199)return l.push([e,t]),this.size=++a.size,this;a=this.__data__=new n(l)}return a.set(e,t),this.size=a.size,this}},1042:(e,t,a)=>{var r=a(6110)(Object,"create");e.exports=r},1175:(e,t,a)=>{var r=a(6025);e.exports=function(e,t){var a=this.__data__,o=r(a,e);return o<0?(++this.size,a.push([e,t])):a[o][1]=t,this}},1420:(e,t,a)=>{var r=a(79);e.exports=function(){this.__data__=new r,this.size=0}},1549:(e,t,a)=>{var r=a(2032),o=a(3862),n=a(6721),l=a(2749),i=a(5749);function s(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var r=e[t];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=n,s.prototype.has=l,s.prototype.set=i,e.exports=s},1769:(e,t,a)=>{var r=a(6449),o=a(8586),n=a(1802),l=a(3222);e.exports=function(e,t){return r(e)?e:o(e,t)?[e]:n(l(e))}},1791:(e,t,a)=>{var r=a(6547),o=a(3360);e.exports=function(e,t,a,n){var l=!a;a||(a={});for(var i=-1,s=t.length;++i<s;){var u=t[i],p=n?n(a[u],e[u],u,a,e):void 0;void 0===p&&(p=e[u]),l?o(a,u,p):r(a,u,p)}return a}},1802:(e,t,a)=>{var r=a(2224),o=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,n=/\\(\\)?/g,l=r((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(o,(function(e,a,r,o){t.push(r?o.replace(n,"$1"):a||e)})),t}));e.exports=l},1873:(e,t,a)=>{var r=a(9325).Symbol;e.exports=r},1882:(e,t,a)=>{var r=a(2552),o=a(3805);e.exports=function(e){if(!o(e))return!1;var t=r(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},1961:(e,t,a)=>{var r=a(9653);e.exports=function(e,t){var a=t?r(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.length)}},2032:(e,t,a)=>{var r=a(1042);e.exports=function(){this.__data__=r?r(null):{},this.size=0}},2199:(e,t,a)=>{var r=a(4528),o=a(6449);e.exports=function(e,t,a){var n=t(e);return o(e)?n:r(n,a(e))}},2224:(e,t,a)=>{var r=a(104);e.exports=function(e){var t=r(e,(function(e){return 500===a.size&&a.clear(),e})),a=t.cache;return t}},2271:(e,t,a)=>{var r=a(1791),o=a(4664);e.exports=function(e,t){return r(e,o(e),t)}},2428:(e,t,a)=>{var r=a(7534),o=a(346),n=Object.prototype,l=n.hasOwnProperty,i=n.propertyIsEnumerable,s=r(function(){return arguments}())?r:function(e){return o(e)&&l.call(e,"callee")&&!i.call(e,"callee")};e.exports=s},2552:(e,t,a)=>{var r=a(1873),o=a(659),n=a(9350),l=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":l&&l in Object(e)?o(e):n(e)}},2651:(e,t,a)=>{var r=a(4218);e.exports=function(e,t){var a=e.__data__;return r(t)?a["string"==typeof t?"string":"hash"]:a.map}},2749:(e,t,a)=>{var r=a(1042),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;return r?void 0!==t[e]:o.call(t,e)}},2804:(e,t,a)=>{var r=a(6110)(a(9325),"Promise");e.exports=r},2903:(e,t,a)=>{var r=a(3805),o=a(5527),n=a(181),l=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return n(e);var t=o(e),a=[];for(var i in e)("constructor"!=i||!t&&l.call(e,i))&&a.push(i);return a}},2949:(e,t,a)=>{var r=a(2651);e.exports=function(e,t){var a=r(this,e),o=a.size;return a.set(e,t),this.size+=a.size==o?0:1,this}},3007:e=>{e.exports=function(e,t){var a=-1,r=e.length;for(t||(t=Array(r));++a<r;)t[a]=e[a];return t}},3040:(e,t,a)=>{var r=a(1549),o=a(79),n=a(8223);e.exports=function(){this.size=0,this.__data__={hash:new r,map:new(n||o),string:new r}}},3170:(e,t,a)=>{var r=a(6547),o=a(1769),n=a(361),l=a(3805),i=a(7797);e.exports=function(e,t,a,s){if(!l(e))return e;for(var u=-1,p=(t=o(t,e)).length,c=p-1,b=e;null!=b&&++u<p;){var v=i(t[u]),f=a;if("__proto__"===v||"constructor"===v||"prototype"===v)return e;if(u!=c){var d=b[v];void 0===(f=s?s(d,v,b):void 0)&&(f=l(d)?d:n(t[u+1])?[]:{})}r(b,v,f),b=b[v]}return e}},3201:e=>{var t=/\w*$/;e.exports=function(e){var a=new e.constructor(e.source,t.exec(e));return a.lastIndex=e.lastIndex,a}},3222:(e,t,a)=>{var r=a(7556);e.exports=function(e){return null==e?"":r(e)}},3243:(e,t,a)=>{var r=a(6110),o=function(){try{var e=r(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();e.exports=o},3290:(e,t,a)=>{e=a.nmd(e);var r=a(9325),o=t&&!t.nodeType&&t,n=o&&e&&!e.nodeType&&e,l=n&&n.exports===o?r.Buffer:void 0,i=l?l.allocUnsafe:void 0;e.exports=function(e,t){if(t)return e.slice();var a=e.length,r=i?i(a):new e.constructor(a);return e.copy(r),r}},3345:e=>{e.exports=function(){return[]}},3349:(e,t,a)=>{var r=a(2199),o=a(6375),n=a(7241);e.exports=function(e){return r(e,n,o)}},3360:(e,t,a)=>{var r=a(3243);e.exports=function(e,t,a){"__proto__"==t&&r?r(e,t,{configurable:!0,enumerable:!0,value:a,writable:!0}):e[t]=a}},3560:(e,t,a)=>{var r=a(3170);e.exports=function(e,t,a){return null==e?e:r(e,t,a)}},3605:e=>{e.exports=function(e){return this.__data__.get(e)}},3650:(e,t,a)=>{var r=a(4335)(Object.keys,Object);e.exports=r},3656:(e,t,a)=>{e=a.nmd(e);var r=a(9325),o=a(9935),n=t&&!t.nodeType&&t,l=n&&e&&!e.nodeType&&e,i=l&&l.exports===n?r.Buffer:void 0,s=(i?i.isBuffer:void 0)||o;e.exports=s},3661:(e,t,a)=>{var r=a(3040),o=a(7670),n=a(289),l=a(4509),i=a(2949);function s(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var r=e[t];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=n,s.prototype.has=l,s.prototype.set=i,e.exports=s},3702:e=>{e.exports=function(){this.__data__=[],this.size=0}},3729:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length;++a<r&&!1!==t(e[a],a,e););return e}},3736:(e,t,a)=>{var r=a(1873),o=r?r.prototype:void 0,n=o?o.valueOf:void 0;e.exports=function(e){return n?Object(n.call(e)):{}}},3805:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},3838:(e,t,a)=>{var r=a(1791),o=a(7241);e.exports=function(e,t){return e&&r(t,o(t),e)}},3862:e=>{e.exports=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}},4218:e=>{e.exports=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}},4335:e=>{e.exports=function(e,t){return function(a){return e(t(a))}}},4394:(e,t,a)=>{var r=a(2552),o=a(346);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},4509:(e,t,a)=>{var r=a(2651);e.exports=function(e){return r(this,e).has(e)}},4528:e=>{e.exports=function(e,t){for(var a=-1,r=t.length,o=e.length;++a<r;)e[o+a]=t[a];return e}},4664:(e,t,a)=>{var r=a(9770),o=a(3345),n=Object.prototype.propertyIsEnumerable,l=Object.getOwnPropertySymbols,i=l?function(e){return null==e?[]:(e=Object(e),r(l(e),(function(t){return n.call(e,t)})))}:o;e.exports=i},4733:(e,t,a)=>{var r=a(1791),o=a(5950);e.exports=function(e,t){return e&&r(t,o(t),e)}},4739:(e,t,a)=>{var r=a(6025);e.exports=function(e){var t=this.__data__,a=r(t,e);return a<0?void 0:t[a][1]}},4840:(e,t,a)=>{var r="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=r},4894:(e,t,a)=>{var r=a(1882),o=a(294);e.exports=function(e){return null!=e&&o(e.length)&&!r(e)}},4901:(e,t,a)=>{var r=a(2552),o=a(294),n=a(346),l={};l["[object Float32Array]"]=l["[object Float64Array]"]=l["[object Int8Array]"]=l["[object Int16Array]"]=l["[object Int32Array]"]=l["[object Uint8Array]"]=l["[object Uint8ClampedArray]"]=l["[object Uint16Array]"]=l["[object Uint32Array]"]=!0,l["[object Arguments]"]=l["[object Array]"]=l["[object ArrayBuffer]"]=l["[object Boolean]"]=l["[object DataView]"]=l["[object Date]"]=l["[object Error]"]=l["[object Function]"]=l["[object Map]"]=l["[object Number]"]=l["[object Object]"]=l["[object RegExp]"]=l["[object Set]"]=l["[object String]"]=l["[object WeakMap]"]=!1,e.exports=function(e){return n(e)&&o(e.length)&&!!l[r(e)]}},4932:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=Array(r);++a<r;)o[a]=t(e[a],a,e);return o}},5083:(e,t,a)=>{var r=a(1882),o=a(7296),n=a(3805),l=a(7473),i=/^\[object .+?Constructor\]$/,s=Function.prototype,u=Object.prototype,p=s.toString,c=u.hasOwnProperty,b=RegExp("^"+p.call(c).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=function(e){return!(!n(e)||o(e))&&(r(e)?b:i).test(l(e))}},5288:e=>{e.exports=function(e,t){return e===t||e!=e&&t!=t}},5481:(e,t,a)=>{var r=a(9325)["__core-js_shared__"];e.exports=r},5527:e=>{var t=Object.prototype;e.exports=function(e){var a=e&&e.constructor;return e===("function"==typeof a&&a.prototype||t)}},5529:(e,t,a)=>{var r=a(9344),o=a(8879),n=a(5527);e.exports=function(e){return"function"!=typeof e.constructor||n(e)?{}:r(o(e))}},5580:(e,t,a)=>{var r=a(6110)(a(9325),"DataView");e.exports=r},5749:(e,t,a)=>{var r=a(1042);e.exports=function(e,t){var a=this.__data__;return this.size+=this.has(e)?0:1,a[e]=r&&void 0===t?"__lodash_hash_undefined__":t,this}},5861:(e,t,a)=>{var r=a(5580),o=a(8223),n=a(2804),l=a(6545),i=a(8303),s=a(2552),u=a(7473),p="[object Map]",c="[object Promise]",b="[object Set]",v="[object WeakMap]",f="[object DataView]",d=u(r),h=u(o),_=u(n),x=u(l),g=u(i),y=s;(r&&y(new r(new ArrayBuffer(1)))!=f||o&&y(new o)!=p||n&&y(n.resolve())!=c||l&&y(new l)!=b||i&&y(new i)!=v)&&(y=function(e){var t=s(e),a="[object Object]"==t?e.constructor:void 0,r=a?u(a):"";if(r)switch(r){case d:return f;case h:return p;case _:return c;case x:return b;case g:return v}return t}),e.exports=y},5950:(e,t,a)=>{var r=a(695),o=a(8984),n=a(4894);e.exports=function(e){return n(e)?r(e):o(e)}},6009:(e,t,a)=>{e=a.nmd(e);var r=a(4840),o=t&&!t.nodeType&&t,n=o&&e&&!e.nodeType&&e,l=n&&n.exports===o&&r.process,i=function(){try{return n&&n.require&&n.require("util").types||l&&l.binding&&l.binding("util")}catch(e){}}();e.exports=i},6025:(e,t,a)=>{var r=a(5288);e.exports=function(e,t){for(var a=e.length;a--;)if(r(e[a][0],t))return a;return-1}},6038:(e,t,a)=>{var r=a(5861),o=a(346);e.exports=function(e){return o(e)&&"[object Set]"==r(e)}},6110:(e,t,a)=>{var r=a(5083),o=a(392);e.exports=function(e,t){var a=o(e,t);return r(a)?a:void 0}},6169:(e,t,a)=>{var r=a(9653);e.exports=function(e,t){var a=t?r(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.byteLength)}},6189:e=>{var t=Object.prototype.hasOwnProperty;e.exports=function(e){var a=e.length,r=new e.constructor(a);return a&&"string"==typeof e[0]&&t.call(e,"index")&&(r.index=e.index,r.input=e.input),r}},6375:(e,t,a)=>{var r=a(4528),o=a(8879),n=a(4664),l=a(3345),i=Object.getOwnPropertySymbols?function(e){for(var t=[];e;)r(t,n(e)),e=o(e);return t}:l;e.exports=i},6449:e=>{var t=Array.isArray;e.exports=t},6545:(e,t,a)=>{var r=a(6110)(a(9325),"Set");e.exports=r},6547:(e,t,a)=>{var r=a(3360),o=a(5288),n=Object.prototype.hasOwnProperty;e.exports=function(e,t,a){var l=e[t];n.call(e,t)&&o(l,a)&&(void 0!==a||t in e)||r(e,t,a)}},6721:(e,t,a)=>{var r=a(1042),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;if(r){var a=t[e];return"__lodash_hash_undefined__"===a?void 0:a}return o.call(t,e)?t[e]:void 0}},7167:(e,t,a)=>{var r=a(4901),o=a(7301),n=a(6009),l=n&&n.isTypedArray,i=l?o(l):r;e.exports=i},7199:(e,t,a)=>{var r=a(9653),o=a(6169),n=a(3201),l=a(3736),i=a(1961);e.exports=function(e,t,a){var s=e.constructor;switch(t){case"[object ArrayBuffer]":return r(e);case"[object Boolean]":case"[object Date]":return new s(+e);case"[object DataView]":return o(e,a);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return i(e,a);case"[object Map]":case"[object Set]":return new s;case"[object Number]":case"[object String]":return new s(e);case"[object RegExp]":return n(e);case"[object Symbol]":return l(e)}}},7217:(e,t,a)=>{var r=a(79),o=a(1420),n=a(938),l=a(3605),i=a(9817),s=a(945);function u(e){var t=this.__data__=new r(e);this.size=t.size}u.prototype.clear=o,u.prototype.delete=n,u.prototype.get=l,u.prototype.has=i,u.prototype.set=s,e.exports=u},7241:(e,t,a)=>{var r=a(695),o=a(2903),n=a(4894);e.exports=function(e){return n(e)?r(e,!0):o(e)}},7296:(e,t,a)=>{var r,o=a(5481),n=(r=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"";e.exports=function(e){return!!n&&n in e}},7301:e=>{e.exports=function(e){return function(t){return e(t)}}},7473:e=>{var t=Function.prototype.toString;e.exports=function(e){if(null!=e){try{return t.call(e)}catch(e){}try{return e+""}catch(e){}}return""}},7534:(e,t,a)=>{var r=a(2552),o=a(346);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},7556:(e,t,a)=>{var r=a(1873),o=a(4932),n=a(6449),l=a(4394),i=r?r.prototype:void 0,s=i?i.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(n(t))return o(t,e)+"";if(l(t))return s?s.call(t):"";var a=t+"";return"0"==a&&1/t==-1/0?"-0":a}},7670:(e,t,a)=>{var r=a(2651);e.exports=function(e){var t=r(this,e).delete(e);return this.size-=t?1:0,t}},7730:(e,t,a)=>{var r=a(9172),o=a(7301),n=a(6009),l=n&&n.isMap,i=l?o(l):r;e.exports=i},7797:(e,t,a)=>{var r=a(4394);e.exports=function(e){if("string"==typeof e||r(e))return e;var t=e+"";return"0"==t&&1/e==-1/0?"-0":t}},7828:(e,t,a)=>{var r=a(9325).Uint8Array;e.exports=r},8055:(e,t,a)=>{var r=a(9999);e.exports=function(e){return r(e,5)}},8096:e=>{e.exports=function(e,t){for(var a=-1,r=Array(e);++a<e;)r[a]=t(a);return r}},8223:(e,t,a)=>{var r=a(6110)(a(9325),"Map");e.exports=r},8303:(e,t,a)=>{var r=a(6110)(a(9325),"WeakMap");e.exports=r},8440:(e,t,a)=>{var r=a(6038),o=a(7301),n=a(6009),l=n&&n.isSet,i=l?o(l):r;e.exports=i},8586:(e,t,a)=>{var r=a(6449),o=a(4394),n=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,l=/^\w*$/;e.exports=function(e,t){if(r(e))return!1;var a=typeof e;return!("number"!=a&&"symbol"!=a&&"boolean"!=a&&null!=e&&!o(e))||l.test(e)||!n.test(e)||null!=t&&e in Object(t)}},8655:(e,t,a)=>{var r=a(6025);e.exports=function(e){return r(this.__data__,e)>-1}},8879:(e,t,a)=>{var r=a(4335)(Object.getPrototypeOf,Object);e.exports=r},8948:(e,t,a)=>{var r=a(1791),o=a(6375);e.exports=function(e,t){return r(e,o(e),t)}},8984:(e,t,a)=>{var r=a(5527),o=a(3650),n=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return o(e);var t=[];for(var a in Object(e))n.call(e,a)&&"constructor"!=a&&t.push(a);return t}},9172:(e,t,a)=>{var r=a(5861),o=a(346);e.exports=function(e){return o(e)&&"[object Map]"==r(e)}},9325:(e,t,a)=>{var r=a(4840),o="object"==typeof self&&self&&self.Object===Object&&self,n=r||o||Function("return this")();e.exports=n},9344:(e,t,a)=>{var r=a(3805),o=Object.create,n=function(){function e(){}return function(t){if(!r(t))return{};if(o)return o(t);e.prototype=t;var a=new e;return e.prototype=void 0,a}}();e.exports=n},9350:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},9653:(e,t,a)=>{var r=a(7828);e.exports=function(e){var t=new e.constructor(e.byteLength);return new r(t).set(new r(e)),t}},9770:e=>{e.exports=function(e,t){for(var a=-1,r=null==e?0:e.length,o=0,n=[];++a<r;){var l=e[a];t(l,a,e)&&(n[o++]=l)}return n}},9817:e=>{e.exports=function(e){return this.__data__.has(e)}},9935:e=>{e.exports=function(){return!1}},9999:(e,t,a)=>{var r=a(7217),o=a(3729),n=a(6547),l=a(4733),i=a(3838),s=a(3290),u=a(3007),p=a(2271),c=a(8948),b=a(2),v=a(3349),f=a(5861),d=a(6189),h=a(7199),_=a(5529),x=a(6449),g=a(3656),y=a(7730),m=a(3805),j=a(8440),w=a(5950),F=a(7241),z="[object Arguments]",O="[object Function]",$="[object Object]",S={};S[z]=S["[object Array]"]=S["[object ArrayBuffer]"]=S["[object DataView]"]=S["[object Boolean]"]=S["[object Date]"]=S["[object Float32Array]"]=S["[object Float64Array]"]=S["[object Int8Array]"]=S["[object Int16Array]"]=S["[object Int32Array]"]=S["[object Map]"]=S["[object Number]"]=S[$]=S["[object RegExp]"]=S["[object Set]"]=S["[object String]"]=S["[object Symbol]"]=S["[object Uint8Array]"]=S["[object Uint8ClampedArray]"]=S["[object Uint16Array]"]=S["[object Uint32Array]"]=!0,S["[object Error]"]=S[O]=S["[object WeakMap]"]=!1,e.exports=function e(t,a,C,A,P,I){var k,B=1&a,T=2&a,U=4&a;if(C&&(k=P?C(t,A,P,I):C(t)),void 0!==k)return k;if(!m(t))return t;var E=x(t);if(E){if(k=d(t),!B)return u(t,k)}else{var M=f(t),W=M==O||"[object GeneratorFunction]"==M;if(g(t))return s(t,B);if(M==$||M==z||W&&!P){if(k=T||W?{}:_(t),!B)return T?c(t,i(k,t)):p(t,l(k,t))}else{if(!S[M])return P?t:{};k=h(t,M,B)}}I||(I=new r);var H=I.get(t);if(H)return H;I.set(t,k),j(t)?t.forEach((function(r){k.add(e(r,a,C,r,t,I))})):y(t)&&t.forEach((function(r,o){k.set(o,e(r,a,C,o,t,I))}));var N=E?void 0:(U?T?v:b:T?F:w)(t);return o(N||t,(function(r,o){N&&(r=t[o=r]),n(k,o,e(r,a,C,o,t,I))})),k}}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={id:r,loaded:!1,exports:{}};return e[r](n,n.exports,a),n.loaded=!0,n.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{"use strict";const e=window.wp.blocks,t=window.React,r=window.wp.i18n,o=window.wp.blockEditor,n=window.wp.components,l=window.wp.data,i=e=>{const t={},a=[],r=(e,r,o)=>{"object"==typeof r&&null!==r?Object.entries(o).forEach((([e,t])=>{const n=r[e];n&&Object.entries(n).forEach((([t,r])=>{if(r&&"---"!==r){const n=o[e];"sm"===t?a.push(`${n}-${r}`):a.push(`${n}-${t}-${r}`)}}))})):r&&(t[e]=r)},o=(e,t)=>{"object"==typeof t&&null!==t?Object.entries(t).forEach((([t,r])=>{r&&"---"!==r&&("sm"===t?a.push(`${e}-${r}`):a.push(`${e}-${t}-${r}`))})):t&&a.push(`${e}${t}`)},n=(e,t)=>{null!==typeof t&&"---"!==t&&a.push(`${e}-${t}`)};if(e?.base?.offcanvasBgColor&&(t["--oui-offcanvas-bgcolor"]=e.base.offcanvasBgColor),e?.base?.sizing){const{size:a,width:r,height:n,column:l,offset:i,parentBlockName:s}=e.base.sizing;a&&(t["--oui-size"]=a),r&&o("oui_w",r),n&&o("oui_h",n),l&&o("origamiui/custom-grid"===s?"oui_g-col":"oui_col",l),i&&o("oui_offset",i)}if(e?.base?.flex){const{display:t,direction:a,wrap:r,align:n,justify:l,grow:i,shrink:s,self:u,order:p}=e.base.flex;t&&o("oui_d",t),a&&o("oui_flex",a),r&&o("oui_flex",r),n&&o("oui_align-items",n),l&&o("oui_justify-content",l),i&&o("oui_flex",i),s&&o("oui_flex",s),u&&o("oui_align-self",u),p&&o("oui_order",p)}if(e?.base?.spacing){const{space:a,margin:o,padding:n,gap:l}=e.base.spacing,i={top:"oui_mt",bottom:"oui_mb",left:"oui_ml",right:"oui_mr"},s={top:"oui_pt",bottom:"oui_pb",left:"oui_pl",right:"oui_pr"},u={row:"oui_row-gap",column:"oui_column-gap"};a&&(t["--oui-space"]=a),o&&r("oui_margin",o,i),n&&r("oui_padding",n,s),l&&r("oui_gap",l,u)}if(e?.base?.position){const{className:t,alignment:r,isOutsideHorizontal:n,isOutsideVertical:l}=e.base.position;t&&o("oui_position",t),(r||n||l)&&((e,t,r)=>{"top left"===e&&(t&&!r?a.push("oui_top-0 oui_start-0 oui_translate-middle-x"):!t&&r?a.push("oui_top-0 oui_start-0 oui_translate-middle-y"):t&&r?a.push("oui_top-0 oui_start-0 oui_translate-middle"):a.push("oui_top-0 oui_start-0")),"top center"===e&&(t&&!r?a.push("oui_top-0 oui_start-50 oui_translate-middle-x"):!t&&r||t&&r?a.push("oui_top-0 oui_start-50 oui_translate-middle"):a.push("oui_top-0 oui_start-50 oui_translate-middle-x")),"top right"===e&&(t&&!r?a.push("oui_top-0 oui_start-100 oui_translate-middle-x"):!t&&r?a.push("oui_top-0 oui_end-0 oui_translate-middle-y"):t&&r?a.push("oui_top-0 oui_start-100 oui_translate-middle"):a.push("oui_top-0 oui_end-0")),"center left"===e&&(t&&!r?a.push("oui_top-50 oui_start-0 oui_translate-middle"):!t&&r?a.push("oui_top-50 oui_start-0 oui_translate-middle-y"):t&&r?a.push("oui_top-50 oui_start-0 oui_translate-middle"):a.push("oui_top-50 oui_start-0 oui_translate-middle-y")),"center center"===e&&a.push("oui_top-50 oui_start-50 oui_translate-middle"),"center right"===e&&(t&&!r?a.push("oui_top-50 oui_start-100 oui_translate-middle"):!t&&r?a.push("oui_top-50 oui_end-0 oui_translate-middle-y"):t&&r?a.push("oui_top-50 oui_start-100 oui_translate-middle"):a.push("oui_top-50 oui_end-0 oui_translate-middle-y")),"bottom left"===e&&(t&&!r?a.push("oui_bottom-0 oui_start-0 oui_translate-middle-x"):!t&&r?a.push("oui_top-100 oui_start-0 oui_translate-middle-y"):t&&r?a.push("oui_top-100 oui_start-0 oui_translate-middle"):a.push("oui_bottom-0 oui_start-0")),"bottom center"===e&&(t&&!r?a.push("oui_bottom-0 oui_start-50 oui_translate-middle-x"):!t&&r||t&&r?a.push("oui_top-100 oui_start-50 oui_translate-middle"):a.push("oui_bottom-0 oui_start-50 oui_translate-middle-x")),"bottom right"===e&&(t&&!r?a.push("oui_bottom-0 oui_start-100 oui_translate-middle-x"):!t&&r?a.push("oui_top-100 oui_end-0 oui_translate-middle-y"):t&&r?a.push("oui_top-100 oui_start-100 oui_translate-middle"):a.push("oui_bottom-0 oui_end-0"))})(r,n,l)}if(e?.base?.display){const{header:t,container:a,row:r,grid:l,overflow:i,opacity:s,zIndex:u,visible:p}=e.base.display;t&&n("oui_header",t),a&&o("oui_",a),r&&o("oui_",r),l&&o("oui_",l),i&&n("oui_overflow",i),s&&n("oui_opacity",s),u&&n("oui_z",u),p&&o("oui_d",p)}return{inlineStyles:t,blockClasses:a.join(" ")}};var s=a(8055),u=a.n(s),p=a(3560),c=a.n(p);const b=window.ReactJSXRuntime,v=JSON.parse('{"UU":"origamiui/custom-container"}');var f;function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)({}).hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},d.apply(null,arguments)}var h=function(e){return t.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",width:24,height:24},e),f||(f=t.createElement("g",{fill:"none"},t.createElement("path",{d:"M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z"}),t.createElement("path",{fill:"#09244BFF",d:"M5 17a2 2 0 0 1 2 2v1a1 1 0 1 1-2 0v-1H4a1 1 0 1 1 0-2zm15 0a1 1 0 0 1 .117 1.993L20 19h-1v1a1 1 0 0 1-1.993.117L17 20v-1a2 2 0 0 1 1.85-1.995L19 17zM16 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2H8v8h8zM6 3a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a1 1 0 0 1 0-2h1V4a1 1 0 0 1 1-1m12 0a1 1 0 0 1 .993.883L19 4v1h1a1 1 0 0 1 .117 1.993L20 7h-1a2 2 0 0 1-1.995-1.85L17 5V4a1 1 0 0 1 1-1"}))))};(0,e.registerBlockType)(v.UU,{icon:(0,b.jsx)(h,{}),edit:function({attributes:e,setAttributes:a,clientId:s}){const{tagName:p,styles:v}=e,f=["top","bottom","left","right"],d=["row","column"],{inlineStyles:h,blockClasses:_}=(0,t.useMemo)((()=>i(v)),[v]),x=(e,t)=>{const r=u()(v);c()(r,e,t),a({styles:r})},g=(0,o.useBlockProps)({className:_,style:h}),y=["sm","md","lg"].map((e=>({name:e,title:e.toUpperCase()}))),m=p||"div",{innerBlockCount:j}=(0,l.useSelect)((e=>({innerBlockCount:e("core/block-editor").getBlockCount(s)})),[s]),w=(0,o.useInnerBlocksProps)(g,{renderAppender:j>0?void 0:()=>(0,b.jsx)(o.ButtonBlockAppender,{rootClientId:s})});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(o.InspectorControls,{children:[(0,b.jsx)(n.PanelBody,{title:(0,r.__)("Container Settings","origamiui"),children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)("Container","origamiui"),value:v.base.display.container,options:[{label:"---",value:"---"},{label:"container",value:"container"},{label:"container-fluid",value:"container-fluid"}],onChange:e=>x("base.display.container",e)})}),(0,b.jsxs)(n.PanelBody,{title:(0,r.__)("Sizing Settings","origamiui"),initialOpen:!1,children:[(0,b.jsx)(n.__experimentalUnitControl,{label:(0,r.__)("--size","origamiui"),value:v.base.sizing.size,onChange:e=>x("base.sizing.size",e),units:[{value:"%",label:"%"},{value:"px",label:"px"}]}),(0,b.jsx)(n.TabPanel,{tabs:y,onSelect:()=>{},children:e=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(n.__experimentalHeading,{style:{marginTop:"1.5em"},children:(0,r.__)("Width & Height Settings","origamiui")}),(0,b.jsxs)(n.Flex,{style:{flexWrap:"wrap"},children:[(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Width (${e.title})`,"origamiui"),value:v.base.sizing.width[e.name],options:[{label:"---",value:"---"},{label:`${parseFloat(v.base.sizing.size)}`,value:"1"},{label:""+2*parseFloat(v.base.sizing.size),value:"2"},{label:""+3*parseFloat(v.base.sizing.size),value:"3"},{label:""+4*parseFloat(v.base.sizing.size),value:"4"},{label:""+5*parseFloat(v.base.sizing.size),value:"5"},{label:""+6*parseFloat(v.base.sizing.size),value:"6"},{label:""+7*parseFloat(v.base.sizing.size),value:"7"},{label:""+8*parseFloat(v.base.sizing.size),value:"8"},{label:""+9*parseFloat(v.base.sizing.size),value:"9"},{label:""+10*parseFloat(v.base.sizing.size),value:"10"}],onChange:t=>x(`base.sizing.width.${e.name}`,t)})}),(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Height (${e.title})`,"origamiui"),value:v.base.sizing.height[e.name],options:[{label:"---",value:"---"},{label:`${parseFloat(v.base.sizing.size)}`,value:"1"},{label:""+2*parseFloat(v.base.sizing.size),value:"2"},{label:""+3*parseFloat(v.base.sizing.size),value:"3"},{label:""+4*parseFloat(v.base.sizing.size),value:"4"},{label:""+5*parseFloat(v.base.sizing.size),value:"5"},{label:""+6*parseFloat(v.base.sizing.size),value:"6"},{label:""+7*parseFloat(v.base.sizing.size),value:"7"},{label:""+8*parseFloat(v.base.sizing.size),value:"8"},{label:""+9*parseFloat(v.base.sizing.size),value:"9"},{label:""+10*parseFloat(v.base.sizing.size),value:"10"}],onChange:t=>x(`base.sizing.height.${e.name}`,t)})})]})]})})]}),(0,b.jsx)(n.PanelBody,{title:(0,r.__)("Flex&Grid Settings","origamiui"),initialOpen:!1,children:(0,b.jsx)(n.TabPanel,{tabs:y,onSelect:()=>{},children:e=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(n.__experimentalHeading,{style:{marginTop:"1.5em"},children:(0,r.__)("Flex Display Settings","origamiui")}),(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Flex Display (${e.title})`,"origamiui"),value:v.base.flex.display[e.name],options:[{label:"---",value:"---"},{label:"flex",value:"flex"},{label:"inline-flex",value:"inline-flex"}],onChange:t=>x(`base.flex.display.${e.name}`,t)}),(0,b.jsxs)(n.Flex,{style:{flexWrap:"wrap"},children:[(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Flex Direction (${e.title})`,"origamiui"),value:v.base.flex.direction[e.name],options:[{label:"---",value:"---"},{label:"row",value:"row"},{label:"column",value:"column"}],onChange:t=>x(`base.flex.direction.${e.name}`,t)})}),(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Flex Wrap (${e.title})`,"origamiui"),value:v.base.flex.wrap[e.name],options:[{label:"---",value:"---"},{label:"no wrap",value:"nowrap"},{label:"wrap",value:"wrap"}],onChange:t=>x(`base.flex.wrap.${e.name}`,t)})})]}),(0,b.jsxs)(n.Flex,{style:{flexWrap:"wrap"},children:[(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Align Items (${e.title})`,"origamiui"),value:v.base.flex.align[e.name],options:[{label:"---",value:"---"},{label:"start",value:"start"},{label:"end",value:"end"},{label:"center",value:"center"},{label:"baseline",value:"baseline"},{label:"stretch",value:"stretch"}],onChange:t=>x(`base.flex.align.${e.name}`,t)})}),(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Justify Content (${e.title})`,"origamiui"),value:v.base.flex.justify[e.name],options:[{label:"---",value:"---"},{label:"start",value:"start"},{label:"end",value:"end"},{label:"center",value:"center"},{label:"between",value:"between"},{label:"around",value:"around"},{label:"evenry",value:"evenry"}],onChange:t=>x(`base.flex.justify.${e.name}`,t)})})]}),(0,b.jsxs)(n.Flex,{style:{flexWrap:"wrap"},children:[(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Flex Grow (${e.title})`,"origamiui"),value:v.base.flex.grow[e.name],options:[{label:"---",value:"---"},{label:"grow",value:"grow-1"},{label:"no grow",value:"grow-0"}],onChange:t=>x(`base.flex.grow.${e.name}`,t)})}),(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Flex Shrink (${e.title})`,"origamiui"),value:v.base.flex.shrink[e.name],options:[{label:"---",value:"---"},{label:"shrink",value:"shrink-1"},{label:"no shrink",value:"shrink-0"}],onChange:t=>x(`base.flex.shrink.${e.name}`,t)})})]}),(0,b.jsxs)(n.Flex,{style:{flexWrap:"wrap"},children:[(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Flex Self (${e.title})`,"origamiui"),value:v.base.flex.self[e.name],options:[{label:"---",value:"---"},{label:"start",value:"start"},{label:"end",value:"end"},{label:"center",value:"center"},{label:"baseline",value:"baseline"},{label:"stretch",value:"stretch"}],onChange:t=>x(`base.flex.self.${e.name}`,t)})}),(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Flex Order (${e.title})`,"origamiui"),value:v.base.flex.order[e.name],options:[{label:"---",value:"---"},{label:"0",value:"0"},{label:"1",value:"1"},{label:"2",value:"2"},{label:"3",value:"3"},{label:"4",value:"4"},{label:"5",value:"5"}],onChange:t=>x(`base.flex.order.${e.name}`,t)})})]})]})})}),(0,b.jsxs)(n.PanelBody,{title:(0,r.__)("Spacing Settings","origamiui"),initialOpen:!1,children:[(0,b.jsx)(n.__experimentalUnitControl,{label:(0,r.__)("--space","origamiui"),value:v.base.spacing.space,onChange:e=>x("base.spacing.space",e),units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,b.jsx)(n.TabPanel,{tabs:y,onSelect:()=>{},children:e=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(n.__experimentalHeading,{style:{marginTop:"1.5em"},children:(0,r.__)("Margin Settings","origamiui")}),(0,b.jsx)(n.Flex,{style:{flexWrap:"wrap"},children:f.map((t=>(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:`${t} (${e.title})`,value:v.base.spacing.margin[t][e.name],options:[{label:"---",value:"---"},{label:""+-1*parseFloat(v.base.spacing.space),value:"n1"},{label:""+-2*parseFloat(v.base.spacing.space),value:"n2"},{label:""+-3*parseFloat(v.base.spacing.space),value:"n3"},{label:""+-4*parseFloat(v.base.spacing.space),value:"n4"},{label:""+-5*parseFloat(v.base.spacing.space),value:"n5"},{label:""+-6*parseFloat(v.base.spacing.space),value:"n6"},{label:""+-7*parseFloat(v.base.spacing.space),value:"n7"},{label:""+-8*parseFloat(v.base.spacing.space),value:"n8"},{label:""+-9*parseFloat(v.base.spacing.space),value:"n9"},{label:""+-10*parseFloat(v.base.spacing.space),value:"n10"},{label:0,value:"0"},{label:`${parseFloat(v.base.spacing.space)}`,value:"1"},{label:""+2*parseFloat(v.base.spacing.space),value:"2"},{label:""+3*parseFloat(v.base.spacing.space),value:"3"},{label:""+4*parseFloat(v.base.spacing.space),value:"4"},{label:""+5*parseFloat(v.base.spacing.space),value:"5"},{label:""+6*parseFloat(v.base.spacing.space),value:"6"},{label:""+7*parseFloat(v.base.spacing.space),value:"7"},{label:""+8*parseFloat(v.base.spacing.space),value:"8"},{label:""+9*parseFloat(v.base.spacing.space),value:"9"},{label:""+10*parseFloat(v.base.spacing.space),value:"10"}],onChange:a=>x(`base.spacing.margin.${t}.${e.name}`,a)},`${t}-${e.name}`)})))}),(0,b.jsx)(n.__experimentalHeading,{style:{marginTop:"1.5em"},children:(0,r.__)("Padding Settings","origamiui")}),(0,b.jsx)(n.Flex,{style:{flexWrap:"wrap"},children:f.map((t=>(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:`${t} (${e.title})`,value:v.base.spacing.padding[t][e.name],options:[{label:"---",value:"---"},{label:0,value:"0"},{label:`${parseFloat(v.base.spacing.space)}`,value:"1"},{label:""+2*parseFloat(v.base.spacing.space),value:"2"},{label:""+3*parseFloat(v.base.spacing.space),value:"3"},{label:""+4*parseFloat(v.base.spacing.space),value:"4"},{label:""+5*parseFloat(v.base.spacing.space),value:"5"},{label:""+6*parseFloat(v.base.spacing.space),value:"6"},{label:""+7*parseFloat(v.base.spacing.space),value:"7"},{label:""+8*parseFloat(v.base.spacing.space),value:"8"},{label:""+9*parseFloat(v.base.spacing.space),value:"9"},{label:""+10*parseFloat(v.base.spacing.space),value:"10"}],onChange:a=>x(`base.spacing.padding.${t}.${e.name}`,a)},`${t}-${e.name}`)})))}),(0,b.jsx)(n.__experimentalHeading,{style:{marginTop:"1.5em"},children:(0,r.__)("Gap Settings","origamiui")}),(0,b.jsx)(n.Flex,{style:{flexWrap:"wrap"},children:d.map((t=>(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:`${t} (${e.title})`,value:v.base.spacing.gap[t][e.name],options:[{label:"---",value:"---"},{label:`${parseFloat(v.base.spacing.space)}`,value:"1"},{label:""+2*parseFloat(v.base.spacing.space),value:"2"},{label:""+3*parseFloat(v.base.spacing.space),value:"3"},{label:""+4*parseFloat(v.base.spacing.space),value:"4"},{label:""+5*parseFloat(v.base.spacing.space),value:"5"},{label:""+6*parseFloat(v.base.spacing.space),value:"6"},{label:""+7*parseFloat(v.base.spacing.space),value:"7"},{label:""+8*parseFloat(v.base.spacing.space),value:"8"},{label:""+9*parseFloat(v.base.spacing.space),value:"9"},{label:""+10*parseFloat(v.base.spacing.space),value:"10"}],onChange:a=>x(`base.spacing.gap.${t}.${e.name}`,a)},`${t}-${e.name}`)})))})]})})]}),(0,b.jsx)(n.PanelBody,{title:(0,r.__)("Position Settings","origamiui"),initialOpen:!1,children:(0,b.jsx)(n.TabPanel,{tabs:y,onSelect:()=>{},children:e=>(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(n.Flex,{style:{flexWrap:"wrap",marginTop:"1.5em"},children:(0,b.jsx)(n.FlexItem,{style:{width:"45%"},children:(0,b.jsx)(n.SelectControl,{label:(0,r.__)(`Position (${e.title})`,"origamiui"),value:v.base.position.className[e.name],options:[{label:"---",value:"---"},{label:"static",value:"static"},{label:"relative",value:"relative"}],onChange:t=>x(`base.position.className.${e.name}`,t)})})})})})}),(0,b.jsxs)(n.PanelBody,{title:(0,r.__)("Display Settings","origamiui"),initialOpen:!1,children:[(0,b.jsx)(n.SelectControl,{label:(0,r.__)("Overflow","origamiui"),value:v.base.display.overflow,options:[{label:"---",value:"---"},{label:"auto",value:"auto"},{label:"hidden",value:"hidden"},{label:"visible",value:"visible"},{label:"scroll",value:"scroll"}],onChange:e=>x("base.display.overflow",e)}),(0,b.jsx)(n.SelectControl,{label:(0,r.__)("Opacity","origamiui"),value:v.base.display.opacity,options:[{label:"---",value:"---"},{label:"100%",value:"100"},{label:"75%",value:"75"},{label:"50%",value:"50"},{label:"25%",value:"25"},{label:"0",value:"0"}],onChange:e=>x("base.display.opacity",e)}),(0,b.jsx)(n.SelectControl,{label:(0,r.__)("z-index","origamiui"),value:v.base.display.zIndex,options:[{label:"---",value:"---"},{label:"3",value:"3"},{label:"2",value:"2"},{label:"1",value:"1"},{label:"0",value:"0"},{label:"-1",value:"n1"}],onChange:e=>x("base.display.zIndex",e)}),(0,b.jsx)(n.SelectControl,{label:(0,r.__)("HTML Tag","origamiui"),value:p,options:[{label:"div",value:"div"},{label:"main",value:"main"},{label:"header",value:"header"},{label:"footer",value:"footer"},{label:"article",value:"article"}],onChange:e=>a({tagName:e})})]})]}),(0,b.jsx)(m,{...w})]})},save:function({attributes:e}){const{tagName:t,styles:a}=e,{inlineStyles:r,blockClasses:n}=i(a),l=o.useBlockProps.save({className:n,style:r}),s=t||"div";return(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(s,{...l,children:(0,b.jsx)(o.InnerBlocks.Content,{})})})}})})()})();