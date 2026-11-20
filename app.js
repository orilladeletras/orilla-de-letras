const ERAS=[
 {id:'e1',n:'Fundación y siglo XIX',a:1800,b:1900},
 {id:'e2',n:'Modernismo y novecientos',a:1900,b:1930},
 {id:'e3',n:'Mediados del siglo XX',a:1930,b:1968},
 {id:'e4',n:'Dictadura y exilio',a:1968,b:1985},
 {id:'e5',n:'Contemporáneos',a:1985,b:2010}
];
const PAISES=[{id:'UY',n:'Uruguay'},{id:'AR',n:'Argentina'}];
const A=[
{id:'hidalgo',p:'UY',n:'Bartolomé Hidalgo',c:'Hidalgo',nac:1788,mue:1822,e:'e1',g:['Poesía'],y:1821,
 r:'Considerado el iniciador de la poesía gauchesca. Sus cielitos y diálogos pusieron la voz del paisano al servicio de la causa independentista rioplatense.',
 o:[['Cielitos patrióticos',''],['Diálogo patriótico',1821]],s:'Los diálogos gauchescos, para escuchar el nacimiento de una voz.'},
{id:'echeverria',p:'AR',n:'Esteban Echeverría',c:'Echeverría',nac:1805,mue:1851,e:'e1',g:['Poesía','Narrativa'],y:1837,
 r:'Introductor del romanticismo en el Río de la Plata. Su relato El matadero, publicado después de su muerte, es leído como uno de los primeros cuentos argentinos y como una crítica al régimen de Rosas.',
 o:[['La cautiva',1837],['Dogma socialista',1846],['El matadero',1871]],s:'El matadero, breve y feroz.'},
{id:'ascasubi',p:'AR',n:'Hilario Ascasubi',c:'Ascasubi',nac:1807,mue:1875,e:'e1',g:['Poesía'],y:1853,
 r:'Poeta gauchesco que vivió largos años en Montevideo. Sus versos narrativos y políticos ampliaron el género más allá de lo patriótico.',
 o:[['Paulino Lucero',1853],['Santos Vega',1872]],s:'Paulino Lucero, para leer la gauchesca como periodismo en verso.'},
{id:'hernandez',p:'AR',n:'José Hernández',c:'Hernández',nac:1834,mue:1886,e:'e1',g:['Poesía'],y:1872,
 r:'Autor de Martín Fierro, cumbre de la poesía gauchesca y poema nacional argentino. La vuelta de Martín Fierro apareció siete años después.',
 o:[['El gaucho Martín Fierro',1872],['La vuelta de Martín Fierro',1879]],s:'Los primeros cantos del Martín Fierro.'},
{id:'zorrilla',p:'UY',n:'Juan Zorrilla de San Martín',c:'Zorrilla',nac:1855,mue:1931,e:'e1',g:['Poesía'],y:1888,
 r:'Poeta romántico y orador. Su poema épico sobre el indio charrúa Tabaré se convirtió en texto fundacional del imaginario nacional.',
 o:[['La leyenda patria',1879],['Tabaré',1888]],s:'Tabaré, leído como documento de una época y de sus mitos.'},
{id:'acevedo',p:'UY',n:'Eduardo Acevedo Díaz',c:'Acevedo Díaz',nac:1851,mue:1921,e:'e1',g:['Narrativa'],y:1888,
 r:'Fundador de la novela histórica uruguaya. Reconstruyó las guerras de independencia con una mirada épica sobre el campo y sus luchas.',
 o:[['Ismael',1888],['Nativa',1890],['Soledad',1894]],s:'Ismael, primera entrega de su ciclo sobre la gesta oriental.'},
{id:'viana',p:'UY',n:'Javier de Viana',c:'Viana',nac:1868,mue:1926,e:'e1',g:['Narrativa'],y:1896,
 r:'Cuentista y novelista del realismo rural. Retrató con crudeza la vida del gaucho en su ocaso, la violencia y la decadencia del campo.',
 o:[['Campo',1896],['Gaucha',1899],['Gurí y otros cuentos',1901]],s:'Campo, donde ya se ve la mirada dura sobre el mundo rural.'},
{id:'rodo',p:'UY',n:'José Enrique Rodó',c:'Rodó',nac:1871,mue:1917,e:'e2',g:['Ensayo'],y:1900,
 r:'Ensayista mayor del modernismo hispanoamericano. Ariel, dirigido a la juventud del continente, fijó un debate sobre cultura, utilitarismo e identidad que duró décadas.',
 o:[['Ariel',1900],['Motivos de Proteo',1909]],s:'Ariel, breve y decisivo para entender el pensamiento de la época.'},
{id:'sanchez',p:'UY',n:'Florencio Sánchez',c:'F. Sánchez',nac:1875,mue:1910,e:'e2',g:['Teatro'],y:1905,
 r:'Gran dramaturgo del teatro rioplatense. Llevó a escena los conflictos del campo, la inmigración y la familia con una intensidad realista.',
 o:[['M\'hijo el dotor',1903],['La gringa',1904],['Barranca abajo',1905]],s:'Barranca abajo, tragedia rural de enorme economía dramática.'},
{id:'herrera',p:'UY',n:'Julio Herrera y Reissig',c:'Herrera y Reissig',nac:1875,mue:1910,e:'e2',g:['Poesía'],y:1909,
 r:'Poeta del modernismo más experimental, de imágenes barrocas y metáforas audaces. Escribió buena parte de su obra desde su célebre «Torre de los Panoramas».',
 o:[['Los peregrinos de piedra',1909],['Los parques abandonados','']],s:'Los peregrinos de piedra, para ver hasta dónde llega su lenguaje.'},
{id:'lugones',p:'AR',n:'Leopoldo Lugones',c:'Lugones',nac:1874,mue:1938,e:'e2',g:['Poesía','Narrativa'],y:1909,
 r:'Poeta del modernismo y narrador de lo fantástico y la ciencia ficción. Figura central y polémica de la cultura argentina del cambio de siglo.',
 o:[['Las fuerzas extrañas',1906],['Lunario sentimental',1909]],s:'Las fuerzas extrañas, cuentos que anticipan lo fantástico rioplatense.'},
{id:'agustini',p:'UY',n:'Delmira Agustini',c:'Agustini',nac:1886,mue:1914,e:'e2',g:['Poesía'],y:1913,
 r:'Voz decisiva del modernismo y de la poesía erótica en lengua española. Murió a los veintisiete años, con una obra breve y de intensidad singular.',
 o:[['El libro blanco',1907],['Cantos de la mañana',1910],['Los cálices vacíos',1913]],s:'Los cálices vacíos, su libro más radical.'},
{id:'vaz',p:'UY',n:'María Eugenia Vaz Ferreira',c:'Vaz Ferreira',nac:1875,mue:1924,e:'e2',g:['Poesía'],y:1924,
 r:'Poeta de un simbolismo reflexivo e introspectivo, figura clave de la generación del Novecientos. Su único libro apareció de forma póstuma.',
 o:[['La isla de los cánticos','']],s:'La isla de los cánticos, para conocer una voz singular del período.'},
{id:'reyles',p:'UY',n:'Carlos Reyles',c:'Reyles',nac:1868,mue:1938,e:'e2',g:['Narrativa'],y:1916,
 r:'Novelista del naturalismo y la novela rural. Su obra discute el progreso técnico del campo frente a la tradición criolla.',
 o:[['Beba',1894],['El terruño',1916],['El embrujo de Sevilla',1922]],s:'El terruño, sobre campo, modernización y arraigo.'},
{id:'quiroga',p:'UY',n:'Horacio Quiroga',c:'Quiroga',nac:1878,mue:1937,e:'e2',g:['Narrativa'],y:1917,
 r:'Maestro del cuento latinoamericano. La selva misionera, la muerte y la locura recorren su obra, que incluye también relatos con animales pensados para los niños.',
 o:[['Cuentos de amor de locura y de muerte',1917],['Cuentos de la selva',1918],['Anaconda',1921],['El desierto',1924]],s:'«El almohadón de plumas» y «A la deriva», dentro de Cuentos de amor de locura y de muerte.'},
{id:'storni',p:'AR',n:'Alfonsina Storni',c:'Storni',nac:1892,mue:1938,e:'e2',g:['Poesía'],y:1918,
 r:'Poeta del modernismo tardío y precursora de una voz femenina directa y crítica. Su obra recorre el desengaño, la ciudad y el cuerpo.',
 o:[['La inquietud del rosal',1916],['El dulce daño',1918],['Mundo de siete pozos',1934]],s:'El dulce daño.'},
{id:'ibarbourou',p:'UY',n:'Juana de Ibarbourou',c:'Ibarbourou',nac:1892,mue:1979,e:'e2',g:['Poesía'],y:1919,
 r:'Poeta de un erotismo luminoso y de la naturaleza como cuerpo. Fue muy leída en su tiempo y tuvo un enorme reconocimiento público.',
 o:[['Las lenguas de diamante',1919],['Raíz salvaje',1922]],s:'Las lenguas de diamante, su debut deslumbrante.'},
{id:'arlt',p:'AR',n:'Roberto Arlt',c:'Arlt',nac:1900,mue:1942,e:'e2',g:['Narrativa'],y:1926,
 r:'Narrador de la ciudad, de los márgenes y de los inventores fracasados. Transformó la novela argentina con una prosa áspera y urbana.',
 o:[['El juguete rabioso',1926],['Los siete locos',1929],['Los lanzallamas',1931]],s:'El juguete rabioso.'},
{id:'borges',p:'AR',n:'Jorge Luis Borges',c:'Borges',nac:1899,mue:1986,e:'e3',g:['Narrativa','Poesía','Ensayo'],y:1944,
 r:'Poeta, cuentista y ensayista. Sus ficciones sobre laberintos, bibliotecas e infinitos cambiaron la literatura del siglo XX.',
 o:[['Fervor de Buenos Aires',1923],['Ficciones',1944],['El Aleph',1949]],s:'«Funes el memorioso» y «El jardín de senderos que se bifurcan», dentro de Ficciones.'},
{id:'felisberto',p:'UY',n:'Felisberto Hernández',c:'Felisberto',nac:1902,mue:1964,e:'e3',g:['Narrativa'],y:1947,
 r:'Narrador singular, de lo extraño cotidiano: objetos que cobran vida, memorias desviadas y una lógica propia. Referente de lo fantástico rioplatense.',
 o:[['Por los tiempos de Clemente Colling',1942],['Nadie encendía las lámparas',1947],['Las hortensias',1949]],s:'«Las hortensias», relato breve y perturbador.'},
{id:'onetti',p:'UY',n:'Juan Carlos Onetti',c:'Onetti',nac:1909,mue:1994,e:'e3',g:['Narrativa'],y:1950,
 r:'Creador de Santa María, ciudad imaginaria del Río de la Plata. Su narrativa de narradores inciertos y personajes derrotados transformó la novela hispanoamericana. Premio Cervantes 1980.',
 o:[['El pozo',1939],['La vida breve',1950],['El astillero',1961],['Juntacadáveres',1964]],s:'El pozo, breve, o El astillero, si preferís una novela completa.'},
{id:'somers',p:'UY',n:'Armonía Somers',c:'Somers',nac:1914,mue:1994,e:'e3',g:['Narrativa'],y:1950,
 r:'Narradora de lo perturbador y de lo erótico, durante años desconocida y hoy muy reivindicada. Su prosa mezcla lo grotesco, lo poético y lo gótico.',
 o:[['La mujer desnuda',1950],['De miedo en miedo',1965],['Un retrato para Dickens',1990]],s:'La mujer desnuda, por su escritura sin concesiones.'},
{id:'vitale',p:'UY',n:'Ida Vitale',c:'Vitale',nac:1923,mue:null,e:'e3',g:['Poesía'],y:1953,
 r:'Poeta de la Generación del 45, de una palabra precisa y sobria. Premio Cervantes 2018, vivió largos años de exilio.',
 o:[['Palabra dada',1953],['Jardín de sílice',1980]],s:'Palabra dada, para seguir el hilo de su obra desde el comienzo.'},
{id:'vilarino',p:'UY',n:'Idea Vilariño',c:'Vilariño',nac:1920,mue:2009,e:'e3',g:['Poesía'],y:1957,
 r:'Una de las voces más leídas de la poesía uruguaya. Escribe con sequedad y desnudez sobre el amor, la pérdida y el vacío.',
 o:[['La suplicante',1945],['Nocturnos',1955],['Poemas de amor',1957]],s:'Poemas de amor, directo y devastador.'},
{id:'benedetti',p:'UY',n:'Mario Benedetti',c:'Benedetti',nac:1920,mue:2009,e:'e3',g:['Narrativa','Poesía'],y:1960,
 r:'Narrador, poeta y ensayista de enorme popularidad. Retrató la clase media montevideana, el desencanto y, más tarde, el exilio.',
 o:[['Montevideanos',1959],['La tregua',1960],['Gracias por el fuego',1965],['Primavera con una esquina rota',1982]],s:'La tregua, novela en forma de diario.'},
{id:'cortazar',p:'AR',n:'Julio Cortázar',c:'Cortázar',nac:1914,mue:1984,e:'e3',g:['Narrativa'],y:1963,
 r:'Cuentista y novelista de lo fantástico y del juego narrativo. Rayuela propuso una lectura abierta y marcó a toda una generación.',
 o:[['Bestiario',1951],['Las armas secretas',1959],['Rayuela',1963]],s:'Los cuentos de Bestiario si querés empezar corto; Rayuela si querés el gran juego.'},
{id:'galeano',p:'UY',n:'Eduardo Galeano',c:'Galeano',nac:1940,mue:2015,e:'e4',g:['Ensayo','Narrativa'],y:1971,
 r:'Periodista, ensayista y narrador. Combinó historia, denuncia y fragmento literario, y su obra más conocida marcó la lectura política de América Latina.',
 o:[['Las venas abiertas de América Latina',1971],['Memoria del fuego',1982],['El libro de los abrazos',1989]],s:'El libro de los abrazos, en fragmentos breves.'},
{id:'peri',p:'UY',n:'Cristina Peri Rossi',c:'Peri Rossi',nac:1941,mue:null,e:'e4',g:['Narrativa','Poesía'],y:1969,
 r:'Escritora de relatos, novelas y poemas, marcada por el exilio. Su mirada mezcla erotismo, política y fantasía. Premio Cervantes 2021.',
 o:[['Los museos abandonados',1969],['La nave de los locos',1984]],s:'Los museos abandonados, cuentos de un mundo desquiciado.'},
{id:'marosa',p:'UY',n:'Marosa di Giorgio',c:'Marosa',nac:1932,mue:2004,e:'e4',g:['Poesía'],y:1971,
 r:'Poeta nacida en Salto, de un universo inconfundible: jardines, bestias y cuerpos en una prosa poética que mezcla la ternura con lo siniestro.',
 o:[['Los papeles salvajes',1971],['Historia de un amor','']],s:'Los papeles salvajes, puerta de entrada a su mundo.'},
{id:'levrero',p:'UY',n:'Mario Levrero',c:'Levrero',nac:1940,mue:2004,e:'e4',g:['Narrativa'],y:1970,
 r:'Narrador de lo raro, de lo onírico y del diario como forma. Autor de culto, cuya fama creció notablemente después de su muerte.',
 o:[['La ciudad',1970],['París',1979],['El discurso vacío',1996],['La novela luminosa',2005]],s:'La novela luminosa, aunque exige paciencia.'},
{id:'gelman',p:'AR',n:'Juan Gelman',c:'Gelman',nac:1930,mue:2014,e:'e4',g:['Poesía'],y:1971,
 r:'Poeta argentino y Premio Cervantes 2007. Su poesía mezcla la ternura, el exilio y la denuncia, con una sintaxis quebrada propia.',
 o:[['Violín y otras cuestiones',1956],['Cólera buey',1971],['Dibaxu',1994]],s:'Violín y otras cuestiones, o Dibaxu para su lado más íntimo.'},
{id:'liscano',p:'UY',n:'Carlos Liscano',c:'Liscano',nac:1949,mue:null,e:'e5',g:['Narrativa'],y:1994,
 r:'Escritor que desarrolló su obra a partir de su experiencia de prisión política durante la dictadura. Escribe una prosa austera sobre el encierro y la memoria.',
 o:[['El camino a Ítaca',1994],['El furgón de los locos',2001]],s:'El camino a Ítaca, para conocer su voz.'}
];

const CRUCES=[
 {t:'La gauchesca nació en Montevideo',x:'Bartolomé Hidalgo escribió en Montevideo los primeros cielitos y diálogos gauchescos. El argentino Hilario Ascasubi vivió largos años en esa ciudad y desarrolló el género, que José Hernández llevó a su cima con Martín Fierro en 1872.',ids:['hidalgo','ascasubi','hernandez']},
 {t:'Un romántico desterrado',x:'Esteban Echeverría, introductor del romanticismo en el Río de la Plata, murió en Montevideo en 1851, desterrado por el régimen de Rosas.',ids:['echeverria']},
 {t:'De Salto a Misiones',x:'Horacio Quiroga nació en Salto, Uruguay, y vivió buena parte de su vida entre Buenos Aires y la selva de Misiones, en Argentina, que es el paisaje de sus cuentos más conocidos.',ids:['quiroga']},
 {t:'Amigos de las dos orillas',x:'Alfonsina Storni mantuvo vínculos de amistad con Horacio Quiroga y con Juana de Ibarbourou, y esa trama une la poesía y la prosa de Buenos Aires y Montevideo.',ids:['storni','quiroga','ibarbourou']},
 {t:'Funes, de Fray Bentos',x:'El personaje de Borges que no puede olvidar nada, Ireneo Funes, es un joven de Fray Bentos, en Uruguay. «Funes el memorioso» forma parte de Ficciones (1944).',ids:['borges']},
 {t:'Onetti en Buenos Aires',x:'Onetti vivió largos años en Buenos Aires, donde escribió y publicó buena parte de su obra. Su Santa María es una ciudad de ficción a orillas de un río que recuerda al Plata.',ids:['onetti']},
 {t:'Teatro de ida y vuelta',x:'Florencio Sánchez se instaló en Buenos Aires, donde estrenó y se consolidó como figura clave del teatro rioplatense, compartido por ambas orillas.',ids:['sanchez']},
 {t:'Lectores de lo extraño',x:'Julio Cortázar fue uno de los lectores más entusiastas de Felisberto Hernández, y sus mundos de lo fantástico cotidiano dialogan de un lado al otro del río.',ids:['felisberto','cortazar']},
 {t:'Borges visto desde Montevideo',x:'El crítico uruguayo Emir Rodríguez Monegal escribió una influyente biografía literaria de Borges, publicada en 1978.',ids:['borges']},
 {t:'Crisis, en Buenos Aires',x:'Eduardo Galeano dirigió en Buenos Aires la revista Crisis a partir de 1973, hasta el golpe de 1976 y su nuevo exilio.',ids:['galeano']},
 {t:'Una nieta en Montevideo',x:'Juan Gelman buscó durante décadas a su nieta, nacida en cautiverio en Montevideo durante la Operación Cóndor, y la encontró en el año 2000.',ids:['gelman']},
 {t:'La cumparsita, tango compartido',x:'Uno de los tangos más famosos del mundo tiene música del uruguayo Gerardo Matos Rodríguez y letra de los argentinos Pascual Contursi y Enrique Maroni.',ids:[]}
];

const $=s=>document.querySelector(s);
const eraOf=id=>ERAS.find(e=>e.id===id);
const paisN=id=>PAISES.find(p=>p.id===id).n;
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const state={pais:null,era:null,gen:null,q:'',cur:null};
const years=a=>a.nac+'–'+(a.mue||'');
const GENS=[...new Set(A.flatMap(a=>a.g))];
const cls=a=>a.p==='AR'?'ar':'uy';
const ini=a=>a.n.split(' ').filter(w=>/^[A-ZÁÉÍÓÚ]/.test(w)).map(w=>w[0]).slice(0,2).join('');
const nUY=A.filter(a=>a.p==='UY').length,nAR=A.length-nUY;
$('#intro').textContent=`Del cielito de Hidalgo y los diálogos de Ascasubi a Borges, Onetti y Cortázar: ${A.length} escritoras y escritores del Río de la Plata (${nUY} uruguayos, ${nAR} argentinos), ordenados por época, género y obra, con los cruces que unen las dos orillas.`;

function applyTheme(t){document.documentElement.setAttribute('data-theme',t);$('#theme').textContent=t==='dark'?'Modo claro':'Modo oscuro'}
(function(){let t=null;try{t=localStorage.getItem('tema')}catch(e){}
 if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';applyTheme(t)})();
$('#theme').onclick=()=>{const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';applyTheme(t);try{localStorage.setItem('tema',t)}catch(e){}};

const T0=1800,T1=2010,ROWS=7;
const px=y=>((y-T0)/(T1-T0)*100);
function buildTL(){
  const tl=$('#tl');let h='';
  ERAS.forEach(e=>{h+=`<div class="band" style="left:${px(e.a)}%;width:${px(e.b)-px(e.a)}%"><b>${e.n}</b></div>`});
  for(let y=1800;y<=2000;y+=25)h+=`<span class="tick" style="left:${px(y)}%">${y}</span>`;
  [...A].sort((a,b)=>a.y-b.y).forEach((a,i)=>{
    const top=62+(i%ROWS)*(180/ROWS)*1.12;
    h+=`<button class="dot ${a.p==='AR'?'ar':''}" data-id="${a.id}" style="left:${px(a.y)}%;top:${top}px" type="button"><i></i><span>${a.c}</span></button>`;
  });
  tl.innerHTML=h;
  tl.querySelectorAll('.dot').forEach(b=>b.onclick=()=>openA(b.dataset.id));
}

function chips(el,items,key,label){
  items.forEach(it=>{const b=document.createElement('button');b.type='button';b.className='chip';b.textContent=label(it);b.dataset.v=it.id||it;b.setAttribute('aria-pressed','false');
    b.onclick=()=>{state[key]=state[key]===b.dataset.v?null:b.dataset.v;sync();render()};el.appendChild(b)});
}
function sync(){
  document.querySelectorAll('#paises .chip').forEach(b=>b.setAttribute('aria-pressed',state.pais===b.dataset.v));
  document.querySelectorAll('#eras .chip').forEach(b=>b.setAttribute('aria-pressed',state.era===b.dataset.v));
  document.querySelectorAll('#gens .chip').forEach(b=>b.setAttribute('aria-pressed',state.gen===b.dataset.v));
}
function match(a){
  if(state.pais&&a.p!==state.pais)return false;
  if(state.era&&a.e!==state.era)return false;
  if(state.gen&&!a.g.includes(state.gen))return false;
  if(state.q){const hay=norm([a.n,a.r,a.s,...a.o.map(o=>o[0])].join(' '));if(!hay.includes(norm(state.q)))return false}
  return true;
}
function render(){
  const list=A.filter(match);
  $('#count').textContent=list.length+' de '+A.length+' autores';
  $('#grid').innerHTML=list.length?list.map(a=>`<button class="card ${a.p==='AR'?'ar':''}" data-id="${a.id}" type="button">
    <span class="mono" aria-hidden="true">${ini(a)}</span><span class="yrs">${years(a)} · ${paisN(a.p)}</span><h3>${a.n}</h3><p>${a.r.split('. ')[0].replace(/\.$/,'')}.</p>
    <span class="tags"><span class="tag ${cls(a)}">${paisN(a.p)}</span>${a.g.map(g=>`<span class="tag">${g}</span>`).join('')}</span></button>`).join(''):'<p class="empty">Ningún resultado. Probá con otro nombre o quitá un filtro.</p>';
  document.querySelectorAll('.card').forEach(c=>c.onclick=()=>openA(c.dataset.id));
  const ids=new Set(list.map(a=>a.id));
  document.querySelectorAll('.dot').forEach(d=>d.classList.toggle('dim',!ids.has(d.dataset.id)));
}
function renderCruces(){
  $('#cruzgrid').innerHTML=CRUCES.map(c=>`<article class="cruz"><h3>${c.t}</h3><p>${c.x}</p>${c.ids.length?`<div class="lnks">${c.ids.map(id=>`<button class="lnk" data-id="${id}" type="button">${A.find(a=>a.id===id).c}</button>`).join('')}</div>`:''}</article>`).join('');
  document.querySelectorAll('.lnk').forEach(b=>b.onclick=()=>openA(b.dataset.id));
}

let lastFocus=null;
function openA(id,noHash){
  const a=A.find(x=>x.id===id);if(!a)return;state.cur=id;lastFocus=document.activeElement;
  $('#p-era').textContent=eraOf(a.e).n;
  $('#p-tags').innerHTML=`<span class="tag ${cls(a)}">${paisN(a.p)}</span>`+a.g.map(g=>`<span class="tag">${g}</span>`).join('');
  $('#p-name').textContent=a.n;$('#p-yrs').textContent=a.mue?`${a.nac} – ${a.mue}`:`n. ${a.nac}`;
  $('#p-bio').textContent=a.r;
  $('#p-works').innerHTML=a.o.map(o=>{const q=encodeURIComponent(o[0]+' '+a.n);return `<li><div class="w"><em>${o[0]}</em><span>${o[1]}</span></div><div class="eds"><a class="ed" href="https://openlibrary.org/search?q=${q}" target="_blank" rel="noopener">Ver ediciones <b>↗</b></a><a class="ed" href="https://www.google.com/search?tbm=bks&q=${q}" target="_blank" rel="noopener">Google Libros <b>↗</b></a></div></li>`}).join('');
  $('#p-start').textContent=a.s;
  const cr=CRUCES.filter(c=>c.ids.includes(id));
  $('#p-cruces').innerHTML=cr.length?'<h4>Cruces del Plata</h4>'+cr.map(c=>`<div class="px"><b>${c.t}</b><span>${c.x}</span></div>`).join(''):'';
  document.querySelectorAll('.dot').forEach(d=>d.classList.toggle('on',d.dataset.id===id));
  $('#panel').classList.add('open');$('#panel').setAttribute('aria-hidden','false');$('#veil').classList.add('open');
  $('#panel').scrollTop=0;$('#close').focus();
  if(!noHash){try{history.replaceState(null,'','#'+id)}catch(e){location.hash=id}}
}
function closeA(){
  $('#panel').classList.remove('open');$('#panel').setAttribute('aria-hidden','true');$('#veil').classList.remove('open');
  document.querySelectorAll('.dot').forEach(d=>d.classList.remove('on'));state.cur=null;
  try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
}
function step(d){const i=A.findIndex(a=>a.id===state.cur);openA(A[(i+d+A.length)%A.length].id)}
$('#close').onclick=closeA;$('#veil').onclick=closeA;
$('#prev').onclick=()=>step(-1);$('#next').onclick=()=>step(1);
document.addEventListener('keydown',e=>{
  if(!state.cur)return;
  if(e.key==='Escape')closeA();
  if(e.key==='ArrowRight')step(1);
  if(e.key==='ArrowLeft')step(-1);
});
$('#random').onclick=()=>{let a;do{a=A[Math.floor(Math.random()*A.length)]}while(a.id===state.cur);openA(a.id)};
$('#q').oninput=e=>{state.q=e.target.value.trim();render()};
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(A.some(a=>a.id===id))openA(id,true)});

buildTL();
chips($('#paises'),PAISES,'pais',p=>p.n);
chips($('#eras'),ERAS,'era',e=>e.n);
chips($('#gens'),GENS,'gen',g=>g);
render();renderCruces();
(function(){const id=location.hash.slice(1);if(A.some(a=>a.id===id))openA(id,true)})();
