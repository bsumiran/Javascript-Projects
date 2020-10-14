const lightBox=document.querySelector(".lightbox-container");
const storeImgs=document.querySelectorAll(".store-img");
const lightboxItems=document.querySelector(".lightbox-item");
const storeItem=document.querySelectorAll(".store-item");


let imgArr=[];
let counter=0;

storeImgs.forEach(function(img){
    imgArr.push(img.src);
})

console.log(imgArr);
storeItem.forEach(function(item){
    item.addEventListener("click",function(e){
        currImg=e.target.src;
        
        lightboxItems.style.background=` url(${currImg}) `;
        lightBox.classList.add("show");
        counter=imgArr.indexOf(currImg);
    })
})

let closeBtn=document.querySelector(".lightbox-close");

closeBtn.addEventListener("click",function(){
    lightBox.classList.remove("show")
})

let leftBtn=document.querySelector(".btnLeft");

leftBtn.addEventListener("click",function(){
    counter--;

    if (counter < 0){
        counter = imgArr.length -1;
      }
    
    lightboxItems.style.background=` url(${imgArr[counter]} ) `;    


})

const rightBtn=document.querySelector(".btnRight")

rightBtn.addEventListener("click",function(){
    counter++;

    if (counter> imgArr.length-1){
        counter=0;
    }

    lightboxItems.style.background=` url(${imgArr[counter]}) `
})






