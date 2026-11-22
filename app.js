const ERAS=[
 {id:'e1',n:'Fundación y siglo XIX',a:1800,b:1900},
 {id:'e2',n:'Modernismo y novecientos',a:1900,b:1930},
 {id:'e3',n:'Mediados del siglo XX',a:1930,b:1968},
 {id:'e4',n:'Dictadura y exilio',a:1968,b:1985},
 {id:'e5',n:'Contemporáneos',a:1985,b:2030}
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
 o:[['El camino a Ítaca',1994],['El furgón de los locos',2001]],s:'El camino a Ítaca, para conocer su voz.'},
{id:'lautreamont',p:'UY',n:"Conde de Lautréamont (Isidore Ducasse)",c:"Lautréamont",nac:1846,mue:1870,e:'e1',g:["Poesía","Narrativa"],y:1869,
 r:"Nacido en Montevideo y muerto joven en París, escribió en francés un solo libro mayor, una prosa poética de visiones violentas y metamorfosis que los surrealistas leyeron como antecedente. Su obra rompe con toda verosimilitud.",
 o:[["Los cantos de Maldoror",1869],["Poesías",1870]],s:"Los cantos de Maldoror, por fragmentos y sin apuro."},
{id:'laforgue',p:'UY',n:"Jules Laforgue",c:"Laforgue",nac:1860,mue:1887,e:'e1',g:["Poesía","Narrativa"],y:1885,
 r:"Montevideano de nacimiento, poeta en francés. Introdujo el verso libre, la ironía y el tono de monólogo en la poesía simbolista, y reescribió mitos clásicos con humor desencantado.",
 o:[["Las quejas",1885],["Moralidades legendarias",1887]],s:"Moralidades legendarias, relatos que parodian mitos."},
{id:'carreras',p:'UY',n:"Roberto de las Carreras",c:"De las Carreras",nac:1873,mue:1963,e:'e2',g:["Poesía"],y:1902,
 r:"Poeta decadentista y provocador del novecientos montevideano, cultivó el erotismo, la excentricidad y la ruptura con la moral de su tiempo. Su obra quedó durante años al margen del canon.",
 o:[["Psalmo a Venus Cavalgante",1902]],s:"Psalmo a Venus Cavalgante, para ver hasta dónde llegaba el modernismo."},
{id:'supervielle',p:'UY',n:"Jules Supervielle",c:"Supervielle",nac:1884,mue:1960,e:'e2',g:["Poesía","Narrativa"],y:1926,
 r:"Nacido en Montevideo, escribió en francés poesía y relatos de tono fantástico y tierno. Sus cuentos pueblan el mundo de seres imaginarios y de una melancolía rioplatense que nunca abandonó.",
 o:[["Gravitaciones",1925],["El ladrón de niños",1926],["El niño de la alta mar",1931]],s:"El niño de la alta mar, un cuento breve y extraordinario."},
{id:'sabat',p:'UY',n:"Carlos Sabat Ercasty",c:"Sabat Ercasty",nac:1887,mue:1982,e:'e2',g:["Poesía"],y:1917,
 r:"Poeta de aliento cósmico y verso torrencial, buscó una poesía de dimensiones universales, entre la naturaleza, la historia y el pensamiento, lejos de lo costumbrista.",
 o:[["Pantheos",1917]],s:"Pantheos, para conocer su ambición desmesurada."},
{id:'ferreiro',p:'UY',n:"Alfredo Mario Ferreiro",c:"Ferreiro",nac:1899,mue:1959,e:'e2',g:["Poesía"],y:1927,
 r:"Poeta de vanguardia, humorista y tipógrafo audaz. Sus libros juegan con la disposición del texto, el absurdo y la ciudad moderna, en pleno clima de las vanguardias rioplatenses.",
 o:[["El hombre que se comió un autobús",1927],["Se ruega no dar propina",1930]],s:"El hombre que se comió un autobús, por el título y por lo que viene después."},
{id:'soca',p:'UY',n:"Susana Soca",c:"Soca",nac:1906,mue:1959,e:'e3',g:["Poesía"],y:1953,
 r:"Poeta y animadora cultural, dirigió la revista Entregas de la Licorne, que acercó a Montevideo la literatura europea y americana. Su poesía, hondamente simbolista, trabaja el sueño y la memoria.",
 o:[["El sueño y los despertares",1953]],s:"El sueño y los despertares, poesía de claridad y misterio."},
{id:'berenguer',p:'UY',n:"Amanda Berenguer",c:"Berenguer",nac:1921,mue:2010,e:'e3',g:["Poesía"],y:1963,
 r:"Poeta de la experimentación, integró la generación del 45 y fue abandonando la poesía tradicional por formas abiertas, con ciencia, cosmos e invención verbal. Una de las voces más inventivas de la poesía uruguaya.",
 o:[["Quehaceres e invenciones",1963],["Composición de lugar",1976]],s:"Quehaceres e invenciones, el giro hacia la experimentación."},
{id:'baccino',p:'UY',n:"Napoleón Baccino Ponce de León",c:"Baccino",nac:1947,mue:2018,e:'e5',g:["Narrativa"],y:1989,
 r:"Novelista que desarmó la novela histórica con voces, documentos y juegos de memoria. Maluco reconstruye la expedición de Magallanes y Elcano desde una escritura barroca y fragmentada.",
 o:[["Maluco: la novela de los descubridores",1989]],s:"Maluco, una novela histórica que no se parece a ninguna."},
{id:'porzecanski',p:'UY',n:"Teresa Porzecanski",c:"Porzecanski",nac:1945,mue:null,e:'e5',g:["Narrativa"],y:1994,
 r:"Narradora y antropóloga. Su prosa mezcla memoria familiar, mundo judío y símbolo, con una escritura lírica que se aleja del relato realista.",
 o:[["Perfumes de Cartago",1994]],s:"Perfumes de Cartago, para entrar en su mundo de imágenes."},
{id:'macedonio',p:'AR',n:"Macedonio Fernández",c:"Macedonio",nac:1874,mue:1952,e:'e2',g:["Narrativa","Ensayo"],y:1928,
 r:"Maestro de Borges y figura central de la vanguardia porteña. Su obra juega con la idea de novela, de lector y de realidad, y anticipa buena parte del humor filosófico de la literatura rioplatense.",
 o:[["No toda es vigilia la de los ojos abiertos",1928],["Papeles de Recienvenido",1929],["Museo de la novela de la Eterna",1967]],s:"Papeles de Recienvenido, un buen comienzo."},
{id:'girondo',p:'AR',n:"Oliverio Girondo",c:"Girondo",nac:1891,mue:1967,e:'e2',g:["Poesía"],y:1922,
 r:"Poeta de vanguardia, humorista, viajero. Pasó de las imágenes irónicas de sus primeros libros a la invención verbal extrema de En la masmédula, donde la lengua se desarma y se rehace.",
 o:[["Veinte poemas para ser leídos en el tranvía",1922],["Espantapájaros",1932],["En la masmédula",1956]],s:"Veinte poemas para ser leídos en el tranvía."},
{id:'filloy',p:'AR',n:"Juan Filloy",c:"Filloy",nac:1894,mue:2000,e:'e3',g:["Narrativa"],y:1934,
 r:"Novelista cordobés de larga vida, jugó con el lenguaje, los acertijos y el absurdo. Op Oloop es una novela que mira el mundo moderno con una lupa extraña y divertida.",
 o:[["Op Oloop",1934],["Caterva",1937]],s:"Op Oloop, una novela breve y rara."},
{id:'gombrowicz',p:'AR',n:"Witold Gombrowicz",c:"Gombrowicz",nac:1904,mue:1969,e:'e3',g:["Narrativa"],y:1937,
 r:"Escritor polaco que vivió en Argentina entre 1939 y 1963. Su Ferdydurke, escrita antes de llegar, y su Trans-Atlántico, con escenas porteñas, desmontan la forma y las solemnidades de la cultura.",
 o:[["Ferdydurke",1937],["Trans-Atlántico",1953],["Cosmos",1965]],s:"Trans-Atlántico, por la mirada sobre Buenos Aires."},
{id:'marechal',p:'AR',n:"Leopoldo Marechal",c:"Marechal",nac:1900,mue:1970,e:'e3',g:["Narrativa","Poesía"],y:1948,
 r:"Poeta y novelista. Adán Buenosayres combina épica, parodia y simbolismo para recorrer Buenos Aires como si fuera un viaje iniciático, con una galería de personajes de la vanguardia local.",
 o:[["Adán Buenosayres",1948],["El banquete de Severo Arcángelo",1965]],s:"Adán Buenosayres, novela extensa y desbordante."},
{id:'bioy',p:'AR',n:"Adolfo Bioy Casares",c:"Bioy Casares",nac:1914,mue:1999,e:'e3',g:["Narrativa"],y:1940,
 r:"Amigo y colaborador de Borges, narrador de lo fantástico y lo científico con precisión de relojero. La invención de Morel, con una isla, un invento y un amor imposible, es una de las novelas mayores del género.",
 o:[["La invención de Morel",1940],["Plan de evasión",1945],["Dormir al sol",1973]],s:"La invención de Morel."},
{id:'ocampo',p:'AR',n:"Silvina Ocampo",c:"Ocampo",nac:1903,mue:1993,e:'e3',g:["Narrativa","Poesía"],y:1959,
 r:"Cuentista y poeta de una crueldad delicada y una perturbadora mirada sobre la infancia, los objetos y la domesticidad. Su obra tardó en ser leída con la atención que merecía.",
 o:[["Viaje olvidado",1937],["La furia",1959],["Y así sucesivamente",1987]],s:"La furia, un libro de cuentos inolvidables."},
{id:'sabato',p:'AR',n:"Ernesto Sabato",c:"Sabato",nac:1911,mue:2011,e:'e3',g:["Narrativa","Ensayo"],y:1961,
 r:"Físico devenido escritor. Sobre héroes y tumbas contiene el célebre Informe sobre ciegos, una pesadilla narrada con aliento metafísico, que rompe el pacto realista de la novela.",
 o:[["El túnel",1948],["Sobre héroes y tumbas",1961]],s:"El túnel, para empezar; después el Informe sobre ciegos."},
{id:'mujica',p:'AR',n:"Manuel Mujica Láinez",c:"Mujica Láinez",nac:1910,mue:1984,e:'e3',g:["Narrativa"],y:1962,
 r:"Novelista de la fantasía histórica y del artificio. Bomarzo, narrada por un duque renacentista, mezcla erudición, grotesco y alegoría con una prosa de gran lujo.",
 o:[["Misteriosa Buenos Aires",1950],["Bomarzo",1962],["El unicornio",1965]],s:"Misteriosa Buenos Aires, cuentos de otra ciudad."},
{id:'pizarnik',p:'AR',n:"Alejandra Pizarnik",c:"Pizarnik",nac:1936,mue:1972,e:'e3',g:["Poesía"],y:1962,
 r:"Poeta de una escritura mínima, fragmentaria y obsesiva, atravesada por el silencio, el cuerpo y la infancia. Una de las voces más influyentes de la poesía en lengua española.",
 o:[["Árbol de Diana",1962],["Los trabajos y las noches",1965],["Extracción de la piedra de locura",1968]],s:"Árbol de Diana, de lectura breve y profunda."},
{id:'juarroz',p:'AR',n:"Roberto Juarroz",c:"Juarroz",nac:1925,mue:1995,e:'e3',g:["Poesía"],y:1958,
 r:"Autor de una única obra en marcha, la Poesía vertical, formada por libros sin título propio. Sus versos buscan la paradoja, el vacío y el límite de lo decible.",
 o:[["Poesía vertical",1958]],s:"Los primeros libros de la Poesía vertical."},
{id:'orozco',p:'AR',n:"Olga Orozco",c:"Orozco",nac:1920,mue:1999,e:'e3',g:["Poesía"],y:1952,
 r:"Poeta del grupo surrealista argentino, de imaginería mágica y visionaria. Sus poemas hablan de la memoria, la adivinación y la muerte con una voz de gran tensión.",
 o:[["Las muertes",1952],["La oscuridad es otro sol",1967]],s:"La oscuridad es otro sol."},
{id:'molina',p:'AR',n:"Enrique Molina",c:"Molina",nac:1910,mue:1997,e:'e3',g:["Poesía"],y:1941,
 r:"Poeta surrealista, viajero y de verso amplio. Sus libros combinan lo erótico, el mar y lo visionario con un lenguaje deslumbrante.",
 o:[["Las cosas y el delirio",1941],["Pasiones terrestres",1946]],s:"Pasiones terrestres."},
{id:'oesterheld',p:'AR',n:"Héctor Germán Oesterheld",c:"Oesterheld",nac:1919,mue:1977,e:'e3',g:["Historieta"],y:1957,
 r:"Guionista y narrador, creó El Eternauta, una historieta de ciencia ficción ambientada en una Buenos Aires cubierta de nieve mortal. Fue desaparecido por la dictadura.",
 o:[["El Eternauta",1957]],s:"El Eternauta, con dibujos de Solano López."},
{id:'copi',p:'AR',n:"Copi (Raúl Damonte)",c:"Copi",nac:1939,mue:1987,e:'e4',g:["Narrativa","Teatro"],y:1973,
 r:"Dibujante, dramaturgo y novelista, escribió desde París en francés y español. Su obra, de humor negro, cuerpos mutantes e identidades inestables, desarma toda lógica realista.",
 o:[["El uruguayo",""]],s:"El uruguayo, novela breve y feroz."},
{id:'gallardo',p:'AR',n:"Sara Gallardo",c:"Gallardo",nac:1931,mue:1988,e:'e4',g:["Narrativa"],y:1971,
 r:"Narradora de prosa seca y poderosa. Eisejuaz, con la voz de un indígena visionario del Chaco, transforma el lenguaje y el relato.",
 o:[["Enero",1958],["Eisejuaz",1971]],s:"Eisejuaz."},
{id:'wilcock',p:'AR',n:"Juan Rodolfo Wilcock",c:"Wilcock",nac:1919,mue:1978,e:'e4',g:["Narrativa","Poesía"],y:1978,
 r:"Poeta y narrador argentino que terminó escribiendo en italiano. Sus libros de seres imaginarios y vidas fantásticas mezclan erudición y humor y alteran el sentido de la biografía.",
 o:[["El estereoscopio de los solitarios",1972],["El libro de los monstruos",1978]],s:"El libro de los monstruos."},
{id:'valenzuela',p:'AR',n:"Luisa Valenzuela",c:"Valenzuela",nac:1938,mue:null,e:'e4',g:["Narrativa"],y:1975,
 r:"Narradora y cronista. Sus cuentos y novelas combinan lo fantástico, lo político y lo erótico, y exploran el lenguaje y la censura durante los años de dictadura.",
 o:[["Aquí pasan cosas raras",1975],["Cambio de armas",1982]],s:"Cambio de armas."},
{id:'gorodischer',p:'AR',n:"Angélica Gorodischer",c:"Gorodischer",nac:1928,mue:2022,e:'e4',g:["Narrativa"],y:1979,
 r:"Una de las grandes voces de la ciencia ficción en español. Kalpa imperial inventa un imperio narrado como cuentos de un narrador oral, entre la fábula y la política.",
 o:[["Trafalgar",1979],["Kalpa imperial",1983]],s:"Kalpa imperial."},
{id:'gambaro',p:'AR',n:"Griselda Gambaro",c:"Gambaro",nac:1928,mue:null,e:'e4',g:["Teatro","Narrativa"],y:1976,
 r:"Dramaturga y narradora. Su teatro del absurdo, de crueldad y humor, retrató el autoritarismo con una lógica pesadillesca, y su narrativa sigue esa línea.",
 o:[["El campo",1967],["Ganarse la muerte",1976]],s:"El campo, obra breve y perturbadora."},
{id:'fogwill',p:'AR',n:"Rodolfo Enrique Fogwill",c:"Fogwill",nac:1941,mue:2010,e:'e4',g:["Narrativa"],y:1983,
 r:"Escritor, sociólogo y publicista. Los pichiciegos, ambientada en la guerra de Malvinas, convierte una trinchera en una fábula de supervivencia.",
 o:[["Los pichiciegos",1983]],s:"Los pichiciegos."},
{id:'thenon',p:'AR',n:"Susana Thénon",c:"Thénon",nac:1935,mue:1991,e:'e4',g:["Poesía"],y:1984,
 r:"Poeta de ironía feroz y escritura experimental. Su obra mezcla idiomas, voces y registros para mirar con humor el lenguaje y la cultura.",
 o:[["Distancias",1984],["Ova completa",1987]],s:"Ova completa."},
{id:'perlongher',p:'AR',n:"Néstor Perlongher",c:"Perlongher",nac:1949,mue:1992,e:'e5',g:["Poesía","Ensayo"],y:1987,
 r:"Poeta neobarroco, antropólogo y militante. Su lengua, con ecos del barroco y el portuñol, convierte el cuerpo y la calle en materia poética.",
 o:[["Austria-Hungría",1980],["Alambres",1987],["Hule",1989]],s:"Alambres."},
{id:'cohen',p:'AR',n:"Marcelo Cohen",c:"Cohen",nac:1951,mue:null,e:'e5',g:["Narrativa"],y:1989,
 r:"Narrador y traductor. Su ciencia ficción rioplatense, con ciudades imaginarias y lenguaje inventivo, es una de las más personales del género.",
 o:[["Insomnio",1986],["El oído absoluto",1989]],s:"El oído absoluto."},
{id:'aira',p:'AR',n:"César Aira",c:"Aira",nac:1949,mue:null,e:'e5',g:["Narrativa"],y:1993,
 r:"Autor de una obra enorme y veloz, que cultiva la aventura, el delirio y el procedimiento del continuar. Cada libro es una variación sobre cómo contar.",
 o:[["Ema, la cautiva",1981],["Cómo me hice monja",1993]],s:"Cómo me hice monja."},
{id:'laiseca',p:'AR',n:"Alberto Laiseca",c:"Laiseca",nac:1941,mue:2016,e:'e5',g:["Narrativa"],y:1998,
 r:"Narrador de mundos imaginarios, humor negro y extensión desmedida. Los sorias es una novela de proporciones épicas, con un imperio que mezcla política y delirio.",
 o:[["Su turno",1976],["Los sorias",1998]],s:"Los sorias, para quien se anime a la novela larga."},
{id:'schweblin',p:'AR',n:"Samanta Schweblin",c:"Schweblin",nac:1978,mue:null,e:'e5',g:["Narrativa"],y:2014,
 r:"Cuentista y novelista traducida a muchos idiomas. Sus relatos y su novela Distancia de rescate trabajan el miedo contemporáneo con una escritura sobria y cercana a lo fantástico.",
 o:[["Pájaros en la boca",2009],["Distancia de rescate",2014]],s:"Distancia de rescate."},
{id:'katchadjian',p:'AR',n:"Pablo Katchadjian",c:"Katchadjian",nac:1977,mue:null,e:'e5',g:["Narrativa"],y:2009,
 r:"Escritor que explora los procedimientos de la literatura, con humor y obsesión formal, entre la ficción, la reescritura y el juego.",
 o:[["El Aleph engordado",2009],["Qué hacer",2010]],s:"Qué hacer."},
{id:'harwicz',p:'AR',n:"Ariana Harwicz",c:"Harwicz",nac:1977,mue:null,e:'e5',g:["Narrativa"],y:2012,
 r:"Narradora que escribe sus novelas en español desde Francia. Sus textos breves y violentos trabajan la maternidad, el deseo y la locura con un lenguaje de gran tensión.",
 o:[["Matate, amor",2012],["La débil mental",2014]],s:"Matate, amor."},
{id:'enriquez',p:'AR',n:"Mariana Enríquez",c:"Enríquez",nac:1973,mue:null,e:'e5',g:["Narrativa"],y:2016,
 r:"Narradora del terror rioplatense contemporáneo. Sus cuentos cruzan lo gótico con la memoria política y la violencia de los barrios.",
 o:[["Las cosas que perdimos en el fuego",2016],["Nuestra parte de noche",2019]],s:"Las cosas que perdimos en el fuego."},
{id:"ladra",p:"UY",n:"Eugenia Ladra",c:"Ladra",nac:1992,mue:null,e:"e5",g:["Narrativa"],y:2024,
 r:"Narradora montevideana, formada en Comunicación y en Creación Literaria. Carnada, su primera novela, sucede en Paso Chico, un pueblo ficticio y caluroso a la orilla de un río, donde la adolescente Marga vive su despertar entre el agobio, la oralidad del habla local y la violencia que nadie nombra.",
 o:[["Ramona y Ramiro",2017],["La naturaleza de la muerte",2019],["El espacio podría sonar así",2020],["Carnada",2024]],s:"Carnada."},
{id:"silva",p:"UY",n:"Tamara Silva Bernaschina",c:"Silva",nac:2000,mue:null,e:"e5",g:["Narrativa"],y:2023,
 r:"Narradora nacida en Minas, una de las voces más jóvenes de la narrativa uruguaya. Sus cuentos y novelas llevan el paisaje del interior, el calor, los animales y lo oculto a un territorio inquietante donde los secretos quedan sin resolver. Desastres naturales ganó dos premios Bartolomé Hidalgo y Temporada de ballenas el Premio Nacional de Literatura en ópera prima.",
 o:[["Desastres naturales",2023],["Temporada de ballenas",2024],["Larvas",2025]],s:"Larvas, ocho relatos breves que inquietan."},
{id:"trias",p:"UY",n:"Fernanda Trías",c:"Trías",nac:1976,mue:null,e:"e5",g:["Narrativa"],y:2020,
 r:"Narradora y traductora montevideana radicada en Bogotá. Su prosa seca y de atmósfera enrarecida trabaja el encierro, la amenaza exterior y el cuerpo: en La azotea una mujer se atrinchera con su padre y su hija, y en Mugre rosa una ciudad costera cercada por una niebla tóxica pone a su narradora ante el cuidado y el aislamiento. Mugre rosa obtuvo el Premio Nacional de Literatura.",
 o:[["La azotea",2001],["La ciudad invencible",2014],["No soñarás flores",2016],["Mugre rosa",2020],["El monte de las furias",2025]],s:"Mugre rosa."},
{id:"bazterrica",p:"AR",n:"Agustina Bazterrica",c:"Bazterrica",nac:1974,mue:null,e:"e5",g:["Narrativa"],y:2017,
 r:"Narradora y licenciada en Artes. Su ficción cruza el horror, la distopía y lo corporal: Cadáver exquisito, Premio Clarín de Novela, imagina un mundo donde un virus lleva a legalizar la cría de personas para el consumo. Fue traducida a decenas de idiomas.",
 o:[["Matar a la niña",2013],["Antes del encuentro feroz",2016],["Cadáver exquisito",2017],["Las indignas",2023]],s:"Cadáver exquisito."},
{id:"reyes",p:"AR",n:"Dolores Reyes",c:"Reyes",nac:1978,mue:null,e:"e5",g:["Narrativa"],y:2019,
 r:"Narradora y filóloga clásica de Buenos Aires. Cometierra, su primera novela, sigue a una joven que come tierra y así ve dónde están las personas desaparecidas; su continuación, Miseria, la lleva a la ciudad. Trabaja la desaparición, el femicidio y la maternidad desde una voz entre lo visionario y lo cotidiano.",
 o:[["Cometierra",2019],["Miseria",2023]],s:"Cometierra."},
{id:"puig",p:"AR",n:"Manuel Puig",c:"Puig",nac:1932,mue:1990,e:"e4",g:["Narrativa"],y:1976,
 r:"Narrador de General Villegas que hizo de la cultura de masas —el folletín, el cine, el bolero— el material de una novela polifónica y coloquial. Sus libros dan voz a lo que la literatura seria despreciaba y, en El beso de la mujer araña, ponen frente a frente en una celda a un preso político y a un homosexual que le cuenta películas.",
 o:[["La traición de Rita Hayworth",1968],["Boquitas pintadas",1969],["El beso de la mujer araña",1976]],s:"El beso de la mujer araña."},
{id:"walsh",p:"AR",n:"Rodolfo Walsh",c:"Walsh",nac:1927,mue:1977,e:"e4",g:["Narrativa"],y:1957,
 r:"Cuentista, periodista y militante, secuestrado y desaparecido por la dictadura un día después de escribir su Carta abierta a la Junta Militar. En Operación Masacre inventó una forma, la no ficción con ritmo de novela policial, y sus cuentos conjugan el rigor del género con la política.",
 o:[["Operación Masacre",1957],["Los oficios terrestres",1965],["Un kilo de oro",1967],["¿Quién mató a Rosendo?",1969]],s:"Operación Masacre."},
{id:"saer",p:"AR",n:"Juan José Saer",c:"Saer",nac:1937,mue:2005,e:"e4",g:["Narrativa"],y:1986,
 r:"Narrador de Serodino, en la provincia de Santa Fe, que escribió casi toda su obra desde París. Su zona de ríos, llanuras y amigos que conversan en la costa es una de las construcciones más sostenidas de la narrativa en español, de prosa lenta y precisa, atenta a la percepción y a lo que el lenguaje no alcanza.",
 o:[["Cicatrices",1969],["El limonero real",1974],["El entenado",1983],["Glosa",1986],["La pesquisa",1994]],s:"El entenado."},
{id:"piglia",p:"AR",n:"Ricardo Piglia",c:"Piglia",nac:1941,mue:2017,e:"e4",g:["Narrativa"],y:1980,
 r:"Narrador y crítico de Adrogué que cruzó la novela negra con la teoría. Respiración artificial, escrita bajo la dictadura, reúne en una sola conversación a Arlt, Kafka y la historia argentina; su alter ego Emilio Renzi recorre buena parte de su obra, hasta los Diarios publicados después de su muerte.",
 o:[["Respiración artificial",1980],["La ciudad ausente",1992],["Plata quemada",1997],["Blanco nocturno",2010]],s:"Respiración artificial."},
{id:"conti",p:"AR",n:"Haroldo Conti",c:"Conti",nac:1925,mue:1976,e:"e4",g:["Narrativa"],y:1962,
 r:"Narrador de Chacabuco, desaparecido por la dictadura en 1976. Sus novelas y cuentos siguen a marginales, isleños y vagabundos del Delta del Paraná y del litoral, en una prosa luminosa y errante que hace del río una forma de libertad.",
 o:[["Sudeste",1962],["Alrededor de la jaula",1966],["Mascaró, el cazador americano",1975]],s:"Sudeste."},
{id:"dibenedetto",p:"AR",n:"Antonio Di Benedetto",c:"Di Benedetto",nac:1922,mue:1986,e:"e4",g:["Narrativa"],y:1956,
 r:"Narrador mendocino. Zama, la espera de un funcionario colonial en el Paraguay del siglo XVIII, es una de las grandes novelas sobre el tiempo detenido. Detenido y torturado por la dictadura, escribió después Sombras, nada más; su obra, ajena a todo realismo corriente, trabaja la ansiedad, la sequedad y la obsesión.",
 o:[["El pentágono",1955],["Zama",1956],["El silenciero",1964],["Los suicidas",1969]],s:"Zama."},
{id:"soriano",p:"AR",n:"Osvaldo Soriano",c:"Soriano",nac:1943,mue:1997,e:"e4",g:["Narrativa"],y:1978,
 r:"Narrador de Mar del Plata, exiliado durante la dictadura. Mezcló el humor, la novela policial y la melancolía por la derrota política en historias de pueblos perdidos y personajes derrotados que resisten con ironía; llevó el cine y el fútbol a la literatura sin solemnidad.",
 o:[["Triste, solitario y final",1973],["No habrá más penas ni olvido",1978],["Cuarteles de invierno",1980],["Una sombra ya pronto serás",1990]],s:"No habrá más penas ni olvido."},
{id:"eloy",p:"AR",n:"Tomás Eloy Martínez",c:"Eloy Martínez",nac:1934,mue:2010,e:"e4",g:["Narrativa"],y:1995,
 r:"Narrador tucumano, periodista y exiliado. Sus novelas parten de la historia argentina, el peronismo y el culto a los cuerpos y los mitos, y los someten a la duda: Santa Evita sigue el itinerario del cadáver embalsamado de Eva Perón, entre la investigación y la ficción.",
 o:[["La novela de Perón",1985],["Santa Evita",1995],["El vuelo de la reina",2002],["El cantor de tango",2004]],s:"Santa Evita."},
{id:"moyano",p:"AR",n:"Daniel Moyano",c:"Moyano",nac:1930,mue:1992,e:"e4",g:["Narrativa"],y:1981,
 r:"Narrador criado en La Rioja y exiliado en España desde 1976. Sus novelas y cuentos combinan la alegoría con la vida de provincia y la música, y buscan el modo de contar el miedo y la dictadura sin nombrarlos.",
 o:[["El oscuro",1968],["El vuelo del tigre",1981],["Libro de navíos y borrascas",1983]],s:"El vuelo del tigre."},
{id:"tizon",p:"AR",n:"Héctor Tizón",c:"Tizón",nac:1929,mue:2012,e:"e4",g:["Narrativa"],y:1972,
 r:"Narrador jujeño, también juez y exiliado. Su obra recorre la Puna, la quebrada y la frontera con Bolivia con una prosa sobria y poética, y recoge a los marginados y las memorias indígenas del norte argentino.",
 o:[["Fuego en Casabindo",1969],["El cantar del profeta y el bandido",1972],["El traidor venerado",1978],["La casa y el viento",1984]],s:"El cantar del profeta y el bandido."},
{id:"uhart",p:"AR",n:"Hebe Uhart",c:"Uhart",nac:1936,mue:2018,e:"e4",g:["Narrativa"],y:1991,
 r:"Cuentista y cronista de Moreno, en el conurbano bonaerense. Su prosa seca, humorística y atenta a la oralidad convirtió el viaje, el pueblo y la conversación cotidiana en un modo de mirar; su influencia en las narradoras actuales es enorme.",
 o:[["Camilo asciende",1987],["Un camino de hormigas",1991],["Relatos reunidos",2010]],s:"Relatos reunidos."},
{id:"pauls",p:"AR",n:"Alan Pauls",c:"Pauls",nac:1959,mue:null,e:"e5",g:["Narrativa"],y:2003,
 r:"Narrador porteño, también ensayista y guionista. Su obra interroga las formas del recuerdo, la pareja y la familia, con una frase larga y precisa; El pasado, historia de una separación que dura años, fue un hito de la narrativa argentina reciente.",
 o:[["Wasabi",1994],["El pasado",2003],["Historia del llanto",2007],["Historia del pelo",2010]],s:"El pasado."},
{id:"kohan",p:"AR",n:"Martín Kohan",c:"Kohan",nac:1967,mue:null,e:"e5",g:["Narrativa"],y:2007,
 r:"Narrador y crítico porteño. Sus novelas exploran la violencia política y la historia desde situaciones mínimas y ambiguas: en Ciencias morales, una celadora de un colegio de elite durante la dictadura vigila cuerpos y reglas sin ver lo que ocurre afuera.",
 o:[["Dos veces junio",2002],["Museo de la revolución",2006],["Ciencias morales",2007]],s:"Ciencias morales."},
{id:"chejfec",p:"AR",n:"Sergio Chejfec",c:"Chejfec",nac:1956,mue:2022,e:"e5",g:["Narrativa"],y:1999,
 r:"Narrador porteño radicado en Nueva York. Sus novelas, sin trama evidente, avanzan por la caminata, la observación y la digresión, y hacen de la mirada lenta una manera de pensar el paisaje, la migración y la memoria.",
 o:[["Lenta biografía",1990],["Los planetas",1999],["Boca de lobo",2000],["Mis dos mundos",2008]],s:"Los planetas."},
{id:"piñeiro",p:"AR",n:"Claudia Piñeiro",c:"Piñeiro",nac:1960,mue:null,e:"e5",g:["Narrativa"],y:2005,
 r:"Narradora de Burzaco. Combina la intriga con la mirada social: en Las viudas de los jueves, un country de Buenos Aires de los años noventa se desmorona desde adentro, y en sus novelas siguientes el crimen sirve para exponer la clase media, el trabajo y las relaciones de poder.",
 o:[["Tuya",2005],["Las viudas de los jueves",2005],["Elena sabe",2007],["Una suerte pequeña",2015]],s:"Las viudas de los jueves."},
{id:"andruetto",p:"AR",n:"María Teresa Andruetto",c:"Andruetto",nac:1954,mue:null,e:"e5",g:["Narrativa"],y:2014,
 r:"Narradora cordobesa, ganadora del premio Hans Christian Andersen en 2012. Su obra, de frases breves y memoria familiar, trabaja el exilio, la migración italiana y la dictadura.",
 o:[["Tama",1998],["La mujer en cuestión",2002],["Lengua madre",2010],["Stefano",2014]],s:"Lengua madre."},
{id:"mairal",p:"AR",n:"Pedro Mairal",c:"Mairal",nac:1970,mue:null,e:"e5",g:["Narrativa"],y:2005,
 r:"Narrador porteño. Su Río de la Plata es el de las dos orillas: El año del desierto imagina una Buenos Aires atravesada por el desierto y La uruguaya cuenta, en un solo día, la escapada de un escritor a Montevideo con una joven uruguaya.",
 o:[["Una noche con Sabrina Love",1998],["El año del desierto",2005],["Salvatierra",2008],["La uruguaya",2016]],s:"La uruguaya."},
{id:"almada",p:"AR",n:"Selva Almada",c:"Almada",nac:1973,mue:null,e:"e5",g:["Narrativa"],y:2012,
 r:"Narradora entrerriana. Su prosa seca y rural, heredera del gótico del sur, cuenta violencias cotidianas y relaciones de familia en pueblos del litoral: El viento que arrasa, su primera novela, fija el tono de un conjunto que hoy se lee como una cartografía de la crueldad en el interior.",
 o:[["El viento que arrasa",2012],["Ladrilleros",2013],["Chicas muertas",2014],["No es un río",2020]],s:"El viento que arrasa."},
{id:"cabezon",p:"AR",n:"Gabriela Cabezón Cámara",c:"Cabezón Cámara",nac:1968,mue:null,e:"e5",g:["Narrativa"],y:2017,
 r:"Narradora y periodista. Sus novelas mezclan la crónica, la sátira y la fantasía política en torno a cuerpos y territorios marginales: en Las aventuras de la China Iron, una joven abandona su vida de pampa y de esposa de gaucho y se lanza a recorrer el desierto con una inglesa.",
 o:[["La Virgen Cabeza",2009],["Beya",2013],["Las aventuras de la China Iron",2017],["Las niñas del naranjel",2023]],s:"Las aventuras de la China Iron."},
{id:"sosa",p:"AR",n:"Camila Sosa Villada",c:"Sosa Villada",nac:1982,mue:null,e:"e5",g:["Narrativa"],y:2019,
 r:"Narradora y actriz cordobesa. Las malas, su primera novela, cuenta la vida de una comunidad de travestis en un parque de Córdoba, con humor, ternura y violencia, y la convirtió en una de las voces más leídas de su generación.",
 o:[["Tesis sobre una domesticación",2019],["Las malas",2019],["Bandidas",2021]],s:"Las malas."},
{id:"puenzo",p:"AR",n:"Lucía Puenzo",c:"Puenzo",nac:1976,mue:null,e:"e5",g:["Narrativa"],y:2011,
 r:"Narradora, guionista y directora de cine porteña. Sus novelas, ligadas a sus películas, tratan la identidad, el cuerpo y la herencia de la dictadura con una prosa tensa y cinematográfica: Wakolda imagina a un médico nazi en la Patagonia argentina.",
 o:[["El niño pez",2004],["La furia de la langosta",2006],["Wakolda",2011]],s:"Wakolda."},
{id:"benedetti",p:"UY",n:"Mario Benedetti",c:"Benedetti",nac:1920,mue:2009,e:"e3",g:["Narrativa"],y:1960,
 r:"Narrador, poeta y ensayista de la Generación del 45, nacido en Paso de los Toros. Sus relatos y novelas retratan la oficina, la clase media montevideana y el exilio con un lenguaje claro y cotidiano: La tregua, diario de un contador viudo que se enamora, es una de las novelas más leídas del Río de la Plata.",
 o:[["Montevideanos",1959],["La tregua",1960],["Gracias por el fuego",1965],["Primavera con una esquina rota",1982]],s:"La tregua."},
{id:"martinezmoreno",p:"UY",n:"Carlos Martínez Moreno",c:"Martínez Moreno",nac:1917,mue:1986,e:"e3",g:["Narrativa"],y:1963,
 r:"Narrador montevideano de la Generación del 45, abogado y exiliado en Argentina y México. Sus novelas y cuentos exploran la burguesía, el derecho y la violencia política con una prosa de gran densidad; El paredón y El color que el infierno me escondiera ponen la tortura y la sombra de la dictadura en el centro.",
 o:[["El paredón",1963],["Con las primeras luces",1966],["El color que el infierno me escondiera",1981]],s:"El paredón."},
{id:"morosoli",p:"UY",n:"Juan José Morosoli",c:"Morosoli",nac:1899,mue:1957,e:"e3",g:["Narrativa"],y:1944,
 r:"Cuentista de Minas, escritor autodidacta que trabajó como comerciante. Sus relatos retratan a peones, albañiles y vecinos de los pueblos del interior uruguayo, con una escritura sobria que se detiene en el gesto y en el silencio.",
 o:[["Los albañiles de «Los Tapiales»",1936],["Hombres",1944],["Perico",1945]],s:"Hombres."},
{id:"espinola",p:"UY",n:"Francisco Espínola",c:"Espínola",nac:1901,mue:1973,e:"e3",g:["Narrativa"],y:1933,
 r:"Narrador de San José. Sus cuentos y su novela Sombras sobre la tierra llevan al campo uruguayo un humor negro y una oralidad estilizada, entre la crueldad y la ternura; Don Juan el Zorro retoma los cuentos del zorro del folklore rioplatense.",
 o:[["Raza ciega",1926],["Sombras sobre la tierra",1933],["Don Juan el Zorro",1968]],s:"Sombras sobre la tierra."},
{id:"rosencof",p:"UY",n:"Mauricio Rosencof",c:"Rosencof",nac:1933,mue:null,e:"e4",g:["Narrativa"],y:1992,
 r:"Narrador y dramaturgo, hijo de inmigrantes judíos polacos. Dirigente tupamaro, pasó más de once años preso durante la dictadura y escribió luego sobre esa experiencia y sobre su infancia en Florida: El bataraz es una autobiografía novelada del barrio.",
 o:[["Memorias del calabozo",1987],["El bataraz",1992],["Las cartas que no llegaron",2000]],s:"El bataraz."},
{id:"reyles",p:"UY",n:"Carlos Reyles",c:"Reyles",nac:1868,mue:1938,e:"e2",g:["Narrativa"],y:1916,
 r:"Narrador de Montevideo y estanciero. Sus novelas enfrentan la vida rural con las ideas de su tiempo —el darwinismo, la voluntad—: en El terruño y El gaucho Florido el campo se vuelve territorio de debate entre la modernización y la tradición.",
 o:[["Beba",1894],["El terruño",1916],["El embrujo de Sevilla",1922],["El gaucho Florido",1932]],s:"El terruño."},
{id:"viana",p:"UY",n:"Javier de Viana",c:"Viana",nac:1868,mue:1926,e:"e2",g:["Narrativa"],y:1901,
 r:"Cuentista canario, de familia estanciera, que vivió sus últimos años en Montevideo. Sus relatos mostraron la vida del gaucho en declive con rudeza naturalista, y lo convirtieron en una referencia del cuento rural rioplatense.",
 o:[["Campo",1896],["Gaucha",1899],["Gurí",1901],["Macachines",1910]],s:"Gurí."},
{id:"acevedo",p:"UY",n:"Eduardo Acevedo Díaz",c:"Acevedo Díaz",nac:1851,mue:1921,e:"e1",g:["Narrativa"],y:1888,
 r:"Narrador y político nacido en Villa de la Unión. Fundó la novela histórica uruguaya con una trilogía sobre la gesta artiguista y las guerras civiles; vivió años en Buenos Aires, donde publicó parte de su obra.",
 o:[["Ismael",1888],["Nativa",1890],["Grito de gloria",1893],["Soledad",1894]],s:"Ismael."},
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
 {t:'La cumparsita, tango compartido',x:'Uno de los tangos más famosos del mundo tiene música del uruguayo Gerardo Matos Rodríguez y letra de los argentinos Pascual Contursi y Enrique Maroni.',ids:[]},
 {t:'Montevideo en la poesía francesa',x:'Lautréamont, Laforgue y Supervielle nacieron en Montevideo y escribieron en francés. Tres obras muy distintas, del delirio a la ironía y a la ternura, nacidas de una misma ciudad del Plata.',ids:['lautreamont','laforgue','supervielle']},
 {t:'Una antología de lo fantástico',x:'En 1940, Borges, Silvina Ocampo y Adolfo Bioy Casares publicaron juntos la Antología de la literatura fantástica, que fue una brújula para toda una generación de lectores.',ids:['borges','ocampo','bioy']},
 {t:'La vanguardia y su maestro',x:'Macedonio Fernández fue maestro y amigo de Borges, y su idea de la novela como juego filosófico atraviesa la tradición experimental rioplatense posterior.',ids:['macedonio','borges','girondo']}
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

const T0=1800,T1=2020,ROWS=8;
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
