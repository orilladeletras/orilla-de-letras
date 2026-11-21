/* tarjetas.js: color por época, foco de luz que sigue el puntero, leve inclinación y entrada escalonada en las tarjetas de autores. */
(function(){
  var grid=document.getElementById('grid');
  if(!grid||typeof A==='undefined')return;
  var EPOCA={e1:'#9a6b2f',e2:'#1f8a70',e3:'#7a3f8f',e4:'#b3263e',e5:'#0e8fa8'};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fino=matchMedia('(hover: hover) and (pointer: fine)').matches;
  var st=document.createElement('style');
  st.textContent=
   '#grid .card{--e:#9a6b2f;--mx:50%;--my:50%;--rx:0deg;--ry:0deg;transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .25s}'
  +'#grid .card[data-era=e1]{--e:'+EPOCA.e1+'}#grid .card[data-era=e2]{--e:'+EPOCA.e2+'}#grid .card[data-era=e3]{--e:'+EPOCA.e3+'}#grid .card[data-era=e4]{--e:'+EPOCA.e4+'}#grid .card[data-era=e5]{--e:'+EPOCA.e5+'}'
  +'#grid .card{background:linear-gradient(155deg,var(--card) 38%,color-mix(in srgb,var(--c) 9%,var(--card)) 70%,color-mix(in srgb,var(--e) 14%,var(--card)))}'
  +'#grid .card .mono{color:color-mix(in srgb,var(--e) 17%,transparent)}'
  +'#grid .card:hover .mono{color:color-mix(in srgb,var(--e) 30%,transparent)}'
  +'#grid .card .yrs{color:color-mix(in srgb,var(--e) 78%,var(--muted));font-weight:500;display:flex;align-items:center;gap:8px}'
  +'#grid .card .yrs::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--e);box-shadow:0 0 0 3px color-mix(in srgb,var(--e) 22%,transparent);flex:none}'
  +'#grid .card h3{background:linear-gradient(90deg,var(--c),var(--e)) 0 100%/0 3px no-repeat;padding-bottom:4px;transition:background-size .45s cubic-bezier(.2,.8,.2,1)}'
  +'#grid .card:hover h3,#grid .card:focus-visible h3{background-size:100% 3px}'
  +'#grid .card>span.glow{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(260px circle at var(--mx) var(--my),color-mix(in srgb,var(--e) 22%,transparent),transparent 65%)}'
  +'#grid .card:hover>span.glow{opacity:1}'
  +'#grid .card>span.go{position:absolute;top:14px;right:14px;z-index:2;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font:500 15px/1 var(--mono,monospace);color:#fff;background:var(--e);box-shadow:0 6px 14px -6px var(--e);opacity:0;transform:translateX(-8px) scale(.8);transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1)}'
  +'#grid .card:hover>span.go,#grid .card:focus-visible>span.go{opacity:1;transform:none}'
  +'#grid .card:active{transform:scale(.985)}'
  +'#grid .card.rv{opacity:0;transform:translateY(18px)}'
  +'#grid .card.rv.in{opacity:1;transform:none;transition:opacity .6s ease var(--d,0ms),transform .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms)}'
  +'@media (hover:hover) and (pointer:fine){#grid .card:hover{transform:perspective(900px) translateY(-6px) rotateX(var(--rx)) rotateY(var(--ry))}}'
  +'@media (prefers-reduced-motion:reduce){#grid .card,#grid .card h3,#grid .card>span.go{transition:none}#grid .card.rv{opacity:1;transform:none}}';
  document.head.appendChild(st);

  var io=('IntersectionObserver' in window)&&!reduce?new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{rootMargin:'0px 0px -6% 0px',threshold:.08}):null;

  function mejora(){
    var cols=Math.max(1,Math.round(grid.clientWidth/(grid.firstElementChild?grid.firstElementChild.offsetWidth+24:300)));
    grid.querySelectorAll('.card:not([data-era])').forEach(function(c,i){
      var a=A.find(function(x){return x.id===c.dataset.id});
      c.setAttribute('data-era',a?a.e:'e1');
      var g=document.createElement('span');g.className='glow';g.setAttribute('aria-hidden','true');c.insertBefore(g,c.firstChild);
      var go=document.createElement('span');go.className='go';go.setAttribute('aria-hidden','true');go.textContent='→';c.appendChild(go);
      if(io){c.classList.add('rv');c.style.setProperty('--d',(i%cols)*70+'ms');io.observe(c)}
    });
  }
  if(fino&&!reduce){
    var raf=0;
    grid.addEventListener('pointermove',function(ev){
      var c=ev.target.closest&&ev.target.closest('.card');if(!c)return;
      if(raf)return;
      raf=requestAnimationFrame(function(){raf=0;
        var r=c.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width,y=(ev.clientY-r.top)/r.height;
        c.style.setProperty('--mx',(x*100).toFixed(1)+'%');c.style.setProperty('--my',(y*100).toFixed(1)+'%');
        c.style.setProperty('--ry',((x-.5)*5).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y)*4).toFixed(2)+'deg');
      });
    });
    grid.addEventListener('pointerout',function(ev){var c=ev.target.closest&&ev.target.closest('.card');if(c){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});
  }
  mejora();
  new MutationObserver(mejora).observe(grid,{childList:true});
})();
/*foto-chica*/(function(){var s=document.createElement('style');s.textContent='#autos .foto{max-width:360px;margin-inline:auto}#autos .foto img{width:100%;height:auto;display:block}';document.head.appendChild(s)})();
