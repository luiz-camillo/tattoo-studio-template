/* ===========================================================
   Lu Valente Tattoo — script.js
   Header auto-hide, menu hambúrguer fullscreen,
   carrossel infinito (mini), reveal on scroll, ano no footer,
   aviso nos links de contato (site demonstrativo).
   =========================================================== */
(function(){
  'use strict';

  var root    = document.documentElement;
  var header  = document.querySelector('.site-header');
  var overlay = document.querySelector('[data-menu-overlay]');
  var burger  = document.querySelector('[data-burger]');
  var isEN    = (root.lang || '').toLowerCase().indexOf('en') === 0;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: some descendo, volta subindo ----------
     Regra:
       - topo da página (primeiros 100px): sempre visível, sem fundo
       - rolando PRA BAIXO: esconde
       - rolando PRA CIMA: mostra na hora, com fundo
       - menu aberto: sempre visível
  ------------------------------------------------------------ */
  var showHeader = function(){};

  (function(){
    if(!header) return;

    var TOP_ZONE = 100;  // px do topo onde o header nunca some
    var DELTA    = 6;    // ignora micro-variação de scroll

    var lastY   = window.pageYOffset || 0;
    var ticking = false;

    function show(){ header.classList.remove('header-hidden'); }
    function hide(){ header.classList.add('header-hidden'); }
    showHeader = show;

    function update(){
      ticking = false;

      var y = Math.max(0, window.pageYOffset || 0);
      header.classList.toggle('is-solid', y > TOP_ZONE);

      if(overlay && overlay.classList.contains('is-open')){
        show();
        lastY = y;
        return;
      }

      if(y <= TOP_ZONE){
        show();
      } else if(Math.abs(y - lastY) > DELTA){
        if(y > lastY) hide();  // descendo
        else show();           // subindo
      }

      lastY = y;
    }

    window.addEventListener('scroll', function(){
      if(!ticking){
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive:true });

    update();
  })();

  /* ---------- Menu hambúrguer ---------- */
  function openMenu(){
    showHeader();
    overlay.classList.add('is-open');
    burger.classList.add('is-open');
    if(header) header.classList.add('menu-open');
    burger.setAttribute('aria-expanded','true');
    burger.setAttribute('aria-label', isEN ? 'Close menu' : 'Fechar menu');
    root.style.overflow = 'hidden';
  }
  function closeMenu(){
    overlay.classList.remove('is-open');
    burger.classList.remove('is-open');
    if(header) header.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
    burger.setAttribute('aria-label', isEN ? 'Open menu' : 'Abrir menu');
    root.style.overflow = '';
    showHeader();
  }
  if(burger && overlay){
    burger.addEventListener('click', function(){
      overlay.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    overlay.querySelectorAll('a:not([data-demo])').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && overlay.classList.contains('is-open')){
        closeMenu();
        burger.focus();
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector('[data-year]');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Links de contato demonstrativos ----------
     Site fictício: WhatsApp, Instagram e mapa não levam a lugar
     nenhum. Em vez de um clique "morto", avisa o visitante.
  ------------------------------------------------------ */
  (function(){
    var demoLinks = document.querySelectorAll('[data-demo]');
    if(!demoLinks.length) return;

    var toast = document.createElement('div');
    toast.className = 'demo-toast';
    toast.setAttribute('role','status');
    toast.setAttribute('aria-live','polite');
    document.body.appendChild(toast);

    var timer;
    var msg = isEN
      ? 'Demo site — this contact is a placeholder.'
      : 'Site demonstrativo — este contato é fictício.';

    demoLinks.forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        toast.textContent = msg;
        toast.classList.add('is-visible');
        clearTimeout(timer);
        timer = setTimeout(function(){ toast.classList.remove('is-visible'); }, 2600);
      });
    });
  })();

  /* ---------- Mini carrossel infinito ----------
     O HTML lista só os itens reais; os clones das pontas
     (para o loop) são criados aqui.
  --------------------------------------------- */
  document.querySelectorAll('[data-carousel]').forEach(function(car){
    var track    = car.querySelector('[data-car-track]');
    var viewport = car.querySelector('.car-viewport');
    var prevBtn  = car.querySelector('[data-car-prev]');
    var nextBtn  = car.querySelector('[data-car-next]');
    if(!track) return;

    var items = Array.prototype.slice.call(track.children);
    var realCount = items.length;
    if(realCount < 2) return;

    // clones suficientes para preencher a maior visão (4 por vez no desktop)
    var cloneCount = Math.min(4, realCount);

    function makeClone(el){
      var c = el.cloneNode(true);
      c.setAttribute('aria-hidden','true');
      var img = c.querySelector('img');
      if(img) img.alt = '';
      return c;
    }
    items.slice(-cloneCount).reverse().forEach(function(el){
      track.insertBefore(makeClone(el), track.firstChild);
    });
    items.slice(0, cloneCount).forEach(function(el){
      track.appendChild(makeClone(el));
    });

    var index = cloneCount; // começa no primeiro item real
    var animating = false;
    var safety;

    function step(){
      var first = track.children[0];
      if(!first) return 0;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function setTransform(withTransition){
      if(!withTransition) track.classList.add('no-transition');
      track.style.transform = 'translateX(' + (-index * step()) + 'px)';
      if(!withTransition){
        void track.offsetHeight;
        track.classList.remove('no-transition');
      }
    }

    // ao chegar num clone, pula sem animação para o item real equivalente
    function settle(){
      clearTimeout(safety);
      animating = false;
      if(index >= cloneCount + realCount){
        index -= realCount;
        setTransform(false);
      } else if(index < cloneCount){
        index += realCount;
        setTransform(false);
      }
    }

    function go(dir){
      if(animating) return;  // ignora cliques durante a animação
      animating = true;
      index += dir;
      setTransform(!reduceMotion);
      // se o transitionend não disparar (aba oculta, sem animação), destrava
      safety = setTimeout(settle, reduceMotion ? 0 : 700);
    }

    track.addEventListener('transitionend', function(e){
      if(e.target === track && e.propertyName === 'transform') settle();
    });

    if(nextBtn) nextBtn.addEventListener('click', function(){ go(1); });
    if(prevBtn) prevBtn.addEventListener('click', function(){ go(-1); });

    // swipe no celular
    if(viewport){
      var startX = 0, startY = 0, tracking = false;
      viewport.addEventListener('touchstart', function(e){
        if(e.touches.length !== 1) return;
        tracking = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive:true });
      viewport.addEventListener('touchend', function(e){
        if(!tracking) return;
        tracking = false;
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      }, { passive:true });
    }

    var resizeTick = false;
    window.addEventListener('resize', function(){
      if(resizeTick) return;
      resizeTick = true;
      window.requestAnimationFrame(function(){
        resizeTick = false;
        setTransform(false);
      });
    });
    setTransform(false);
  });

})();
