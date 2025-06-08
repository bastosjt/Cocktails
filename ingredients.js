//  Génération div ingredients_results page ingrédients

fetch('data/drinks.json')
  .then(response => response.json())
  .then(data => {
    const filtersContainer = document.getElementById('filters');
    const resultsContainer = document.getElementById('cocktail_results_container');
    const loading = document.getElementById('loading');
    const categories = ["alcool", "jus", "boisson", "sirop"];

    // Obtenir les valeurs uniques pour chaque catégorie
    const filterOptions = {};
    categories.forEach(cat => filterOptions[cat] = new Set());

    data.forEach(drink => {
      categories.forEach(cat => {
        if (Array.isArray(drink[cat])) {
          drink[cat].forEach(item => filterOptions[cat].add(item));
        }
      });
    });

    // Ajout du filtre Type en premier
    const typeLabel = document.createElement('label');
    typeLabel.textContent = "Type : ";
    const typeSelect = document.createElement('select');
    typeSelect.id = "filter-type";
    typeSelect.innerHTML = `
      <option value="">Tous</option>
      <option value="cocktail">Cocktail</option>
      <option value="mocktail">Mocktail</option>
    `;
    typeSelect.addEventListener('change', () => renderFilteredResults(data));
    typeLabel.appendChild(typeSelect);
    filtersContainer.appendChild(typeLabel);

    // Création des autres filtres
    categories.forEach(cat => {
      const label = document.createElement('label');
      label.textContent = `${cat} : `;
      const select = document.createElement('select');
      select.id = `filter-${cat}`;

      // 👉 Trie les options par ordre alphabétique
      const sortedOptions = Array.from(filterOptions[cat]).sort((a, b) =>
        a.localeCompare(b, 'fr', { sensitivity: 'base' })
      );

      select.innerHTML = `<option value="">Tous</option>` +
        sortedOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('');

      select.addEventListener('change', () => renderFilteredResults(data));
      label.appendChild(select);
      filtersContainer.appendChild(label);
    });

    // Fonction de filtrage et d'affichage
    function renderFilteredResults(allDrinks) {
      // Affiche le loader
      loading.style.display = 'flex';

      // Vide les résultats
      resultsContainer.innerHTML = '';

      setTimeout(() => {
        const selectedFilters = {};
        categories.forEach(cat => {
          const val = document.getElementById(`filter-${cat}`).value;
          if (val) selectedFilters[cat] = val;
        });

        const selectedType = document.getElementById('filter-type').value;

        const filtered = allDrinks.filter(drink => {
          if (selectedType && drink.type !== selectedType) return false;
          for (const cat in selectedFilters) {
            if (!drink[cat] || !drink[cat].includes(selectedFilters[cat])) return false;
          }
          return true;
        });

        // Cache le loader
        loading.style.display = 'none';

        // Affiche les résultats filtrés
        if (filtered.length > 0) {
          resultsContainer.innerHTML = filtered.map(drink => `
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
                <img src="icones/cocktail.svg" alt="cocktail">
              </div>
              <p>Aucun résultat trouvé</p>
            </div>
          `;
        }
      }, 500);
    }

    // Affichage initial avec loader
    setTimeout(() => {
      renderFilteredResults(data);
    }, 1000);
  }
);