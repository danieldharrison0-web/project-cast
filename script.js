// CAST v0.1 interactions

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const forms = document.querySelectorAll(".signup");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
});
