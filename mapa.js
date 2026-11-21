/* Buscador flotante y mapa animado de cada autor (arriba de la página, sin tapar lo de abajo) */
(function(){
  var bar=document.querySelector('.bar');
  var box=document.createElement('div');box.id='buscador';
  box.innerHTML='<input id="bq" type="search" autocomplete="off" placeholder="Buscar autor u obra" aria-label="Buscar autor u obra"><div id="bres" role="listbox"></div>';
  document.body.appendChild(box);
  var mp=document.createElement('div');mp.id='mapa';mp.setAttribute('aria-hidden','true');
  mp.innerHTML='<svg id="mlin" aria-hidden="true"></svg><div id="mnod"></div><button id="mcer" type="button" aria-label="Cerrar mapa">×</button>';
  document.body.appendChild(mp);
  var svg=document.getElementById('mlin'),nod=document.getElementById('mnod'),NS='http://www.w3.org/2000/svg';
  var items=[],raf=0,cur=null;

  function top(){return (bar?bar.getBoundingClientRect().bottom:0)}
  function place(){var t=Math.max(top(),0);box.style.top=(t+10)+'px';mp.style.top=t+'px'}
  window.addEventListener('scroll',place,{passive:true});window.addEventListener('resize',function(){place();if(cur)layout()});place();

  var inp=document.getElementById('bq'),res=document.getElementById('bres');
  function find(q){
    q=norm(q);var out=[];if(!q)return out;
    A.forEach(function(a){if(norm(a.n).indexOf(q)>-1||norm(a.c).indexOf(q)>-1)out.push({id:a.id,t:a.n,s:'autor · '+paisN(a.p)})});
    A.forEach(function(a){a.o.forEach(function(o){if(norm(o[0]).indexOf(q)>-1)out.push({id:a.id,t:o[0],s:'obra · '+a.c+' '+o[1]})})});
    A.forEach(function(a){if(!out.some(function(r){return r.id===a.id})&&norm(a.r+' '+a.s).indexOf(q)>-1)out.push({id:a.id,t:a.n,s:'tema · '+paisN(a.p)})});
    return out.slice(0,8);
  }
  function lista(){
    var r=find(inp.value);
    res.innerHTML=r.map(function(x){return '<button type="button" role="option" data-id="'+x.id+'"><b>'+x.t+'</b><small>'+x.s+'</small></button>'}).join('');
    res.classList.toggle('on',r.length>0);
    res.querySelectorAll('button').forEach(function(b){b.onclick=function(){mostrar(b.dataset.id);res.classList.remove('on');inp.value=''}});
  }
  inp.addEventListener('input',lista);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){var b=res.querySelector('button');if(b)b.click()}if(e.key==='Escape'){res.classList.remove('on')}});
  document.addEventListener('click',function(e){if(!box.contains(e.target))res.classList.remove('on')});

  function mk(tag,cls,html,href,title){
    var e=document.createElement(tag);e.className='nd '+cls;e.innerHTML=html;
    if(href){e.href=href;e.target='_blank';e.rel='noopener'}else e.type='button';
    if(title)e.title=title;return e;
  }
  var SLOT={
    w:[[.2,.2],[.16,.56],[.24,.86],[.37,.1]],
    c:[[.66,.14],[.84,.36],[.68,.86]],
    x:[[.86,.74],[.5,.9],[.5,.1]]
  };
  function mostrar(id){
    var a=A.find(function(z){return z.id===id});if(!a)return;cur=a;
    nod.innerHTML='';svg.innerHTML='';items=[];
    var v=(typeof VOCES!=='undefined'&&VOCES[id]&&VOCES[id].v)||[];
    var ctr=mk('button','ctr '+(a.p==='AR'?'ar':'uy'),'<strong>'+a.n+'</strong><small>'+a.nac+'–'+(a.mue||'')+' · abrir ficha</small>');
    ctr.onclick=function(){openA(id)};
    items.push({el:ctr,x:.5,y:.5,c:1});
    a.o.slice(0,4).forEach(function(o,i){
      var q=encodeURIComponent(o[0]+' '+a.n);
      items.push({el:mk('a','w','<i>Obra</i>'+o[0]+' <em>'+o[1]+'</em>','https://www.google.com/search?tbm=bks&q='+q,'Ver ediciones'),x:SLOT.w[i][0],y:SLOT.w[i][1]});
    });
    v.filter(function(p){return p[2]}).slice(0,3).forEach(function(p,i){
      items.push({el:mk('a','c','<i>Crítica</i>'+p[0],p[2],p[3]),x:SLOT.c[i][0],y:SLOT.c[i][1]});
    });
    var rel=[];CRUCES.forEach(function(c){if(c.ids.indexOf(id)>-1)c.ids.forEach(function(z){if(z!==id&&rel.indexOf(z)<0)rel.push(z)})});
    rel.slice(0,3).forEach(function(z,i){
      var b=A.find(function(q){return q.id===z});
      var e=mk('button','x','<i>Cruce</i>'+b.c);e.onclick=function(){mostrar(z)};
      items.push({el:e,x:SLOT.x[i][0],y:SLOT.x[i][1]});
    });
    items.forEach(function(it,k){
      it.ph=Math.random()*6.28;it.sp=.5+Math.random()*.6;
      if(!it.c){var l=document.createElementNS(NS,'line');l.setAttribute('pathLength','1');l.style.animationDelay=(k*.12)+'s';svg.appendChild(l);it.ln=l;it.el.style.animationDelay=(k*.12+.5)+'s'}
      else{it.el.style.animationDelay='0s'}
      nod.appendChild(it.el);
    });
    mp.className='on '+(a.p==='AR'?'ar':'uy');mp.setAttribute('aria-hidden','false');
    layout();cancelAnimationFrame(raf);loop(0);
  }
  var W=0,H=0,GW=0,OY=0;
  function layout(){
    var r=mp.getBoundingClientRect();W=r.width;H=r.height;
    var mobile=W<720;OY=0;H=H-OY;GW=mobile?W:W-290;
  }
  function loop(t){
    t/=1000;
    items.forEach(function(it){
      var x=it.x*GW+(it.c?0:Math.sin(t*it.sp+it.ph)*7),y=OY+it.y*H+(it.c?0:Math.cos(t*it.sp*1.2+it.ph)*5);
      it.el.style.left=x+'px';it.el.style.top=y+'px';
      if(it.ln){it.ln.setAttribute('x1',GW*.5);it.ln.setAttribute('y1',OY+H*.5);it.ln.setAttribute('x2',x);it.ln.setAttribute('y2',y)}
    });
    if(mp.classList.contains('on'))raf=requestAnimationFrame(loop);
  }
  document.getElementById('mcer').onclick=function(){mp.className='';mp.setAttribute('aria-hidden','true');cancelAnimationFrame(raf);cur=null};
  window.mostrarMapa=mostrar;
  /*autoabrir*/var st=document.createElement('style');st.textContent='#mapa{height:230px!important;background:none!important}#mapa.on{animation:mIn 1.6s ease both!important;opacity:.55}#mlin line{stroke-width:.9!important;opacity:.4!important;animation-duration:2.4s!important}.nd{font-size:11.5px!important;padding:4px 8px!important;box-shadow:none!important;background:color-mix(in srgb,var(--card) 80%,transparent)!important;opacity:.8;animation-duration:1.4s!important}.nd:hover{opacity:1}.nd.ctr{font-size:13px!important;padding:6px 12px!important;border-width:1px!important}';document.head.appendChild(st);
  /*sobrepintura*/var fl=document.createElement('link');fl.rel='stylesheet';fl.href='https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap';document.head.appendChild(fl);var st2=document.createElement('style');st2.textContent='#mapa{position:absolute!important;top:var(--mt,60px)!important;height:var(--mh,230px)!important;opacity:1}.visitas{position:fixed!important;left:12px;bottom:12px;z-index:55;margin:0!important;padding:3px;border-radius:8px;background:color-mix(in srgb,var(--bg) 85%,transparent);box-shadow:0 4px 14px -6px rgba(0,0,0,.5)}';document.head.appendChild(st2);
  function ajusta(){var r=document.getElementById('rio');if(!r)return;var b=r.getBoundingClientRect();document.documentElement.style.setProperty('--mt',(b.top+window.scrollY)+'px');document.documentElement.style.setProperty('--mh',b.height+'px');if(mp.classList.contains('on'))layout()}
  ajusta();window.addEventListener('resize',ajusta);window.addEventListener('load',ajusta);setTimeout(ajusta,1500);
  setTimeout(function(){try{var k=Object.keys(VOCES);if(k.length&&!cur)mostrar(k[Math.floor(Math.random()*k.length)])}catch(e){}},600);
})();
