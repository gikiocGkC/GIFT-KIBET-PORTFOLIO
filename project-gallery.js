/* Accessible portfolio image viewer. Gallery images opt in with data-lightbox. */
(()=>{
 const images=[...document.querySelectorAll("[data-lightbox]")];
 if(!images.length)return;
 const dialog=document.createElement("dialog");
 dialog.className="image-lightbox";
 dialog.setAttribute("aria-label","Expanded project image");
 dialog.innerHTML='<button class="lightbox-close" type="button" aria-label="Close image viewer">×</button><button class="lightbox-prev" type="button" aria-label="Previous image">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lightbox-next" type="button" aria-label="Next image">›</button>';
 document.body.append(dialog);
 const img=dialog.querySelector("img"),caption=dialog.querySelector("figcaption");
 let index=0,lastFocus=null;
 const show=(n)=>{index=(n+images.length)%images.length;const source=images[index];img.src=source.currentSrc||source.src;img.alt=source.alt||"";caption.textContent=source.dataset.caption||source.alt||"";};
 const close=()=>dialog.close();
 images.forEach((image,i)=>{
  image.tabIndex=0;image.setAttribute("role","button");image.setAttribute("aria-label","Enlarge image: "+(image.alt||"Project image"));
  image.addEventListener("click",()=>{lastFocus=image;show(i);dialog.showModal();dialog.querySelector(".lightbox-close").focus();});
  image.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();image.click();}});
 });
 dialog.querySelector(".lightbox-close").addEventListener("click",close);
 dialog.querySelector(".lightbox-prev").addEventListener("click",()=>show(index-1));
 dialog.querySelector(".lightbox-next").addEventListener("click",()=>show(index+1));
 dialog.addEventListener("click",e=>{if(e.target===dialog)close();});
 dialog.addEventListener("close",()=>lastFocus?.focus());
 dialog.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){e.preventDefault();show(index-1);}if(e.key==="ArrowRight"){e.preventDefault();show(index+1);}});
})();