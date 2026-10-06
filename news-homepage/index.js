const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

const setOpen = (open) => {
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.toggleAttribute('data-open', open);
  document.body.classList.toggle('overflow-hidden', open);
};

toggle.addEventListener('click', () => setOpen(!menu.hasAttribute('data-open')));

menu.addEventListener('click', (e) => {
  if (e.target === menu || e.target.closest('a')) setOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.hasAttribute('data-open')) {
    setOpen(false);
    toggle.focus();
  }
});

matchMedia('(min-width: 48rem)').addEventListener('change', (e) => e.matches && setOpen(false));
