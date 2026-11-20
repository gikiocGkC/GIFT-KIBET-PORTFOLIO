const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".navigation");
if(menuButton&&nav){
  menuButton.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));
    menuButton.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  });
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.setAttribute("aria-label","Open navigation");
  }));
}
const year=document.getElementById("year");
if(year) year.textContent=new Date().getFullYear();
const filters=document.querySelectorAll("[data-filter]");
const cards=document.querySelectorAll(".work-card");
filters.forEach(button=>button.addEventListener("click",()=>{
  const category=button.dataset.filter;
  filters.forEach(item=>{
    const active=item===button;
    item.classList.toggle("active",active);
    item.setAttribute("aria-pressed",String(active));
  });
  cards.forEach(card=>{
    card.hidden=category!=="all"&&card.dataset.category!==category;
  });
}));
