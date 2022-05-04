    async function getPhotographers() {

        // Données récupérées grâce au fichier JSON
        return fetch('../data/photographers.json')
        .then(response => {
            // Convertit en JSON
            return response.json();})
        .then(data => {
        // Afficher dans la console
        console.log(data["photographers"]);

        // Retourner les données;
        // return data["photographers"];
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
                photographersSection.appendChild(userCardDOM);
            });
        }
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers() || {};
        console.log(photographers);
        
        if (typeof photographers !== 'undefined') {
            displayData(photographers);
        }
    };
    
    init();