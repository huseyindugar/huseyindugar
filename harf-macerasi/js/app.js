'use strict';
(() => {
  // ---------- helpers ----------
  const h = (tag, attrs = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      e.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return e;
  };
  const rand = (n) => Math.floor(Math.random() * n);
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[rand(a.length)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const app = document.getElementById('app');
  const fx = document.getElementById('fx');

  const lower = (s, lang) => s.toLocaleLowerCase(lang === 'tr' ? 'tr' : 'en');
  const matches = (word, L, lang) => { const w = lower(word, lang); return L.contains ? w.includes(L.l) : w.startsWith(L.l); };
  const colorOf = (lang, L) => 'c' + (LANGS[lang].letters.indexOf(L) % 7);
  const letterFace = (L, cls = 'letter-face') => h('span', { class: cls }, L.u, h('small', {}, L.l));
  const otherLang = (lang) => (lang === 'en' ? 'tr' : 'en');
  const isSuper = (e) => SUPER_STICKERS.some((x) => x[0] === e);
  // Bir çıkartmanın (emoji) bu dildeki ve diğer dildeki adı
  const stickerInfo = (lang, e) => {
    for (const L of LANGS[lang].letters) for (const [w, em, o] of L.words) if (em === e) return { w, o };
    const sp = SUPER_STICKERS.find((x) => x[0] === e);
    if (sp) return lang === 'en' ? { w: sp[1], o: sp[2] } : { w: sp[2], o: sp[1] };
    return { w: '', o: '' };
  };

  // ---------- storage ----------
  const KEY = 'harfMacerasi.v1';
  const defaults = () => ({
    settings: { en: { upTo: 'F', voice: '' }, tr: { upTo: 'F', voice: '' }, rate: 0.85, bilingual: true },
    stats: { en: {}, tr: {} },
    stickers: { en: [], tr: [] },
  });
  const load = () => {
    const d = defaults();
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s) return {
        settings: { ...d.settings, ...s.settings, en: { ...d.settings.en, ...(s.settings || {}).en }, tr: { ...d.settings.tr, ...(s.settings || {}).tr } },
        stats: { ...d.stats, ...s.stats },
        stickers: { ...d.stickers, ...s.stickers },
      };
    } catch (e) { /* ignore */ }
    return d;
  };
  let state = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } };
  const stat = (lang, L) => (state.stats[lang][L.u] ||= { c: 0, w: 0, modes: [] });
  const upToIndex = (lang) => Math.max(0, LANGS[lang].letters.findIndex((L) => L.u === state.settings[lang].upTo));

  // ---------- speech ----------
  const Speech = {
    ok: 'speechSynthesis' in window,
    token: 0,
    voicesFor(lang) {
      if (!this.ok) return [];
      const tag = LANGS[lang].speech.toLowerCase();
      const all = speechSynthesis.getVoices().map((v) => ({ v, l: v.lang.toLowerCase().replace('_', '-') }));
      let vs = all.filter((x) => x.l === tag);
      if (!vs.length) vs = all.filter((x) => x.l.startsWith(tag.slice(0, 2)));
      return vs.map((x) => x.v);
    },
    choose(lang) {
      const vs = this.voicesFor(lang);
      const saved = state.settings[lang].voice;
      const found = vs.find((v) => v.name === saved);
      if (found) return found;
      const pref = LANGS[lang].prefVoices;
      const score = (v) => (/premium/i.test(v.name) ? 4 : 0) + (/enhanced|gelişmiş/i.test(v.name) ? 3 : 0) +
        (pref.some((n) => v.name.includes(n)) ? 2 : 0) + (v.localService ? 1 : 0);
      return [...vs].sort((a, b) => score(b) - score(a))[0] || null;
    },
    say(text, lang) {
      if (!this.ok) return wait(500);
      const my = ++this.token;
      speechSynthesis.cancel();
      return new Promise((res) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = LANGS[lang].speech;
        const v = this.choose(lang);
        if (v) u.voice = v;
        u.rate = state.settings.rate;
        u.pitch = 1.1;
        let done = false;
        const fin = () => { if (!done) { done = true; clearTimeout(t); res(my === this.token); } };
        u.onend = fin; u.onerror = fin;
        const t = setTimeout(fin, 2500 + text.length * 110);
        setTimeout(() => { if (my === this.token) speechSynthesis.speak(u); else fin(); }, 40);
      });
    },
    stop() { this.token++; if (this.ok) speechSynthesis.cancel(); },
  };
  // Önce oynanan dilde söyler, ardından kelimeyi diğer dilde söyler ("Bear!" … "Ayı").
  async function sayBoth(lang, text, otherWord) {
    const ok = await Speech.say(text, lang);
    if (!ok || !otherWord || !state.settings.bilingual) return ok;
    const t = Speech.token;
    await wait(200);
    if (Speech.token !== t) return false;
    return Speech.say(otherWord, otherLang(lang));
  }
  if (Speech.ok) { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices(); }

  // ---------- sound effects (generated, no files) ----------
  const Sfx = {
    ctx: null,
    ensure() {
      if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) this.ctx = new AC(); }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },
    tone(f, start, dur, type = 'sine', vol = 0.18) {
      const c = this.ctx; if (!c) return;
      const o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.value = f;
      const t = c.currentTime + start;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
    },
    tap() { this.ensure(); this.tone(600, 0, 0.08, 'sine', 0.1); },
    good() { this.ensure(); this.tone(660, 0, 0.15); this.tone(880, 0.1, 0.3); },
    bad() { this.ensure(); this.tone(240, 0, 0.22, 'triangle', 0.12); this.tone(200, 0.12, 0.25, 'triangle', 0.1); },
    flip() { this.ensure(); this.tone(420, 0, 0.07, 'triangle', 0.1); },
    win() { this.ensure(); [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, i * 0.12, 0.35, 'triangle', 0.16)); },
  };

  const confetti = (n = 40) => {
    const bits = ['🎉', '⭐', '🎈', '✨', '🌟', '🎊', '💛', '💙', '💚'];
    for (let i = 0; i < n; i++) {
      const s = h('div', { class: 'confetti' }, pick(bits));
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDuration = 1.8 + Math.random() * 1.8 + 's';
      s.style.animationDelay = Math.random() * 0.6 + 's';
      fx.append(s);
      setTimeout(() => s.remove(), 4500);
    }
  };

  // ---------- stickers ----------
  const updateCounter = (lang) => {
    const c = app.querySelector('.star-count');
    if (!c) return;
    c.querySelector('.count').textContent = String(state.stickers[lang].length);
    c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  };
  // Çıkartmayı verir ve ekrandaki yerinden albüm sayacına uçurur
  function giveSticker(lang, emoji, fromEl) {
    state.stickers[lang].push(emoji);
    save();
    const target = app.querySelector('.star-count');
    const r1 = fromEl.getBoundingClientRect();
    const r2 = target ? target.getBoundingClientRect() : { left: innerWidth - 80, top: 20, width: 60, height: 40 };
    const x1 = r1.left + r1.width / 2, y1 = r1.top + r1.height / 2;
    const dx = r2.left + r2.width / 2 - x1, dy = r2.top + r2.height / 2 - y1;
    const el = h('div', { class: 'fly-sticker' + (isSuper(emoji) ? ' super' : '') }, emoji);
    el.style.left = x1 + 'px'; el.style.top = y1 + 'px';
    fx.append(el);
    const anim = el.animate([
      { transform: 'translate(-50%, -50%) scale(.6)', opacity: 1 },
      { transform: 'translate(-50%, -50%) scale(1.7) rotate(-10deg)', opacity: 1, offset: 0.3 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.4) rotate(20deg)`, opacity: 0.9 },
    ], { duration: 1200, easing: 'ease-in-out' });
    anim.onfinish = () => { el.remove(); updateCounter(lang); Sfx.tap(); };
  }
  // Üst üste 3 doğruda: ekranın ortasında parlak süper çıkartma
  async function superSticker(lang) {
    const [e] = pick(SUPER_STICKERS);
    const info = stickerInfo(lang, e);
    const st = h('div', { class: 'super-sticker' }, e);
    const box = h('div', { class: 'super-pop' }, st);
    fx.append(box);
    Sfx.win(); confetti(25);
    await Promise.all([sayBoth(lang, `${LANGS[lang].phrases.superSticker} ${info.w}!`, info.o), wait(2200)]);
    await wait(250);
    giveSticker(lang, e, st);
    box.remove();
  }

  // ---------- screen plumbing ----------
  const show = (el) => {
    Speech.stop();
    app.replaceChildren(el);
  };
  const tap = (fn) => (e) => { Sfx.tap(); fn(e); };

  const topbar = (lang, back, ...extra) => h('div', { class: 'topbar' },
    back ? h('button', { class: 'icon-btn', 'aria-label': 'Geri', onclick: tap(back) }, '⬅️') : null,
    h('button', { class: 'icon-btn', 'aria-label': 'Ana sayfa', onclick: tap(home) }, '🏠'),
    h('div', { class: 'spacer' }),
    ...extra,
    lang ? h('div', { class: 'star-count' }, '📒', h('span', { class: 'count' }, String(state.stickers[lang].length))) : null,
  );

  // ---------- HOME ----------
  function home() {
    const lock = h('button', { class: 'parent-lock', 'aria-label': 'Ebeveyn' }, '🔒');
    let timer = null;
    const start = (e) => { e.preventDefault(); lock.classList.add('holding'); timer = setTimeout(() => { lock.classList.remove('holding'); parentPanel(); }, 1500); };
    const cancel = () => { lock.classList.remove('holding'); clearTimeout(timer); };
    lock.addEventListener('pointerdown', start);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => lock.addEventListener(ev, cancel));

    const choose = (lang) => () => { Sfx.ensure(); Sfx.tap(); letterMap(lang, true); };
    show(h('div', { class: 'screen home' },
      h('div', { class: 'mascot' }, '🦉'),
      h('h1', { class: 'home-title' }, ...'ABC ABC'.split('').map((c) => h('span', {}, c))),
      h('div', { class: 'lang-choices' },
        h('button', { class: 'lang-btn en', onclick: choose('en'), 'aria-label': 'English' }, h('span', { class: 'flag' }, LANGS.en.flag), h('span', { class: 'abc' }, 'A B C')),
        h('button', { class: 'lang-btn tr', onclick: choose('tr'), 'aria-label': 'Türkçe' }, h('span', { class: 'flag' }, LANGS.tr.flag), h('span', { class: 'abc' }, 'A B C Ç')),
      ),
      lock,
    ));
  }

  // ---------- LETTER MAP ----------
  function letterMap(lang, greet = false) {
    const P = LANGS[lang].phrases;
    const up = upToIndex(lang);
    const tiles = LANGS[lang].letters.map((L, i) => {
      const n = stat(lang, L).modes.length;
      return h('button', {
        class: `letter-tile ${colorOf(lang, L)} ${i > up ? 'ahead' : ''} ${i === up ? 'current' : ''}`,
        'aria-label': L.u,
        onclick: tap(() => letterHome(lang, L)),
      }, h('span', {}, L.u, h('small', {}, L.l)), h('span', { class: 'stars' }, '⭐'.repeat(n)));
    });
    show(h('div', { class: 'screen' },
      topbar(lang, null),
      h('div', { class: 'map-body' },
        h('button', { class: 'play-mixed', 'aria-label': 'Oyna', onclick: tap(() => mixedPlay(lang)) }, h('span', { class: 'mascot-sm' }, '🦉'), '▶️', '🎲'),
        h('div', { class: 'letter-grid' }, tiles),
      ),
    ));
    const counter = app.querySelector('.star-count');
    counter.classList.add('clickable');
    counter.addEventListener('click', tap(() => album(lang)));
    const cur = app.querySelector('.letter-tile.current');
    if (cur) cur.scrollIntoView({ block: 'center' });
    Speech.say(greet ? `${P.welcome} ${P.pickLetter}` : P.pickLetter, lang);
  }

  // ---------- LETTER HOME ----------
  const MODES = [
    { key: 'meet', icon: '👀', run: (lang, L) => meet(lang, L) },
    { key: 'find', icon: '🔍', run: (lang, L) => rounds(lang, Array(5).fill(0).map(() => ({ type: 'find', L })), { L, mode: 'find' }) },
    { key: 'listen', icon: '👂', run: (lang, L) => rounds(lang, Array(5).fill(0).map(() => ({ type: 'listen', L })), { L, mode: 'listen' }) },
    { key: 'memory', icon: '🃏', run: (lang, L) => memory(lang, L) },
  ];

  function letterHome(lang, L) {
    const P = LANGS[lang].phrases;
    const letters = LANGS[lang].letters;
    const i = letters.indexOf(L);
    const s = stat(lang, L);
    const sayIntro = () => Speech.say(P.letterIntro(L, pick(L.words)[0]), lang);
    const big = h('button', { class: `big-letter ${colorOf(lang, L)}`, onclick: () => { Sfx.tap(); sayIntro(); } }, L.u, h('small', {}, L.l));
    show(h('div', { class: 'screen letter-home' },
      topbar(lang, () => letterMap(lang)),
      h('div', { class: 'letter-stage' },
        h('button', { class: 'nav-arrow', disabled: i === 0, style: i === 0 ? 'visibility:hidden' : null, onclick: tap(() => letterHome(lang, letters[i - 1])) }, '◀️'),
        big,
        h('button', { class: 'nav-arrow', style: i === letters.length - 1 ? 'visibility:hidden' : null, onclick: tap(() => letterHome(lang, letters[i + 1])) }, '▶️'),
      ),
      h('div', { class: 'mode-row' }, MODES.map((m) =>
        h('button', { class: `mode-btn ${s.modes.includes(m.key) ? 'done' : ''}`, 'aria-label': m.key, onclick: tap(() => m.run(lang, L)) }, m.icon))),
    ));
    sayIntro();
  }

  // ---------- MODE: MEET ----------
  function meet(lang, L) {
    const P = LANGS[lang].phrases;
    const words = shuffle(L.words).slice(0, 8);
    const seen = new Set();
    let finished = false;
    const cards = words.map(([w, e, o]) => {
      const card = h('button', { class: 'meet-card' }, h('span', { class: 'emoji' }, e), wordLabel(w, L, lang), otherLabel(lang, o));
      card.addEventListener('click', async () => {
        Sfx.tap();
        card.classList.remove('bounce'); void card.offsetWidth; card.classList.add('bounce');
        card.classList.add('seen');
        seen.add(w);
        const ok = await sayBoth(lang, P.isFor(L, w), o);
        if (ok && card.isConnected && !finished && seen.size === words.length) { finished = true; await wait(300); reward(lang, L, 'meet', () => meet(lang, L)); }
      });
      return card;
    });
    show(h('div', { class: 'screen' },
      topbar(lang, () => letterHome(lang, L), h('div', { class: `prompt-letter ${colorOf(lang, L)}`, style: 'font-size:56px;padding:4px 22px;border-radius:22px' }, L.u, h('small', {}, L.l))),
      h('div', { class: 'meet-grid' }, cards),
    ));
    Speech.say(P.meetIntro(L), lang);
  }

  function wordLabel(word, L, lang) {
    const span = h('span', { class: 'word' });
    [...word].forEach((ch, i) => {
      const hit = L.contains ? lower(ch, lang) === L.l : i === 0;
      span.append(hit ? h('b', {}, ch) : ch);
    });
    return span;
  }

  const otherLabel = (lang, o) => (state.settings.bilingual && o
    ? h('span', { class: 'word2' }, `${LANGS[otherLang(lang)].flag} ${o}`) : null);

  // ---------- MODE: ROUNDS (find picture / find letter) ----------
  function pickDistractorWords(lang, L, n) {
    const pool = shuffle(LANGS[lang].letters.filter((x) => x !== L).flatMap((x) => x.words.map(([w, e, o]) => ({ w, e, o, x }))))
      .filter((o) => !matches(o.w, L, lang));
    const out = []; const usedLetters = new Set();
    for (const o of pool) { if (out.length >= n) break; if (usedLetters.has(o.x)) continue; usedLetters.add(o.x); out.push(o); }
    return out;
  }
  function pickDistractorLetters(lang, L, n) {
    const letters = LANGS[lang].letters;
    const up = upToIndex(lang);
    const known = letters.filter((x, i) => x !== L && i <= up + 2);
    const rest = letters.filter((x, i) => x !== L && i > up + 2);
    // mostly known letters, sometimes others
    return shuffle([...shuffle(known).slice(0, n), ...shuffle(rest).slice(0, 1)]).slice(0, n);
  }

  function rounds(lang, specs, meta) {
    const P = LANGS[lang].phrases;
    let idx = 0, streak = 0;
    const wordQueues = new Map();
    const nextWord = (L) => {
      let q = wordQueues.get(L);
      if (!q || !q.length) { q = shuffle(L.words); wordQueues.set(L, q); }
      return q.pop();
    };
    const back = () => (meta.L ? letterHome(lang, meta.L) : letterMap(lang));
    const restart = () => (meta.L ? MODES.find((m) => m.key === meta.mode).run(lang, meta.L) : mixedPlay(lang));
    const dots = () => h('div', { class: 'progress-dots' }, specs.map((_, i) => h('i', { class: i < idx ? 'on' : i === idx ? 'now' : '' })));

    const renderRound = () => {
      if (idx >= specs.length) { reward(lang, meta.L, meta.mode, restart); return; }
      const { type, L } = specs[idx];
      const s = stat(lang, L);
      let firstTry = true, locked = false;
      const speakBtn = h('button', { class: 'speak-btn', 'aria-label': 'Tekrar dinle' }, '🔊');
      let promptText;
      let optionsEl;

      const say = async (text) => {
        speakBtn.classList.add('talking');
        const r = await Speech.say(text, lang);
        speakBtn.classList.remove('talking');
        return r;
      };

      const onCorrect = async (btn, word, emoji, o) => {
        locked = true;
        Sfx.good();
        btn.classList.add('correct');
        let superNow = false;
        if (firstTry) {
          s.c++; streak++;
          giveSticker(lang, emoji, btn); // doğru bildikçe çıkartma
          superNow = streak % 3 === 0;
        }
        save();
        speakBtn.classList.add('talking');
        await Promise.all([sayBoth(lang, `${pick(P.praise)} ${P.isFor(L, word)}`, o), wait(1400)]);
        speakBtn.classList.remove('talking');
        if (!btn.isConnected) return;
        if (superNow) await superSticker(lang);
        await wait(350);
        if (!btn.isConnected) return; // kullanıcı ekrandan çıktıysa
        idx++; renderRound();
      };
      const onWrong = (btn, text) => {
        firstTry = false; streak = 0;
        s.w++; save();
        Sfx.bad();
        btn.classList.add('wrong'); btn.disabled = true;
        say(text);
      };

      if (type === 'find') {
        const [cw, ce, co] = nextWord(L);
        const opts = shuffle([{ w: cw, e: ce, o: co, ok: true }, ...pickDistractorWords(lang, L, 2)]);
        promptText = P.findPrompt(L);
        optionsEl = h('div', { class: 'options' }, opts.map((o) => {
          const label = h('span', { class: 'word' });
          const btn = h('button', { class: 'option', 'aria-label': o.w }, h('span', { class: 'emoji' }, o.e), label);
          btn.addEventListener('click', () => {
            if (locked) return;
            label.replaceWith(wordLabel(o.w, o.ok ? L : o.x, lang));
            if (o.ok) { const ol = otherLabel(lang, o.o); if (ol) btn.append(ol); }
            if (o.ok) onCorrect(btn, o.w, o.e, o.o); else onWrong(btn, P.tryAgainWord(o.w));
          });
          return btn;
        }));
        show(h('div', { class: 'screen' },
          topbar(lang, back, dots()),
          h('div', { class: 'prompt-row' }, h('div', { class: `prompt-letter ${colorOf(lang, L)}` }, L.u, h('small', {}, L.l)), speakBtn),
          optionsEl,
        ));
      } else {
        const [cw, ce, co] = nextWord(L);
        const opts = shuffle([{ L, ok: true }, ...pickDistractorLetters(lang, L, 2).map((x) => ({ L: x }))]);
        promptText = P.findLetter(L);
        optionsEl = h('div', { class: 'options' }, opts.map((o) => {
          const btn = h('button', { class: 'option', 'aria-label': o.L.u }, letterFace(o.L));
          btn.addEventListener('click', () => {
            if (locked) return;
            if (o.ok) {
              btn.append(h('span', { class: 'word' }, `${ce} ${cw}`)); // harfin örnek kelimesini göster
              onCorrect(btn, cw, ce, co);
            } else onWrong(btn, P.tryAgainLetter(o.L));
          });
          return btn;
        }));
        show(h('div', { class: 'screen' },
          topbar(lang, back, dots()),
          h('div', { class: 'prompt-row' }, h('div', { class: 'mascot', style: 'font-size:min(16vmin,130px)' }, '🦉'), speakBtn),
          optionsEl,
        ));
      }
      speakBtn.addEventListener('click', () => { Sfx.tap(); say(promptText); });
      say(promptText);
    };
    renderRound();
  }

  // ---------- MIXED PLAY (adaptive) ----------
  function weightedPick(lang, exclude) {
    const letters = LANGS[lang].letters;
    const up = upToIndex(lang);
    const items = letters.map((L, i) => {
      if (L === exclude) return { L, w: 0 };
      const s = stat(lang, L);
      let w = i <= up ? 3 : i <= up + 2 ? 0.7 : 0; // kreşte öğrenilenler + sıradaki 2 harf (önden gitme)
      w *= 1 + Math.max(0, s.w - s.c * 0.5) * 0.4; // zorlanılan harfler daha sık
      if (i <= up && s.c + s.w === 0) w *= 1.5;  // hiç oynanmamış öğrenilmiş harf
      return { L, w };
    });
    const total = items.reduce((a, b) => a + b.w, 0);
    let r = Math.random() * total;
    for (const it of items) { if ((r -= it.w) <= 0) return it.L; }
    return letters[0];
  }
  function mixedPlay(lang) {
    const specs = [];
    let prev = null;
    for (let i = 0; i < 8; i++) {
      const L = weightedPick(lang, prev);
      specs.push({ type: i % 2 ? 'listen' : 'find', L });
      prev = L;
    }
    rounds(lang, specs, { L: null, mode: 'mixed' });
  }

  // ---------- MODE: MEMORY ----------
  function memory(lang, L) {
    const P = LANGS[lang].phrases;
    const others = pickDistractorLetters(lang, L, 2);
    const set = [L, ...others];
    const cards = shuffle(set.flatMap((x) => {
      const [w, e, o] = pick(x.words);
      return [{ L: x, kind: 'letter' }, { L: x, kind: 'pic', w, e, o }];
    }));
    let open = [], matched = 0, busy = false;
    const els = cards.map((c) => {
      const front = c.kind === 'letter' ? letterFace(c.L) : h('span', { class: 'emoji' }, c.e);
      const el = h('button', { class: 'mem-card', 'aria-label': 'kart' },
        h('div', { class: 'mem-inner' }, h('div', { class: 'mem-face mem-back' }, '🦉'), h('div', { class: 'mem-face mem-front' }, front)));
      el.addEventListener('click', async () => {
        if (busy || el.classList.contains('flipped')) return;
        Sfx.flip();
        el.classList.add('flipped');
        open.push({ c, el });
        Speech.say(c.kind === 'letter' ? c.L.name : c.w, lang);
        if (open.length < 2) return;
        busy = true;
        const [a, b] = open; open = [];
        if (a.c.L === b.c.L) {
          await wait(500);
          Sfx.good();
          a.el.classList.add('matched'); b.el.classList.add('matched');
          const pic = a.c.kind === 'pic' ? a : b;
          stat(lang, a.c.L).c++; save();
          giveSticker(lang, pic.c.e, pic.el);
          await sayBoth(lang, `${pick(P.praise)} ${P.isFor(a.c.L, pic.c.w)}`, pic.c.o);
          matched++;
          busy = false;
          if (el.isConnected && matched === set.length) { await wait(300); reward(lang, L, 'memory', () => memory(lang, L)); }
        } else {
          await wait(1100);
          a.el.classList.remove('flipped'); b.el.classList.remove('flipped');
          busy = false;
        }
      });
      return el;
    });
    show(h('div', { class: 'screen' },
      topbar(lang, () => letterHome(lang, L)),
      h('div', { class: 'memory-grid' }, els),
    ));
    Speech.say(P.memoryIntro, lang);
  }

  // ---------- REWARD ----------
  function reward(lang, L, mode, again) {
    const P = LANGS[lang].phrases;
    const src = L || weightedPick(lang);
    const [sw, sticker, so] = pick(src.words);
    state.stickers[lang].push(sticker);
    if (L && mode) { const s = stat(lang, L); if (!s.modes.includes(mode)) s.modes.push(mode); }
    save();
    const next = () => (L ? letterHome(lang, L) : letterMap(lang));
    show(h('div', { class: 'screen reward' },
      h('button', { class: 'sticker', onclick: () => sayBoth(lang, sw, so) }, sticker),
      h('div', { class: 'reward-stars' }, '⭐⭐⭐'),
      h('div', { class: 'reward-actions' },
        h('button', { 'aria-label': 'Tekrar', onclick: tap(again) }, '🔁'),
        h('button', { 'aria-label': 'Devam', onclick: tap(next) }, '✅'),
      ),
    ));
    Sfx.win(); confetti();
    sayBoth(lang, `${pick(P.done)} ${sw}!`, so);
  }

  // ---------- ALBUM ----------
  function album(lang) {
    const counts = new Map();
    state.stickers[lang].forEach((e) => counts.set(e, (counts.get(e) || 0) + 1));
    const entries = [...counts.entries()].sort((a, b) => isSuper(b[0]) - isSuper(a[0]));
    const items = entries.map(([e, n]) => {
      const info = stickerInfo(lang, e);
      const el = h('button', { class: 'album-item' + (isSuper(e) ? ' super' : ''), 'aria-label': info.w },
        e, n > 1 ? h('b', {}, '×' + n) : null);
      el.addEventListener('click', () => {
        el.classList.remove('wiggle'); void el.offsetWidth; el.classList.add('wiggle');
        sayBoth(lang, info.w, info.o);
      });
      return el;
    });
    show(h('div', { class: 'screen' },
      topbar(lang, () => letterMap(lang)),
      items.length ? h('div', { class: 'album-grid' }, items) : h('div', { class: 'album-empty' }, '📒'),
    ));
    Speech.say(LANGS[lang].phrases.album, lang);
  }

  // ---------- PARENT PANEL ----------
  function parentPanel(tab = 'en') {
    const body = h('div');
    const render = () => {
      const lang = tab;
      const S = state.settings[lang];
      const letters = LANGS[lang].letters;

      const upSel = h('select', {}, letters.map((L) => h('option', { value: L.u, selected: L.u === S.upTo }, L.u)));
      upSel.addEventListener('change', () => { S.upTo = upSel.value; save(); });

      const voices = Speech.voicesFor(lang);
      const current = Speech.choose(lang);
      const voiceSel = h('select', {},
        voices.length ? voices.map((v) => h('option', { value: v.name, selected: current && v.name === current.name }, `${v.name} (${v.lang})`))
          : h('option', {}, 'Bu dilde ses bulunamadı'));
      voiceSel.addEventListener('change', () => { S.voice = voiceSel.value; save(); });

      const bi = h('input', { type: 'checkbox', checked: state.settings.bilingual });
      bi.addEventListener('change', () => { state.settings.bilingual = bi.checked; save(); });

      const rate = h('input', { type: 'range', min: '0.6', max: '1.1', step: '0.05', value: String(state.settings.rate) });
      rate.addEventListener('change', () => { state.settings.rate = parseFloat(rate.value); save(); });

      const rows = letters.map((L) => {
        const s = state.stats[lang][L.u] || { c: 0, w: 0, modes: [] };
        const weak = s.w > s.c && s.w >= 2;
        return h('tr', { class: weak ? 'weak' : '' },
          h('td', {}, L.u + L.l), h('td', {}, '⭐'.repeat(s.modes.length) || '–'), h('td', {}, String(s.c)), h('td', {}, String(s.w)));
      });

      body.replaceChildren(
        h('div', { class: 'tabs' },
          h('button', { class: tab === 'en' ? 'on' : '', onclick: () => { tab = 'en'; render(); } }, '🇺🇸 English'),
          h('button', { class: tab === 'tr' ? 'on' : '', onclick: () => { tab = 'tr'; render(); } }, '🇹🇷 Türkçe')),
        h('div', { class: 'panel' },
          h('h2', {}, 'Kreşte gelinen harf'),
          h('label', {}, 'Son öğrenilen harf:', upSel),
          h('p', { class: 'hint' }, 'Bu harfe kadar olanlar karışık oyunda sık sorulur, zorlandığı harfler daha da sık gelir. Sonraki 2 harf "önden gitmek" için ara sıra karışık oyuna girer. Tüm harfler haritada her zaman açıktır, sonrakiler ✨ ile işaretlidir.')),
        h('div', { class: 'panel' },
          h('h2', {}, 'Ses'),
          h('label', {}, 'Ses:', voiceSel, h('button', { class: 'small-btn', onclick: () => Speech.say(LANGS[lang].phrases.letterIntro(letters[0], letters[0].words[0][0]), lang) }, '▶︎ Dene')),
          h('label', {}, 'Konuşma hızı:', rate),
          h('label', {}, bi, 'Kelimeyi diğer dilde de söyle (Bear → Ayı)'),
          h('p', { class: 'hint' }, 'Daha doğal ses için iPad\'de: Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler. İngilizce (ABD) için örneğin "Samantha (Gelişmiş)" ya da "Ava (Premium)", Türkçe için "Yelda (Gelişmiş)" sesini indirin. Sonra bu sayfayı yeniden açıp seçin.')),
        h('div', { class: 'panel' },
          h('h2', {}, 'İlerleme'),
          h('p', { class: 'hint' }, `Toplam çıkartma: ${state.stickers[lang].length}. ⭐ = tamamlanan oyun türü (en fazla 4). Kırmızı satırlar: zorlandığı harfler.`),
          h('table', { class: 'stats-table' }, h('tr', {}, h('th', {}, 'Harf'), h('th', {}, 'Oyunlar'), h('th', {}, '✔ Doğru'), h('th', {}, '✖ Yanlış')), rows)),
        h('div', { class: 'panel' },
          h('button', { class: 'small-btn danger', onclick: () => {
            if (confirm(`${LANGS[lang].label} ilerlemesi ve çıkartmaları silinsin mi?`)) { state.stats[lang] = {}; state.stickers[lang] = []; save(); render(); }
          } }, `${LANGS[lang].label} ilerlemesini sıfırla`)),
      );
    };
    render();
    show(h('div', { class: 'screen parent' }, topbar(null, null), h('h1', {}, '👨‍👩‍👦 Ebeveyn Paneli'), body));
  }

  // ---------- boot ----------
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('dblclick', (e) => e.preventDefault());
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  home();
})();
