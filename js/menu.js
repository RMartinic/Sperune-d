let menuData;
let menuTranslation;
let selectedLanguage = "eng";
const hamburgerMenu=document.getElementById("hamburger-menu");
const hamburgerDropdownMenu=document.getElementById("dropdown-menu");

document.querySelectorAll(".menu-dropdown").forEach((dropdown) => {
  dropdown.addEventListener("click", function (event) {
    if (!event.target.closest(".menu-option")) {
      return;
    }
    this.classList.toggle("active");

    if (this.classList.contains("active")) {
      menuData.forEach((element) => {
        if (
          element &&
          element.name &&
          element.price &&
          element.course
        ) {
          if (element.course.toString() == this.id) {
            const menuElement = document.createElement("div");
            menuElement.classList.add("menu-element");

            const name = element.name[selectedLanguage];
            const price = element.price;
            const picture = element.picture;

            const isFood = element.type === "food";
            const vegetarianClass = element.vegetarian
              ? "fa-square-check"
              : "fa-square-xmark";

            menuElement.innerHTML = `
            ${isFood? 
              `<div class="menu-element-picture-container">
            <img src="${picture}" class="menu-element-picture" />
            <i class="fa-solid fa-expand"></i>
            </div>`
            : ``}
            
            <div class="menu-element-description">
                <p class="menu-element-name">${name}</p>
                <div class="menu-element-price-and-info">  
                    <span>${price} €</span>
                    ${
                      isFood
                        ? `<div>
                            Vegetarian: 
                            <i class="fa-solid ${vegetarianClass}" aria-hidden="true"></i></div>`
                        : ""
                    }
                </div>
            </div>
            `;
            menuElementPicture=menuElement.getElementsByClassName("menu-element-picture");
            document.addEventListener('click',(e)=>{
              const clickedImage=e.target.closest(".menu-element-picture");
              if(clickedImage) handlePictureEnlarge(clickedImage);
            })
            this.append(menuElement);
          }
        }
      });
    } else {
      Array.from(this.children).forEach((child) => {
        if (child.classList.contains("menu-element")) child.remove();
      });
    }
  });
});


fetch("./json/menu.json")
  .then((response) => response.json())
  .then((data) => {
    if (data) menuData = data;
  });

function changeLanguage() {
  const language = document.getElementById("language-select-hamburger").value;
  localStorage.setItem("selectedLanguage", language);
  location.reload();
}
function chglang() {

  const language = document.getElementById("language-select").value;
  localStorage.setItem("selectedLanguage", language);
  location.reload();
}
addEventListener("DOMContentLoaded", (event) => {
  let savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) selectedLanguage = savedLanguage;
    if (selectedLanguage !== "eng") {
    changeMenuLanguage(selectedLanguage);
  
  }
});
function handlePictureEnlarge(picture){
  if (document.querySelector(".background-div")) return;
  picture.classList.add("in-focus");
  const background=document.createElement("div"); 
  background.innerHTML='<i class="fa-solid fa-circle-xmark"></i>'
  background.classList.add("background-div");
  const mainContainer=document.querySelector("main");
  mainContainer.append(background);
  background.addEventListener('click', ()=>{
    picture.classList.remove("in-focus");
    mainContainer.removeChild(background);
  })
}
async function changeMenuLanguage(selectedLanguage) {
  document.getElementById("language-select").value = selectedLanguage;
  document.getElementById("language-select-hamburger").value = selectedLanguage;

  try {
    const response = await fetch("./json/menu-translation.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const menuTranslation = data; 
    const listOfHeadlines = document.querySelectorAll(".headline");

    listOfHeadlines.forEach((headline, index) => {
      const translationKey = menuTranslation[index];
      if (translationKey && translationKey[selectedLanguage]) {
        headline.innerHTML = `<h4>${translationKey[selectedLanguage]}</h4>`;
      } else {
        console.warn(
          `Translation not found for language: ${selectedLanguage} at index: ${index}`
        );
      }
    });
  } catch (error) {
    console.error("Error fetching or processing menu translation:", error);
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

