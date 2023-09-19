"use strict";

const mainSearchElt         = document.getElementById("search-bar");
const recipeSection         = document.querySelector(".recipes-list");
const searchRecipeSection   = document.querySelector(".recipes-search-list");

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

  searchRecipeSection.innerText   = "";
}

// Fonction qui dans le cas d'une recherche non aboutie va afficher un message d'erreur
function displayErrorMessage()  {
  
  let errorMessage        = document.createElement("p");

  recipeSection.style.display = "none";
  errorMessage.innerText      = "Aucune recette ne correspond à votre critère... Vous pouvez chercher <<tarte aux pommes>>, <<poisson>>, etc.";

  searchRecipeSection.appendChild(errorMessage);
}

// Récupération de l'ul qui va contenir seulement les recettes recherchées 
function createSearchRecipeSection() {

  searchRecipeSection.style.display        = "flex";
  searchRecipeSection.style.flexWrap       = "wrap";
  searchRecipeSection.style.justifyContent = "center";

  return searchRecipeSection;
}

/**
 * fonction appelant toutes celles créant la structure de la recette recherchée ainsi que leurs styles.
 * @param {object} data 
 */
function createSearchRecipesStructure(data) {

  createSearchRecipeSection();
  let recipeElt          = createRecipeElt(searchRecipeSection);
  let recipeLink         = createRecipeLink(recipeElt);
  let figureElt          = createFigureElt(recipeLink);
  createFigureBackground(figureElt);
  let figcaptionElt      = createFigcaptionElt(figureElt);
  let figcaptionHeader   = createFigcaptionheader(figcaptionElt);
  createNameElt(figcaptionHeader, data);
  let timeContainer      = createTimeContainer(figcaptionHeader);
  createTimeIcon(timeContainer);
  createTimeElt(timeContainer, data);
  let mainContainer      = createFigcaptionMainContainer(figcaptionElt);
  let ingredientsList    = createIngredientsList(mainContainer);
  getIngredients(ingredientsList, data);
  createDescriptionElt(mainContainer, data);
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
    recipeSection.style.display = "none"; // cache les recettes affichées de base
  
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

    removeDomData(); // supprime l'affichage des recettes recherchées
    recipeSection.style.display = "flex"; // réaffiche les recettes affichées de base
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