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

  // highlight active nav/footer links (best-effort)
  (function(){
    function normPath(p){ try{ return new URL(p, location.origin).pathname.replace(/\/\/+$/,''); }catch(e){ return (p||'').replace(/\/\/+$/,''); } }
    var loc = location.pathname.replace(/\/\/+$/,''); // '/' -> ''
    var links = document.querySelectorAll('#site-header .main-nav a, #site-footer .footer-nav a');
    links.forEach(function(a){
      try{
        var href = a.getAttribute('href') || '';
        var h = normPath(href);
        // treat root/empty as same
        if((h === '' && (loc === '' || loc === '/')) || h === loc){
          a.classList.add('active'); a.setAttribute('aria-current','page');
        } else { a.classList.remove('active'); a.removeAttribute('aria-current'); }
      }catch(e){ }
    });

    // add modifier if on homepage
    var footer = document.querySelector('#site-footer');
    if(footer){
      var isHome = loc === '' || loc === '/';
      if(isHome) footer.classList.add('site-footer-home');
    }
  })();

})();
