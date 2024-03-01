import{s as y}from"./basecomponent.esm.fyMRs3Zi.js";import{O as f,P as b,a0 as v,U as o}from"./entry.rB01nS72.js";var h=`
.p-icon {
    display: inline-block;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,g=f.extend({name:"baseicon",css:h});function a(e){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(i){w(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function w(e,t,n){return t=k(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){var t=O(e,"string");return a(t)=="symbol"?t:String(t)}function O(e,t){if(a(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(a(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var U={name:"BaseIcon",extends:y,props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},style:g,methods:{pti:function(){var t=b.isEmpty(this.label);return l(l({},!this.isUnstyled&&{class:["p-icon",{"p-icon-spin":this.spin}]}),{},{role:t?void 0:"img","aria-label":t?void 0:this.label,"aria-hidden":t})}}},A={root:"p-ink"},S=f.extend({name:"ripple",classes:A}),E=v.extend({style:S});function j(e){return I(e)||_(e)||x(e)||P()}function P(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function x(e,t){if(e){if(typeof e=="string")return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}}function _(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function I(e){if(Array.isArray(e))return s(e)}function s(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var C=E.extend("ripple",{mounted:function(t){var n,i=t==null||(n=t.$instance)===null||n===void 0?void 0:n.$config;i&&i.ripple&&(this.create(t),this.bindEvents(t),t.setAttribute("data-pd-ripple",!0))},unmounted:function(t){this.remove(t)},timeout:void 0,methods:{bindEvents:function(t){t.addEventListener("mousedown",this.onMouseDown.bind(this))},unbindEvents:function(t){t.removeEventListener("mousedown",this.onMouseDown.bind(this))},create:function(t){var n=o.createElement("span",{role:"presentation","aria-hidden":!0,"data-p-ink":!0,"data-p-ink-active":!1,class:!this.isUnstyled()&&this.cx("root"),onAnimationEnd:this.onAnimationEnd.bind(this),"p-bind":this.ptm("root")});t.appendChild(n),this.$el=n},remove:function(t){var n=this.getInk(t);n&&(this.unbindEvents(t),n.removeEventListener("animationend",this.onAnimationEnd),n.remove())},onMouseDown:function(t){var n=this,i=t.currentTarget,r=this.getInk(i);if(!(!r||getComputedStyle(r,null).display==="none")){if(!this.isUnstyled()&&o.removeClass(r,"p-ink-active"),r.setAttribute("data-p-ink-active","false"),!o.getHeight(r)&&!o.getWidth(r)){var u=Math.max(o.getOuterWidth(i),o.getOuterHeight(i));r.style.height=u+"px",r.style.width=u+"px"}var p=o.getOffset(i),d=t.pageX-p.left+document.body.scrollTop-o.getWidth(r)/2,m=t.pageY-p.top+document.body.scrollLeft-o.getHeight(r)/2;r.style.top=m+"px",r.style.left=d+"px",!this.isUnstyled()&&o.addClass(r,"p-ink-active"),r.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(function(){r&&(!n.isUnstyled()&&o.removeClass(r,"p-ink-active"),r.setAttribute("data-p-ink-active","false"))},401)}},onAnimationEnd:function(t){this.timeout&&clearTimeout(this.timeout),!this.isUnstyled()&&o.removeClass(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")},getInk:function(t){return t&&t.children?j(t.children).find(function(n){return o.getAttribute(n,"data-pc-name")==="ripple"}):void 0}}});export{C as R,U as s};
