"use strict";

/**
 * Crée un élément de liste contenant le tag cliqué et l'ajoute à la liste des tags sélectionnés.
 * @param {string} clickedTag - le tag qui a été cliqué
 */
function createSelectedTagElt(clickedTag, event) {

    let selectedTagElt = document.createElement("li");
    selectedTagElt.classList.add("selected-tag-elt");
    selectedTagElt.textContent = clickedTag;
  
    // Récupère le dataset de l'élément de liste sélectionné et ajoute celui-ci en classe du tag sélectionné
    const tagClass = event.target.dataset.tagClass;
    selectedTagElt.classList.add(tagClass);
    console.log(tagClass);
  
  // crée un bouton de fermeture
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
  
    selectedTagList.appendChild(selectedTagElt);
    selectedTagElt.appendChild(closeButton);
  // addeventlistener pour supprimer l'élément de la liste de tag sélectionné lorsqu'il est cliqué
    closeButton.addEventListener("click", (event) => {
      selectedTagElt.remove();
  
      const selectedTags = getSelectedTags(); 
      resetRecipesDisplay(selectedTags); // réinitialisation affichage des recettes si pas de tag sélectionnés
    });
  };
  
  // fonction 
  function createList(className, content, list) {
  
    let element               = document.createElement("li");
    element.classList.add("tag");
    element.dataset.tagClass  = className;
    element.textContent       = content;
    element.style.color       = "white";
    list.appendChild(element);
    //console.log(element);
    
    return element;
  }
  
  /**
   * Affiche le tableau des ingrédients dans une liste
   * @param {object} uniqueIngredientArray 
   */
  function createIngredientList(uniqueIngredientArray) {
  
    ingredientList.style.display  = "flex";
    const existingTags = ingredientList.querySelectorAll(".tag");
  
    existingTags.forEach(tag => tag.remove()); //! Meilleure solution je pense pr pas afficher +eur x la liste
    //if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête. 
    
    for (let i = 0; i < uniqueIngredientArray.length; i++) {
      let ingredientElt = createList("ingredients-tag", uniqueIngredientArray[i], ingredientList);
      /* let ingredientElt               = document.createElement("li");
      ingredientElt.classList.add("tag");
      ingredientElt.dataset.tagClass  = "ingredients-tag";
      ingredientElt.textContent       = uniqueIngredientArray[i];
      ingredientElt.style.color       = "white";
      ingredientList.appendChild(ingredientElt); */
  
      ingredientElt.addEventListener("click", event => {
  
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
  
        const selectedTags = getSelectedTags();
        filterRecipesByTags(selectedTags); // filtrage des recettes en fonctions des tag sélectionnés 
        testFilteredRecipes();
      });
    }
  }
  
  /**
   * Affiche les ingrédients recherchés dans l'input et cache les autres
   *
   * @param {Event} event trigger de l'action
   */
  function ingredientSearch(event) {
  
    let value = event.target.value;
    value = value.toLowerCase();
    let ingredientArray = Array.from(ingredientList.querySelectorAll("li")); // créer dans un tableau la liste des ingrédients
    
    for (let ingredientElt of ingredientArray) {
      
      if (ingredientElt.textContent.toLowerCase().includes(value)) {
  
        ingredientElt.style.display = "block";
        ingredientList.style.width  = "100%";
  
      } else {
  
        ingredientElt.style.display = "none";
      }
    } 
    
  }
  
  inputIngredients.addEventListener("input", ingredientSearch);
  
  /**
   * Affiche le tableau des appareils dans une liste
   * @param {object} uniqueApplianceArray 
   */
  function createApplianceList(uniqueApplianceArray) {
  
    applianceList.style.display = "flex";
    const existingTags = applianceList.querySelectorAll(".tag");
  
    if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête.
    
    for (let i = 0; i < uniqueApplianceArray.length; i++) {
      let applianceElt = createList("appareils-tag", uniqueApplianceArray[i], applianceList);
      /* let applianceElt              = document.createElement("li");
      applianceElt.classList.add("tag");
      applianceElt.dataset.tagClass = "appareils-tag";
      applianceElt.textContent      = uniqueApplianceArray[i];
      applianceElt.style.width      = "50%";
      applianceElt.style.color      = "white"; 
      applianceList.appendChild(applianceElt); */
      
      applianceElt.addEventListener("click", event => {
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event);  // création du tag sélectionné au clique sur l'élement de liste
  
        const selectedTags = getSelectedTags();
        filterRecipesByTags(selectedTags);  // filtrage des recettes en fonctions des tag sélectionnés 
      });
    }
  }
  
  // Affiche les appareils recherchés dans l'input et cache les autres
  function applianceSearch(event) {
  
    let value = event.target.value;
    value = value.toLowerCase();
    let applianceArray = Array.from(applianceList.querySelectorAll("li")); // créer dans un tableau la liste des appareils
    
    for (let applianceElt of applianceArray) {
  
      if (applianceElt.textContent.toLowerCase().includes(value)) {
  
        applianceElt.style.display = "block";
        applianceList.style.width  = "100%";
  
      } else {
  
        applianceElt.style.display = "none";
      }
    }
  }
  
  inputAppareils.addEventListener("input", applianceSearch);
  
  /**
   * Affiche le tableau des ustensiles dans une liste
   * @param {object} uniqueUstensilArray
   */
  function createUstensileList(uniqueUstensileArray) {
  
    ustensileList.style.display  = "flex";
    const existingTags = ustensileList.querySelectorAll(".tag");
  
    if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête.
    
    for (let i = 0; i < uniqueUstensileArray.length; i++) {
      let ustensileElt = createList("ustensiles-tag", uniqueUstensileArray[i], ustensileList);
      /* let ustensileElt              = document.createElement("li");
      ustensileElt.classList.add("tag");
      ustensileElt.dataset.tagClass = "ustensiles-tag";
      ustensileElt.textContent      = uniqueUstensilArray[i];
      ustensileElt.style.width      = "50%";
      ustensileElt.style.color      = "white"; 
      ustensileList.appendChild(ustensileElt); */
      
      ustensileElt.addEventListener("click", event => {
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élement de liste
  
        const selectedTags = getSelectedTags();
        filterRecipesByTags(selectedTags);  // filtrage des recettes en fonctions des tag sélectionnés 
      });
    }
  }
  
  // Affiche les ustensiles recherchés dans l'input et cache les autres
  function ustensileSearch(event) {
  
    let value = event.target.value;
    value = value.toLowerCase();
    let ustensileArray = Array.from(ustensileList.querySelectorAll("li")); // créer dans un tableau la liste des appareils
    
    for (let ustensileElt of ustensileArray) {
      
      if (ustensileElt.textContent.toLowerCase().includes(value)) {
  
        ustensileElt.style.display = "block";
        ustensileList.style.width  = "100%";
  
      } else {
  
        ustensileElt.style.display = "none";
      }
    }
  }
  
  inputUstensiles.addEventListener("input", ustensileSearch);
  
  // Affiche la liste des ingrédients, et limite la taille des autres fieldset
  function displayIngredientList() {
  
    createIngredientList(uniqueIngredientArray);
    applianceList.style.display         = "none";
    ustensileList.style.display         = "none";
    ingredientList.classList.add("overlay-ingredients"); // ajoute classe pour stylisée la liste d'ingredient
    ingredientContainer.style.width     = "700px"; 
    ingredientContainer.style.height    = "80px";
    appareilContainer.style.height      = "80px";
    ustensileContainer.style.height     = "80px";
    legendIngredients.textContent       = "Rechercher un ingrédient";
    legendIngredients.style.opacity     = "0.7";
    legendIngredients.classList.add('smaller-legend-font-size');
    ingredientFa.classList.add("rotate180"); //ajoute classe pour rotate l'icône de 180°
  }
  // appelle la fonction displayIngredientList quand on appuie sur le bouton ingredient
  ingredientsBtn.addEventListener("click", displayIngredientList);
  // appelle la fonction displayIngredientList quand on appuie sur le </i> du bouton ingredient
  ingredientFa.addEventListener("click", (event) => {
    event.stopPropagation(); // Arrête la propagation de l'événement de clic
    displayIngredientList();
  });
  // appelle la fonction displayIngredientList quand on appuie sur son input
  inputIngredients.addEventListener("click", (event) => {
    displayIngredientList();
    event.stopPropagation();
  });
  
  // Affiche la liste des appareils, et limite la taille des autres fieldset
  function displayApplianceList() {
  
    createApplianceList(uniqueApplianceArray);
    ingredientList.style.display      = "none";
    ustensileList.style.display       = "none";
    applianceList.classList.add("overlay-appareils");
    appareilContainer.style.width     = "700px";
    appareilContainer.style.height    = "80px";
    ustensileContainer.style.height   = "80px";
    ingredientContainer.style.height  = "80px";
    legendAppareils.textContent       = "Rechercher un appareil";
    legendAppareils.style.opacity     = "0.7";
    legendAppareils.classList.add('smaller-legend-font-size');
    appareilFa.classList.add("rotate180"); //ajoute classe pour rotate l'icône de 180°
  }
  // appelle la fonction displayApplianceList quand on appuie sur le bouton appareil
  appareilsBtn.addEventListener("click", displayApplianceList);
  // appelle la fonction displayApplianceList quand on appuie sur le </i> du bouton appareil
  appareilFa.addEventListener("click", (event) => {
    event.stopPropagation(); // Arrête la propagation de l'événement de clic
    displayApplianceList();
  });
  // appelle la fonction displayApplianceList quand on appuie sur son input
  inputAppareils.addEventListener("click", (event) => {
    displayApplianceList();
    event.stopPropagation();
  });
  
  // Affiche la liste des ustensiles, et limite la taille des autres fieldset
  function displayUstensileList() {
  
    createUstensileList(uniqueUstensilArray);
    applianceList.style.display       = "none";
    ingredientList.style.display      = "none";
    ustensileList.classList.add("overlay-ustensiles");
    ustensileContainer.style.width    = "700px";
    appareilContainer.style.height    = "80px";
    ustensileContainer.style.height   = "80px";
    ingredientContainer.style.height  = "80px";
    legendUstensiles.textContent       = "Rechercher un ustensile";
    legendUstensiles.style.opacity     = "0.7";
    legendUstensiles.classList.add('smaller-legend-font-size');
    ustensileFa.classList.add("rotate180"); //ajoute classe pour rotate l'icône de 180°
  }
  // appelle la fonction displayUstensileList quand on appuie sur le bouton appareil
  ustensilesBtn.addEventListener("click", displayUstensileList);
  // appelle la fonction displayUstensileList quand on appuie sur le </i> du bouton appareil
  ustensileFa.addEventListener("click", (event) => {
    event.stopPropagation(); // Arrête la propagation de l'événement de clic
    displayUstensileList();
  });
  // appelle la fonction displayUstensileList quand on appuie sur son input
  inputUstensiles.addEventListener("click", (event) => {
    displayUstensileList();
    event.stopPropagation();
  });
  
  // Eventlistener qui efface les listes si on clique ailleurs que sur les boutons
  document.addEventListener('click', (event) => {
  
    if (!event.target.matches('.btn-ingredient') 
        && !event.target.matches('.btn-appareil') 
        && !event.target.matches('.btn-ustensile')) {
  
      applianceList.style.display  = "none";
      ustensileList.style.display  = "none";
      ingredientList.style.display = "none"; 
    }
  });
  
  // réinitialise la largeur des fieldset si on ne clique pas sur son btn ainsi que le contenu et style de la légende
  function resetDisplay(container, legend, content, className) {
    container.style.width     = "auto";
    legend.textContent       = content;
    legend.style.opacity     = "1";
    legend.classList.remove('smaller-legend-font-size');
    className.classList.remove("rotate180");
  }
  
  document.addEventListener('click', (event) => {
    if (!event.target.matches('.btn-ingredient')) {
      resetDisplay(ingredientContainer, legendIngredients, "Ingrédients", ingredientFa);
    }
  });
  
  document.addEventListener('click', (event) => {
    if (!event.target.matches('.btn-appareil'))  {
      resetDisplay(appareilContainer, legendAppareils, "Appareils", appareilFa);
    }
  });
  
  document.addEventListener('click', (event) => {
    if (!event.target.matches('.btn-ustensile'))  {
      resetDisplay(ustensileContainer, legendUstensiles, "Ustensiles", ustensileFa);
    }
  });
  
  // réinitialise les valeurs des éléments des fieldset appareil et ustensile
  function resetAppareilUstensileFieldset() {
  
    appareilContainer.style.width     = "auto";
    legendAppareils.textContent       = "Appareils";
    legendAppareils.style.opacity     = "1";
    legendAppareils.classList.remove('smaller-legend-font-size');
    appareilFa.classList.remove("rotate180");
    ustensileContainer.style.width    = "auto";
    legendUstensiles.textContent      = "Ustensiles";
    legendUstensiles.style.opacity    = "1";
    legendUstensiles.classList.remove('smaller-legend-font-size');
    ustensileFa.classList.remove("rotate180");
  }
  
  ingredientFa.addEventListener('click', resetAppareilUstensileFieldset);
  inputIngredients.addEventListener('click', resetAppareilUstensileFieldset);
  
  function resetIngredientUstensileFieldset() {
  
    ingredientContainer.style.width   = "auto";
    legendIngredients.textContent     = "Ingrédients";
    legendIngredients.style.opacity   = "1";
    legendIngredients.classList.remove('smaller-legend-font-size');
    ingredientFa.classList.remove("rotate180");
    ustensileContainer.style.width    = "auto";
    legendUstensiles.textContent       = "Ustensiles";
    legendUstensiles.style.opacity     = "1";
    legendUstensiles.classList.remove('smaller-legend-font-size');
    ustensileFa.classList.remove("rotate180");
  }
  
  appareilFa.addEventListener('click', resetIngredientUstensileFieldset);
  inputAppareils.addEventListener('click', resetIngredientUstensileFieldset);
  
  function resetIngredientAppareilFieldset() {
    
    ingredientContainer.style.width   = "auto";
    legendIngredients.textContent     = "Ingrédients";
    legendIngredients.style.opacity   = "1";
    legendIngredients.classList.remove('smaller-legend-font-size');
    ingredientFa.classList.remove("rotate180");
    appareilContainer.style.width     = "auto";
    legendAppareils.textContent       = "Appareils";
    legendAppareils.style.opacity     = "1";
    legendAppareils.classList.remove('smaller-legend-font-size');
    appareilFa.classList.remove("rotate180");
  }
  
  ustensileFa.addEventListener('click', resetIngredientAppareilFieldset);
  inputUstensiles.addEventListener('click', resetIngredientAppareilFieldset);
  
  // Eventlistener qui efface le legend du fieldset quand on entre dans l'input
  inputIngredients.addEventListener("focus", () => {
    legendIngredients.style.display = "none";
  });
  
  // Eventlistener qui ré-affiche le legend si on sort de l'input et qu'il est vide
  inputIngredients.addEventListener('blur', () => {
    if (inputIngredients.value === '') {
      legendIngredients.style.display = "block";
    }
  });
  
  // De même pour le fieldset appareil
  inputAppareils.addEventListener("focus", () => {
    legendAppareils.style.display = "none";
  });
  
  inputAppareils.addEventListener('blur', () => {
    if (inputAppareils.value === '') {
      legendAppareils.style.display = "block";
    }
  });
  
  // De même pour le fieldset ustensile
  inputUstensiles.addEventListener("focus", () => {
    legendUstensiles.style.display = "none";
  });
  
  inputUstensiles.addEventListener('blur', () => {
    if (inputUstensiles.value === '') {
      legendUstensiles.style.display = "block";
    }
  });
  
  //!                Recherches recettes par tag
  
  // va chercher et mets dans un tableau les tag sélectionnés 
  function getSelectedTags() {
    let selectedTags = [];
  
    let selectedTagElt = selectedTagList.querySelectorAll('.selected-tag-elt');
  
    selectedTagElt.forEach(tagElement => {
  
      let tagText = tagElement.textContent.split('×')[0];
      // divise le texte en 2 au symbole x du close button, et seule la 1ere partie est ajoutée au tableau
      // afin d'éviter d'avoir le bouton x dans le tableau.
      selectedTags.push(tagText);
    });
    selectedTags = selectedTags.map(tag => tag.toLowerCase()); // Passe le tableau en lower case
    //console.log(selectedTags);
    return selectedTags;
  }
  
  /**
   * Filtre les recettes en fonctions des tag sélectionnés 
   * @param {Array} selectedTags
   */
  function filterRecipesByTags(selectedTags) {
    return new Promise((resolve, reject) => {
      console.log('Selected Tags:', selectedTags);
      removeDomData(); // efface les recette recherchées précédemment
      let filteredRecipes = recipesToLowerCase.filter(recipe => { // création nouveau tableau 
        //console.log('Recipe:', recipesToLowerCase);
    
        let hasMatchingIngredient = recipe.ingredients.some(ingredient => {
          return selectedTags.includes(ingredient.ingredient); // vérifie si la recette a un ingrédient correspondant au tag
        });
    
        let hasMatchingAppliance = selectedTags.includes(recipe.appliance); // de même pour les appareils
    
        let hasMatchingUstensil = recipe.ustensils.some(ustensil => {
          return selectedTags.includes(ustensil); // de même pour les ustensiles 
        })
    
        /* console.log('Has Matching Ingredient:', hasMatchingIngredient);
        console.log('Has Matching Appliance:', hasMatchingAppliance);
        console.log('Has Matching Ustensil:', hasMatchingUstensil); */
        
        let hasMatchingTag = hasMatchingIngredient || hasMatchingAppliance || hasMatchingUstensil;
        //console.log('Has Matching Tag:', hasMatchingTag);
        return hasMatchingTag; // si la recette a un ingrédient/appareil ou ustensile correspondant au tag, l'ajoute au tableau
      });
    
      console.log('Filtered Recipes:', filteredRecipes);
    /*   console.log('Filtered Recipes Length :', filteredRecipes.length);
      console.log('Filtered Recipes Ingredients :', filteredRecipes[0].ingredients[0]);
      console.log('Filtered Recipes Ingredients Ingredient :', filteredRecipes[0].ingredients[0].ingredient);
      console.log('Filtered Recipes Ingredients Ingredient 0:', filteredRecipes[0].ingredients[0].ingredient[0]);
      console.log('Filtered Recipes Ingredients Ingredient 1:', filteredRecipes[0].ingredients[0].ingredient[1]); */
      recipeSection.style.display = "none";
    
      filteredRecipes.forEach(recipe => { // affiche les recettes liées aux tag sélectionnés 
    
        createSearchRecipesStructure(recipe);
      });
      resolve(filteredRecipes);
      //return filteredRecipes;
    })
  }
  
  function testFilteredRecipes() {
    let selectedTags = getSelectedTags();
    filterRecipesByTags(selectedTags) // filtrage des recettes en fonctions des tag sélectionnés 
      .then (filteredRecipes => {
        console.log("FILTERED RECIPES :", filteredRecipes);
        ingredientList.style.display  = "flex";
        const existingTags = ingredientList.querySelectorAll(".tag");
      
        existingTags.forEach(tag => tag.remove()); //! Meilleure solution je pense pr pas afficher +eur x la liste
        //if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête. 
        
        for (let i = 0; i < filteredRecipes.length; i++) {
          for (let y = 0; y < filteredRecipes[i].ingredients.length; y++) {
            createList("ingredients-tag", filteredRecipes[i].ingredients[y].ingredient, ingredientList);
            /* let ingredientElt               = document.createElement("li");
            ingredientElt.classList.add("tag");
            ingredientElt.dataset.tagClass  = "ingredients-tag";
            ingredientElt.textContent       = filteredRecipes[i].ingredients[y].ingredient;
            ingredientElt.style.color       = "white";
            ingredientList.appendChild(ingredientElt);
            console.log(ingredientElt); */
            }
      }
    }) 
      .catch(error => {
        console.log(error);
      })
  }
  
  
  // si aucun tag n'est sélectionné affiche toutes les recettes 
  function resetRecipesDisplay(selectedTags) {
    // Vérifie si aucun tag n'est sélectionné
    if (selectedTags.length === 0) {  // Si aucun tag sélectionné 
      
      recipeSection.style.display = "flex"; // affiche les recettes de base
      return;
    }
  }