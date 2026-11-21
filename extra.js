(function(){
var css=document.createElement('style');
css.textContent=[
'#autores .chips{display:none!important}',
'#tl{scrollbar-width:thin;scrollbar-color:rgba(255,216,74,.55) transparent}',
'#tl::-webkit-scrollbar{height:4px}',
'#tl::-webkit-scrollbar-track{background:transparent}',
'#tl::-webkit-scrollbar-thumb{background:rgba(255,216,74,.55);border-radius:4px}',
'#tl{perspective:900px}',
'#tl .dot{transform-style:preserve-3d}',
'#tl .dot i{display:block;width:17px;height:17px;border-radius:50%;background:radial-gradient(circle at 36% 30%,rgba(255,255,255,.75) 0,rgba(255,255,255,0) 38%),radial-gradient(circle,rgba(90,170,235,.95) 0,rgba(26,107,184,.8) 50%,rgba(10,42,76,0) 100%);filter:blur(1.3px) brightness(calc(1 + var(--n,0)*.35));box-shadow:0 0 14px rgba(70,150,230,.55);transform:translateZ(calc(var(--n,0)*34px)) translateY(calc(var(--n,0)*-7px)) scale(calc(1 + var(--n,0)*.55))}',
'#tl .dot.ar i{background:radial-gradient(circle at 36% 30%,rgba(255,255,255,.75) 0,rgba(255,255,255,0) 38%),radial-gradient(circle,rgba(255,215,110,.95) 0,rgba(232,150,42,.8) 50%,rgba(122,61,5,0) 100%);box-shadow:0 0 14px rgba(255,170,60,.55)}',
'#tl .tlin{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:linear-gradient(180deg,rgba(255,216,74,0),#ffd84a 18%,#f2603a 80%,rgba(242,96,58,0));box-shadow:0 0 14px 2px rgba(255,170,60,.55);pointer-events:none;z-index:5}',
'#tl .tlin b{position:absolute;top:-4px;left:50%;transform:translateX(-50%);padding:2px 7px;border-radius:10px;background:#1a0f0a;color:#ffd84a;font:500 11px "DM Mono",monospace;white-space:nowrap}'
].join('');
document.head.appendChild(css);
if(!document.querySelector('link[rel*=icon]')){var fv=document.createElement('link');fv.rel='icon';fv.type='image/svg+xml';fv.href='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0B2540"/><rect x="8" y="22" width="48" height="22" rx="4" fill="#f7f3e6" stroke="#ffd84a" stroke-width="3"/><rect x="8" y="22" width="48" height="7" rx="3" fill="#155FA8"/></svg>');document.head.appendChild(fv)}
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
  if(vis&&!red)requestAnimationFrame(frame)
}
var vis=true,red=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window){new IntersectionObserver(function(en){var v=en[0].isIntersecting;if(v&&!vis&&!red){vis=true;requestAnimationFrame(frame)}else vis=v}).observe(tl)}
if(red){x=tl.scrollWidth*.5;frame(0)}else requestAnimationFrame(frame);
})();

(function(){
var NS='orilladeletras-ol',B='https://abacus.jasoncameron.dev/';
var PA={UY:'Uruguay',AR:'Argentina',BR:'Brasil',CL:'Chile',PY:'Paraguay',ES:'España',US:'Estados Unidos',MX:'México',CO:'Colombia',PE:'Perú',FR:'Francia',DE:'Alemania'};
var CI=['Montevideo','Buenos Aires','Rosario','Córdoba','La Plata','Mendoza','Salto','Paysandú','Maldonado','Colonia del Sacramento','Rivera','Madrid'];
function slug(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function hit(k){return fetch(B+'hit/'+NS+'/'+k).catch(function(){})}
function get(k){return fetch(B+'get/'+NS+'/'+k).then(function(r){return r.ok?r.json():{value:0}}).then(function(j){return j.value||0}).catch(function(){return 0})}
try{if(!sessionStorage.getItem('ol_lug')){sessionStorage.setItem('ol_lug','1');
fetch('https://ipwho.is/?fields=success,country_code,city').then(function(r){return r.json()}).then(function(g){
if(!g||!g.success)return;hit('p-'+(PA[g.country_code]?g.country_code:'otros'));
var cs=slug(g.city);for(var i=0;i<CI.length;i++)if(slug(CI[i])===cs){hit('c-'+cs);break}}).catch(function(){})}}catch(e){}
var st=document.createElement('style');
st.textContent='.vlugb{position:fixed;left:12px;bottom:40px;z-index:56;padding:3px 9px;border-radius:12px;border:0;background:#0B2540;color:#ffd84a;font:500 11px "DM Mono",monospace;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.35)}.vlug{position:fixed;left:12px;bottom:68px;z-index:56;max-width:260px;padding:10px 12px;border-radius:10px;background:rgba(11,37,64,.96);color:#e8f1fb;font:12px/1.5 "DM Mono",monospace;box-shadow:0 6px 18px rgba(0,0,0,.4)}.vlug b{color:#ffd84a;font-weight:500}.vlug small{display:block;opacity:.6;margin-top:6px}';
document.head.appendChild(st);
var bt=document.createElement('button');bt.type='button';bt.className='vlugb';bt.textContent='📍 de dónde';document.body.appendChild(bt);
var pn=null;
bt.addEventListener('click',function(){
 if(pn){pn.remove();pn=null;return}
 pn=document.createElement('div');pn.className='vlug';pn.textContent='Cargando lugares…';document.body.appendChild(pn);
 var ks=Object.keys(PA).map(function(c){return ['p-'+c,PA[c]]}).concat([['p-otros','Otros países']]).concat(CI.map(function(c){return ['c-'+slug(c),c]}));
 Promise.all(ks.map(function(k){return get(k[0])})).then(function(v){
  if(!pn)return;var P=[],C=[];
  ks.forEach(function(k,i){if(v[i]>0)(k[0].charAt(0)==='p'?P:C).push([k[1],v[i]])});
  function f(a){return a.sort(function(x,y){return y[1]-x[1]}).map(function(x){return x[0]+' <b>'+x[1]+'</b>'}).join(' · ')}
  pn.innerHTML=(P.length||C.length)?('<div>'+(P.length?f(P):'Aún sin datos')+'</div>'+(C.length?'<div style="margin-top:6px">'+f(C)+'</div>':'')+'<small>Lugares aproximados de las visitas desde que se activó el registro.</small>'):'Todavía no hay visitas registradas por lugar.';
 })});
})();

/*mejoras-func*/
(function(){
var q=document.getElementById('q'),p=document.getElementById('panel');
document.addEventListener('keydown',function(e){
 var t=e.target,tag=t&&t.tagName;
 if(e.key==='/'&&q&&tag!=='INPUT'&&tag!=='TEXTAREA'&&!e.ctrlKey&&!e.metaKey){e.preventDefault();q.focus();q.select&&q.select()}
 else if(e.key==='Escape'&&p&&p.classList.contains('open')){var c=document.getElementById('close');c&&c.click()}
});
if(q&&!q.dataset.ay){q.dataset.ay=1;q.setAttribute('aria-keyshortcuts','/');q.placeholder=q.placeholder+'  ( / )'}
if(p){
 var st=document.createElement('style');
 st.textContent='.cplink{margin:0 0 0 8px;font:500 12px/1 "DM Mono",monospace;letter-spacing:.04em;padding:9px 12px;min-height:36px;border:1px solid currentColor;border-radius:999px;background:transparent;color:inherit;cursor:pointer;opacity:.8}.cplink:hover,.cplink:focus-visible{opacity:1}';
 document.head.appendChild(st);
 var put=function(){
  if(p.querySelector('.cplink'))return;
  var nx=p.querySelector('#next');if(!nx)return;
  var b=document.createElement('button');b.type='button';b.className='cplink';b.textContent='Copiar enlace';
  b.addEventListener('click',function(){
   var u=location.href,ok=function(){b.textContent='¡Copiado!';setTimeout(function(){b.textContent='Copiar enlace'},1600)};
   if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(ok,function(){});else{var a=document.createElement('textarea');a.value=u;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(_){}a.remove()}
  });
  nx.insertAdjacentElement('afterend',b);
 };
 put();
 new MutationObserver(put).observe(p,{childList:true,subtree:true});
}
var ld=document.createElement('script');ld.type='application/ld+json';
ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'Orilla de Letras',inLanguage:'es',description:'Literatura uruguaya y argentina: autores, cruces y crítica del Río de la Plata.',url:location.origin+location.pathname});
document.head.appendChild(ld);
})();

/*sugerencia*/
(function(){
var q=document.getElementById('q');if(!q)return;
var box=document.createElement('div');box.setAttribute('role','status');box.setAttribute('aria-live','polite');
box.style.cssText='font:400 14px/1.4 "Hanken Grotesk",sans-serif;margin:8px 4px 0;min-height:0';
q.insertAdjacentElement('afterend',box);
function n(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').trim()}
function d(a,b){var m=a.length,k=b.length,p=[],i,j,c;for(j=0;j<=k;j++)p[j]=j;for(i=1;i<=m;i++){var l=p[0];p[0]=i;for(j=1;j<=k;j++){c=p[j];p[j]=Math.min(p[j]+1,p[j-1]+1,l+(a[i-1]===b[j-1]?0:1));l=c}}return p[k]}
function names(){var o=[],s={};document.querySelectorAll('.dot[data-id]').forEach(function(x){var t=(x.textContent||'').trim();if(t&&!s[t]){s[t]=1;o.push(t)}});return o}
function run(){
 var v=n(q.value);box.textContent='';
 if(v.length<3)return;
 var best=null,bd=9,hit=false;
 names().forEach(function(t){var w=n(t);if(w.indexOf(v)>-1){hit=true}var dd=Math.min(d(v,w),d(v,w.split(' ').pop()));if(dd<bd){bd=dd;best=t}});
 if(hit||!best||bd>Math.max(1,Math.floor(v.length/4)))return;
 var a=document.createElement('button');a.type='button';a.textContent=best;
 a.style.cssText='font:inherit;font-weight:600;text-decoration:underline;background:none;border:0;padding:8px 2px;min-height:36px;color:inherit;cursor:pointer';
 a.addEventListener('click',function(){q.value=best;q.dispatchEvent(new Event('input',{bubbles:true}));box.textContent=''});
 box.appendChild(document.createTextNode('¿Quisiste decir '));box.appendChild(a);box.appendChild(document.createTextNode('?'));
}
var tm;q.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(run,220)});
})();
