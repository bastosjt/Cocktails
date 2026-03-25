// Mêmes animations que l’accueil : header, nav du hero, titre / sous-titre (LoadFadeIn / LoadUp), fond animé en CSS (heroZoomOut sur ::before)

(function () {
  const hero = document.querySelector('#cocktail_page, #mocktail_page, #ingredients_page');
  if (!hero) return;

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const duration = '1s';

  window.addEventListener('load', () => {
    const header = document.querySelector('header.header_fixed');
    if (header) {
      header.style.animation = `LoadFadeIn ${duration} ${ease} forwards`;
      header.style.animationDelay = '0.15s';
    }

    const nav = hero.querySelector('.header_nav_scroll');
    if (nav) {
      nav.style.animation = `LoadFadeIn ${duration} ${ease} forwards`;
      nav.style.animationDelay = '0.28s';
    }

    const h1 = hero.querySelector('.element_title h1');
    if (h1) {
      h1.style.animation = `LoadUp ${duration} ${ease} forwards`;
      h1.style.animationDelay = '0.25s';
    }

    const p = hero.querySelector('.element_title p');
    if (p) {
      p.style.animation = `LoadUp ${duration} ${ease} forwards`;
      p.style.animationDelay = '0.4s';
    }
  });
})();
