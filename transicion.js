/* transicion.js: la ficha del tubo se abre como si la tarjeta se expandiera en el panel del autor.
   Usa la API nativa de transiciones de vista; donde no existe (o si el sistema pide menos movimiento)
   no hace nada y la ficha se abre como siempre. Se carga después de los demás scripts para envolver openA. */
(function(){
  if(!document.startViewTransition||typeof window.openA!=='function')return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)');
  var panel=document.getElementById('panel');
  var previa=window.openA,activa=false;
  if(!panel)return;

  window.openA=function(id,noHash){
    var origen=document.querySelector('.oc.sel');
    if(activa||reduce.matches||!origen||panel.classList.contains('open'))return previa(id,noHash);
    activa=true;
    origen.style.viewTransitionName='autor';
    var espera=panel.style.transition;
    var vt=document.startViewTransition(function(){
      origen.style.viewTransitionName='';
      panel.style.transition='none';
      panel.style.viewTransitionName='autor';
      previa(id,noHash);
    });
    vt.finished.finally(function(){
      panel.style.viewTransitionName='';
      panel.style.transition=espera;
      origen.style.viewTransitionName='';
      activa=false;
    });
  };
})();
