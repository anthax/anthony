const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

const navItems = navLinks.querySelectorAll("a");

navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// HERO CARD CONTENT ROTATION

const cardContent = [
  {
    category: "01 / STRATEGIC THINKING",
    heading: "Clarity creates momentum.",
    description: "Better decisions. Stronger operations. Sustainable growth.",
  },

  {
    category: "02 / BUSINESS STRATEGY",
    heading: "Direction drives progress.",
    description: "Turn ambitious ideas into focused, actionable strategies.",
  },

  {
    category: "03 / OPERATIONAL EXCELLENCE",
    heading: "Better systems. Better outcomes.",
    description:
      "Improve processes, eliminate inefficiencies and build stronger operations.",
  },

  {
    category: "04 / SUSTAINABLE GROWTH",
    heading: "Build for what's next.",
    description:
      "Create a foundation for consistent, long-term business growth.",
  },
];

const visualContent = document.querySelector(".visual-content");
const visualHeading = document.querySelector("#visual-heading");
const visualDescription = document.querySelector("#visual-description");
const visualCategory = document.querySelector("#visual-category");

let currentCard = 0;

function rotateCard() {
  visualContent.classList.add("fade-out");

  setTimeout(() => {
    currentCard = (currentCard + 1) % cardContent.length;

    visualHeading.textContent = cardContent[currentCard].heading;
    visualDescription.textContent = cardContent[currentCard].description;
    visualCategory.textContent = cardContent[currentCard].category;

    visualContent.classList.remove("fade-out");
    visualContent.classList.add("fade-in");

    setTimeout(() => {
      visualContent.classList.remove("fade-in");
    }, 500);
  }, 350);
}

setInterval(rotateCard, 4000);

// CURRENT YEAR
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();
