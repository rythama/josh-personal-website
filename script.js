(() => {
  const S = window.SITE;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n, len = 2) => String(n).padStart(len, "0");

  // Tiny DOM builder — keeps content out of innerHTML.
  function h(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(c));
    }
    return el;
  }

  /* ------------------------------------------------------------------------
     Identity
     ------------------------------------------------------------------------ */
  const fullName = `${S.firstName} ${S.lastName}`.trim();
  document.title = `${fullName} — Film & Photography`;
  $$("[data-fullname]").forEach((el) => (el.textContent = fullName));
  $("[data-first]").textContent = S.firstName;
  $("[data-last]").textContent = S.lastName;
  $("[data-roles]").textContent = S.roles;
  $("[data-affiliation]").textContent = S.affiliation || "";
  $("[data-location]").textContent = S.location;
  $("[data-location-short]").textContent = S.location.split(",")[0];
  $("[data-intro]").textContent = S.intro;
  $("[data-year]").textContent = new Date().getFullYear();

  const email = $("[data-email]");
  email.textContent = S.email;
  email.href = `mailto:${S.email}`;

  $("[data-socials]").append(
    ...S.socials.map((s) => h("li", {}, h("a", { href: s.url, target: "_blank", rel: "noopener" }, s.label)))
  );

  /* ------------------------------------------------------------------------
     Nav: solid once scrolled, hides on scroll down, returns on scroll up
     ------------------------------------------------------------------------ */
  const nav = $(".nav");
  const stillsSection = $(".stills");
  let lastY = scrollY;
  function updateNav() {
    const y = scrollY;
    const navH = nav.offsetHeight;
    nav.classList.toggle("scrolled", y > 10);
    if (Math.abs(y - lastY) > 4) {
      nav.classList.toggle("tucked", y > lastY && y > navH * 2);
      lastY = y;
    }
    const r = stillsSection.getBoundingClientRect();
    nav.classList.toggle("on-dark", r.top < navH && r.bottom > navH);
  }
  addEventListener("scroll", updateNav, { passive: true });
  // Show the bar again when a nav link is used.
  $$(".nav a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("tucked")));

  /* ------------------------------------------------------------------------
     Smooth, eased scrolling for every in-page link (nav, "Roll film",
     "Back to top"). Our own animation so it glides the same everywhere.
     ------------------------------------------------------------------------ */
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let scrollAnim = null;
  function glideTo(y) {
    cancelAnimationFrame(scrollAnim);
    const startY = scrollY;
    const dist = y - startY;
    if (reduceMotion || Math.abs(dist) < 2) { scrollTo(0, y); return; }
    // Longer trips take a little longer, within reason.
    const duration = Math.min(1400, Math.max(600, Math.abs(dist) * 0.35));
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      scrollTo(0, startY + dist * easeInOut(t));
      if (t < 1) scrollAnim = requestAnimationFrame(step);
    };
    scrollAnim = requestAnimationFrame(step);
  }
  // A wheel or touch from the visitor cancels the glide.
  ["wheel", "touchstart", "keydown"].forEach((ev) =>
    addEventListener(ev, () => cancelAnimationFrame(scrollAnim), { passive: true })
  );

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const id = link.getAttribute("href").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target && id) return;
    e.preventDefault();
    const y = target ? target.getBoundingClientRect().top + scrollY : 0;
    glideTo(Math.max(0, Math.min(y, document.documentElement.scrollHeight - innerHeight)));
    history.pushState(null, "", `#${id || "top"}`);
  });
  updateNav();

  /* ------------------------------------------------------------------------
     Hero entrance: start a frame after load so the reveal transitions run
     ------------------------------------------------------------------------ */
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("is-loading")));

  /* ------------------------------------------------------------------------
     Hero viewfinder: slideshow + running timecode
     ------------------------------------------------------------------------ */
  // Hero rotates through his films (add `hero: false` to skip one).
  const slides = S.films.filter((f) => f.still && f.hero !== false).map((f) => ({ src: f.still, label: f.title }));
  const slideWrap = $(".vf-slides");
  const caption = $(".vf-caption");
  const slideEls = slides.map((s, i) => {
    const img = h("img", { src: s.src, alt: "" });
    slideWrap.append(img);
    return img;
  });
  let slideIdx = 0;
  let prevIdx = -1;
  function showSlide(i) {
    slideEls.forEach((el, j) => {
      el.classList.toggle("on", j === i);
      el.classList.toggle("prev", j === prevIdx);
    });
    prevIdx = i;
    caption.replaceChildren(h("span", {}, `${pad(i + 1)}/${pad(slides.length)}  ${slides[i].label.toUpperCase()}`));
  }
  if (slides.length) {
    showSlide(0);
    if (!reduceMotion && slides.length > 1) {
      setInterval(() => showSlide((slideIdx = (slideIdx + 1) % slides.length)), 3800);
    }
  }

  const tc = $(".vf-tc");
  const start = performance.now();
  (function tick(now) {
    const t = (now - start) / 1000;
    const f = Math.floor(t * 24) % 24;
    const s = Math.floor(t) % 60;
    const m = Math.floor(t / 60) % 60;
    const hh = Math.floor(t / 3600);
    tc.textContent = `${pad(hh)}:${pad(m)}:${pad(s)}:${pad(f)}`;
    requestAnimationFrame(tick);
  })(start);

  /* ------------------------------------------------------------------------
     Films
     ------------------------------------------------------------------------ */
  $("[data-film-count]").textContent = `(${pad(S.films.length)})`;

  const filmList = $(".film-list");
  S.films.forEach((film, i) => {
    filmList.append(
      h("li", { "data-reveal": true },
        h("button", { class: "film-row", "data-index": i, onclick: () => openFilm(i) },
          h("img", { class: "fr-thumb", src: film.still, alt: "", loading: "lazy" }),
          h("span", { class: "fr-num" }, pad(i + 1)),
          h("span", { class: "fr-title" }, film.title),
          h("span", { class: "fr-role" }, film.role || film.format || ""),
          h("span", { class: "fr-kind" }, [film.kind, film.runtime].filter(Boolean).join(" · ")),
          h("span", { class: "fr-year" }, film.year),
          h("span", { class: "fr-arrow", "aria-hidden": "true" }, "→")
        )
      )
    );
  });

  /* ------------------------------------------------------------------------
     Stills — contact sheets
     ------------------------------------------------------------------------ */
  const allPhotos = S.series.flatMap((series) => series.photos.map((p) => ({ ...p, series })));
  $("[data-photo-count]").textContent = `(${pad(allPhotos.length)})`;

  // A slightly wobbly loop that overshoots its start, like a quick grease-pencil mark.
  const GREASE_PATH = "M 78 8 C 120 4, 147 14, 145.5 48 C 144 84, 105 96, 69 94 C 27 92, 4.5 76, 6 48 C 7.5 22, 33 6, 87 5 C 99 5, 108 7, 114 10";
  const grease = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "grease");
    svg.setAttribute("viewBox", "0 0 150 100");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", GREASE_PATH);
    path.setAttribute("pathLength", "1");
    svg.append(path);
    return svg;
  };

  const sheets = $(".sheets");
  let photoIdx = 0;
  let frameNo = 1;
  S.series.forEach((series) => {
    const edgeText = `${S.lastName.toUpperCase()} ${(series.stock || "").toUpperCase()}`;
    const frames = series.photos.map((photo) => {
      const idx = photoIdx++;
      const n = frameNo++;
      return h("li", {},
        h("span", { class: "edge top" }, idx % 2 === 0 ? edgeText : ""),
        h("button", {
            class: "frame",
            "aria-label": `${photo.caption}${photo.place ? `, ${photo.place}` : ""}`,
            onclick: () => openPhoto(idx),
          },
          h("span", { class: "frame-clip" }, h("img", {
            src: photo.src, alt: photo.caption || "", loading: "lazy", draggable: "false",
            // Let the frame take the photo's own shape (portraits stay portrait)
            onload: (e) => (e.target.closest(".frame").style.aspectRatio = `${e.target.naturalWidth} / ${e.target.naturalHeight}`),
          })),
          grease()
        ),
        h("span", { class: "edge bottom" }, `▸ ${n}`, h("b", {}, `${n}A`))
      );
    });

    sheets.append(
      h("article", { class: "series", "data-reveal": true },
        h("header", { class: "series-head" },
          h("h3", {}, series.title),
          h("span", { class: "series-meta" },
            [series.year, series.stock, `${pad(series.photos.length)} frames`].filter(Boolean).join("  ·  ")),
          series.note && h("p", { class: "series-note" }, series.note),
          series.description && h("p", { class: "series-desc" }, series.description)
        ),
        h("div", { class: "strip" }, h("ol", {}, frames))
      )
    );
  });

  // Click-and-drag to scroll strips with a mouse (touch already scrolls natively).
  $$(".strip").forEach((strip) => {
    let startX = 0, startScroll = 0, down = false, moved = false;
    strip.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false;
      startX = e.clientX;
      startScroll = strip.scrollLeft;
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; strip.classList.add("dragging"); }
      if (moved) strip.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      // Wait a tick so the click that ends a drag doesn't open the lightbox.
      setTimeout(() => strip.classList.remove("dragging"), 0);
    });
  });

  /* ------------------------------------------------------------------------
     Footer clock
     ------------------------------------------------------------------------ */
  const clock = $("[data-clock]");
  let fmt;
  try {
    fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: S.timezone });
  } catch {
    fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  const updateClock = () => (clock.textContent = fmt.format(new Date()));
  updateClock();
  setInterval(updateClock, 15000);

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------------ */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }),
    { rootMargin: "0px 0px -10% 0px" }
  );
  $$("[data-reveal]").forEach((el) => io.observe(el));

  /* ------------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------------ */
  const lb = $(".lightbox");
  const stage = $(".lb-stage");
  const info = $(".lb-info");
  const count = $(".lb-count");
  let mode = null, current = 0, lastFocus = null;

  function embedUrl(url) {
    if (!url) return null;
    let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1`;
    return null;
  }

  function renderFilm(i) {
    const f = S.films[i];
    const embed = embedUrl(f.video);
    stage.replaceChildren(
      embed
        ? h("div", { class: "lb-video" },
            h("iframe", { src: embed, title: f.title, allow: "autoplay; fullscreen; picture-in-picture", allowfullscreen: true }))
        : h("div", { class: "lb-poster" },
            h("img", { src: f.still, alt: f.title }),
            f.video
              ? h("a", { href: f.video, target: "_blank", rel: "noopener" }, h("span", {}, "Watch ↗"))
              : h("span", {}, "Coming soon"))
    );
    info.replaceChildren(
      h("h3", {}, f.title),
      h("span", { class: "meta" }, [f.year, f.kind, f.runtime, f.role, f.format].filter(Boolean).join("  ·  ")),
      f.description ? h("p", {}, f.description) : ""
    );
    count.textContent = `${pad(i + 1)} / ${pad(S.films.length)}`;
  }

  function renderPhoto(i) {
    const p = allPhotos[i];
    stage.replaceChildren(h("img", { src: p.src, alt: p.caption || "" }));
    info.replaceChildren(
      h("h3", {}, p.caption || p.series.title),
      h("span", { class: "meta" }, [p.series.title, p.place, p.series.year].filter(Boolean).join("  ·  ")),
      (p.description || p.series.description) ? h("p", {}, p.description || p.series.description) : ""
    );
    count.textContent = `${pad(i + 1)} / ${pad(allPhotos.length)}`;
  }

  const total = () => (mode === "film" ? S.films.length : allPhotos.length);
  const render = () => (mode === "film" ? renderFilm(current) : renderPhoto(current));

  function open(m, i) {
    mode = m;
    current = i;
    lastFocus = document.activeElement;
    render();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lb-close").focus();
  }
  function close() {
    lb.hidden = true;
    stage.replaceChildren(); // stops any playing video
    document.body.style.overflow = "";
    lastFocus?.focus();
  }
  function step(d) {
    current = (current + d + total()) % total();
    render();
  }

  function openFilm(i) { open("film", i); }
  function openPhoto(i) { open("photo", i); }

  $(".lb-close").addEventListener("click", close);
  $(".lb-prev").addEventListener("click", () => step(-1));
  $(".lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target === stage) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Tab") {
      // Keep focus inside the dialog.
      const items = $$("button, a, iframe", lb);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
