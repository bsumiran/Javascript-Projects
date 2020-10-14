const form =document.getElementById("form");
const input=document.getElementById("input");
const todos= document.getElementById("todos");

const getTodos=JSON.parse(localStorage.getItem("todos"));

if(getTodos){
    getTodos.forEach(todo =>{
        addlist(todo)
    })
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
   addlist();    
})

function addlist(todo){
    let todoText=input.value;

    if(todo){
        todoText=todo.text;
    }

    if(todoText){
    const todoEl=document.createElement("li");

    if(todo&& todo.completed){
        todoEl.classList.add("completed");
    }
    


    todoEl.innerText=todoText;

    todoEl.addEventListener("click",()=>{
        todoEl.classList.add("completed");
        upgradeLS();
    })    

    todoEl.addEventListener("contextmenu",(e)=>{
        e.preventDefault();
        todoEl.remove();
        upgradeLS();
        
    })

    todos.appendChild(todoEl);
    upgradeLS();
    input.value="";
}
}


function upgradeLS(){

    const todoEls=document.querySelectorAll("li");

    let todosArr=[];

    todoEls.forEach(todoEl=>{

        todosArr.push({
            text:todoEl.innerText,
            completed:todoEl.classList.contains("completed")
        }
        )

        localStorage.setItem("todos", JSON.stringify(todosArr));

    })
}

