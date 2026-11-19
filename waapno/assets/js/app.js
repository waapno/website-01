/* WAAPNO — sweetheart edition */
(function(){
"use strict";
/* HOW TO EDIT: every card = { id, name, icon, main?, irl? } — see original notes. */
/* LOCK: true = GAMING tab is locked in place, IRL can't be opened. Set false to unlock. */
var LOCKED=true;
var I={
 yt:'<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 9.5 15 12l-4.5 2.5z" fill="currentColor"/></svg>',
 kick:'<svg viewBox="0 0 24 24"><path d="M5 4h4.5v5L14 4h5l-6 7.5L19 20h-5l-4.5-6.3V20H5z" fill="currentColor"/></svg>',
 x:'<svg viewBox="0 0 24 24"><path d="M4 4h4.6l3.9 5.3L17 4h2.6l-5.9 6.9L20 20h-4.6l-4.2-5.7L6.2 20H3.6l6.3-7.3z" fill="currentColor"/></svg>',
 dc:'<svg viewBox="0 0 24 24" fill="none"><path d="M8.2 7.2a13 13 0 0 1 7.6 0l1.5 1.2 1.2 8.2a12 12 0 0 1-3.7 1.9l-.8-1.3a8 8 0 0 1-4 0l-.8 1.3a12 12 0 0 1-3.7-1.9l1.2-8.2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="9.6" cy="12.3" r="1.1" fill="currentColor"/><circle cx="14.4" cy="12.3" r="1.1" fill="currentColor"/></svg>',
 club:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M15.5 8.5a4.5 4.5 0 1 0 0 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
 tt:'<svg viewBox="0 0 24 24" fill="none"><path d="M13 4v10.2a2.6 2.6 0 1 1-2.4-2.6M13 4c.4 2.2 2 3.7 4.2 4v2.4c-1.6 0-3-.5-4.2-1.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
 ig:'<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.8"/><circle cx="16.6" cy="7.4" r="1.1" fill="currentColor"/></svg>',
 mc:'<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4zM7 7v3h3V7zm7 0v3h3V7zm-4 4v2H8v4h2v-2h4v2h2v-4h-2v-2z" fill="currentColor" fill-rule="evenodd"/></svg>'
};
var CARDS=[
 {id:"kick",name:"Kick",icon:I.kick,main:{url:"https://kick.com/waapno",handle:"waapno",live:true,feat:true,en:{sub:"Live streams in English",tags:["Live","Gaming","Chat"]},cz:{sub:"Live streamy v angličtině",tags:["Live","Gaming","Chat"]}},irl:{url:"https://kick.com/waapno",handle:"waapno",live:true,feat:true,en:{sub:"Live streams in English",tags:["Live","Gaming","Chat"]},cz:{sub:"Live streamy v angličtině",tags:["Live","Gaming","Chat"]}}},
 {id:"youtube",name:"YouTube",icon:I.yt,main:{url:"https://www.youtube.com/@waapno",handle:"@waapno",feat:true,en:{sub:"VODs & highlights",tags:["VOD","Highlights","Weekly"]},cz:{sub:"VODs & highlighty",tags:["VODs","Highlighty","Týdně"]}},irl:{url:"https://www.youtube.com/@waapno",handle:"@waapno",feat:true,en:{sub:"VODs & highlights",tags:["VOD","Highlights","Weekly"]},cz:{sub:"VODs & highlighty",tags:["VODs","Highlighty","Týdně"]}}},
 {id:"x",name:"X / Twitter",icon:I.x,main:{url:"https://x.com/waapno",handle:"@waapno",feat:true,en:{sub:"Go-live alerts & clips",tags:["Alerts","Clips"]},cz:{sub:"Upozornění na stream & klipy",tags:["Alerty","Klipy"]}},irl:{url:"https://x.com/waapno",handle:"@waapno",feat:true,en:{sub:"Go-live alerts & clips",tags:["Alerts","Clips"]},cz:{sub:"Upozornění na stream & klipy",tags:["Alerty","Klipy"]}}},
 {id:"discord",name:"Discord",icon:I.dc,main:{url:"https://discord.gg/w28WK8peZW",handle:"discord.gg",feat:true,en:{sub:"Community server — chat, voice, events",tags:["24/7","Voice","Events"]},cz:{sub:"Komunitní server — chat, voice, eventy",tags:["24/7","Voice","Eventy"]}},irl:{url:"https://discord.gg/w28WK8peZW",handle:"discord.gg",feat:true,en:{sub:"Community server — chat, voice, events",tags:["24/7","Voice","Events"]},cz:{sub:"Komunitní server — chat, voice, eventy",tags:["24/7","Voice","Eventy"]}}},
 {id:"instagram",name:"Instagram",icon:I.ig,main:{url:"https://www.instagram.com/brikulosuck/",handle:"@brikulosuck",en:{sub:"Stories, reels & behind the scenes",tags:["Stories","Reels"]},cz:{sub:"Stories, reels & zákulisí",tags:["Stories","Reels"]}},irl:{url:"https://www.instagram.com/brikulosuck/",handle:"@brikulosuck",en:{sub:"Stories, reels & behind the scenes",tags:["Stories","Reels"]},cz:{sub:"Stories, reels & zákulisí",tags:["Stories","Reels"]}}},
 {id:"tiktok",name:"TikTok",icon:I.tt,main:{url:"https://www.tiktok.com/@waapno",handle:"@waapno",en:{sub:"Short clips & best moments",tags:["Shorts","Memes"]},cz:{sub:"Krátké klipy & nejlepší momenty",tags:["Shorts","Memy"]}},irl:{url:"https://www.tiktok.com/@waapno",handle:"@waapno",en:{sub:"Short clips & best moments",tags:["Shorts","Memes"]},cz:{sub:"Krátké klipy & nejlepší momenty",tags:["Shorts","Memy"]}}},
 {id:"mc",name:"MC Network",icon:I.mc,main:{url:"https://siphcf.eu",handle:"siphcf.eu",en:{sub:"SIP'S NETWORK Minecraft server",tags:["Minecraft","Server"]},cz:{sub:"Minecraft server SIP'S NETWORK",tags:["Minecraft","Server"]}},irl:{url:"https://siphcf.eu",handle:"siphcf.eu",en:{sub:"SIP'S NETWORK Minecraft server",tags:["Minecraft","Server"]},cz:{sub:"Minecraft server SIP'S NETWORK",tags:["Minecraft","Server"]}}}
];

var T={
 en:{hello:"hey, sweetheart",tag:"English streams · strong hands, soft heart",badge:"STREAMS IN ENGLISH",soft:"HOPELESS ROMANTIC",
     gSub:"MAIN CHANNELS",iSub:"REAL LIFE",gSec:"Where you'll find me",iSec:"My real-life world",portalTo:"IRL",portalBack:"MAIN",
     lang:"CZ",ttl:"Waapno — Links",visits:"visits",another:"another one ♡",sendLove:"Send love",sign:"with love, Waapno",
     ring:"strong hands ♥ soft heart ♥ strong hands ♥ soft heart ♥",
     lockTip:"locked — gaming only",lockMsg:"this one's locked ♡ gaming only",
     thanks:["Got it. You just made my day ♡","Aww, right back at you ♥","Careful, I'm blushing over here","That one hit the heart ♡"],
     q:["Crazy lifestyle.","Tough on the outside, poetry on the inside.","I'll carry the heavy stuff. You just carry the vibes.","Romance isn't dead. It just streams in English.","Hold the door, hold the hand, hold the chat together."]},
 cz:{hello:"ahoj, zlato",tag:"streamy v angličtině · silné ruce, měkké srdce",badge:"STREAMY V ANGLIČTINĚ",soft:"BEZNADĚJNÝ ROMANTIK",
     gSub:"HLAVNÍ KANÁLY",iSub:"REÁLNÝ ŽIVOT",gSec:"Kde mě najdeš",iSec:"Můj reálný svět",portalTo:"IRL",portalBack:"MAIN",
     lang:"EN",ttl:"Waapno — Odkazy",visits:"návštěv",another:"další ♡",sendLove:"Pošli lásku",sign:"s láskou, Waapno",
     ring:"silné ruce ♥ měkké srdce ♥ silné ruce ♥ měkké srdce ♥",
     lockTip:"zamčeno — jen gaming",lockMsg:"tenhle je zamčenej ♡ jen gaming",
     thanks:["Mám to. Udělal jsi mi den ♡","Aww, posílám zpátky ♥","Pozor, červenám se","Tohle trefilo srdce ♡"],
     q:["Pořádnej chlap řekne, co cítí — a myslí to vážně.","Zvenku drsňák, uvnitř poezie.","Těžký věci unesu já. Ty nes jen dobrou náladu.","Romantika neumřela. Jen streamuje anglicky.","Podržet dveře, podržet ruku, podržet chat pohromadě."]}
};
var S={lang:"en",mode:"gaming",flipped:{},qi:0};
try{var qs=new URLSearchParams(location.search);S.lang=qs.get("lang")==="cz"?"cz":(localStorage.getItem("sip-lang")||"en");
 S.mode=(qs.get("mode")||location.hash.slice(1))==="irl"?"irl":"gaming";
 document.documentElement.dataset.theme=localStorage.getItem("sip-theme")||"dark";}catch(e){}
if(LOCKED){S.mode="gaming";if(location.hash==="#irl")history.replaceState(null,"","#gaming");}

var $=function(s){return document.querySelector(s)},list=$("#list");
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return"&#"+c.charCodeAt(0)+";"})}
var ARROW='<svg class="a" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    HEART='<svg class="h" width="17" height="17" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>';
function quote(anim){var p=$("#quote"),t=T[S.lang];
 if(!anim){p.textContent="“"+t.q[S.qi]+"”";return}
 p.classList.add("out");setTimeout(function(){S.qi=(S.qi+1)%t.q.length;p.textContent="“"+t.q[S.qi]+"”";p.classList.remove("out")},300);}
function render(){
 var t=T[S.lang];document.documentElement.lang=S.lang==="cz"?"cs":"en";document.title=t.ttl;
 document.querySelectorAll("[data-t]").forEach(function(el){el.textContent=t[el.dataset.t]});
 $("#lang").textContent=t.lang;
 $("#theme").textContent=document.documentElement.dataset.theme==="dark"?"☀︎":"☾";
 $("#mode").dataset.m=S.mode;
 $("#mode").classList.toggle("locked",LOCKED);
 document.querySelectorAll("#mode button").forEach(function(b){
  var no=LOCKED&&b.dataset.mode!==S.mode;
  b.setAttribute("aria-selected",b.dataset.mode===S.mode);
  b.setAttribute("aria-disabled",no?"true":"false");
  b.classList.toggle("nope",!!no);
  b.title=no?t.lockTip:"";
 });
 quote(false);
 var html='<div class="sec">'+(S.mode==="gaming"?t.gSec:t.iSec)+'</div>',i=0;
 CARDS.forEach(function(c){
  var base=S.mode==="gaming"?c.main:c.irl; if(!base)return;
  var both=c.main&&c.irl&&c.main.url!==c.irl.url;
  var showIrl=S.mode==="irl"?!S.flipped[c.id]:!!S.flipped[c.id];
  var d=both?(showIrl?c.irl:c.main):base, x=d[S.lang];
  var nm=c.name+(both&&showIrl&&S.mode==="gaming"?" IRL":"")+(both&&!showIrl&&S.mode==="irl"?" MAIN":"");
  html+='<a class="card'+(d.feat?" feat":"")+'" style="--i:'+(i++)+'" data-id="'+c.id+'" href="'+esc(d.url)+'" target="_blank" rel="noopener me">'
   +(both?'<button class="portal" data-flip="'+c.id+'" aria-label="Switch channel">⇄ '+(showIrl?t.portalBack:t.portalTo)+'</button>':'')
   +'<div class="face"><div class="ico">'+c.icon+'</div><div><div class="nm">'+esc(nm)+(d.live?' <span class="live">LIVE</span>':'')+' <span class="hd">'+esc(d.handle)+'</span></div>'
   +'<div class="sub">'+esc(x.sub)+'</div><div class="meta">'+x.tags.map(function(g){return"<span>"+esc(g)+"</span>"}).join("")+'</div></div>'
   +'<div class="go">'+ARROW+HEART+'</div></div></a>';
 });
 list.innerHTML=html;
}
/* heart burst */
function burst(x,y,n){if(reduce)return;var ch=["♥","♡","❤","✦"];
 for(var k=0;k<(n||12);k++){var e=document.createElement("span");e.className="burst";e.textContent=ch[k%ch.length];
  var a=Math.random()*Math.PI*2,r=60+Math.random()*90;
  e.style.left=x+"px";e.style.top=y+"px";e.style.fontSize=(12+Math.random()*16)+"px";
  e.style.setProperty("--dx",Math.cos(a)*r+"px");e.style.setProperty("--dy",(Math.sin(a)*r-40)+"px");e.style.setProperty("--rot",(Math.random()*120-60)+"deg");
  document.body.appendChild(e);setTimeout(e.remove.bind(e),1200);}}
function toast(msg){var t=$("#toast");t.textContent=msg;t.classList.add("on");clearTimeout(toast._);toast._=setTimeout(function(){t.classList.remove("on")},2200);}

$("#mode").addEventListener("click",function(e){var b=e.target.closest("button");if(!b||b.dataset.mode===S.mode)return;
 if(LOCKED&&b.dataset.mode!==S.mode){b.classList.add("shake");setTimeout(function(){b.classList.remove("shake")},500);
  var r0=b.getBoundingClientRect();burst(r0.left+r0.width/2,r0.top+r0.height/2,4);toast(T[S.lang].lockMsg);return;}
 S.mode=b.dataset.mode;S.flipped={};history.replaceState(null,"","#"+S.mode);gust=14;var r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,8);render();});
$("#lang").onclick=function(){S.lang=S.lang==="en"?"cz":"en";try{localStorage.setItem("sip-lang",S.lang)}catch(e){}render();};
$("#theme").onclick=function(){var r=document.documentElement;r.dataset.theme=r.dataset.theme==="dark"?"light":"dark";try{localStorage.setItem("sip-theme",r.dataset.theme)}catch(e){}render();};
$("#nextq").onclick=function(){quote(true)};
$("#orb").addEventListener("click",function(e){burst(e.clientX,e.clientY,16);gust=6;});
list.addEventListener("click",function(e){var p=e.target.closest("[data-flip]");
 if(!p){var c0=e.target.closest(".card");if(c0)burst(e.clientX,e.clientY,8);return;}
 e.preventDefault();e.stopPropagation();
 var id=p.dataset.flip;S.flipped[id]=!S.flipped[id];render();var c=list.querySelector('[data-id="'+id+'"]');c.style.animation="none";c.classList.add("flip");gust=6;});
list.addEventListener("pointermove",function(e){var c=e.target.closest(".card");if(!c)return;var f=c.querySelector(".face"),r=f.getBoundingClientRect(),
 px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;f.style.setProperty("--mx",px*100+"%");f.style.setProperty("--my",py*100+"%");
 f.style.transform="rotateY("+(px-.5)*8+"deg) rotateX("+(.5-py)*8+"deg)";});
list.addEventListener("pointerout",function(e){var c=e.target.closest(".card");if(c&&!c.contains(e.relatedTarget))c.querySelector(".face").style.transform="";});

/* send love (local counter + toast) */
var loves=0;try{loves=+localStorage.getItem("waapno-love")||0}catch(e){}
$("#lovec").textContent=loves;
$("#lovebtn").addEventListener("click",function(e){loves++;$("#lovec").textContent=loves;try{localStorage.setItem("waapno-love",loves)}catch(_){}
 burst(e.clientX,e.clientY,22);gust=10;var th=T[S.lang].thanks;toast(th[Math.floor(Math.random()*th.length)]);});

$("#y").textContent=new Date().getFullYear();
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
render();
fetch("https://abacus.jasoncameron.dev/hit/siphcf-eu/waapno").then(function(r){return r.json()}).then(function(j){if(j&&j.value!=null){$("#vc").textContent=Number(j.value).toLocaleString();$("#visits").hidden=false;}}).catch(function(){});

/* cursor glow */
var glow=$("#glow");addEventListener("pointermove",function(e){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";});

/* falling petals & hearts — gust on interactions, sway with pointer */
var cv=$("#petals"),cx=cv.getContext("2d"),W,H,DPR=Math.min(devicePixelRatio||1,2),P=[],gust=1,wind=0;
function size(){W=cv.width=innerWidth*DPR;H=cv.height=innerHeight*DPR;}
size();addEventListener("resize",size);
function mk(top){return{x:Math.random()*W,y:top?-20*DPR:Math.random()*H,s:(6+Math.random()*10)*DPR,vy:(.3+Math.random()*.7)*DPR,
 r:Math.random()*6.28,vr:(Math.random()-.5)*.03,sw:Math.random()*6.28,heart:Math.random()<.28,a:.25+Math.random()*.55}}
for(var k=0;k<(innerWidth<600?38:70);k++)P.push(mk(false));
addEventListener("pointermove",function(e){wind=(e.clientX/innerWidth-.5)*1.4;});
function heart(s){cx.beginPath();cx.moveTo(0,s*.3);cx.bezierCurveTo(-s,-s*.4,-s*.5,-s,0,-s*.45);cx.bezierCurveTo(s*.5,-s,s,-s*.4,0,s*.3);cx.fill();}
function petal(s){cx.beginPath();cx.ellipse(0,0,s*.45,s*.8,0,0,6.28);cx.fill();}
(function loop(){
 var col=getComputedStyle(document.documentElement).getPropertyValue("--petal-rgb").trim()||"255,150,180";
 cx.clearRect(0,0,W,H);gust+=(1-gust)*.035;
 if(!reduce)for(var i=0;i<P.length;i++){var p=P[i];
  p.sw+=.015;p.y+=p.vy*gust;p.x+=(Math.sin(p.sw)*.6+wind)*DPR*gust*.6;p.r+=p.vr*gust;
  if(p.y>H+30*DPR||p.x<-40*DPR||p.x>W+40*DPR){P[i]=mk(true);continue;}
  cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle="rgba("+col+","+p.a+")";
  p.heart?heart(p.s):petal(p.s);cx.restore();}
 requestAnimationFrame(loop);
})();
})();
