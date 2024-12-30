var introtranslation;
var daystransaltion;
var contactTranslation;
var recommedationTranslation;
fetch("./mainpage.json")
.then(response=>response.json())
.then(data=>{
    introtranslation=data[0];
    daystransaltion=data[1];
    contactTranslation=data[2];
    recommedationTranslation=data[3];
    console.log(introtranslation,daystransaltion,contactTranslation,recommedationTranslation);
})
.catch(error => {
  console.error("Failed to fetch JSON data:", error);
});


function chglang(data){
    var sel = document.getElementById("langselect").value;
    var intro=document.getElementById("intro");
    intro.innerText=introtranslation[sel];
    var days=document.getElementById("working-days");
    days.innerText=daystransaltion[sel];
    var contactMessage=document.getElementById("contact-message");
    contactMessage.innerText=contactTranslation[sel];
    var recommedationText=document.getElementById("recommend-text");
    recommedationText.innerText=recommedationTranslation[sel];
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
  slides[slideIndex-1].style.display = "flex";
  slides[slideIndex-1].style.justifyContent="center";
  slides[slideIndex-1].style.alignItems="center";

    }function prevSlide() {
      plusSlide(-1);
    }function nextSlide() {
      plusSlide(1);
    }