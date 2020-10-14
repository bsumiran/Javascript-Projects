/*******************************************************
 * *****************************QUIZ_ONTROLLER******************
 * ****************************************/

var QuizController=(function (){

    function Question(id,questionText,options,correctAns){

        this.id=id;
        this.questionText=questionText;
        this.options=options;
        this.correctAnswer=correctAns;
    }

    var questionLocalStorage={
        setQuestionCollection:function (newCollection) {
            localStorage.setItem("questionCollection",JSON.stringify(newCollection));          
        },
        getQuestionCollection:function () {
            return JSON.parse(localStorage.getItem("questionCollection"));            
        },
        removeQuestionCollection:function () {
            localStorage.removeItem('questionCollection');            
        }
    };

    if (questionLocalStorage.getQuestionCollection() === null){
        questionLocalStorage.setQuestionCollection([]);
    }

    var quizProgress={
        quesIndex:0
    };

    /******************PERSON-CONSTRUCTOR*********************************** */
    
    function Person(id,firstname,lastname,score){

        this.id=id;
        this.firstname=firstname;
        this.lastname=lastname;
        this.score=score;
    }

    var currPersonData= {
        fullname:[],
        score:0
    };

    var adminFullName=['Sumiran',"Bastola"];   

      

    var personLocalStorage={

        setPersonData:function(newPersonData){
            
            localStorage.setItem('personData',JSON.stringify(newPersonData));
        },
        getPersonData:function () {
            return JSON.parse(localStorage.getItem('personData'));
        },
        removePersonData:function(){
            localStorage.removeItem("personData");
        }
    }

    if (personLocalStorage.getPersonData()=== null){
        personLocalStorage.setPersonData([]);
    }

    

    return{

        

        getQuizProgress:quizProgress,

        getQuestionLocalStorage:questionLocalStorage,

        addQuestionOnLocalStorage:function(newQuesText,opts){
         var optsArr,corrAns,questionId,newQuestion,getStoredQuest,isChecked;

         if (questionLocalStorage.getQuestionCollection() === null){
             questionLocalStorage.setQuestionCollection([]);
         }

         optsArr=[];
         isChecked=false;

         for (i=0; i < opts.length; i++){
             if (opts[i].value !==""){
                 optsArr.push(opts[i].value);
             }

             if (opts[i].previousElementSibling.checked && opts[i].value !== ""){
                 corrAns=opts[i].value;
                 isChecked=true;
                
             }
         }

         if (questionLocalStorage.getQuestionCollection().length > 0){
            questionId=questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
         }else{
             questionId=0;
         }

         if(newQuesText.value !== ""){
             if (optsArr.length > 1){
                 if(isChecked){

                    newQuestion=new Question(questionId,newQuesText.value,optsArr,corrAns);
         
                    getStoredQuest= questionLocalStorage.getQuestionCollection();
                    getStoredQuest.push(newQuestion);
          
                   questionLocalStorage.setQuestionCollection(getStoredQuest);

                   newQuesText.value="";

                   for (x=0; x< opts.length ; x++){
            opts[x].value="";
                       opts[x].previousElementSibling.checked=false;

                   }
                    console.log(questionLocalStorage.getQuestionCollection());

                    return true;

    }else{
        alert('You Missed to check coorect answer or you check ans without value');
        return false;
    }
    }else{
        alert('You must insert atleast two options');
        return false;
    }

    }else{
        alert("Please insert Question");
        return false;
    }
         
        },
        checkAnswer:function(ans){
             
            if (questionLocalStorage.getQuestionCollection()[quizProgress.quesIndex].correctAnswer === ans.textContent){

                currPersonData.score++;

                return true;
            }else{
                return false;
            }
        },
        isFinished:function () {
            return quizProgress.quesIndex +1 === questionLocalStorage.getQuestionCollection().length;
        },

        addPerson:function() {
            var newPerson,personId,personData;

            if (personLocalStorage.getPersonData().length > 0){

                personId=personLocalStorage.getPersonData()[personLocalStorage.getPersonData().length -1].id + 1;
            }else{
                personId=0;
            }

            newPerson= new Person(personId,currPersonData.fullname[0],currPersonData.fullname[1],currPersonData.score);

            personData=personLocalStorage.getPersonData();
            personData.push(newPerson);

            personLocalStorage.setPersonData(personData);


            console.log(newPerson);
        },
        
        getCurrentPersonData:currPersonData,

        getAdminFullName:adminFullName,

        getPersonLocalStorage:personLocalStorage,
      
    }


})();

/*******************************************************
 * *****************************UI_CONTROLLER******************
 * ****************************************/


var UIController=(function(){

     var domItems={
         /**********Admin Panel Elements */
         adminPanelSection:document.querySelector(".admin-panel-container"),         
         questionInsertBtn:document.getElementById('question-insert-btn'),
         newQuestionText:document.getElementById("new-question-text"),
         adminOptions:document.querySelectorAll(".admin-option"),
         adminOptionsContainer:document.querySelector(".admin-options-container"),
         insertedQuestionWrapper:document.querySelector(".inserted-questions-wrapper"),
         questionUpdateBtn:document.getElementById("question-update-btn"),
         questionDeleteBtn:document.getElementById("question-delete-btn"),
         questionsClearBtn:document.getElementById("questions-clear-btn"),
         resultListWrapper:document.querySelector(".results-list-wrapper"),
         //***********************QUIZ SECTION ELEMENT**************************
         /**************************** *******************/ 
         quizSection:document.querySelector(".quiz-container"),
         askedQuestion:document.getElementById("asked-question-text"),
         quizOptionWrapper:document.querySelector(".quiz-options-wrapper"),
         progressBar:document.querySelector("progress"),
         progressPara:document.getElementById("progress"),
         instantAnsContainer:document.querySelector(".instant-answer-container"),
        instantAnswerText:document.getElementById("instant-answer-text"),
        instantAnsDiv:document.getElementById("instant-answer-wrapper"),
        emotionIcon:document.getElementById("emotion"),
        nextOuestionBtn:document.getElementById("next-question-btn"),
        clearResultsBtn:document.getElementById("results-clear-btn"),
        /********LANDING-PAGE */
        landingPageSection:document.querySelector(".landing-page-container"),
        startQuizBtn:document.getElementById("start-quiz-btn"),
        firstNameInput:document.getElementById("firstname"),
        lastNameInput:document.getElementById("lastname"),
             /********FInalRESULT */

             finalResultSection:document.querySelector(".final-result-container"),
             finalScoreText:document.getElementById("final-score-text"),
             

        
     };

     return{

         getDomItems:domItems,

         addInputDynamically:function() {
            
            var addInput= function(){
                
                var inputHTML,z;

               z=document.querySelectorAll(".admin-option").length;

                inputHTML='<div class="admin-option-wrapper"><input type="radio" class="admin-option-'+z+'" name="answer" value=""><input type="text" class="admin-option admin-option-'+z+'" value=""></div>';

                domItems.adminOptionsContainer.insertAdjacentHTML('beforeend',inputHTML);

                domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus',addInput);

                domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus',addInput);
            
            }

            domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus',addInput);

         },
         createQuestionList:function(getQuestion){
             var quesHTML,numberArr;
             numberArr=[];
            domItems.insertedQuestionWrapper.innerHTML="";

            for (var i=0; i< getQuestion.getQuestionCollection().length; i++){
                
                numberArr.push(i+1);
                    quesHTML='<p><span>'+ numberArr[i]+' '+ getQuestion.getQuestionCollection()[i].questionText+'</span><button id="question-'+ getQuestion.getQuestionCollection()[i].id+'">Edit</button></p>';

                    
                    domItems.insertedQuestionWrapper.insertAdjacentHTML('afterbegin',quesHTML);
            }

         },
         editQuestList:function(event, storageQuestionList,addInpsDym,updateQuesListFn){
             var getId,getStorageQuestionList,foundItem,placeInArr,optionHTML;

            if('question-'.indexOf(event.target.id)){
                getId=parseInt(event.target.id.split('-')[1]);
                
                getStorageQuestionList=storageQuestionList.getQuestionCollection();

                for (var i=0; i< getStorageQuestionList.length;i++){
                        if(getStorageQuestionList[i].id === getId){

                            foundItem=getStorageQuestionList[i];

                            placeInArr=i;
                        }                
                }
                
                domItems.newQuestionText.value=foundItem.questionText;
                domItems.adminOptionsContainer.innerHTML="";

                for (var x=0;x < foundItem.options.length;x++){
                      
                    optionHTML+='<div class="admin-option-wrapper"><input type="radio" class="admin-option-'+x+'" name="answer" value="'+x+'"><input type="text" class="admin-option admin-option-'+x+'" value="'+foundItem.options[x]+'"></div>'
                }

                domItems.adminOptionsContainer.innerHTML=optionHTML;

                domItems.questionUpdateBtn.style.visibility="visible";
                domItems.questionDeleteBtn.style.visibility="visible";
                domItems.questionInsertBtn.style.visibility="hidden";
                domItems.questionsClearBtn.style.pointer="none";

                addInpsDym();

         var backDefaultView=function(){

                  var updatedOptions=document.querySelectorAll(".admin-option");

                    domItems.newQuestionText.value="";

                    for(var i=0;i< updatedOptions.length;i++){
                        updatedOptions[i].value=""; 
                        updatedOptions[i].previousElementSibling.checked=false;                                     
                    }

                      domItems.questionUpdateBtn.style.visibility="hidden";
                     domItems.questionDeleteBtn.style.visibility="hidden";
                     domItems.questionInsertBtn.style.visibility="visible";
                     domItems.questionsClearBtn.style.pointer="";

                     updateQuesListFn(storageQuestionList);                    
                }
                
                var updateQuestion=function(){
                    var newOptions,optionElements;

                    newOptions=[];

                    optionElements=document.querySelectorAll(".admin-option");

                    foundItem.questionText=domItems.newQuestionText.value;
                    foundItem.corrAns="";

                    for (var i=0;i < optionElements.length;i++){
                        if(optionElements[i].value !==""){
                            newOptions.push(optionElements[i].value);
                              
                            if(optionElements[i].previousElementSibling.checked){
                                  foundItem.correctAnswer=optionElements[i].value;
                              }
                        }
                    }

                    foundItem.options=newOptions;
                       
                    if(foundItem.questionText !== ""){
                        if(foundItem.options.length > 1){
                            if(foundItem.correctAnswer !== ""){

                                   getStorageQuestionList.splice(placeInArr,1,foundItem);
                                   storageQuestionList.setQuestionCollection(getStorageQuestionList);
                                       
                                   domItems.newQuestionText.value="";

                                   for(var i=0;i< optionElements.length;i++){
                                       optionElements[i].value=""; 
                                       optionElements[i].previousElementSibling.checked=false;                                     
                                   }

                                     domItems.questionUpdateBtn.style.visibility="hidden";
                                    domItems.questionDeleteBtn.style.visibility="hidden";
                                    domItems.questionInsertBtn.style.visibility="visible";
                                    domItems.questionsClearBtn.style.pointer="";

                                    updateQuesListFn(storageQuestionList);

                                    backDefaultView();

                               }else{
                                alert("you missed to check correct ans, or you checked ans without value");
                            }        
                           }else{
                            alert("ypu Must insert atleast 2 options")
                        }    
                       }else{
                          alert("Please insert question");
                         
                    }
                }

                domItems.questionUpdateBtn.onclick=updateQuestion;

                var deleteQuestion=function(){
                    
                    getStorageQuestionList.splice(placeInArr,1)

                    storageQuestionList.setQuestionCollection(getStorageQuestionList);
                    
                    backDefaultView();
                }

                domItems.questionDeleteBtn.onclick=deleteQuestion;

            }
                             
          
         },
         clearQueslist:function(storageQuestionList){

            if(storageQuestionList.getQuestionCollection() !== null){
               
            if(storageQuestionList.getQuestionCollection().length > 0){

                var conf=confirm('Warning: You will lose entire question list');
                   
                if (conf){
                    
                    storageQuestionList.removeQuestionCollection();
                    domItems.insertedQuestionWrapper.innerHTML="";
                }
            }
         }
        },
        displayQuestion:function(storageQuestionList,progress){

            var newOptionHTML,charArr;

            charArr=["A","B","C","D","E",'F'];

            if(storageQuestionList.getQuestionCollection().length >0){
                   domItems.askedQuestion.textContent=storageQuestionList.getQuestionCollection()[progress.quesIndex].questionText;
                   domItems.quizOptionWrapper.innerHTML="";   

                   for(var i=0;i< storageQuestionList.getQuestionCollection()[progress.quesIndex].options.length; i++){

                    newOptionHTML=' <div class="choice-'+i+';"><span class="choice-'+i+'">'+charArr[i]+'</span><p  class="choice-'+i+'">'+storageQuestionList.getQuestionCollection()[progress.quesIndex].options[i]+'</p></div>';

                    domItems.quizOptionWrapper.insertAdjacentHTML('beforeend',newOptionHTML);
                         
                   }
                }
        },
        displayProgress:function(storageQuestionList,progress){

            domItems.progressBar.max=storageQuestionList.getQuestionCollection().length;
            domItems.progressBar.value=progress.quesIndex + 1;
            domItems.progressPara.textContent=(progress.quesIndex + 1)+ "/"+ storageQuestionList.getQuestionCollection().length;
            
        },
            newDesign:function(ansResult,selectedAnswer){
                var twoOptions,index;

                index=0;

                if ( ansResult){
                    index=1;
                }

                twoOptions={
                    instantAnswerText:['This is a wrong answer','This is a correct answer'],
                    instantAnsClass:['red',"green"],
                    emotionType:['images/sad.png','images/happy.png'],
                    optionsSpanBg:['rgba(200,0,0,0.7)','rgba(0,250,0,0.2)'],


                }

                domItems.quizOptionWrapper.style.cssText=" opacity: 0.6; pointer-events:none; "
                domItems.instantAnsContainer.style.opacity=1;

                domItems.instantAnswerText.textContent=twoOptions.instantAnswerText[index];
                     
                domItems.instantAnsDiv.className=twoOptions.instantAnsClass[index];

                domItems.emotionIcon.setAttribute('src',twoOptions.emotionType[index]);

                selectedAnswer.previousElementSibling.style.backgroundColor=twoOptions.optionsSpanBg[index];
            },
            resetDesign:function(){

                domItems.quizOptionWrapper.style.cssText=""
                domItems.instantAnsContainer.style.opacity="0";
            
            },

            getFullName:function(currPerson,storageQuestionList,admin) {

                if (domItems.firstNameInput.value !=="" && domItems.lastNameInput.value !== ""){

                if(!(domItems.firstNameInput.value=== admin[0] && domItems.lastNameInput.value=== admin[1])){

                    if(storageQuestionList.getQuestionCollection().length>0){
                currPerson.fullname.push(domItems.firstNameInput.value);

                currPerson.fullname.push(domItems.lastNameInput.value);

                domItems.landingPageSection.style.display="none";

                domItems.quizSection.style.display="block";

                console.log(currPerson);
                    }else{
                        alert("Quiz is not ready , please contact to administrator");
                    }
                }else{
                    domItems.landingPageSection.style.display="none";

                    domItems.adminPanelSection.style.display="block";
                }
            }else{
                alert("Please Insert Your firstname and lastname")
            }
        },
        finalResult:function(currPerson){

            domItems.finalScoreText.textContent=currPerson.fullname[0]+" "+currPerson.fullname[1]+" your final score is"+ " "+currPerson.score;
        
            domItems.quizSection.style.display="none";

            domItems.finalResultSection.style.display="block";


        },
        addResultOnpanel:function (userData) {

            var resultHTML;

            domItems.resultListWrapper.innerHTML="";

            for (var i=0;i < userData.getPersonData().length;i++){

                resultHTML='<p class="person person-'+i+'"><span class="person-'+i+'">'+userData.getPersonData()[i].firstname + ' '+userData.getPersonData()[i].lastname +' - '+userData.getPersonData()[i].score+' Points</span><button id="delete-result-btn_'+userData.getPersonData()[i].id+'" class="delete-result-btn">Delete</button></p';

                domItems.resultListWrapper.insertAdjacentHTML('afterbegin', resultHTML);

            }

        },
        deleteResult:function(event,userData){
            var getId,personsArr;

            personsArr=userData.getPersonData();

            if('delete-result-btn_'.indexOf(event.target.id)){

                getId=parseInt( event.target.id.split('_')[1]);

                for (var i=0;i< personsArr.length;i++){

                    if (personsArr[i].id === getId){

                        personsArr.splice(i,1);

                        userData.setPersonData(personsArr);
                    }
                }

                

            }
            
        },
        clearResultList:function(userData){

           

                var conf;

                if(userData.getPersonData() !== null){

                if (userData.getPersonData().length > 0 ){

                conf=confirm("Warning:you will lose entire question List.")

                if(conf){
                    userData.removePersonData();

                    domItems.resultListWrapper.innerHTML="";
                }
                }
            }
        }



     };

})();


/*******************************************************
 * *****************************ONTROLLER******************
 * ****************************************/


var Controller=(function(quizCtrl,UICtrl){

    UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
    
    var selectedDomItems=UICtrl.getDomItems;

    UICtrl.addInputDynamically();

    selectedDomItems.questionInsertBtn.addEventListener('click',function(){

        var adminOptions=document.querySelectorAll(".admin-option");
    var checkBoolean= quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText,adminOptions);
   
    if (checkBoolean) {
        UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
    }  
    });

    selectedDomItems.insertedQuestionWrapper.addEventListener('click',function (e) {
              UICtrl.editQuestList(e,quizCtrl.getQuestionLocalStorage,UICtrl.addInputDynamically,UICtrl.createQuestionList);
    })

    selectedDomItems.questionsClearBtn.addEventListener('click',function(){

        UICtrl.clearQueslist(quizCtrl.getQuestionLocalStorage);
    })

    UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);
     
    UIController.displayProgress(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);  



     selectedDomItems.quizOptionWrapper.addEventListener('click',function(e) {        

        var updateOptionsDiv=selectedDomItems.quizOptionWrapper.querySelectorAll('div');

        for(var i=0;i < updateOptionsDiv.length; i++){
            
            if (e.target.className === "choice-"+ i){

                var answer=document.querySelector('.quiz-options-wrapper div p.' + e.target.className);

               var answerResult= quizCtrl.checkAnswer(answer);

               UICtrl.newDesign(answerResult,answer);

               if (quizCtrl.isFinished()){
                   selectedDomItems.nextOuestionBtn.textContent="finished";
               }

               var nextQuestion= function (questionData,progress) {

                if (quizCtrl.isFinished()){

                    //finish Quiz
                    quizCtrl.addPerson();

                    UICtrl.finalResult(quizCtrl.getCurrentPersonData);


                }else{
                    UICtrl.resetDesign();

                    quizCtrl.getQuizProgress.quesIndex++;

                    UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);

                    UIController.displayProgress(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress); 


                }

               }

               selectedDomItems.nextOuestionBtn.onclick=function() {
                   nextQuestion(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);

               }

               

            }            
        }
    });

        selectedDomItems.startQuizBtn.addEventListener('click',function() {
                        
            UICtrl.getFullName(quizCtrl.getCurrentPersonData,quizCtrl.getQuestionLocalStorage,quizCtrl.getAdminFullName);
        
     });
     selectedDomItems.lastNameInput.addEventListener("focus",function(){
          selectedDomItems.lastNameInput.addEventListener('keypress',function (e){
                 
            if(e.keyCode===13){
                UICtrl.getFullName(quizCtrl.getCurrentPersonData,quizCtrl.getQuestionLocalStorage,quizCtrl.getAdminFullName);
            }
          })
     });

     UICtrl.addResultOnpanel(quizCtrl.getPersonLocalStorage);

     selectedDomItems.resultListWrapper.addEventListener("click",function (e) {

        UICtrl.deleteResult(e,quizCtrl.getPersonLocalStorage);

        UICtrl.addResultOnpanel(quizCtrl.getPersonLocalStorage);

        

     });

     selectedDomItems.clearResultsBtn.addEventListener("click",function(){

        UICtrl.clearResultList(quizCtrl.getPersonLocalStorage);

     });
})(QuizController,UIController);