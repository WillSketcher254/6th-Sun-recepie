document.getElementById('button').addEventListener('click', () => {
    let inputValue = document.getElementById('inputName').value;

    fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById('items');
            items.innerHTML = '';

            if (data.meals == null) {
                document.getElementById('msg').style.display = 'block';
                console.log('NO MEALS.');
            } else {
                document.getElementById('msg').style.display = 'none';
                data.meals.forEach(meal => {
                    let itemDiv = document.createElement('div');
                    itemDiv.className = 'm-2 singleItem';
                    itemDiv.setAttribute('onclick', `details(${meal.idMeal})`)
                    const itemInfo = `
                <div class="card" style="width: 12rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                    <h4 class="card-text">${meal.strMeal}</h4>
                    </div>
                </div>
                `
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv);

                })
            }
        });
});

function details(id) {
    console.log(id);
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            let meal = detail.meals[0];
            console.log(meal);
            let details = document.getElementById('details');
            details.innerHTML = '';
            let detailsDiv = document.createElement('div');
            let detailsInfo = `
                <div class="card" style="width: 19rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                    <h2 class="card-text">${meal.strMeal}</h2>
                    <h5>Ingredients</h5>
                    <ul>
                        <li>${meal.strArea}</li>
                        <li>${meal.strCategory}</li>
                        <li>${meal.strIngredient1}</li>
                        <li>${meal.strIngredient2}</li>
                        <li>${meal.strIngredient3}</li>
                        <li>${meal.strIngredient4}</li>
                        <li>${meal.strIngredient5}</li>
                    </ul>
                    </div>
                </div>
                `
            detailsDiv.innerHTML = detailsInfo;
            details.appendChild(detailsDiv)
            // Move the adding event listener here
            let adding = document.querySelector('.plus');
            if (adding) { // Check if the plus button exists
                adding.onclick = () => {
                    let savedMeals = JSON.parse(localStorage.getItem('savedMeals')) || [];
                    savedMeals.push(detailsInfo); // Use the current detailsInfo
                    localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
                    console.log('Meal added to saved meals:', detailsInfo);
                };
            }

        })
        .catch(err => console.error('Error fetching meal details:', err));
}
