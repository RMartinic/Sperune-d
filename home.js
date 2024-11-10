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
    let slideIndex = 1;
    showSlides(slideIndex);function plusSlide(n) {
      showSlides(slideIndex += n);
    }function showSlides(n) {
      let i;
      const slides = document.getElementsByClassName("slide");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex-1].style.display = "block";
    }function prevSlide() {
      plusSlide(-1);
    }function nextSlide() {
      plusSlide(1);
    }