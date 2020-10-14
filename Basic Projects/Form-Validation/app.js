const form=document.getElementById("form");
const username=document.getElementById("username");
const password=document.getElementById("password");
const email=document.getElementById("email");
const password2=document.getElementById("password2");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    checkInput();
})

function checkInput(){
    
    let usernameValue=username.value.trim(); 
    let passwordValue=password.value.trim(); 
    let emailValue=email.value.trim(); 
    let password2Value=password2.value.trim(); 

    if(usernameValue === ""){
        setError(username,"Input can't be empty")
    }else if(usernameValue.length < 5){
        setError(username,"Input should contains atleast 5letters")    
    }
    else{
       successInput(username);
    }

    if(emailValue ===""){
        setError(email,"Email can't be empty")
    }else if(!isEmail(emailValue)){
        setError(email,"Invalid Email")
    }else{
        successInput(email)
    }

    if(passwordValue === ""){
        setError(password,"Password can't be empty")
    }else{
        successInput(password);
    }

    if(password2Value ===""){
        setError(password2,"Password-Check can't be empty");
    }else if (password2Value !== passwordValue){
        setError(password2,"Password didnt match");

    }else{
        successInput(password2);
    }
        

    function setError(element,message){

        const formControl=element.parentElement;
        const small=formControl.querySelector("small");
        formControl.className="form-control error";
        small.innerText=message;

    }

    function successInput(element){
        const formControl=element.parentElement;
        formControl.className="form-control success";
        
    }
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
