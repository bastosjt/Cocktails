function retour_menu_index() {
  window.location.href = 'index.html';
}

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
    <div class="element_box" id="${cocktail.id}">
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
    <div class="element_box" id="${mocktail.id}">
      <img class="element_box_img" src="drinks/${mocktail.image}">
      <img class="element_box_b" src="icones/B.svg" width="35px">
      <div class="element_box_title">
        <h1>${mocktail.title}</h1>
        <p>${mocktail.ingredients_desc}</p>
      </div>
    </div>
  `).join('');
});