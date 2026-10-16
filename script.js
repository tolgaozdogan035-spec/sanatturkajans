const $=s=>document.querySelector(s);
$('#y').textContent=new Date().getFullYear();

const burger=$('#burger'),menu=$('#menu');
const closeMenu=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)};
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=closeMenu);
document.querySelectorAll('a[href="#top"]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();closeMenu();
  window.scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'',location.pathname);
}));

// scroll reveal
document.querySelectorAll('.work figure,.svc li,.steps li,.fam a,.vals>div,.form,.about-txt').forEach(e=>e.classList.add('rv'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

// counters
document.querySelectorAll('[data-n]').forEach(el=>{
  const t=+el.dataset.n,s=performance.now();
  const f=n=>{const p=Math.min((n-s)/1500,1);el.textContent=Math.round(t*p);if(p<1)requestAnimationFrame(f)};
  requestAnimationFrame(f);
});

// hero collage: pointer parallax
(()=>{const box=$('#heroVis');if(!box||matchMedia('(pointer:coarse)').matches)return;
 const cards=[...box.querySelectorAll('.hc')];
 const move=(x,y)=>cards.forEach(c=>{const d=+c.dataset.d;c.style.setProperty('--x',x*d+'px');c.style.setProperty('--y',y*d+'px')});
 addEventListener('pointermove',e=>move(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5));})();

// portfolio filter
const fbar=$('#filters');
fbar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  fbar.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('#work figure').forEach(f=>f.classList.toggle('hide',b.dataset.f!=='all'&&f.dataset.c!==b.dataset.f));
});

// lightbox
const lb=$('#lb'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('p');
$('#work').addEventListener('click',e=>{const f=e.target.closest('figure');if(!f)return;
  const im=f.querySelector('img');lbImg.src=im.src;lbImg.alt=im.alt;
  lbCap.textContent=f.querySelector('b').textContent+' · '+f.querySelector('span').textContent;lb.hidden=false;
});
lb.addEventListener('click',()=>lb.hidden=true);
addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
