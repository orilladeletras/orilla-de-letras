/* interaccion.js: barra de lectura, autor del día, teclado y gesto en la ficha, volver arriba. */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var st=document.createElement('style');
  st.textContent=
   '#lecbar{position:fixed;left:0;top:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#ffd84a,#e8683a);z-index:80;pointer-events:none}'
  +'.hoy{display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap;margin:14px 0 0;font:500 13px/1.3 var(--mono,monospace);letter-spacing:.04em}'
  +'.hoy b{font-weight:500;opacity:.7;text-transform:uppercase;letter-spacing:.12em;font-size:11px}'
  +'.hoy button{font:inherit;color:inherit;background:transparent;border:1px solid currentColor;border-radius:999px;padding:9px 14px;min-height:40px;cursor:pointer;transition:background .2s,color .2s}'
  +'.hoy button:hover,.hoy button:focus-visible{background:var(--gold,#ffd84a);color:#14202e;border-color:var(--gold,#ffd84a)}'
  +'#arriba{position:fixed;right:16px;bottom:16px;width:46px;height:46px;border-radius:50%;border:1px solid currentColor;background:var(--card,#fff);color:var(--ink,#14202e);font:500 20px/1 var(--mono,monospace);cursor:pointer;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .2s,transform .2s;z-index:55;box-shadow:0 10px 24px -12px rgba(0,0,0,.5)}'
  +'#arriba.on{opacity:1;transform:none;pointer-events:auto}'
  +'@media (prefers-reduced-motion:reduce){#arriba{transition:none}}'
  +'@media (max-width:520px){.bar{gap:8px;flex-wrap:nowrap}.bar .brand{font-size:10px;letter-spacing:.05em;line-height:1.35;min-width:0}.bar .pill{white-space:nowrap;font-size:12px;padding:10px 12px;min-height:40px}.bar>span:last-child{flex:none;gap:6px!important}}';
  document.head.appendChild(st);

  /* barra de lectura */
  var bar=document.createElement('div');bar.id='lecbar';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
  var up=document.createElement('button');up.id='arriba';up.type='button';up.setAttribute('aria-label','Volver arriba');up.textContent='↑';document.body.appendChild(up);
  up.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
  var tick=false;
  function onScroll(){
    if(tick)return;tick=true;
    requestAnimationFrame(function(){
      var d=document.documentElement,m=d.scrollHeight-innerHeight;
      bar.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')';
      up.classList.toggle('on',scrollY>1200);
      tick=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* autor del día: cambia cada día, estable durante el día */
  var intro=document.getElementById('intro');
  if(intro&&typeof A!=='undefined'&&A.length&&typeof window.openA==='function'){
    var n=new Date(),dia=Math.floor(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate())/864e5);
    var a=A[(dia*7)%A.length];
    var p=document.createElement('p');p.className='hoy';
    p.innerHTML='<b>Autor del día</b>';
    var b=document.createElement('button');b.type='button';b.textContent=a.n+' →';
    b.addEventListener('click',function(){window.openA(a.id)});
    p.appendChild(b);intro.insertAdjacentElement('afterend',p);
  }

  /* ficha: flechas, gesto de cierre y retorno del foco */
  var pn=document.getElementById('panel');
  if(pn){
    var last=null;
    document.addEventListener('focusin',function(e){if(!pn.contains(e.target))last=e.target});
    document.addEventListener('keydown',function(e){
      if(!pn.classList.contains('open'))return;
      var t=e.target&&e.target.tagName;if(t==='INPUT'||t==='TEXTAREA')return;
      if(e.key==='ArrowRight'){var nx=document.getElementById('next');nx&&nx.click()}
      else if(e.key==='ArrowLeft'){var pv=document.getElementById('prev');pv&&pv.click()}
    });
    var was=false;
    new MutationObserver(function(){
      var on=pn.classList.contains('open');
      if(was&&!on&&last&&document.contains(last)){try{last.focus({preventScroll:true})}catch(_){}}
      was=on;
    }).observe(pn,{attributes:true,attributeFilter:['class']});
    var x0=0,y0=0;
    pn.addEventListener('touchstart',function(e){var t=e.changedTouches[0];x0=t.clientX;y0=t.clientY},{passive:true});
    pn.addEventListener('touchend',function(e){
      var t=e.changedTouches[0],dx=t.clientX-x0,dy=Math.abs(t.clientY-y0);
      if(dx>90&&dy<60){var c=document.getElementById('close');c&&c.click()}
    },{passive:true});
  }
})();
