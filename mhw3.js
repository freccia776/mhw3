//VARIABILE GLOBALE per memorizzare il menu originale in menuClick()
let originalMenu = null; 

function menuClick(event) {

    const menu = event.currentTarget;
    const sidebar = document.querySelector(".sidebar");
    const menuoverlay = document.querySelector("#menuoverlay");
    const logo = document.querySelector(".sinistra .logo");
    const body = document.querySelector("body");

    if(sidebar.dataset.open === "false") { //quando la apro

        if(!originalMenu){
            originalMenu = menu.innerHTML; // Salvo il menu originale
        }

        const closeIcon  =  document.createElement("img");
        closeIcon.src = "icon/close-icon.svg";
        closeIcon.classList.add("closeicon");
        //DISABILITO SCROLL
        body.classList.add("noscroll"); 
        sidebar.classList.remove("hidden");

        //MODIFICO GLI ZINDEX
        menu.classList.add("sopraside"); 
        logo.classList.add("sopraside"); 
        menuoverlay.classList.remove("hidden");

        menu.innerHTML = "";
        menu.appendChild(closeIcon);

        sidebar.dataset.open = "true"
    }
    else{  //quando la chiudo

        sidebar.classList.add("hidden");
        //ABILITO SCROLL
        body.classList.remove("noscroll");
        //MODIFICO ZINDEX
        menu.classList.remove("sopraside");
        logo.classList.remove("sopraside"); 

        menuoverlay.classList.add("hidden");

         //RIPRISTINO IL MENU ORIGINALE
        menu.innerHTML = originalMenu;

          sidebar.dataset.open = "false";
    }
}


//FUNZIONE PER POPOLARE IL MENU SIDEBAR
function populateSidebar(){

    const links = document.querySelectorAll("#links li a");
    const sidebar = document.querySelector(".sidebar");  
    const ul = document.createElement("ul");

    for(let i = 0; i< links.length; i++){

        const link = links[i];

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = link.href;
        a.textContent = link.textContent;
        li.appendChild(a);
        ul.appendChild(li);
    }

    sidebar.innerHTML = ""; 
    sidebar.appendChild(ul);

}


//SEARCH


function closeClick(event){
   
    const bigsearch = document.querySelector(".bigsearch");
    const navbar = document.querySelector(".navbar");

    bigsearch.classList.add("hidden");
    navbar.classList.remove("hidden");

    bigsearch.dataset.open = "false";

    event.currentTarget.removeEventListener("click", closeClick); 
}

function searchClick(){
   
   const bigsearch = document.querySelector(".bigsearch");
   const navbar = document.querySelector(".navbar");
   const closebtn = document.querySelector(".close-btn");

   bigsearch.classList.remove("hidden"); 
   navbar.classList.add("hidden"); 

   bigsearch.dataset.open = "true";

   closebtn.addEventListener("click", closeClick); 
   
   
    
}

function profileClick(event){
    const profilebar = document.querySelector(".profilebar");
    const overlay = document.querySelector("#menuoverlay");
    const img = document.querySelector(".profilo img");
    const logo = document.querySelector(".sinistra .logo");
    const menu = document.querySelector(".menu");
    const profilo = event.currentTarget;
    const body  = document.querySelector("body");

    if(profilebar.dataset.open === "false") {
        console.log("Apro il profilo");
        profilebar.classList.remove("hidden");
        overlay.classList.remove("hidden"); 
        //DISABILITO SCROLL
        body.classList.add("noscroll"); 

        //MODIFICO GLI ZINDEX
        menu.classList.add("sottoside"); 
        logo.classList.add("sottoside"); 
        profilo.classList.add("sopraside"); 

        img.src = "icon/close-icon.svg"; 
        img.classList.add("closeicon");
        profilebar.dataset.open = "true";
        
    }

    else{
        profilebar.classList.add("hidden");
        overlay.classList.add("hidden"); 
        //ABILITO SCROLL
        body.classList.remove("noscroll");
        //MODIFICO ZINDEX
        logo.classList.remove("sottoside"); 
        menu.classList.remove("sottoside"); 
        profilo.classList.remove("sopraside"); 


        img.src = "icon/profilo.svg"; 
        img.classList.remove("closeicon");
        profilebar.dataset.open = "false";
    }
   

}


const images = [
    "./slide/slide1.jpg",
    "./slide/slide2.jpg",
    "./slide/slide3.jpg"
];


const smartimages = [
    "./slide/slide8.jpg",
    "./slide/slide9.jpg",
    "./slide/slide10.jpg"
];


//PROFILE BAR
const profilo = document.querySelector(".profilo");
profilo.addEventListener("click", profileClick);



//SEARCH
const search_btn = document.querySelector("#search_btn");
search_btn.addEventListener("click", searchClick);

//POPOLA MENU ALL'AVVIO
populateSidebar();

//EVENTO MENU
const menu = document.querySelector(".menu");
menu.addEventListener("click", menuClick);


//SLIDER PRIMA PAGINA
let currentIndex = 0; 

const imgprimapagina = document.querySelector(".image");
const imgsmart = document.querySelector(".smartimage");
const prevbtn = document.querySelector(".prev-btn");
const nextbtn = document.querySelector(".next-btn");


function updateImage(){

    imgsmart.src = smartimages[currentIndex]; 
    imgprimapagina.src = images[currentIndex];
}


prevbtn.addEventListener("click", function(){

    currentIndex = (currentIndex - 1 + images.length) % images.length; 
    updateImage();
});


nextbtn.addEventListener("click", function(){

    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

updateImage();


//FOOTER


function showInfo(event){

    console.log("sto cliccando");
    const btn = event.currentTarget;
    const idtarget = "#" + btn.dataset.target;
    console.log(idtarget);
    const info = document.querySelector(idtarget);
    
    if(info.classList.contains("smarthidden")){
        
        btn.textContent = "-";
        info.classList.remove("smarthidden");

    }
    else {
    
        btn.textContent = "+";
        info.classList.add("smarthidden");
    }

 
}


//PER OGNI BOTTONE DEL FOOTER
const footerbtns = document.querySelectorAll(".title-info button");
for (const btn of footerbtns) {
    btn.addEventListener("click", showInfo); 
}

// OMDB API PER LA BARRA DI RICERCA DEI FILM

const OMDB_API_KEY = "secret";

//ONJSON OMDB
function onJson(json) {
    console.log("JSON ricevuto");
   
    const risultati = document.querySelector("#risultati");
    risultati.innerHTML = ""; 

    //CONTROLLO SE NON CI SONO RISULTATI
    if (!json.Search || json.Search.length === 0) {
        const noResultsText = document.createElement("p");
        noResultsText.textContent = "Nessun Risultato trovato.";
        noResultsText.classList.add("bianco"); 
        risultati.appendChild(noResultsText);
        return; 
      }

    
    let num_results = json.Search.length;
    if (num_results > 10) //massimo 10 risultati
      num_results = 10;
  
    for (let i = 0; i < num_results; i++) {

      
      const movie = json.Search[i];
      const title = movie.Title;

      let poster_url;
      if (movie.Poster !== "N/A") {
        poster_url = movie.Poster;
      } else {
        poster_url = "./copertine/placeholder.jpg"; //carico un'immagine di placeholder se mancante
      }
  
      const film = document.createElement("div");
      film.classList.add("film"); 
  
      const img = document.createElement("img");
      img.src = poster_url;
  
      const caption = document.createElement("span");
      caption.textContent = title;
  
      film.appendChild(img);
      film.appendChild(caption);
      risultati.appendChild(film);
    }

}

//ONRESPONSE OMDB
function onResponse(response) {
    console.log("Risposta ricevuta");
    return response.json();
  }
  

//SEARCH OMDB
function search(event)
{

  event.preventDefault();
  //form attuale
  const form = event.currentTarget;
 
  const primapagina = document.querySelector("#sliderpage");
  const main = document.querySelector("#main");
  const ricerca = document.querySelector(".ricerca");

  
  //aggiungo e rimuovo hidden  
  primapagina.classList.add("hidden"); 
  main.classList.add("hidden");
  ricerca.classList.remove("hidden");
   


 //utilizzo il form attuale per utilizzare il suo input value 
  const input = form.querySelector(".search-input");
  
  //modifico il testo
  const text = document.querySelector(".ricerca h1 span");
  text.textContent = input.value;
  //encodeURIComponent 
  const input_value = encodeURIComponent(input.value);
  console.log("Eseguo ricerca: " + input_value);

  //richiesta:
 rest_url = "https://www.omdbapi.com/?s=" + input_value + "&apikey=" + OMDB_API_KEY;
 console.log("URL: " + rest_url);

 //fetch
 fetch(rest_url).then(onResponse).then(onJson);
  
}

const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
form1.addEventListener("submit", search)
form2.addEventListener("submit", search)

//TMDB API

//ONJSON TMDB
function tmdbJson(json) {
    console.log("JSON TMDB ricevuto");
    const slider = document.getElementById("upcoming-slider");

    let num_results = json.results.length;
    if (num_results > 10) num_results = 10;
  
    for (let i = 0; i < num_results; i++) {
        const movie = json.results[i];
    
        const div = document.createElement("div");
        div.classList.add("mini-slide");
        div.classList.add("miniapi-img"); 

        const img = document.createElement("img");  

        let poster_url;

        if (movie.poster_path) {
            poster_url = "https://image.tmdb.org/t/p/w300"+ movie.poster_path;
        } 
        else {
            poster_url = "./copertine/placeholder.jpg"; //carico un'immagine di placeholder se mancante
        }

        img.src = poster_url;
        
        img.alt = movie.title;

        const infoDiv = document.createElement("div");
        
        const title = document.createElement("h4");
        title.textContent = movie.title;
        title.classList.add("bianco");

        const price = document.createElement("p");
        price.textContent = "Presto disponibile";
        price.classList.add("evidenziato"); 

        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        div.appendChild(img);
        div.appendChild(infoDiv);
        slider.appendChild(div);

    }
}

//ONRESPONSE TMDB
function tmdbReponse(rispostatmdb) {
    console.log("Risposta TMDB ricevuta");
    return rispostatmdb.json();

}


const TMDB_API_KEY = "secret";

url_tmdb = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + TMDB_API_KEY + "&language=it-IT&region=IT";

//IN QUESTO CASO LA FETCH AVVIENE QUANDO LA PAGINA VIENE CARICATA
fetch(url_tmdb).then(tmdbReponse).then(tmdbJson);


 

