/* presenta.js: abre cada ficha con una voz crítica citada (paráfrasis con autor, año y enlace al estudio). */
(function(){
  if(typeof VOCES==='undefined'||typeof window.openA!=='function')return;
  var st=document.createElement('style');
  st.textContent='#panel .presenta{margin:18px 0 0;padding:2px 0 2px 16px;border-left:3px solid var(--gold,#ffd84a);font:italic 400 17px/1.5 "Newsreader",Georgia,serif}'
  +'#panel .presenta cite{display:block;margin-top:8px;font:500 12px/1.4 var(--mono,monospace);font-style:normal;letter-spacing:.04em;opacity:.85}'
  +'#panel .presenta a{color:inherit;text-decoration:underline;text-underline-offset:3px}';
  document.head.appendChild(st);
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function primera(t){var i=t.search(/[.!?](\s|$)/);return i>-1?t.slice(0,i+1):t}
  function presenta(id){
    var old=document.querySelector('#panel .presenta');if(old)old.remove();
    var x=VOCES[id],bio=document.getElementById('p-bio');
    if(!x||!x.v||!x.v.length||!bio)return;
    var p=x.v.filter(function(z){return z[2]})[0]||x.v[0];
    var q=document.createElement('blockquote');q.className='presenta';
    q.innerHTML=esc(primera(p[1]))+'<cite>— '+esc(p[0])+(p[2]?' · <a href="'+esc(p[2])+'" target="_blank" rel="noopener">leer el estudio ↗</a>':'')+'</cite>';
    bio.insertAdjacentElement('afterend',q);
  }
  var prev=window.openA;
  window.openA=function(id,noHash){prev(id,noHash);presenta(id)};
  var h=location.hash.slice(1),pn=document.getElementById('panel');
  if(h&&pn&&pn.classList.contains('open'))presenta(h);
})();
