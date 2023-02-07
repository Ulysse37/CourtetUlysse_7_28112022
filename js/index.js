"use strict";
//console.log(recipes);

// Récupération de l'ul qui va contenir les recettes
function createRecipeSection() {

  let recipeSection                  = document.querySelector(".recipes-list");
  recipeSection.style.display        = "flex";
  recipeSection.style.flexWrap       = "wrap";
  recipeSection.style.justifyContent = "center";

  return recipeSection;
}

// Création de la li qui contient une recette
function createRecipeElt(recipeSection) {

  let recipeElt                      = document.createElement("li");
  recipeElt.classList.add("recipe-element");
  recipeElt.style.width              = "100%";
  recipeElt.style.display            = "flex";
  recipeElt.style.margin             = "0";
  recipeSection.appendChild(recipeElt);

  return recipeElt;
}

// Lien contenant la figure
function createRecipeLink(recipeElt) {

  let recipeLink                     = document.createElement("a");
  recipeLink.href                    = "#";
  recipeElt.appendChild(recipeLink);

  return recipeLink;
}

function createFigureElt(recipeLink) {

  let figureElt                       = document.createElement("figure");
  figureElt.style.borderRadius        = "8px";
  figureElt.style.backgroundColor     = "#BFBDBB";
  figureElt.style.marginTop           = "50px";
  recipeLink.appendChild(figureElt);

  return figureElt;
}

// Div pour stylisé le background de la figure
function createFigureBackground(figureElt) {

  let figureBackground                = document.createElement("div");
  figureBackground.classList.add("figure-height");
  figureBackground.style.height       = "20rem";
  figureElt.appendChild(figureBackground);

  return figureBackground;
}

function createFigcaptionElt(figureElt) {

  let figcaptionElt                   = document.createElement("figcaption");
  figcaptionElt.classList.add("figcaption-height");
  figcaptionElt.style.display         = "flex";
  figcaptionElt.style.flexWrap        = "wrap";
  figcaptionElt.style.flexDirection   = "row";
  figcaptionElt.style.justifyContent  = "space-between";
  figcaptionElt.style.borderRadius    ="0 0 8px 8px";
  figcaptionElt.style.height          = "25rem";
  figcaptionElt.style.backgroundColor = "#E6E6E6";
  figureElt.appendChild(figcaptionElt);
  
  return figcaptionElt;
}

// HEADER contenant le nom et le container du temps de la recette
function createFigcaptionheader(figcaptionElt) {

  let figcaptionHeader                = document.createElement("header");
  figcaptionHeader.style.display      = "flex";
  figcaptionHeader.style.width        = "100%";
  figcaptionHeader.style.margin       = "1rem";  
  figcaptionElt.appendChild(figcaptionHeader);

  return figcaptionHeader;
}

function createRecipesStructure(data) {

  let recipeSection     = createRecipeSection();
  let recipeElt         = createRecipeElt(recipeSection);
  let recipeLink        = createRecipeLink(recipeElt);
  let figureElt         = createFigureElt(recipeLink);
  let figureBackground  = createFigureBackground(figureElt);
  let figcaptionElt     = createFigcaptionElt(figureElt);
  let figcaptionHeader  = createFigcaptionheader(figcaptionElt);

 // Création d'un h2 contenant le nom de la recette
  let nameElt                         = document.createElement("h2");
  nameElt.innerText                   = data.name;
  nameElt.style.width                 = "72%";  
  nameElt.style.marginRight           = "0.4rem";           
  nameElt.style.fontSize              = "26px";
  figcaptionHeader.appendChild(nameElt);

  // Container avec l'icône et le temps de la recette
  let timeContainer                   = document.createElement("p");
  timeContainer.style.width           = "28%";
  timeContainer.style.fontSize        = "25px";
  figcaptionHeader.appendChild(timeContainer);

  // TIME 
  let timeIcon                         = document.createElement("i");
  timeIcon.style.marginRight           = "0.5rem"; 
  timeIcon.classList.add("fa-regular");
  timeIcon.classList.add("fa-clock");
  timeContainer.appendChild(timeIcon);

  // TIME
  let timeElt                         = document.createElement("span");
  timeElt.innerText                   = data.time + " min";
  timeElt.style.fontFamily            = "Latto";
  timeContainer.appendChild(timeElt);

  //Div contenant la liste et la description de la recette
  let mainContainer                   = document.createElement("div");
  mainContainer.style.display         = "flex";
  mainContainer.style.height          = "200px";
  mainContainer.style.margin          = "0 1rem 0 1rem";
  mainContainer.style.lineHeight      = "1";
  figcaptionElt.appendChild(mainContainer);

// INGREDIENTS, QUANTITES ET UNITES 
  let ingredientsList                 = document.createElement("ul");
  ingredientsList.style.marginRight   = "0.5rem";
  ingredientsList.style.width         = "50%";
  mainContainer.appendChild(ingredientsList);

  let ingredients     = []; 
  for (let i = 0; i < data.ingredients.length; i++) {
      ingredients[i]  = document.createElement("li");
      if(data.ingredients[i].unit === "cl" || data.ingredients[i].unit === "ml" ) { // Ajout syntaxe dans le cas des ml/cl, des autres unités ou de leurs absences.
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
  let descriptionElt                  = document.createElement("p");
  descriptionElt.classList.add("text-overflow");
  descriptionElt.innerText            = data.description;
  descriptionElt.style.width          = "50%";
  descriptionElt.style.maxHeight      = "5.7rem";
  descriptionElt.style.marginLeft     = "0.5rem";
  mainContainer.appendChild(descriptionElt);

  //console.log(data);
}

/**
 * Fonction appelant celle qui crée la stucture d'une recette afin de la boucler sur les 50
 * @param {object} recipes 
 */
function displayRecipes(recipes) {
  
  for (let i = 0; i < recipes.length; i++) {
    
    createRecipesStructure(recipes[i]);
  }
}

/**
 * Création d'un tableau regroupant tous les appareils
 * @param {object} recipes 
 */
function createApplianceArray(recipes) {

  let applianceArray = [];

  for (let i = 0; i < recipes.length; i++) {

    let getAppliance = recipes[i].appliance;
    applianceArray.push(getAppliance);
  }
  // Création d'un nouveau tableau qui ne contient aucun doublons d'appareil
  let uniqueApplianceArray = [...new Set(applianceArray)];
  console.log(uniqueApplianceArray);
}

/**
 * Création d'un tableau regroupant tous les ingrédients
 * @param {object} recipes 
 */
function createIngredientArray(recipes) {

  let ingredientArray = [];

  for (let i = 0; i < recipes.length; i++) {

    for (let y = 0; y < recipes[i].ingredients.length; y++) {

      let getIngredient = recipes[i].ingredients[y].ingredient;
      ingredientArray.push(getIngredient);
    }
  }
  // Création d'un nouveau tableau qui ne contient aucun doublons d'ingrédient
  let uniqueIngredientArray = [...new Set(ingredientArray)];
  console.log(uniqueIngredientArray);
}

/**
 * Création d'un tableau regroupant tous les ustensiles
 * @param {object} recipes 
 */
function createUstensileArray(recipes) {

  let ustensileArray = [];

  for (let i = 0; i < recipes.length; i++) {

    for (let y = 0; y < recipes[i].ustensils.length; y++) {

      let getUstensile = recipes[i].ustensils[y];
      ustensileArray.push(getUstensile);
    }
  }
  // Création d'un nouveau tableau qui ne contient aucun doublons d'ustensile
  let uniqueUstensilArray = [...new Set(ustensileArray)];
  console.log(uniqueUstensilArray);
}

/**
 * Fonction d'initialisation du code
 */
function init() {

  displayRecipes(recipes);
  createApplianceArray(recipes);
  createIngredientArray(recipes);
  createUstensileArray(recipes);
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
