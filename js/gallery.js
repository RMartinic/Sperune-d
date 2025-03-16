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
