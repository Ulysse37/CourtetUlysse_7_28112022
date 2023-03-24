"use strict";

const mainSearchElt = document.getElementById("search-bar");
const ingredientsElt = document.getElementById("ingredients");
const appareilsElt = document.getElementById("appareils");
const ustensilesElt = document.getElementById("ustensiles");

const lowerCaseIngredients = uniqueIngredientArray.map(x => x.toLowerCase());

console.log(recipes);
//console.log(uniqueIngredientArray);
//console.log(uniqueApplianceArray);
//console.log(uniqueUstensilArray);
//console.log(lowerCaseIngredients);


function searchRecipes() {
    mainSearchElt.addEventListener("input", (e) => {

        let value = e.target.value;
        //console.log(value);

        if (lowerCaseIngredients.includes(value)) {
            //console.log(uniqueIngredientArray);
            console.log(value);
            return true;
        }
        return false;
    })   
}

/*function filterByName() {
    for (let i = 0; i < recipes.length; i++) {
        let recipesName = recipes[i].name

        if (recipesName.match(searchValue)) {
            return true;
        }
        //console.log(recipesName);
    }
}
//filterByName();*/
searchRecipes();