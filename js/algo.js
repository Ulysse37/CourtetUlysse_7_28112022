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
console.log(recipes);

// ajoute dans un tableau les recettes dont le nom correspond à l'input
function getRecipesNames(value, items, recipe) {
  if (recipe.name.includes(value) || recipe.name.toLowerCase().includes(value)) {

    items.push(recipe);
    //console.log(recipe.name);
  }
}

// ajoute dans un tableau les recettes dont la description correspond à l'input
function getRecipesDescriptions (value, items, recipe) {
  if (recipe.description.includes(value) || recipe.description.toLowerCase().includes(value)) {

    items.push(recipe);
    //console.log(recipe.description);
    //console.log(recipe.description.toLowerCase());
  }
}

// ajoute dans un tableau les recettes dont les ingrédients correspondent à l'input
function getRecipesIngredients (value, items, recipe) {
  for (let ingredient of recipe.ingredients) {
          
    if (ingredient.ingredient.includes(value) || ingredient.ingredient.toLowerCase().includes(value)) {

      items.push(recipe);
      //console.log(ingredient.ingredient);
      //console.log(ingredient.ingredient.toLowerCase());
    }
  }
}

function getSearchRecipes(event) {
  let value = event.target.value;
  value = value.toLowerCase();
    if ( value.length >= 3 ) {

      let items = [];
    
      for (let recipe of recipes) {
          
        getRecipesNames(value, items, recipe);
        getRecipesDescriptions (value, items, recipe);
        getRecipesIngredients (value, items, recipe);
      }
      let uniqueItems = [...new Set(items)];
      console.log(value);
      displaySearchRecipes(uniqueItems);
    }
}

mainSearchElt.addEventListener("input", getSearchRecipes);
 
//console.log(searchedRecipes);

function displaySearchRecipes(recipes) {
  
  if (recipes.length > 0) {
    console.log(recipes);
  } else  {
    console.log("Error");
    displayErrorMessage();
  }
};

function displayErrorMessage()  {
  
  let recipeSection = document.querySelector(".recipes-list");
  let recipeSearchSection = document.querySelector(".recipes-search-list");
  let errorMessage = document.createElement("p");

  recipeSection.style.display = "none";
  errorMessage.innerText = "Aucune recette ne correspond à votre critère... Vous pouvez chercher <<tarte aux pommes>>, <<poisson>>, etc.";

  recipeSearchSection.appendChild(errorMessage);
}
  


