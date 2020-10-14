function digitalclock(){

    var date= new Date();

    var minute=date.getMinutes()+ "";

    var sec=date.getSeconds() + "";

    var hours=date.getHours() + "";

    var day=date.getDay() + "";

    if(hours.length<2){
        hours= "0" + hours;
    }

    if(minute.length<2){
       minute= "0" + minute;
    }

    if(sec.length<2){
        sec= "0" + sec;
    }
    var weekdays=["Sun","Mon","Tue","Wed","Thursday","Fri","Sat"]

    var clock= weekdays[day]+" "+ hours+ ":" + minute +":" + sec;

    document.getElementById("clock").innerHTML=clock;

    

}

digitalclock();

setInterval(digitalclock,1000);
