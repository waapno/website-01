/* ZLATORZ INDUSTRIES · BASE CAMP — interactions */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const html = document.documentElement;
  const body = document.body;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const inFrame = (() => { try { return window.self !== window.top; } catch { return true; } })();

  // "Return to stream" fallback when the visitor did not arrive from the stream.
  const STREAM_URL = $("#backToStream").getAttribute("href");

  /* ---------------------------------------------------------------
     i18n — English is default, Czech via the EN/CZ switch
     --------------------------------------------------------------- */
  const T = {
    en: {
      doc_title: "Zlatorz Industries · Base Camp — Support the Expedition",
      back: "Return to stream",
      camp_name: "Base camp",
      title1: "Support the",
      title2: "expedition",
      lead: "Outdoors, off-grid, no script. Every donation pushes the challenge one step further — pick your route.",
      r1_chip: "Recommended · CZ/SK",
      r1_sub: "Trigger a challenge live",
      r2_sub: "Classic tip with an on-stream message",
      r3_sub: "Support the Minecraft server",
      soon: "Soon",
      note: "<b>Czech &amp; Slovak viewers:</b> we strongly recommend LootElement.",
      campfire: "Campfire",
      hint: "Keys <kbd>1</kbd>–<kbd>5</kbd> quick route · <kbd>Esc</kbd> back to stream",
      toast_soon: "MC Network — trail is being marked. Soon!",
      load: "Locating base camp",
      welcome: "Welcome back to <b>base camp</b>",
      leave: "Heading to <b>{name}</b>",
      leave_stream: "Returning to <b>stream</b>",
      opened: "{name} opened in a new tab",
    },
    cs: {
      doc_title: "Zlatorz Industries · Base Camp — Podpoř výpravu",
      back: "Zpět na stream",
      camp_name: "Základní tábor",
      title1: "Podpoř",
      title2: "výpravu",
      lead: "Venku, v terénu, bez scénáře. Každý donate posouvá výzvu o krok dál — vyber si trasu.",
      r1_chip: "Doporučeno · CZ/SK",
      r1_sub: "Spusť výzvu naživo",
      r2_sub: "Klasický tip se zprávou na streamu",
      r3_sub: "Podpoř Minecraft server",
      soon: "Brzy",
      note: "<b>Čechům a Slovákům</b> jednoznačně doporučujeme LootElement.",
      campfire: "Táborák",
      hint: "Klávesy <kbd>1</kbd>–<kbd>5</kbd> rychlá trasa · <kbd>Esc</kbd> zpět na stream",
      toast_soon: "MC Network — trasa se vyznačuje. Brzy!",
      load: "Hledám základní tábor",
      welcome: "Vítej zpět v <b>táboře</b>",
      leave: "Míříš na <b>{name}</b>",
      leave_stream: "Návrat na <b>stream</b>",
      opened: "{name} otevřeno v nové záložce",
    },
  };
  let lang = html.dataset.lang === "cs" ? "cs" : "en";
  const t = (k, vars = {}) => (T[lang][k] || T.en[k] || k).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");

  function applyLang(next, animate) {
    lang = next;
    html.lang = next;
    html.dataset.lang = next;
    try { localStorage.setItem("zi-lang", next); } catch {}
    $$("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    $$("[data-lang-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.langBtn === next)));
    document.title = t("doc_title");
    $("#backToStream").setAttribute("aria-label", t("back"));
    if (animate && !reduced) {
      body.classList.remove("i18n-swap"); void body.offsetWidth; body.classList.add("i18n-swap");
      setTimeout(() => body.classList.remove("i18n-swap"), 600);
    }
  }
  $$("[data-lang-btn]").forEach((b) =>
    b.addEventListener("click", (e) => {
      if (b.dataset.langBtn !== lang) { applyLang(b.dataset.langBtn, true); burst(e.clientX, e.clientY, 8); }
    })
  );
  applyLang(lang, false);

  /* ---------------------------------------------------------------
     Veil — intro, exit and return transitions
     --------------------------------------------------------------- */
  const veil = $("#veil");
  const veilLabel = $("#veilLabel");
  const veilCoords = $("#veilCoords");
  const veilBar = $("#veilBar");
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  $$("[data-enter]").forEach((el, i) => el.style.setProperty("--i", i));

  function runBar(ms) {
    veilBar.classList.remove("is-run");
    veilBar.style.transform = "scaleX(0)";
    void veilBar.offsetWidth;
    veilBar.style.removeProperty("transform");
    veilBar.style.setProperty("--dur", ms + "ms");
    veilBar.classList.add("is-run");
  }

  let scrambleT;
  function scrambleCoords(ms) {
    clearInterval(scrambleT);
    const end = Date.now() + ms;
    const target = [50.0755, 14.4378];
    scrambleT = setInterval(() => {
      const left = Math.max(0, end - Date.now()) / ms;
      const a = (target[0] + (Math.random() - 0.5) * 40 * left).toFixed(4);
      const b = (target[1] + (Math.random() - 0.5) * 40 * left).toFixed(4);
      veilCoords.textContent = `${a}° N · ${b}° E`;
      if (left === 0) clearInterval(scrambleT);
    }, 40);
  }

  function enterPage() {
    body.classList.remove("is-leaving", "is-in");
    void body.offsetWidth;
    body.classList.add("is-in");
  }

  async function reveal(labelHtml, ms) {
    veilLabel.innerHTML = labelHtml;
    veil.classList.remove("is-out", "is-below");
    runBar(ms);
    scrambleCoords(ms);
    await wait(ms);
    veil.classList.add("is-out");
    enterPage();
    try { sessionStorage.setItem("zi-visited", "1"); } catch {}
  }

  async function leave(labelHtml, action) {
    if (body.classList.contains("is-leaving")) return;
    body.classList.add("is-leaving");
    veilLabel.innerHTML = labelHtml;
    veilCoords.textContent = "50.0755° N · 14.4378° E";
    veil.classList.remove("is-out");
    veil.classList.add("is-below");
    void veil.offsetWidth;
    veil.classList.remove("is-below");
    runBar(900);
    await wait(950);
    action();
  }

  // First paint / return visit
  const returning = html.classList.contains("is-return");
  const start = () => reveal(returning ? t("welcome") : t("load"), returning ? 650 : 1100);
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, wait(1200)]).then(start);
  } else start();

  // Back/forward cache: user came back from a donate page
  addEventListener("pageshow", (e) => {
    if (e.persisted) reveal(t("welcome"), 650);
  });

  /* ---------------------------------------------------------------
     Navigation with exit animation
     --------------------------------------------------------------- */
  function go(el, ev) {
    const url = el.href;
    const name = el.dataset.name || "";
    if (inFrame) {
      // Embedded preview: must open synchronously or browsers block the popup.
      window.open(url, "_blank", "noopener");
      leave(t("leave", { name }), () => {
        showToast(t("opened", { name }));
        reveal(t("welcome"), 450);
      });
      return;
    }
    if (ev) ev.preventDefault();
    leave(t("leave", { name }), () => { location.href = url; });
  }

  $$("[data-go]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // new tab / window: let the browser handle it
      ripple(el, e);
      burst(e.clientX, e.clientY, 12);
      go(el, e);
    });
  });

  // Return to stream
  const back = $("#backToStream");
  function goBack(e) {
    if (e) e.preventDefault();
    const fromOutside = document.referrer && !document.referrer.startsWith(location.origin);
    if (inFrame) {
      window.open(STREAM_URL, "_blank", "noopener");
      leave(t("leave_stream"), () => reveal(t("welcome"), 450));
      return;
    }
    leave(t("leave_stream"), () => {
      if (fromOutside && history.length > 1) history.back();
      else location.href = STREAM_URL;
    });
  }
  back.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    goBack(e);
  });

  /* ---------------------------------------------------------------
     Locked route (MC Network)
     --------------------------------------------------------------- */
  const toast = $("#toast");
  let toastT;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("is-on"), 2600);
  }
  function nope(card) {
    card.classList.remove("is-nope"); void card.offsetWidth; card.classList.add("is-nope");
    if (navigator.vibrate) navigator.vibrate(40);
    showToast(t("toast_soon"));
  }
  $$("[data-soon]").forEach((card) => {
    card.addEventListener("click", () => nope(card));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nope(card); } });
  });

  /* ---------------------------------------------------------------
     Keyboard shortcuts
     --------------------------------------------------------------- */
  addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
    if (e.key === "Escape") { goBack(); return; }
    const k = e.key.toLowerCase();
    if (k === "l") { applyLang(lang === "en" ? "cs" : "en", true); return; }
    const target = $(`[data-key="${e.key}"]`);
    if (!target) return;
    target.focus();
    if (target.hasAttribute("data-soon")) nope(target);
    else {
      const r = target.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 12);
      go(target);
    }
  });

  /* ---------------------------------------------------------------
     Pointer effects: headlamp, parallax, spotlight, magnetic buttons
     --------------------------------------------------------------- */
  const photo = $("[data-parallax]");
  const lamp = $(".bg__lamp");
  if (finePointer && !reduced) {
    let raf = 0, mx = 0, my = 0;
    addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        lamp.style.setProperty("--mx", mx + "px");
        lamp.style.setProperty("--my", my + "px");
        photo.style.setProperty("--px", (mx / innerWidth - 0.5) * -20 + "px");
        photo.style.setProperty("--py", (my / innerHeight - 0.5) * -14 + "px");
      });
    }, { passive: true });

    $$(".route, .pill").forEach((el) => {
      const strength = el.classList.contains("pill") ? 6 : 4;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        el.style.setProperty("--rx", x + "px");
        el.style.setProperty("--ry", y + "px");
        if (!el.classList.contains("route--locked")) {
          el.style.setProperty("--tx", ((x / r.width - 0.5) * strength).toFixed(2) + "px");
          el.style.setProperty("--ty", ((y / r.height - 0.5) * strength - 2).toFixed(2) + "px");
        }
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
      });
    });
  }

  // Ripple inside the clicked element
  function ripple(el, e) {
    if (reduced) return;
    const r = el.getBoundingClientRect();
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.left = (e.clientX || r.left + r.width / 2) - r.left + "px";
    s.style.top = (e.clientY || r.top + r.height / 2) - r.top + "px";
    el.appendChild(s);
    setTimeout(() => s.remove(), 750);
  }
  // Campfire spark burst
  const sparks = $("#sparks");
  function burst(x, y, n) {
    if (reduced || !x) return;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.className = "spark";
      const a = Math.random() * Math.PI * 2;
      const d = 30 + Math.random() * 60;
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--sx", Math.cos(a) * d + "px");
      p.style.setProperty("--sy", Math.sin(a) * d - 20 + "px");
      sparks.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }
  }
  $$("[data-soon]").forEach((c) => c.addEventListener("click", (e) => ripple(c, e)));

  /* ---------------------------------------------------------------
     Live clock + year + embers
     --------------------------------------------------------------- */
  const clock = $("#clock");
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Prague" });
  const tick = () => { clock.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 1000);
  $("#year").textContent = new Date().getFullYear();

  if (!reduced) {
    const box = $("#embers");
    const n = innerWidth < 720 ? 14 : 28;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "ember";
      s.style.left = Math.random() * 100 + "%";
      s.style.setProperty("--s", (1.5 + Math.random() * 2.5).toFixed(1) + "px");
      s.style.setProperty("--d", (8 + Math.random() * 10).toFixed(1) + "s");
      s.style.setProperty("--delay", (-Math.random() * 18).toFixed(1) + "s");
      s.style.setProperty("--dx", (Math.random() * 120 - 60).toFixed(0) + "px");
      s.style.setProperty("--o", (0.4 + Math.random() * 0.6).toFixed(2));
      box.appendChild(s);
    }
  }
})();
