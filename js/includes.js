// Simple includes loader for header/footer.
(async function(){
  // Try multiple paths to be resilient for project vs user pages
  async function fetchTry(paths){
    for(const p of paths){
      try{
        const res = await fetch(p, {cache: 'no-cache'});
        if(res.ok) return await res.text();
      }catch(e){/* try next */}
    }
    throw new Error('All fetch attempts failed: ' + paths.join(', '));
  }

  function loadInto(selector, paths){
    const el = document.querySelector(selector);
    if(!el) return Promise.resolve();
    return fetchTry(paths).then(html=>{ el.innerHTML = html; }).catch(err=>{ console.warn(err); });
  }

  // common candidate paths (relative, root-relative, parent-relative)
  const headerPaths = ['./includes/header.html','/includes/header.html','includes/header.html'];
  const footerPaths = ['./includes/footer.html','/includes/footer.html','includes/footer.html'];

  await Promise.all([
    loadInto('#site-header', headerPaths),
    loadInto('#site-footer', footerPaths)
  ]);

  // set year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // highlight active nav link (best-effort)
  const nav = document.querySelector('#site-header .main-nav');
  if(nav){
    const links = nav.querySelectorAll('a');
    links.forEach(a=>{
      try{
        const href = new URL(a.getAttribute('href'), location.href).pathname.replace(/\/+$/,'');
        const loc = location.pathname.replace(/\/+$/,'');
        if(href === loc || loc.endsWith(href)) a.classList.add('active');
      }catch(e){}
    });
  }

  // If on homepage, add a modifier class so homepage-specific styles can apply
  const footer = document.querySelector('#site-footer > .wrap > .footer-brand');
  if(footer){
    const isHome = location.pathname === '/' || location.pathname.endsWith('/index.html');
    if(isHome){
      const wrapper = document.querySelector('#site-footer');
      if(wrapper) wrapper.classList.add('site-footer-home');
    }
  }

})();
