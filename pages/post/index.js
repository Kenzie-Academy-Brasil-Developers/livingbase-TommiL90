/* Desenvolva seu script aqui */
const news = JSON.parse(localStorage.getItem("@Living:news-selected")) || ""
console.log(news)
const verifyPermission = () => {

    if (news == "") {
         window.location.replace("../../index.html")
    }else{
        renderNewsOFLocalStorage(news)
    }
}
verifyPermission()

function renderNewsOFLocalStorage(element){

    const article = document.querySelector("article")
    const {category, content, description, id, image, title} = element
    console.log(image)
    article.insertAdjacentHTML("afterbegin", `
    <h1 class="title-1">${title}</h1>
    <p class="text-1">${description}</p>
    <img src="${image}" alt="${title}" class="w-full">
    <p class="text-1">${content}</p>
    `)
}

function goToHome(){

    const home = document.getElementById("home")

    home.addEventListener("click", e => {
        e.preventDefault()
        localStorage.removeItem("@Living:news-selected")
        window.location.replace("../../index.html")
    })
}
goToHome()

click()