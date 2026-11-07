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
