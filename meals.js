const loadFood = (search) =>
{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
    .catch(error => console.log(error));
}

const displayMeals = meals =>{
   const mealscontainer = document.getElementById('meal-container');
   mealscontainer.innerHTML = ``;
   meals.forEach(meal => {
    console.log(meal);

   const mealsDiv = document.createElement('div');
   mealsDiv.classList.add('col');
   mealsDiv.innerHTML = `

     <div onclick = "loadDetail(${meal.idMeal})" class="card">
     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
     <div class="card-body">
     <h5 class="card-title">${meal.strMeal}</h5>
     <p class="card-text">${meal.strInstructions.slice(0,200)}</div>
     <button onclick="diplayDetail()" class="btn bg-secondary text-white m-2 btn-sm">See Details</button>
    </div>
   
   `;
   mealscontainer.appendChild(mealsDiv);
     
  });
}

const searchFood = () =>
{
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    loadFood(searchText);
    searchField.value = '';
}

const loadDetail = (idMeal) =>
{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    //console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetail(data.meals[0]))

}
const displayDetail = meal =>{
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = ``;
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');
    mealDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions}</p>
      
    `;
    detailContainer.appendChild(mealDiv);
}
loadFood('')