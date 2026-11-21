(function(){
var css=document.createElement('style');
css.textContent=[
'#autores .chips{display:none!important}',
'#autores .controls{position:relative;z-index:0;max-width:440px;margin:56px auto 26px;padding:40px 26px 20px;border:0;border-radius:6px 6px 16px 16px/6px 6px 24px 24px;background:linear-gradient(90deg,#666c74 0,#c9ced3 16%,#f4f6f7 33%,#b4bac0 62%,#767c84 100%);box-shadow:0 20px 28px rgba(0,0,0,.35),inset 0 -12px 16px rgba(0,0,0,.22)}',
'#autores .controls::before{content:"";position:absolute;left:-7px;right:-7px;top:-16px;height:36px;border-radius:50%;background:radial-gradient(ellipse at 50% 58%,#ffd84a 0,#f2a21c 34%,#d9341d 62%,#7b1010 100%);box-shadow:inset 0 -5px 7px rgba(0,0,0,.32),0 4px 0 #959ba3,0 6px 8px rgba(0,0,0,.3);z-index:2}',
'#autores .controls::after{content:"";position:absolute;left:13%;top:12px;width:13px;height:36px;border-radius:0 0 8px 8px;background:linear-gradient(90deg,#b8200f,#ef4a2a);box-shadow:120px 8px 0 0 #f7b52a,235px -2px 0 -1px #d9341d;z-index:3}',
'#autores .controls .asa{position:absolute;left:7%;right:7%;top:-52px;height:58px;border:5px solid #858b92;border-bottom:0;border-radius:90px 90px 0 0;z-index:-1;pointer-events:none}',
'#autores .controls .search{position:relative;z-index:4;width:100%;box-sizing:border-box;background:#fff6dc;border:2px solid #a8281a;border-radius:6px;padding:12px 14px;font:italic 19px "Instrument Serif",Georgia,serif;color:#2b1a12;box-shadow:inset 0 2px 5px rgba(0,0,0,.18)}',
'#autores .controls .count{position:relative;z-index:4;text-align:center;margin-top:10px;color:#2b2f34;font-family:"DM Mono",monospace;font-size:12px}',
'#tl{perspective:900px}',
'#tl .dot{transform-style:preserve-3d}',
'#tl .dot i{display:block;width:15px;height:15px;border-radius:50%;background:radial-gradient(circle at 32% 28%,#fff 0,rgba(255,255,255,0) 24%),radial-gradient(circle at 36% 32%,#7cc4f4 0,#1a6bb8 55%,#0a2a4c 100%);box-shadow:inset -3px -4px 6px rgba(0,0,0,.38),0 7px 9px rgba(0,0,0,.4);transform:translateZ(calc(var(--n,0)*34px)) translateY(calc(var(--n,0)*-7px)) scale(calc(1 + var(--n,0)*.55));transition:filter .2s}',
'#tl .dot.ar i{background:radial-gradient(circle at 32% 28%,#fff 0,rgba(255,255,255,0) 24%),radial-gradient(circle at 36% 32%,#ffe08a 0,#e8962a 55%,#7a3d05 100%)}',
'#tl .dot i{filter:brightness(calc(1 + var(--n,0)*.35))}',
'#tl .tlin{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:linear-gradient(180deg,rgba(255,216,74,0),#ffd84a 18%,#f2603a 80%,rgba(242,96,58,0));box-shadow:0 0 14px 2px rgba(255,170,60,.55);pointer-events:none;z-index:5}',
'#tl .tlin b{position:absolute;top:-4px;left:50%;transform:translateX(-50%);padding:2px 7px;border-radius:10px;background:#1a0f0a;color:#ffd84a;font:500 11px "DM Mono",monospace;white-space:nowrap}'
].join('');
document.head.appendChild(css);
var c=document.querySelector('#autores .controls');
if(c&&!c.querySelector('.asa')){var a=document.createElement('div');a.className='asa';c.insertBefore(a,c.firstChild)}
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
