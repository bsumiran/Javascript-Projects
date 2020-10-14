

var ul=document.getElementById('list');
var btn=document.getElementById('add-btn');
var addinput=document.getElementById('add-input');


btn.addEventListener('click',function(e){
    e.preventDefault();

    if (addinput.value!==""){
    
    var li=document.createElement('li'),
     firstp=document.createElement('p'),
     secondp=document.createElement('p'),
     iconone=document.createElement('i'),
     icontwo=document.createElement('i'),
     input=document.createElement('input');

    iconone.className="fa fa-pencil-square-o";
    icontwo.className="fa fa-times";
    input.className="edit-note";

    input.setAttribute("type","text");

    firstp.textContent=addinput.value;

    secondp.appendChild(iconone);
    secondp.appendChild(icontwo);
    li.appendChild(firstp);
    li.appendChild(secondp);
    li.appendChild(input);    
    

    ul.appendChild(li);   
    addinput.value="";  
    }

});

////////////////////////////////////edit DELETE ITEMS

ul.addEventListener('click',function(e){
    if (e.target.classList[1]==="fa-pencil-square-o") {   
   
    var parentpar= e.target.parentNode;
    parentpar.style.display="none";

    var note=parentpar.previousElementSibling;
    var input=parentpar.nextElementSibling;

    input.style.display="block";
    input.value=note.textContent;
    
    input.addEventListener('keypress',function(e){
        if (e.keyCode===13){
            
            if (input.value!==""){

                note.textContent=input.value;
            input.style.display="none";
            parentpar.style.display="block";
            } else{
                var li=input.parentNode;
                li.parentNode.removeChild(li);
            }
            
        }
        
    });


    }else if (e.target.classList[1]==="fa-times"){
        var list=e.target.parentNode.parentNode;
        list.parentNode.removeChild(list);
    }
});


var hideItem=document.getElementById('hide');
var label=document.querySelector('label');

hideItem.addEventListener('click',function(){
    if (hideItem.checked){
        
        label.textContent="Unhide notes";
        ul.style.display="none";

    }else{
        ul.style.display="block";
        label.textContent="Hide notes";
    }
})


///////////////////////SEARCH FILTER

var searchInput=document.querySelector('#search-note input');

searchInput.addEventListener('keyup',function(e){

    var searchChar=e.target.value.toUpperCase();
    var notes=document.getElementsByTagName('li');

    Array.from(notes).forEach(function(notes) {
        var partext=notes.firstElementChild.textContent;

        if (partext.toUpperCase().indexOf(searchChar) !==-1){
            
            notes.style.display="block";
        }else{
            notes.style.display="none";
        }


    });
});

