//  Animations

// Header
const header = document.querySelector("header");

// Element h1
const ElementTitle_h1 = document.querySelector(".element_title h1");

const ElementTitle_p = document.querySelector(".element_title p");

const heroBarImg = document.querySelector("#accueil .hero_bar_img");

window.onload = () => {
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const duration = "1s";

  // Header – fade discret
  header.style.animation = `LoadFadeIn ${duration} ${ease} forwards`;
  header.style.animationDelay = "0.15s";

  // Titre, sous-titre, logo – léger montant + fade, décalés
  ElementTitle_h1.style.animation = `LoadUp ${duration} ${ease} forwards`;
  ElementTitle_h1.style.animationDelay = "0.25s";

  ElementTitle_p.style.animation = `LoadUp ${duration} ${ease} forwards`;
  ElementTitle_p.style.animationDelay = "0.4s";

  if (heroBarImg) {
    heroBarImg.style.animation = `LoadUp ${duration} ${ease} forwards`;
    heroBarImg.style.animationDelay = "0.55s";
  }
};

//  Génération div cocktails page d'accueil

fetch('data/drinks.json')
.then(response => response.json())
.then(data => {
  const container = document.getElementById('cocktails_container');

  if (!container) {
    console.error('Conteneur introuvable');
    return;
  }

  const cocktails = data
    .filter(cocktail => cocktail.type === "cocktail" && ["c1", "c2", "c3"].includes(cocktail.id))
    .slice(0, 3);

  container.innerHTML = cocktails.map(cocktail => `
    <div class="element_box" id="${cocktail.id}" onclick="aller_page_cocktails()">
      <div class="element_box_inner" id="${cocktail.id}_inner">
        <div class="element_box_inner_p">
          <p>${cocktail.card_desc}</p>
        </div>
      </div>
      <div class="element_box_img_wrapper"><img class="element_box_img" src="drinks/${cocktail.image}" alt=""></div>
      <img class="element_box_b" src="icones/B.svg" width="35px">
      <div class="element_box_title">
        <h1>${cocktail.title}</h1>
        <p>${cocktail.ingredients_desc}</p>
      </div>
    </div>
  `).join('');
  revealImagesWhenLoaded(container);
});

//  Génération div mocktails page d'accueil

fetch('data/drinks.json')
.then(response => response.json())
.then(data => {
  const container = document.getElementById('mocktails_container');

  if (!container) {
    console.error('Conteneur introuvable');
    return;
  }

  const mocktails = data
    .filter(mocktail => mocktail.type === "mocktail" && ["m1", "m2", "m3"].includes(mocktail.id))
    .slice(0, 3);

  container.innerHTML = mocktails.map(mocktail => `
    <div class="element_box" id="${mocktail.id}" onclick="aller_page_mocktails()">
      <div class="element_box_inner" id="${mocktail.id}_inner">
        <div class="element_box_inner_p">
          <p>${mocktail.card_desc}</p>
        </div>
      </div>
      <div class="element_box_img_wrapper"><img class="element_box_img" src="drinks/${mocktail.image}" alt=""></div>
      <img class="element_box_b" src="icones/B.svg" width="35px">
      <div class="element_box_title">
        <h1>${mocktail.title}</h1>
        <p>${mocktail.ingredients_desc}</p>
      </div>
    </div>
  `).join('');
  revealImagesWhenLoaded(container);
});