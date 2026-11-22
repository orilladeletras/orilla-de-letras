/* nombre.js: nombre del sitio, texto de presentación y sin la categoría Poesía en filtros y tarjetas.
   Se carga al final para que su texto prevalezca sobre los que dejan los demás scripts. */
(function(){
  var DESC='Narrativa argentina y uruguaya, de Hidalgo a las voces de hoy: una ficha por autor o autora, con sus libros clave y las lecturas críticas que vale la pena conocer.';
  var INTRO='Narrativa argentina y uruguaya, de Hidalgo a las voces de hoy. Elegí un autor o una autora, mirá de qué libros se trata y qué se escribió sobre su obra.';
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
