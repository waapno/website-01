(function(){
  var root=document.documentElement;root.classList.add('rpg-js');
  var tabs=[].slice.call(document.querySelectorAll('.rpg-tab')),panels=[].slice.call(document.querySelectorAll('.rpg-class'));
  function show(id){tabs.forEach(function(t){t.setAttribute('aria-selected',t.dataset.cls===id)});panels.forEach(function(p){p.classList.toggle('is-on',p.dataset.cls===id);if(p.dataset.cls===id)p.classList.add('gl-revealed')});}
  tabs.forEach(function(t){t.addEventListener('click',function(){show(t.dataset.cls)})});
  var h=location.hash.match(/^#class-(.+)/);show(h?h[1]:(tabs[0]&&tabs[0].dataset.cls));
  var calc=document.querySelector('.rpg-calc');
  if(calc){var upd=function(){var v={};calc.querySelectorAll('input').forEach(function(i){v[i.dataset.stat]=+i.value;i.nextElementSibling.textContent=i.value});
    calc.querySelector('[data-out=cd]').textContent='+'+(v.str/3).toFixed(1);calc.querySelector('[data-out=cc]').textContent=(v.dex/3).toFixed(1)+' %';};
    calc.addEventListener('input',upd);upd();}
  var busy=false;
  document.querySelectorAll('.rpg-combo').forEach(function(b){b.addEventListener('click',function(){
    if(busy)return;busy=true;var seq=b.dataset.combo.split(''),i=0;
    (function step(){document.querySelectorAll('.rpg-bigkey').forEach(function(k){k.classList.remove('hit')});
      if(i>=seq.length){busy=false;return}var k=document.querySelector('.rpg-bigkey[data-k="'+seq[i]+'"]');if(k)k.classList.add('hit');i++;setTimeout(step,380);})();
  })});
  var sim=document.querySelector('.rpg-sim');
  if(sim){var D=JSON.parse(sim.dataset.sim),T=JSON.parse(sim.dataset.t),sel=sim.querySelector('select'),rng=sim.querySelector('input'),out=rng.nextElementSibling;
    var render=function(){var c=D.filter(function(x){return x.id===sel.value})[0],lv=+rng.value;out.textContent=lv;sim.style.setProperty('--c',c.color);
      sim.querySelector('.rpg-bar i').style.width=lv+'%';sim.querySelector('.rpg-bar span').textContent=c.name+' – Lv '+lv+' / 100';
      sim.querySelector('.rpg-sim-req').textContent=T.sim_req+': '+(c.req===0?T.starter:T.unlockfmt.replace('{r}',c.req).replace('{c}',c.cost));
      var ul=sim.querySelector('.rpg-sim-list');ul.innerHTML='';var next=null;
      c.ab.forEach(function(a){var li=document.createElement('li'),on=lv>=a[1];li.className=on?'on':'';
        li.textContent=(a[2]?'⚡ ':'◆ ')+a[0]+' – '+(on?T.sim_un:T.sim_lock+' '+a[1]);ul.appendChild(li);if(!on&&(!next||a[1]<next[1]))next=a;});
      sim.querySelector('.rpg-sim-next').textContent=next?T.sim_next+': '+next[0]+' (Lv '+next[1]+')':T.sim_none;};
    sel.addEventListener('change',render);rng.addEventListener('input',render);render();}
})();
