(function(){
var W=900,H=300;
function R(a,b){return a+Math.random()*(b-a)}
function esc(ctx,v){
  var g=ctx.createLinearGradient(0,0,0,H*.64);
  g.addColorStop(0,'#6e1a1a');g.addColorStop(.35,'#c63a28');g.addColorStop(.7,'#ef8a2b');g.addColorStop(1,'#f8cf55');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  var sx=v==='a'?W*.68:W*.5,sy=H*.5,sr=H*.17;
  var h=ctx.createRadialGradient(sx,sy,sr*.2,sx,sy,sr*3.2);h.addColorStop(0,'rgba(255,240,170,.95)');h.addColorStop(.3,'rgba(250,200,70,.55)');h.addColorStop(1,'rgba(250,160,60,0)');
  ctx.fillStyle=h;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#fff0a6';ctx.beginPath();ctx.arc(sx,sy,sr,0,7);ctx.fill();
  var wy=H*.64;var w=ctx.createLinearGradient(0,wy,0,H);w.addColorStop(0,'#d24a2a');w.addColorStop(.5,'#8c1d1d');w.addColorStop(1,'#4a0d0f');
  ctx.fillStyle=w;ctx.fillRect(0,wy,W,H-wy);
  ctx.fillStyle='rgba(255,225,120,.75)';
  for(var i=0;i<26;i++){var ww=R(sr*.5,sr*1.6)*(1-i/34);ctx.fillRect(sx-ww/2+R(-8,8),wy+4+i*(H-wy)/27,ww,3.5)}
  ctx.fillStyle='#3d0b0d';
  function city(x0,x1,seed){var x=x0;while(x<x1){var bw=R(14,34),bh=R(18,76)*seed;ctx.fillRect(x,wy-bh,bw,bh+4);if(Math.random()<.25)ctx.fillRect(x+bw*.4,wy-bh-14,3,14);x+=bw+R(0,5)}}
  if(v==='a'){city(0,W*.34,1);city(W*.86,W,.6);
    ctx.fillRect(W*.2,wy-120,5,120);ctx.fillRect(W*.2-34,wy-118,70,5);ctx.fillRect(W*.2+30,wy-118,3,40);
    ctx.fillRect(W*.27,wy-92,4,92);ctx.fillRect(W*.27-6,wy-90,40,4);
  }else{city(0,W*.3,1.1);city(W*.7,W,1.1);
    ctx.fillRect(W*.45,wy-8,70,10);ctx.fillRect(W*.45+30,wy-48,3,40);
    ctx.beginPath();ctx.moveTo(W*.45+33,wy-48);ctx.lineTo(W*.45+33,wy-12);ctx.lineTo(W*.45+68,wy-12);ctx.closePath();ctx.fill();
    ctx.fillRect(W*.33,wy-4,40,6);ctx.fillRect(W*.62,wy-4,34,6);
    ctx.fillRect(W*.1,wy-130,5,130);ctx.fillRect(W*.1-28,wy-128,60,5);
    ctx.fillRect(W*.82,wy-110,5,110);ctx.fillRect(W*.82-20,wy-108,52,5);
  }
}
function pinta(cv,v){
  var base=document.createElement('canvas');base.width=W;base.height=H;var bc=base.getContext('2d');esc(bc,v);
  var data=bc.getImageData(0,0,W,H).data;
  cv.width=W;cv.height=H;var c=cv.getContext('2d');
  c.filter='blur(7px)';c.drawImage(base,0,0);c.filter='none';
  var sx=v==='a'?W*.68:W*.5,sy=H*.5,wy=H*.64,n=0,total=5200;
  function color(x,y,j){var i=((y|0)*W+(x|0))*4;var r=data[i]+R(-j,j),g=data[i+1]+R(-j,j),b=data[i+2]+R(-j,j);return 'rgb('+(r|0)+','+(g|0)+','+(b|0)+')'}
  function trazo(){
    var x=R(0,W),y=R(0,H),ang;
    if(y>wy)ang=R(-.08,.08);
    else{var dx=x-sx,dy=y-sy,d=Math.sqrt(dx*dx+dy*dy);if(d<H*.7)ang=Math.atan2(dy,dx)+Math.PI/2+R(-.25,.25);else ang=R(-.5,.5)+(x<W*.35&&y>wy-90?-Math.PI/2:0)}
    var L=R(18,56),wd=R(5,13),cx=Math.cos(ang),cy=Math.sin(ang);
    for(var k=0;k<5;k++){var o=(k-2)*wd/5;var px=x-cy*o,py=y+cx*o;
      c.strokeStyle=color(x,y,14);c.globalAlpha=.78;c.lineWidth=wd/4+R(0,1.4);c.lineCap='round';
      c.beginPath();c.moveTo(px-cx*L/2,py-cy*L/2);c.quadraticCurveTo(px+R(-4,4)-cy*3,py+R(-4,4)+cx*3,px+cx*L/2,py+cy*L/2);c.stroke()}
    c.globalAlpha=1;
  }
  function paso(){for(var i=0;i<110&&n<total;i++,n++)trazo();if(n<total)requestAnimationFrame(paso)}
  paso();
}
var css=document.createElement('style');
css.textContent='.sec.cal{position:relative}.sec.cal>*:not(.calcv){position:relative;z-index:1}.calcv{position:absolute!important;top:0;left:50%;width:100vw;height:270px;transform:translateX(-50%);object-fit:cover;z-index:0!important;pointer-events:none;-webkit-mask-image:linear-gradient(180deg,#000 62%,transparent 100%);mask-image:linear-gradient(180deg,#000 62%,transparent 100%)}.sec.cal>h2{color:#fff3d6!important;text-shadow:0 2px 16px rgba(80,8,8,.75)}.sec.cal>.lead{color:#ffe7bd!important;text-shadow:0 1px 10px rgba(80,8,8,.8)}';
document.head.appendChild(css);
[['autores','a'],['cruces','b']].forEach(function(p){
  var s=document.getElementById(p[0]);if(!s)return;
  s.classList.add('cal');var cv=document.createElement('canvas');cv.className='calcv';cv.setAttribute('role','img');cv.setAttribute('aria-label','Pintura al óleo en rojos y amarillos de un atardecer sobre el puerto');s.insertBefore(cv,s.firstChild);
  var hecho=false;function go(){if(hecho)return;hecho=true;pinta(cv,p[1])}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();go()}},{rootMargin:'300px'});io.observe(s)}else go();
});
})();
