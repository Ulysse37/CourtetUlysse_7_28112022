"use strict";
//console.log(recipes);

function createRecipesStructure(data) {

  let recipesSection  = document.querySelector(".recipes-list");
  
  let recipesElt      = document.createElement("li");
  recipesSection.appendChild(recipesElt);

  let figureElt       = document.createElement("figure");
  recipesElt.appendChild(figureElt);

  let figcaptionElt   = document.createElement("figcaption");
  figureElt.appendChild(figcaptionElt);
  // NAME
  let nameElt       = document.createElement("h2");
  nameElt.innerText = data.name;
  figcaptionElt.appendChild(nameElt);
  // TIME
  let timeElt         = document.createElement("p");
  timeElt.innerText = data.time + " min";
  figcaptionElt.appendChild(timeElt);

  let ingredientsList = document.createElement("ul");
  figcaptionElt.appendChild(ingredientsList);

  let ingredients     = []; 
  for (let i = 0; i < data.ingredients.length; i++) {
      ingredients[i]  = document.createElement("li");
      if(data.ingredients[i].unit === "cuillères à soupe") {
        ingredients[i].innerText = data.ingredients[i].ingredient + ": " + data.ingredients[i].quantity + " " + data.ingredients[i].unit;
      } else if(data.ingredients[i].unit) {
        ingredients[i].innerText = data.ingredients[i].ingredient + ": " + data.ingredients[i].quantity + data.ingredients[i].unit;
      } else if(data.ingredients[i].quantity){
        ingredients[i].innerText = data.ingredients[i].ingredient + ": " + data.ingredients[i].quantity;
      } else {
        ingredients[i].innerText = data.ingredients[i].ingredient;
      }
      
      ingredientsList.appendChild(ingredients[i]);
  }
  // DESCRIPTION
  let descriptionElt  = document.createElement("p");
  descriptionElt.innerText = data.description;
  figcaptionElt.appendChild(descriptionElt);

  console.log(data);

  //Todo Ajouter le style des éléments ici

}

function displayRecipes(recipes) {

  for (let i = 0; i < recipes.length; i++) {
    
    createRecipesStructure(recipes[i]);
    
  }
}

function init() {

  displayRecipes(recipes);
}

init();

//console.log(recipesSection);

/*function getRecipes() {
    
    const url = 'js/recipes.js';
    try {
        fetch(url)
        .then((res) => {
            console.log(res);
            res.json();
            
        })
        .then((data) => {
            console.log(data);
            const recipes = data.recipes;
            console.log(recipes);
        })

        
    } catch (error) {
        console.log(error);
    } 
}
let recipes = getRecipes();
console.log(recipes);
*/
