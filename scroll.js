/* El-Chifa scroll engine — lets-scroll pattern, stills-only build.
   Scroll position drives one continuous journey: scene cross-dissolve +
   slow visual drift + copy reveal + route rail. No video clips in v1
   (manual-asset path); <video> slots can be added later per HANDOFF.md.
   Uses transform/opacity only. Honors prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var copies = Array.prototype.slice.call(document.querySelectorAll('.copy'));
  var scenes = Array.prototype.slice.call(document.querySelectorAll('.scene'));
  var visuals = Array.prototype.slice.call(document.querySelectorAll('.scene__visual'));
  var routeBtns = Array.prototype.slice.call(document.querySelectorAll('#route button, #nav button'));
  var progress = document.getElementById('progress');
  var hint = document.getElementById('hint');
  var active = -1, ticking = false;

  function goto(i) {
    if (copies[i]) copies[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }
  routeBtns.forEach(function (b) {
    b.addEventListener('click', function () { goto(parseInt(b.dataset.goto, 10)); });
  });

  // GSAP soft entrance for copy blocks (progressive enhancement only)
  if (window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    copies.forEach(function (c) {
      gsap.from(c.querySelectorAll('.copy__title,.copy__body,.copy__tags,.copy__cta'), {
        y: 34, opacity: 0, duration: .9, stagger: .08, ease: 'power3.out',
        scrollTrigger: { trigger: c, start: 'top 72%' }
      });
    });
  }

  function read() {
    var vh = window.innerHeight;
    var y = window.scrollY || window.pageYOffset;
    var max = document.body.scrollHeight - vh;
    if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(3) : 0);
    if (hint) hint.style.opacity = Math.max(0, 1 - y / (0.5 * vh));

    // Nearest section = active scene (continuous flight metaphor)
    var nearest = 0, best = Infinity;
    copies.forEach(function (c, i) {
      var r = c.getBoundingClientRect();
      var d = Math.abs(r.top + r.height / 2 - vh / 2);
      if (d < best) { best = d; nearest = i; }
      // Copy fade by distance from viewport center
      var vis = Math.max(0, 1 - d / (vh * 0.75));
      c.style.opacity = reduce ? 1 : (0.12 + 0.88 * vis).toFixed(2);
      if (!reduce) c.style.transform = 'translateY(' + ((1 - vis) * 30).toFixed(1) + 'px)';
    });

    if (nearest !== active) {
      active = nearest;
      scenes.forEach(function (s, i) { s.classList.toggle('is-active', i === active); });
      routeBtns.forEach(function (b) {
        b.classList.toggle('is-active', parseInt(b.dataset.goto, 10) === active);
      });
    }

    // Slow drift = camera glide illusion (seamless, velocity never reverses)
    if (!reduce) {
      var p = max > 0 ? y / max : 0;
      visuals.forEach(function (v, i) {
        var local = Math.max(-1, Math.min(1, (i - p * (scenes.length - 1)) * 0.6));
        v.style.transform = 'scale(1.12) translateY(' + (local * 3).toFixed(2) + '%)';
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(read); }
  }, { passive: true });
  window.addEventListener('resize', read);

  // Progressive stills: if assets/still_*.png exist (see HANDOFF.md), layer them
  // over the CSS scenes automatically. Missing files remove themselves silently.
  Array.prototype.slice.call(document.querySelectorAll('.scene__photo')).forEach(function (img) {
    var src = img.getAttribute('data-photo');
    if (!src) { img.remove(); return; }
    var probe = new Image();
    probe.onload = function () { img.src = src; img.classList.add('has-photo'); };
    probe.onerror = function () { img.remove(); };
    probe.src = src;
  });

  // Booking widget: day + period -> prefilled WhatsApp message
  var day = 'السبت', time = 'صباحاً · 8–11';
  var go = document.getElementById('bookGo');
  var goText = document.getElementById('bookGoText');
  function refreshBooking() {
    var msg = 'حجز موعد: ' + day + ' ' + time;
    if (go) go.href = 'https://wa.me/213000000000?text=' + encodeURIComponent(msg);
    if (goText) goText.textContent = 'تأكيد: ' + day + ' ' + time.split(' ·')[0];
  }
  function pills(id, set) {
    var box = document.getElementById(id);
    if (!box) return;
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      box.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-sel'); });
      b.classList.add('is-sel');
      set(b.textContent.trim());
      refreshBooking();
    });
  }
  pills('bookDays', function (v) { day = v; });
  pills('bookTimes', function (v) { time = v; });
  refreshBooking();

  read();
})();
