/* El-Chifa scroll engine + booking + AR/FR toggle.
   Scroll drives one continuous journey (stills-only v1; video slots per HANDOFF.md).
   Transform/opacity only. Honors prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- i18n (AR default, FR toggle, persisted) ---------- */
  var STR = {
    skip: { ar: 'تخطَّ إلى المحتوى', fr: 'Aller au contenu' },
    brandSub: { ar: 'سطيف · نموذج تجريبي', fr: 'Sétif · démo' },
    nav0: { ar: 'الاستقبال', fr: 'Accueil' },
    nav1: { ar: 'الفحص', fr: 'Examen' },
    nav2: { ar: 'المتابعة', fr: 'Suivi' },
    nav3: { ar: 'احجز', fr: 'Réserver' },
    book: { ar: 'احجز موعد', fr: 'Réserver' },
    hint: { ar: 'مرّر للأسفل لاكتشاف العيادة', fr: 'Faites défiler pour découvrir la clinique' },
    heroTitle: { ar: 'طبٌّ بطابعٍ عائلي، <em>من قلب سطيف</em>', fr: 'Une médecine <em>familiale</em>, au cœur de Sétif' },
    heroBody: { ar: 'استقبال دافئ، مواعيد تحترم وقتك، وفريق يشرح لك كل خطوة قبل أن تبدأ. هذه رحلتك داخل العيادة — مرّر لتكملها.', fr: 'Accueil chaleureux, rendez-vous à l’heure et une équipe qui vous explique chaque étape. Voici votre parcours — faites défiler.' },
    tag0: { ar: 'السبت – الخميس · 8:00 – 17:00', fr: 'Sam – Jeu · 8h00 – 17h00' },
    tag1: { ar: 'وسط سطيف', fr: 'Centre de Sétif' },
    tag2: { ar: 'استشارة أولى ميسّرة', fr: 'Première consultation facilitée' },
    ctaWa: { ar: 'احجز عبر واتساب', fr: 'Réserver sur WhatsApp' },
    ctaExam: { ar: 'اكتشف الفحص', fr: 'Découvrir l’examen' },
    eb2: { ar: 'غرفة الفحص', fr: 'Salle d’examen' },
    t2: { ar: 'فحصٌ دقيق بلا استعجال', fr: 'Un examen rigoureux, sans précipitation' },
    b2: { ar: 'طبيب يستمع أولاً، تشخيص واضح بلغة تفهمها، وخطة علاج مكتوبة تأخذها معك. لا مصطلحات مبهمة، لا قرارات مستعجلة.', fr: 'Un médecin qui écoute d’abord, un diagnostic clair dans vos mots, et un plan écrit à emporter. Ni jargon, ni décisions hâtives.' },
    svc0: { ar: 'استشارة عامة', fr: 'Consultation générale' },
    svc1: { ar: 'فحص شامل + تخطيط', fr: 'Bilan complet + ECG' },
    svc2: { ar: 'حصة متابعة', fr: 'Séance de suivi' },
    svcNote: { ar: 'أسعار استرشادية للعرض — تُضبط حسب العيادة الحقيقية.', fr: 'Tarifs indicatifs pour la démo — ajustés selon la vraie clinique.' },
    eb3: { ar: 'الرعاية والمتابعة', fr: 'Soins et suivi' },
    t3: { ar: 'نرافقك بعد أن تغادر', fr: 'On vous accompagne après votre départ' },
    b3: { ar: 'رسالة متابعة بعد كل زيارة، تذكير بموعد المراجعة، وخط مفتوح لأي سؤال. الشفاء رحلة — ونحن معك فيها خطوة بخطوة.', fr: 'Message de suivi après chaque visite, rappel du contrôle, ligne ouverte pour toute question. La guérison est un voyage — on le fait avec vous.' },
    fq0: { ar: 'هل أحتاج موعداً مسبقاً؟', fr: 'Faut-il prendre rendez-vous ?' },
    fa0: { ar: 'نعم، الحجز المسبق عبر واتساب يضمن دورك ويختصر الانتظار. الحالات المستعجلة تُستقبل مباشرة.', fr: 'Oui, la réservation WhatsApp garantit votre tour et réduit l’attente. Les urgences sont reçues directement.' },
    fq1: { ar: 'ماذا أُحضر معي في أول زيارة؟', fr: 'Quoi apporter à la première visite ?' },
    fa1: { ar: 'بطاقة التعريف، وصفاتك وتحاليلك السابقة إن وجدت، وقائمة الأدوية التي تتناولها حالياً.', fr: 'Pièce d’identité, ordonnances et analyses précédentes si vous en avez, et la liste de vos médicaments actuels.' },
    fq2: { ar: 'كيف تتم المتابعة بعد الفحص؟', fr: 'Comment se fait le suivi après l’examen ?' },
    fa2: { ar: 'رسالة واتساب خلال 48 ساعة، تذكير بموعد المراجعة، وملف صحي واحد يجمع كل زياراتك.', fr: 'Message WhatsApp sous 48 h, rappel du contrôle, et un dossier unique pour toutes vos visites.' },
    fq3: { ar: 'كيف أدفع؟ وهل يمكن الإلغاء؟', fr: 'Paiement et annulation ?' },
    fa3: { ar: 'الدفع نقداً أو عبر بريدي موب بعد الاستشارة. الإلغاء مجاني برسالة قبل الموعد بـ 24 ساعة.', fr: 'Espèces ou BaridiMob après la consultation. Annulation gratuite par message 24 h avant.' },
    fq4: { ar: 'هل تتعاملون مع التأمين؟', fr: 'Travaillez-vous avec les assurances ?' },
    fa4: { ar: 'نعم، نوفر فاتورة مفصلة صالحة للتعويض، ونساعدك في تجهيز ملف الضمان الاجتماعي.', fr: 'Oui, facture détaillée valable pour remboursement, et aide pour votre dossier de sécurité sociale.' },
    eb4: { ar: 'الخطوة الأخيرة', fr: 'Dernière étape' },
    t4: { ar: 'موعدك على بُعد رسالة واحدة', fr: 'Votre rendez-vous à un message près' },
    b4: { ar: 'املأ بياناتك، اختر اليوم والفترة، ثم أكّد عبر واتساب — نرد عليك خلال ساعات العمل.', fr: 'Remplissez vos infos, choisissez jour et créneau, puis confirmez sur WhatsApp — réponse pendant les heures d’ouverture.' },
    bkName: { ar: 'الاسم الكامل', fr: 'Nom complet' },
    bkNamePh: { ar: 'مثال: أمين بن علي', fr: 'Ex : Amine Ben Ali' },
    bkPhone: { ar: 'رقم الهاتف', fr: 'Téléphone' },
    bkReason: { ar: 'سبب الزيارة', fr: 'Motif de visite' },
    rs0: { ar: 'استشارة عامة', fr: 'Consultation générale' },
    rs1: { ar: 'فحص شامل', fr: 'Bilan complet' },
    rs2: { ar: 'متابعة', fr: 'Suivi' },
    rs3: { ar: 'أخرى', fr: 'Autre' },
    bkDay: { ar: 'اختر اليوم', fr: 'Choisissez le jour' },
    bkTime: { ar: 'اختر الفترة', fr: 'Choisissez le créneau' },
    bkOrCall: { ar: 'أو اتصل مباشرة:', fr: 'Ou appelez directement :' },
    foot: { ar: 'عيادة الشفاء — سطيف · صُنعت بواسطة Ibdaa Creations · نموذج عرض تجريبي', fr: 'Clinique El-Chifa — Sétif · par Ibdaa Creations · maquette de démonstration' },
    navLabel: { ar: 'أقسام الصفحة', fr: 'Sections de la page' },
    routeLabel: { ar: 'تقدم الرحلة', fr: 'Progression du parcours' },
    themeToggle: { ar: 'تبديل المظهر', fr: 'Changer de thème' },
    days: { ar: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'], fr: ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'] },
    times: { ar: ['صباحاً · 8–11', 'منتصف النهار · 11–14', 'مساءً · 14–17'], fr: ['Matin · 8–11', 'Midi · 11–14', 'Après-midi · 14–17'] },
    errNeed: { ar: 'يرجى إدخال الاسم ورقم هاتف صحيح (05/06/07 + 8 أرقام).', fr: 'Veuillez saisir nom et téléphone valides (05/06/07 + 8 chiffres).' },
    goPrefix: { ar: 'تأكيد', fr: 'Confirmer' },
    bookMsg: {
      ar: function (n, p, r, d, t) { return 'حجز موعد: ' + n + '، ' + p + '، ' + r + '، ' + d + ' ' + t; },
      fr: function (n, p, r, d, t) { return 'RDV: ' + n + ', ' + p + ', ' + r + ', ' + d + ' ' + t; }
    }
  };
  var lang = 'ar';
  try { lang = localStorage.getItem('chifa-lang') || 'ar'; } catch (e) {}
  var toggle = document.getElementById('langToggle');

  function currentDay() {
    var b = document.querySelector('#bookDays button.is-sel');
    return b ? b.dataset.i : 0;
  }
  function currentTime() {
    var b = document.querySelector('#bookTimes button.is-sel');
    return b ? b.dataset.i : 0;
  }
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'), v = STR[k] && STR[k][lang];
      if (v == null) return;
      if (k === 'bkNamePh') { el.placeholder = v; return; }
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) { el.setAttribute(attr, v); return; }
      el.innerHTML = v;
    });
    // Rebuild day/time pills in the right language, keeping selection
    var di = currentDay(), ti = currentTime();
    var db = document.getElementById('bookDays'), tb = document.getElementById('bookTimes');
    if (db) db.querySelectorAll('button').forEach(function (b, i) { b.textContent = STR.days[lang][i]; b.dataset.i = i; b.classList.toggle('is-sel', i == di); });
    if (tb) tb.querySelectorAll('button').forEach(function (b, i) { b.textContent = STR.times[lang][i]; b.dataset.i = i; b.classList.toggle('is-sel', i == ti); });
    if (toggle) toggle.textContent = lang === 'ar' ? 'FR' : 'عربي';
    document.querySelectorAll('.scene__photo.has-photo').forEach(function (img) {
      var key = (img.getAttribute('data-photo') || '').split('/').pop().split('.')[0];
      if (PHOTO_ALT[key]) img.alt = PHOTO_ALT[key][lang];
    });
    refreshBooking();
    try { localStorage.setItem('chifa-lang', lang); } catch (e) {}
  }
  if (toggle) toggle.addEventListener('click', function () { lang = lang === 'ar' ? 'fr' : 'ar'; applyLang(); });

  /* ---------- theme: system / light / dark ---------- */
  var themeBtn = document.getElementById('themeToggle');
  var theme = 'system';
  try { theme = localStorage.getItem('chifa-theme') || 'system'; } catch (e) {}
  function paintThemeBtn() {
    if (!themeBtn) return;
    var icon = themeBtn.querySelector('i');
    if (icon) icon.className = 'ph-light ' + (theme === 'dark' ? 'ph-sun' : theme === 'light' ? 'ph-moon' : 'ph-monitor');
  }
  function applyTheme() {
    if (theme === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    paintThemeBtn();
    try { localStorage.setItem('chifa-theme', theme); } catch (e) {}
  }
  if (themeBtn) themeBtn.addEventListener('click', function () {
    theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    applyTheme();
  });
  applyTheme();

  /* ---------- scroll engine ---------- */
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

  if (window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    copies.forEach(function (c) {
      gsap.from(c.querySelectorAll('.copy__title,.copy__body,.copy__tags,.copy__cta,.services,.faq,.book'), {
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

    var nearest = 0, best = Infinity;
    copies.forEach(function (c, i) {
      var r = c.getBoundingClientRect();
      var d = Math.abs(r.top + r.height / 2 - vh / 2);
      if (d < best) { best = d; nearest = i; }
      var vis = Math.max(0, 1 - d / (vh * 0.95));
      c.style.opacity = reduce ? 1 : (0.18 + 0.82 * vis).toFixed(2);
      if (!reduce) c.style.transform = 'translateY(' + ((1 - vis) * 30).toFixed(1) + 'px)';
    });

    if (nearest !== active) {
      active = nearest;
      scenes.forEach(function (s, i) { s.classList.toggle('is-active', i === active); });
      routeBtns.forEach(function (b) {
        var on = parseInt(b.dataset.goto, 10) === active;
        b.classList.toggle('is-active', on);
        if (b.closest('#nav')) { if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); }
      });
      ensurePhotos();
    }

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

  /* ---------- progressive stills ---------- */
  var PHOTO_ALT = {
    still_reception: { ar: 'قاعة انتظار دافئة في عيادة — صورة توضيحية', fr: 'Salle d’attente chaleureuse — photo d’illustration' },
    still_exam: { ar: 'غرفة فحص طبي — صورة توضيحية', fr: 'Salle d’examen — photo d’illustration' },
    still_care: { ar: 'طبيب يستمع لمريض باهتمام — صورة توضيحية', fr: 'Médecin à l’écoute — photo d’illustration' },
    still_cta: { ar: 'مدخل عيادة — صورة توضيحية', fr: 'Entrée de clinique — photo d’illustration' }
  };
  /* ---------- progressive stills: active ±1 only, size by viewport ---------- */
  var photoQueue = Array.prototype.slice.call(document.querySelectorAll('.scene__photo')).map(function (img, i) {
    return { img: img, si: i, done: false };
  });
  function photoSrc(p) {
    var sm = window.innerWidth <= 860;
    return p.img.getAttribute(sm ? 'data-photo-sm' : 'data-photo');
  }
  function ensurePhotos() {
    photoQueue.forEach(function (p) {
      if (p.done || Math.abs(p.si - active) > 1) return;
      var src = photoSrc(p);
      if (!src) { p.img.remove(); p.done = true; return; }
      p.done = true;
      var key = src.split('/').pop().split('.')[0].replace('-sm', '');
      var probe = new Image();
      probe.onload = function () {
        p.img.src = src;
        if (PHOTO_ALT[key]) p.img.alt = PHOTO_ALT[key][lang];
        p.img.classList.add('has-photo');
      };
      probe.onerror = function () { p.img.remove(); };
      probe.src = src;
    });
  }

  /* ---------- booking widget ---------- */
  var go = document.getElementById('bookGo');
  var goText = document.getElementById('bookGoText');
  var errBox = document.getElementById('bookErr');
  var nameI = document.getElementById('bkName');
  var phoneI = document.getElementById('bkPhone');
  var reasonI = document.getElementById('bkReason');

  function valid() {
    return nameI && nameI.value.trim().length >= 3 &&
           phoneI && /^0[567][0-9]{8}$/.test(phoneI.value.replace(/[\s-]/g, ''));
  }
  function refreshBooking() {
    var d = STR.days[lang][currentDay()].split(' ')[0] || STR.days[lang][currentDay()];
    // Keep short day label for the button (first word is enough in both languages)
    var dayShort = STR.days[lang][currentDay()];
    var timeFull = STR.times[lang][currentTime()];
    var timeShort = timeFull.split(' ·')[0];
    var r = reasonI ? reasonI.options[reasonI.selectedIndex].text : '';
    var n = nameI && nameI.value.trim() ? nameI.value.trim() : '…';
    var p = phoneI && phoneI.value.trim() ? phoneI.value.trim() : '…';
    var msg = STR.bookMsg[lang](n, p, r, dayShort, timeFull);
    if (go) go.href = 'https://wa.me/213000000000?text=' + encodeURIComponent(msg);
    if (goText) goText.textContent = STR.goPrefix[lang] + ': ' + dayShort + ' ' + timeShort;
    void d;
  }
  function pills(id) {
    var box = document.getElementById(id);
    if (!box) return;
    box.querySelectorAll('button').forEach(function (b, i) {
      b.dataset.i = i;
      b.setAttribute('aria-pressed', b.classList.contains('is-sel') ? 'true' : 'false');
    });
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      box.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-sel'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('is-sel');
      b.setAttribute('aria-pressed', 'true');
      if (errBox) errBox.hidden = true;
      refreshBooking();
    });
  }
  pills('bookDays');
  pills('bookTimes');
  ['bkName', 'bkPhone'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { if (errBox) errBox.hidden = true; refreshBooking(); });
  });
  if (reasonI) reasonI.addEventListener('change', refreshBooking);
  if (go) go.addEventListener('click', function (e) {
    if (!valid()) {
      e.preventDefault();
      if (errBox) { errBox.textContent = STR.errNeed[lang]; errBox.hidden = false; }
      (nameI && nameI.value.trim().length < 3 ? nameI : phoneI).focus();
    }
  });

  applyLang();
  read();
})();
