{
  /* querySelector */
}
/* SELECTING ELEMENTS USING A CLASS */

const heading = document.querySelector(".hero-title");

// console.log(heading);

heading.textContent = "Build a business that can thrive.";

console.log(heading.textContent);

const description = document.querySelector(".hero-description");

description.textContent =
  "We help ambitious businesses build better systems for growth.";

console.log(description.textContent);

/* SELECTING ELEMENTS USING AN ID */

const consultationButton = document.querySelector("#consultation-btn");

consultationButton.textContent = "Schedule Your Consultation";

{
  /* addEventListener */
}

/* consultationButton.addEventListener("click", function () {
  console.log("The button was clicked!");
}); */

const feedback = document.querySelector("#feedback");

consultationButton.addEventListener("click", function () {
  feedback.textContent =
    "Thanks for showing interest! Contact us to arrange a consultation.";
});

const contactButton = document.querySelector("#contact-btn");
const contactFeedback = document.querySelector("#contact");

contactButton.addEventListener("click", function () {
  contactFeedback.textContent = "Your Consultation request has been noted!";
});

{
  /* classList and CSS */
}

contactButton.addEventListener("click", function () {
  contactButton.classList.toggle("active");
});

{
  /* Making Elements Visible and Hidden */
}

const menuButton = document.querySelector("#menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");

menuButton.addEventListener("click", function () {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuButton.textContent = isOpen ? "Close Menu" : "Menu";
  menuButton.setAttribute("aria-expanded", isOpen);
});

{
  /* if...else and UI states */
}

const statusButton = document.querySelector("#status-btn");
const statusMessage = document.querySelector("#status-message");

let isOpen = false;

statusButton.addEventListener("click", function () {
  if (isOpen === false) {
    isOpen = true;
    statusMessage.textContent = "The menu is open.";
    statusButton.textContent = "Close Menu";
  } else {
    isOpen = false;
    statusMessage.textContent = "The menu is closed.";
    statusButton.textContent = "Open Menu";
  }
});

{
  /* Handling user input with javascript */
}

const nameInput = document.querySelector("#name-input");
const greetButton = document.querySelector("#greet-btn");
const greetingMessage = document.querySelector("#greeting-message");

greetButton.addEventListener("click", function () {
  const greetName = nameInput.value.trim();

  {
    /* Conditional Logic and Input Validation */
  }

  if (greetName === "") {
    greetingMessage.textContent = "Please enter a name!";
  } else {
    greetingMessage.textContent = `Welcome, ${greetName}!`;
    nameInput.value = "";
  }
});

{
  /* HTML forms and javascript submission */
}

const contactForm = document.querySelector("#contact-form");

const formMessage = document.querySelector("#form-message");

const clientName = document.querySelector("#client-name");

const clientEmail = document.querySelector("#client-email");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  /* const formMsg = `Thank you, ${clientName.value}! We'll contact you at ${clientEmail.value}.`;

  const formMssg = formMsg.trim();

  if (clientName.value === "" || clientEmail.value === "") {
    formMessage.textContent = "Please fill in all fields";
  } else {
    formMessage.textContent = formMssg;
    clientName.value = "";
    clientEmail.value = ""; */

  // OR

  /*
  const name = clientName.value.trim();
  const email = clientEmail.value.trim();

  if (name === "" && email === "") {
    formMessage.textContent = "Please fill in all fields.";
  } else if (name === "") {
    formMessage.textContent = "Please enter your name.";
  } else if (email === "") {
    formMessage.textContent = "Please enter your email.";
  } else {
    formMessage.textContent = `Thank you, ${name}! We'll contact you at ${email}.`;

    clientName.value = "";
    clientEmail.value = "";
  }
    */

  {
    {
      /* Working with FormData */
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();

    if (name === "" && email === "") {
      formMessage.textContent = "Please fill in all fields";
    } else if (name === "") {
      formMessage.textContent = "Please enter your name";
    } else if (email === "") {
      formMessage.textContent = "Please enter your email";
    } else {
      formMessage.textContent = `Thank you, ${name}! We'll contact you at ${email}`;
      contactForm.reset();
    }
  }
});

{
  /* Javascript Validation Methods */
}

const clientEmailValidity = document.querySelector("#client-email");
const emailValidityBtn = document.querySelector("#validity-btn");
const ValidityMssg = document.querySelector("#validity-mssg");

emailValidityBtn.addEventListener("click", function (event) {
  // const valid = clientEmailValidity.checkValidity();
  const valid = clientEmailValidity.reportValidity();

  if (valid === true) {
    ValidityMssg.textContent = "Your email is valid";
  } else {
    ValidityMssg.textContent = "Please enter a valid email address";
  }
});

clientEmailValidity.addEventListener("input", function (event) {
  const emailValue = clientEmailValidity.value;

  if (emailValue === "test") {
    clientEmailValidity.setCustomValidity(
      "Please enter a proper email address",
    );
  } else {
    clientEmailValidity.setCustomValidity("");
  }
});
