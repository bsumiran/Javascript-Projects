const meals=document.getElementById("meals");
const favContainer=document.getElementById("fav-meals");
const searchTerm=document.getElementById("search-term");
const searchBtn=document.getElementById("search");
const mealPopup=document.getElementById("meal-popup");
const popupCloseBtn=document.getElementById("close-popup");
const mealInfo=document.getElementById("meal-info");

getRandomMeal();
fetchFavMeals();


      async function getRandomMeal (){
        const response= await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const randomData=await response.json();
        const randomMeal=randomData.meals[0];


  addMeal(randomMeal,true)
}
      async function getMealById(id){
            const response= await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
            const responseData=await response.json();
            const meal=responseData.meals[0];
            
            return meal;
      
}
      async function getMealBySearch(term){
          const response= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+term);
          const responseData=await response.json();
          const meal=await responseData.meals;

         return meal;
            
        }
        getMealBySearch();


function addMeal(mealData, random=false){
    

    const meal=document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML=`
    <div class="meal-header">
        ${
            random
                ? `
        <span class="random"> Random Recipe </span>`
                : ""
        }
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>`;

    const btn=meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click",()=>{
        if(btn.classList.contains("active")){
            removeMealLS(mealData.idMeal);
          btn.classList.remove("active")
        }else{
            addMealLS(mealData.idMeal);
            btn.classList.add("active")
        }
        fetchFavMeals();
    })
    meal.addEventListener("click",()=>{
        UpdateMealInfo(mealData);
    })
   
    meals.appendChild(meal);  

}




    function addMealLS(mealId){
        const mealIds=getMealLS();

        localStorage.setItem('mealIds',JSON.stringify([...mealIds,mealId]))

}
function removeMealLS(mealId){
    const mealIds=getMealLS();

    localStorage.setItem('mealIds',JSON.stringify(mealIds.filter((id) => id !== mealId)));
    
}
function getMealLS(){
    const mealIds=JSON.parse(localStorage.getItem('mealIds'));

    
    return mealIds === null ?[]:mealIds ;
}

async function fetchFavMeals(){
    
    //clear the favContainer
    favContainer.innerHTML="";

    const mealIds=getMealLS();

    for(let i=0; i<mealIds.length;i++) {
        const mealId=mealIds[i];

       let meal=await getMealById(mealId);

        
        addMealToFav(meal);
        
    }
    
}


function addMealToFav(mealData){
     console.log(mealData);
    
    const favMeal=document.createElement("li");


    

    favMeal.innerHTML= `
    <img
        src=${mealData.strMealThumb}
        alt=${mealData.strMeal}
    />
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>`;

        const btn=favMeal.querySelector('.clear');

        btn.addEventListener("click",()=>{
            removeMealLS(mealData.idMeal);
            fetchFavMeals();
    })

    favMeal.addEventListener("click",()=>{
        UpdateMealInfo(mealData);
    })

    
    
    favContainer.appendChild(favMeal);  

}

searchBtn.addEventListener("click",async ()=>{
    meals.innerHTML="";
    const search=searchTerm.value;
   const Meals=await getMealBySearch(search);

   if(Meals){
   Meals.forEach(meal=>{
       addMeal(meal);
   })
   search.value="";
   }
})

function UpdateMealInfo(mealData){

    mealInfo.innerHTML='';

    const meal=document.createElement("div");

    const ingredients=[];

    for (var i= 1 ; i <= 20; i++ ){
          if(mealData["strIngredient"+i]){
               ingredients.push(`${mealData["strIngredient"+i]}- ${mealData["strMeasure"+i]}`);
          }else{
              break;
          }
    }



    meal.innerHTML=`
    <h1>${mealData.strMeal}</h1>
    <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
    />
    <p>
    ${mealData.strInstructions}
    </p>
    <h3>Ingredients:</h3>
    <ul>
    ${ingredients
        .map(
            (ing) => `
    <li>${ing}</li>
    `
        )
        .join("")}
</ul>
`;

    mealInfo.appendChild(meal);

    mealPopup.classList.remove("hidden")
      
     }

popupCloseBtn.addEventListener("click",()=>{
    mealPopup.classList.add("hidden");
})