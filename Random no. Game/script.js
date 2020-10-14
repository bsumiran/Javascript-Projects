var computerGuess;
var userGuesslog=[];
var attempt=0;
var maxguess=10;

function gameEnded(){
  document.getElementById("newGameBtn").style.display="inline";
  document.getElementById('easybtn').style.display="none";
    document.getElementById('hardbtn').style.display="none";
    document.getElementById('inputBox').setAttribute('readonly','readonly');

}

function easyMode(){
    maxguess=10;

    document.getElementById('easybtn').className="activebutton";
    document.getElementById('hardbtn').className='';
}

function hardMode(){
    maxguess=5;

    document.getElementById('hardbtn').className="activebutton";
    document.getElementById('easybtn').className='';
}

function newgame(){
    window.location.reload();
}

function init(){
    computerGuess= Math.floor(Math.random()*100+1);
  // console.log(computerGuess);
  document.getElementById("newGameBtn").style.display="none";
}

function compareGuess(){
    var userGuess=" "+document.getElementById("inputBox").value;
    
    console.log(userGuess);

    userGuesslog.push(userGuess);
    //console.log(userGuesslog);

    document.getElementById('guesslog').innerHTML=userGuesslog;

    attempt++;
    document.getElementById('attempts').innerHTML=attempt;

      if (userGuesslog.length<maxguess){
        if(userGuess>computerGuess){
            document.getElementById("textOutput").innerHTML="Your guess is too high";
            document.getElementById('inputBox').value="";
        }else if(userGuess<computerGuess){
            document.getElementById("textOutput").innerHTML="Your guess is too low";
            document.getElementById('inputBox').value="";
        }else{
            document.getElementById("textOutput").innerHTML="Correct! you got it in "+ attempt+" attempts";
            document.getElementById('container').style.background="green"
            gameEnded();
    
        }
      }else{
          if(userGuess>computerGuess){
            document.getElementById("textOutput").innerHTML="You lose"+ "<br> the number was" + computerGuess;
            document.getElementById('container').style.background="#e83c4e";

            gameEnded();

          }else if( userGuess<computerGuess){
            document.getElementById("textOutput").innerHTML="You lose"+ "<br> the number was" + computerGuess;
            document.getElementById('container').style.background="#e83c4e";

            gameEnded();

          }else{
            document.getElementById("textOutput").innerHTML="Correct! you got it in "+ attempt+" attempts";
            document.getElementById('container').style.background="green"

            gameEnded();

          }
        
            
          }
      }
 


