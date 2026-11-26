/* conexion.js (26/11/2026): une las partes de la página. La navegación del encabezado sigue la lectura y marca dónde está el visitante.
   Los estilos viajan con el script para no tocar las hojas anteriores. */
(function(){
  'use strict';
  var nav=document.querySelector('.bar-nav');if(!nav)return;
  var css=[
   '.bar-nav{display:none;align-items:center;gap:0;margin-left:8px;margin-right:auto}',
   '.bar-nav a{position:relative;display:inline-flex;align-items:center;min-height:44px;padding:0 10px;font:500 13px/1 var(--body,sans-serif);color:inherit;text-decoration:none;opacity:.78;transition:opacity 150ms var(--ease,ease)}',
   '.bar-nav a::after{content:"";position:absolute;left:10px;right:10px;bottom:9px;height:2px;border-radius:2px;background:var(--accent,#7CC4F4);transform:scaleX(0);transform-origin:left;transition:transform 220ms var(--ease,ease)}',
   '.bar-nav a[aria-current="true"]{opacity:1}',
   '.bar-nav a[aria-current="true"]::after{transform:scaleX(1)}',
   '@media (hover:hover) and (pointer:fine){.bar-nav a:hover{opacity:1}}',
   '.bar-nav a:focus-visible{outline:3px solid #ffd84a;outline-offset:2px;border-radius:6px}',
   '@media (min-width:1200px){.bar-nav{display:flex}}',
   '@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}'
  ].join('\n');
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var enlaces=[].slice.call(nav.querySelectorAll('a[href^="#"]'));
  var pares=enlaces.map(function(a){return{a:a,s:document.querySelector(a.getAttribute('href'))}}).filter(function(p){return p.s});
  if(!pares.length||!window.IntersectionObserver)return;
  var visible={};
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){visible[e.target.id]=e.isIntersecting?e.intersectionRatio:0});
    var mejor=null,max=0;
    pares.forEach(function(p){var v=visible[p.s.id]||0;if(v>max){max=v;mejor=p}});
    pares.forEach(function(p){if(p===mejor)p.a.setAttribute('aria-current','true');else p.a.removeAttribute('aria-current')});
  },{threshold:[0,.15,.3,.5,.75],rootMargin:'-72px 0px -30% 0px'});
  pares.forEach(function(p){io.observe(p.s)});
})();
