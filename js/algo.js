"use strict";

const mainSearchElt         = document.getElementById("search-bar");
const ingredientsInput      = document.getElementById("ingredients");
const appareilsInput        = document.getElementById("appareils");
const ustensilesInput       = document.getElementById("ustensiles");
const ustensileList         = document.querySelector(".ustensiles-list");
const ingredientList        = document.querySelector(".ingredients-list");
const applianceList         = document.querySelector(".appareils-list");
const selectedTag           = document.querySelector(".selected-tag");

let recipesToLowerCase      = structuredClone(recipes);
console.log(recipes, "Recipes de base");
// 2eme tableau recipes en lowercase mais change aussi recipes
for (let i = 0; i < recipes.length; i++) {
  
  recipesToLowerCase[i].appliance = recipesToLowerCase[i].appliance.toLowerCase();
  //console.log(recipes[i].appliance);
  //console.log(recipesToLowerCase[i].appliance);

  for (let y = 0; y < recipes[i].ingredients.length; y++) {
    recipesToLowerCase[i].ingredients[y].ingredient = recipesToLowerCase[i].ingredients[y].ingredient.toLowerCase();
  }

  for (let y = 0; y < recipes[i].ustensils.length; y++) {
    recipesToLowerCase[i].ustensils[y] = recipesToLowerCase[i].ustensils[y].toLowerCase();
  }
}
console.log(recipesToLowerCase, "Le recipe lower case");

//                                             Barre de recherche

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

// ajoute dans un tableau les recettes dont le nom correspond à l'input (en majuscule ou non)
function fillRecipesArrayForNames(value, items, recipe) {
  if (recipe.name.includes(value) || recipe.name.toLowerCase().includes(value)) {

    items.push(recipe);
  }
}

// ajoute dans un tableau les recettes dont la description correspond à l'input (en majuscule ou non)
function fillRecipesArrayForDescriptions (value, items, recipe) {
  if (recipe.description.includes(value) || recipe.description.toLowerCase().includes(value)) {

    items.push(recipe);
  }
}

// ajoute dans un tableau les recettes dont les ingrédients correspondent à l'input (en majuscule ou non)
function fillRecipesArrayForIngredients (value, items, recipe) {
  for (let ingredient of recipe.ingredients) {
          
    if (ingredient.ingredient.includes(value) || ingredient.ingredient.toLowerCase().includes(value)) {

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
  
  let recipeSection = document.querySelector(".recipes-list");
  let recipeSearchSection = document.querySelector(".recipes-search-list");
  let errorMessage = document.createElement("p");

  recipeSection.style.display = "none";
  errorMessage.innerText = "Aucune recette ne correspond à votre critère... Vous pouvez chercher <<tarte aux pommes>>, <<poisson>>, etc.";

  recipeSearchSection.appendChild(errorMessage);
}

/**
 * Fonction appelant celle qui crée la stucture d'une recette recherchée afin de la boucler sur le tableau de toutes celles recherchées.
 * Si ce tableau de contient aucune recette, appelle la fonction qui affiche le message d'erreur.
 * @param {object} searchRecipes 
 */
function loopSearchRecipes(searchRecipes) {
  
  if (searchRecipes.length > 0) {
    console.log(searchRecipes);
    for (let i = 0; i < searchRecipes.length; i++) {
    
      createSearchRecipesStructure(searchRecipes[i]);
    }
  } else  {
    console.log("Error");
    displayErrorMessage();
  }
};

/**
 * fonction qui, si la recherche contient 3 caractère va chercher les noms de recettes, les descriptions et les ingrédients correspondants
 * afin d'ajouter les recettes concernées dans un tableau. Puis appelle la fonction qui va les afficher.
 * @param {object} event 
 */
function searchRecipes(event) {
  let recipeSection = document.querySelector(".recipes-list");
  let value = event.target.value;
  value = value.toLowerCase();
  
    if ( value.length >= 3 ) {
      let items = [];
      recipeSection.style.display = "none";
    
      for (let recipe of recipes) {
          
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

mainSearchElt.addEventListener("input", searchRecipes);

//                                           TAGS
/**
 * Affiche le tableau des appareils dans une liste
 * @param {object} uniqueIngredientArray 
 */
function createIngredientList(uniqueIngredientArray) {

  ingredientList.style.display  = "block";

  for (let i = 0; i < uniqueIngredientArray.length; i++) {
    
    let ingredientElt          = document.createElement("li");
    ingredientElt.classList.add("tag");
    ingredientElt.textContent  = uniqueIngredientArray[i];
    ingredientList.appendChild(ingredientElt);
  }
}

/**
 * Affiche le tableau des appareils dans une liste
 * @param {object} uniqueApplianceArray 
 */
function createApplianceList(uniqueApplianceArray) {

  applianceList.style.display = "block";
  
  for (let i = 0; i < uniqueApplianceArray.length; i++) {
    
    let applianceElt         = document.createElement("li");
    applianceElt.classList.add("tag");
    applianceElt.textContent = uniqueApplianceArray[i];
    applianceList.appendChild(applianceElt);
  }
}

/**
 * Affiche le tableau des ustensiles dans une liste 
 * @param {object} uniqueUstensilArray
 */
function createUstensileList(uniqueUstensilArray) {

  ustensileList.style.display  = "block";

  for (let i = 0; i < uniqueUstensilArray.length; i++) {
    
    let ustensileElt         = document.createElement("li");
    ustensileElt.classList.add("tag");
    ustensileElt.textContent = uniqueUstensilArray[i];
    ustensileList.appendChild(ustensileElt);
  }
}

//addeventlistener appelant les listes de tag, et les efface si perte du focus
document.addEventListener('click', (event) => {

  let ingredientFocus = event.composedPath().includes(ingredientsInput);
  let appareilFocus   = event.composedPath().includes(appareilsInput);
  let ustensilFocus   = event.composedPath().includes(ustensilesInput);

  if (ingredientFocus) {
    createIngredientList(uniqueIngredientArray);
    applianceList.style.display  = "none";
    ustensileList.style.display  = "none";
  } else if (appareilFocus) {
    createApplianceList(uniqueApplianceArray);
    ingredientList.style.display  = "none";
    ustensileList.style.display  = "none";
  } else if (ustensilFocus) {
    createUstensileList(uniqueUstensilArray);
    applianceList.style.display  = "none";
    ingredientList.style.display  = "none";
  } else {
    applianceList.style.display  = "none";
    ustensileList.style.display  = "none";
    ingredientList.style.display  = "none";
  }
})