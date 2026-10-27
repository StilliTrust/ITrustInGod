/* ==========================================================
   I TRUST IN GOD — script
   ----------------------------------------------------------
   ✏️  PARA MUDAR PREÇOS, FOTOS OU NOMES, EDITA SÓ AQUI EM CIMA
   ========================================================== */

const WHATSAPP = "258878456144";   // +258 87 845 6144

const PRODUTOS = [
  {
    id: "tshirt",
    aba: "T-shirt",
    nome: "T-shirt I Trust In God",
    tag: "Estampa frente e costas",
    cor: "var(--yellow)",
    descricao: "Estampa que fala por ti: “I Trust In God” à frente e “God knows your hearts” nas costas. Escolhe a cor e o corte.",
    ratio: "1 / 1",
    fotos: [
      { src: "images/itgg1.jpg", nome: "Branca" },
      { src: "images/itgg2.jpg", nome: "Preta" },
    ],
    // Dois tamanhos / cortes, cada um com o seu preço
    opcoes: [
      { nome: "Normal",    detalhe: "Corte clássico", preco: 499 },
      { nome: "Oversized", detalhe: "Largo e confortável", preco: 999 },
    ],
    rotuloOpcao: "Corte",
  },
  {
    id: "bone",
    aba: "Boné I Trust In God",
    abaCurta: "Boné",
    nome: "Boné I Trust In God",
    tag: "6 cores",
    cor: "var(--pink)",
    descricao: "Boné trucker com a estampa de letras recortadas. Fecho ajustável, serve em todas as cabeças.",
    ratio: "4 / 3",
    fotos: [
      { src: "images/bone1.jpg", nome: "Verde" },
      { src: "images/bone2.jpg", nome: "Vermelho" },
      { src: "images/bone3.jpg", nome: "Rosa" },
      { src: "images/bone4.jpg", nome: "Castanho" },
      { src: "images/bone5.jpg", nome: "Preto" },
      { src: "images/bone6.jpg", nome: "Azul claro" },
    ],
    opcoes: [{ nome: "Único", detalhe: "", preco: 449 }],
  },
  {
    id: "polo",
    aba: "T-shirt Polo",
    abaCurta: "Polo",
    nome: "T-shirt Polo",
    tag: "Proverbs 3:5",
    cor: "var(--blue)",
    descricao: "Polo elegante com “I Trust In God” e Provérbios 3:5. Para usar no dia a dia, na igreja ou em qualquer ocasião.",
    ratio: "4 / 5",
    fotos: [
      { src: "images/polo1.jpg", nome: "Preta" },
      { src: "images/polo2.jpg", nome: "Rosa" },
      { src: "images/polo3.jpg", nome: "Branca" },
      { src: "images/polo4.jpg", nome: "Preta (2)" },
      { src: "images/polo5.jpg", nome: "Vermelha" },
    ],
    opcoes: [{ nome: "Único", detalhe: "", preco: 949 }],
  },
];

/* ========== daqui para baixo não é preciso mexer ========== */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = n => n.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const waLink = msg => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ---------- links do WhatsApp gerais ---------- */
$$("[data-wa]").forEach(a => a.href = waLink("Olá! Vim pelo site I TRUST IN GOD e gostava de mais informações."));
$("#year").textContent = new Date().getFullYear();

/* ---------- entrada ---------- */
function hideLoader() { $("#loader").classList.add("done"); startHero(); }
let loaderDone = false;
const finish = () => { if (!loaderDone) { loaderDone = true; setTimeout(hideLoader, 450); } };
addEventListener("load", finish);
setTimeout(finish, 2200);

/* ---------- título com letras recortadas ---------- */
const PALETA = [
  ["#ff5fa2", "#fff"], ["#ffd23f", "#111"], ["#1f8a4c", "#fff"], ["#e0242b", "#fff"],
  ["#5ab8f0", "#111"], ["#fff", "#111"], ["#111", "#ffd23f"], ["#ff8a2b", "#111"], ["#7b3fe4", "#fff"],
];
const FONTES = ["'Anton',sans-serif", "'Playfair Display',serif", "'Space Mono',monospace", "'Bricolage Grotesque',sans-serif"];
const rnd = (a, b) => a + Math.random() * (b - a);

(function buildRansom() {
  let k = 0;
  $$("#ransom .line").forEach(line => {
    line.dataset.text.split("").forEach(ch => {
      if (ch === " ") { const g = document.createElement("i"); g.className = "gap"; line.appendChild(g); return; }
      const [bg, fg] = PALETA[(k * 4 + 1) % PALETA.length];
      const s = document.createElement("span");
      s.className = "chip";
      s.textContent = ch;
      s.style.cssText = `background:${bg};color:${fg};font-family:${FONTES[k % FONTES.length]};font-weight:${k % 4 === 1 ? 900 : 800};--r:${rnd(-7, 7).toFixed(1)}deg;border-radius:${Math.round(rnd(2, 8))}px ${Math.round(rnd(2, 8))}px ${Math.round(rnd(2, 8))}px ${Math.round(rnd(2, 8))}px`;
      line.appendChild(s);
      k++;
    });
  });
})();
function startHero() {
  $$(".chip").forEach((c, i) => setTimeout(() => c.classList.add("in"), i * 90));
  setTimeout(() => $$(".hero .reveal").forEach(e => e.classList.add("visible")), 500);
}

/* ---------- aparecer ao descer ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
}), { threshold: .15 });
$$(".reveal").forEach(el => { if (!el.closest(".hero")) io.observe(el); });

/* ---------- menu com sombra ---------- */
addEventListener("scroll", () => $("#topbar").classList.toggle("scrolled", scrollY > 30), { passive: true });

/* ---------- ABAS ---------- */
const tabs = $(".tabs"), bar = $("#tabsBar"), panel = $("#panel");
const estado = {};      // {produtoId: {foto, opcao}}
PRODUTOS.forEach(p => estado[p.id] = { foto: 0, opcao: 0 });
let ativo = PRODUTOS[0].id;

PRODUTOS.forEach(p => {
  const b = document.createElement("button");
  b.className = "tab"; b.role = "tab"; b.id = "tab-" + p.id;
  b.dataset.id = p.id;
  b.innerHTML = `<img src="${p.fotos[0].src}" alt=""><span>${p.aba}</span>`;
  b.addEventListener("click", () => abrir(p.id, true));
  tabs.appendChild(b);
});

function moverBarra() {
  const b = $(`.tab[data-id="${ativo}"]`);
  if (!b) return;
  bar.style.width = b.offsetWidth + "px";
  bar.style.transform = `translateX(${b.offsetLeft}px)`;
}
addEventListener("resize", moverBarra);

function abrir(id, atualizarHash) {
  ativo = id;
  $$(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.id === id));
  moverBarra();
  render();
  if (atualizarHash) history.replaceState(null, "", "#" + id);
}

function render() {
  const p = PRODUTOS.find(x => x.id === ativo), st = estado[p.id];
  const op = p.opcoes[st.opcao], foto = p.fotos[st.foto];
  const unico = p.opcoes.length === 1;

  panel.innerHTML = `
    <div class="product">
      <div class="stage">
        <button class="arrow arrow--prev" aria-label="Foto anterior">‹</button>
        <div class="stage__card" style="--ratio:${p.ratio}">
          <img src="${foto.src}" alt="${p.nome} — ${foto.nome}">
          <div class="stage__shine"></div>
          <span class="stage__zoom">Toca para ampliar</span>
        </div>
        <button class="arrow arrow--next" aria-label="Foto seguinte">›</button>
        <div class="dots">${p.fotos.map((_, i) => `<i class="${i === st.foto ? "on" : ""}"></i>`).join("")}</div>
      </div>

      <div class="info">
        <span class="tag" style="--c:${p.cor}">${p.tag}</span>
        <h3>${p.nome}</h3>
        <p class="desc">${p.descricao}</p>

        ${p.fotos.length > 1 ? `
        <span class="label">Cor <b id="corNome">${foto.nome}</b></span>
        <div class="swatches">
          ${p.fotos.map((f, i) => `<button class="swatch" data-i="${i}" aria-pressed="${i === st.foto}" aria-label="${f.nome}"><img src="${f.src}" alt="${f.nome}" loading="lazy"></button>`).join("")}
        </div>` : ""}

        ${!unico ? `
        <span class="label">${p.rotuloOpcao || "Opção"}</span>
        <div class="sizes">
          ${p.opcoes.map((o, i) => `<button class="size" data-o="${i}" aria-pressed="${i === st.opcao}">${o.nome}<small>${o.detalhe}</small></button>`).join("")}
        </div>` : ""}

        <div class="buyrow">
          <div class="price" id="preco">${fmt(op.preco)}<small>MZN</small></div>
          <a class="btn btn--wa btn--big" id="comprar" target="_blank" rel="noopener">Comprar no WhatsApp</a>
        </div>
        <p class="deliver">📦 Enviamos para a cidade de Maputo e Matola.</p>
      </div>
    </div>`;

  atualizarLink();
  ligarPainel(p);
}

function mensagem(p) {
  const st = estado[p.id], f = p.fotos[st.foto], o = p.opcoes[st.opcao];
  const extra = [f.nome, p.opcoes.length > 1 ? o.nome : null].filter(Boolean).join(", ");
  return `Olá! Quero comprar: ${p.nome} (${extra}) — ${fmt(o.preco)} MZN`;
}
function atualizarLink() {
  const p = PRODUTOS.find(x => x.id === ativo);
  $("#comprar").href = waLink(mensagem(p));
}

function mudarFoto(p, i) {
  const st = estado[p.id];
  st.foto = (i + p.fotos.length) % p.fotos.length;
  const f = p.fotos[st.foto], img = $(".stage__card img");
  img.src = f.src; img.alt = `${p.nome} — ${f.nome}`;
  img.classList.remove("swap"); void img.offsetWidth; img.classList.add("swap");
  $$(".dots i").forEach((d, k) => d.classList.toggle("on", k === st.foto));
  $$(".swatch").forEach((s, k) => s.setAttribute("aria-pressed", k === st.foto));
  const n = $("#corNome"); if (n) n.textContent = f.nome;
  atualizarLink();
}

function ligarPainel(p) {
  const st = estado[p.id];
  $(".arrow--prev").onclick = () => mudarFoto(p, st.foto - 1);
  $(".arrow--next").onclick = () => mudarFoto(p, st.foto + 1);
  $$(".swatch").forEach(s => s.onclick = () => mudarFoto(p, +s.dataset.i));
  $$(".size").forEach(s => s.onclick = () => {
    st.opcao = +s.dataset.o;
    $$(".size").forEach(x => x.setAttribute("aria-pressed", x === s));
    const pr = $("#preco");
    pr.innerHTML = `${fmt(p.opcoes[st.opcao].preco)}<small>MZN</small>`;
    pr.classList.remove("bump"); void pr.offsetWidth; pr.classList.add("bump");
    atualizarLink();
  });

  // inclinação 3D + brilho na foto
  const card = $(".stage__card");
  card.addEventListener("pointermove", e => {
    if (e.pointerType === "touch" || reduce) return;
    const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.transform = `rotateY(${(x - .5) * 14}deg) rotateX(${(.5 - y) * 14}deg)`;
    card.style.setProperty("--mx", x * 100 + "%"); card.style.setProperty("--my", y * 100 + "%");
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
  card.addEventListener("click", () => abrirFoto(p.fotos[st.foto].src));

  // deslizar com o dedo
  let x0 = null;
  card.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  card.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) mudarFoto(p, st.foto + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  $("#comprar").addEventListener("click", e => confete(e.clientX, e.clientY));
}

/* ---------- foto grande ---------- */
const lb = $("#lightbox");
function abrirFoto(src) { $("img", lb).src = src; lb.hidden = false; }
lb.addEventListener("click", () => lb.hidden = true);
addEventListener("keydown", e => {
  if (e.key === "Escape") lb.hidden = true;
  if (lb.hidden && (e.key === "ArrowLeft" || e.key === "ArrowRight") && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
    const p = PRODUTOS.find(x => x.id === ativo);
    mudarFoto(p, estado[p.id].foto + (e.key === "ArrowRight" ? 1 : -1));
  }
});

/* ---------- links do menu que abrem uma aba ---------- */
$$("[data-tab]").forEach(a => a.addEventListener("click", () => abrir(a.dataset.tab, true)));
const inicial = location.hash.slice(1);
abrir(PRODUTOS.some(p => p.id === inicial) ? inicial : PRODUTOS[0].id, false);
addEventListener("load", moverBarra);
document.fonts && document.fonts.ready.then(moverBarra);

/* ---------- cursor ---------- */
const cur = $("#cursor");
if (matchMedia("(pointer:fine)").matches && !reduce) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; cur.classList.add("show"); });
  (function loop() { cx += (tx - cx) * .2; cy += (ty - cy) * .2; cur.style.left = cx + "px"; cur.style.top = cy + "px"; requestAnimationFrame(loop); })();
  document.addEventListener("pointerover", e => cur.classList.toggle("big", !!e.target.closest("a,button,.stage__card")));
}

/* ---------- peças do início a mexer com o rato ---------- */
if (matchMedia("(pointer:fine)").matches && !reduce) {
  const st = $$(".sticker");
  addEventListener("pointermove", e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    st.forEach(s => { const d = +s.dataset.depth; s.style.transform = `translate(${x * d}px,${y * d}px)`; });
  });
}

/* ---------- confete ---------- */
const cv = $("#confetti"), cx2 = cv.getContext("2d");
let parts = [], raf = null;
function ajustar() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
addEventListener("resize", ajustar); ajustar();
function confete(x, y) {
  if (reduce) return;
  const cores = ["#ff5fa2", "#ffd23f", "#1f8a4c", "#e0242b", "#5ab8f0", "#ff8a2b"];
  for (let i = 0; i < 70; i++) parts.push({
    x: x * devicePixelRatio, y: y * devicePixelRatio,
    vx: rnd(-9, 9) * devicePixelRatio, vy: rnd(-16, -4) * devicePixelRatio,
    w: rnd(8, 16) * devicePixelRatio, h: rnd(5, 10) * devicePixelRatio,
    r: rnd(0, 6), vr: rnd(-.3, .3), c: cores[i % cores.length], life: 1,
  });
  if (!raf) raf = requestAnimationFrame(anim);
}
function anim() {
  cx2.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.vy += .45 * devicePixelRatio; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= .011;
    cx2.save(); cx2.globalAlpha = Math.max(p.life, 0); cx2.translate(p.x, p.y); cx2.rotate(p.r);
    cx2.fillStyle = p.c; cx2.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx2.restore();
  });
  parts = parts.filter(p => p.life > 0);
  raf = parts.length ? requestAnimationFrame(anim) : null;
  if (!raf) cx2.clearRect(0, 0, cv.width, cv.height);
}
