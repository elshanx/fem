const intro = () => {
  if (!window.gsap || !window.SplitText) {
    document.documentElement.classList.remove('js');
    return;
  }

  gsap.registerPlugin(SplitText);
  const $ = (name) => document.querySelectorAll(`[data-intro="${name}"]`);

  gsap.matchMedia().add(
    {
      reduce: '(prefers-reduced-motion: reduce)',
      animate: '(prefers-reduced-motion: no-preference)',
    },
    ({ conditions }) => {
      if (conditions.reduce) {
        gsap.set('[data-intro], [data-blob]', { visibility: 'visible' });
        return;
      }

      document.querySelectorAll('[data-blob]').forEach((blob) => {
        gsap.to(blob, {
          x: 'random(-200, 200)',
          y: 'random(-200, 200)',
          scale: 'random(0.9, 1.15)',
          duration: 'random(3, 5)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });
      });

      const [title] = $('title');
      const words = SplitText.create(title, { type: 'words' }).words;
      gsap.set(title, { visibility: 'visible' });
      gsap.set($('field'), { transition: 'none' });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-blob], [data-intro="grid"]', { autoAlpha: 0, duration: 2, stagger: 0.2 }, 0)
        .from($('logo'), { autoAlpha: 0, y: -20, duration: 0.6 }, 0.1)
        .from('[data-logo-dot]', { y: -40, autoAlpha: 0, duration: 0.9, ease: 'bounce.out' }, 0.3)
        .from(
          words,
          {
            yPercent: 100,
            autoAlpha: 0,
            filter: 'blur(12px)',
            duration: 0.9,
            stagger: 0.07,
            ease: 'power4.out',
          },
          0.5
        )
        .to(
          '[data-soon]',
          {
            scale: 1.25,
            color: '#4F7DF3',
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
          },
          1.35
        )
        .from($('subtitle'), { autoAlpha: 0, y: 20, duration: 0.7 }, 1.1)
        .from(
          $('field'),
          {
            autoAlpha: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.6)',
            clearProps: 'transform,transition',
          },
          1.3
        )
        .from(
          $('dashboard'),
          {
            autoAlpha: 0,
            y: 120,
            scale: 0.85,
            rotationX: 25,
            transformPerspective: 1200,
            duration: 1.4,
            ease: 'expo.out',
            clearProps: 'transform',
          },
          1.5
        )
        .from(
          $('social'),
          { autoAlpha: 0, scale: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2.5)' },
          2.1
        )
        .from($('credit'), { autoAlpha: 0, y: 10, duration: 0.5, stagger: 0.1 }, 2.4);
    }
  );
};

document.fonts.ready.then(intro);

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
