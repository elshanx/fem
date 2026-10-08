const form = document.getElementById('signup');
const email = document.getElementById('email');
const error = document.getElementById('email-error');

const showError = (message) => {
  error.textContent = message;
  if (message) email.setAttribute('aria-invalid', 'true');
  else email.removeAttribute('aria-invalid');
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (email.validity.valueMissing) return showError('Please enter your email address');
  if (!email.validity.valid) return showError('Please enter a valid email address');
  showError('');
  form.reset();
});

email.addEventListener('input', () => error.textContent && showError(''));
