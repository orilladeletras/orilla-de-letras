/* colores.js: un color propio para cada autor (tarjetas de la lista y del remolino).
   Se reparte el matiz con el ángulo áureo para que dos vecinos nunca se parezcan. */
(function(){
  var grid=document.getElementById('grid');if(!grid||typeof A==='undefined')return;
  var ix={};A.forEach(function(a,i){ix[a.id]=i});
  function pinta(){
    grid.querySelectorAll('.card').forEach(function(c){
      var i=ix[c.dataset.id];if(i===undefined)return;
      var h=Math.round((i*137.508+24)%360),col='hsl('+h+' 58% 38%)';
      c.style.setProperty('--e',col);c.style.setProperty('--c',col);
    });
  }
  pinta();
  new MutationObserver(pinta).observe(grid,{childList:true});
})();
