const counterUp=(t,e={})=>{const{action:n="start",duration:i=1e3,delay:o=16,lang:r}=e;if("stop"===n)return void stopCountUp(t);if(stopCountUp(t),!/[0-9]/.test(t.innerHTML))return;const l=divideNumbers(t.innerHTML,{duration:i||t.getAttribute("data-duration"),lang:r||document.querySelector("html").getAttribute("lang")||void 0,delay:o||t.getAttribute("data-delay")});t._countUpOrigInnerHTML=t.innerHTML,t.innerHTML=l[0],t.style.visibility="visible";const u=function(){t.innerHTML=l.shift(),l.length?(clearTimeout(t.countUpTimeout),t.countUpTimeout=setTimeout(u,o)):t._countUpOrigInnerHTML=void 0};t.countUpTimeout=setTimeout(u,o)},stopCountUp=t=>{clearTimeout(t.countUpTimeout),t._countUpOrigInnerHTML&&(t.innerHTML=t._countUpOrigInnerHTML,t._countUpOrigInnerHTML=void 0),t.style.visibility=""},divideNumbers=(t,e={})=>{const{duration:n=1e3,delay:i=16,lang:o}=e,r=n/i,l=t.toString().split(/(<[^>]+>|[0-9.][,.0-9]*[0-9]*)/),u=[];for(let t=0;t<r;t++)u.push("");for(let t=0;t<l.length;t++)if(/([0-9.][,.0-9]*[0-9]*)/.test(l[t])&&!/<[^>]+>/.test(l[t])){let e=l[t];const n=/[0-9]+,[0-9]+/.test(e);e=e.replace(/,/g,"");const i=/^[0-9]+\.[0-9]+$/.test(e),s=i?(e.split(".")[1]||[]).length:0;let a=u.length-1;for(let t=r;t>=1;t--){let l=parseInt(e/r*t,10);i&&(l=parseFloat(e/r*t).toFixed(s),l=parseFloat(l).toLocaleString(o)),n&&(l=l.toLocaleString(o)),u[a--]+=l}}else for(let e=0;e<r;e++)u[e]+=l[t];return u[u.length]=t.toString(),u};