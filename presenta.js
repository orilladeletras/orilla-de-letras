/* presenta.js: abre cada ficha con una voz crítica citada (paráfrasis con autor, año y enlace al estudio),
   junto a una mini tapa tipográfica original de la revista o repositorio de origen. */
(function(){
  var _i=document.getElementById('intro');if(_i)_i.textContent='Del cielito de Hidalgo y los diálogos de Ascasubi a Borges, Onetti y Cortázar: literatura uruguaya y argentina, escritores y escritoras del Río de la Plata, ordenados por época, género y obra, con los cruces que unen las dos orillas.';
  if(typeof VOCES==='undefined'||typeof window.openA!=='function')return;
  var PAL=[['#0F3F73','#f7f3e6','#ffd84a'],['#8c2f1b','#f7f3e6','#ffd84a'],['#1f3a34','#f1ead2','#e8b84a'],['#3b2a4d','#f4ecd8','#f2c14e'],['#14202e','#f7f3e6','#e07a3f'],['#5a3b1e','#f6edd6','#f0c75e'],['#1b4d4a','#f3efe0','#f2b134'],['#7a1f3d','#f7f3e6','#ffd84a']];
  var st=document.createElement('style');
  st.textContent='#panel .presenta{display:flex;gap:14px;align-items:flex-start;margin:18px 0 0;padding:14px 14px 14px 16px;border-left:3px solid var(--gold,#ffd84a);border-radius:0 12px 12px 0;background:rgba(255,216,74,.08)}'
  +'#panel .presenta .mt{flex:none;width:46px;height:62px;border-radius:2px 5px 5px 2px;position:relative;overflow:hidden;box-shadow:0 8px 14px -8px rgba(0,0,0,.6);display:grid;place-items:center;font:400 17px/1 "Instrument Serif",Georgia,serif;text-align:center;padding:4px}'
  +'#panel .presenta .mt::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:linear-gradient(90deg,rgba(0,0,0,.35),transparent)}'
  +'#panel .presenta .mt::after{content:"";position:absolute;left:8px;right:6px;top:7px;height:1.5px;background:currentColor;opacity:.7}'
  +'#panel .presenta p{margin:0;font:italic 400 17px/1.5 "Newsreader",Georgia,serif}'
  +'#panel .presenta cite{display:block;margin-top:8px;font:500 12px/1.4 var(--mono,monospace);font-style:normal;letter-spacing:.04em;opacity:.85}'
  +'#panel .presenta a{color:inherit;text-decoration:underline;text-underline-offset:3px}'
  +'@media (max-width:420px){#panel .presenta .mt{width:38px;height:52px;font-size:14px}}';
  document.head.appendChild(st);
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function primera(t){var i=t.search(/[.!?](\s|$)/);return i>-1?t.slice(0,i+1):t}
  function hs(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
  /* nombre corto de la fuente: lo anterior a «(», «.» o « en » */
  function fuente(l){var n=String(l||'').split(/ \(| en |\. /)[0].trim();return n}
  function sigla(n){
    if(n.length<=6)return n;
    var w=n.split(/\s+/).filter(function(x){return /^[A-ZÁÉÍÓÚÑ]/.test(x)});
    return (w.length>1?w.slice(0,3).map(function(x){return x[0]}).join(''):n.slice(0,3)).toUpperCase();
  }
  function presenta(id){
    var old=document.querySelector('#panel .presenta');if(old)old.remove();
    var x=VOCES[id],bio=document.getElementById('p-bio');
    if(!x||!x.v||!x.v.length||!bio)return;
    var p=x.v.filter(function(z){return z[2]})[0]||x.v[0];
    var nm=fuente(p[3]||p[0]),pl=PAL[hs(nm)%PAL.length];
    var q=document.createElement('blockquote');q.className='presenta';
    q.innerHTML='<div class="mt" aria-hidden="true" style="background:'+pl[0]+';color:'+pl[2]+'">'+esc(sigla(nm))+'</div>'
      +'<div><p>'+esc(primera(p[1]))+'</p><cite>— '+esc(p[0])+(p[2]?' · <a href="'+esc(p[2])+'" target="_blank" rel="noopener">leer el estudio ↗</a>':'')+'</cite></div>';
    bio.insertAdjacentElement('afterend',q);
  }
  var prev=window.openA;
  window.openA=function(id,noHash){prev(id,noHash);presenta(id)};
  var h=location.hash.slice(1),pn=document.getElementById('panel');
  if(h&&pn&&pn.classList.contains('open'))presenta(h);
})();
