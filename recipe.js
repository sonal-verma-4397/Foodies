async function dataLoader(id) {
  const API = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

function getIngredientsWithMeasures(meal) {
  const ingredients = {};

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // Only add if ingredient is not empty
    if (ingredient && ingredient.trim() !== "") {
      ingredients[ingredient] = measure ? measure.trim() : "";
    }
  }

  return ingredients;
}

async function showData() {
  const queryString = window.location.search;

  //   console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  //   console.log(urlParams);
  const mealId = urlParams.get("mealId");
  //   console.log(mealId);
  const data = await dataLoader(mealId);
  //   console.log(data);
  const main = document.querySelector("main");

  const meals = data.meals;
  //   console.log(meals);
  const details = meals[0];
  console.log(details);

  // banner section
  const bannerSection = document.createElement("section");
  bannerSection.classList.add("banner");
  const image = document.createElement("img");
  image.src = details.strMealThumb;
  bannerSection.appendChild(image);
  main.appendChild(bannerSection);

  // heading section
  const headingSection = document.createElement("section");
  headingSection.classList.add("heading");
  const h2 = document.createElement("h2");
  h2.textContent = details.strMeal;
  headingSection.appendChild(h2);
  main.appendChild(headingSection);

  // Ingredient section
  const paraSection = document.createElement("section");
  paraSection.classList.add("recipe-section")
  const p = document.createElement("p");
  p.innerText = details.strInstructions;
  paraSection.appendChild(p);
  main.appendChild(paraSection);

  const ingredients = getIngredientsWithMeasures(details);
  console.log(ingredients);

  // Create section for the table
  const tableSection = document.createElement("section");
  tableSection.classList.add("ingredients-section");

  // Create table
  const table = document.createElement("table");

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const ingredientHeader = document.createElement("th");
  ingredientHeader.textContent = "Ingredient";
  const measureHeader = document.createElement("th");
  measureHeader.textContent = "Quantity";

  headerRow.appendChild(ingredientHeader);
  headerRow.appendChild(measureHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");

  for (const [ingredient, measure] of Object.entries(ingredients)) {
    const row = document.createElement("tr");

    const ingredientCell = document.createElement("td");
    ingredientCell.textContent = ingredient;

    const measureCell = document.createElement("td");
    measureCell.textContent = measure;

    row.appendChild(ingredientCell);
    row.appendChild(measureCell);
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  tableSection.appendChild(table);

  main.appendChild(tableSection);
}
showData();
