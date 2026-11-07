// Portfolio JavaScript
// MOBILE NAVIGATION

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

// ACTIVE NAVIGATION ON SCROLL

const sections = document.querySelectorAll(
  "#home, #work, #about, #skills, #contact",
);

const navLinksList = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinksList.forEach(function (link) {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
  },
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});
