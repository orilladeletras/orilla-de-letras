/* cuarto.js (26/11/2026): entrar a la biblioteca.
   Al abrir un autor, la página se convierte en la fotografía de un pasillo de biblioteca: la cámara avanza hacia el fondo, ahí se enciende una luz
   y de ella sale la tarjeta, que viaja hacia el visitante. Al abrir la ficha, la tarjeta se transforma en el panel.
   Movimiento: ease-out al entrar, salida corta, solo transform, opacity y clip-path. Con prefers-reduced-motion no corre. */
(function(){
  'use strict';
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  if(!window.Element||!Element.prototype.animate||typeof window.openA!=='function')return;

  var SALE='cubic-bezier(.23,1,.32,1)',SUAVE='cubic-bezier(.25,.6,.2,1)';
  var FOTO='biblioteca.jpg',IW=1920,IH=1440,VX=.31,VY=.39; /* punto de fuga del pasillo: de ahí sale la tarjeta */
  var okLinear=window.CSS&&CSS.supports&&CSS.supports('transition-timing-function','linear(0,1)');
  function muelle(n,amort,freq){var p=[];for(var i=0;i<=n;i++){var t=i/n;p.push((1-Math.exp(-amort*t)*Math.cos(freq*t)).toFixed(4))}return 'linear('+p.join(',')+')'}
  var MUELLE=okLinear?muelle(56,6,14):'cubic-bezier(.34,1.4,.64,1)';
  var cu=null,vivo=false;
  var pre=new Image();pre.decoding='async';pre.src=FOTO;

  var css=[
   '.cu{position:fixed;inset:0;z-index:80;overflow:hidden;background:#0b0805;color:#f3ead6;font-family:var(--body,Georgia,serif)}',
   '.cu-foto{position:absolute;max-width:none;user-select:none;pointer-events:none;will-change:transform;filter:saturate(.92) contrast(1.05) brightness(.82) sepia(.12)}',
   '.cu-luz{position:absolute;width:26vmin;height:26vmin;margin:-13vmin 0 0 -13vmin;border-radius:50%;background:radial-gradient(closest-side,rgba(255,214,140,.55),rgba(255,214,140,0));opacity:0;pointer-events:none}',
   '.cu-vela{position:absolute;inset:0;background:#0b0805;pointer-events:none}',
   '.cu-vina{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 48%,rgba(8,5,3,.1),rgba(8,5,3,.78) 85%);opacity:.55;pointer-events:none}',
   '.cu-oscuro{position:absolute;inset:0;background:rgba(8,5,3,.5);opacity:0;pointer-events:none}',
   '.cu-polvo i{position:absolute;left:var(--x);top:var(--y);width:3px;height:3px;border-radius:50%;background:#fff;opacity:.35;animation:cuPolvo var(--t) ease-in-out infinite alternate}',
   '.cu-card{position:absolute;left:0;top:0;width:var(--cw);height:calc(var(--cw)*.64);display:flex;flex-direction:column;justify-content:space-between;padding:6.5%;border-radius:18px;overflow:hidden;cursor:pointer;color:#fff;',
     'background:linear-gradient(150deg,color-mix(in srgb,var(--e,#7a5a2b) 92%,#fff),color-mix(in srgb,var(--e,#7a5a2b) 66%,#000));box-shadow:0 40px 60px -24px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.25),inset 0 1px 0 rgba(255,255,255,.4);will-change:transform;transform-origin:50% 50%}',
   '.cu-card h2{position:relative;z-index:1;margin:0;max-width:62%;font:400 clamp(26px,7vw,42px)/1.02 var(--display,Georgia,serif)}',
   '.cu-card small{position:relative;z-index:1;font:500 12px/1.2 var(--mono,monospace);letter-spacing:.05em;color:rgba(255,255,255,.88)}',
   '.cu-card .m{position:absolute;right:6%;bottom:-8%;font:italic 400 clamp(110px,28vw,180px)/1 var(--display,Georgia,serif);color:rgba(255,255,255,.2);pointer-events:none}',
   '.cu-card img{position:absolute;right:0;top:0;bottom:0;width:48%;height:100%;object-fit:cover;object-position:50% 18%;filter:grayscale(.3) contrast(1.04) saturate(.9);-webkit-mask-image:linear-gradient(to right,transparent 0,#000 42%);mask-image:linear-gradient(to right,transparent 0,#000 42%);mix-blend-mode:luminosity;opacity:.85}',
   '.cu-abrir,.cu-salta{position:absolute;font:500 15px/1 var(--body,sans-serif);cursor:pointer;border-radius:999px;min-height:44px;transition:transform 150ms ease-out,background 150ms,opacity 200ms}',
   '.cu-abrir{left:50%;bottom:5vh;transform:translateX(-50%);padding:0 28px;background:#e9c26b;color:#2a1d0e;border:0;opacity:0;pointer-events:none}',
   '.cu-abrir.ok{opacity:1;pointer-events:auto}',
   '.cu-abrir:active{transform:translateX(-50%) scale(.97)}',
   '@media (hover:hover) and (pointer:fine){.cu-abrir:hover{background:#f5d386}.cu-salta:hover{background:rgba(255,255,255,.14)}}',
   '.cu-salta{right:16px;top:16px;padding:0 18px;background:rgba(0,0,0,.35);color:#f3ead6;border:1px solid rgba(255,255,255,.3)}',
   '.cu-salta:active{transform:scale(.97)}',
   'body:has(.cu) .fx-cursor{opacity:0!important}',
   '.cu :focus-visible{outline:3px solid #ffd84a;outline-offset:3px}',
   '@keyframes cuPolvo{from{transform:translate(0,0)}to{transform:translate(34px,-46px)}}',
   '::view-transition-group(autor){animation-duration:420ms;animation-timing-function:'+SALE+'}'
  ].join('');
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function semilla(s){var h=7;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return function(){h=(h*1103515245+12345)|0;return((h>>>16)&32767)/32767}}
  function el(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n}
  function espera(ms){return new Promise(function(r){setTimeout(r,ms)})}

  /* la foto cubre la pantalla y se coloca de modo que el punto de fuga caiga cerca del 42 % del ancho y del alto */
  function encuadre(W,H){
    var k=Math.max(W/IW,H/IH),w=IW*k,h=IH*k;
    var x=Math.min(0,Math.max(W-w,W*.42-VX*w)),y=Math.min(0,Math.max(H-h,H*.42-VY*h));
    return {x:x,y:y,w:w,h:h,vx:x+VX*w,vy:y+VY*h};
  }

  function construye(a,color,W,H){
    var rnd=semilla(a.id||a.n),e=encuadre(W,H);
    var c=el('div','cu');c.setAttribute('role','dialog');c.setAttribute('aria-modal','true');c.setAttribute('aria-label','Biblioteca de '+a.n);
    if(color)c.style.setProperty('--e',color);
    var im=el('img','cu-foto');im.src=FOTO;im.alt='';im.decoding='async';
    im.style.left=e.x+'px';im.style.top=e.y+'px';im.style.width=e.w+'px';im.style.height=e.h+'px';
    im.style.transformOrigin=(e.vx-e.x)+'px '+(e.vy-e.y)+'px';
    c.appendChild(im);
    var luz=el('div','cu-luz');luz.style.left=e.vx+'px';luz.style.top=e.vy+'px';c.appendChild(luz);
    c.appendChild(el('div','cu-oscuro'));
    var polvo=el('div','cu-polvo');
    for(var i=0;i<14;i++){var d=el('i');d.style.setProperty('--x',(6+rnd()*88)+'%');d.style.setProperty('--y',(8+rnd()*80)+'%');d.style.setProperty('--t',(5+rnd()*6).toFixed(1)+'s');polvo.appendChild(d)}
    c.appendChild(polvo);c.appendChild(el('div','cu-vina'));c.appendChild(el('div','cu-vela'));
    c.__e=e;
    return c;
  }

  function tarjeta(a,foto,cw){
    var t=el('div','cu-card');t.style.setProperty('--cw',cw+'px');
    var yrs=a.mue?a.nac+' – '+a.mue:(a.nac?'n. '+a.nac:'');
    if(foto){var im=el('img');im.src=foto;im.alt='';t.appendChild(im)}
    t.appendChild(el('small','',yrs));t.appendChild(el('h2','',a.n));t.appendChild(el('span','m',(a.n||'?').charAt(0)));
    return t;
  }

  function sal(rapido){
    if(!cu)return;var c=cu;cu=null;vivo=false;
    var panel=document.getElementById('panel'),cerrar=document.getElementById('close');
    var fin=function(){c.remove();if(cerrar)cerrar.focus({preventScroll:true})};
    var card=c.querySelector('.cu-card');
    if(!rapido&&card&&document.startViewTransition&&panel){
      card.style.viewTransitionName='autor';
      var vt=document.startViewTransition(function(){
        card.style.viewTransitionName='';c.remove();panel.style.viewTransitionName='autor';
      });
      vt.finished.finally(function(){panel.style.viewTransitionName='';if(cerrar)cerrar.focus({preventScroll:true})});
      return;
    }
    c.animate([{opacity:1},{opacity:0}],{duration:200,easing:'ease-out',fill:'forwards'}).finished.then(fin,fin);
  }

  async function entra(id,pt){
    if(cu)return;
    var a=(typeof A!=='undefined')&&A.find(function(x){return x.id===id});if(!a)return;
    var W=innerWidth,H=innerHeight;
    var oc=document.querySelector('.orb .oc[data-id="'+id+'"]');
    var color=pt.color||(oc?getComputedStyle(oc).getPropertyValue('--e').trim():'');
    var fotoEl=oc&&oc.querySelector('.foto'),foto=fotoEl?fotoEl.getAttribute('src'):'';
    try{await pre.decode()}catch(_){}
    if(cu)return;
    cu=construye(a,color,W,H);vivo=true;
    var c=cu,e=c.__e;document.body.appendChild(c);
    var sk=el('button','cu-salta','Saltar');sk.type='button';sk.onclick=function(){sal(true)};c.appendChild(sk);
    var ab=el('button','cu-abrir','Abrir la ficha');ab.type='button';ab.onclick=function(){sal(false)};c.appendChild(ab);

    /* 1. la cámara entra: el cuarto se abre en iris desde la tarjeta tocada y avanza por el pasillo hacia su fondo */
    c.animate([{clipPath:'circle(0px at '+pt.x+'px '+pt.y+'px)'},{clipPath:'circle(150vmax at '+pt.x+'px '+pt.y+'px)'}],{duration:800,easing:SALE,fill:'backwards'});
    c.querySelector('.cu-foto').animate([{transform:'scale(1)'},{transform:'scale(2.3)'}],{duration:2300,easing:SUAVE,fill:'forwards'});
    c.querySelector('.cu-vela').animate([{opacity:1},{opacity:0}],{duration:700,easing:'ease-out',fill:'forwards'});
    await espera(1900);if(!vivo)return;

    /* 2. al fondo del pasillo se enciende una luz cálida: de ahí saldrá la tarjeta */
    c.querySelector('.cu-luz').animate([{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:'ease-out',fill:'forwards'});
    await espera(380);if(!vivo)return;

    /* 3. la tarjeta nace en ese punto (recortada de abajo arriba) y viaja hasta quedar frente al visitante con un resorte */
    var cw=Math.min(380,W*.84),ch=cw*.64,s0=.1;
    var card=tarjeta(a,foto,cw);if(color)card.style.setProperty('--e',color);
    card.onclick=function(){sal(false)};c.appendChild(card);
    var T=function(cx,cy,s){return 'translate('+(cx-cw/2)+'px,'+(cy-ch/2)+'px) scale('+s+')'};
    card.animate([{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}],{duration:360,easing:'ease-out',fill:'backwards'});
    card.animate([{transform:T(e.vx,e.vy,s0*.6)},{transform:T(e.vx,e.vy,s0)}],{duration:360,easing:'ease-out',fill:'both'});
    await espera(360);if(!vivo)return;
    var fx=W/2,fy=H*.47;
    var vuelo=card.animate([
      {transform:T(e.vx,e.vy,s0)},
      {transform:T(fx,fy,1)}
    ],{duration:1250,easing:MUELLE,fill:'forwards'});
    c.querySelector('.cu-luz').animate([{opacity:1},{opacity:0}],{duration:900,easing:'ease-out',fill:'forwards'});
    c.querySelector('.cu-oscuro').animate([{opacity:0},{opacity:1}],{duration:900,easing:'ease-out',fill:'forwards'});
    await vuelo.finished.catch(function(){});if(!vivo)return;
    ab.classList.add('ok');ab.focus({preventScroll:true});
  }

  /* todas las entradas a un autor (tubo, línea de tiempo, azar, autor del día, búsqueda) pasan por la biblioteca.
     Desde el panel abierto, "Anterior" y "Siguiente" siguen cambiando de ficha sin volver a entrar. */
  var ultimo={x:innerWidth/2,y:innerHeight/2,color:''};
  function marca(t,x,y){
    var f=t&&t.closest&&t.closest('.oc,.dot,.card,.autor,button,a');
    var col=f?getComputedStyle(f).getPropertyValue('--e').trim():'';
    ultimo={x:x,y:y,color:col};
  }
  document.addEventListener('pointerdown',function(e){marca(e.target,e.clientX,e.clientY)},true);
  document.addEventListener('keydown',function(e){
    if((e.key==='Enter'||e.key===' ')&&document.activeElement&&document.activeElement.getBoundingClientRect){
      var r=document.activeElement.getBoundingClientRect();marca(document.activeElement,r.left+r.width/2,r.top+r.height/2);
    }
  },true);
  var abre=window.openA,panel=document.getElementById('panel');
  window.openA=function(id,noHash){
    var entrar=!noHash&&!cu&&panel&&!panel.classList.contains('open');
    var p=entrar?ultimo:null;
    if(p)window.__sinVT=true;
    var res;try{res=abre.apply(this,arguments)}finally{window.__sinVT=false}
    if(p)entra(id,p);
    return res;
  };
  document.addEventListener('keydown',function(e){
    if(cu&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();sal(true)}
  },true);
})();
