/* nombre.js: nombre del sitio, texto de presentación y sin la categoría Poesía en filtros y tarjetas.
   Se carga al final para que su texto prevalezca sobre los que dejan los demás scripts. */
(function(){
  var DESC='Narrativa argentina y uruguaya del siglo XX y XXI. Obras, críticas, ensayos y trabajos académicos sobre narradoras y narradores del Río de la Plata.';
  var INTRO='Del siglo XX y XXI. Obras, críticas, ensayos y trabajos académicos sobre narradoras y narradores del Río de la Plata.';
  var i=document.getElementById('intro');if(i)i.textContent=INTRO;
  var h=document.querySelector('.hero h1');if(h)h.innerHTML='Narrativa <em><span class="ar">argentina</span> y <span class="uy">uruguaya</span></em>';
  var b=document.querySelector('.bar .brand');if(b)b.textContent='Narrativa Argentina y Uruguaya';
  /* la categoría Poesía sale de los filtros y de las etiquetas de las tarjetas */
  function limpia(){
    document.querySelectorAll('#gens .chip').forEach(function(c){if(c.dataset.v==='Poesía')c.remove()});
    document.querySelectorAll('#grid .card *').forEach(function(e){if(!e.children.length&&e.textContent.trim()==='Poesía')e.remove()});
  }
  limpia();
  var g=document.getElementById('grid');
  if(g)new MutationObserver(limpia).observe(g,{childList:true});
})();
