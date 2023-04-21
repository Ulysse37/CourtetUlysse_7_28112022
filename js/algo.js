"use strict";

const mainSearchElt         = document.getElementById("search-bar");
const ingredientsElt        = document.getElementById("ingredients");
const appareilsElt          = document.getElementById("appareils");
const ustensilesElt         = document.getElementById("ustensiles");
const lowerCaseIngredients  = uniqueIngredientArray.map(x => x.toLowerCase());
const lowerCaseRecipesNames = recipesNamesArray.map (x => x.toLowerCase());
const lowerCaseDescriptions = recipesDescriptionsArray.map (x => x.toLowerCase());
const lowerCaseAppliances   = uniqueApplianceArray.map (x => x.toLowerCase());
const lowerCaseUstensiles   = uniqueUstensilArray.map (x => x.toLowerCase());
console.log(recipes);
//console.log(lowerCaseIngredients);
//console.log(lowerCaseRecipesNames);
//console.log(lowerCaseDescriptions);

/**
 * Ajoute dans un tableau toute recette correspondant à l'input dans la recherche au dessus de 3 caractères,
  cette recette 
 * 
 */
function searchRecipes() {
  mainSearchElt.addEventListener("input", (e) => {

    let value = e.target.value;
    if ( value.length >= 3 ) {

      let items = [];
    
      for (let recipe of recipes) {
          
          if (recipe.name.includes(value) || recipe.name.toLowerCase().includes(value)) {

            items.push(recipe);
            //console.log(recipe.name);
          }
          
          if (recipe.description.includes(value) || recipe.description.toLowerCase().includes(value)) {

            items.push(recipe);
            //console.log(recipe.description);
            //console.log(recipe.description.toLowerCase());
          }
  
        for (let ingredient of recipe.ingredients) {
          
          if (ingredient.ingredient.includes(value) || ingredient.ingredient.toLowerCase().includes(value)) {

            items.push(recipe);
            //console.log(ingredient.ingredient);
            //console.log(ingredient.ingredient.toLowerCase());
          }
        }
      }
      let uniqueItems = [...new Set(items)];
      console.log(uniqueItems);
      //displaySearchRecipes();
      return true;
    } else {
      return false;
    }
  }) 
}

searchRecipes();

function displaySearchRecipes() {

};

function displayErrorMessage()  {
  let recipeSection = document.querySelector(".recipes-list");
  let recipeSearchSection = document.querySelector(".recipes-search-list");
  let errorMessage = document.createElement("p");

  recipeSection.style.display = "none";
  errorMessage.innerText = "Aucune recette ne correspond à votre critère... Vous pouvez chercher <<tarte aux pommes>>, <<poisson>>, etc.";

  recipeSearchSection.appendChild(errorMessage);
}
  


