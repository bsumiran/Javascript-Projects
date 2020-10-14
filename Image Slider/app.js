let slideIndex=1;

const showslides=(n)=>{
    const slide=document.getElementsByClassName("myslides");

    const dots=document.getElementsByClassName("dots");

    if (n> slide.length){
        slideIndex=1;
    }
    if (n<1){
        slideIndex=slide.length;
    }
    for (let i=0;i<slide.length;i++){
          slide[i].style.display="none";
    }

    for (i=0; i<dots.length;i++){
        if (dots[i].classList.contains("active")){
            dots[i].classList.remove("active");
        }
    }
    slide[slideIndex-1].style.display="block";
    dots[slideIndex -1].classList.add("active");
}

const plusSlides=(n)=>{
       showslides(slideIndex=slideIndex+n);
}

const currentSlide=(n)=>{
    showslides(showslides=n)
}
showslides(slideIndex);