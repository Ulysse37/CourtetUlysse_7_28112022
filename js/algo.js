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
//console.log(recipes);
//console.log(lowerCaseIngredients);

/*function searchRecipes() {
  mainSearchElt.addEventListener("input", (e) => {

    let value = e.target.value;
    //console.log(value);
    if ( value.length >= 3 ) {
      
      for (let ingredient of lowerCaseIngredients) {
        
        if (ingredient.includes(value)) {

          console.log(ingredient);
        }
      }
      return true;
    } else {
      return false;
    }
  }) 
}

searchRecipes();
*/

function searchRecipesTest() {
  mainSearchElt.addEventListener("input", (e) => {

    let value = e.target.value;
    //console.log(value);
    if ( value.length >= 3 ) {
      
      for (let recette of recipes) {
        //let ingredientRecette = recette.ingredients;
        console.log(recette.ingredients);
        if (recette.ingredients.includes(value)) {

          //console.log(recette);
        }
      }
      return true;
    } else {
      return false;
    }
  }) 
}

searchRecipesTest();


function filterByIngredients() {
  mainSearchElt.addEventListener("input", (e) => {

    let value = e.target.value;

    for (let i = 0; i < recipes.length; i++) {

      let element = recipes[i];
      let ingredientLowerCase = element.ingredients.map(x => x.toLowerCase());
      //let realLowerCase = ingredientLowerCase.map(x => x.toLowerCase());
      console.log(ingredientLowerCase)
      if (ingredientLowerCase.includes(value)) {
        //console.log(ingredientLowerCase)
        
      }
    }
  })
}

//filterByIngredients();