"use strict";

const mainSearchElt         = document.getElementById("search-bar");
const ingredientsElt        = document.getElementById("ingredients");
const appareilsElt          = document.getElementById("appareils");
const ustensilesElt         = document.getElementById("ustensiles");
/*const lowerCaseIngredients  = uniqueIngredientArray.map(x => x.toLowerCase());
const lowerCaseRecipesNames = recipesNamesArray.map (x => x.toLowerCase());
const lowerCaseDescriptions = recipesDescriptionsArray.map (x => x.toLowerCase());
const lowerCaseAppliances   = uniqueApplianceArray.map (x => x.toLowerCase());
const lowerCaseUstensiles   = uniqueUstensilArray.map (x => x.toLowerCase());*/
//console.log(lowerCaseIngredients);
//console.log(recipes);

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
  let figureBackground  = createFigureBackground(figureElt);
  let figcaptionElt     = createFigcaptionElt(figureElt);
  let figcaptionHeader  = createFigcaptionheader(figcaptionElt);
  let nameElt           = createNameElt(figcaptionHeader, data);
  let timeContainer     = createTimeContainer(figcaptionHeader);
  let timeIcon          = createTimeIcon(timeContainer);
  let timeElt           = createTimeElt(timeContainer, data);
  let mainContainer     = createFigcaptionMainContainer(figcaptionElt);
  let ingredientsList   = createIngredientsList(mainContainer);
  let ingredients       = getIngredients(ingredientsList, data);
  let descriptionElt    = createDescriptionElt(mainContainer, data);
  //console.log(data);
}

// ajoute dans un tableau les recettes dont le nom correspond à l'input (en majuscule ou non)
function getRecipesNames(value, items, recipe) {
  if (recipe.name.includes(value) || recipe.name.toLowerCase().includes(value)) {

    items.push(recipe);
    //console.log(recipe.name);
  }
}

// ajoute dans un tableau les recettes dont la description correspond à l'input (en majuscule ou non)
function getRecipesDescriptions (value, items, recipe) {
  if (recipe.description.includes(value) || recipe.description.toLowerCase().includes(value)) {

    items.push(recipe);
    //console.log(recipe.description);
    //console.log(recipe.description.toLowerCase());
  }
}

// ajoute dans un tableau les recettes dont les ingrédients correspondent à l'input (en majuscule ou non)
function getRecipesIngredients (value, items, recipe) {
  for (let ingredient of recipe.ingredients) {
          
    if (ingredient.ingredient.includes(value) || ingredient.ingredient.toLowerCase().includes(value)) {

      items.push(recipe);
      //console.log(ingredient.ingredient);
      //console.log(ingredient.ingredient.toLowerCase());
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
function displaySearchRecipes(searchRecipes) {
  
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
function getSearchRecipes(event) {
  let recipeSection = document.querySelector(".recipes-list");
  let value = event.target.value;
  value = value.toLowerCase();
  
    if ( value.length >= 3 ) {
      let items = [];
      recipeSection.style.display = "none";
    
      for (let recipe of recipes) {
          
        getRecipesNames(value, items, recipe);
        getRecipesDescriptions (value, items, recipe);
        getRecipesIngredients (value, items, recipe);
      }
      let uniqueItems = [...new Set(items)]; // supression des doublons dans le tableau des recettes recherchées
      console.log(value);
      removeDomData();
      displaySearchRecipes(uniqueItems);
    } else  {
      removeDomData();
      recipeSection.style.display = "flex";
    }
}

mainSearchElt.addEventListener("input", getSearchRecipes);
