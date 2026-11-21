/* Orilla de Letras: (1) cuadro pintado con pinceladas gruesas, (2) efecto de letra al tocar un autor, (3) solo autores no realistas */
(function(){
  /* ---------- 3. sacar autores realistas ---------- */
  var FUERA=['acevedo','viana','reyles','sanchez','benedetti'];
  try{
    for(var i=A.length-1;i>=0;i--)if(FUERA.indexOf(A[i].id)>-1)A.splice(i,1);
    CRUCES.forEach(function(c){c.ids=c.ids.filter(function(x){return FUERA.indexOf(x)<0})});
    for(var j=CRUCES.length-1;j>=0;j--)if(CRUCES[j].t==='Teatro de ida y vuelta')CRUCES.splice(j,1);
    var nUY2=A.filter(function(a){return a.p==='UY'}).length;
    document.getElementById('intro').textContent='Del cielito de Hidalgo y los diálogos de Ascasubi a Borges, Onetti y Cortázar: '+A.length+' escritoras y escritores del Río de la Plata ('+nUY2+' uruguayos, '+(A.length-nUY2)+' argentinos), ordenados por época, género y obra, con los cruces que unen las dos orillas.';
    buildTL();render();renderCruces();
  }catch(e){}

  /* ---------- 2. al tocar un autor, la letra crece y se deforma ---------- */
  var st=document.createElement('style');
  st.textContent='.card.boom{position:relative;z-index:5}.card.boom h3{animation:deforma .55s cubic-bezier(.3,1.6,.5,1) both}.card.boom .mono{animation:deforma2 .55s cubic-bezier(.3,1.6,.5,1) both}'
   +'@keyframes deforma{0%{transform:none}45%{transform:scale(1.9) skewX(-16deg) rotate(-3deg);letter-spacing:.04em}100%{transform:scale(1.5) skewX(-8deg)}}'
   +'@keyframes deforma2{0%{transform:none}45%{transform:scale(2.6) skewY(12deg) rotate(8deg)}100%{transform:scale(2) skewY(6deg)}}'
   +'.card.boom h3,.card.boom .mono{transform-origin:left center;position:relative}';
  document.head.appendChild(st);
  document.addEventListener('click',function(e){
    var c=e.target.closest&&e.target.closest('.card');
    if(!c||c.dataset.go)return;
    e.stopImmediatePropagation();e.preventDefault();
    c.classList.add('boom');c.dataset.go='1';
    setTimeout(function(){c.classList.remove('boom');delete c.dataset.go;openA(c.dataset.id)},520);
  },true);

  /* ---------- 1. el cuadro ---------- */
  var cv=document.getElementById('rio');if(!cv||!cv.getContext)return;
  var W=1600,H=460;cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');
  var bs=document.createElement('canvas');bs.width=W;bs.height=H;var g=bs.getContext('2d');
  var mk=document.createElement('canvas');mk.width=W;mk.height=H;var q=mk.getContext('2d');
  var seed=11;function R(){seed=(seed*16807)%2147483647;return seed/2147483647}
  function scene(c,m){
    var F=function(x){return m?'#fff':x};
    function P(d,col,a,tx,ty,sc){c.save();c.translate(tx||0,ty||0);if(sc)c.scale(sc,sc);c.globalAlpha=a==null?1:a;c.fillStyle=F(col);c.fill(new Path2D(d));c.restore()}
    function RC(x,y,w,h,col,a){c.globalAlpha=a==null?1:a;c.fillStyle=F(col);c.fillRect(x,y,w,h);c.globalAlpha=1}
    function LN(pts,col,w){c.strokeStyle=F(col);c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(pts[0],pts[1]);for(var i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.stroke()}
    if(!m){
      var sk=c.createLinearGradient(0,0,0,318);sk.addColorStop(0,'#0A2342');sk.addColorStop(.5,'#1F5588');sk.addColorStop(.85,'#5F95BD');sk.addColorStop(1,'#A9C7DA');c.fillStyle=sk;c.fillRect(0,0,W,H);
      var mg=c.createRadialGradient(800,150,20,800,150,250);mg.addColorStop(0,'rgba(255,242,205,.95)');mg.addColorStop(.35,'rgba(244,214,140,.45)');mg.addColorStop(1,'rgba(240,210,140,0)');c.fillStyle=mg;c.fillRect(0,0,W,H);
      c.fillStyle='#FDF1C8';c.beginPath();c.arc(800,150,62,0,7);c.fill();
      var wt=c.createLinearGradient(0,318,0,H);wt.addColorStop(0,'#2A6397');wt.addColorStop(.4,'#1A4C7C');wt.addColorStop(1,'#0B2A4D');c.fillStyle=wt;c.fillRect(0,318,W,H-318);
      var rf=c.createLinearGradient(0,320,0,H);rf.addColorStop(0,'rgba(250,228,160,.75)');rf.addColorStop(1,'rgba(250,228,160,.12)');c.fillStyle=rf;c.fillRect(742,320,116,H-320);
      c.globalAlpha=.3;c.fillStyle='#F2C56B';c.fillRect(1040,320,580,60);c.fillStyle='#8EC5EE';c.fillRect(290,320,280,50);c.globalAlpha=1;
      P('M-20 318V240C50 226 110 198 175 190 220 185 240 200 262 212L268 150 284 150 288 214C330 228 380 238 430 248 480 258 515 272 565 300L580 322Z','#235E91');
    }
    RC(268,150,16,66,'#143F68');P('M266 150L276 124L286 150Z','#143F68');
    P('M298 291L332 291L333 318L301 318ZM337 284L371 280L373 318L340 318ZM377 291L398 290L398 318L377 318ZM407 278L425 278L429 318L406 318ZM434 282L464 279L466 318L433 318ZM472 296L502 292L502 318L469 318ZM506 291L540 290L541 318L506 318ZM546 281L568 278L566 318L547 318Z','#0F3358');
    LN([70,318,70,232,150,232,150,252],'#091C32',5);LN([70,244,112,232],'#091C32',4);LN([118,318,118,262,206,262,206,282],'#091C32',5);
    P('M1042 168L1080 168L1082 320L1039 320ZM1080 242L1110 247L1115 320L1082 320ZM1116 184L1163 189L1167 320L1118 320ZM1171 184L1214 187L1219 320L1171 320ZM1222 166L1262 170L1263 320L1219 320ZM1267 252L1319 254L1321 320L1270 320ZM1322 207L1360 207L1358 320L1325 320ZM1360 254L1405 256L1407 320L1363 320ZM1411 244L1444 248L1449 320L1408 320ZM1447 224L1493 229L1495 320L1446 320ZM1500 186L1552 187L1550 320L1499 320ZM1558 184L1580 188L1584 320L1556 320ZM1583 254L1628 256L1626 320L1583 320Z','#1B3A66');
    P('M1288 318L1296 130L1302 108L1309 130L1316 318Z','#3E6392');RC(1168,212,78,108,'#2F5483');P('M1174 212C1176 172 1240 172 1242 212Z','#5A80AA');
    LN([1565,318,1565,250,1500,250,1500,270],'#091C32',5);
    P('M845 318V298h6v-8h14v8h8v-12h6V298h58V318Z','#0B2036');RC(866,274,8,14,'#0B2036');P('M930 318v-14h40v14Z','#0B2036');RC(868,262,5,14,'#C4573F');
    RC(-10,392,312,16,'#071A2E');[20,70,120,170,220,270].forEach(function(x){RC(x,406,9,54,'#071A2E')});
    P('M60 392V364l24-14 24 14V392Z','#071A2E');RC(150,372,50,20,'#071A2E');P('M232 392c0-16 14-22 28-22s28 6 28 22Z','#071A2E');
    P('M1300 420L1560 420 1540 446 1330 446Z','#071A2E');RC(1350,384,50,36,'#071A2E');RC(1410,372,26,48,'#071A2E');RC(1415,350,11,24,'#C4573F');LN([1470,420,1470,360],'#071A2E',4);LN([1470,366,1510,420],'#071A2E',3);
    c.save();c.translate(556,354);P('M0 2L74 0 60 15 14 16Z','#06182B');LN([36,-2,35,-64],'#06182B',3);P('M38-62C64-40 66-20 62-4L38-4Z','#F8EBC8');P('M33-54C14-36 10-18 13-4H33Z','#E6D19C');c.restore();
    [[215,72,-8,1],[335,54,-4,.7],[455,92,-12,.6],[1030,58,8,.5],[1135,88,6,.6],[1255,50,10,.8],[1388,76,6,1]].forEach(function(b){
      c.save();c.translate(b[0],b[1]);c.rotate(b[2]*Math.PI/180);c.scale(b[3],b[3]);
      c.fillStyle=F('#D9E8F4');c.fill(new Path2D('M0 2C-14-8-32-10-48-3L-43 24C-28 17-12 18 0 26Z'));c.fillStyle=F('#F5D88E');c.fill(new Path2D('M0 2C14-8 32-10 48-3L43 24C28 17 12 18 0 26Z'));c.restore()});
  }
  scene(g,false);scene(q,true);
  var BD=g.getImageData(0,0,W,H).data,MD=q.getImageData(0,0,W,H).data;
  function px(x,y){x=Math.max(0,Math.min(W-1,x|0));y=Math.max(0,Math.min(H-1,y|0));var k=(y*W+x)*4;return [BD[k],BD[k+1],BD[k+2]]}
  function ms(x,y){x=Math.max(0,Math.min(W-1,x|0));y=Math.max(0,Math.min(H-1,y|0));return MD[(y*W+x)*4]>128}
  function col(x,y,r){var a=px(x,y),b=px(x+r,y-r),d=px(x-r,y+r);return [(a[0]*2+b[0]+d[0])/4,(a[1]*2+b[1]+d[1])/4,(a[2]*2+b[2]+d[2])/4]}
  function cl(v){return v<0?0:v>255?255:v|0}
  function ang(x,y,s){
    if(s)return Math.PI/2+(R()-.5)*.5;
    if(y>318)return (R()-.5)*.12+Math.sin(x/70)*.06;
    var dx=x-800,dy=y-150,d=Math.sqrt(dx*dx+dy*dy);
    if(d<330){var t=Math.atan2(dy,dx)+Math.PI/2,k=Math.max(0,1-d/330);return t*k+(Math.sin(x/80+y/45)*.12)*(1-k)}
    return Math.sin(x/110+y/38)*.16+(R()-.5)*.1;
  }
  function brush(x,y,len,w,a,c0,al){
    var n=Math.max(5,(w/2.4)|0),dx=Math.cos(a),dy=Math.sin(a),nx=-dy,ny=dx,cv0=(R()-.5)*len*.28;
    var sh=(R()-.5)*30,wr=(R()-.5)*14;
    for(var i=0;i<n;i++){
      var o=(i/(n-1)-.5)*w,j=(R()-.5)*18;
      ctx.strokeStyle='rgb('+cl(c0[0]+sh+j+wr)+','+cl(c0[1]+sh+j*.8)+','+cl(c0[2]+sh+j*.6-wr)+')';
      ctx.globalAlpha=al*(.55+R()*.45);ctx.lineWidth=w/n*1.9+R()*1.2;
      var s0=len*(.5+R()*.12),e0=len*(.5+R()*.12);
      ctx.beginPath();ctx.moveTo(x+nx*o-dx*s0,y+ny*o-dy*s0);
      ctx.quadraticCurveTo(x+nx*(o+cv0),y+ny*(o+cv0),x+nx*o+dx*e0,y+ny*o+dy*e0);ctx.stroke();
    }
  }
  function lighten(c0,k){return [c0[0]+(255-c0[0])*k,c0[1]+(255-c0[1])*k,c0[2]+(255-c0[2])*k]}
  var Q=[];
  function add(n,fn){for(var i=0;i<n;i++)Q.push(fn)}
  ctx.lineCap='round';ctx.fillStyle='#0B2442';ctx.fillRect(0,0,W,H);
  add(520,function(){var x=R()*W,y=R()*H,a=ang(x,y,false);brush(x,y,150+R()*60,44,a,col(x,y,12),.9)});
  add(1500,function(){var x=R()*W,y=R()*H;if(ms(x,y))return;brush(x,y,70+R()*60,22,ang(x,y,false),col(x,y,8),.85)});
  add(11000,function(){var x=R()*W,y=R()*H;if(!ms(x,y))return;brush(x,y,22+R()*18,7+R()*4,ang(x,y,true),col(x,y,2),1)});
  add(300,function(){var t=R()*6.28,d=70+R()*170,x=800+Math.cos(t)*d,y=150+Math.sin(t)*d*.9;if(y>315)return;var c0=lighten(col(x,y,6),.2+R()*.25);brush(x,y,50+R()*40,12,Math.atan2(y-150,x-800)+Math.PI/2,c0,.55)});
  add(200,function(){var t=R()*6.28,d=R()*60,x=800+Math.cos(t)*d,y=150+Math.sin(t)*d;brush(x,y,36,12,t+Math.PI/2,[255,244,206],.85)});
  add(330,function(){var x=750+R()*105,y=324+R()*125;brush(x,y,50+R()*60,10,0,[250+R()*5,226+R()*20,150+R()*30],.6)});
  add(260,function(){var x=1040+R()*580,y=324+R()*70;brush(x,y,40+R()*50,9,(R()-.5)*.05,[236,180,96],.22)});
  add(180,function(){var x=R()*W,y=326+R()*130;brush(x,y,60+R()*80,10,(R()-.5)*.06,lighten(col(x,y,6),.28),.4)});
  add(170,function(){var x=(R()<.78?1042+R()*580:296+R()*272),y=186+R()*128;if(!ms(x,y))return;brush(x,y,5,5,0,[248,206,120],.95)});
  add(220,function(){var x=R()*W,y=R()*220;if(ms(x,y))return;brush(x,y,3,3,R()*3,[246,238,214],.9)});
  var done=0,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  function paso(){var t=reduce?Q.length:90;for(var i=0;i<t&&done<Q.length;i++,done++)Q[done]();ctx.globalAlpha=1;if(done<Q.length)requestAnimationFrame(paso);else tela()}
  function tela(){
    ctx.globalAlpha=.07;for(var i=0;i<420;i++){ctx.strokeStyle=R()<.5?'#fff':'#000';ctx.lineWidth=1;var x=R()*W,y=R()*H;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(R()-.5)*40,y+(R()-.5)*3);ctx.stroke()}
    ctx.globalAlpha=1;
  }
  paso();
})();
