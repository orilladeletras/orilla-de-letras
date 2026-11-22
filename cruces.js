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

/* Fondo de la sección "Cruces del Plata": un cuadro de pinceladas gruesas, como el de la portada pero en verdes.
   Se pinta una vez en un canvas (semilla fija, siempre igual) y se aplica como imagen de fondo. */
(function(){
  var sec=document.getElementById('cruces');if(!sec||!document.createElement('canvas').getContext)return;
  var W=1400,H=760,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var c=cv.getContext('2d'),seed=23;
  function R(){seed=(seed*16807)%2147483647;return seed/2147483647}
  var hz=H*.5;
  /* base: cielo verde noche, horizonte salvia, río y orillas oscuras */
  var sk=c.createLinearGradient(0,0,0,hz);sk.addColorStop(0,'#0c2a1b');sk.addColorStop(.55,'#1f5a38');sk.addColorStop(1,'#6f9b6a');c.fillStyle=sk;c.fillRect(0,0,W,H);
  var mg=c.createRadialGradient(W*.84,H*.3,6,W*.84,H*.3,210);mg.addColorStop(0,'rgba(214,230,160,.95)');mg.addColorStop(.3,'rgba(176,206,128,.5)');mg.addColorStop(1,'rgba(150,190,110,0)');c.fillStyle=mg;c.fillRect(0,0,W,H);
  c.fillStyle='#e4efb4';c.beginPath();c.arc(W*.84,H*.3,46,0,7);c.fill();
  var wt=c.createLinearGradient(0,hz,0,H);wt.addColorStop(0,'#3a7a52');wt.addColorStop(.45,'#1d5237');wt.addColorStop(1,'#0a2a1a');c.fillStyle=wt;c.fillRect(0,hz,W,H-hz);
  var rf=c.createLinearGradient(0,hz,0,H);rf.addColorStop(0,'rgba(214,230,160,.5)');rf.addColorStop(1,'rgba(214,230,160,.05)');c.fillStyle=rf;c.fillRect(W*.84-60,hz,120,H-hz);
  c.fillStyle='#0f3322';c.beginPath();c.moveTo(0,hz+6);c.bezierCurveTo(140,hz-62,300,hz-28,460,hz+6);c.lineTo(460,hz+14);c.lineTo(0,hz+14);c.fill();
  c.fillStyle='#143d29';c.beginPath();c.moveTo(W,hz+6);c.bezierCurveTo(W-160,hz-44,W-330,hz-16,W-520,hz+6);c.lineTo(W-520,hz+14);c.lineTo(W,hz+14);c.fill();
  /* pasada de pinceladas: el color sale de la base con variación; en el agua van horizontales, en el cielo siguen una corriente */
  var D=c.getImageData(0,0,W,H).data;
  function px(x,y){var k=((y|0)*W+(x|0))*4;return [D[k],D[k+1],D[k+2]]}
  function cl(v){return v<0?0:v>255?255:v|0}
  for(var i=0;i<5200;i++){
    var x=R()*W,y=R()*H,p=px(x,y),j=(R()-.5)*34,l=R()*18-6;
    var ang=y>hz?(R()-.5)*.16:Math.sin(x/190+y/130)*.55+(R()-.5)*.3;
    var len=36+R()*86,wd=9+R()*15;
    c.save();c.translate(x,y);c.rotate(ang);c.globalAlpha=.5+R()*.35;c.lineCap='round';c.lineWidth=wd;
    c.strokeStyle='rgb('+cl(p[0]+j*.6+l)+','+cl(p[1]+j+l)+','+cl(p[2]+j*.5+l)+')';
    c.beginPath();c.moveTo(-len/2,0);c.lineTo(len/2,(R()-.5)*8);c.stroke();
    /* cerdas: hilos finos más claros dentro de la pincelada */
    c.globalAlpha=.16;c.lineWidth=1.4;c.strokeStyle='rgb('+cl(p[0]+46)+','+cl(p[1]+52)+','+cl(p[2]+34)+')';
    for(var b=-2;b<=2;b++){c.beginPath();c.moveTo(-len/2,b*wd/5);c.lineTo(len/2,b*wd/5+(R()-.5)*3);c.stroke()}
    c.restore();
  }
  function pon(u){sec.style.setProperty('--pv','url("'+u+'")')}
  if(cv.toBlob)cv.toBlob(function(b){if(b)pon(URL.createObjectURL(b))},'image/jpeg',.84);else pon(cv.toDataURL('image/jpeg',.84));
  var st=document.createElement('style');
  st.textContent=
   '#cruces{border-radius:22px;padding:clamp(22px,4vw,44px) clamp(14px,3.5vw,40px);color:#f6f1e1;'
  +'background:linear-gradient(180deg,rgba(6,24,14,.5),rgba(6,24,14,.6)),var(--pv,none) center/cover no-repeat,#1d4a2e;'
  +'box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 24px 40px -28px rgba(0,0,0,.6)}'
  +'#cruces h2{color:#f6f1e1}#cruces .lead{color:#dbe8cf}';
  document.head.appendChild(st);
})();
