import{a as S,S as P,i as l}from"./assets/vendor-CIF6YjI2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const q="https://pixabay.com/api/",p=15;async function y(o,s){const e={key:"55960662-5976d34f2ed07da81c3dd4b18",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:s};return(await S.get(q,{params:e})).data}const c=document.querySelector(".gallery"),m=document.querySelector(".loader"),n=document.querySelector(".more-btn"),B=new P(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"});function M(){c&&(c.innerHTML="")}function h(o){const s=o.map(e=>`<li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
            <img
                class="gallery-image"
                src="${e.webformatURL}"
                alt="${e.tags}"
            />
            </a>
            <ul class="comment-list">
                <li class="comment-item">
                    <p class=comment-title>Likes</p>
                    <p class=comment-value>${e.likes}</p>
                </li>
                <li class="comment-item">
                    <p class=comment-title>Views</p>
                    <p class=comment-value>${e.views}</p>
                </li>
                <li class="comment-item">
                    <p class=comment-title>Comments</p>
                    <p class=comment-value>${e.comments}</p>
                </li>
                <li class="comment-item">
                    <p class=comment-title>Downloads</p>
                    <p class=comment-value>${e.downloads}</p>
                </li>
            </ul>
        </li>`).join("");c&&(c.insertAdjacentHTML("beforeend",s),B.refresh())}function g(){m&&m.classList.remove("hidden")}function L(){m&&m.classList.add("hidden")}function I(){n&&n.classList.remove("hidden")}function b(){n&&n.classList.add("hidden")}const u={messageColor:"black",backgroundColor:"lightblue",position:"topRight",progressBar:!1,timeout:4e3},$=document.querySelector(".form");let i=1,v=1,f="";$.addEventListener("submit",x);n.addEventListener("click",C);async function x(o){o.preventDefault(),M();const s=o.target.elements["search-text"];if(!s.value.trim()){s.value="";return}i=1,f=s.value.trim(),b(),g();try{const e=await y(f,i);if(!e.hits.length){l.show({message:"Sorry, there are no images matching your search query. Please try again!",...u});return}v=Math.ceil(e.totalHits/p),h(e.hits),w(),o.target.reset();const a=document.querySelector(".gallery-item");heightImage=a.getBoundingClientRect().height*2}catch{l.show({message:"Server Pixabay is not available",...u})}finally{L()}}async function C(){i+=1,b(),g();try{const o=await y(f,i);h(o.hits),O(),w()}catch{l.show({message:"Server Pixabay is not available",...u})}finally{L()}}function w(){i<v?I():l.show({message:"We're sorry, but you've reached the end of search results.",...u})}function O(){const o=document.querySelector(".gallery-item");if(!o)return;const s=o.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
