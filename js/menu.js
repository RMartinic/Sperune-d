let menuData;
let menuTranslation;
let selectedLanguage = "eng";

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
          element.picture &&
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
            <img src="${picture}" class="menu-element-picture" />
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

function chglang() {
  var language = document.getElementById("langselect").value;
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
async function changeMenuLanguage(selectedLanguage) {
  document.getElementById("langselect").value = selectedLanguage;

  try {
    const response = await fetch("./json/menu-translation.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const menuTranslation = data; // Access the translations array
    const listOfHeadlines = document.querySelectorAll(".headline");

    // Loop through each headline and update based on selected language
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
