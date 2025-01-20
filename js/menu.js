let menuData;
let menuTranslation;
let selectedLanguage="eng";

document.querySelectorAll('.menu-dropdown').forEach(dropdown=>{
    dropdown.onclick=function(){
    this.classList.toggle('active');
    if(this.classList.contains('active')){

        menuData.forEach(element=>{
            if(element && element.name && element.price && element.picture && element.course ){
            if (element.course.toString()==this.id){
                let name=document.createElement("p");
                name.innerText=element.name[selectedLanguage];
                name.classList.add("menu-element-name");
                let price=document.createTextNode(element.price+' €');
                let linebreak=document.createElement("br");
                let picture=document.createElement("img");
                picture.src=element.picture;
                let menuElement = document.createElement("div");
                menuElement.classList.add("menuElement");
                menuElement.append(name);
                menuElement.append(linebreak);
                menuElement.append(price);
                menuElement.append(picture);
                if(element.type.toString()==='food'){
                    let vegeterianDiv=document.createElement("div");
                    let vegeterianText=document.createTextNode("Vegetarian: ");
                    vegeterianDiv.append(vegeterianText);
                    if(element.vegetarian){
                        let icon=document.createElement("i");
                        icon.classList.add("fa-solid", "fa-square-check");
                        vegeterianDiv.append(icon);                   }
                    else{
                        let icon=document.createElement("i");
                        icon.classList.add("fa-solid", "fa-square-xmark");
                        vegeterianDiv.append(icon);
                    } 
                    menuElement.append(vegeterianDiv);
                }
                this.append(menuElement);
            }
        }
        })
    }
    else{
        Array.from(this.children).forEach(child=>{
            if (child.classList.contains('menuElement')) child.remove()
        })
    }
};
});
document.querySelectorAll('.menu-option').forEach(option=>{
    option.onclick=function(){
        this.classList.toggle('active');
    };
});

fetch("./json/menu.json")
.then(response=>response.json())
.then(data=>{
    if(data) menuData=data;
})

function chglang(){
    var language=document.getElementById("langselect").value;
    localStorage.setItem("selectedLanguage",language);
    location.reload();
}
addEventListener("DOMContentLoaded",(event)=>{
    let savedLanguage=localStorage.getItem("selectedLanguage");
    if(savedLanguage) selectedLanguage=savedLanguage;
    if(selectedLanguage!=="eng"){
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
        const listOfHeadlines = document.querySelectorAll('.headline');

        // Loop through each headline and update based on selected language
        listOfHeadlines.forEach((headline, index) => {
            const translationKey = menuTranslation[index];
            if (translationKey && translationKey[selectedLanguage]) {
                headline.innerHTML = `<h4>${translationKey[selectedLanguage]}</h4>`;
            } else {
                console.warn(`Translation not found for language: ${selectedLanguage} at index: ${index}`);
            }
        });
    } catch (error) {
        console.error("Error fetching or processing menu translation:", error);
    }
}
