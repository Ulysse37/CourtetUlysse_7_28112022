"use strict";
//console.log(recipes);

function createRecipesStructure(data) {

  let recipesSection                  = document.querySelector(".recipes-list");
  recipesSection.style.display        = "flex";
  recipesSection.style.flexWrap       = "wrap";
  recipesSection.style.flexDirection  = "row";
  recipesSection.style.justifyContent = "center";

  let recipesElt                      = document.createElement("li");
  recipesElt.style.width              = "25%";
  recipesElt.style.display            = "flex";
  recipesElt.style.flexDirection      = "column";
  recipesElt.style.margin             = "0rem 3rem 0rem 3rem";
  recipesSection.appendChild(recipesElt);

  let recipesLink                     = document.createElement("a");
  recipesLink.href                    = "#";
  recipesLink.textDecoration          = "none";
  recipesElt.appendChild(recipesLink);

  let figureElt                       = document.createElement("figure");
  figureElt.style.borderRadius        = "8px";
  figureElt.style.backgroundColor     = "#A4A4A4";
  recipesLink.appendChild(figureElt);

  let figureBackground                = document.createElement("div");
  figureBackground.style.height       = "12rem";
  figureElt.appendChild(figureBackground);

  let figcaptionElt                   = document.createElement("figcaption");
  figcaptionElt.style.display         = "flex";
  figcaptionElt.style.flexWrap        = "wrap";
  figcaptionElt.style.flexDirection   = "row";
  figcaptionElt.style.justifyContent  = "space-between";
  figcaptionElt.style.borderRadius    ="0 0 8px 8px";
  figcaptionElt.style.backgroundColor = "#E6E6E6";
  figureElt.appendChild(figcaptionElt);
  // NAME
  let nameElt                         = document.createElement("h2");
  nameElt.innerText                   = data.name;
  nameElt.style.display               = "flex";
  nameElt.style.justifyContent        = "space-between";
  nameElt.style.width                 = "100%";
  nameElt.style.margin                = "1rem";               
  nameElt.style.fontSize              = "150%";
  figcaptionElt.appendChild(nameElt);

//Todo Les appendChild sont-ils good practices ???
  // TIME 
 let timeIcon                         = document.createElement("i");
  timeIcon.classList.add("fa-regular");
  timeIcon.classList.add("fa-clock");
  nameElt.appendChild(timeIcon);
  // TIME
  let timeElt                         = document.createElement("span");
  timeElt.innerText                   = data.time + " min";
  timeElt.style.marginLeft            = "0.5rem";
  timeElt.style.fontFamily            = "Latto";
  timeIcon.appendChild(timeElt);
   
// INGREDIENTS, QUANTITES ET UNITES 
  let ingredientsList                 = document.createElement("ul");
  ingredientsList.style.margin = "0 0 1rem 1rem";
  figcaptionElt.appendChild(ingredientsList);

  let ingredients     = []; 
  for (let i = 0; i < data.ingredients.length; i++) {
      ingredients[i]  = document.createElement("li");
      if(data.ingredients[i].unit         === "cl") { // Ajout syntaxe dans le cas des ml/cl, des autres unités ou de leurs absences.
        ingredients[i].innerText = data.ingredients[i].ingredient + " : " + data.ingredients[i].quantity + data.ingredients[i].unit;
      } else if(data.ingredients[i].unit  === "ml") {
        ingredients[i].innerText = data.ingredients[i].ingredient + " : " + data.ingredients[i].quantity + data.ingredients[i].unit;
      } else if(data.ingredients[i].unit) {
        ingredients[i].innerText = data.ingredients[i].ingredient + " : " + data.ingredients[i].quantity + " " + data.ingredients[i].unit;
      } else if(data.ingredients[i].quantity) {
        ingredients[i].innerText = data.ingredients[i].ingredient + " : " + data.ingredients[i].quantity;
      } else {
        ingredients[i].innerText = data.ingredients[i].ingredient;
      }
      ingredientsList.appendChild(ingredients[i]);
  }
  // DESCRIPTION
  let descriptionElt  = document.createElement("p");
  descriptionElt.innerText = data.description;
  descriptionElt.style.margin = "0 1rem 1rem 0";
  figcaptionElt.appendChild(descriptionElt);

  //console.log(data);
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
