import{d as f}from"./composables.PaokOPte.js";import{p as v}from"./auth.dUEvqXD4.js";import{L as y,n as g,M as h,G as a,w as t,D as o,o as n,b as c,a as s,t as u}from"./entry.rB01nS72.js";import{_ as w}from"./_plugin-vue_export-helper.x3n3nnut.js";const k={name:"Product",setup(){const _=v();y();const p=g({product:null}),e=async()=>{};return h(()=>{e()}),{definePageMeta:f,prodStore:_,state:p,get_product:e}}},x={class:"p-5"};function B(_,p,e,r,M,S){const l=o("v-col"),d=o("v-row"),i=o("v-progress-circular"),m=o("v-container");return n(),a(m,{fluid:""},{default:t(()=>[r.state.product?(n(),a(d,{key:0},{default:t(()=>[c(l,null,{default:t(()=>[s("h1",null,u(r.state.product.name),1),s("p",null,u(r.state.product.price.formatted_with_symbol),1)]),_:1})]),_:1})):(n(),a(d,{key:1},{default:t(()=>[c(l,null,{default:t(()=>[s("div",x,[c(i,{indeterminate:"",color:"primary"})])]),_:1})]),_:1}))]),_:1})}const P=w(k,[["render",B]]);export{P as default};
