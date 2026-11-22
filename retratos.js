/* retratos.js: retrato del autor en las tarjetas y en la ficha, con crédito y licencia visibles.
   Solo imágenes de Wikimedia Commons con licencia libre verificada (dominio público, CC BY o CC BY-SA).
   La lista completa con licencias está en /creditos/. */
(function(){
var R={"echeverria": ["EstebanEcheverria.jpg", "Ernest Charton", "pd"], "ascasubi": ["HilarioAscasubi.JPG", "autor desconocido", "pd"], "hidalgo": ["Bartolome_Hidalgo.jpg", "Ramón Bauzá", "bysa3"], "zorrilla": ["Zorrilla_de_San_Martin.jpg", "William Belmont Parker", "pd"], "rodo": ["José_Enrique_Rodó_(Almanaque_Sudamericano_1898).jpg", "Casimiro Prieto Valdés", "pd"], "herrera": ["Julio_Herrera_y_Reissig_1903.jpg", "autor desconocido", "pd"], "lugones": ["Fotografía_de_Leopoldo_Lugones.jpg", "autor desconocido", "pd"], "agustini": ["Delmira_Agustini_-_Archivo_Literario_de_la_Biblioteca_Nacional_del_Uruguay.jpg", "Archivo Literario, Biblioteca Nacional de Uruguay", "pd"], "vaz": ["MariaEugeniaVazFerreira.jpg", "autor desconocido", "pd"], "quiroga": ["Horacio_Quiroga.jpg", "autor desconocido", "pd"], "storni": ["AlfosinaStorni.jpg", "autor desconocido", "pd"], "ibarbourou": ["Juana_de_Ibarbourou_from_Estampas_de_la_Biblia.jpg", "Elena Bazterrica", "pd"], "arlt": ["RobertoArlt.jpg", "autor desconocido", "pd"], "borges": ["Jorge_Luis_Borges_1951,_by_Grete_Stern_(full).jpg", "Grete Stern", "pd"], "felisberto": ["Felisberto_Hernandez.jpg", "autor desconocido", "pd"], "onetti": ["Juan_Carlos_Onetti_1981.jpg", "Elisa Cabot", "bysa2"], "vitale": ["Ida_Vitale_at_Texas_A&M_University.jpg", "Pdx123", "bysa4"], "cortazar": ["Cortázar.jpg", "Sara Facio", "pd"], "galeano": ["Eduardo_Galeano_ltk_(cropped).jpg", "Donostia Kultura", "bysa2"], "peri": ["Cristina_Peri.jpg", "Elisa Cabot", "bysa2"], "marosa": ["Marosa_Di_Giorgio.jpg", "Fedaro", "bysa4"], "gelman": ["Juan_Gelman_-presidenciagovar-_31JUL07.jpg", "Presidencia de la Nación Argentina", "by2"], "liscano": ["Carlos_Liscano_20100329_Salon_du_livre_de_Paris_2.jpg", "Georges Seguin (Okki)", "bysa3"], "lautreamont": ["Ducasse_Tarbes_(cropped).jpg", "Studio Blanchard", "pd"], "laforgue": ["Laforgue_portrait_painting.jpg", "Franz Skarbina", "pd"], "carreras": ["Roberto_de_las_Carreras_-_1902_-_Amor_libre_(cropped).jpg", "autor desconocido", "pd"], "supervielle": ["Supervielle_Harcourt_1948_2.jpg", "Studio Harcourt", "pd"], "soca": ["Susana_Soca.jpg", "autor desconocido", "pd"], "macedonio": ["MacedonioFernandez.jpg", "autor desconocido", "pd"], "filloy": ["Juan_Filloy.JPG", "autor desconocido", "pd"], "gombrowicz": ["Witold_Gombrowicz_by_Bohdan_Paczowski_-_detail.jpg", "Bohdan Paczowski", "pd"], "marechal": ["Leopoldo_Marechal.jpg", "autor desconocido", "pd"], "bioy": ["Adolfo_bioy_retrato.jpg", "autor desconocido", "pd"], "ocampo": ["Silvina-tomado-por-Bioy-Casares-en-Posadas-1959.jpg", "autor desconocido", "pd"], "sabato": ["Ernesto_Sabato_(cropped).jpg", "autor desconocido", "pd"], "mujica": ["Fotografía_del_escritor_argentino_Manuel_Mujica_Lainez.jpg", "Sara Facio", "pd"], "pizarnik": ["Alejandra_Pizarnik-C123.jpg", "Margarita B. Pontieri", "pd"], "orozco": ["Olga_Orozco_(1920-1999).jpg", "autor desconocido", "pd"], "molina": ["EnriqueMolina.JPG", "autor desconocido", "pd"], "oesterheld": ["Oesterheld_joven.jpg", "autor desconocido", "pd"], "gallardo": ["Sara_Gallardo.jpg", "autor desconocido", "pd"], "wilcock": ["Juan_Rodolfo_Wilcock_by_Anatole_Saderman,_1961.jpg", "Anatole Saderman", "pd"], "valenzuela": ["Feria_del_libro_2017.jpg", "Julieta1996R", "bysa4"], "gorodischer": ["Arcal_Gorodischer.jpg", "Nicolasgoro", "bysa4"], "gambaro": ["Griselda_Gambaro.jpg", "Sara Facio", "pd"], "fogwill": ["Fogwill.jpg", "Nikkeric2", "bysa3"], "perlongher": ["Néstor_Osvaldo_Perlongher.jpg", "autor desconocido", "pd"], "aira": ["Cesar_Aira_Wikipedia.jpg", "Alfashop22", "bysa3"], "laiseca": ["Laiseca-14-6581.jpg", "CCPE Rosario", "bysa4"], "schweblin": ["Samanta_Schweblin_en_el_FILBA_Montevideo_2018.jpg", "Centro Cultural de España en Montevideo", "by2"], "katchadjian": ["Katchadjian,_Pablo_-FILSA_20181030_fRF04.jpg", "Rodrigo Fernández", "bysa4"], "harwicz": ["Ariana_Harwicz_en_Guayaquil.jpg", "Freddy Eduardo", "bysa4"], "enriquez": ["Mariana_Enríquez_en_la_Feria_Internacional_del_Libro_de_Buenos_Aires.jpg", "Ministerio de Cultura de la Nación", "bysa2"]};
var L={"pd": ["dominio público", "https://creativecommons.org/publicdomain/mark/1.0/deed.es"], "bysa2": ["CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0/deed.es"], "bysa3": ["CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/deed.es"], "bysa4": ["CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/deed.es"], "by2": ["CC BY 2.0", "https://creativecommons.org/licenses/by/2.0/deed.es"]};
var UNK='autor desconocido';
var P='https://commons.wikimedia.org/wiki/';
function src(f,w){return P+'Special:FilePath/'+encodeURIComponent(f).replace(/%28/g,'(').replace(/%29/g,')')+'?width='+w}
function cred(id){
 var r=R[id],l=L[r[2]];
 var who=r[1]===UNK?'Autor desconocido':r[1];
 var d=document.createDocumentFragment();
 d.appendChild(document.createTextNode('Foto: '+who+' · '));
 var a=document.createElement('a');a.href=l[1];a.target='_blank';a.rel='noopener license';a.textContent=l[0];d.appendChild(a);
 d.appendChild(document.createTextNode(' · '));
 var b=document.createElement('a');b.href=P+'File:'+encodeURIComponent(r[0]).replace(/%28/g,'(').replace(/%29/g,')');b.target='_blank';b.rel='noopener';b.textContent='Wikimedia Commons';d.appendChild(b);
 return d;
}
var st=document.createElement('style');
st.textContent='#grid .card .ava{position:absolute;top:16px;right:16px;z-index:1;width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:50% 18%;background:var(--line);box-shadow:0 0 0 2px var(--card),0 0 0 3px color-mix(in srgb,var(--c) 45%,transparent);filter:grayscale(.35) contrast(1.02);transition:opacity .25s,filter .25s}'
+'#grid .card:hover .ava,#grid .card:focus-visible .ava{opacity:0;filter:none}'
+'#grid .card.con-ava h3{padding-right:62px}'
+'#panel .ret{margin:14px 0 0;display:flex;gap:14px;align-items:flex-end}'
+'#panel .ret img{width:132px;height:auto;max-height:190px;object-fit:cover;object-position:50% 15%;border-radius:10px;box-shadow:0 14px 26px -14px rgba(0,0,0,.55);background:var(--line)}'
+'#panel .ret figcaption{font:400 11px/1.5 var(--mono,monospace);opacity:.78;max-width:26ch}'
+'#panel .ret figcaption a{color:inherit;text-decoration:underline}'
+'@media (max-width:520px){#grid .card .ava{width:48px;height:48px}#panel .ret img{width:108px}}';
document.head.appendChild(st);
var grid=document.getElementById('grid'),panel=document.getElementById('panel'),nm=document.getElementById('p-name');
function cards(){
 if(!grid)return;
 grid.querySelectorAll('.card:not([data-ava])').forEach(function(c){
  var id=c.dataset.id;c.setAttribute('data-ava','1');
  if(!R[id])return;
  var i=new Image();i.className='ava';i.alt='';i.loading='lazy';i.decoding='async';i.width=56;i.height=56;i.referrerPolicy='no-referrer';
  i.src=src(R[id][0],120);
  i.onerror=function(){i.remove();c.classList.remove('con-ava')};
  c.classList.add('con-ava');c.insertBefore(i,c.firstChild);
 });
}
function ficha(){
 if(!panel||!nm)return;
 var old=panel.querySelector('.ret');if(old)old.remove();
 var id=(location.hash||'').slice(1);
 if(!id||!R[id]||!panel.classList.contains('open'))return;
 var f=document.createElement('figure');f.className='ret';
 var i=new Image();i.alt='Retrato de '+nm.textContent.trim();i.decoding='async';i.referrerPolicy='no-referrer';i.src=src(R[id][0],360);
 i.onerror=function(){f.remove()};
 var c=document.createElement('figcaption');c.appendChild(cred(id));
 f.appendChild(i);f.appendChild(c);
 var y=document.getElementById('p-yrs');
 y.parentNode.insertBefore(f,y.nextSibling);
}
var t;function later(){clearTimeout(t);t=setTimeout(ficha,90)}
if(grid){new MutationObserver(cards).observe(grid,{childList:true});cards()}
if(nm)new MutationObserver(later).observe(nm,{childList:true,characterData:true,subtree:true});
if(panel)new MutationObserver(later).observe(panel,{attributes:true,attributeFilter:['class']});
window.addEventListener('hashchange',later);
later();
})();
