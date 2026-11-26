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
  /*agregamos*/(function(){var EP='https://formsubmit.co/ajax/20e2074957c2dd149311251a0a252b1a';
    var s=document.createElement('style');s.textContent='.agr{display:inline-flex;flex-direction:column;gap:2px;margin:26px 0 8px;padding:12px 18px;border:1.5px dashed #7CC4F4;border-radius:12px;background:transparent;text-align:left;cursor:pointer;color:#eef2f7;font-family:"DM Mono",ui-monospace,monospace;transition:background .15s,transform .15s}.agr b{font-size:14px;letter-spacing:.08em;color:#8fd0fa}.agr span{font-size:12px;color:#9db5d1}.agr:hover{background:rgba(124,196,244,.14);transform:translateY(-2px)}.agr.pie{color:var(--ink);margin:14px 0 0}.agr.pie b{color:var(--accent)}.agr.pie span{color:var(--muted)}#estv{position:fixed;inset:0;z-index:90;background:rgba(5,12,24,.72);display:none;align-items:center;justify-content:center;padding:16px}#estv.on{display:flex}#estf{width:min(460px,100%);max-height:92vh;overflow:auto;background:#0f2542;color:#eef2f7;border:1.5px solid #7CC4F4;border-radius:14px;padding:22px;font-family:"Hanken Grotesk",system-ui,sans-serif}#estf h3{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:30px;margin:0 0 4px}#estf p{margin:0 0 14px;color:#9db5d1;font-size:14px}#estf label{display:block;font-family:"DM Mono",monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#9db5d1;margin:10px 0 4px}#estf input,#estf textarea{width:100%;box-sizing:border-box;background:#0a1830;border:1px solid #2c4a73;border-radius:8px;color:#eef2f7;padding:10px;font:inherit;font-size:15px}#estf textarea{min-height:80px;resize:vertical}#estf .bt{display:flex;gap:10px;margin-top:16px}#estf button{font:inherit;border-radius:999px;padding:10px 18px;cursor:pointer;border:1.5px solid #7CC4F4}#estf .ok{background:#7CC4F4;color:#0a1830;font-weight:600}#estf .no{background:transparent;color:#eef2f7}#estm{margin-top:12px;font-size:14px;color:#8fd0fa}';document.head.appendChild(s);
    var v=document.createElement('div');v.id='estv';v.innerHTML='<form id="estf" autocomplete="off"><h3>¿Agregamos tu estudio?</h3><p>Proponé un artículo, libro o tesis sobre literatura uruguaya o argentina. Lo leemos y, si encaja, lo sumamos.</p><label for="ea">Autor/a o tema</label><input id="ea" name="autor" required maxlength="120"><label for="et">Título del estudio</label><input id="et" name="titulo" required maxlength="200"><label for="el">Enlace o referencia</label><input id="el" name="enlace" maxlength="300" placeholder="URL, DOI o cita"><label for="en">Tu nombre (opcional)</label><input id="en" name="nombre" maxlength="100"><label for="ec">Tu correo para responderte (opcional)</label><input id="ec" name="email" type="email" maxlength="120"><label for="ex">Nota (opcional)</label><textarea id="ex" name="nota" maxlength="800"></textarea><input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off"><div class="bt"><button class="ok" type="submit">Enviar</button><button class="no" type="button" id="estx">Cancelar</button></div><div id="estm" role="status"></div></form>';document.body.appendChild(v);
    var f=v.querySelector('#estf'),m=v.querySelector('#estm');
    function abrir(n){f.reset();m.textContent='';if(n)f.autor.value=n;v.classList.add('on');setTimeout(function(){(n?f.titulo:f.autor).focus()},50)}
    function cerrar(){v.classList.remove('on')}
    v.addEventListener('click',function(e){if(e.target===v)cerrar()});v.querySelector('#estx').onclick=cerrar;document.addEventListener('keydown',function(e){if(e.key==='Escape')cerrar()});
    f.addEventListener('submit',function(e){e.preventDefault();var d={_subject:'Orilla de Letras: propuesta de estudio',_captcha:'false',_template:'table'};['autor','titulo','enlace','nombre','email','nota'].forEach(function(k){if(f[k]&&f[k].value)d[k]=f[k].value});if(f._honey.value)return;if(d.email)d._replyto=d.email;m.textContent='Enviando…';fetch(EP,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)}).then(function(r){return r.json()}).then(function(r){if(r.success==='true'||r.success===true){m.textContent='¡Gracias! Recibimos tu propuesta.';setTimeout(cerrar,2200)}else m.textContent='No se pudo enviar. Probá de nuevo en un rato.'}).catch(function(){m.textContent='No se pudo enviar. Probá de nuevo en un rato.'})});
    function btn(cls){var b=document.createElement('button');b.type='button';b.className='agr'+(cls?' '+cls:'');return b}
    function poner(){var p=document.getElementById('panel');if(!p)return;var old=p.querySelector('.agr');if(old)old.remove();var n=((document.getElementById('p-name')||{}).textContent||'').trim();var b=btn('');b.innerHTML='<b>¿Agregamos tu estudio?</b><span>Proponé un artículo o libro sobre '+(n||'este autor')+'</span>';b.onclick=function(){abrir(n)};var h=document.getElementById('p-cruces');(h&&h.parentNode?h.parentNode:p).appendChild(b)}
    var o=window.openA;if(o)window.openA=function(){var r=o.apply(this,arguments);setTimeout(poner,30);return r};
    var fv=document.querySelector('.visitas');var ft=fv&&fv.parentNode;if(ft){var b2=btn('pie');b2.innerHTML='<b>¿Agregamos tu estudio?</b><span>Sumá tu artículo o libro a la página</span>';b2.onclick=function(){abrir('')};ft.insertBefore(b2,fv)}
  })();
  /*autoabrir*/var st=document.createElement('style');st.textContent='#mapa{height:230px!important;background:none!important}#mapa.on{animation:mIn 1.6s ease both!important;opacity:.55}#mlin line{stroke-width:.9!important;opacity:.4!important;animation-duration:2.4s!important}.nd{font-size:11.5px!important;padding:4px 8px!important;box-shadow:none!important;background:color-mix(in srgb,var(--card) 80%,transparent)!important;opacity:.8;animation-duration:1.4s!important}.nd:hover{opacity:1}.nd.ctr{font-size:13px!important;padding:6px 12px!important;border-width:1px!important}';document.head.appendChild(st);
  /*sobrepintura*/var st2=document.createElement('style');st2.textContent='#mapa{position:absolute!important;top:var(--mt,60px)!important;height:var(--mh,230px)!important;opacity:1}.visitas{position:fixed!important;left:12px;bottom:12px;z-index:55;margin:0!important;padding:3px;border-radius:8px;background:color-mix(in srgb,var(--bg) 85%,transparent);box-shadow:0 4px 14px -6px rgba(0,0,0,.5)}';document.head.appendChild(st2);
  function ajusta(){var r=document.getElementById('rio');if(!r)return;var b=r.getBoundingClientRect();document.documentElement.style.setProperty('--mt',(b.top+window.scrollY)+'px');document.documentElement.style.setProperty('--mh',b.height+'px');if(mp.classList.contains('on'))layout()}
  ajusta();window.addEventListener('resize',ajusta);window.addEventListener('load',ajusta);setTimeout(ajusta,1500);
  setTimeout(function(){try{var k=Object.keys(VOCES);if(k.length&&!cur)mostrar(k[Math.floor(Math.random()*k.length)])}catch(e){}},600);
})();
