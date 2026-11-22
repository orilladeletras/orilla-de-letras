/* cruces.js: muestra 3 cruces del Plata y deja el resto en un desplegable (hover en escritorio, toque en celular).
   También pinta de verde, con textura de pincelada, los botones de los dos desplegables (autores y cruces). */
(function(){
  var grid=document.getElementById('cruzgrid');if(!grid)return;
  var MAX=3,abierto=false,btn=document.createElement('button');
  btn.type='button';btn.id='vermas-cruces';btn.className='vermas';btn.setAttribute('aria-controls','cruzgrid');btn.setAttribute('aria-expanded','false');
  grid.insertAdjacentElement('afterend',btn);
  var svg="<svg xmlns='http://www.w3.org/2000/svg' width='320' height='90'><filter id='f' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='0.006 0.2' numOctaves='3' seed='7'/><feColorMatrix values='0 0 0 0 .78  0 0 0 0 .9  0 0 0 0 .62  0 0 0 1.1 -.42'/></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>";
  var tex='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
  var st=document.createElement('style');
  st.textContent=
   '#cruzgrid .cruz.oculta{display:none!important}'
  +'#cruzgrid .cruz.entra{animation:cruzIn .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d2,0ms)}'
  +'@keyframes cruzIn{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}'
  +'.vermas{position:relative;overflow:hidden;color:#f6f1e1;border:1px solid #1d3f24;border-radius:6px;'
  +'background:'+tex+',linear-gradient(100deg,rgba(255,255,255,.12),transparent 40%,rgba(0,0,0,.18)),linear-gradient(180deg,#4a7c45,#2f5d34);background-size:320px 90px,100% 100%,100% 100%;'
  +'box-shadow:inset 0 0 0 3px rgba(255,255,255,.1),inset 0 -6px 10px -6px rgba(0,0,0,.35),0 12px 20px -14px rgba(0,0,0,.65);text-shadow:0 1px 0 rgba(0,0,0,.35)}'
  +'.vermas:hover,.vermas:focus-visible{background:'+tex+',linear-gradient(100deg,rgba(255,255,255,.18),transparent 40%,rgba(0,0,0,.14)),linear-gradient(180deg,#548a4e,#386b3d);background-size:320px 90px,100% 100%,100% 100%;color:#fff}'
  +'.vermas small{color:#d6e6c3}'
  +'@media (prefers-reduced-motion:reduce){#cruzgrid .cruz.entra{animation:none}}';
  document.head.appendChild(st);
  var fino=matchMedia('(hover: hover) and (pointer: fine)').matches;
  function aplica(animar){
    var cs=[].slice.call(grid.querySelectorAll('.cruz')),extra=cs.length-MAX;
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
    btn.innerHTML=abierto?'<span>Mostrar menos</span><span class="fl" aria-hidden="true">▾</span>':'<span>Ver los '+extra+' cruces restantes</span><span class="fl" aria-hidden="true">▾</span>';
  }
  function abre(v){if(abierto===v)return;abierto=v;aplica(true)}
  btn.addEventListener('click',function(){abre(!abierto);if(!abierto)grid.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});
  if(fino)btn.addEventListener('pointerenter',function(){abre(true)});
  new MutationObserver(function(){aplica(false)}).observe(grid,{childList:true});
  aplica(false);
})();
