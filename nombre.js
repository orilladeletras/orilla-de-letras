/* nombre.js: nombre del sitio, texto de presentación y sin la categoría Poesía en filtros y tarjetas.
   Se carga al final para que su texto prevalezca sobre los que dejan los demás scripts. */
(function(){
  var DESC='Narrativa argentina y uruguaya fuera del molde realista: cuentos y novelas fantásticos, extraños y raros, con una ficha por autor, sus libros clave y lo mejor que se escribió sobre ellos.';
  var INTRO='Cuentos y novelas que se corren del realismo: lo fantástico, lo extraño, lo raro. Elegí un autor, mirá de qué libros se trata y qué se escribió sobre él.';
  var i=document.getElementById('intro');if(i)i.textContent=INTRO;
  var h=document.querySelector('.hero h1');if(h)h.innerHTML='Narrativa <em>argentina y uruguaya</em>';
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
