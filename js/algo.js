"use strict";

const mainSearchElt         = document.getElementById("search-bar");
const recipeSection         = document.querySelector(".recipes-list");

const ustensileList         = document.querySelector(".ustensiles-list");
const ingredientList        = document.querySelector(".ingredients-list");
const applianceList         = document.querySelector(".appareils-list");
// Const tags
const selectedTagList       = document.querySelector(".selected-tag-list");

const ingredientContainer   = document.querySelector(".ingredients-fieldset");
const appareilContainer     = document.querySelector(".appareils-fieldset");
const ustensileContainer    = document.querySelector(".ustensiles-fieldset");

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
console.log(recipes, "Recipes de base");

//  Création d'un tableau contenant recipes mais en miniscule 
let recipesToLowerCase      = structuredClone(recipes);
for (let i = 0; i < recipesToLowerCase.length; i++) {
  
  recipesToLowerCase[i].appliance   = recipesToLowerCase[i].appliance.toLowerCase();
  recipesToLowerCase[i].description = recipesToLowerCase[i].description.toLowerCase();
  recipesToLowerCase[i].name        = recipesToLowerCase[i].name.toLowerCase();

  for (let y = 0; y < recipesToLowerCase[i].ingredients.length; y++) {

    recipesToLowerCase[i].ingredients[y].ingredient = recipesToLowerCase[i].ingredients[y].ingredient.toLowerCase();
  }

  for (let y = 0; y < recipesToLowerCase[i].ustensils.length; y++) {

    recipesToLowerCase[i].ustensils[y] = recipesToLowerCase[i].ustensils[y].toLowerCase();
  }
}
console.log(recipesToLowerCase, "Le recipe lower case");

//                                                  Barre de recherche

// Récupération de l'ul qui va contenir seulement les recettes recherchées 
function createSearchRecipeSection() {

  let recipeSection                  = document.querySelector(".recipes-search-list");
  recipeSection.style.display        = "flex";
  recipeSection.style.flexWrap       = "wrap";
  recipeSection.style.justifyContent = "center";

  return recipeSection;
}

/**
 * fonction appelant toutes celles créant la structure de la recette recherchée ainsi que leurs styles.
 * @param {object} data 
 */
function createSearchRecipesStructure(data) {

  let recipeSection     = createSearchRecipeSection();
  let recipeElt         = createRecipeElt(recipeSection);
  let recipeLink        = createRecipeLink(recipeElt);
  let figureElt         = createFigureElt(recipeLink);
  createFigureBackground(figureElt);
  let figcaptionElt     = createFigcaptionElt(figureElt);
  let figcaptionHeader  = createFigcaptionheader(figcaptionElt);
  createNameElt(figcaptionHeader, data);
  let timeContainer     = createTimeContainer(figcaptionHeader);
  createTimeIcon(timeContainer);
  createTimeElt(timeContainer, data);
  let mainContainer     = createFigcaptionMainContainer(figcaptionElt);
  let ingredientsList   = createIngredientsList(mainContainer);
  getIngredients(ingredientsList, data);
  createDescriptionElt(mainContainer, data);
}

// ajoute dans un tableau les recettes dont le nom correspond à l'input
function fillRecipesArrayForNames(value, items, recipe) {
  if (recipe.name.includes(value))  {

    items.push(recipe);
  }
}

// ajoute dans un tableau les recettes dont la description correspond à l'input
function fillRecipesArrayForDescriptions (value, items, recipe) {
  if (recipe.description.includes(value)) {

    items.push(recipe);
  }
}

// ajoute dans un tableau les recettes dont les ingrédients correspondent à l'input
function fillRecipesArrayForIngredients (value, items, recipe) {
  for (let ingredient of recipe.ingredients) {
          
    if (ingredient.ingredient.includes(value))  {

      items.push(recipe);
    }
  }
}



// Fonction qui reset la recherche à chaque nouvel input de l'utilisateur en supprimant l'affichage des recherches précédentes
function removeDomData() {

  let recipeSection         = document.querySelector(".recipes-search-list");
  recipeSection.innerText   = "";
}

// Fonction qui dans le cas d'une recherche non aboutie va afficher un message d'erreur
function displayErrorMessage()  {
  
  let recipeSearchSection = document.querySelector(".recipes-search-list");
  let errorMessage        = document.createElement("p");

  recipeSection.style.display = "none";
  errorMessage.innerText      = "Aucune recette ne correspond à votre critère... Vous pouvez chercher <<tarte aux pommes>>, <<poisson>>, etc.";

  recipeSearchSection.appendChild(errorMessage);
}

/**
 * Fonction appelant celle qui crée la stucture d'une recette recherchée afin de la boucler sur le tableau de toutes celles recherchées. (uniqueItems)
 * Si ce tableau de contient aucune recette, appelle la fonction qui affiche le message d'erreur.
 * @param {object} searchRecipes 
 */
function loopSearchRecipes(searchArray) {
  
  if (searchArray.length > 0) {
    console.log(searchArray);

    for (let i = 0; i < searchArray.length; i++) {
    
      createSearchRecipesStructure(searchArray[i]);
    }
  } else  {
    console.log("Error");
    displayErrorMessage();
  }
};



/**
 * fonction qui, si la recherche contient 3 caractère va chercher les noms de recettes, les descriptions et les ingrédients correspondants
 * afin d'ajouter les recettes concernées dans un tableau. Puis appelle la fonction qui va les afficher.
 * @param {string} value
 * @param {HTMLElement} recipeSection
 */
function mainSearch(value, recipeSection) {
  
  if ( value.length >= 3 ) {

    let items = [];
    recipeSection.style.display = "none";
  
    for (let recipe of recipesToLowerCase) {
        
      fillRecipesArrayForNames(value, items, recipe);
      fillRecipesArrayForDescriptions (value, items, recipe);
      fillRecipesArrayForIngredients (value, items, recipe);
    }
    let uniqueItems = [...new Set(items)]; // supression des doublons dans le tableau des recettes recherchées
    console.log(value);
    removeDomData();
    loopSearchRecipes(uniqueItems);
  } else  {

    removeDomData();
    recipeSection.style.display = "flex";
  }
}

/**
 * Fonction qui appelle la barre de recherche et les filtres
 * @param {object} event 
 */
function searchRecipes(event) {

  let value = event.target.value;
  value = value.toLowerCase();
  
  mainSearch(value, recipeSection); 
}

mainSearchElt.addEventListener("input", searchRecipes);

//                                                        TAGS

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
  });
};

/**
 * Affiche le tableau des ingrédients dans une liste
 * @param {object} uniqueIngredientArray 
 */
function createIngredientList(uniqueIngredientArray) {

  ingredientList.style.display  = "flex";
  const existingTags = ingredientList.querySelectorAll(".tag");

  if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête.
  
  for (let i = 0; i < uniqueIngredientArray.length; i++) {
    
    let ingredientElt               = document.createElement("li");
    ingredientElt.classList.add("tag");
    ingredientElt.dataset.tagClass  = "ingredients-tag";
    ingredientElt.textContent       = uniqueIngredientArray[i];
    ingredientElt.style.color       = "white";
    ingredientList.appendChild(ingredientElt);

    ingredientElt.addEventListener("click", event => {
      const clickedTag = event.target.textContent;

      /* console.log(clickedTag); */
      createSelectedTagElt(clickedTag, event);
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
    
    let applianceElt              = document.createElement("li");
    applianceElt.classList.add("tag");
    applianceElt.dataset.tagClass = "appareils-tag";
    applianceElt.textContent      = uniqueApplianceArray[i];
    applianceElt.style.width      = "50%";
    applianceElt.style.color      = "white"; 
    applianceList.appendChild(applianceElt);
    
    applianceElt.addEventListener("click", event => {
      const clickedTag = event.target.textContent;
    
      //console.log(clickedTag);
      createSelectedTagElt(clickedTag, event);
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
function createUstensileList(uniqueUstensilArray) {

  ustensileList.style.display  = "flex";
  const existingTags = ustensileList.querySelectorAll(".tag");

  if (existingTags.length > 0) return; // Si les éléments existent déjà la fonction s'arrête.
  
  for (let i = 0; i < uniqueUstensilArray.length; i++) {
    
    let ustensileElt              = document.createElement("li");
    ustensileElt.classList.add("tag");
    ustensileElt.dataset.tagClass = "ustensiles-tag";
    ustensileElt.textContent      = uniqueUstensilArray[i];
    ustensileElt.style.width      = "50%";
    ustensileElt.style.color      = "white"; 
    ustensileList.appendChild(ustensileElt);
    
    ustensileElt.addEventListener("click", event => {
      const clickedTag = event.target.textContent;
      //console.log(clickedTag);
      createSelectedTagElt(clickedTag, event);
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
document.addEventListener('click', (event) => {

  if (!event.target.matches('.btn-ingredient')) {

    ingredientContainer.style.width     = "auto";
    legendIngredients.textContent       = "Ingrédients";
    legendIngredients.style.opacity     = "1";
    legendIngredients.classList.remove('smaller-legend-font-size');
    ingredientFa.classList.remove("rotate180");
  }
});

document.addEventListener('click', (event) => {

  if (!event.target.matches('.btn-appareil'))  {
    
    appareilContainer.style.width     = "auto";
    legendAppareils.textContent       = "Appareils";
    legendAppareils.style.opacity     = "1";
    legendAppareils.classList.remove('smaller-legend-font-size');
    appareilFa.classList.remove("rotate180");
  }
});

document.addEventListener('click', (event) => {

  if (!event.target.matches('.btn-ustensile'))  {

    ustensileContainer.style.width  = "auto";
    legendUstensiles.textContent       = "Ustensiles";
    legendUstensiles.style.opacity     = "1";
    legendUstensiles.classList.remove('smaller-legend-font-size');
    ustensileFa.classList.remove("rotate180");
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