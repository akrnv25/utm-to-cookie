(()=>{document.addEventListener("DOMContentLoaded",(function(){const t=a(),r={...n(window.location.href),timestamp:Date.now()},s=!!r.searchParams.length,o=!t.firstVisit,i={firstVisit:o?r:t.firstVisit,lastVisit:r,firstMarkedVisit:o&&s?r:t.firstMarkedVisit,lastMarkedVisit:s?r:t.lastMarkedVisit};var c;(c=[{key:e,value:JSON.stringify(i)}])?.length&&c.forEach((e=>{e.key&&e.value&&(document.cookie=encodeURIComponent(e.key)+"="+encodeURIComponent(e.value))})),console.log(a())}));const e="userActions",t={firstVisit:null,lastVisit:null,firstMarkedVisit:null,lastMarkedVisit:null};function a(){const a=(document.cookie?.split(";")??[]).map((e=>{const[t,a]=e.trim().split("=");return{key:decodeURIComponent(t),value:decodeURIComponent(a)}})).find((t=>t.key===e))?.value;if(!a)return t;try{return JSON.parse(a)}catch(e){return t}}function n(e){const t=new URL(e),{href:a,hostname:n,port:r,pathname:s}=t,o=t.protocol.replace(":",""),i=t.hash.replace("#","");return{href:a,protocol:o,hostname:n,port:r,pathname:s,searchParams:Array.from(t.searchParams.keys()).map((e=>({key:e,value:t.searchParams.get(e)}))),hash:i}}})();