const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const giveAway=document.querySelector(".giveaway");
  const deadLine=document.querySelector(".deadline");
  const items=document.querySelectorAll(".deadline-format h4");

 let tempDate=new Date();
  let tempYear=tempDate.getFullYear();
  let tempMonth=tempDate.getMonth();
  let tempDay=tempDate.getDate();
  console.log(tempDay)
  
 // let futureDate=new Date(2020,7,18,20,30,0);

  let futureDate=new Date(tempYear,tempMonth,tempDay+10,11,40,0);

  const year=futureDate.getFullYear();
  const hours=futureDate.getHours();
  const minutes=futureDate.getMinutes();

  let month=futureDate.getMonth()
  month=months[month];
  const date=futureDate.getDate();
  
  const weekDay=weekdays[futureDate.getDay()];

  giveAway.textContent=`Giveaway Ends On ${weekDay} ${date} ${month} ${year} ${hours}:${minutes} am `

  // future time in ms

  const futureTime=futureDate.getTime();
  

  function getRemainingTime (){
    
      const today= new Date().getTime();
      
      const t=futureTime-today;
      console.log(t);
      //1s=1000ms
      //1m=60s
      //1hr=60m
      //1d=24hr

      const oneDay=24*60*60*1000;
      const oneHour=60 *60 * 1000;
      const oneMinute=60*1000;

      let days=t/oneDay;
      days=Math.floor(days);

      let hours=Math.floor( (t % oneDay) / oneHour);
      let minutes=Math.floor((t% oneHour) /oneMinute);
      let seconds=Math.floor((t% oneMinute) /1000);
     
      const values=[days,hours,minutes,seconds];

      function format (item){

        if (item < 10){
          return `0${item}`
        }
        return item;
      } 
           items.forEach(function(item,index){
        item.innerHTML=format(values[index]);
      });

      if (t <0){
        clearInterval(countDown);
      deadLine.innerHTML=`<h4 class="expired">Sorry, this giveaway is expired</h4> `

      }
  }
//countDown

let countDown=setInterval(getRemainingTime,1000);

  getRemainingTime();