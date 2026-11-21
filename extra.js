(function(){
var css=document.createElement('style');
css.textContent=[
'#autores .chips{display:none!important}',
'#tl{perspective:900px}',
'#tl .dot{transform-style:preserve-3d}',
'#tl .dot i{display:block;width:17px;height:17px;border-radius:50%;background:radial-gradient(circle at 36% 30%,rgba(255,255,255,.75) 0,rgba(255,255,255,0) 38%),radial-gradient(circle,rgba(90,170,235,.95) 0,rgba(26,107,184,.8) 50%,rgba(10,42,76,0) 100%);filter:blur(1.3px) brightness(calc(1 + var(--n,0)*.35));box-shadow:0 0 14px rgba(70,150,230,.55);transform:translateZ(calc(var(--n,0)*34px)) translateY(calc(var(--n,0)*-7px)) scale(calc(1 + var(--n,0)*.55))}',
'#tl .dot.ar i{background:radial-gradient(circle at 36% 30%,rgba(255,255,255,.75) 0,rgba(255,255,255,0) 38%),radial-gradient(circle,rgba(255,215,110,.95) 0,rgba(232,150,42,.8) 50%,rgba(122,61,5,0) 100%);box-shadow:0 0 14px rgba(255,170,60,.55)}',
'#tl .tlin{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:linear-gradient(180deg,rgba(255,216,74,0),#ffd84a 18%,#f2603a 80%,rgba(242,96,58,0));box-shadow:0 0 14px 2px rgba(255,170,60,.55);pointer-events:none;z-index:5}',
'#tl .tlin b{position:absolute;top:-4px;left:50%;transform:translateX(-50%);padding:2px 7px;border-radius:10px;background:#1a0f0a;color:#ffd84a;font:500 11px "DM Mono",monospace;white-space:nowrap}'
].join('');
document.head.appendChild(css);
var tl=document.getElementById('tl');if(!tl)return;
if(getComputedStyle(tl).position==='static')tl.style.position='relative';
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
