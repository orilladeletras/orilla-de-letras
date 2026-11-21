/* tapas.js: tapa de libro de fondo en cada ficha de autor.
   Real: solo ediciones antiguas verificadas en dominio publico (Wikimedia Commons), con credito.
   Resto: tapa tipografica original de Orilla de Letras generada con la obra clave. */
(function(){
var p=document.getElementById('panel'),nm=document.getElementById('p-name');
if(!p||!nm)return;
var W='https://thumb.wikimedia.org/wikipedia/commons/thumb/',C='https://commons.wikimedia.org/wiki/File:';
var REAL={
hernandez:[W+'a/a2/El_gaucho_martinfierro_1872.jpg/500px-El_gaucho_martinfierro_1872.jpg',C+'El_gaucho_martinfierro_1872.jpg','El gaucho Martín Fierro, 1.ª edición, 1872'],
echeverria:[W+'3/35/La_cautiva_-_Esteban_Echeverria.pdf/page1-500px-La_cautiva_-_Esteban_Echeverria.pdf.jpg',C+'La_cautiva_-_Esteban_Echeverria.pdf','La cautiva, edición antigua'],
herrera:[W+'7/71/Opalos_Julio_Herrera_y_Reissig.pdf/page1-500px-Opalos_Julio_Herrera_y_Reissig.pdf.jpg',C+'Opalos_Julio_Herrera_y_Reissig.pdf','Ópalos, edición antigua'],
quiroga:[W+'d/d4/Horacio_Quiroga_-_Anaconda_%281921%29.pdf/page1-500px-Horacio_Quiroga_-_Anaconda_%281921%29.pdf.jpg',C+'Horacio_Quiroga_-_Anaconda_(1921).pdf','Anaconda, 1921'],
storni:[W+'b/bc/La_inquietud_del_rosal_%281916%29.pdf/page1-500px-La_inquietud_del_rosal_%281916%29.pdf.jpg',C+'La_inquietud_del_rosal_(1916).pdf','La inquietud del rosal, 1916'],
lugones:[W+'f/f7/Lunario_sentimental_Leopoldo_Lugones.pdf/page1-500px-Lunario_sentimental_Leopoldo_Lugones.pdf.jpg',C+'Lunario_sentimental_Leopoldo_Lugones.pdf','Lunario sentimental, edición antigua'],
agustini:['https://upload.wikimedia.org/wikipedia/commons/8/8d/Portada_de_El_libro_blanco.jpg',C+'Portada_de_El_libro_blanco.jpg','El libro blanco, 1907'],
borges:[W+'1/1a/Fervor_de_buenos_aires_cover_1923.jpg/500px-Fervor_de_buenos_aires_cover_1923.jpg',C+'Fervor_de_buenos_aires_cover_1923.jpg','Fervor de Buenos Aires, 1923']
};
var PAL=[['#0F3F73','#f7f3e6','#ffd84a'],['#8c2f1b','#f7f3e6','#ffd84a'],['#1f3a34','#f1ead2','#e8b84a'],['#3b2a4d','#f4ecd8','#f2c14e'],['#14202e','#f7f3e6','#e07a3f'],['#5a3b1e','#f6edd6','#f0c75e'],['#1b4d4a','#f3efe0','#f2b134'],['#7a1f3d','#f7f3e6','#ffd84a']];
var MOT=[
'<g fill="none" stroke="A" stroke-width="1.6"><path d="M60 60h170v170H60z"/><path d="M80 80h130v130H80z"/><path d="M100 100h90v90h-90z"/><path d="M60 60l60 60M230 60l-60 60M60 230l60-60M230 230l-60-60"/></g>',
'<g fill="none" stroke="A" stroke-width="1.6"><rect x="95" y="40" width="46" height="46"/><rect x="95" y="86" width="46" height="46"/><rect x="95" y="132" width="46" height="46"/><rect x="49" y="178" width="46" height="46"/><rect x="141" y="178" width="46" height="46"/><circle cx="118" cy="256" r="23"/></g>',
'<g fill="none" stroke="A" stroke-width="1.6"><path d="M30 250h230"/><path d="M60 250V120l70-50 70 50v130"/><path d="M100 250V150h60v100"/><path d="M30 290h230M30 320h230" opacity=".5"/></g>',
'<g fill="none" stroke="A" stroke-width="1.6"><circle cx="145" cy="150" r="90"/><circle cx="145" cy="150" r="60"/><circle cx="145" cy="150" r="30"/><path d="M55 150h180M145 60v180"/></g>',
'<g fill="none" stroke="A" stroke-width="1.6"><path d="M20 230c40-50 80-50 120 0s80 50 120 0"/><path d="M20 190c40-50 80-50 120 0s80 50 120 0" opacity=".7"/><path d="M20 150c40-50 80-50 120 0s80 50 120 0" opacity=".45"/><circle cx="215" cy="80" r="26"/></g>',
'<g fill="none" stroke="A" stroke-width="1.6"><path d="M145 50l95 170H50z"/><path d="M145 100l55 100h-110z"/><path d="M145 150l22 40h-44z"/></g>'
];
function hs(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
var st=document.createElement('style');
st.textContent='#panel .tapa-bg{position:absolute;left:0;right:0;top:0;height:560px;overflow:hidden;pointer-events:none;z-index:0}'
+'#panel>*:not(.tapa-bg){position:relative;z-index:1}'
+'#panel .tapa-bg .lib{position:absolute;right:-26px;top:64px;width:250px;transform:rotate(6deg);filter:drop-shadow(0 18px 22px rgba(0,0,0,.38));-webkit-mask-image:linear-gradient(to bottom,#000 70%,transparent 100%);mask-image:linear-gradient(to bottom,#000 70%,transparent 100%)}'
+'#panel .tapa-bg .lib img{display:block;width:100%;height:auto;border-radius:2px 6px 6px 2px}'
+'#panel .tapa-bg .gen{position:relative;width:250px;height:362px;border-radius:2px 7px 7px 2px;overflow:hidden}'
+'#panel .tapa-bg .gen::before{content:"";position:absolute;left:0;top:0;bottom:0;width:13px;background:linear-gradient(90deg,rgba(0,0,0,.35),rgba(255,255,255,.08) 60%,transparent);z-index:2}'
+'#panel .tapa-bg .gen svg{position:absolute;inset:0;width:100%;height:100%}'
+'#panel .tapa-bg .gen .a{position:absolute;left:30px;top:26px;font:500 10px/1 var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase}'
+'#panel .tapa-bg .gen .t{position:absolute;left:30px;right:18px;bottom:34px;font-family:"Instrument Serif",Georgia,serif;line-height:.98}'
+'#panel .tapa-bg .veil{position:absolute;inset:0}'
+'#panel .tapa-cr{margin:26px 0 8px;font:400 11px/1.5 var(--mono,monospace);opacity:.7}'
+'#panel .tapa-cr a{color:inherit;text-decoration:underline}'
+'@media (max-width:520px){#panel .tapa-bg .lib{width:200px;right:-30px}#panel .tapa-bg .gen{width:200px;height:290px}}';
document.head.appendChild(st);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(){
 var id=(location.hash||'').slice(1);
 var old=p.querySelector('.tapa-bg');if(old)old.remove();
 var oc=p.querySelector('.tapa-cr');if(oc)oc.remove();
 if(!id||!p.classList.contains('open'))return;
 var bg=getComputedStyle(p).backgroundColor;
 var box=document.createElement('div');box.className='tapa-bg';box.setAttribute('aria-hidden','true');
 var lib='',cr='';
 if(REAL[id]){
  lib='<div class="lib"><img src="'+REAL[id][0]+'" alt="" referrerpolicy="no-referrer"></div>';
  cr=REAL[id];
 }else{
  var w=p.querySelector('#p-works em'),title=w?w.textContent.trim():nm.textContent.trim();
  var h=hs(id),pl=PAL[h%PAL.length],mo=MOT[(h>>3)%MOT.length].split('A').join(pl[2]);
  var fs=title.length<=10?44:title.length<=18?36:28;
  lib='<div class="lib"><div class="gen" style="background:'+pl[0]+'"><svg viewBox="0 0 290 420" preserveAspectRatio="xMidYMid slice">'+mo+'</svg><div class="a" style="color:'+pl[2]+'">'+esc(nm.textContent.trim())+'</div><div class="t" style="color:'+pl[1]+';font-size:'+fs+'px">'+esc(title)+'</div></div></div>';
 }
 box.innerHTML=lib+'<div class="veil" style="background:linear-gradient(98deg,'+bg+' 40%,color-mix(in srgb,'+bg+' 28%,transparent) 100%)"></div>';
 p.insertBefore(box,p.firstChild);
 if(cr){var c=document.createElement('p');c.className='tapa-cr';c.innerHTML='Tapa: '+esc(cr[2])+' · dominio público · <a href="'+cr[1]+'" target="_blank" rel="noopener">Wikimedia Commons ↗</a>';p.appendChild(c)}
}
var t;function later(){clearTimeout(t);t=setTimeout(render,80)}
new MutationObserver(later).observe(nm,{childList:true,characterData:true,subtree:true});
window.addEventListener('hashchange',later);
new MutationObserver(later).observe(p,{attributes:true,attributeFilter:['class']});
later();
})();
