
  // Mobile navigation stays usable if JavaScript is unavailable.
  const nav = document.querySelector('.nav');
  const menuButton = document.querySelector('.nav-toggle');
  const menuLabel = menuButton.querySelector('.nav-toggle-label');
  const mobileMenu = window.matchMedia('(max-width: 1000px)');
  function closeMenu(restoreFocus = false) {
    nav.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuLabel.textContent = 'Menu';
    if (restoreFocus) menuButton.focus({preventScroll: true});
  }
  nav.classList.add('nav-ready');
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuLabel.textContent = open ? 'Close' : 'Menu';
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('menu-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeMenu();
  });
  mobileMenu.addEventListener('change', () => closeMenu());

  // The shared details name provides a native accordion; this also covers older browsers.
  const projects = document.querySelectorAll('details.project');
  projects.forEach(project => {
    project.querySelector('summary').addEventListener('click', () => {
      if (!project.open) projects.forEach(other => {
        if (other !== project) other.open = false;
      });
    });
  });

  // scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12});
  reveals.forEach(r=>io.observe(r));

  // rail + nav active state
  const sections = ['hero','about','approach','skills','work','experience','contact'];
  const railItems = document.querySelectorAll('.rail-item');
  const navLinks = document.querySelectorAll('.nav-links a');

  railItems.forEach(item=>{
    item.addEventListener('click', ()=>{
      document.getElementById(item.dataset.target).scrollIntoView({behavior:'smooth'});
    });
  });

  const spy = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        railItems.forEach(r=>r.classList.toggle('active', r.dataset.target===id));
        navLinks.forEach(l=>l.classList.toggle('active', l.dataset.nav===id));
      }
    });
  }, {rootMargin:'-45% 0px -45% 0px'});

  sections.forEach(id=>{
    const el = document.getElementById(id);
    if(el) spy.observe(el);
  });
