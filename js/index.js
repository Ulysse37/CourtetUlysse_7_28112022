"use strict";
//console.log(recipes);

function createRecipesStyle(data) {

  let recipesSection  = document.querySelector(".recipes-list");
  let recipesElt      = document.createElement("li");
  let figureElt       = document.createElement("figure");
  let figcaptionElt   = document.createElement("figcaption");
  let nameElt         = document.createElement("h2");
  let timeElt         = document.createElement("p");
  let ingredientsList = document.createElement("li");
  let descriptionElt  = document.createElement("p");

  //Todo Ajouter le style des éléments ici

  recipesSection.appendChild(recipesElt);
  recipesElt.appendChild(figureElt);
  figureElt.appendChild(figcaptionElt);
  figcaptionElt.appendChild(nameElt);
  figcaptionElt.appendChild(timeElt);
  figcaptionElt.appendChild(ingredientsList);
  figcaptionElt.appendChild(descriptionElt);
}



function getRecipes(data) {

  const { id, name, serving, appliance, description, time } = data;
  console.log(data);
}

function displayRecipes(recipes) {

  for (let i = 0; i < recipes.length; i++) {
    //console.log(recipes);
    getRecipes(recipes[i]);
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
