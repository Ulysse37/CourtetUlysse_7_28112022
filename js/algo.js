"use strict";

const mainSearchElt         = document.getElementById("search-bar");
const recipeSection         = document.querySelector(".recipes-list");
const searchRecipeSection   = document.querySelector(".recipes-search-list");

//  Création d'un tableau contenant recipes mais en miniscule 
let recipesToLowerCase = structuredClone(recipes);
for (let i = 0; i < recipesToLowerCase.length; i++) {
  let recipe = recipesToLowerCase[i];

  recipe.appliance   = recipe.appliance.toLowerCase();
  recipe.description = recipe.description.toLowerCase();
  recipe.name        = recipe.name.toLowerCase();

  for (let y = 0; y < recipe.ingredients.length; y++) {
    recipe.ingredients[y].ingredient = recipe.ingredients[y].ingredient.toLowerCase();
  }

  for (let y = 0; y < recipe.ustensils.length; y++) {
    recipe.ustensils[y] = recipe.ustensils[y].toLowerCase();
  }
}

//!                                                Barre de recherche

// ajoute dans un tableau les recettes dont le nom correspond à l'input de la barre de recherche
function fillRecipesArrayForNames(value, items, recipe) {
  if (recipe.name.includes(value))  {
    items.push(recipe);
  }
}

// ajoute dans un tableau les recettes dont la description correspond à l'input de la barre de recherche
function fillRecipesArrayForDescriptions (value, items, recipe) {
  if (recipe.description.includes(value)) {
    items.push(recipe);
  }
}

// ajoute dans un tableau les recettes dont les ingrédients correspondent à l'input de la barre de recherche
function fillRecipesArrayForIngredients (value, items, recipe) {
  for (let ingredient of recipe.ingredients) {        
    if (ingredient.ingredient.includes(value))  {
      items.push(recipe);
    }
  }
}

// Fonction qui reset la recherche à chaque nouvel input de l'utilisateur en supprimant l'affichage des recherches précédentes
function removeDomData() {
  searchRecipeSection.innerText   = "";
}

// Fonction qui dans le cas d'une recherche non aboutie va afficher un message d'erreur
function displayErrorMessage()  {  
  let errorMessage            = document.createElement("p");

  recipeSection.style.display = "none";
  errorMessage.innerText      = "Aucune recette ne correspond à votre critère... Vous pouvez chercher <<tarte aux pommes>>, <<poisson>>, etc.";

  searchRecipeSection.appendChild(errorMessage);
}

// Récupération de l'ul qui va contenir seulement les recettes recherchées 
function createSearchRecipeSection() {
  searchRecipeSection.style.display        = "flex";
  searchRecipeSection.style.flexWrap       = "wrap";
  searchRecipeSection.style.justifyContent = "center";

  return searchRecipeSection;
}

/**
 * fonction appelant toutes celles créant la structure de la recette recherchée ainsi que leurs styles.
 * @param {object} data 
 */
function createSearchRecipesStructure(data) {
  createSearchRecipeSection();

  let recipeElt         = createRecipeElt(searchRecipeSection);
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
 * Fonction appelant celle qui crée la stucture d'une recette recherchée afin de la boucler sur le tableau de toutes celles recherchées.
 * Si ce tableau de contient aucune recette, appelle la fonction qui affiche le message d'erreur.
 * @param {object} searchRecipes 
 */
function loopSearchRecipes(searchArray) {  
  if (searchArray.length > 0) {
    for (let i = 0; i < searchArray.length; i++) {   
      createSearchRecipesStructure(searchArray[i]);
    }
  } else  {
    console.log("Error");
    displayErrorMessage();
  }
}

let uniqueItems = [];
let commonRecipes = [];
/**
 * Fonction principale de filtrage qui va lancer l'affichage des recettes 
 * recherchées en fonction de la recherche principale, des tag ou des deux en même temps.
 * @param {string} value
 * @param {HTMLElement} recipeSection
 */
function mainSearch(value, recipeSection) {
  let selectedTags = getSelectedTags();
  let items = [];

  for (let recipe of recipesToLowerCase) { // ajoute dans le tableau items les recettes liés à la recherche principale
    fillRecipesArrayForNames(value, items, recipe);
    fillRecipesArrayForDescriptions(value, items, recipe);
    fillRecipesArrayForIngredients(value, items, recipe);
  }
  
  uniqueItems = [...new Set(items)]; // tableau des recettes liées à la recherche principale sans doublons

  if (value.length >= 3 && selectedTags.length === 0) { // filtre par la recherche principale si input > 3 caractères
    recipeSection.style.display = "none"; // supprime les recettes non filtrées
    removeDomData();
    loopSearchRecipes(uniqueItems);

  } else if (selectedTags.length > 0 && value.length >= 3) { // filtre par la recherche principale ET les tags    
    recipeSection.style.display = "none"; // supprime les recettes non filtrées

    filterRecipesByTags(selectedTags)
      .then(filteredRecipes => {
        
        commonRecipes = filteredRecipes.filter(item => uniqueItems.includes(item)); // Ajoute dans un tableau les recettes contenues dans les deux différentes recherches
        removeDomData();
        loopSearchRecipes(commonRecipes);
      })
      .catch(error => {
        console.error(error);
      });

  } else if (value.length < 3 && selectedTags.length > 0) { // filtre par tags
    recipeSection.style.display = "none"; // supprime les recettes non filtrées
    removeDomData();
    filterRecipesByTags(selectedTags);
    
  } else {
    removeDomData();
    recipeSection.style.display = "flex"; // affichage normal de toutes les recettes sans filtrage 
  }
}

/**
 * Fonction qui appelle mainSearch sur la barre de recherche
 * @param {object} event 
 */
function searchRecipes(event) {
  let value = event.target.value.toLowerCase();
  
  mainSearch(value, recipeSection); 
}

mainSearchElt.addEventListener("input", searchRecipes);

//!                 Recherches recettes par tag

// va chercher et mets dans un tableau les tag sélectionnés 
function getSelectedTags() {
  let selectedTags = [];
  let selectedTagElt = selectedTagList.querySelectorAll('.selected-tag-elt');

  selectedTagElt.forEach(tagElement => {
    let tagText = tagElement.textContent.split('×')[0]; // divise le texte en 2 au symbole x du close button, et seule la 1ere partie est ajoutée au tableau
    selectedTags.push(tagText);                         // afin d'éviter d'avoir le bouton x dans le tableau.
  });

  selectedTags = selectedTags.map(tag => tag.toLowerCase()); // Passe le tableau en lower case
  
  return selectedTags;
}

/**
 * Filtre les recettes en fonctions des tag sélectionnés 
 * @param {Array} selectedTags
 */
function filterRecipesByTags(selectedTags) {
  return new Promise((resolve, reject) => {
    removeDomData(); // efface les recette recherchées précédemment
    let filteredRecipes = recipesToLowerCase.filter(recipe => { // création nouveau tableau à partir de recipesToLowerCase

      let hasMatchingIngredient = selectedTags.every(tag => {
        return recipe.ingredients.some(ingredient => {
          return ingredient.ingredient === tag;
        }); // vérifie si la recette a des ingrédients correspondant aux tags
      });

      let hasMatchingAppliance = selectedTags.includes(recipe.appliance); // de même pour les appareils

      let hasMatchingUstensil = recipe.ustensils.some(ustensil => {
        return selectedTags.includes(ustensil); // de même pour les ustensiles 
      })

      // Filtrer les recettes pour s'assurer qu'elles correspondent à tous les tags sélectionnés
      let allTagsMatched = selectedTags.every(tag => {
        return (
          recipe.ingredients.some(ingredient => ingredient.ingredient === tag) ||
          recipe.appliance === tag ||
          recipe.ustensils.includes(tag)
        );
      });
      // recette incluse si une correspondance avec une des 3 catégories ET tous les tag selectionnés doivent être satisfait 
      return (
        (hasMatchingIngredient || hasMatchingAppliance || hasMatchingUstensil) && allTagsMatched
      );
    });
    recipeSection.style.display = "none"; // supprime les recettes non filtrées
    filteredRecipes.forEach(recipe => { // affiche les recettes liées aux tag sélectionnés 
  
      createSearchRecipesStructure(recipe);
    });
    resolve(filteredRecipes);
  })
}

//!                 Filtrage des listes en fonction de la recherche principale ET des tags
// filtre la liste d'ingrédients en fonction de la recherche principale ET des tags via commonRecipes
function mergeIngredientList(commonRecipes, mergedIngredientList, selectedTags ) {
  for (let i = 0; i < commonRecipes.ingredients.length; i++) {       
    let ingredient = commonRecipes.ingredients[i].ingredient;
    
    if (!mergedIngredientList.has(ingredient) && !selectedTags.includes(ingredient)) { // évite les doublons
      let ingredientElt = createList("ingredients-tag", ingredient, ingredientList);
      mergedIngredientList.add(ingredient);

      ingredientElt.addEventListener("click", event => {
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
        mainSearch(mainSearchElt.value, recipeSection);  // filtrage des recettes au clique sur l'élément 
      });
    }
  }
}

// filtre la liste d'appareils en fonction de la recherche principale ET des tags via commonRecipes
function mergeApplianceList(commonRecipes, mergedAppareilList, selectedTags) {
  let appliance = commonRecipes.appliance;

  if (!mergedAppareilList.has(appliance) && !selectedTags.includes(appliance)) { // évite les doublons
    let applianceElt = createList("appareils-tag", appliance, applianceList);
    mergedAppareilList.add(appliance);

    applianceElt.addEventListener("click", event => {   
      const clickedTag = event.target.textContent;
      createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
      mainSearch(mainSearchElt.value, recipeSection); // filtrage des recettes au clique sur l'élément 
    })
  }
}

// filtre la liste d'ustensiles en fonction de la recherche principale ET des tags via commonRecipes
function mergeUstensileList(commonRecipes, mergedUstensileList, selectedTags) {
  for (let i = 0; i < commonRecipes.ustensils.length; i++) {
    let ustensile = commonRecipes.ustensils[i];
    
    if (!mergedUstensileList.has(ustensile) && !selectedTags.includes(ustensile)) {  // évite les doublons
      let ustensileElt = createList("ustensiles-tag", ustensile, ustensileList);
      mergedUstensileList.add(ustensile);
    
      ustensileElt.addEventListener("click", event => {     
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
        mainSearch(mainSearchElt.value, recipeSection);  // filtrage des recettes au clique sur l'élément 
      })
    }
  }
}

// filtre les 3 listes en fonction de la recherche principale ET des tag
function mergeLists(commonRecipes) {
  let selectedTags = getSelectedTags();
  let mergedIngredientList = new Set();
  let mergedAppareilList = new Set();
  let mergedUstensileList = new Set();

  ingredientList.innerHTML ="";
  applianceList.innerHTML ="";
  ustensileList.innerHTML ="";
  
  for (let i = 0; i < commonRecipes.length; i++) {
    mergeIngredientList(commonRecipes[i], mergedIngredientList, selectedTags);
    mergeApplianceList(commonRecipes[i], mergedAppareilList, selectedTags);
    mergeUstensileList(commonRecipes[i], mergedUstensileList, selectedTags);
  }
}

//!                 Filtrage des listes en fonction de la recherche principale

// filtre la liste d'ingrédients en fonction de la recherche principale
function updateIngredientList(uniqueItems, updatedIngredientList) {
  for (let i = 0; i < uniqueItems.ingredients.length; i++) {      
    let ingredient = uniqueItems.ingredients[i].ingredient;
    
    if (!updatedIngredientList.has(ingredient)) { 
      let ingredientElt = createList("ingredients-tag", ingredient, ingredientList);
      updatedIngredientList.add(ingredient);

      ingredientElt.addEventListener("click", event => {
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
        mainSearch(mainSearchElt.value, recipeSection);  // filtrage des recettes au clique sur l'élément 
      });
    }
  }
}

// filtre la liste d'appareils en fonction de la recherche principale
function updateApplianceList(uniqueItems, updatedAppareilList) {
  let appliance = uniqueItems.appliance;

  if (!updatedAppareilList.has(appliance)) { 
    let applianceElt = createList("appareils-tag", appliance, applianceList);
    updatedAppareilList.add(appliance);

    applianceElt.addEventListener("click", event => {    
      const clickedTag = event.target.textContent;
      createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
      mainSearch(mainSearchElt.value, recipeSection); // filtrage des recettes au clique sur l'élément 
    })
  }
}

// filtre la liste d'ustensile en fonction de la recherche principale
function updateUstensileList(uniqueItems, updatedUstensileList) {
  for (let i = 0; i < uniqueItems.ustensils.length; i++) {
    let ustensile = uniqueItems.ustensils[i];
    
    if (!updatedUstensileList.has(ustensile)) {  
      let ustensileElt = createList("ustensiles-tag", ustensile, ustensileList);
      updatedUstensileList.add(ustensile);
    
      ustensileElt.addEventListener("click", event => {      
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
        mainSearch(mainSearchElt.value, recipeSection);  // filtrage des recettes au clique sur l'élément  
      })
    }
  }
}

// filtre les 3 listes en fonction de la recherche principale.
function updateLists(uniqueItems) {
  let updatedIngredientList = new Set();
  let updatedAppareilList = new Set();
  let updatedUstensileList = new Set();

  ingredientList.innerHTML ="";
  applianceList.innerHTML ="";
  ustensileList.innerHTML ="";

  for (let i = 0; i < uniqueItems.length; i++) {

    updateIngredientList(uniqueItems[i], updatedIngredientList);
    updateApplianceList(uniqueItems[i], updatedAppareilList);
    updateUstensileList(uniqueItems[i], updatedUstensileList);
  }
}

//!                 Filtrage des listes en fonction des tag
// filtre la liste d'ingrédient en fonction des tag
function filterIngredientList(filteredRecipe, selectedTags, filteredIngredientList) {
  for (let i = 0; i < filteredRecipe.ingredients.length; i++) {   
    let ingredient = filteredRecipe.ingredients[i].ingredient;
    
    if (!selectedTags.includes(ingredient) && !filteredIngredientList.has(ingredient)) { // évite les doublons
      let ingredientElt = createList("ingredients-tag", ingredient, ingredientList);
      filteredIngredientList.add(ingredient);

      ingredientElt.addEventListener("click", event => {
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
        mainSearch(mainSearchElt.value, recipeSection);  // filtrage des recettes au clique sur l'élément 
      });
    }
  }
}

// filtre la liste d'appareil en fonction des tag
function filterApplianceList(filteredRecipe, selectedTags, filteredAppareilList) {
  let appliance = filteredRecipe.appliance;
        
  if (!selectedTags.includes(appliance) && !filteredAppareilList.has(appliance)) { // évite les doublons
    let applianceElt = createList("appareils-tag", appliance, applianceList);
    filteredAppareilList.add(appliance);

    applianceElt.addEventListener("click", event => {   
      const clickedTag = event.target.textContent;
      createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
      mainSearch(mainSearchElt.value, recipeSection); // filtrage des recettes au clique sur l'élément  
    })
  }
}

// filtre la liste d'ustensile en fonction des tag
function filterUstensileList(filteredRecipe, selectedTags, filteredUstensileList) {
  for (let i = 0; i < filteredRecipe.ustensils.length; i++) {
    let ustensile = filteredRecipe.ustensils[i];
    
    if (!selectedTags.includes(ustensile) && !filteredUstensileList.has(ustensile)) {  // évite les doublons
      let ustensileElt = createList("ustensiles-tag", ustensile, ustensileList);
      filteredUstensileList.add(ustensile);
    
      ustensileElt.addEventListener("click", event => {    
        const clickedTag = event.target.textContent;
        createSelectedTagElt(clickedTag, event); // création du tag sélectionné au clique sur l'élément de liste
        mainSearch(mainSearchElt.value, recipeSection);  // filtrage des recettes au clique sur l'élément 
      })
    }
  }
}

// Fonction affichant les 3 listes en fonctions des recettes filtrées par les tags
function filteredListsByTags() {
  let selectedTags = getSelectedTags();
  filterRecipesByTags(selectedTags) // filtrage des recettes en fonctions des tag sélectionnés 
    .then(filteredRecipes => {
      const existingTags = document.querySelectorAll(".tag");
      existingTags.forEach(tag => tag.remove()); // Permet de n'afficher la liste qu'une fois

      let filteredIngredientList = new Set();
      let filteredAppareilList = new Set();
      let filteredUstensileList = new Set();

      for (let i = 0; i < filteredRecipes.length; i++) {

        filterIngredientList(filteredRecipes[i], selectedTags, filteredIngredientList);
        filterApplianceList(filteredRecipes[i], selectedTags, filteredAppareilList)
        filterUstensileList(filteredRecipes[i], selectedTags, filteredUstensileList)

      }
    }) 
    .catch(error => {
      console.log(error);
    })
}