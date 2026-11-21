(function(){
var css=document.createElement('style');
css.textContent=[
'#autores .chips{display:none!important}',
'#tl{perspective:900px}',
'#tl .dot{transform-style:preserve-3d}',
'#tl .dot i{display:block;width:15px;height:15px;border-radius:50%;background:radial-gradient(circle at 32% 28%,#fff 0,rgba(255,255,255,0) 24%),radial-gradient(circle at 36% 32%,#7cc4f4 0,#1a6bb8 55%,#0a2a4c 100%);box-shadow:inset -3px -4px 6px rgba(0,0,0,.38),0 7px 9px rgba(0,0,0,.4);transform:translateZ(calc(var(--n,0)*34px)) translateY(calc(var(--n,0)*-7px)) scale(calc(1 + var(--n,0)*.55));transition:filter .2s}',
'#tl .dot.ar i{background:radial-gradient(circle at 32% 28%,#fff 0,rgba(255,255,255,0) 24%),radial-gradient(circle at 36% 32%,#ffe08a 0,#e8962a 55%,#7a3d05 100%)}',
'#tl .dot i{filter:brightness(calc(1 + var(--n,0)*.35))}',
'#tl .tlin{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:linear-gradient(180deg,rgba(255,216,74,0),#ffd84a 18%,#f2603a 80%,rgba(242,96,58,0));box-shadow:0 0 14px 2px rgba(255,170,60,.55);pointer-events:none;z-index:5}',
'#tl .tlin b{position:absolute;top:-4px;left:50%;transform:translateX(-50%);padding:2px 7px;border-radius:10px;background:#1a0f0a;color:#ffd84a;font:500 11px "DM Mono",monospace;white-space:nowrap}'
].join('');
document.head.appendChild(css);
var tl=document.getElementById('tl');if(!tl)return;
if(getComputedStyle(tl).position==='static')tl.style.position='relative';
var ln=document.createElement('div');ln.className='tlin';ln.innerHTML='<b></b>';tl.appendChild(ln);
var lab=ln.firstChild,x=0,target=null,t0=performance.now(),dir=1,pos=0;
tl.addEventListener('pointermove',function(e){var r=tl.getBoundingClientRect();target=Math.max(0,Math.min(r.width,e.clientX-r.left))});
tl.addEventListener('pointerleave',function(){target=null;pos=x/tl.clientWidth});
function frame(now){
  var W=tl.clientWidth;
  if(target!==null){x+=(target-x)*.18}
  else{pos+=dir*.0009;if(pos>1){pos=1;dir=-1}if(pos<0){pos=0;dir=1}x+=(pos*W-x)*.08}
  ln.style.left=x+'px';
  lab.textContent=Math.round(1800+x/W*220);
  var ds=tl.querySelectorAll('.dot');
  for(var i=0;i<ds.length;i++){var d=ds[i];var dx=Math.abs(d.offsetLeft+d.offsetWidth/2-x);var n=Math.max(0,1-dx/70);d.style.setProperty('--n',n.toFixed(3))}
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame);
})();
