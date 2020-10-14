document.getElementById('container').onchange = function() {
    var bill=Number(document.getElementById('billTotal').value);
    var tipPercent=document.getElementById('tipInput').value;
    var  split=document.getElementById('splitInput').value;

    var tipVlaue= bill * (tipPercent/100);
    var tipEach= tipVlaue/split
    var newBillEach= (bill+tipVlaue)/split;

    document.getElementById('tipOutput').innerHTML=tipPercent + " %";
    document.getElementById('splitOutput').innerHTML=split;
    document.getElementById('tipAmount').innerHTML=" Rs"+ " "+tipEach.toFixed(2);
    document.getElementById('billAmt').innerHTML="Rs"+" "+newBillEach.toFixed(2);
   
}