    // Ajout d'un lien vers l'accueil sur le logo
    const logo = document.querySelector(".logo");
    const titre = document.querySelector("header h1");
    const header = document.querySelector('header');
    const link = document.createElement('a')
    const nav = document.createElement('nav');
    header.insertBefore(link, logo);
    header.appendChild(nav);
    titre.setAttribute('tabindex',0);
    logo.setAttribute('alt','Fisheye logo - Page accueil');
    link.setAttribute('tabindex',0);
    link.setAttribute('href','index.html');
    link.appendChild(logo);
    nav.append(link, titre);

    async function getPhotographers() {
        // Données récupérées grâce au fichier JSON
        return fetch('../data/photographers.json')
        .then(response => {
            // Convertit en JSON
            return response.json();})
        .then(data => {

        // Retourner les données;
        return ({
            photographers: [...data["photographers"]]})
        });
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        if (typeof photographers !== 'undefined') {
            photographers.forEach((photographer) => {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                // Désigne le premier enfant de la carte, soit la div contenent l'image et nom du photographe
                userCardDOM.children[0].setAttribute("tabindex", 0);
                // Désigne le second enfant de la carte, soit la div contenent les informations du photographe
                userCardDOM.children[1].setAttribute("tabindex", 0);
                // Assigner l'ID à la vignette du photographe
                vignette = userCardDOM.children[0];
                vignette.setAttribute("id", photographerModel.id);
                vignette.setAttribute("href", "photographer.html?id="+vignette.id);
                
                photographersSection.appendChild(userCardDOM);
            });
        }
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers() || {};
        
        if (typeof photographers !== 'undefined') {
            displayData(photographers);
        }
    };
    
init();