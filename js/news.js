function getSelectedLanguage(){
    const localStorageLanguage=localStorage.getItem("selectedLanguage");
    if(localStorageLanguage){
        document.getElementById("langselect").value=localStorageLanguage;
        return localStorageLanguage;
    }
    else return "eng";
}

async function getTranslations(){
    try {
        const response = await fetch("./json/news.json");
        
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        for(let index=1;index<data.length;index++){
            changeHeadline(data[0],getSelectedLanguage());
            loadNews(data[index],getSelectedLanguage());
        }
    }
    catch(error){
        console.error("Error fetching news");
    }
}

function chglang(){
    const selectedLanguage=document.getElementById("langselect").value
    localStorage.setItem("selectedLanguage", selectedLanguage);
    location.reload();
}

function loadNews(newsData, selectedLanguage){
    const targetedContainer=document.getElementById("news-container");
    const newNews=document.createElement("div");
    newNews.classList.add("news-article");
    newNews.innerHTML=`
    <p class="article-headline">${newsData.title[selectedLanguage]}</p>
    <div class="horizontal-line"></div>
    <p class="article-paragraph">${newsData.body[selectedLanguage]}</p>
    ${newsData.photo?
        `<img src=${newsData.photo} class=news-picture />`
        :
        `<img src="./photos/news-sample.jpg" class=news-picture />`
    }
    <div class="vertical-line"></div>
    <p class="date">${newsData.date}</p>
    `
    targetedContainer.appendChild(newNews);
}
function changeHeadline(translationData,selectedLanguage){
    const headlineParagraph=document.getElementById("header-news-font");
    headlineParagraph.innerHTML=`<p id="header-news-font">${translationData[selectedLanguage]}</p>`
}
getTranslations();