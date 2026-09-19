const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const range = document.getElementById("compareRange");
const beforeLayer = document.getElementById("beforeLayer");
const divider = document.getElementById("divider");

function updateComparison() {
  const value = range.value;
  beforeLayer.style.width = value + "%";
  divider.style.left = value + "%";
}

range.addEventListener("input", updateComparison);
updateComparison();

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => observer.observe(el));

const form = document.getElementById("contactForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const servico = document.getElementById("servico").value;
  const mensagem = document.getElementById("mensagem").value.trim();

  const texto = `Olá! Meu nome é ${nome}.

Telefone: ${telefone}
Serviço: ${servico}
${mensagem ? `Mensagem: ${mensagem}` : ""}

Gostaria de solicitar um orçamento.`;

  const url =
    "https://wa.me/5541997305973?text=" +
    encodeURIComponent(texto);

  window.open(url, "_blank");
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  });
});

function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
}

closeLightbox.addEventListener("click", closeGallery);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeGallery();
  }
});
