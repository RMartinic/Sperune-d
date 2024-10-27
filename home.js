var introtranslation
var daystransaltion
fetch("./home.json")
.then(res =>res.json())
.then(data=>{
    introtranslation=data;
})
fetch("./working-time.json")
.then(response=>response.json())
.then(data=>{
    daystransaltion=data;
})


function chglang(data){
    var sel = document.getElementById("langselect").value;
    var intro=document.getElementById("intro");
    intro.innerText=introtranslation[sel];
    var days=document.getElementById("working-days");
    days.innerText=daystransaltion[sel];
    }