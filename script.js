
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