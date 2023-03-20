"use strict";

console.log(recipes);
console.log(uniqueIngredientArray);
console.log(uniqueApplianceArray);
console.log(uniqueUstensilArray);


function searchListener() {
    let searchBar = document.getElementById("search-bar");

    searchBar.addEventListener("input", (e) => {
        let searchValue = e.target.value;
        console.log(searchValue);
    })
    
}
searchListener();

function filterByName() {
    for (let i = 0; i < recipes.length; i++) {
        let recipesName = recipes[i].name

        if (recipesName.match(searchValue)) {
            return true;
        }
        //console.log(recipesName);
    }
}
//filterByName();

