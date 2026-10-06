const form = document.getElementById('notify-form');
const input = document.getElementById('email');
const error = document.getElementById('email-error');
const button = form.querySelector('button');

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showError = (message) => {
  error.textContent = message;
  input.setAttribute('aria-invalid', 'true');
  input.classList.remove('motion-safe:animate-shake');
  void input.offsetWidth;
  input.classList.add('motion-safe:animate-shake');
  input.focus();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();

  if (!value) return showError('Whoops! It looks like you forgot to add your email');
  if (!EMAIL.test(value)) return showError('Please provide a valid email address');

  error.textContent = '';
  input.removeAttribute('aria-invalid');
  form.reset();
  button.textContent = 'Thanks!';
  setTimeout(() => (button.textContent = 'Notify Me'), 2000);
});

input.addEventListener('input', () => {
  if (!input.hasAttribute('aria-invalid')) return;
  error.textContent = '';
  input.removeAttribute('aria-invalid');
});
