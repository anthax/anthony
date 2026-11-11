const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// HERO FEATURE SLIDER

const slides = document.querySelectorAll(".visual-slide");
const visuals = document.querySelectorAll(".hero-art");

const slideCounter = document.querySelector(".slide-counter");
const visualCounter = document.querySelector(".visual-caption span:last-child");
const visualNumber = document.querySelector(".visual-number");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach(function (slide) {
    slide.classList.remove("active");
  });

  visuals.forEach(function (visual) {
    visual.classList.remove("active");
  });

  slides[index].classList.add("active");
  visuals[index].classList.add("active");

  const number = `0${index + 1}`;

  slideCounter.textContent = `${number} / 04`;
  visualCounter.textContent = `${number} / 04`;
  visualNumber.textContent = number;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);

setInterval(nextSlide, 5000);
