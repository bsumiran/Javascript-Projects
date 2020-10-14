let menu=[
    {
        id:0,
        title:"Sweet Item",
        category:"sweets",
        price:"$5",
        img:"img/sweets-1.jpeg"
    },
    {
        id:1,
        title:"Cupcake Item",
        category:"cupcakes",
        price:"$5",
        img:"img/cupcake-1.jpeg"
    },
    {
        id:2,
        title:"Cake Item",
        category:"cakes" ,
        price: "$5",
        img:"img/cake-1.jpeg ",
    },
    {
        id:3,
        title:"Dougnut Item "  ,
        category:"doughnuts" ,
        price: "$5",
        img:"img/doughnut-1.jpeg",
    },
    {
        id:4,
        title: "Sweet Item",
        category:"sweets" ,
        price:"$10" ,
        img:"img/sweets-2.jpeg",
    },
    {
        id:5,
        title:"Cupcake Item",
        category:"cupcakes" ,
        price:"$10",
        img:"img/cupcake-3.jpeg",
    },
    {
        id:6,
        title:"Cake Item ",
        category:"cakes" ,
        price:"$10",
        img:"img/cake-2.jpeg",
    },
    {
        id:7,
        title:"Dougnut Item",
        category:"doughnuts",
        price:"$10",
        img:"img/doughnut-2.jpeg",
    },
    {
        id:8,
        title:"Sweet Item" ,
        category:"sweets",
        price:"$15",
        img:"img/sweets-3.jpeg",
    },
    {
        id:9,
        title:"Cupcake Item",
        category:"cupcakes",
        price:"$15",
        img:"img/cupcake-2.jpeg",
    },
    {
        id:10,
        title:"Cake Item",
        category:"cakes",
        price:"$15",
        img:"img/cake-3.jpeg",
    },
  
  
]




const shoppingCart=document.querySelector(".shopping-cart");
const cart=document.querySelector(".cart");
const btnContainer=document.querySelector(".btn-container");
const store=document.querySelector(".store");
const cartAmt=document.querySelector(".cart-amount");



shoppingCart.addEventListener("click",function(){
   
    cart.classList.toggle("show-cart")
});

const itemsContainer=document.querySelector(".items-container");

window.addEventListener("DOMContentLoaded",function(){

    displayMenuItems(menu);
    dynamicBtn(); 

});




 function displayMenuItems(menuItems){

    let displaymenu= menuItems.map(function(item){
        return `  <div class="item">
        <div class="img-container">
        <img src=${item.img} class="item-img" alt="">
        <div class="store-icon">
          <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
        <div class="item-content flex">
          <h2 class="name">${item.title}</h2>
          <div class="price">${item.price}</div>
        </div>
      </div>`;
     
     }).join("")
     
     itemsContainer.innerHTML=displaymenu;

}

function dynamicBtn(){
    
    let categories=menu.reduce(function(values,item){
        if (!values.includes(item.category)){
            values.push(item.category);
        } 
        return values;
       
    },["all"])  
    
    const dynamicBtn=categories.map(function(category){
        return ` <button type="button" data-id=${category} class="store-btn">${category}</button> `
    }).join("");
    
    btnContainer.innerHTML=dynamicBtn;
    const storeBtns=document.querySelectorAll(".store-btn");

    storeBtns.forEach(function(btn){
        btn.addEventListener("click",function(e){
            const id=e.target.dataset.id;
            
          let menuCategory=menu.filter(function(item){
                if (id===item.category){
                    return item;
                }
            })
            
            if(id=== "all"){
                displayMenuItems(menu);
            }else{
                displayMenuItems(menuCategory);
            }
        })
    })

}





function addToCart(){
    
    store.addEventListener("click",function(e){
        
        if (e.target.classList[1]==="fa-shopping-cart"){
            const cartImg=e.target.parentElement.previousElementSibling.src;
            const cartName=e.target.parentElement.parentElement.nextElementSibling.children[0].textContent;
            const cartPrice=e.target.parentElement.parentElement.nextElementSibling.children[1].textContent;
             
            
            let items={};

            items.img=cartImg;
            items.title=cartName;
            items.price=cartPrice;

            const cartContainer=document.createElement("div");
            cartContainer.classList.add("cart-container");
            cartContainer.innerHTML=` <img src=${items.img} class="cart-img" alt="" >
            <div class="card-content">
              <h3 class="cart-heading">${items.title}</h3>
              <div class="cart-price">${items.price}</div>
            </div>
            <div class="cart-icon">
             <i class="fas fa-trash"></i>
            </div> `;

            cart.insertBefore(cartContainer,cartAmt);
            totalMoney();
        }
        
    })
   
    
}
addToCart();


function totalMoney(){

    const cartPrice=document.querySelectorAll(".cart-price");
    let total=[];
    
    cartPrice.forEach(function(item){
       
      total.push(parseFloat(item.textContent.slice(1)));      
         
    })
    

  let finalMoney=total.reduce(function(values,item){
        values+=item;
        return values;
    },0)
    
  finalMoney=  finalMoney.toFixed(2);

  document.querySelector(".amt").textContent="$"+finalMoney;
  document.querySelector(".items-count").textContent=total.length;
  document.querySelector(".items-total").textContent=finalMoney;
   
}

const storeName=document.querySelectorAll(".name");
const items=document.querySelectorAll(".item");
const search=document.querySelector(".search");

search.addEventListener("keyup",function(e){
  
    const inputValue=e.target.value.toUpperCase();
    const items=document.querySelectorAll(".item");

    items.forEach(function(item){
        const name=item.children[1].children[0].textContent;
        
        if (name.toUpperCase().indexOf(inputValue) !== -1){
            item.style.display="block";
        }else{
            item.style.display="none";
        }
        
    })
   
})

function removeItem (){

    cart.addEventListener("click",function(e){

       if (e.target.classList[1]=== "fa-trash"){
         
        const currItem=e.target.parentElement.parentElement;
       
        
        cart.removeChild(currItem);

    
        }

    })

}
removeItem();
