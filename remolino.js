/* remolino.js: los autores como un tubo (silo) vertical que gira, sin marco.
   Cada fila gira en sentido opuesto a la vecina. Profundidad: lo que pasa por detrás se aleja y se apaga; lo que pasa por delante
   crece y se enciende. Apuntar una tarjeta frena el giro; tocarla hace caer las demás al eje del tubo y abre la ficha; al cerrarla todo vuelve.
   La vista "Lista" conserva la grilla. Se alimenta de las tarjetas de #grid, así que respeta filtros y búsqueda. */
(function(){
  var grid=document.getElementById('grid');if(!grid||typeof A==='undefined')return;
  var panel=document.getElementById('panel');
  var ANCHO=118,ALTO=88,SEP_X=16,SEP_Y=16,FILAS=5,TILT=-16;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  var st=document.createElement('style');
  st.textContent=
   '@property --k{syntax:"<number>";inherits:true;initial-value:1}'
  +'.orb{--tilt:'+TILT+'deg;position:relative;height:620px;margin:8px 0;perspective:1250px;perspective-origin:50% 30%}'
  +'.orb .disc{position:absolute;left:50%;top:48%;width:0;height:0;transform-style:preserve-3d;transform:rotateX(var(--tilt)) scale3d(var(--s,1),var(--s,1),var(--s,1))}'
  +'.orb .ring{position:absolute;left:0;top:var(--y,0px);width:0;height:0;transform-style:preserve-3d;animation:orbGiro var(--d,60s) linear infinite}'
  +'.orb .slot{position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d;transform:rotateY(var(--a)) translateZ(calc(var(--r) * var(--k)));transition:--k 1.1s cubic-bezier(.6,0,.4,1)}'
  +'.orb .oc{position:absolute;left:'+(-ANCHO/2)+'px;top:'+(-ALTO/2)+'px;width:'+ANCHO+'px;height:'+ALTO+'px;box-sizing:border-box;padding:9px 8px 8px 12px;text-align:left;cursor:pointer;overflow:hidden;color:#f4efe2;'
  +'font:inherit;border:1px solid color-mix(in srgb,var(--e,#9a6b2f) 55%,rgba(255,255,255,.18));border-left:3px solid var(--e,#9a6b2f);border-radius:12px;'
  +'background:linear-gradient(150deg,color-mix(in srgb,var(--e,#9a6b2f) 42%,rgba(14,30,52,.72)),rgba(14,30,52,.36));box-shadow:0 14px 30px -14px rgba(0,0,0,.8);'
  +'backface-visibility:visible;transition:box-shadow .3s,border-color .3s,background .3s}'
  +'.orb .ring.inv{animation-direction:reverse}'
  +'.orb .oc>*{position:relative;z-index:1}'
  +'.orb .oc .yrs{display:block;font:500 9px/1.3 var(--mono,monospace);letter-spacing:.05em;color:color-mix(in srgb,var(--e,#c9a35a) 55%,#fff)}'
  +'.orb .oc h3{margin:4px 0 0;padding-right:30px;font:400 16px/1.05 var(--display,Georgia,serif);color:#fff;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}'
  +'.orb .oc>.tapa-c{position:absolute;z-index:0;right:-28px;top:-10px;bottom:-10px;width:70%;overflow:hidden;pointer-events:none;opacity:.42;transform:rotate(5deg);'
  +'-webkit-mask-image:linear-gradient(to left,#000 20%,transparent 100%);mask-image:linear-gradient(to left,#000 20%,transparent 100%)}'
  +'.orb .tapa-c img{position:absolute;left:0;top:0;width:150%;height:auto;max-width:none}'
  +'.orb .tapa-c .gen{position:absolute;inset:0;width:150%;overflow:hidden}.orb .tapa-c .gen svg{position:absolute;inset:0;width:100%;height:100%}'
  +'.orb .tapa-c .a{position:absolute;left:14px;top:12px;font:500 8px/1 var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase}'
  +'.orb .tapa-c .t{position:absolute;left:14px;right:30%;bottom:16px;font-family:"Instrument Serif",Georgia,serif;font-size:26px;line-height:.98}'
  +'.orb .oc>.ava{position:absolute;z-index:2;top:8px;right:8px;width:30px;height:30px;border-radius:50%;object-fit:cover;object-position:50% 18%;box-shadow:0 0 0 2px rgba(255,255,255,.35);filter:grayscale(.2)}'
  +'.orb .oc:hover,.orb .oc:focus-visible{background:linear-gradient(150deg,rgba(18,40,70,.86),rgba(18,40,70,.55));border-color:var(--e,#ffd84a);box-shadow:0 0 0 1px var(--e,#ffd84a),0 0 26px -2px color-mix(in srgb,var(--e,#ffd84a) 70%,transparent);outline:none}'
  +'.orb .oc.sel{border-color:#ffd84a;box-shadow:0 0 0 2px #ffd84a,0 0 40px 2px rgba(255,216,74,.55)}'
  +'.orb.pausa .ring,.orb.parada .ring{animation-play-state:paused}'
  /* succión: las demás caen al eje del tubo y se apagan; la elegida queda y crece */
  +'.orb.succion .slot:not(.es){--k:.04}'
  +'.orb.succion .oc:not(.sel){opacity:0!important;scale:.25!important;pointer-events:none;transition:opacity .9s ease-in,scale 1.1s ease-in,box-shadow .3s,border-color .3s,background .3s}'
  +'.orb.succion .oc.sel{scale:1.2!important;opacity:1!important;transition:scale .6s ease,box-shadow .3s,border-color .3s,background .3s}'
  +'.orb.vuelve .oc{transition:opacity .9s ease-out,scale .9s ease-out,box-shadow .3s,border-color .3s,background .3s}'
  +'.orb .orb-tip{position:absolute;left:0;right:0;bottom:0;margin:0;text-align:center;font:500 11px/1.4 var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:var(--muted,#4F6178);pointer-events:none}'
  +'@keyframes orbGiro{from{rotate:0 1 0 0deg}to{rotate:0 1 0 360deg}}'
  +'.vista{display:flex;gap:10px;align-items:center;justify-content:flex-end;margin:6px 0 0}.vista small{font:500 11px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;opacity:.7}'
  +'body:not(.modo-remolino) .orb{display:none}'
  +'body.modo-remolino #grid,body.modo-remolino #vermas{display:none!important}'
  +'@media (prefers-reduced-motion:reduce){.orb .ring{animation:none}.orb .slot{transition:none}.orb.succion .oc:not(.sel),.orb.vuelve .oc{transition:none}}';
  document.head.appendChild(st);

  /* barra para elegir la vista */
  var bar=document.createElement('div');bar.className='vista';
  bar.innerHTML='<small>Vista</small><button type="button" class="chip" data-m="remolino" aria-pressed="false">Tubo</button><button type="button" class="chip" data-m="lista" aria-pressed="false">Lista</button>';
  var orb=document.createElement('div');orb.className='orb';orb.setAttribute('role','group');orb.setAttribute('aria-label','Autores en un tubo giratorio; tocá una tarjeta para abrir su ficha');
  grid.insertAdjacentElement('beforebegin',orb);orb.insertAdjacentElement('beforebegin',bar);

  var radio=300,alto=FILAS*(ALTO+SEP_Y);
  function modo(m){
    document.body.classList.toggle('modo-remolino',m==='remolino');
    bar.querySelectorAll('.chip').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.m===m))});
    if(m==='remolino'){escala();profundidad();arranca()}
  }
  bar.addEventListener('click',function(e){var b=e.target.closest('.chip');if(b)modo(b.dataset.m)});

  /* el tubo se achica para entrar en el ancho disponible y la caja toma la altura justa */
  function escala(){
    var w=orb.clientWidth||900,s=Math.max(.4,Math.min(1.05,w*.96/(2*radio+ANCHO+60)));
    orb.style.setProperty('--s',s.toFixed(3));
    orb.style.height=Math.round(alto*s+190)+'px';
  }
  window.addEventListener('resize',escala);

  /* profundidad: el ángulo de cada fila se lee de su animación; atrás = lejos, tenue y sin clics; adelante = cerca y nítido */
  var anillos=[],visible=false,raf=0,ultimo=0;
  function profundidad(){
    if(orb.classList.contains('succion'))return;
    anillos.forEach(function(r){
      var g=parseFloat(String(getComputedStyle(r.el).rotate).split(' ').pop())||0;
      r.caras.forEach(function(c){
        var t=(Math.cos((c.a+g)*Math.PI/180)+1)/2;
        var op=(.1+.9*t*t).toFixed(2),sc=(.9+.1*t).toFixed(3),pe=t<.4?'none':'';
        if(c.op!==op){c.op=op;c.el.style.opacity=op}
        if(c.sc!==sc){c.sc=sc;c.el.style.scale=sc}
        if(c.pe!==pe){c.pe=pe;c.el.style.pointerEvents=pe}
      });
    });
  }
  function tick(now){
    raf=0;
    if(!visible||document.hidden||!document.body.classList.contains('modo-remolino'))return;
    if(now-ultimo>=33){ultimo=now;profundidad()}
    raf=requestAnimationFrame(tick);
  }
  function arranca(){if(!raf&&!reduce&&visible)raf=requestAnimationFrame(tick)}
  new IntersectionObserver(function(es){visible=es[0].isIntersecting;arranca()}).observe(orb);
  document.addEventListener('visibilitychange',arranca);

  function build(){
    var cards=[].slice.call(grid.querySelectorAll('.card')),N=cards.length;
    orb.innerHTML='';anillos=[];orb.classList.remove('succion','vuelve','parada','pausa');
    var filas=Math.max(1,Math.min(FILAS,Math.ceil(N/8))),base=Math.floor(N/filas),extra=N%filas;
    radio=Math.max(150,(base+(extra?1:0))*(ANCHO+SEP_X)/(2*Math.PI));
    alto=filas*(ALTO+SEP_Y);
    var disc=document.createElement('div');disc.className='disc';
    var idx=0;
    for(var ri=0;ri<filas;ri++){
      var n=base+(ri<extra?1:0);
      var ring=document.createElement('div');ring.className='ring'+(ri%2?' inv':'');
      ring.style.setProperty('--y',((ri-(filas-1)/2)*(ALTO+SEP_Y)).toFixed(1)+'px');
      ring.style.setProperty('--d',(70+ri*13)+'s');
      var off=(ri*47)%360,info={el:ring,caras:[]};
      for(var i=0;i<n;i++,idx++){
        var c=cards[idx],id=c.dataset.id,a=A.find(function(x){return x.id===id});
        var ang=off+360/n*i;
        var slot=document.createElement('div');slot.className='slot';
        slot.style.setProperty('--a',ang.toFixed(2)+'deg');slot.style.setProperty('--r',radio.toFixed(1)+'px');
        var f=document.createElement('button');f.type='button';f.className='oc';f.dataset.id=id;
        f.setAttribute('aria-label','Abrir la ficha de '+(a?a.n:id));
        var e=getComputedStyle(c).getPropertyValue('--e').trim();if(e)f.style.setProperty('--e',e);
        var yr=c.querySelector('.yrs'),h3=c.querySelector('h3'),tp=c.querySelector('.tapa-c'),av=c.querySelector('.ava');
        if(tp)f.appendChild(tp.cloneNode(true));
        if(av){var im=av.cloneNode(true);im.removeAttribute('loading');f.appendChild(im)}
        f.insertAdjacentHTML('beforeend','<span class="yrs"></span><h3></h3>');
        f.querySelector('.yrs').textContent=yr?yr.textContent.trim():'';
        f.querySelector('h3').textContent=h3?h3.textContent.trim():(a?a.n:id);
        slot.appendChild(f);ring.appendChild(slot);
        info.caras.push({el:f,a:ang});
      }
      anillos.push(info);disc.appendChild(ring);
    }
    orb.appendChild(disc);
    var tip=document.createElement('p');tip.className='orb-tip';tip.textContent='Apuntá para frenar · tocá una tarjeta y el resto cae al eje';orb.appendChild(tip);
    escala();profundidad();
  }

  /* interacción */
  orb.addEventListener('pointerover',function(e){if(e.target.closest('.oc'))orb.classList.add('pausa')});
  orb.addEventListener('pointerout',function(e){var to=e.relatedTarget;if(!(to&&to.closest&&to.closest('.oc')))orb.classList.remove('pausa')});
  orb.addEventListener('focusin',function(e){if(e.target.closest('.oc'))orb.classList.add('pausa')});
  orb.addEventListener('focusout',function(){orb.classList.remove('pausa')});
  function suelta(){
    orb.classList.remove('parada','pausa','succion');
    orb.querySelectorAll('.oc.sel').forEach(function(x){x.classList.remove('sel')});
    orb.querySelectorAll('.slot.es').forEach(function(x){x.classList.remove('es')});
    orb.classList.add('vuelve');setTimeout(function(){orb.classList.remove('vuelve')},1000);
    profundidad();arranca();
  }
  orb.addEventListener('click',function(e){
    var f=e.target.closest('.oc');if(!f)return;
    orb.querySelectorAll('.oc.sel').forEach(function(x){x.classList.remove('sel')});
    orb.querySelectorAll('.slot.es').forEach(function(x){x.classList.remove('es')});
    f.classList.add('sel');f.parentNode.classList.add('es');
    orb.classList.remove('vuelve');orb.classList.add('parada','succion');
    if(typeof openA==='function')openA(f.dataset.id);
  });
  if(panel)new MutationObserver(function(){
    if(!panel.classList.contains('open')&&orb.classList.contains('succion'))suelta();
  }).observe(panel,{attributes:true,attributeFilter:['class']});

  /* reconstruye cuando los filtros o la búsqueda cambian la grilla */
  var t;function luego(){clearTimeout(t);t=setTimeout(build,220)}
  new MutationObserver(luego).observe(grid,{childList:true});
  build();
  modo(matchMedia('(max-width:719px)').matches?'lista':'remolino');
})();
