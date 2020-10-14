const nextBtn=document.querySelector(".nextBtn");
const prevBtn=document.querySelector(".prevBtn");
const slides=document.querySelectorAll(".slide");

window.addEventListener("DOMContentLoaded",function(){
    slides.forEach(function(slide,index){
        slide.style.left=`${index * 100}%`;
    })
})

 let counter =0;

 nextBtn.addEventListener("click",function(){
     counter++;  
     slider();   
     
 })
 prevBtn.addEventListener("click",function(){
     counter--;  
     slider();   
     
 })

 function slider(){
     
    
    if (counter < slides.length-1){
        nextBtn.style.display="inline";

    }else{
        nextBtn.style.display="none"
    }

    if (counter <0){
        counter=0;
    }

    if(counter > 0){
        prevBtn.style.display="inline";
    }else{
        prevBtn.style.display="none"
    }
    
   

    slides.forEach(function(slide){
        slide.style.transform=`translateX(-${counter *100}%)`
    })

 }