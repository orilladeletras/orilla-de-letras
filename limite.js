/* limite.js: muestra 12 autores y deja el resto en un desplegable (hover en escritorio, toque en celular). */
(function(){
  var grid=document.getElementById('grid');if(!grid)return;
  var MAX=12,abierto=false,btn=document.createElement('button');
  btn.type='button';btn.id='vermas';btn.className='vermas';btn.setAttribute('aria-controls','grid');btn.setAttribute('aria-expanded','false');
  grid.insertAdjacentElement('afterend',btn);
  var st=document.createElement('style');
  st.textContent=
   '#grid .card.oculta{display:none!important}'
  +'#grid .card.entra{animation:cardIn .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d2,0ms)}'
  +'@keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}'
  +'.vermas{display:flex;align-items:center;justify-content:center;gap:12px;margin:28px auto 8px;min-height:56px;padding:12px 28px;background:#f4ecd8;color:#2a1d0e;border:1px solid #b9a678;border-radius:3px;font:400 20px/1.1 "Instrument Serif",Georgia,serif;cursor:pointer;box-shadow:inset 0 0 0 3px #f4ecd8,inset 0 0 0 4px #c9b98a,0 12px 20px -14px rgba(0,0,0,.65);transition:transform .2s,box-shadow .2s,background .2s}'
  +'.vermas[hidden]{display:none}'
  +'.vermas:hover,.vermas:focus-visible{background:#fffaf0;transform:translateY(-2px)}'
  +'.vermas:focus-visible{outline:3px solid #ffd84a;outline-offset:3px}'
  +'.vermas .fl{display:inline-block;transition:transform .3s}'
  +'.vermas[aria-expanded=true] .fl{transform:rotate(180deg)}'
  +'.vermas small{font:500 11px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#8a7648}'
  +'@media (max-width:719px){.vermas{width:100%;margin-top:20px}}'
  +'@media (prefers-reduced-motion:reduce){#grid .card.entra{animation:none}}';
  document.head.appendChild(st);
  var fino=matchMedia('(hover: hover) and (pointer: fine)').matches;
  function aplica(animar){
    var cs=[].slice.call(grid.querySelectorAll('.card')),extra=cs.length-MAX;
    if(extra<=0){btn.hidden=true;cs.forEach(function(c){c.classList.remove('oculta')});return}
    btn.hidden=false;
    cs.forEach(function(c,i){
      var oculto=!abierto&&i>=MAX;
      if(oculto){c.classList.add('oculta');c.classList.remove('entra')}
      else{
        var estaba=c.classList.contains('oculta');
        c.classList.remove('oculta');
        if(c.classList.contains('rv'))c.classList.add('in');
        if(animar&&estaba){c.style.setProperty('--d2',Math.min((i-MAX)*25,500)+'ms');c.classList.remove('entra');void c.offsetWidth;c.classList.add('entra')}
      }
    });
    btn.setAttribute('aria-expanded',abierto?'true':'false');
    btn.innerHTML=abierto?'<span>Mostrar menos</span><span class="fl" aria-hidden="true">▾</span>':'<span>Ver los '+extra+' autores restantes</span><span class="fl" aria-hidden="true">▾</span>';
  }
  function abre(v){if(abierto===v)return;abierto=v;aplica(true)}
  btn.addEventListener('click',function(){abre(!abierto);if(!abierto)grid.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});
  if(fino)btn.addEventListener('pointerenter',function(){abre(true)});
  new MutationObserver(function(){aplica(false)}).observe(grid,{childList:true});
  aplica(false);
})();
