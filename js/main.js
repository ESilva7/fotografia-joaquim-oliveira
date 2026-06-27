/* =========================================================================
   Fotografia Joaquim Oliveira — Comportamento do site
   (depende de js/data.js, carregado antes deste ficheiro)
   ========================================================================= */
(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const money = (n) => SITE.currency + new Intl.NumberFormat("pt-PT").format(n);

  /* ----------------------------------------------------------------------
     0) PREENCHER DADOS DO SITE (contactos, links, ano)
     ---------------------------------------------------------------------- */
  function hydrateSite() {
    const email = $("#contactEmail");
    if (email) { email.textContent = SITE.email; email.href = "mailto:" + SITE.email; }
    $("#contactLocation").textContent = SITE.location;
    $("#linkFacebook").href  = SITE.social.facebook;
    $("#linkInstagram").href = SITE.social.instagram;
    $("#footerTag").textContent = SITE.tagline;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------------------
     1) PRELOADER
     ---------------------------------------------------------------------- */
  function initPreloader() {
    const pre = $("#preloader");
    const hide = () => pre && pre.classList.add("is-done");
    window.addEventListener("load", () => setTimeout(hide, 350));
    setTimeout(hide, 2500); // fallback
  }

  /* ----------------------------------------------------------------------
     2) HEADER: estado ao fazer scroll + scrollspy
     ---------------------------------------------------------------------- */
  function initHeader() {
    const header = $("#header");
    const links = $$(".nav__link");
    const sections = links
      .map((l) => $(l.getAttribute("href")))
      .filter(Boolean);

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 60);
      $("#toTop").classList.toggle("is-visible", window.scrollY > 600);

      // scrollspy
      const pos = window.scrollY + window.innerHeight * 0.32;
      let current = sections[0];
      sections.forEach((s) => { if (s.offsetTop <= pos) current = s; });
      links.forEach((l) =>
        l.classList.toggle("is-active", l.getAttribute("href") === "#" + current.id)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------------------
     3) MENU MÓVEL
     ---------------------------------------------------------------------- */
  function initMobileMenu() {
    const burger = $("#burger");
    const nav = $("#nav");
    const toggle = (open) => {
      const willOpen = open ?? !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", willOpen);
      burger.classList.toggle("is-open", willOpen);
      burger.setAttribute("aria-expanded", String(willOpen));
    };
    burger.addEventListener("click", () => toggle());
    $$(".nav__link").forEach((l) => l.addEventListener("click", () => toggle(false)));
  }

  /* ----------------------------------------------------------------------
     4) REVEAL ON SCROLL + CONTADORES
     ---------------------------------------------------------------------- */
  function initReveal() {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            if (e.target.dataset.count !== undefined) animateCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal, [data-count]").forEach((el) => io.observe(el));
  }

  function animateCount(el) {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + (p === 1 ? "+" : "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ----------------------------------------------------------------------
     5) PARALLAX SUAVE DO HERO
     ---------------------------------------------------------------------- */
  function initParallax() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bg = $("#heroBg");
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) bg.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
      },
      { passive: true }
    );
  }

  /* ----------------------------------------------------------------------
     6) GALERIA + FILTROS + LIGHTBOX
     ---------------------------------------------------------------------- */
  let lightboxList = [];   // itens atualmente visíveis (para navegação)
  let lightboxIndex = 0;
  let lbProduct = null;    // poster atualmente aberto no lightbox

  // Converte um item da galeria num "produto" comprável (mesmos tamanhos da loja).
  function galleryProduct(idx) {
    const d = GALLERY[idx];
    return { id: "g" + idx, name: d.title, image: d.src };
  }
  function flashGalleryAdd(btn) {
    const original = btn.textContent;
    btn.textContent = "✓ No carrinho";
    btn.classList.add("is-added");
    setTimeout(() => { btn.textContent = original; btn.classList.remove("is-added"); }, 1100);
  }

  function buildGallery() {
    const filtersEl = $("#filters");
    const galleryEl = $("#gallery");

    FILTERS.forEach((f, i) => {
      const btn = document.createElement("button");
      btn.className = "filter" + (i === 0 ? " is-active" : "");
      btn.textContent = f.label;
      btn.dataset.filter = f.id;
      filtersEl.appendChild(btn);
    });

    GALLERY.forEach((item, i) => {
      const fig = document.createElement("figure");
      fig.className = "gallery__item";
      fig.dataset.category = item.category;
      fig.dataset.index = i;
      fig.innerHTML = `
        <img src="${item.src}" alt="${item.title}" style="aspect-ratio:${item.ratio || '5 / 7'}" />
        <span class="gallery__zoom">+</span>
        <figcaption class="gallery__cap">
          <strong>${item.title}</strong>
          <span>${item.meta}</span>
          <div class="gallery__buy">
            <span class="gallery__from"><small>A partir de</small>${money(POSTER_SIZES[0].price)}</span>
            <button class="gallery__add" data-add="${i}" aria-label="Adicionar ${item.title} ao carrinho">Adicionar</button>
          </div>
        </figcaption>`;
      galleryEl.appendChild(fig);
    });

    // animação escalonada de entrada
    const items = $$(".gallery__item");
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = +e.target.dataset.order || 0;
          setTimeout(() => e.target.classList.add("is-in"), idx * 70);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach((el, i) => { el.dataset.order = i % 6; io.observe(el); });

    // filtros
    filtersEl.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".filter");
      if (!btn) return;
      $$(".filter").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      items.forEach((it) => {
        const show = f === "todos" || it.dataset.category === f;
        it.classList.toggle("is-hidden", !show);
      });
    });

    // compra rápida (botão "Adicionar" na foto) OU abrir o lightbox para escolher o tamanho
    galleryEl.addEventListener("click", (ev) => {
      const addBtn = ev.target.closest(".gallery__add");
      if (addBtn) {
        ev.stopPropagation();
        addToCart(galleryProduct(+addBtn.dataset.add), POSTER_SIZES[0]);
        flashGalleryAdd(addBtn);
        return;
      }
      const fig = ev.target.closest(".gallery__item");
      if (!fig) return;
      lightboxList = $$(".gallery__item").filter((el) => !el.classList.contains("is-hidden"));
      lightboxIndex = lightboxList.indexOf(fig);
      openLightbox();
    });
  }

  function openLightbox() {
    const lb = $("#lightbox");
    renderLightbox();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function renderLightbox() {
    const fig = lightboxList[lightboxIndex];
    const idx = +fig.dataset.index;
    const data = GALLERY[idx];
    lbProduct = galleryProduct(idx);
    $("#lbImg").src = data.src;
    $("#lbImg").alt = data.title;
    $("#lbTitle").textContent = data.title;
    $("#lbMeta").textContent = data.meta;
    const sel = $("#lbSize");
    sel.innerHTML = POSTER_SIZES
      .map((s, i) => `<option value="${i}">${s.label} — ${money(s.price)}</option>`)
      .join("");
    sel.value = "0";
    updateLbPrice();
  }
  function updateLbPrice() {
    const s = POSTER_SIZES[$("#lbSize").value || 0];
    $("#lbPrice").innerHTML = `<small>Preço</small>${money(s.price)}`;
  }
  function moveLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxList.length) % lightboxList.length;
    renderLightbox();
  }
  function closeLightbox() {
    $("#lightbox").classList.remove("is-open");
    $("#lightbox").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function initLightboxControls() {
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbNext").addEventListener("click", () => moveLightbox(1));
    $("#lbPrev").addEventListener("click", () => moveLightbox(-1));
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!$("#lightbox").classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") moveLightbox(1);
      if (e.key === "ArrowLeft") moveLightbox(-1);
    });

    // comprar a partir do lightbox (tamanho escolhido)
    $("#lbSize").addEventListener("change", updateLbPrice);
    $("#lbAdd").addEventListener("click", () => {
      if (!lbProduct) return;
      addToCart(lbProduct, POSTER_SIZES[$("#lbSize").value]);
      closeLightbox();   // fecha o visualizador para revelar o carrinho
    });
  }

  /* ----------------------------------------------------------------------
     7) LOJA — render dos produtos
     ---------------------------------------------------------------------- */
  function buildShop() {
    const wrap = $("#products");
    PRODUCTS.forEach((p) => {
      const card = document.createElement("article");
      card.className = "product reveal";
      const options = p.sizes
        .map((s, i) => `<option value="${i}">${s.label} — ${money(s.price)}</option>`)
        .join("");
      card.innerHTML = `
        <div class="product__media">
          ${p.badge ? `<span class="product__badge">${p.badge}</span>` : ""}
          <img src="${p.image}" alt="${p.name}" />
        </div>
        <div class="product__body">
          <h3 class="product__name">${p.name}</h3>
          <p class="product__desc">${p.desc}</p>
          <select aria-label="Tamanho de ${p.name}" data-product="${p.id}">${options}</select>
          <div class="product__row">
            <div class="product__price"><small>desde</small>${money(p.sizes[0].price)}</div>
          </div>
          <button class="btn btn--dark btn--full product__add" data-product="${p.id}">Adicionar ao carrinho</button>
        </div>`;
      wrap.appendChild(card);

      const select = $("select", card);
      const priceEl = $(".product__price", card);
      select.addEventListener("change", () => {
        priceEl.innerHTML = `<small>preço</small>${money(p.sizes[select.value].price)}`;
      });
      $(".product__add", card).addEventListener("click", () => {
        const s = p.sizes[select.value];
        addToCart(p, s);
        flashButton($(".product__add", card));
      });
    });
  }
  function flashButton(btn) {
    const original = btn.textContent;
    btn.textContent = "✓ Adicionado";
    btn.style.background = "var(--accent-deep)";
    setTimeout(() => { btn.textContent = original; btn.style.background = ""; }, 1100);
  }

  /* ----------------------------------------------------------------------
     8) CARRINHO
     ---------------------------------------------------------------------- */
  const CART_KEY = "jo_cart_v1";
  let cart = loadCart();

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }
  function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function addToCart(product, size) {
    const key = product.id + "|" + size.label;
    const found = cart.find((i) => i.key === key);
    if (found) found.qty++;
    else cart.push({ key, id: product.id, name: product.name, image: product.image, size: size.label, price: size.price, qty: 1 });
    saveCart(); renderCart(); openCart();
  }
  function changeQty(key, delta) {
    const item = cart.find((i) => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter((i) => i.key !== key);
    saveCart(); renderCart();
  }
  function removeItem(key) { cart = cart.filter((i) => i.key !== key); saveCart(); renderCart(); }

  function cartTotal() { return cart.reduce((t, i) => t + i.price * i.qty, 0); }
  function cartCount() { return cart.reduce((t, i) => t + i.qty, 0); }

  function renderCart() {
    const body = $("#cartBody");
    const count = cartCount();
    const badge = $("#cartCount");
    badge.textContent = count;
    badge.classList.toggle("is-visible", count > 0);
    $("#cartTotal").textContent = money(cartTotal());

    if (!cart.length) {
      body.innerHTML = `
        <div class="cart__empty">
          <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 7h12l-1 13H7L6 7Z" stroke-linejoin="round"/><path d="M9 7a3 3 0 0 1 6 0" stroke-linecap="round"/></svg>
          O seu carrinho está vazio.<br>Adicione posters a partir da galeria.
        </div>`;
      return;
    }
    body.innerHTML = cart.map((i) => `
      <div class="cart-item">
        <img class="cart-item__img" src="${i.image}" alt="${i.name}" />
        <div class="cart-item__info">
          <div class="cart-item__name">${i.name}</div>
          <div class="cart-item__size">${i.size}</div>
          <div class="cart-item__bottom">
            <div class="qty">
              <button data-dec="${i.key}" aria-label="Diminuir">−</button>
              <span>${i.qty}</span>
              <button data-inc="${i.key}" aria-label="Aumentar">+</button>
            </div>
            <div class="cart-item__price">${money(i.price * i.qty)}</div>
          </div>
          <button class="cart-item__remove" data-rm="${i.key}">Remover</button>
        </div>
      </div>`).join("");
  }

  function openCart() {
    $("#cart").classList.add("is-open");
    $("#cartOverlay").classList.add("is-open");
  }
  function closeCart() {
    $("#cart").classList.remove("is-open");
    $("#cartOverlay").classList.remove("is-open");
  }

  function initCart() {
    renderCart();
    $("#cartBtn").addEventListener("click", openCart);
    $("#cartClose").addEventListener("click", closeCart);
    $("#cartOverlay").addEventListener("click", closeCart);
    $("#cartBody").addEventListener("click", (e) => {
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const rm  = e.target.closest("[data-rm]");
      if (inc) changeQty(inc.dataset.inc, 1);
      if (dec) changeQty(dec.dataset.dec, -1);
      if (rm)  removeItem(rm.dataset.rm);
    });
    $("#checkoutWhats").addEventListener("click", () => checkout("whats"));
    $("#checkoutEmail").addEventListener("click", () => checkout("email"));
  }

  function orderText() {
    let lines = ["Olá Joaquim! Gostaria de encomendar:", ""];
    cart.forEach((i) => lines.push(`• ${i.name} (${i.size}) × ${i.qty} — ${money(i.price * i.qty)}`));
    lines.push("", `Total: ${money(cartTotal())}`, "", "O meu nome: ", "Morada de envio: ");
    return lines.join("\n");
  }
  function checkout(kind) {
    if (!cart.length) { alert("O seu carrinho está vazio."); return; }
    const text = orderText();
    if (kind === "whats") {
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    } else {
      const subject = encodeURIComponent("Encomenda de posters — site");
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
    }
  }

  /* ----------------------------------------------------------------------
     9) FORMULÁRIOS (álbum + contacto)
     ---------------------------------------------------------------------- */
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function initForms() {
    // Álbum — interesse de pré-venda
    const albumForm = $("#albumForm");
    albumForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = $("#albumEmail").value.trim();
      const fb = $("#albumFeedback");
      if (!isEmail(val)) { fb.textContent = "Por favor, introduza um email válido."; return; }
      fb.textContent = "Obrigado! Reserva registada — avisamos no lançamento do livro ✦";
      albumForm.reset();
    });

    // Contacto — abre o cliente de email com a mensagem
    const contactForm = $("#contactForm");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#cfName").value.trim();
      const email = $("#cfEmail").value.trim();
      const msg = $("#cfMsg").value.trim();
      const fb = $("#contactFeedback");
      if (!name || !isEmail(email) || !msg) { fb.textContent = "Preencha todos os campos com um email válido."; return; }
      const subject = encodeURIComponent(`Contacto do site — ${name}`);
      const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      fb.textContent = "A abrir o seu email… obrigado pelo contacto!";
      contactForm.reset();
    });

    // Contacto via WhatsApp
    $("#cfWhats").addEventListener("click", () => {
      const name = $("#cfName").value.trim();
      const msg = $("#cfMsg").value.trim();
      const text = `Olá Joaquim!${name ? " Sou o/a " + name + "." : ""}${msg ? "\n\n" + msg : ""}`;
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  /* ----------------------------------------------------------------------
     9b) MAQUETA DO LIVRO — inclinação 3D que segue o cursor
     ---------------------------------------------------------------------- */
  function initBookTilt() {
    const stage = $("#bookStage");
    const book = stage && $(".book", stage);
    if (!book) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(hover: none)").matches) return;
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      book.style.setProperty("--ry", (-22 + nx * 26).toFixed(1) + "deg");
      book.style.setProperty("--rx", (5 - ny * 16).toFixed(1) + "deg");
    });
    stage.addEventListener("pointerleave", () => {
      book.style.removeProperty("--ry");
      book.style.removeProperty("--rx");
    });
  }

  /* ----------------------------------------------------------------------
     10) VOLTAR AO TOPO
     ---------------------------------------------------------------------- */
  function initToTop() {
    $("#toTop").addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  /* ----------------------------------------------------------------------
     ARRANQUE
     ---------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    hydrateSite();
    initPreloader();
    initHeader();
    initMobileMenu();
    buildGallery();
    initLightboxControls();
    buildShop();
    initCart();
    initForms();
    initToTop();
    initReveal();
    initParallax();
    initBookTilt();
  });
})();
