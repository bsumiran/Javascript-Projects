const boxes=document.querySelectorAll(".box");



window.addEventListener("scroll",checkBoxes)

checkBoxes();

function checkBoxes(){
    const triggerTop=window.innerHeight -100;

    boxes.forEach((box,)=>{
        const boxTop=box.getBoundingClientRect().top;
console.log(boxTop);
        if(boxTop<triggerTop){
            box.classList.add("show")
        }else{
            box.classList.remove("show")

        }
        
    });
}