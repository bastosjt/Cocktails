fetch('data/drinks.json')
  .then(response => response.json())
  .then(data => {
    const resultsContainer = document.getElementById('cocktail_results_container_2');
    const loading = document.getElementById('loading');

    // Affiche le loader
    loading.style.display = 'flex';

    setTimeout(() => {
      // Filtre uniquement les cocktails
      const mocktails = data.filter(drink => drink.type === 'mocktail');

      // Cache le loader
      loading.style.display = 'none';

      // Affiche les cocktails
      if (mocktails.length > 0) {
        resultsContainer.innerHTML = mocktails.map(drink => `
          <div class="results_box" id="${drink.id}">
            <img class="results_box_img" src="drinks/${drink.image}">
            <img class="results_box_b" src="icones/B.svg" width="35px">
            <div class="results_box_title">
              <h1>${drink.title}</h1>
              <p>${drink.ingredients_desc}</p>
            </div>
          </div>
        `).join('');
      } else {
        resultsContainer.innerHTML = `
          <div id="no_result">
            <div id="no_result_div">
              <div id="no_result_div_rotate"></div>
              <img src="icones/cocktail.svg" alt="mocktail">
            </div>
            <p>Aucun cocktail trouvé</p>
          </div>
        `;
      }
    }, 1000);
  });