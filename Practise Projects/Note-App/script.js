const addNote=document.querySelector(".add-note");
const notes=document.querySelector(".notes");
const note=document.querySelector(".note");

let getNotes=JSON.parse(localStorage.getItem("note"));

if(getNotes){
   
    getNotes.forEach(text=>{
        addNewNotes(text)
    })
}



addNote.addEventListener("click",()=>{
       addNewNotes();
  })

function addNewNotes(text=""){

    const note=document.createElement("div")
    note.classList.add("note");
    
        note.innerHTML=`  <div class="note">
        <div class="all">
        <div class="tools">
            
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
        </div>
        <div class="main ${text ?"":"hidden"}"></div>
        <textarea class="textarea ${text ? "hidden":"" }"></textarea>
    </div>
    </div> `;
         
    

       const main=note.querySelector(".main");
       const textArea=note.querySelector(".textarea");
       const editBtn=note.querySelector(".edit");
      const deleteBtn=note.querySelector(".delete");

      textArea.value = text;
    main.innerHTML = text;
   
       editBtn.addEventListener("click",()=>{
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");

   })
   
   textArea.addEventListener("input",(e)=>{
       const { value }=e.target;
     textArea.value=value;
       main.innerHTML=value;
       upgradeLS();
   })

   deleteBtn.addEventListener("click",()=>{
       note.remove();
       upgradeLS();
   })

   notes.appendChild(note);
  


}


function upgradeLS(){

    const textAreaEl=document.querySelectorAll(".textarea");
    const value=[];

    textAreaEl.forEach(item=>{
         value.push(item.value);
    })

    localStorage.setItem("note",JSON.stringify(value))

}
