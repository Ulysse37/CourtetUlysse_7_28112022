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

function displaySearchRecipes() {

}

function searchRecipes() {
  mainSearchElt.addEventListener("input", (e) => {

    let value = e.target.value;
    //console.log(value);
    if ( value.length >= 3 ) {

      let items = [];
    
      for (let recipe of recipes) {

          if (recipe.name.includes(value) || recipe.name.toLowerCase().includes(value)) {
            console.log(recipe.name);
            items.push(recipe.name);
            //console.log(items);
          }
          
          if (recipe.description.includes(value) || recipe.description.toLowerCase().includes(value)) {
            console.log(recipe.description);
            items.push(recipe.description);
            //console.log(items);
          }
  
        //console.log(recipe.ingredients);
        for (let ingredient of recipe.ingredients) {
          //console.log(ingredient);
          if (ingredient.ingredient.includes(value) || ingredient.ingredient.toLowerCase().includes(value)) {
            console.log(ingredient.ingredient);
            items.push(ingredient.ingredient);
            //console.log(items);
          }
        }
      }
      //displaySearchRecipes(items);
      return true;
    } else {
      return false;
    }
  }) 
}

searchRecipes();
