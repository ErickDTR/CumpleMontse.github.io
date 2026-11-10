/* ═══════════════════════════════════════════════════════════
   ✏️  AQUÍ CAMBIAS TODO  — solo edita este bloque CONFIG
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {

    nombre: "Montseee",   
    barraIzq: "un detallito ♡",
    barraDer: "hecho especialmente para ti",

    /* ── PORTADA ── */
    kicker: "una pequeña sorpresa",
    titulo: "¡Feliz cumpleaños!",
    subtitulo: "Hoy es un día especial y no podía dejar pasar la oportunidad de hacerte un pequeño detalle. Espero que te guste. ♡",
    botonInicio: "Abrir tu regalito ↓",

    /* ── CINTA QUE SE MUEVE (frases cortas) ── */
    cinta: ["feliz cumpleaños", "hoy es tu día", "que se cumplan tus metas", "✿ sonríe mucho ✿", "disfruta tu día"],

    /* ── TÍTULOS DE CADA SECCIÓN ── */
    secciones: {
        carta:    { kicker: "una notita para ti",       titulo: "¡Unas palabritas! ♡",           sub: "Un pequeño mensaje para alguien que está de cumpleaños." },
        album:    { kicker: "Fotico",               titulo: "",                  sub: "" },
        tablero:  { kicker: "juega un ratito",          titulo: "Tu tablero de stickers 🎨",      sub: "Acomódalos como quieras." },
        sorpresa: { kicker: "antes de terminar...",     titulo: "Una última sorpresita 🎁" }
    },

    /* ── CARTA (cada elemento es un párrafo) ── */
    carta: {
        parrafos: [
            "¡Feliz cumpleaños! 🎂",
            "Espero que hoy te la pases súper bonito, que disfrutes mucho tu día y que te consientan bastante.",
            "Te deseo muchas cosas buenas : que cumplas tus metas, tengas nuevas experiencias y, sobre todo, que nunca te falten motivos para sonreír.",
            "Sigue disfrutando de las cosas que te gustan y siendo tú misma.",
            "¡Pásala increíble! 💗"
        ],
        firma: "— Con cariño, Erick ♡"
    },

   /* ── FOTO DE LA PERSONA ── */
    fotos: [
        { src: "Montse.jpeg", pie: "un bonito recuerdo ♡" }
    ],

    /* ── STICKERS (Nombres directos sin 'stickers/') ── */
    stickers: [
        { imagen: "bellota.png", alt: "Bellota" },
        { imagen: "burbuja.png", alt: "Burbuja" },
        { imagen: "bombon.png", alt: "Bombón" },
        { imagen: "Gojo.png", alt: "Gojo" },
        { imagen: "nobora.png", alt: "Nobara" },
        { imagen: "nezuko.png", alt: "Nezuko" },
        { imagen: "tanjiro.png", alt: "Tanjiro" },
        { imagen: "zenitsu.png", alt: "Zenitsu" },
        { emoji: "🌸" },
        { emoji: "✨" },
        { emoji: "🎀" },
        { emoji: "💗" }
    ],
   
    textoTablero: "Arrastra los stickers y acomódalos como quieras ✨",
    botonMezclar: "Mezclar 🎲",

    /* ── SORPRESA FINAL ── */
    sorpresa: {
        texto: "Hay un mensajito escondido por aquí...",
        boton: "Descubrir sorpresa ♡",
        botonCerrar: "Volver a guardar ♡",
        mensaje: [
            "Espero que te haya gustado este pequeño detalle. Lo hice pensando en algunas de las cosas que te gustan.",
            "¡Que tengas un cumpleaños genial y que se vengan muchos momentos divertidos!",
            "¡Disfruta mucho tu día! 💗"
        ]
    },

    pie: "hecho con cariño para ti · ♡",
    confeti: ["♡", "✿", "✧", "୨୧", "💗"]
};

/* ═══════════════════════════════════════════════════════════
   LÓGICA DE FUNCIONAMIENTO
   ═══════════════════════════════════════════════════════════ */

const $ = (s, root = document) => root.querySelector(s);
const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
};
const rand = (a, b) => a + Math.random() * (b - a);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Crea un sticker (imagen o emoji). Si la imagen falla, usa el emoji de respaldo */
function stickerNode(s, cls) {
    const wrap = el("span", cls);
    const fallback = s.emoji || "✨";
    if (s.imagen) {
        const img = new Image();
        img.src = s.imagen;
        img.alt = s.alt || "";
        img.draggable = false;
        img.onerror = () => wrap.replaceChildren(document.createTextNode(fallback));
        wrap.appendChild(img);
    } else {
        wrap.textContent = fallback;
    }
    return wrap;
}

/* ───────── PORTADA ───────── */
function renderHero() {
    if (CONFIG.nombre) document.title = "Un detallito para " + CONFIG.nombre + " 🎀";

    $("#barraIzq").textContent = CONFIG.barraIzq;
    $("#barraDer").textContent = CONFIG.barraDer;
    $("#kicker").textContent = CONFIG.kicker;
    $("#subtitulo").textContent = CONFIG.subtitulo;

    const h1 = $("#titulo");
    h1.append(CONFIG.titulo, document.createElement("br"));
    h1.append(el("span", "name", CONFIG.nombre ? CONFIG.nombre + " " : ""), "🎀");

    const btn = $("#btnInicio");
    btn.textContent = CONFIG.botonInicio;

    // Conectar botón con confeti, scroll y música
    btn.addEventListener("click", () => {
        confetti();

        // Reproducir la música de fondo al presionar el botón
        const audio = $("#musicaFondo");
        if (audio) {
            audio.volume = 0.5; // Volumen al 50%
            audio.play().catch(e => console.log("Reproducción automática no permitida", e));
        }

        $("#mensaje").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });

    const spots = [[3, 14], [86, 8], [4, 68], [88, 64], [19, 88], [74, 88], [45, 2], [92, 38]];
    const box = $("#floaters");
    CONFIG.stickers.slice(0, spots.length).forEach((s, i) => {
        const n = stickerNode(s, "floater");
        n.style.left = spots[i][0] + "%";
        n.style.top = spots[i][1] + "%";
        n.style.setProperty("--r", rand(-18, 18) + "deg");
        n.style.animationDelay = (-i * 0.7) + "s";
        box.appendChild(n);
    });
}

/* ───────── CINTA ───────── */
function renderRibbon() {
    const track = $("#track");
    const half = () => {
        const frag = document.createDocumentFragment();
        for (let r = 0; r < 3; r++) {
            CONFIG.cinta.forEach(t => frag.appendChild(el("span", null, t + "  ✿")));
        }
        return frag;
    };
    track.append(half(), half());
}

/* ───────── TÍTULOS DE SECCIÓN ───────── */
function renderHeads() {
    document.querySelectorAll("[data-head]").forEach(box => {
        const d = CONFIG.secciones[box.dataset.head];
        if (!d) return;
        $(".kicker", box).textContent = d.kicker || "";
        $("h2", box).textContent = d.titulo || "";
        const p = $("p", box);
        if (p) { d.sub ? (p.textContent = d.sub) : p.remove(); }
    });
}

/* ───────── CARTA ───────── */
function renderCarta() {
    const box = $("#carta");
    CONFIG.carta.parrafos.forEach(t => box.appendChild(el("p", null, t)));
    box.appendChild(el("span", "signature", CONFIG.carta.firma));
}

/* ───────── ÁLBUM + VISOR ───────── */
const lightbox = $("#lightbox");

function openPhoto(src, caption) {
    $("#lbImg").src = src;
    $("#lbImg").alt = caption || "";
    $("#lbCap").textContent = caption || "";
    lightbox.hidden = false;
}
function closePhoto() { lightbox.hidden = true; }

function renderFotos() {
    const box = $("#polaroids");

    CONFIG.fotos.forEach((f, i) => {
        const placeholder = () => el("div", "photo-placeholder", "♡");
        let card;

        if (f.src) {
            card = el("button", "polaroid reveal");
            card.type = "button";
            const img = new Image();
            img.src = f.src;
            img.alt = f.pie || "Foto";
            img.className = "photo";
            img.loading = "lazy";
            img.onerror = () => {
                img.replaceWith(placeholder());
                card.disabled = true;
            };
            card.appendChild(img);
            card.addEventListener("click", () => openPhoto(f.src, f.pie));
        } else {
            card = el("div", "polaroid reveal");
            card.appendChild(placeholder());
        }

        card.appendChild(el("small", null, f.pie || ""));
        card.style.setProperty("--r", "-1.5deg");
        box.appendChild(card);
    });

    if (CONFIG.fotos.every(f => !f.src) && CONFIG.notaFotos) {
        box.insertAdjacentElement("afterend", el("p", "note", CONFIG.notaFotos));
    }

    $("#lbClose").addEventListener("click", closePhoto);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closePhoto(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closePhoto(); });
}

/* ───────── TABLERO DE STICKERS (arrastrables) ───────── */
function renderBoard() {
    const board = $("#board");
    let z = 1;

    $("#hintTablero").textContent = CONFIG.textoTablero;
    $("#btnMezclar").textContent = CONFIG.botonMezclar;

    function applyPos(n) {
        const mx = Math.max(0, board.clientWidth - n.offsetWidth);
        const my = Math.max(0, board.clientHeight - n.offsetHeight);
        n.style.left = n._fx * mx + "px";
        n.style.top = n._fy * my + "px";
    }

    CONFIG.stickers.forEach(s => {
        const n = stickerNode(s, "drag");
        n.style.setProperty("--r", rand(-16, 16) + "deg");
        n._fx = Math.random();
        n._fy = Math.random();
        board.appendChild(n);

        n.addEventListener("pointerdown", e => {
            e.preventDefault();
            n.setPointerCapture(e.pointerId);
            n.classList.add("grab");
            n.style.zIndex = ++z;

            const sx = e.clientX, sy = e.clientY;
            const ox = n.offsetLeft, oy = n.offsetTop;

            const move = ev => {
                const mx = Math.max(0, board.clientWidth - n.offsetWidth);
                const my = Math.max(0, board.clientHeight - n.offsetHeight);
                const x = Math.min(mx, Math.max(0, ox + ev.clientX - sx));
                const y = Math.min(my, Math.max(0, oy + ev.clientY - sy));
                n.style.left = x + "px";
                n.style.top = y + "px";
                n._fx = mx ? x / mx : 0;
                n._fy = my ? y / my : 0;
            };
            const up = () => {
                n.classList.remove("grab");
                n.removeEventListener("pointermove", move);
                n.removeEventListener("pointerup", up);
                n.removeEventListener("pointercancel", up);
            };
            n.addEventListener("pointermove", move);
            n.addEventListener("pointerup", up);
            n.addEventListener("pointercancel", up);
        });
    });

    const layout = () => board.querySelectorAll(".drag").forEach(applyPos);

    board.querySelectorAll("img").forEach(img => img.addEventListener("load", layout));
    layout();
    window.addEventListener("resize", layout);

    $("#btnMezclar").addEventListener("click", () => {
        board.classList.add("shuffling");
        board.querySelectorAll(".drag").forEach(n => {
            n._fx = Math.random();
            n._fy = Math.random();
            n.style.setProperty("--r", rand(-16, 16) + "deg");
            applyPos(n);
        });
        setTimeout(() => board.classList.remove("shuffling"), 700);
    });
}

/* ───────── SORPRESA ───────── */
function renderSorpresa() {
    const S = CONFIG.sorpresa;
    const btn = $("#reveal");
    const note = $("#hiddenNote");

    $("#sorpresaTexto").textContent = S.texto;
    btn.textContent = S.boton;
    S.mensaje.forEach(t => note.appendChild(el("p", null, t)));

    const toggle = () => {
        const open = note.classList.toggle("show");
        btn.textContent = open ? S.botonCerrar : S.boton;
        btn.setAttribute("aria-expanded", String(open));
        if (open) confetti();
    };
    btn.addEventListener("click", toggle);
    $("#gift").addEventListener("click", toggle);

    $("#pie").textContent = CONFIG.pie;
}

/* ───────── CONFETI ───────── */
function confetti() {
    if (reduceMotion) return;
    const symbols = [...CONFIG.confeti, ...CONFIG.stickers.map(s => s.emoji).filter(Boolean)];
    for (let i = 0; i < 34; i++) {
        const n = el("span", "confetti", symbols[Math.floor(Math.random() * symbols.length)]);
        n.style.left = rand(0, 100) + "vw";
        n.style.fontSize = rand(14, 32) + "px";
        n.style.animationDuration = rand(3, 6) + "s";
        n.style.setProperty("--dx", rand(-80, 80) + "px");
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 6500);
    }
}

/* ───────── APARECER AL HACER SCROLL ───────── */
function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach(i => i.classList.add("in"));
        return;
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add("in");
                io.unobserve(en.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach(i => io.observe(i));
}

/* ───────── ARRANQUE ───────── */
renderHero();
renderRibbon();
renderHeads();
renderCarta();
renderFotos();
renderBoard();
renderSorpresa();
setupReveal();
