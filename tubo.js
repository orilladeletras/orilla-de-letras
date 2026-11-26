/* Tubo: movimiento moderno, con la lógica de anime.js (26/11/2026): resortes, escalonado y ondas.
   Sustituye la animación CSS de los anillos por un bucle propio con cuatro gestos:
   1) giro continuo con frenado suave (ya no se corta en seco al apuntar una tarjeta),
   2) arrastre con mouse o dedo, con inercia al soltar,
   3) empuje según la velocidad con que se desplaza la página,
   4) leve inclinación del tubo según la altura del puntero.
   Las caras, la profundidad y la succión siguen siendo las de remolino.js: este archivo solo escribe `rotate`
   en cada anillo, con el mismo formato que la animación anterior.
   Además: entrada escalonada con rebote elástico (las tarjetas salen del eje una tras otra) y una onda de resorte
   que se propaga por el anillo cuando se apunta una tarjeta. */
(function(){
  'use strict';
  var reduce=matchMedia('(prefers-reduced-motion:reduce)');
  if(reduce.matches)return;

  var UMBRAL=6,INERCIA=2.2,FRENADO=5,EMPUJE=.035,EMPUJE_MAX=80,ARRASTRE=.38,TILT_AMP=5;
  var orb,base=-16,tilt=-16,tiltObj=-16,k=1,vd=0,sv=0,lastY=0,lastT=0,raf=0,visible=false;
  var drag=null,movido=false,introHecha=false,ultimaOnda=null;

  /* resorte amortiguado como curva de easing CSS: sube, se pasa y se asienta (como los springs de anime.js) */
  function muelle(n,amort,freq){
    var p=[];for(var i=0;i<=n;i++){var t=i/n;p.push((1-Math.exp(-amort*t)*Math.cos(freq*t)).toFixed(4))}
    return 'linear('+p.join(',')+')';
  }
  var MUELLE=muelle(56,6,17),ELASTICO=muelle(64,4.2,21);
  var soportaLinear=window.CSS&&CSS.supports&&CSS.supports('transition-timing-function','linear(0,1)');

  /* entrada: las tarjetas parten del eje del tubo y se abren con rebote, escalonadas por anillo y posición */
  function intro(){
    if(introHecha||!soportaLinear)return;introHecha=true;
    var slots=orb.querySelectorAll('.slot');
    slots.forEach(function(sl){sl.style.transition='none';sl.style.setProperty('--k','.05')});
    void orb.offsetWidth;
    var por={};
    slots.forEach(function(sl){
      var anillo=sl.parentNode,ri=[].indexOf.call(anillo.parentNode.children,anillo);
      var i=(por[ri]=(por[ri]||0)+1)-1;
      sl.style.transition='--k 1.7s '+ELASTICO+' '+(ri*70+i*24)+'ms';
      sl.style.setProperty('--k','1');
    });
    setTimeout(function(){slots.forEach(function(sl){sl.style.transition='';sl.style.removeProperty('--k')})},2900);
  }

  /* onda: al apuntar una tarjeta, sus vecinas saltan y se asientan con resorte, más tarde cuanto más lejos */
  function onda(card){
    if(card===ultimaOnda||drag||orb.classList.contains('succion')||!card.animate||!soportaLinear)return;
    ultimaOnda=card;
    var fila=[].slice.call(card.parentNode.parentNode.children).map(function(sl){return sl.firstElementChild}).filter(Boolean);
    var n=fila.length,i0=fila.indexOf(card);
    fila.forEach(function(c,j){
      var d=Math.abs(j-i0);d=Math.min(d,n-d);if(d>4)return;
      var a=1-d/5,lado=(j<i0||(j-i0>n/2))?-1:1;
      c.animate([{translate:'0 '+(-18*a)+'px',rotate:(lado*6*a)+'deg'},{translate:'0 0',rotate:'0deg'}],
        {duration:900+d*60,delay:d*55,easing:MUELLE});
    });
  }

  function rings(){return orb.querySelectorAll('.ring')}
  function ang(el){return el.__g||0}
  function pon(el,g){
    if(Math.abs(g-(el.__w||0))<.004)return;
    el.__g=g;el.__w=g;el.style.rotate='0 1 0 '+g.toFixed(3)+'deg';
  }
  function dirDe(el){return el.classList.contains('inv')?-1:1}
  function velBase(el){var d=parseFloat(el.style.getPropertyValue('--d'))||70;return 360/d}

  function paso(now){
    raf=0;
    if(!visible||document.hidden)return;
    var dt=Math.min(.05,(now-(lastT||now))/1000);lastT=now;
    if(dt<=0){raf=requestAnimationFrame(paso);return}

    var frena=drag||orb.classList.contains('pausa')||orb.classList.contains('parada')||orb.classList.contains('succion');
    k+=((frena?0:1)-k)*(1-Math.exp(-dt*FRENADO));

    var y=window.scrollY||0,inst=(y-lastY)/dt;lastY=y;
    sv+=(Math.max(-EMPUJE_MAX/EMPUJE,Math.min(EMPUJE_MAX/EMPUJE,inst))-sv)*(1-Math.exp(-dt*6));
    var empuje=sv*EMPUJE;

    if(!drag)vd*=Math.exp(-dt*INERCIA);
    if(Math.abs(vd)<.05)vd=0;

    var lista=rings();
    for(var i=0;i<lista.length;i++){
      var el=lista[i],d=dirDe(el);
      pon(el,ang(el)+(d*velBase(el)*k+d*empuje+vd)*dt);
    }

    tilt+=(tiltObj-tilt)*(1-Math.exp(-dt*5));
    if(Math.abs(tilt-(orb.__t||0))>.01){orb.__t=tilt;orb.style.setProperty('--tilt',tilt.toFixed(2)+'deg')}
    raf=requestAnimationFrame(paso);
  }
  function arranca(){if(!raf&&visible&&!document.hidden){lastT=0;raf=requestAnimationFrame(paso)}}

  function alBajar(e){
    if(e.button!==undefined&&e.button!==0)return;
    drag={x:e.clientX,t:performance.now(),id:e.pointerId,on:false};movido=false;
  }
  function alMover(e){
    if(e.pointerType==='mouse'){
      var r=orb.getBoundingClientRect();
      tiltObj=base+((e.clientY-r.top)/r.height-.5)*-2*TILT_AMP;
    }
    if(!drag||e.pointerId!==drag.id)return;
    var dx=e.clientX-drag.x;
    if(!drag.on){
      if(Math.abs(dx)<UMBRAL)return;
      drag.on=true;movido=true;orb.classList.add('arrastra');
      try{orb.setPointerCapture(e.pointerId)}catch(_){}
    }
    var ahora=performance.now(),dt=Math.max(.008,(ahora-drag.t)/1000);
    var g=dx*ARRASTRE;
    var lista=rings();
    for(var i=0;i<lista.length;i++)pon(lista[i],ang(lista[i])+g);
    vd=Math.max(-420,Math.min(420,g/dt));
    drag.x=e.clientX;drag.t=ahora;
  }
  function alSoltar(){
    if(!drag)return;
    var estaba=drag.on;drag=null;orb.classList.remove('arrastra');
    if(!estaba)vd=0;
  }
  function alSalir(){tiltObj=base}

  function init(n){
    orb=document.querySelector('.orb');
    if(!orb){if(n<60)setTimeout(function(){init(n+1)},100);return}
    base=parseFloat(getComputedStyle(orb).getPropertyValue('--tilt'))||-16;tilt=tiltObj=base;
    lastY=window.scrollY||0;
    orb.addEventListener('pointerdown',alBajar);
    orb.addEventListener('pointermove',alMover);
    orb.addEventListener('pointerup',alSoltar);
    orb.addEventListener('pointercancel',alSoltar);
    orb.addEventListener('pointerleave',alSalir);
    /* un arrastre no debe abrir la ficha de la tarjeta sobre la que terminó */
    orb.addEventListener('click',function(e){if(movido){e.stopPropagation();e.preventDefault();movido=false}},true);
    orb.addEventListener('pointerover',function(e){var c=e.target.closest&&e.target.closest('.oc');if(c&&!drag)onda(c)});
    orb.addEventListener('pointerleave',function(){ultimaOnda=null});
    new IntersectionObserver(function(es){visible=es[0].isIntersecting;if(visible)intro();arranca()},{threshold:.15}).observe(orb);
    document.addEventListener('visibilitychange',arranca);
  }
  init(0);
})();
