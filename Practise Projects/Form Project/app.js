
const name=document.getElementById("name");
const course=document.getElementById("course");
const author=document.getElementById("author");
const submitBtn=document.querySelector(".submitBtn");

const customerName=document.getElementById("customer-name");
const customerCourse=document.getElementById("customer-course");
const courseAutuhor=document.getElementById("course-author");

const customerList=document.querySelector(".customer-list");


submitBtn.addEventListener("click",function(e){
    
    e.preventDefault();
    let nameInput=e.target.parentElement.children[2].children[1].value;
    let courseInput=e.target.parentElement.children[3].children[1].value;
    let authorInput=e.target.parentElement.children[4].children[1].value;

    let card=document.createElement("div");
    card.classList.add("col-11,","mx-auto", "col-md-6","col-lg-4","my-3");

    card.innerHTML=`   <div class="card text-left">
    <img src="cust-0.jpg" class="card-img-top" alt="">
    <div class="card-body">
     <!-- customer name -->
     <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name"> ${nameInput}</span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
       ${courseInput}
      </span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author"> ${authorInput}</span></h6>
     <!-- end of customer name -->
    </div> `;

    customerList.appendChild(card);

    nameInput.textContent="";
    courseInput.textContent="";
    authorInput.textContent="";

   name.value="";
   course.value="";
   author.value=""
   
})


