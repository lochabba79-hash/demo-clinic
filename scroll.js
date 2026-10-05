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
    nav4: { ar: 'الحزمة', fr: 'Pack' },
    eb5: { ar: 'الحزمة المميزة', fr: 'Pack Premium' },
    pb5: { ar: 'استشارة 90 دقيقة + فحوصات مخبرية كاملة + 3 متابعات + ملف صحي مدى الحياة. كل ما تحتاجه للسنة القادمة في حزمة واحدة.', fr: 'Consultation 90 min + analyses complètes + 3 suivis + dossier santé à vie. Tout pour l’année à venir en un seul pack.' },
    cdLabel: { ar: 'عرض الإطلاق ينتهي نهاية هذا الشهر — المتبقي:', fr: 'L’offre de lancement finit ce mois-ci — reste :' },
    cdDay: { ar: 'يوم', fr: 'jours' },
    v0t: { ar: 'تكلفة الإهمال', fr: 'Le coût de l’attente' },
    v0b: { ar: 'مضاعفات وزيارات طارئة قد تتجاوز 5000 دج في 6 أشهر', fr: 'Complications et urgences : plus de 5000 DA en 6 mois' },
    v1t: { ar: 'ماذا تشمل', fr: 'Ce qui est inclus' },
    v1b: { ar: 'فحص شامل + ملف موحد + خط مفتوح + جلسة مجانية إن لم تتحسن', fr: 'Bilan + dossier unique + ligne ouverte + séance offerte si pas d’amélioration' },
    v2t: { ar: 'السعر بشفافية', fr: 'Prix transparent' },
    v2b: { ar: 'القيمة 7500 دج — سعرك 1000 دج (عرض إطلاق)', fr: 'Valeur 7500 DA — votre prix 1000 DA (lancement)' },
    v3t: { ar: 'لمن تناسب', fr: 'Pour qui' },
    v3b: { ar: 'فوق 40، تاريخ عائلي، إرهاق مستمر، آخر فحص منذ 2+ سنة', fr: '40+, antécédents familiaux, fatigue persistante, dernier bilan il y a 2+ ans' },
    prVal: { ar: 'القيمة الفعلية', fr: 'Valeur réelle' },
    prNow: { ar: 'سعرك اليوم', fr: 'Votre prix' },
    prPay: { ar: 'نقداً · بريدي موب · أو 3 دفعات (350+350+300) بدون فائدة', fr: 'Espèces · BaridiMob · ou 3 fois (350+350+300) sans intérêts' },
    qzTitle: { ar: 'أجب بـ نعم / لا — نرى إن كانت الحزمة لك', fr: 'Répondez oui / non — voyons si le pack est pour vous' },
    qz0: { ar: 'عمرك 40 سنة أو أكثر؟', fr: '40 ans ou plus ?' },
    qz1: { ar: 'تاريخ عائلي (ضغط، سكري) أو إرهاق مستمر؟', fr: 'Antécédents familiaux ou fatigue persistante ?' },
    qz2: { ar: 'آخر فحص شامل منذ سنتين أو أكثر؟', fr: 'Dernier bilan il y a 2 ans ou plus ?' },
    ynY: { ar: 'نعم', fr: 'Oui' },
    ynN: { ar: 'لا', fr: 'Non' },
    qzYes: { ar: 'أنت مرشح مناسب — أكّد عبر واتساب وسنتصل بك.', fr: 'Vous êtes éligible — confirmez sur WhatsApp, on vous rappellera.' },
    qzNo: { ar: 'الاستشارة العامة أنسب لك حالياً — احجزها من الأعلى.', fr: 'La consultation générale vous convient mieux — réservez ci-dessus.' },
    tsTag: { ar: 'شهادة تجريبية — تُستبدل بشهادة حقيقية', fr: 'Témoignage d’exemple — à remplacer' },
    tsBody: { ar: '"الفحص الشامل كشف مستوى سكر خفي — الحمد لله اكتشفناه بدري. من غير هذه الحزمة كنت سأنتظر حتى تتفاقم الأمور."', fr: '« Le bilan a révélé un diabète caché — heureusement détecté tôt. Sans ce pack, j’aurais attendu que ça empire. »' },
    tsWho: { ar: 'ن. م. · 47 سنة', fr: 'N. M. · 47 ans' },
    pq0: { ar: 'لماذا 1000 دج فقط؟ ما المقابل الخفي؟', fr: 'Pourquoi seulement 1000 DA ? Quel est le piège ?' },
    pa0: { ar: 'لا مقابل خفي: عرض إطلاق لبناء الثقة والسمعة. السعر الكامل 7500 دج سيُطبق بعد انتهاء العرض.', fr: 'Aucun piège : offre de lancement pour bâtir la confiance. Le plein tarif de 7500 DA s’appliquera après.' },
    pq1: { ar: '90 دقيقة طويلة — هل سأملّ؟', fr: '90 minutes, n’est-ce pas trop long ?' },
    pa1: { ar: 'الطول من الشمولية لا من البطء: فحص كامل + شرح + خطة مكتوبة تغادر بها. لا غموض.', fr: 'La durée vient de l’exhaustivité : examen + explications + plan écrit. Aucune zone d’ombre.' },
    pq2: { ar: 'ملفي الرقمي — ماذا عن الخصوصية؟', fr: 'Mon dossier numérique — et la confidentialité ?' },
    pa2: { ar: 'ملفك مشفّر ولا يطّلع عليه إلا أنت وطبيبك. يمكن حفظ نسخة محلية لديك متى شئت.', fr: 'Dossier chiffré, accessible uniquement par vous et votre médecin. Copie locale possible.' },
    packCta: { ar: 'اختر موعدك الآن — 30 ثانية عبر واتساب', fr: 'Choisissez votre créneau — 30 secondes sur WhatsApp' },
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

  /* ---------- premium: A/B headline, countdown, quiz, click stats ---------- */
  var VARIANTS = {
    A: { ar: 'اشترِ عافيتك مرة واحدة — ولا تقلق بعدها', fr: 'Payez votre tranquillité une fois — et oubliez l’inquiétude' },
    B: { ar: 'تشخيص حقيقي + متابعة حقيقية = حياة حقيقية', fr: 'Vrai diagnostic + vrai suivi = vraie vie' },
    C: { ar: 'قبل أن تصبح مشكلة... تحقق الآن', fr: 'Avant que ça devienne un problème... vérifiez maintenant' }
  };
  var ab = 'A';
  try { ab = localStorage.getItem('chifa-ab') || (['A', 'B', 'C'])[Math.floor(Math.random() * 3)]; localStorage.setItem('chifa-ab', ab); } catch (e) {}
  function paintVariant() {
    var t = document.getElementById('premiumTitle');
    if (t && VARIANTS[ab]) t.innerHTML = VARIANTS[ab][lang];
  }
  function trackClick(name) {
    try {
      var k = 'chifa-clicks', all = JSON.parse(localStorage.getItem(k) || '{}');
      var key = ab + ':' + name;
      all[key] = (all[key] || 0) + 1;
      localStorage.setItem(k, JSON.stringify(all));
    } catch (e) {}
  }
  var packGo = document.getElementById('packGo');
  if (packGo) packGo.addEventListener('click', function () { trackClick('pack'); });
  if (go) go.addEventListener('click', function () { if (valid()) trackClick('book'); });
  // Honest countdown: real days left in the calendar month (offer ends month-end).
  function paintCountdown() {
    var el = document.getElementById('cdDays');
    if (!el) return;
    var now = new Date();
    var left = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
    el.textContent = left + ' ' + STR.cdDay[lang];
  }
  // 3-question qualifier: score 2+ = eligible, WhatsApp carries the answers.
  var quizAns = {};
  document.querySelectorAll('#quiz [data-quiz]').forEach(function (box) {
    box.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      box.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-sel'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('is-sel');
      b.setAttribute('aria-pressed', 'true');
      quizAns[box.getAttribute('data-quiz')] = b.getAttribute('data-v');
      var score = ['0', '1', '2'].filter(function (k) { return quizAns[k] === '1'; }).length;
      var res = document.getElementById('quizRes');
      if (Object.keys(quizAns).length === 3 && res) {
        var ok = score >= 2;
        res.textContent = ok ? STR.qzYes[lang] : STR.qzNo[lang];
        if (ok && packGo) {
          packGo.href = 'https://wa.me/213000000000?text=' + encodeURIComponent(
            (lang === 'ar' ? 'مهتم بالحزمة المميزة (إجابات: ' : 'Pack Premium (réponses : ') +
            ['0', '1', '2'].map(function (k) { return quizAns[k] === '1' ? (lang === 'ar' ? 'نعم' : 'oui') : (lang === 'ar' ? 'لا' : 'non'); }).join('، ') + ')');
        }
      }
    });
  });
  var _applyLang = applyLang;
  applyLang = function () { _applyLang(); paintVariant(); paintCountdown(); };

  applyLang();
  read();
})();
