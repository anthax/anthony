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

// CONTACT FORM SUBMISSION

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = contactForm.querySelector(".form-submit");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formStatus.className = "form-status";
  formStatus.textContent = "";

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formStatus.textContent =
        "Your enquiry has been sent successfully. I'll get back to you soon.";

      formStatus.className = "form-status success";

      contactForm.reset();
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    formStatus.textContent =
      "Something went wrong. Please try again or contact me by email.";

    formStatus.className = "form-status error";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Send enquiry <span>↗</span>";
  }
});

// ========================================
// PROJECT SHOWCASE
// ========================================

const projectTabs = document.querySelectorAll(".project-tab");
const projectPanels = document.querySelectorAll(".project-panel");

const mockPanel = document.querySelector("#mock-projects");
const projectsTrack = document.querySelector(".projects-track");
const projectSlides = document.querySelectorAll(".project-slide");

const previousButton = document.querySelector(".project-prev");
const nextButton = document.querySelector(".project-next");

const currentProject = document.querySelector(".current-project");
const totalProjects = document.querySelector(".total-projects");

const projectsViewport = document.querySelector(".projects-viewport");

let currentIndex = 0;
let autoplayTimer;
let touchStartX = 0;

const totalSlides = projectSlides.length;
const autoplayDelay = 6000;

// UPDATE PROJECT POSITION

function updateProject(index) {
  if (!projectsTrack || totalSlides === 0) return;

  currentIndex = Math.max(0, Math.min(index, totalSlides - 1));

  projectsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  currentProject.textContent = String(currentIndex + 1).padStart(2, "0");

  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === totalSlides - 1;

  restartAutoplay();
}

// NAVIGATION BUTTONS

previousButton.addEventListener("click", () => {
  updateProject(currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  updateProject(currentIndex + 1);
});

// CATEGORY TABS

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetPanel = document.querySelector(
      `#${tab.getAttribute("aria-controls")}`,
    );

    projectTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
      item.setAttribute("tabindex", "-1");
    });

    projectPanels.forEach((panel) => {
      panel.classList.remove("active");
      panel.hidden = true;
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");

    targetPanel.hidden = false;
    targetPanel.classList.add("active");

    if (targetPanel === mockPanel) {
      updateProject(0);
    } else {
      stopAutoplay();
    }
  });
});

// AUTOPLAY

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

function startAutoplay() {
  stopAutoplay();

  if (
    document.hidden ||
    !mockPanel.classList.contains("active") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  autoplayTimer = setInterval(() => {
    if (currentIndex >= totalSlides - 1) {
      updateProject(0);
    } else {
      updateProject(currentIndex + 1);
    }
  }, autoplayDelay);
}

function restartAutoplay() {
  startAutoplay();
}

// PAUSE WHEN USER INTERACTS

projectsViewport.addEventListener("mouseenter", stopAutoplay);

projectsViewport.addEventListener("mouseleave", startAutoplay);

projectsViewport.addEventListener("focusin", stopAutoplay);

projectsViewport.addEventListener("focusout", startAutoplay);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

// MOUSE WHEEL NAVIGATION

projectsViewport.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) < 25) return;

    event.preventDefault();

    if (event.deltaY > 0) {
      updateProject(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
    } else {
      updateProject(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
    }
  },
  { passive: false },
);

// TOUCH SWIPE NAVIGATION

projectsViewport.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

projectsViewport.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const difference = touchStartX - touchEndX;

  if (Math.abs(difference) < 50) return;

  if (difference > 0) {
    updateProject(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  } else {
    updateProject(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  }
});

// INITIALISE

totalProjects.textContent = String(totalSlides).padStart(2, "0");

updateProject(0);
