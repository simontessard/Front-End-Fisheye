
async function getPhotographer() {

    const URL = (window.location).href; // You can also use document.URL
    const photographerID = URL.substring(URL.lastIndexOf('=') + 1);

    // Données récupérées grâce au fichier JSON
    return fetch('../data/photographers.json')
    .then(response => {
        // Convertit en JSON
        return response.json();})
    .then(data => {

    // Affiche les données du photographe grâce à l'id recupérée dans l'URL
    console.log(data["photographers"].find(item => item.id == photographerID));
    // Retourner les données du photographe en question
    return ({
        photographer: [data["photographers"].find(item => item.id == photographerID)]})
    });

}

async function displayPhotographer(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");

    const { name, city, country, tagline, price, portrait, id } = photographer[0];

    const picture = `assets/photographers/${portrait}`;

    if (typeof photographer !== 'undefined') {
            const photographerInfo = document.createElement('div');

            const prenom = document.createElement('h1');
            prenom.textContent = name;

            const location = document.createElement('h2');
            location.textContent = city + ', ' + country;

            const slogan = document.createElement('p');
            slogan.textContent = tagline;

            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            // ALT pour faire une description de l'image
            img.setAttribute("alt", name + ' portrait')
            img.setAttribute("class", 'photographer_img');
            img.style.order = -1 ;

            photographerInfo.appendChild(prenom);
            photographerInfo.appendChild(location);
            photographerInfo.appendChild(slogan);

            photographersHeader.appendChild(photographerInfo);
            photographersHeader.appendChild(img);
    }
};

async function initPhotographer() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographer() || {};
    
    if (typeof photographer !== 'undefined') {
        displayPhotographer(photographer);
    }
};

initPhotographer();