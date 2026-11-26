/* Efectos de estudio (26/11/2026): titular que sube letra por letra, botones magnéticos y cursor con inercia.
   Todo es transform: no toca el diseño ni el contenido, y no corre con prefers-reduced-motion ni en pantallas táctiles. */
(function(){
  'use strict';
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var fino=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var okLinear=window.CSS&&CSS.supports&&CSS.supports('transition-timing-function','linear(0,1)');

  function muelle(n,amort,freq){
    var p=[];for(var i=0;i<=n;i++){var t=i/n;p.push((1-Math.exp(-amort*t)*Math.cos(freq*t)).toFixed(4))}
    return 'linear('+p.join(',')+')';
  }
  var RESORTE=okLinear?muelle(56,6,15):'cubic-bezier(.34,1.56,.64,1)';

  /* 1. Titular: cada letra sube desde una máscara, escalonada, con resorte. El nombre accesible se conserva en el h1. */
  function titular(){
    var h=document.querySelector('.hero h1');
    if(!h||!h.animate||h.__fx)return;h.__fx=1;
    h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());
    var letras=[];
    (function recorre(n){
      [].slice.call(n.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var frag=document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function(parte){
            if(!parte)return;
            if(/^\s+$/.test(parte)){frag.appendChild(document.createTextNode(' '));return}
            var w=document.createElement('span');w.className='fx-pal';w.setAttribute('aria-hidden','true');
            parte.split('').forEach(function(ch){var s=document.createElement('span');s.className='fx-let';s.textContent=ch;w.appendChild(s);letras.push(s)});
            frag.appendChild(w);
          });
          n.replaceChild(frag,c);
        }else if(c.nodeType===1)recorre(c);
      });
    })(h);
    letras.forEach(function(s,i){
      s.animate([{transform:'translateY(105%) rotate(6deg)'},{transform:'translateY(0) rotate(0)'}],
        {duration:1100,delay:120+i*34,easing:RESORTE,fill:'backwards'});
    });
  }

  /* 2. Botones magnéticos: se inclinan hacia el puntero y vuelven con resorte */
  function magneticos(){
    if(!fino)return;
    var objetivo='.hero .btn,.bar .pill,.apoyo .pill';
    document.addEventListener('pointermove',function(e){
      var el=e.target.closest&&e.target.closest(objetivo);
      if(!el||!el.animate)return;
      var r=el.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/r.width,dy=(e.clientY-(r.top+r.height/2))/r.height;
      el.style.translate=(dx*10).toFixed(1)+'px '+(dy*8).toFixed(1)+'px';
    },{passive:true});
    document.addEventListener('pointerout',function(e){
      var el=e.target.closest&&e.target.closest(objetivo);
      if(!el||!el.animate||(e.relatedTarget&&el.contains(e.relatedTarget)))return;
      var desde=el.style.translate||'0px 0px';el.style.translate='';
      el.animate([{translate:desde},{translate:'0px 0px'}],{duration:800,easing:RESORTE});
    },{passive:true});
  }

  /* 3. Cursor: un aro que sigue al puntero con inercia y crece sobre lo que se puede pulsar */
  function cursor(){
    if(!fino)return;
    var aro=document.createElement('div');aro.className='fx-cursor';aro.setAttribute('aria-hidden','true');
    document.body.appendChild(aro);
    var x=-100,y=-100,ax=-100,ay=-100,raf=0,sobre=false;
    function frame(){
      raf=0;ax+=(x-ax)*.2;ay+=(y-ay)*.2;
      aro.style.transform='translate3d('+(ax-18).toFixed(1)+'px,'+(ay-18).toFixed(1)+'px,0) scale('+(sobre?1.9:1)+')';
      if(Math.abs(x-ax)>.1||Math.abs(y-ay)>.1)raf=requestAnimationFrame(frame);
    }
    document.addEventListener('pointermove',function(e){
      if(e.pointerType!=='mouse')return;
      x=e.clientX;y=e.clientY;aro.classList.add('on');
      var s=!!(e.target.closest&&e.target.closest('a,button,.oc,input,[role=button]'));
      if(s!==sobre){sobre=s;aro.classList.toggle('sobre',s)}
      if(!raf)raf=requestAnimationFrame(frame);
    },{passive:true});
    document.documentElement.addEventListener('pointerleave',function(){aro.classList.remove('on')});
  }

  function init(){titular();magneticos();cursor()}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(init);else init();
})();
