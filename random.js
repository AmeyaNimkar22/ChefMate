const title = document.getElementById("title");
const area = document.getElementById("area");
const instructions = document.getElementById("instructions");
const ingredient_list = document.getElementById("ingredient_list");
const foodImg = document.getElementById("foodImg");
const info = document.getElementById("info");
const ingredients = document.getElementById("ingredients");
const ingr = document.getElementById("ingr");
const sbox = document.getElementById("sbox");
const searchBtn = document.getElementById("searchbtn");
const recipeTitle = document.getElementById("recipe_title");
const recipeImg = document.getElementById("recipe_img");
const recipeTags = document.getElementById("recipe_tags");
const view = document.getElementById("view_recipe");
const seachByFoodName = document.getElementById("seachByFoodName");

let randRecipe = false;
let searchname = false;

async function random() {
    if (searchname) {
        seachByFoodName.style.display = "none";
        searchname = false;
    }
    
    randRecipe = true;
    info.style.display = "flex";

    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    if (!response.ok) {
        throw new Error("Could not fetch data");
    } else {
        const data = await response.json();
        console.log(data);
        
        title.textContent = `${data.meals[0].strMeal}`;
        title.style.color = "#dc8718";
        area.innerHTML = `<b id="hd1">Area:</b> ${data.meals[0].strArea}`;
        hd1.style.color = "#dc8718"; // Re-added color for area
        instructions.innerHTML = `<b id="hd2">Instructions:</b> ${data.meals[0].strInstructions}`;
        hd2.style.color = "#dc8718"; // Re-added color for instructions
        ingr.style.display = "block";
        
        const fimg = data.meals[0].strMealThumb;
        foodImg.src = fimg;
        foodImg.style.display = "block"; 
        
        ingredient_list.innerHTML = '';  

        for (let i = 1; i <= 20; i++) {
            const ingredient = data.meals[0][`strIngredient${i}`];
            const measure = data.meals[0][`strMeasure${i}`];
            if (ingredient) {
                const li = document.createElement('li');
                li.textContent = `${ingredient} - ${measure}`;
                ingredient_list.appendChild(li);
            } else {
                break;  
            }
        }
    }
}

async function search() {
    if (randRecipe) {
        info.style.display = "none"; 
        randRecipe = false;
    }
    
    searchname = true;
    const foodName = sbox.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
    if (!response.ok) {
        throw new Error("Could not fetch data");
    } else {
        const data = await response.json();
        console.log(data);
        recipeTitle.textContent = `${data.meals[0].strMeal}`;
        recipeTags.textContent = `Category: ${data.meals[0].strTags}`;
        const fimg = data.meals[0].strMealThumb;
        recipeImg.src = fimg;
        
        seachByFoodName.style.display = "flex";
    }
}
async function viewRecipe() {
    if (searchname) {
        seachByFoodName.style.display = "none";
        searchname = false;
    }
    if (randRecipe) {
        info.style.display = "none"; 
        randRecipe = false;
    }
    searchname = true;  
    randRecipe = true;
    info.style.display = "flex";
    const foodName = sbox.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
    if (!response.ok) {
        throw new Error("Could not fetch data");
    } else {
        const data = await response.json();
        console.log(data);
        title.textContent = `${data.meals[0].strMeal}`;
        title.style.color = "#dc8718";
        area.innerHTML = `<b id="hd1">Area:</b> ${data.meals[0].strArea}`;
        hd1.style.color = "#dc8718"; 
        instructions.innerHTML = `<b id="hd2">Instructions:</b> ${data.meals[0].strInstructions}`;
        hd2.style.color = "#dc8718"; 
        ingr.style.display = "block";
        
        const fimg = data.meals[0].strMealThumb;
        foodImg.src = fimg;
        foodImg.style.display = "block"; 
        
        ingredient_list.innerHTML = '';  

        for (let i = 1; i <= 20; i++) {
            const ingredient = data.meals[0][`strIngredient${i}`];
            const measure = data.meals[0][`strMeasure${i}`];
            if (ingredient) {
                const li = document.createElement('li');
                li.textContent = `${ingredient} - ${measure}`;
                ingredient_list.appendChild(li);
            } else {
                break;  
            }
        }
    }
    }

