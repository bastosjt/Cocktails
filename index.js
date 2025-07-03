//  Animations

// Header
const header = document.querySelector("header");
header.style.opacity = 0;

// Element h1
const ElementTitle_h1 = document.querySelector(".element_title h1");
ElementTitle_h1.style.opacity = 0;

const ElementTitle_p = document.querySelector(".element_title p");
ElementTitle_p.style.opacity = 0;

const ElementTitle_img = document.querySelector(".element_title img");
ElementTitle_img.style.opacity = 0;

window.onload = () => {
    
  // Header
  header.style.animation = "LoadFadeIn 0.8s ease-out forwards";
  header.style.animationDelay = "0.2s";

  // Element h1
  ElementTitle_h1.style.animation = "LoadFadeIn 0.8s ease-out forwards, LoadUp 0.8s ease-out forwards";
  ElementTitle_h1.style.animationDelay = "0.4s";

  // Element p
  ElementTitle_p.style.animation = "LoadFadeIn 0.8s ease-out forwards, LoadUp 0.8s ease-out forwards";
  ElementTitle_p.style.animationDelay = "0.7s";

  // Element img
  ElementTitle_img.style.animation = "LoadFadeIn 0.8s ease-out forwards, LoadUp 0.8s ease-out forwards";
  ElementTitle_img.style.animationDelay = "1s";

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
      <img class="element_box_img" src="drinks/${cocktail.image}">
      <img class="element_box_b" src="icones/B.svg" width="35px">
      <div class="element_box_title">
        <h1>${cocktail.title}</h1>
        <p>${cocktail.ingredients_desc}</p>
      </div>
    </div>
  `).join('');
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
      <img class="element_box_img" src="drinks/${mocktail.image}">
      <img class="element_box_b" src="icones/B.svg" width="35px">
      <div class="element_box_title">
        <h1>${mocktail.title}</h1>
        <p>${mocktail.ingredients_desc}</p>
      </div>
    </div>
  `).join('');
});