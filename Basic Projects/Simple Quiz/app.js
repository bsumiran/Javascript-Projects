const quizData=[
    {
        question:"How old is Sumiran",
        a:"10",
        b:"6",
        c:"16",
        d:"26",
        correct:'c'
    },
    {
        question:"What is the frequently used programming language",
        a:"java",
        b:"C",
        c:"Python",
        d:"Javascript",
        correct:"d"
    },
    {
        question:"Who is the President of US?",
        a:"KP Oli",
        b:"Donald Trump",
        c:"Cristiano Ronaldo",
        d:"Joe Biden",
        correct:"a"
    },

    {
        question:"What does HTML stands for?",
    a:"HyperText MarkUp Language",
    b:"Jason Object Notation",
    c:"Application Programming Interface",
    d:"Helicopters Terminals Motorboats Lamborginis",
    correct:"a"
},
{
    question:"When was Javascript lauunched?",
    a:"2020",
    b:"1995",
    c:"none of the above",
    d:"2018",
    correct:"c"
}
];

const questionEl=document.getElementById("question")
const a_text=document.getElementById("a_text")
const b_text=document.getElementById("b_text")
const c_text=document.getElementById("c_text")
const d_text=document.getElementById("d_text");
const submitBtn=document.getElementById("submit");
const answers=document.querySelectorAll(".answer");
const quiz=document.getElementById("quiz")


let score=0;
let currentQuiz=0;
loadQuiz();


function loadQuiz(){
    deselectAns();
    const currentQuizData=quizData[currentQuiz];
    questionEl.innerText=currentQuizData.question;
    a_text.innerText=currentQuizData.a;
    b_text.innerText=currentQuizData.b;
    c_text.innerText=currentQuizData.c;
    d_text.innerText=currentQuizData.d;
     
};

function getSelected(){

let answer=undefined;
    answers.forEach(ans=>{
        if(ans.checked){
           answer= ans.id;

        }
    })
    return answer;

}

function deselectAns(){
    answers.forEach(ans=>{
       ans.checked=false;
    })
}

submitBtn.addEventListener("click",function(){
let answer=getSelected();


    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++
        }
        currentQuiz++;
        if(currentQuiz < quizData.length){
            loadQuiz();
      } else{
          quiz.innerHTML=` <h2>You answerd correctly at ${score}/${quizData.length} questions</h2> <button onclick="location.reload()">Reload</button> `
      }

    }


   

})
