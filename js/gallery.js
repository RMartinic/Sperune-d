const hamburgerMenu=document.getElementById("hamburger-menu");
const hamburgerDropdownMenu=document.getElementById("dropdown-menu");

if(window.innerWidth > 768){
  const listOfImages = document.querySelectorAll(".image");

  listOfImages.forEach((image) => {
    image.addEventListener("click", toggleImage);
  });

  function toggleImage() {
    if(this.classList.contains("clicked")) return;
    this.classList.add("clicked");
    const background = document.createElement("div");
    background.classList.add("blur");
    background.innerHTML='<i class="fa-solid fa-circle-xmark"></i>'
    const galleryDiv = document.querySelector(".gallery-container");
    galleryDiv.appendChild(background);
    background.addEventListener("click", () => {
      background.remove();
      this.classList.remove("clicked");
    });
}
}
hamburgerMenu.addEventListener('click',(e)=>{
  if(e.target.id==="language-select-hamburger") return;
  if (hamburgerDropdownMenu.style.display==='none'){
    hamburgerDropdownMenu.style.display='flex';
  }
  else{
    hamburgerDropdownMenu.style.display='none';
  }
});
