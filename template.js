// Récupère l'id depuis l'URL
const params = new URLSearchParams(window.location.search);
const drinkId = params.get('id');

// Charge les données JSON
fetch('data/drinks.json')
  .then(res => res.json())
  .then(data => {
    const cocktailDetailBg = document.getElementById('cocktail_detail_bg');
    const drink = data.find(item => item.id === drinkId);
    const ContainerCocktailDetailTitle = document.getElementById('cocktail_detail_title');
    const cocktailDesc = document.getElementById('cocktail_desc');

    if (!drink) {
      ContainerCocktailDetailTitle.innerHTML = '<p>Cocktail introuvable.</p>';
      return;
    }

    cocktailDetailBg.innerHTML = `
      <div class="element" id="cocktail_detail_bg_color"></div>
      <div class="element" id="cocktail_detail_bg_container" style="background-image: url('drinks/${drink.img_landscape}');"></div>
    `;

    ContainerCocktailDetailTitle.innerHTML = `
      <div class="cocktail_detail_title_box">
        <h1>${drink.title}</h1>
        <p>${drink.ingredients_desc}</p>
        <img src="icones/B_bar_2.svg" width="150px" id="cocktail_detail_title_img">
      </div>
    `;

     cocktailDesc.innerHTML = `
      <div class="cocktail_desc_container">
        <div class="cocktail_desc_img">
          <img src="icones/cocktail.svg" height="50px" width="50px">
        </div>
        <div class="cocktail_desc_line"></div>
        <div class="cocktail_desc_detail">
          <p>${drink.full_desc}</p>
        </div>
      </div>
      <h1 class="cocktail_desc_container_titles_h1">ingrédients</h1>
      <div class="cocktail_desc_container">
        <div class="cocktail_desc_img">
          <img src="icones/orange.svg" height="50px" width="50px">
        </div>
        <h1 class="cocktail_desc_container_titles_h1_mobile">ingrédients</h1>
        <div class="cocktail_desc_line"></div>
        <div class="cocktail_desc_detail">
          <ul class="ingredients_list">
            ${drink.ingredients_detail.map(ing => `
              <li>${ing.quantite ? `${ing.quantite} de ${ing.nom}` : ing.nom}</li>
            `).join('')}
          </ul>
        </div>
      </div>
      <h1 class="cocktail_desc_container_titles_h1">recette</h1>
      <div class="cocktail_desc_container">
        <div class="cocktail_desc_img">
          <img src="icones/shaker.svg" height="50px" width="50px" id="shaker_icon">
        </div>
        <h1 class="cocktail_desc_container_titles_h1_mobile">recette</h1>
        <div class="cocktail_desc_line"></div>
        <div class="cocktail_desc_detail">
          <ul class="recette_list">
            <ol class="recette_list">
              ${drink.recette.map(etape => `<li>${etape}</li>`).join('')}
            </ol>
          </ul>
        </div>
      </div>
    `;
  });
