"use strict";
// Const tags
const selectedTagList       = document.querySelector(".selected-tag-list");

const ingredientContainer   = document.querySelector(".ingredients-fieldset");
const appareilContainer     = document.querySelector(".appareils-fieldset");
const ustensileContainer    = document.querySelector(".ustensiles-fieldset");

const ingredientList        = document.querySelector(".ingredients-list");
const applianceList         = document.querySelector(".appareils-list");
const ustensileList         = document.querySelector(".ustensiles-list");

const ingredientsBtn        = document.querySelector(".btn-ingredient");
const appareilsBtn          = document.querySelector(".btn-appareil");
const ustensilesBtn         = document.querySelector(".btn-ustensile");

const ingredientFa          = document.querySelector(".ingredient-fa");
const appareilFa            = document.querySelector(".appareil-fa");
const ustensileFa           = document.querySelector(".ustensile-fa");

const inputIngredients      = document.getElementById("ingredients");
const inputAppareils        = document.getElementById("appareils");
const inputUstensiles       = document.getElementById("ustensiles");

const legendIngredients     = document.querySelector(".ingredients-legend");
const legendAppareils       = document.querySelector(".appareils-legend");
const legendUstensiles      = document.querySelector(".ustensiles-legend");

let isFiltred = false;

/**
 * Crée un élément de tag sélectionné et l'ajoute à la liste des tags sélectionnés.
 *
 * @param {string} clickedTag - Le tag cliqué.
 * @param {Event} event - L'objet événement.
 */
function createSelectedTagElt(clickedTag, event) {

  let selectedTagElt = document.createElement("li");
  selectedTagElt.classList.add("selected-tag-elt");
  selectedTagElt.textContent = clickedTag;

  // Récupère le dataset de l'élément de liste sélectionné et ajoute celui-ci en classe du tag sélectionné
  const tagClass = event.target.dataset.tagClass;
  selectedTagElt.classList.add(tagClass);

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

/**
 * Crée un élément de liste avec le nom de classe, le contenu donné, et l'ajoute à la liste fournie.
 *
 * @param {string} className - Le nom de classe pour l'élément de liste.
 * @param {string} content - Le contenu à afficher dans l'élément de liste.
 * @param {HTMLElement} list - La liste à laquelle l'élément de liste sera ajouté.
 * @return {HTMLElement} - L'élément de liste créé.
 */ 
function createList(className, content, list) {

  let element               = document.createElement("li");
  element.classList.add("tag");
  element.dataset.tagClass  = className;
  element.textContent       = content;
  element.style.color       = "white";
  list.appendChild(element);
  
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

    ingredientElt.addEventListener("click", event => {

      const clickedTag = event.target.textContent;
      createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste

      const selectedTags = getSelectedTags();
      filterRecipesByTags(selectedTags);  // filtrage des recettes en fonctions des tag sélectionnés 

      /* testFilteredRecipes();   //affichage de la liste en fonction des recettes affichées */
    });
  }
}

/**
 * Affiche les ingrédients recherchés dans l'input et cache les autres
 *
 * @param {Event} event - L'objet événement.
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

  existingTags.forEach(tag => tag.remove());
  //if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête.
  
  for (let i = 0; i < uniqueApplianceArray.length; i++) {

    let applianceElt = createList("appareils-tag", uniqueApplianceArray[i], applianceList);
    
    applianceElt.addEventListener("click", event => {

      const clickedTag = event.target.textContent;
      createSelectedTagElt(clickedTag, event);  // création du tag sélectionné au clique sur l'élement de liste

      const selectedTags = getSelectedTags();
      filterRecipesByTags(selectedTags);  // filtrage des recettes en fonctions des tag sélectionnés 

      /* testFilteredRecipes(); // affichage de la liste en fonction des recettes affichées */
    });
  }
}

/**
 * Affiche les appareils recherchés dans l'input et cache les autres
 *
 * @param {Event} event - L'objet événement.
 */
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
 * @param {object} uniqueUstensileArray
 */
function createUstensileList(uniqueUstensileArray) {

  ustensileList.style.display  = "flex";
  const existingTags = ustensileList.querySelectorAll(".tag");

  existingTags.forEach(tag => tag.remove());
  //if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête.
  
  for (let i = 0; i < uniqueUstensileArray.length; i++) {

    let ustensileElt = createList("ustensiles-tag", uniqueUstensileArray[i], ustensileList);
    
    ustensileElt.addEventListener("click", event => {
      const clickedTag = event.target.textContent;
      createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élement de liste

      const selectedTags = getSelectedTags();
      filterRecipesByTags(selectedTags);  // filtrage des recettes en fonctions des tag sélectionnés 

      /* testFilteredRecipes(); // affichage de la liste en fonction des recettes affichées */
    });
  }
}

/**
 * Affiche les ustensiles recherchés dans l'input et cache les autres
 *
 * @param {Event} event - L'objet événement.
 */
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

// Si pas de tag selectionné : lance liste normale, sinon lance les listes filtrées
function isIngredientTagSelected() {
  let selectedTags = getSelectedTags();

  if (selectedTags.length === 0) {

    createIngredientList(uniqueIngredientArray);
    console.log("Lance liste recettes non filtrées");
  } else {

    testFilteredRecipes();
    ingredientList.style.display = "flex";
    ingredientList.style.width   = "100%";
    console.log("Lance liste recettes avec le filtrage");
  }
}

// Affiche la liste des ingrédients, et limite la taille des autres fieldset
function displayIngredientList() {

  //createIngredientList(ingredients);
  isIngredientTagSelected();
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

// Si pas de tag selectionné : lance liste normale, sinon lance les listes filtrées
function isApplianceTagSelected() {
  let selectedTags = getSelectedTags();

  if (selectedTags.length === 0) {

    createApplianceList(uniqueApplianceArray);
    console.log("Lance les recettes non filtrées");
  
  } else {

    testFilteredRecipes();
    applianceList.style.display = "flex";
    applianceList.style.width   = "100%";
    console.log("Lance les recettes avec le filtrage");
  }
}

// Affiche la liste des appareils, et limite la taille des autres fieldset
function displayApplianceList() {

  isApplianceTagSelected();
  //createApplianceList(uniqueApplianceArray);
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

// Si pas de tag selectionné : lance liste normale, sinon lance les listes filtrées
function isUstensileTagSelected() {
  let selectedTags = getSelectedTags();

  if (selectedTags.length === 0) {

    createUstensileList(uniqueUstensileArray);
    console.log("Lance les recettes non filtrées");

  } else {

    testFilteredRecipes();
    ustensileList.style.display = "flex";
    ustensileList.style.width   = "100%";
    console.log("Lance les recettes avec le filtrage");
  }
}

// Affiche la liste des ustensiles, et limite la taille des autres fieldset
function displayUstensileList() {

  isUstensileTagSelected();
  //createUstensileList(uniqueUstensileArray);
  applianceList.style.display       = "none";
  ingredientList.style.display      = "none";
  ustensileList.classList.add("overlay-ustensiles");
  ustensileContainer.style.width    = "700px";
  appareilContainer.style.height    = "80px";
  ustensileContainer.style.height   = "80px";
  ingredientContainer.style.height  = "80px";
  legendUstensiles.textContent      = "Rechercher un ustensile";
  legendUstensiles.style.opacity    = "0.7";
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
  container.style.width    = "auto";
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

// réinitialise les valeurs des éléments des fieldset appareils et ustensiles
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

// réinitialise les valeurs des éléments des fieldset ingredients et ustensiles
function resetIngredientUstensileFieldset() {

  ingredientContainer.style.width    = "auto";
  legendIngredients.textContent      = "Ingrédients";
  legendIngredients.style.opacity    = "1";
  legendIngredients.classList.remove('smaller-legend-font-size');
  ingredientFa.classList.remove("rotate180");
  ustensileContainer.style.width     = "auto";
  legendUstensiles.textContent       = "Ustensiles";
  legendUstensiles.style.opacity     = "1";
  legendUstensiles.classList.remove('smaller-legend-font-size');
  ustensileFa.classList.remove("rotate180");
}

appareilFa.addEventListener('click', resetIngredientUstensileFieldset);
inputAppareils.addEventListener('click', resetIngredientUstensileFieldset);

// réinitialise les valeurs des éléments des fieldset ingredients et appareils
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
    let filteredRecipes;
    
    filteredRecipes = recipesToLowerCase.filter(recipe => { // création nouveau tableau 

      let hasMatchingIngredient = selectedTags.every(tag => {
        return recipe.ingredients.some(ingredient => {
          return ingredient.ingredient === tag;
        }); // vérifie si la recette a des ingrédients correspondant aux tags
      });

      let hasMatchingAppliance = selectedTags.includes(recipe.appliance); // de même pour les appareils

      let hasMatchingUstensil = recipe.ustensils.some(ustensil => {
        return selectedTags.includes(ustensil); // de même pour les ustensiles 
      })
      
      let hasMatchingTag = hasMatchingIngredient || hasMatchingAppliance || hasMatchingUstensil;
      return hasMatchingTag; // si la recette a un ingrédient/appareil ou ustensile correspondant au tag, l'ajoute au tableau
    });
    
    console.log('Filtered Recipes:', filteredRecipes);
    recipeSection.style.display = "none";
  
    filteredRecipes.forEach(recipe => { // affiche les recettes liées aux tag sélectionnés 
  
      createSearchRecipesStructure(recipe);
    });
    resolve(filteredRecipes);
    //return filteredRecipes;
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

// Fonction affichant les 3 listes en fonctions des recettes filtrées par les tags
function testFilteredRecipes() {
  let selectedTags = getSelectedTags();
  filterRecipesByTags(selectedTags) // filtrage des recettes en fonctions des tag sélectionnés 
    .then(filteredRecipes => {
      const existingTags = document.querySelectorAll(".tag");
      existingTags.forEach(tag => tag.remove()); //! Meilleure solution je pense pr pas afficher +eur x la liste - SERT A RIEN?
      //if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête. 

      let filteredIngredientList = new Set();
      let filteredAppareilList = new Set();
      let filteredUstensileList = new Set();

      for (let i = 0; i < filteredRecipes.length; i++) {
        for (let y = 0; y < filteredRecipes[i].ingredients.length; y++) {
          
          let ingredient = filteredRecipes[i].ingredients[y].ingredient;
          // n'affiche pas le tag sélectionné dans la liste ni les doublons
          if (!selectedTags.includes(ingredient) && !filteredIngredientList.has(ingredient)) { 

            let ingredientElt = createList("ingredients-tag", ingredient, ingredientList);
            filteredIngredientList.add(ingredient);
            //console.log(filteredIngredientList);

            ingredientElt.addEventListener("click", event => {

              const clickedTag = event.target.textContent;
              createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste

              const selectedTags = getSelectedTags();
              filterRecipesByTags(selectedTags);  // ! une fois fonction modifiée la relancer ici ?
            });
          }
        }

        let appliance = filteredRecipes[i].appliance;
        // n'affiche pas le tag sélectionné dans la liste ni les doublons
        if (!selectedTags.includes(appliance) && !filteredAppareilList.has(appliance)) { 

          let applianceElt = createList("appareils-tag", appliance, applianceList);
          filteredAppareilList.add(appliance);
          //console.log(filteredAppareilList);

          applianceElt.addEventListener("click", event => {
          
            const clickedTag = event.target.textContent;
            createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste

            const selectedTags = getSelectedTags();
            filterRecipesByTags(selectedTags); // ! une fois fonction modifiée la relancer ici ?
          })
        }
        
        //console.log(applianceElt);
        
        for (let y = 0; y < filteredRecipes[i].ustensils.length; y++) {

          let ustensile = filteredRecipes[i].ustensils[y];
          // n'affiche pas le tag sélectionné dans la liste ni les doublons
          if (!selectedTags.includes(ustensile) && !filteredUstensileList.has(ustensile)) {  

            let ustensileElt = createList("ustensiles-tag", ustensile, ustensileList);
            filteredUstensileList.add(ustensile);
            //console.log(filteredUstensileList);
            ustensileElt.addEventListener("click", event => {
            
              const clickedTag = event.target.textContent;
              createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste

              const selectedTags = getSelectedTags();
              filterRecipesByTags(selectedTags);  // ! une fois fonction modifiée la relancer ici ?
            })
          }
        }
      }
    }) 
    .catch(error => {
      console.log(error);
    })
}
