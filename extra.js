(function(){
var css=document.createElement('style');
css.textContent=[
'#autores .chips{display:none!important}',
'#tl{scrollbar-width:thin;scrollbar-color:rgba(255,216,74,.55) transparent}',
'#tl::-webkit-scrollbar{height:4px}',
'#tl::-webkit-scrollbar-track{background:transparent}',
'#tl::-webkit-scrollbar-thumb{background:rgba(255,216,74,.55);border-radius:4px}',
'.hero-cta a.chapa{position:relative;border:0!important;border-radius:4px!important;color:#f6fbe8!important;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 2px rgba(8,40,20,.75);background:linear-gradient(7deg,transparent 0 34%,rgba(190,235,170,.55) 34% 42%,transparent 42% 100%),linear-gradient(-5deg,transparent 0 62%,rgba(20,80,44,.45) 62% 70%,transparent 70% 100%),repeating-linear-gradient(177deg,#3f9a5c 0 4px,#5db374 4px 7px,#2f8250 7px 11px,#8fd085 11px 13px,#4aa468 13px 17px)!important;box-shadow:0 2px 0 rgba(8,40,20,.35),0 6px 12px rgba(0,0,0,.25)!important;filter:url(#pincel);transform:rotate(-.6deg);transition:transform .2s}',
'.hero-cta a.chapa[data-pais=ARGENTINA]{background:linear-gradient(-6deg,transparent 0 30%,rgba(200,240,170,.5) 30% 38%,transparent 38% 100%),linear-gradient(4deg,transparent 0 64%,rgba(14,64,34,.45) 64% 72%,transparent 72% 100%),repeating-linear-gradient(181deg,#348a52 0 4px,#52ac6c 4px 7px,#27744a 7px 11px,#96d48a 11px 13px,#42a064 13px 17px)!important;transform:rotate(.6deg)}',
'.hero-cta a.chapa::before,.hero-cta a.chapa::after{display:none!important}',
'.hero-cta a.chapa:hover{transform:rotate(0) translateY(-2px)}',
'#tl{perspective:900px}',
'#tl .dot{transform-style:preserve-3d}',
'#tl .dot i{display:block;width:17px;height:17px;border-radius:50%;background:radial-gradient(circle at 36% 30%,rgba(255,255,255,.75) 0,rgba(255,255,255,0) 38%),radial-gradient(circle,rgba(90,170,235,.95) 0,rgba(26,107,184,.8) 50%,rgba(10,42,76,0) 100%);filter:blur(1.3px) brightness(calc(1 + var(--n,0)*.35));box-shadow:0 0 14px rgba(70,150,230,.55);transform:translateZ(calc(var(--n,0)*34px)) translateY(calc(var(--n,0)*-7px)) scale(calc(1 + var(--n,0)*.55))}',
'#tl .dot.ar i{background:radial-gradient(circle at 36% 30%,rgba(255,255,255,.75) 0,rgba(255,255,255,0) 38%),radial-gradient(circle,rgba(255,215,110,.95) 0,rgba(232,150,42,.8) 50%,rgba(122,61,5,0) 100%);box-shadow:0 0 14px rgba(255,170,60,.55)}',
'#tl .tlin{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:linear-gradient(180deg,rgba(255,216,74,0),#ffd84a 18%,#f2603a 80%,rgba(242,96,58,0));box-shadow:0 0 14px 2px rgba(255,170,60,.55);pointer-events:none;z-index:5}',
'#tl .tlin b{position:absolute;top:-4px;left:50%;transform:translateX(-50%);padding:2px 7px;border-radius:10px;background:#1a0f0a;color:#ffd84a;font:500 11px "DM Mono",monospace;white-space:nowrap}'
].join('');
document.head.appendChild(css);
var sv=document.createElement('div');sv.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="pincel" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".025 .1" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter></svg>';document.body.appendChild(sv.firstChild);
var tl=document.getElementById('tl');if(!tl)return;
if(getComputedStyle(tl).position==='static')tl.style.position='relative';
tl.style.height='150px';[].forEach.call(tl.querySelectorAll('.dot'),function(d){var y=parseFloat(d.style.top);if(!isNaN(y))d.style.top=(24+(y-62)*.42)+'px'});[].forEach.call(tl.querySelectorAll('.tick'),function(k){k.style.top='125px'});
var ln=document.createElement('div');ln.className='tlin';ln.innerHTML='<b></b>';tl.appendChild(ln);
var lab=ln.firstChild,x=0,target=null,t0=performance.now(),dir=1,pos=0;
tl.addEventListener('pointermove',function(e){var r=tl.getBoundingClientRect();target=Math.max(0,Math.min(tl.scrollWidth,e.clientX-r.left+tl.scrollLeft))});
tl.addEventListener('pointerleave',function(){target=null;pos=x/tl.scrollWidth});
function frame(now){
  var W=tl.scrollWidth;
  if(target!==null){x+=(target-x)*.18}
  else{pos+=dir*.0009;if(pos>1){pos=1;dir=-1}if(pos<0){pos=0;dir=1}x+=(pos*W-x)*.08;tl.scrollLeft+=((x-tl.clientWidth/2)-tl.scrollLeft)*.05}
  ln.style.left=x+'px';
  lab.textContent=Math.round(1800+x/W*220);
  var ds=tl.querySelectorAll('.dot');
  for(var i=0;i<ds.length;i++){var d=ds[i];var dx=Math.abs(d.offsetLeft+d.offsetWidth/2-x);var n=Math.max(0,1-dx/70);d.style.setProperty('--n',n.toFixed(3))}
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame);
})();
