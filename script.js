/* Trackability website interactions */

// Theme: persist the visitor's preference across all Trackability pages.
(function(){
  const saved=localStorage.getItem('trackability-theme');
  const prefersLight=window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme=saved || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme',theme);
  function updateButtons(){
    const light=document.documentElement.getAttribute('data-theme')==='light';
    document.querySelectorAll('.theme-toggle,.mobile-theme-button').forEach(b=>{
      b.textContent=light?'☾':'☀︎';
      b.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
      b.title=light?'Switch to dark mode':'Switch to light mode';
    });
    const label=document.querySelector('.mobile-theme-label');
    if(label) label.textContent=light?'Light mode':'Dark mode';
  }
  window.toggleTrackabilityTheme=function(){
    const next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem('trackability-theme',next);
    updateButtons();
  };
  document.addEventListener('DOMContentLoaded',updateButtons);
  window.addEventListener('storage',e=>{if(e.key==='trackability-theme'){document.documentElement.setAttribute('data-theme',e.newValue||'dark');updateButtons();}});
})();

// FAQ accordion.
document.querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));

// Scroll reveal.
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

// Mobile navigation. This is deliberately self-contained so the hamburger always responds.
const menuButton=document.querySelector('.menu');
if(menuButton){
  const panel=document.createElement('div');
  panel.className='mobile-menu-panel';
  panel.innerHTML=`<div class="mobile-menu-inner">
    <a href="index.html">Home</a><a href="features.html">Features</a><a href="tutorials.html">Tutorials</a><a href="blog.html">Blog</a><a href="about.html">About</a><a href="faq.html">FAQ</a>
    <div class="mobile-theme-row"><span class="mobile-theme-label">Dark mode</span><button class="mobile-theme-button" type="button">☀︎</button></div>
    <a class="mobile-menu-cta" href="https://trackability-app.github.io/Trackability/" target="_blank" rel="noopener">Begin Your Journey ↗</a>
  </div>`;
  document.body.appendChild(panel);
  menuButton.setAttribute('aria-label','Open navigation menu');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.addEventListener('click',()=>{
    const open=panel.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.textContent=open?'×':'☰';
  });
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    panel.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent='☰';
  }));
  panel.querySelector('.mobile-theme-button').addEventListener('click',e=>{e.stopPropagation();window.toggleTrackabilityTheme();});
}

document.querySelectorAll('.theme-toggle').forEach(b=>b.addEventListener('click',window.toggleTrackabilityTheme));
