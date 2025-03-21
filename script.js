async function dataLoader() {
  const API = "https://www.themealdb.com/api/json/v1/1/search.php?f=b";
  const response = await fetch(API);
  const data = await response.json();
  return data;
}
async function showData() {
  const data = await dataLoader();
  console.log(data);
  const root = document.querySelector(".root");

  const meals = data.meals;
  console.log(meals);
  for (let i = 0; i < meals.length; i++) {
    console.log(meals[i].strMealThumb);
    console.log(meals[i].strMeal);
    const a = document.createElement("a");
    a.href = `/recipe.html?mealId=${meals[i].idMeal}`;
    a.classList.add("card");
    const img = document.createElement("img");
    img.src = meals[i].strMealThumb;
    const h3 = document.createElement("h3");
    h3.textContent = meals[i].strMeal;

    a.appendChild(img);
    a.appendChild(h3);
    root.appendChild(a);
  }
  
}
showData();
