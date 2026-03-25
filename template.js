// Récupère l'id depuis l'URL
const params = new URLSearchParams(window.location.search);
const drinkId = params.get('id');

function listOrEmpty(arr) {
  return Array.isArray(arr) ? arr.filter((x) => x != null && String(x).trim() !== '') : [];
}

// Charge les données JSON
fetch('data/drinks.json')
  .then((res) => res.json())
  .then((data) => {
    const cocktailDetailBg = document.getElementById('cocktail_detail_bg');
    const drink = data.find((item) => item.id === drinkId);
    const ContainerCocktailDetailTitle = document.getElementById('cocktail_detail_title');
    const cocktailDesc = document.getElementById('cocktail_desc');

    if (!drink) {
      ContainerCocktailDetailTitle.innerHTML = '<p>Boisson introuvable.</p>';
      return;
    }

    const isMocktail = drink.type === 'mocktail';
    const descIcon = isMocktail ? 'icones/mocktail.svg' : 'icones/cocktail.svg';
    const fullDesc = drink.full_desc || drink.card_desc || '';
    const materiel = listOrEmpty(drink.materiel_detail);
    const ingredients = Array.isArray(drink.ingredients_detail) ? drink.ingredients_detail.filter((ing) => ing && ing.nom) : [];
    const recetteTitles = listOrEmpty(drink.recette_title);
    const recetteTasks = listOrEmpty(drink.recette_task);

    const materielHtml =
      materiel.length > 0
        ? `
      <h1 class="cocktail_desc_container_titles_h1">matériel</h1>
      <div class="cocktail_desc_container">
        <div class="cocktail_desc_img">
          <img src="icones/materiel.svg" height="50px" width="50px">
        </div>
        <h1 class="cocktail_desc_container_titles_h1_mobile">matériel</h1>
        <div class="cocktail_desc_line"></div>
        <div class="cocktail_desc_detail">
          <ul class="ingredients_list">
            ${materiel.map((mat) => `<li>${mat}</li>`).join('')}
          </ul>
        </div>
      </div>`
        : '';

    const ingredientsHtml =
      ingredients.length > 0
        ? `
      <h1 class="cocktail_desc_container_titles_h1">ingrédients</h1>
      <div class="cocktail_desc_container">
        <div class="cocktail_desc_img">
          <img src="icones/orange.svg" height="50px" width="50px">
        </div>
        <h1 class="cocktail_desc_container_titles_h1_mobile">ingrédients</h1>
        <div class="cocktail_desc_line"></div>
        <div class="cocktail_desc_detail">
          <ul class="ingredients_list">
            ${ingredients
              .map((ing) => `<li>${ing.quantite ? `${ing.quantite} de ${ing.nom}` : ing.nom}</li>`)
              .join('')}
          </ul>
        </div>
      </div>`
        : '';

    let recetteHtml = '';
    const recetteLen = Math.min(recetteTitles.length, recetteTasks.length);
    if (recetteLen > 0) {
      const steps = recetteTitles
        .slice(0, recetteLen)
        .map((etape_title, index) => {
          const task = recetteTasks[index] ?? '';
          return `<li>${etape_title}</li><p>${task}</p>`;
        })
        .join('');
      recetteHtml = `
      <h1 class="cocktail_desc_container_titles_h1">préparation</h1>
      <div class="cocktail_desc_container">
        <div class="cocktail_desc_img">
          <img src="icones/shaker.svg" height="50px" width="50px" id="shaker_icon">
        </div>
        <h1 class="cocktail_desc_container_titles_h1_mobile">recette</h1>
        <div class="cocktail_desc_line"></div>
        <div class="cocktail_desc_detail">
          <ul class="recette_list">
            <ol class="recette_list">
              ${steps}
            </ol>
          </ul>
        </div>
      </div>`;
    }

    document.title = `${drink.title} — Bastos`;

    const bgImage = drink.img_landscape || drink.image || '';
    cocktailDetailBg.innerHTML = `
      <div class="element" id="cocktail_detail_bg_color"></div>
      <div class="element" id="cocktail_detail_bg_container" style="background-image: url('drinks/${bgImage}');"></div>
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
          <img src="${descIcon}" height="50px" width="50px">
        </div>
        <div class="cocktail_desc_line"></div>
        <div class="cocktail_desc_detail">
          <p>${fullDesc}</p>
        </div>
      </div>

      ${materielHtml}
      ${ingredientsHtml}
      ${recetteHtml}
    `;
  });
