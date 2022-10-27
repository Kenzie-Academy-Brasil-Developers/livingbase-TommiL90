/* Desenvolva seu script aqui */
const root      = document.querySelector('.root');
const footer    = document.querySelector('footer')
let count       = 0

const observer = new IntersectionObserver( entries => {
    console.log(entries)
    if (entries.some(entry => entry.isIntersecting)){
        renderNewNews()
    }
})

async function getInfoApi (dado){

    const request     = await fetch(`https://m2-api-living.herokuapp.com/news?page=${dado}`)
    const requestJson = await request.json()
    const news        = requestJson
    return news 
}


async function renderNews (list) {

    const request = await list
    const arr     = request.news 
    const newArrLocalStorage =  []



    // if (localStorage.getItem("@Living:newArrLocalStorage")){
    
    //          const parseJson = JSON.parse(localStorage.getItem("@Living:newArrLocalStorage")) || []
    //          const arrLocalStorage = [...parseJson, ...arr]
    
    //          localStorage.setItem("@Living:newArrLocalStorage", JSON.stringify(arrLocalStorage))
    //       }else{
    
    //          localStorage.setItem("@Living:newArrLocalStorage", JSON.stringify(arr))
    //       }
       
    
    // root.innerHTML = ""

    arr.map(element => {

        const image       = element.image
        const id          = element.id
        const title       = element.title
        const description = element.description  
        const content     = element.content
        const category    = element.category

        const article     = document.createElement("article")
        article.classList = "card mb-2"
        
        const img         = document.createElement("img")
        img.classList     = ""
        img.src           = image
        img.alt           = title
        
        const h2          = document.createElement("h2")
        h2.classList      = "title-2"
        h2.innerText      = title
        
        const p           = document.createElement("p")
        p.classList       = "text-1"
        p.innerText       = description
        
        const a           = document.createElement("a")
        a.classList       = "news"  
        a.href            = "#"
        a.dataset.id      = id 
        a.innerText       = "Accesar a Conteúdo"   

        a.addEventListener("click", async e =>{
            e.preventDefault()
            
            const id      = e.target.getAttribute("data-id")
            await findNews(id)
        })

        article.append(img, h2, p, a)
        root.appendChild(article)

    })
        const divObserver = document.createElement("div")
        divObserver.classList.add("observer")
        footer.appendChild(divObserver)

        observer.observe(divObserver)
}
renderNews (getInfoApi (count))

async function renderNewNews(){
    const request = await getInfoApi(count)
     
    if (request.nextPage < 4){
        renderNews(request)
        count++
    }

}

async function findNews (id) {

    const request = await getInfoApi()
    const arr     = request.news  
    const currentNews = arr.find((elem) => elem.id === id);

    localStorage.setItem('@Living:news-selected', JSON.stringify(currentNews));
    window.location.replace("/pages/post/index.html")
}

async function renderByCategory (list){

    const tagsLi = document.querySelectorAll("li")


    const request = await list
    const arr     = request.news  

    tagsLi.forEach(li => {
        li.addEventListener("click", () => {

            const newObjet = {}
            root.innerText= ""
            
            if(li.innerText == "Todos"){
                renderNews(getInfoApi())
            }else{
                // const parseJson = JSON.parse(localStorage.getItem("@Living:newArrLocalStorage"))

                newObjet.news = arr.filter(elem => elem.category.toLocaleLowerCase().includes(li.innerText.toLocaleLowerCase())) 
                console.log(newObjet)  
                renderNews(newObjet)

            }

        })
    })
}
renderByCategory(getInfoApi())
