const profile=document.querySelector(".profile");
const form=document.getElementById("form");
const search=document.getElementById("search");


const APIURL = "https://api.github.com/users/";

getUser("florinpop17");

async function getUser(userName){
    const response=await fetch(APIURL+userName);
    const responseData=await response.json();

    //console.log(responseData);
    showUser(responseData);

    getRepos(userName);

}

async function getRepos(userName){
    const response=await fetch(APIURL+userName+'/repos');
    const responseData=await response.json();
console.log(response);
    addRespsToCard(responseData);
}
 

function showUser(user){

    const {name,followers,following,bio,public_repos,avatar_url}=user

    

    profile.innerHTML=`    <div class="profile">
        
    <img src=${avatar_url}>
    <div class="content">
<h1>${name}</h1>       
<h3>${bio}</h3>
   <div class="data">
       <span class="followers">${followers} Followers</span>
       <span class="following">${following} Following</span>
       <span class="respos">${public_repos} Repos</span>
   </div>
   <h4>Repos:</h4>
   <div class="repos">   
   </div>
     </div>
    </div> `
      
}

function addRespsToCard(repos){
    const reposEl=document.querySelector(".repos");

   repos.slice(0,9).forEach(repo=>{
        const repoEl=document.createElement("div");
        repoEl.classList.add("list");

        repoEl.innerText=repo.name;
        

        reposEl.appendChild(repoEl);
    })
   
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const {value}= search;

    if(value){
        getUser(value);

       search.value="";
    }
    
})