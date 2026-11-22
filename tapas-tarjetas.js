/* tapas-tarjetas.js: en cada tarjeta de autor, un fragmento claro y translúcido de la tapa de una edición.
   Real: ediciones antiguas en dominio público (créditos en /creditos/). Resto: tapa tipográfica original de Orilla de Letras. */
(function(){
  var grid=document.getElementById('grid');if(!grid||typeof A==='undefined')return;
  var W='https://thumb.wikimedia.org/wikipedia/commons/thumb/';
  var REAL={
   hernandez:W+'a/a2/El_gaucho_martinfierro_1872.jpg/500px-El_gaucho_martinfierro_1872.jpg',
   echeverria:W+'3/35/La_cautiva_-_Esteban_Echeverria.pdf/page1-500px-La_cautiva_-_Esteban_Echeverria.pdf.jpg',
   herrera:W+'7/71/Opalos_Julio_Herrera_y_Reissig.pdf/page1-500px-Opalos_Julio_Herrera_y_Reissig.pdf.jpg',
   quiroga:W+'d/d4/Horacio_Quiroga_-_Anaconda_%281921%29.pdf/page1-500px-Horacio_Quiroga_-_Anaconda_%281921%29.pdf.jpg',
   storni:W+'b/bc/La_inquietud_del_rosal_%281916%29.pdf/page1-500px-La_inquietud_del_rosal_%281916%29.pdf.jpg',
   lugones:W+'f/f7/Lunario_sentimental_Leopoldo_Lugones.pdf/page1-500px-Lunario_sentimental_Leopoldo_Lugones.pdf.jpg',
   agustini:'https://upload.wikimedia.org/wikipedia/commons/8/8d/Portada_de_El_libro_blanco.jpg',
   borges:W+'1/1a/Fervor_de_buenos_aires_cover_1923.jpg/500px-Fervor_de_buenos_aires_cover_1923.jpg'
  };
  var PAL=[['#0F3F73','#f7f3e6','#ffd84a'],['#8c2f1b','#f7f3e6','#ffd84a'],['#1f3a34','#f1ead2','#e8b84a'],['#3b2a4d','#f4ecd8','#f2c14e'],['#14202e','#f7f3e6','#e07a3f'],['#5a3b1e','#f6edd6','#f0c75e'],['#1b4d4a','#f3efe0','#f2b134'],['#7a1f3d','#f7f3e6','#ffd84a']];
  var MOT=[
   '<g fill="none" stroke="A" stroke-width="1.6"><path d="M60 60h170v170H60z"/><path d="M80 80h130v130H80z"/><path d="M100 100h90v90h-90z"/><path d="M60 60l60 60M230 60l-60 60M60 230l60-60M230 230l-60-60"/></g>',
   '<g fill="none" stroke="A" stroke-width="1.6"><rect x="95" y="40" width="46" height="46"/><rect x="95" y="86" width="46" height="46"/><rect x="95" y="132" width="46" height="46"/><rect x="49" y="178" width="46" height="46"/><rect x="141" y="178" width="46" height="46"/><circle cx="118" cy="256" r="23"/></g>',
   '<g fill="none" stroke="A" stroke-width="1.6"><path d="M30 250h230"/><path d="M60 250V120l70-50 70 50v130"/><path d="M100 250V150h60v100"/></g>',
   '<g fill="none" stroke="A" stroke-width="1.6"><circle cx="145" cy="150" r="90"/><circle cx="145" cy="150" r="60"/><circle cx="145" cy="150" r="30"/><path d="M55 150h180M145 60v180"/></g>',
   '<g fill="none" stroke="A" stroke-width="1.6"><path d="M20 230c40-50 80-50 120 0s80 50 120 0"/><path d="M20 190c40-50 80-50 120 0s80 50 120 0" opacity=".7"/><path d="M20 150c40-50 80-50 120 0s80 50 120 0" opacity=".45"/><circle cx="215" cy="80" r="26"/></g>',
   '<g fill="none" stroke="A" stroke-width="1.6"><path d="M145 50l95 170H50z"/><path d="M145 100l55 100h-110z"/><path d="M145 150l22 40h-44z"/></g>'
  ];
  function hs(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var st=document.createElement('style');
  st.textContent=
   '#grid .card>.tapa-c{position:absolute;z-index:0;right:-34px;top:-12px;bottom:-12px;width:62%;overflow:hidden;pointer-events:none;opacity:.2;transform:rotate(5deg);transform-origin:70% 50%;'
  +'-webkit-mask-image:linear-gradient(to left,#000 25%,transparent 100%);mask-image:linear-gradient(to left,#000 25%,transparent 100%);transition:opacity .4s,transform .5s cubic-bezier(.2,.8,.2,1)}'
  +'#grid .card:hover>.tapa-c,#grid .card:focus-visible>.tapa-c{opacity:.34;transform:rotate(3deg) scale(1.05)}'
  +'#grid .tapa-c img{position:absolute;left:0;top:0;width:150%;height:auto;max-width:none;filter:saturate(.8)}'
  +'#grid .tapa-c .gen{position:absolute;inset:0;width:150%;overflow:hidden}'
  +'#grid .tapa-c .gen svg{position:absolute;inset:0;width:100%;height:100%}'
  +'#grid .tapa-c .a{position:absolute;left:18px;top:16px;font:500 9px/1 var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase}'
  +'#grid .tapa-c .t{position:absolute;left:18px;right:30%;bottom:22px;font-family:"Instrument Serif",Georgia,serif;font-size:34px;line-height:.98}'
  +'@media (prefers-reduced-motion:reduce){#grid .card>.tapa-c{transition:none}}';
  document.head.appendChild(st);
  function pone(){
    grid.querySelectorAll('.card:not([data-tapa])').forEach(function(c){
      c.setAttribute('data-tapa','1');
      var a=A.find(function(x){return x.id===c.dataset.id});if(!a)return;
      var s=document.createElement('span');s.className='tapa-c';s.setAttribute('aria-hidden','true');
      if(REAL[a.id]){
        s.innerHTML='<img src="'+REAL[a.id]+'" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">';
      }else{
        var title=a.o&&a.o[0]?a.o[0][0]:a.n,h=hs(a.id),pl=PAL[h%PAL.length],mo=MOT[(h>>>3)%MOT.length].split('A').join(pl[2]);
        s.innerHTML='<div class="gen" style="background:'+pl[0]+'"><svg viewBox="0 0 290 420" preserveAspectRatio="xMidYMid slice">'+mo+'</svg><div class="a" style="color:'+pl[2]+'">'+esc(a.c)+'</div><div class="t" style="color:'+pl[1]+'">'+esc(title)+'</div></div>';
      }
      c.insertBefore(s,c.firstChild);
    });
  }
  new MutationObserver(pone).observe(grid,{childList:true});
  pone();
})();
