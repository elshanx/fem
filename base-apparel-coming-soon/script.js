const form = document.querySelector(".form");
const input = form.querySelector(".form__input");
const error = form.querySelector(".form__error");

function setError(message) {
  error.textContent = message;
  form.classList.toggle("is-invalid", Boolean(message));
  input.toggleAttribute("aria-invalid", Boolean(message));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.validity.valueMissing) return setError("Please provide an email");
  if (!input.checkValidity()) return setError("Please provide a valid email");
  setError("");
  form.reset();
});

input.addEventListener("input", () => setError(""));
