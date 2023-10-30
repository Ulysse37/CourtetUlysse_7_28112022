"use strict";

let recipesNamesArray;
let recipesDescriptionsArray;
let uniqueIngredientArray;
let uniqueApplianceArray;
let uniqueUstensileArray;

/**
 * Récupération de l'ul qui va contenir les recettes
 * @returns {Element} L'élément de la section des recettes.
 */
function createRecipeSection() {
  let recipeSection                  = document.querySelector(".recipes-list");

  recipeSection.style.display        = "flex";
  recipeSection.style.flexWrap       = "wrap";
  recipeSection.style.justifyContent = "center";

  return recipeSection;
}

/**
 * Création de la li qui contient une recette ainsi que certains styles de celle-ci
 * @param {HTMLElement} recipeSection - La section où l'élément de recette sera ajoutée.
 * @return {HTMLElement} L'élément de recette nouvellement créé.
 */
function createRecipeElt(recipeSection) {
  let recipeElt                      = document.createElement("li");

  recipeElt.classList.add("recipe-element");
  recipeElt.style.width              = "100%";
  recipeElt.style.display            = "flex";
  recipeElt.style.margin             = "0";
  recipeSection.appendChild(recipeElt);

  return recipeElt;
}

/**
 * Crée un élément de lien pour une recette et l'ajoute à l'élément de la recette.
 *
 * @param {HTMLElement} recipeElt - L'élément de la recette auquel le lien est ajouté.
 * @return {HTMLAnchorElement} - L'élément de lien créé.
 */
function createRecipeLink(recipeElt) {
  let recipeLink                     = document.createElement("a");

  recipeLink.href                    = "#";
  recipeElt.appendChild(recipeLink);

  return recipeLink;
}

/**
 * Crée un élément de figure et l'ajoute au lien de recette.
 *
 * @param {Object} recipeLink - L'élément de lien auquel l'élément de figure sera ajouté.
 * @return {Object} - L'élément de figure créé.
 */
function createFigureElt(recipeLink) {
  let figureElt                       = document.createElement("figure");

  figureElt.style.borderRadius        = "8px";
  figureElt.style.backgroundColor     = "#BFBDBB";
  figureElt.style.marginTop           = "50px";
  recipeLink.appendChild(figureElt);

  return figureElt;
}

/**
 * Crée un élément de fond de figure div et l'ajoute à l'élément de figure donné.
 * Permet de stylisé le background de la figure
 *
 * @param {HTMLElement} figureElt - L'élément de figure auquel le fond sera ajouté.
 * @return {HTMLElement} L'élément de fond de figure créé.
 */
function createFigureBackground(figureElt) {
  let figureBackground                = document.createElement("div");

  figureBackground.classList.add("figure-height");
  figureBackground.style.height       = "20rem";
  figureElt.appendChild(figureBackground);

  return figureBackground;
}

/**
 * Crée un nouvel élément figcaption et l'ajoute à l'élément de figure donné.
 *
 * @param {HTMLElement} figureElt - L'élément de figure auquel l'élément figcaption sera ajouté.
 * @return {HTMLElement} L'élément figcaption nouvellement créé.
 */
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

/**
 * Crée un élément de balise header et l'ajoute à l'élément figcaption donné.
 * Va contenir le nom et le container du temps de la recette
 * 
 * @param {Element} figcaptionElt - L'élément figcaption auquel ajouter l'élément header.
 * @return {Element} L'élément header créé.
 */
function createFigcaptionheader(figcaptionElt) {
  let figcaptionHeader                = document.createElement("header");

  figcaptionHeader.style.display      = "flex";
  figcaptionHeader.style.width        = "100%";
  figcaptionHeader.style.margin       = "1rem";  
  figcaptionElt.appendChild(figcaptionHeader);

  return figcaptionHeader;
}

/**
 * Crée un nouvel élément HTML pour le nom donné et l'ajoute à l'élément
 * Header fourni.
 *
 * @param {Element} figcaptionHeader - L'élément auquel ajouter l'élément de nom.
 * @param {Object} data - L'objet de données contenant la propriété name.
 * @return {Element} L'élément de nom nouvellement créé.
 */
function createNameElt(figcaptionHeader, data) {
  let nameElt                         = document.createElement("h2");

  nameElt.innerText                   = data.name;
  nameElt.style.width                 = "72%";  
  nameElt.style.marginRight           = "0.4rem";           
  nameElt.style.fontSize              = "26px";
  figcaptionHeader.appendChild(nameElt);

  return nameElt;
}

/**
 * Crée un container de temps ainsi que l'icône et l'ajoute à l'élément figcaptionHeader donné.
 *
 * @param {Element} figcaptionHeader - L'élément figcaption auquel le conteneur de temps sera ajouté.
 * @return {Element} Le conteneur de temps créé.
 */
function createTimeContainer(figcaptionHeader) {
  let timeContainer                   = document.createElement("p");

  timeContainer.style.width           = "28%";
  timeContainer.style.fontSize        = "25px";
  figcaptionHeader.appendChild(timeContainer);

  return timeContainer;
}

/**
 * Crée une icône de temps et l'ajoute au conteneur donné.
 *
 * @param {HTMLElement} timeContainer - L'élément conteneur auquel ajouter l'icône de temps.
 * @return {HTMLElement} L'élément de l'icône de temps créé.
 */
function createTimeIcon(timeContainer) {
  let timeIcon                         = document.createElement("i");

  timeIcon.style.marginRight           = "0.5rem"; 
  timeIcon.classList.add("fa-regular");
  timeIcon.classList.add("fa-clock");
  timeContainer.appendChild(timeIcon);

  return timeIcon;
}

// Temps en  minutes
/**
 * Crée un élément de temps et l'ajoute au conteneur donné.
 *
 * @param {HTMLElement} timeContainer - Le conteneur auquel l'élément de temps sera ajouté.
 * @param {Object} data - L'objet de données contenant la valeur de temps.
 * @return {HTMLElement} L'élément de temps créé.
 */
function createTimeElt(timeContainer, data) {
  let timeElt                         = document.createElement("span");

  timeElt.innerText                   = data.time + " min";
  timeElt.style.fontFamily            = "Latto";
  timeContainer.appendChild(timeElt);

  return timeElt;
}

/**
 * Crée un conteneur principal div de figcaption et l'ajoute à l'élément figcaption.
 * Va contenir la liste d'ingrédient et la description de la recette
 *
 * @param {Element} figcaptionElt - L'élément figcaption auquel le conteneur principal sera ajouté.
 * @return {Element} L'élément conteneur principal créé.
 */
function createFigcaptionMainContainer(figcaptionElt) {
  let mainContainer                   = document.createElement("div");

  mainContainer.style.display         = "flex";
  mainContainer.style.height          = "200px";
  mainContainer.style.margin          = "0 1rem 0 1rem";
  mainContainer.style.lineHeight      = "1";
  figcaptionElt.appendChild(mainContainer);

  return mainContainer;
}

/**
 * Crée une liste d'ingrédients et l'ajoute au conteneur principal.
 *
 * @param {Object} mainContainer - Le conteneur auquel ajouter la liste d'ingrédients.
 * @return {Object} La liste d'ingrédients créée.
 */
function createIngredientsList(mainContainer) {
  let ingredientsList                 = document.createElement("ul");
  
  ingredientsList.style.marginRight   = "0.5rem";
  ingredientsList.style.width         = "50%";
  mainContainer.appendChild(ingredientsList);

  return ingredientsList;
}

/**
 * Applique un formatage aux ingrédients et les renvoie
 *
 * @param {Object} data - L'objet de données contenant les ingrédients et leurs propriétés.
 * @param {number} i - L'index de l'ingrédient à formatter.
 * @param {Array} ingredients - Le tableau d'ingrédients à formatter.
 * @return {Array} Le tableau d'ingrédients formaté.
 */
function checkIngredientType(data, i, ingredients) {
  if(data.ingredients[i].unit === "cl" || data.ingredients[i].unit === "ml" ) { // Ajout syntaxe dans le cas des ml/cl, des autres unités ou de leurs absences.
    ingredients[i].innerText = data.ingredients[i].ingredient + " : " + data.ingredients[i].quantity + data.ingredients[i].unit;
  
  } else if(data.ingredients[i].unit) {
    ingredients[i].innerText = data.ingredients[i].ingredient + " : " + data.ingredients[i].quantity + " " + data.ingredients[i].unit;
  
  } else if(data.ingredients[i].quantity) {
    ingredients[i].innerText = data.ingredients[i].ingredient + " : " + data.ingredients[i].quantity;
  
  } else {
    ingredients[i].innerText = data.ingredients[i].ingredient;
  }

  return ingredients;
}

/**
 * Génère une liste d'ingrédients et les ajoute à la liste ingredientsList donnée.
 *  pour afficher l'ingrédient, la quantité et l'unité de celui-ci
 * 
 * @param {Array} ingredientsList - La liste où les ingrédients seront ajoutés.
 * @param {Object} data - L'objet de données contenant les ingrédients.
 * @return {Array} - La liste des ingrédients.
 */
function getIngredients(ingredientsList, data) {
  let ingredients     = [];
  
  for (let i = 0; i < data.ingredients.length; i++) {
      ingredients[i]  = document.createElement("li");
      ingredients = checkIngredientType(data, i, ingredients);
      ingredientsList.appendChild(ingredients[i]);
  }
  return ingredients;
}

/**
 * Crée un nouvel élément de paragraphe avec la description fournie dans les données
 * et l'ajoute au conteneur principal.
 *
 * @param {HTMLElement} mainContainer - Le conteneur principal auquel ajouter le nouveau paragraphe.
 * @param {Object} data - L'objet de données contenant la description.
 * @return {HTMLElement} L'élément de paragraphe nouvellement créé.
 */
function createDescriptionElt(mainContainer, data) { 
  let descriptionElt                  = document.createElement("p");

  descriptionElt.classList.add("text-overflow");
  descriptionElt.innerText            = data.description;
  descriptionElt.style.width          = "50%";
  descriptionElt.style.maxHeight      = "5.7rem";
  descriptionElt.style.marginLeft     = "0.5rem";
  mainContainer.appendChild(descriptionElt);

  return descriptionElt;
}

/**
 * fonction appelant toutes celles créant la structure de la recette ainsi que leurs styles.
 * 
 * @param {object} data - Les données utilisées pour créer la structure de la recette.
 */
function createRecipesStructure(data) {

  let recipeSection     = createRecipeSection();
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

/**
 * Affiche une liste de recettes en créant une structure pour chaque recette.
 * 
 * @param {object} recipes - La liste de recettes à afficher.
 */

function displayRecipes(recipes) { 
  for (let i = 0; i < recipes.length; i++) { 
    createRecipesStructure(recipes[i]);
  }
}

/**
 * Crée un tableau de noms de recettes à partir du tableau de recettes donné.
 *
 * @param {Array} recipes - Un tableau d'objets de recette.
 * @return {Array} Un tableau de noms de recettes.
 */
function createRecipesNamesArray(recipes) { 
  let recipesNamesArray = [];

  for (let i = 0; i < recipes.length; i++) {
    let getRecipesNames = recipes[i].name;
    recipesNamesArray.push(getRecipesNames);
  }
  return recipesNamesArray;
}

/**
 * Crée un tableau de descriptions de recettes à partir d'un tableau de recettes.
 *
 * @param {Array} recipes - Le tableau de recettes à partir duquel extraire les descriptions.
 * @return {Array} Un tableau de descriptions de recettes.
 */
function createDescriptionsArray(recipes) { 
  let recipesDescriptionsArray = [];

  for (let i = 0; i < recipes.length; i++) {
    let getRecipesDescriptions = recipes[i].description;
    recipesDescriptionsArray.push(getRecipesDescriptions);
  }
  return recipesDescriptionsArray;
}

/**
 * Crée un tableau d'appareils uniques à partir d'une liste de recettes.
 *
 * @param {Array} recipes - Une liste de recettes.
 * @return {Array} Un tableau d'appareils uniques.
 */
function createApplianceArray(recipes) {
  let applianceArray = [];

  for (let i = 0; i < recipes.length; i++) {
    let getAppliance = recipes[i].appliance;
    applianceArray.push(getAppliance);
  }
  // Création d'un nouveau tableau qui ne contient aucun doublons d'appareil
  let uniqueApplianceArray = [...new Set(applianceArray)];

  return uniqueApplianceArray;
}

/**
 * Crée un tableau d'ingrédients uniques à partir d'un tableau de recettes.
 *
 * @param {Array} recipes - Un tableau de recettes.
 * @return {Array} - Un tableau d'ingrédients uniques.
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

  return uniqueIngredientArray;
}

/**
 * Crée un tableau contenant tous les ustensiles uniques d'une liste de recettes.
 *
 * @param {Array} recipes - Un tableau d'objets de recette.
 * @return {Array} Un tableau contenant tous les ustensiles uniques.
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
  let uniqueUstensileArray = [...new Set(ustensileArray)];

  return uniqueUstensileArray;
}

/**
 * Initialise la fonction en appelant diverses fonctions d'aide pour générer des tableaux
 * de noms de recettes, de descriptions, d'appareils, d'ingrédients et de ustensiles.
 *
 * @return {void} Cette fonction ne renvoie rien.
 */
function init() {
  displayRecipes(recipes);

  recipesNamesArray         = createRecipesNamesArray(recipes);
  recipesDescriptionsArray  = createDescriptionsArray(recipes);
  uniqueApplianceArray      = createApplianceArray(recipes);
  uniqueIngredientArray     = createIngredientArray(recipes);
  uniqueUstensileArray       = createUstensileArray(recipes);
}
init();