(()=>{"use strict";const e=window.wc.blocksCheckout,t=window.wp.element,o=window.wp.i18n,n=window.wp.data,{ExperimentalOrderMeta:l}=wc.blocksCheckout;function i({handleDeliveryPointChange:e,inpostDeliveryPoint:o}){return(0,t.createElement)("div",{className:"inpost-parcel-locker-wrap",style:{display:"none"}},(0,t.createElement)("input",{value:o,type:"text",id:"inpost-parcel-locker-id",onChange:e,required:!0}))}const a=JSON.parse('{"apiVersion":2,"name":"inpost-pl/inpost-pl-block","version":"2.0.0","title":"Inpost PL Shipping Options Block","category":"woocommerce","description":"Adds map button and add input to save delivery point data.","supports":{"html":false,"align":false,"multiple":false,"reusable":false},"parent":["woocommerce/checkout-shipping-methods-block"],"attributes":{"lock":{"type":"object","default":{"remove":true,"move":true}},"text":{"type":"string","source":"html","selector":".wp-block-inpost-pl","default":""}},"textdomain":"woocommerce-inpost","editorStyle":""}');(0,e.registerCheckoutBlock)({metadata:a,component:({checkoutExtensionData:e,extensions:a})=>{let s=!1,c=null;const[r,p]=(0,t.useState)(""),{setExtensionData:d}=e,u="inpost-pl-delivery-point-error",{setValidationErrors:m,clearValidationError:h}=(0,n.useDispatch)("wc/store/validation");let k=(0,n.useSelect)((e=>e("wc/store/cart").getShippingRates()));if(null!=k){let e=k[Object.keys(k)[0]];if(null!=e&&e.hasOwnProperty("shipping_rates")){const t=e.shipping_rates,o=[];if(null!=t){for(let e of t)"pickup_location"!==e.method_id&&(!0===e.selected&&(c=e.instance_id,-1!==e.method_id.indexOf("easypack_parcel_machines")&&(s=!0)),o.push(e));if(!c&&o.length>0){const e=document.getElementsByClassName("wc-block-components-shipping-rates-control")[0];if(null!=e){const t=e.querySelector('input[name^="radio-control-"]:checked');if(null!=t){let e=t.getAttribute("id");null!=e&&-1!==e.split(":")[0].indexOf("easypack_parcel_machines")&&(s=!0)}}}}}}const w=(0,t.useCallback)((()=>{s&&!r&&m({[u]:{message:(0,o.__)("Parcel locker must be choosen.","woocommerce-inpost"),hidden:!0}})}),[r,m,h,s]),_=(0,t.useCallback)((()=>{if(r||!s)return h(u),!0}),[r,m,h,s]);return(0,t.useEffect)((()=>{w(),_(),d("inpost","inpost-parcel-locker-id",r)}),[r,d,_]),(0,t.createElement)(t.Fragment,null,s&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)("button",{className:"button alt easypack_show_geowidget",id:"easypack_block_type_geowidget"},(0,o.__)("Wybierz paczkomat","woocommerce-inpost")),(0,t.createElement)("div",{id:"inpost_pl_selected_point_data_wrap",className:"inpost_pl_selected_point_data_wrap",style:{display:"none"}}),(0,t.createElement)(l,null,(0,t.createElement)(i,{inpostDeliveryPoint:r,handleDeliveryPointChange:e=>{const t=e.target.value;p(t)}}))))}})})();