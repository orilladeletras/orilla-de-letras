/* cuarto.js (26/11/2026): entrar a la biblioteca.
   Al abrir un autor, la página se convierte en la fotografía de una estantería: la cámara se acerca a un lomo, junto a él se enciende una luz
   y de ella sale la tarjeta, que viaja hacia el visitante. Al abrir la ficha, la tarjeta se transforma en el panel.
   Movimiento: ease-out al entrar, salida corta, solo transform, opacity y clip-path. Con prefers-reduced-motion no corre. */
(function(){
  'use strict';
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  if(!window.Element||!Element.prototype.animate||typeof window.openA!=='function')return;

  var SALE='cubic-bezier(.23,1,.32,1)',SUAVE='cubic-bezier(.25,.6,.2,1)';
  var FOTO='estante.jpg',IW=300,IH=650,VX=.565,VY=.363; /* lomo rojo de la foto, de donde sale la tarjeta */
  var okLinear=window.CSS&&CSS.supports&&CSS.supports('transition-timing-function','linear(0,1)');
  function muelle(n,amort,freq){var p=[];for(var i=0;i<=n;i++){var t=i/n;p.push((1-Math.exp(-amort*t)*Math.cos(freq*t)).toFixed(4))}return 'linear('+p.join(',')+')'}
  var MUELLE=okLinear?muelle(56,6,14):'cubic-bezier(.34,1.4,.64,1)';
  var cu=null,vivo=false;
  var pre=new Image();pre.decoding='async';pre.src=FOTO;

  var css=[
   '.cu{position:fixed;inset:0;z-index:80;overflow:hidden;background:#0b0805;color:#f3ead6;font-family:var(--body,Georgia,serif)}',
   '.cu-bg{position:absolute;inset:-6%;width:112%;height:112%;object-fit:cover;filter:blur(28px) brightness(.35) saturate(.8);pointer-events:none}',
   '.cu-foto{position:absolute;max-width:none;user-select:none;pointer-events:none;will-change:transform;filter:saturate(.92) contrast(1.05) brightness(.9) contrast(1.04)}',
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

  /* la foto (vertical) ocupa todo el alto, centrada; el resto de la pantalla es la misma foto desenfocada y oscurecida */
  function encuadre(W,H){
    var h=H,w=H*IW/IH,x=(W-w)/2,y=0;
    return {x:x,y:y,w:w,h:h,vx:x+VX*w,vy:y+VY*h};
  }

  function construye(a,color,W,H){
    var rnd=semilla(a.id||a.n),e=encuadre(W,H);
    var c=el('div','cu');c.setAttribute('role','dialog');c.setAttribute('aria-modal','true');c.setAttribute('aria-label','Biblioteca de '+a.n);
    if(color)c.style.setProperty('--e',color);
    var bg=el('img','cu-bg');bg.src=FOTO;bg.alt='';c.appendChild(bg);
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

    /* 2. junto al lomo rojo se enciende una luz cálida: de ahí saldrá la tarjeta */
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
/* cuarto.js (26/11/2026): entrar a la biblioteca.
   Al abrir un autor, la página se convierte en un pasillo de estantes en perspectiva: la cámara avanza hasta el fondo, el libro del autor
   sale un poco del estante y de él sube la tarjeta, que viaja hacia el visitante. Al abrir la ficha, la tarjeta se transforma en el panel.
   Movimiento: ease-out al entrar, salida corta, solo transform, opacity y clip-path. Con prefers-reduced-motion no corre. */
(function(){
  'use strict';
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  if(!window.Element||!Element.prototype.animate||typeof window.openA!=='function')return;

  var P=900,D=1100,ZFIN=D-260,ZMAX=700-ZFIN,L=D+ZMAX;
  var SALE='cubic-bezier(.23,1,.32,1)',SUAVE='cubic-bezier(.25,.6,.2,1)';
  var okLinear=window.CSS&&CSS.supports&&CSS.supports('transition-timing-function','linear(0,1)');
  function muelle(n,amort,freq){var p=[];for(var i=0;i<=n;i++){var t=i/n;p.push((1-Math.exp(-amort*t)*Math.cos(freq*t)).toFixed(4))}return 'linear('+p.join(',')+')'}
  var MUELLE=okLinear?muelle(56,6,14):'cubic-bezier(.34,1.4,.64,1)';
  var PAL=['#6b2d2d','#2d4a63','#3f5a3a','#7a5a2b','#4a3358','#8a3b2e','#2c5460','#5e4a2e','#33405e'];
  var cu=null,vivo=false;

  var css=[
   '.cu{position:fixed;inset:0;z-index:80;overflow:hidden;background:#04090f;color:#f3ead6;font-family:var(--body,Georgia,serif)}',
   '.cu-sala{position:absolute;inset:0;perspective:'+P+'px;perspective-origin:50% 50%}',
   '.cu-hall{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}',
   '.cu-pl{position:absolute;backface-visibility:hidden;-webkit-backface-visibility:hidden}',
   '.cu-fondo{display:flex;justify-content:center;align-items:flex-start;background:radial-gradient(ellipse at 50% 38%,#1a3a5a,#0a1b2d 60%,#050d16);overflow:hidden}',
   '.cu-lado{display:grid;grid-template-rows:repeat(5,1fr);background:#0e0805}',
   '.cu-piso{background:linear-gradient(180deg,rgba(0,0,0,.9),rgba(0,0,0,0) 75%),repeating-linear-gradient(90deg,#3a2415 0 56px,#24150a 56px 58px)}',
   '.cu-techo{background:linear-gradient(0deg,rgba(255,200,120,.1),rgba(0,0,0,.9) 70%),#0a0705}',
   '.cu-bal{display:flex;align-items:flex-end;gap:2px;padding:0 8px;border-bottom:9px solid #4a2f1b;min-height:0;overflow:hidden;box-shadow:inset 0 -14px 20px -14px #000}',
   '.cu-lom{flex:none;width:var(--w);height:var(--h);border-radius:2px 2px 0 0;background:linear-gradient(90deg,rgba(0,0,0,.4),rgba(255,255,255,.1) 40%,rgba(0,0,0,.32)),var(--c);box-shadow:inset 0 3px 0 rgba(255,255,255,.12);overflow:hidden}',
   '.cu-lom span{display:block;writing-mode:vertical-rl;padding:7px 0;font:400 13px/1 var(--display,Georgia,serif);color:#f3ead6;white-space:nowrap;margin:0 auto;width:1em;text-align:left}',
   '.cu-lom.es{box-shadow:inset 0 3px 0 #e9c26b,inset 0 -3px 0 #e9c26b}',
   '.cu-estante{position:relative;flex:none;display:grid;grid-template-rows:repeat(3,1fr);background:#150d08;border:10px solid #3a2414;box-shadow:inset 0 0 44px #000c,0 34px 60px -22px #000}',
   '.cu-vent{position:absolute;width:190px;height:270px;border:8px solid #3a2414;border-radius:999px 999px 6px 6px;background:radial-gradient(circle at 62% 30%,#fff7d6 0 7%,#cfe3f6 9%,#2b4d73 38%,#0c1f33);box-shadow:inset 0 0 30px #000a,0 0 80px 10px rgba(160,200,255,.16)}',
   '.cu-lampara{position:absolute;width:44px;height:140px;background:linear-gradient(#2c1b10,#2c1b10) 50% 100%/6px 110px no-repeat}',
   '.cu-lampara::before{content:"";position:absolute;left:-6px;top:0;width:56px;height:34px;clip-path:polygon(18% 0,82% 0,100% 100%,0 100%);background:linear-gradient(#f6d58a,#c98f35)}',
   '.cu-lampara::after{content:"";position:absolute;left:-190px;top:-120px;width:420px;height:420px;background:radial-gradient(closest-side,rgba(255,206,120,.38),transparent);animation:cuLuz 5s ease-in-out infinite alternate;pointer-events:none}',
   '.cu-vela{position:absolute;inset:0;background:#04090f;pointer-events:none}',
   '.cu-vina{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 48%,rgba(4,9,15,.15),rgba(4,9,15,.82) 85%);opacity:0;pointer-events:none}',
   '.cu-polvo i{position:absolute;left:var(--x);top:var(--y);width:3px;height:3px;border-radius:50%;background:#fff;opacity:.4;animation:cuPolvo var(--t) ease-in-out infinite alternate}',
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
   '.cu-salta{right:16px;top:16px;padding:0 18px;background:rgba(255,255,255,.08);color:#f3ead6;border:1px solid rgba(255,255,255,.28)}',
   '.cu-salta:active{transform:scale(.97)}',
   'body:has(.cu) .fx-cursor{opacity:0!important}',
   '.cu :focus-visible{outline:3px solid #ffd84a;outline-offset:3px}',
   '@keyframes cuLuz{from{opacity:.8}to{opacity:1}}',
   '@keyframes cuPolvo{from{transform:translate(0,0)}to{transform:translate(34px,-46px)}}',
   '::view-transition-group(autor){animation-duration:420ms;animation-timing-function:'+SALE+'}'
  ].join('');
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function semilla(s){var h=7;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return function(){h=(h*1103515245+12345)|0;return((h>>>16)&32767)/32767}}
  function el(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n}
  function espera(ms){return new Promise(function(r){setTimeout(r,ms)})}
  function plano(cls,w,h,tr){var n=el('div','cu-pl '+cls);n.style.width=w+'px';n.style.height=h+'px';n.style.left=(-w/2)+'px';n.style.top=(-h/2)+'px';n.style.transform=tr;return n}
  function lomo(rnd,o,esElegido){
    var l=el('div','cu-lom');
    l.style.setProperty('--w',(o?30:15+Math.round(rnd()*14))+'px');
    l.style.setProperty('--h',(o?88:58+Math.round(rnd()*30))+'%');
    l.style.setProperty('--c',esElegido?'var(--e,#7a5a2b)':PAL[Math.floor(rnd()*PAL.length)]);
    if(o){l.appendChild(el('span','',o[0]))}
    if(esElegido)l.classList.add('es');
    return l;
  }
  function fila(rnd,n,especiales){
    var b=el('div','cu-bal');
    for(var i=0;i<n;i++){var e=especiales&&especiales[i];b.appendChild(lomo(rnd,e&&e.o,e&&e.elegido))}
    return b;
  }

  function construye(a,color,hw,hh){
    var rnd=semilla(a.id||a.n),propios=(a.o||[]).slice(0,5);
    var c=el('div','cu');c.setAttribute('role','dialog');c.setAttribute('aria-modal','true');c.setAttribute('aria-label','Biblioteca de '+a.n);
    if(color)c.style.setProperty('--e',color);
    var sala=el('div','cu-sala'),hall=el('div','cu-hall');

    var fondo=plano('cu-fondo',2*hw,hh,'translateZ('+(-D)+'px)');
    var ew=Math.min(560,2*hw*.92),eh=Math.min(hh*.58,ew*.76);
    fondo.style.paddingTop=(hh*.15)+'px';
    var est=el('div','cu-estante');est.style.width=ew+'px';est.style.height=eh+'px';
    var cols=Math.floor((ew-40)/17),elegida=Math.floor(cols*.45);
    var esp=[{},{},{}];
    esp[0][elegida]={o:propios[0],elegido:true};
    if(propios[1])esp[1][3]={o:propios[1]};
    if(propios[3])esp[1][Math.max(5,cols-6)]={o:propios[3]};
    if(propios[2])esp[2][5]={o:propios[2]};
    if(propios[4])esp[2][Math.max(8,cols-9)]={o:propios[4]};
    for(var f=0;f<3;f++)est.appendChild(fila(rnd,cols,esp[f]));
    fondo.appendChild(est);
    if(2*hw>=760){
      var v=el('div','cu-vent');v.style.left=(hw+ew/2+60)+'px';v.style.top=(hh*.17)+'px';fondo.appendChild(v);
      var lm=el('i','cu-lampara');lm.style.left=(hw-ew/2-110)+'px';lm.style.top=(hh*.15+eh*.62)+'px';fondo.appendChild(lm);
    }
    hall.appendChild(fondo);

    var zc=(-D+ZMAX)/2;
    [[-hw,90],[hw,-90]].forEach(function(p){
      var lado=plano('cu-lado',L,hh,'translate3d('+p[0]+'px,0,'+zc+'px) rotateY('+p[1]+'deg)');
      for(var r=0;r<5;r++)lado.appendChild(fila(rnd,Math.ceil(L/20),null));
      hall.appendChild(lado);
    });
    hall.appendChild(plano('cu-piso',2*hw,L,'translate3d(0,'+(hh/2)+'px,'+zc+'px) rotateX(90deg)'));
    hall.appendChild(plano('cu-techo',2*hw,L,'translate3d(0,'+(-hh/2)+'px,'+zc+'px) rotateX(-90deg)'));
    sala.appendChild(hall);c.appendChild(sala);

    var polvo=el('div','cu-polvo');
    for(var i=0;i<16;i++){var d=el('i');d.style.setProperty('--x',(6+rnd()*88)+'%');d.style.setProperty('--y',(8+rnd()*80)+'%');d.style.setProperty('--t',(5+rnd()*6).toFixed(1)+'s');polvo.appendChild(d)}
    c.appendChild(el('div','cu-vela'));c.appendChild(polvo);c.appendChild(el('div','cu-vina'));
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
    var W=innerWidth,H=innerHeight,hw=Math.max(W*.45,170),hh=H;
    var oc=document.querySelector('.orb .oc[data-id="'+id+'"]');
    var color=pt.color||(oc?getComputedStyle(oc).getPropertyValue('--e').trim():'');
    var fotoEl=oc&&oc.querySelector('.foto'),foto=fotoEl?fotoEl.getAttribute('src'):'';
    cu=construye(a,color,hw,hh);vivo=true;
    var c=cu;document.body.appendChild(c);
    var sk=el('button','cu-salta','Saltar');sk.type='button';sk.onclick=function(){sal(true)};c.appendChild(sk);
    var ab=el('button','cu-abrir','Abrir la ficha');ab.type='button';ab.onclick=function(){sal(false)};c.appendChild(ab);

    /* 1. la cámara entra: el cuarto se abre en iris desde la tarjeta tocada y avanza por el pasillo hasta el fondo */
    c.animate([{clipPath:'circle(0px at '+pt.x+'px '+pt.y+'px)'},{clipPath:'circle(150vmax at '+pt.x+'px '+pt.y+'px)'}],{duration:800,easing:SALE,fill:'backwards'});
    var hall=c.querySelector('.cu-hall');
    hall.animate([{transform:'translateZ(-320px)'},{transform:'translateZ('+ZFIN+'px)'}],{duration:2300,easing:SUAVE,fill:'forwards'});
    c.querySelector('.cu-vela').animate([{opacity:1},{opacity:0}],{duration:700,easing:'ease-out',fill:'forwards'});
    await espera(2250);if(!vivo)return;

    /* 2. el libro del autor sale un poco del estante */
    var es=c.querySelector('.cu-lom.es');
    es.animate([{transform:'translateY(0)'},{transform:'translateY(-10px)'}],{duration:260,easing:SALE,fill:'forwards'});
    await espera(280);if(!vivo)return;

    /* 3. de ese libro sube la tarjeta (recortada por el borde del libro) y viaja hasta quedar frente al visitante con un resorte */
    var r=es.getBoundingClientRect();
    var cw=Math.min(380,W*.84),ch=cw*.64,s0=Math.max(.06,r.width*1.6/cw);
    var card=tarjeta(a,foto,cw);if(color)card.style.setProperty('--e',color);
    card.onclick=function(){sal(false)};c.appendChild(card);
    var T=function(cx,cy,s,rot){return 'translate('+(cx-cw/2)+'px,'+(cy-ch/2)+'px) scale('+s+') rotate('+rot+'deg)'};
    var ax=r.left+r.width/2,top=r.top;
    card.animate([
      {transform:T(ax,top+ch*s0/2,s0,0),clipPath:'inset(0 0 100% 0)'},
      {transform:T(ax,top-ch*s0/2,s0,0),clipPath:'inset(0 0 0% 0)'}
    ],{duration:520,easing:'ease-out',fill:'both'});
    await espera(520);if(!vivo)return;
    var fx=W/2,fy=H*.47;
    var vuelo=card.animate([
      {transform:T(ax,top-ch*s0/2,s0,0)},
      {transform:T(fx,fy,1,0)}
    ],{duration:1250,easing:MUELLE,fill:'forwards'});
    c.querySelector('.cu-vina').animate([{opacity:0},{opacity:1}],{duration:900,easing:'ease-out',fill:'forwards'});
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
