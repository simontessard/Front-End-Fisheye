import { displayInputs, displayModal, closeModal } from "../utils/contactForm.js";
// Ajout d'un lien vers l'accueil sur le logo
const logo = document.querySelector(".logo");
const header = document.querySelector('header');
const link = document.createElement('a')
header.insertBefore(link, logo);
link.setAttribute('alt','Fisheye Home page');
link.setAttribute('tabindex','1');
link.setAttribute('href','index.html');
link.appendChild(logo);

let totalLikes = 0;

async function getPhotographer() {
    const URL = (window.location).href; // You can also use document.URL
    const photographerID = URL.substring(URL.lastIndexOf('=') + 1);
    // Données récupérées grâce au fichier JSON
    return fetch('../data/photographers.json')
    .then(response => {
        // Convertit en JSON
        return response.json();})
    .then(data => {

        console.log(data);

    // Affiche les données du photographe grâce à l'id recupérée dans l'URL
    console.log(data["photographers"].find(item => item.id == photographerID));
    // Retourner les données du photographe en question
    return ({
        photographer: [data["photographers"].find(item => item.id == photographerID)]})
    });
}

async function getPhotographerMedia(photographerID) {

    // Données récupérées grâce au fichier JSON
    return fetch('../data/photographers.json')
    .then(response => {
        // Convertit en JSON
        return response.json();})
    .then(data => {

    console.log(data["media"].filter(item => item.photographerId == photographerID));
    // Retourner les medias du photographe en question
    return ({
        medias: [data["media"].filter(item => item.photographerId == photographerID)]})
    });
}

// Affichage de l'entête d'un photographe sur sa page perso
async function displayPhotographer(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");

    const { name, city, country, tagline, price, portrait, id } = photographer[0];

    const picture = `assets/photographers/${portrait}`;

    if (typeof photographer !== 'undefined') {
            const photographerInfo = document.createElement('div');

            const photographerName = document.createElement('h1');
            photographerName.textContent = name;
            photographerName.setAttribute('class','photograph-title');
            photographerName.setAttribute('tabindex','2');

            const photographerMoreInfo = document.createElement('div');
            photographerMoreInfo.setAttribute('tabindex','3');

            const location = document.createElement('h2');
            location.textContent = city + ', ' + country;
            location.setAttribute('class','second-title');

            const slogan = document.createElement('p');
            slogan.textContent = tagline;

            const img = document.createElement('img');
            img.setAttribute("src", picture);
            // ALT pour faire une description de l'image
            img.setAttribute("alt", name + ' portrait')
            img.setAttribute("class", 'photographer_img');
            img.setAttribute('tabindex','5');
            img.style.order = -1 ;

            const contactButton = document.querySelector('.contact_button');
            contactButton.setAttribute('tabindex','4');
            contactButton.setAttribute("aria-label", 'Contact Me');

            contactButton.addEventListener('click', event => {
                displayModal();
            })

            photographerInfo.appendChild(photographerName);
            photographerMoreInfo.append(location, slogan);
            photographerInfo.appendChild(photographerMoreInfo);

            photographersHeader.append(photographerInfo, img);
    }
};

// Affichage de la galerie photo/vidéo
async function displayMedias(medias, photoGraphPrice) {
    const portfolio = document.querySelector('#main');

    // Bouton de liste déroulante
    const sortByContainer = document.createElement('div');
    sortByContainer.setAttribute("class", 'gallery-sortby');

    const sortByText = document.createElement('p');
    sortByText.textContent = 'Trier par';
    sortByText.setAttribute('tabindex','7');

    const sortByDropdown = document.createElement('div');
    sortByDropdown.setAttribute("class", 'sortby-dropdown');

    sortByDropdown.addEventListener('click', event => {
        sortByDropdown.classList.toggle('active');
    })

    const sortByDropdownOption = document.createElement('div');
    sortByDropdownOption.setAttribute("class", 'dropdown-option');

    const DropdownFirstOption = document.createElement('div');
    DropdownFirstOption.textContent = 'Popularité';
    const DropdownSecondOption = document.createElement('div');
    DropdownSecondOption.textContent = 'Date';
    const DropdownThirdOption = document.createElement('div');
    DropdownThirdOption.textContent = 'Titre';

    // Texte Trier Par
    sortByContainer.appendChild(sortByText);

    // Les options de la liste
    sortByDropdownOption.append(DropdownFirstOption, DropdownSecondOption, DropdownThirdOption);

    sortByDropdown.appendChild(sortByDropdownOption);
    sortByContainer.appendChild(sortByDropdown);

    /* document.querySelectorAll('.dropdown-option div').forEach(item => {
        item.addEventListener('click', event => {
        })
      }) */

    // Elements de la galerie
    const gallery = document.createElement('div');
    gallery.setAttribute("class", 'photograph-gallery');
    const moreInfo = document.createElement('div');
    const dailyPrice = document.createElement('p');
    const allLikes = document.createElement('p');
    const darkHeart = document.createElement('img');
    darkHeart.setAttribute("src", '../assets/icons/heart.svg');
    darkHeart.setAttribute("class", 'dark-heart');

    gallery.appendChild(sortByContainer);

    let mediasList = medias[0];

    // Gérer le tabindex du focus
    let tabindex = 8;

    // Galerie des medias
    mediasList.forEach(async (media) => {

    const { date, id, likes, photographerId, price, image, title, video } = media;
    const galleryFile = await getPhotographerNameById(photographerId);
    const picture = `assets/photos/${galleryFile}/${image}`;

    const mediaImg = document.createElement('img');
    const mediaVideo = document.createElement('video');
    const mediaTitle = document.createElement('h3');
    const mediaLikes = document.createElement('p');
    const likeHeart = document.createElement('img');
    const likeInfo = document.createElement('div');
    const articleInfo = document.createElement('div');
    const galleryArticle = document.createElement('article');

    // Image de l'article de la galerie
    if (image != null) {
        mediaImg.setAttribute("src", picture);
        mediaImg.setAttribute("alt", title + 'closeup view')
        mediaImg.setAttribute("class", 'gallery_img');
        mediaImg.setAttribute('tabindex',tabindex);
        mediaImg.setAttribute('role','link');
        tabindex++;

        galleryArticle.appendChild(mediaImg);

        mediaImg.addEventListener("click", function() {
            displayModalMedia(mediasList, id, 'image');
        });
        mediaImg.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                displayModalMedia(mediasList, id, 'image');
            }
        });
    }
    else {
        const videoIcon = document.createElement('img');
        videoIcon.setAttribute("src", '../assets/icons/video.svg');
        videoIcon.setAttribute("class", 'gallery_video-icon');

        let source = document.createElement('source');
        source.src = `assets/photos/${galleryFile}/${video}`;
        mediaVideo.appendChild(source);
        mediaVideo.setAttribute("class", 'gallery_img');
        mediaVideo.setAttribute('tabindex',tabindex);
        tabindex++;

        galleryArticle.append(mediaVideo, videoIcon);

        mediaVideo.addEventListener("click", function() {
            displayModalMedia(mediasList, id, 'video');
        });
    }
    // Info
    articleInfo.setAttribute("class", 'gallery_info');

    // Titre de l'article de la galerie
    mediaTitle.textContent = title;
    mediaTitle.setAttribute("aria-label", title);
    mediaTitle.setAttribute("class", "media_title");
    mediaTitle.setAttribute('tabindex',tabindex);
    tabindex++;

    // Likes de l'article de la galerie
    mediaLikes.textContent = likes;
    mediaLikes.setAttribute("aria-label", likes);
    mediaLikes.setAttribute("class", "media_likes");
    mediaLikes.setAttribute('tabindex',tabindex);

    // Logo like
    likeHeart.setAttribute("src", '../assets/icons/heart.svg');
    likeHeart.setAttribute("alt", 'likes');
    likeInfo.setAttribute("class", "media_likeInfo");
    likeInfo.addEventListener('click', function(event) {
        newLikes = parseInt(mediaLikes.textContent);
        if (newLikes != likes + 1) {
            mediaLikes.textContent = newLikes + 1;
        }
        else {
            mediaLikes.textContent = newLikes -1;
        }
    });

    articleInfo.append(mediaTitle, likeInfo);
    likeInfo.append(mediaLikes, likeHeart);
    galleryArticle.appendChild(articleInfo);
    gallery.appendChild(galleryArticle);
    portfolio.appendChild(gallery);
    
    totalLikes = totalLikes + likes;
    allLikes.textContent = totalLikes;
    });

    moreInfo.append(allLikes, darkHeart, dailyPrice);

    portfolio.appendChild(moreInfo);

    // Price + all likes
    moreInfo.setAttribute("class", "photograph-moreinfo");
    allLikes.setAttribute("aria-label", totalLikes);
    allLikes.setAttribute("tabindex", '6');

    dailyPrice.textContent = photoGraphPrice + '€ / jour';
    dailyPrice.setAttribute("aria-label", photoGraphPrice);
};

// Affichage de la modal de media
async function displayModalMedia(mediasList, id, type) {
    let media = mediasList.filter(item => item.id == id)[0];

    // Récupération de l'index du media cliqué
    let index = mediasList.indexOf(media);

    const galleryFile = await getPhotographerNameById(media.photographerId);
    const picture = `assets/photos/${galleryFile}/${media.image}`;

    const portfolio = document.querySelector('#main');

    const modalMedia = document.createElement('div');
    modalMedia.setAttribute("class", "modal-media");
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute("class", "modal-container");
    modalContainer.setAttribute("aria-label", 'Image closeup view');

    // Cas où le media est une image
    if (type == 'image') {
        const mediaPicture = document.createElement('img');
        mediaPicture.setAttribute("src", picture);
        mediaPicture.setAttribute('class','mediaModal-picture');
        mediaPicture.setAttribute("alt", media.title);
        modalContainer.appendChild(mediaPicture);
    }
    // Cas où le media est une vidéo
    if (type == 'video') {
        const mediaVideo = document.createElement('video');
        let source = document.createElement('source');
        source.src = `assets/photos/${galleryFile}/${media.video}`;
        mediaVideo.setAttribute("controls","controls");   
        mediaVideo.appendChild(source);
        mediaVideo.setAttribute("class", 'mediaModal-picture');
        modalContainer.appendChild(mediaVideo);
    }
    const titlePicture = document.createElement('p');
    titlePicture.textContent = media.title;
    titlePicture.setAttribute('class','second-title');
    const closeButton = document.createElement('img');
    closeButton.setAttribute("src", '../assets/icons/redcross.svg');
    closeButton.setAttribute('class','mediaModal-closeButton');
    closeButton.setAttribute("aria-label", 'Close dialog');
    const previousButton = document.createElement('img');
    previousButton.setAttribute("src", '../assets/icons/previousarrow.svg');
    previousButton.setAttribute('class','mediaModal-previousButton');
    previousButton.setAttribute("aria-label", 'Previous image');
    const nextButton = document.createElement('img');
    nextButton.setAttribute("src", '../assets/icons/nextarrow.svg');
    nextButton.setAttribute('class','mediaModal-nextButton');
    nextButton.setAttribute("aria-label", 'Next image');

    modalContainer.append(titlePicture, closeButton, previousButton, nextButton);

    modalMedia.appendChild(modalContainer);
    portfolio.appendChild(modalMedia);

    modalMedia.style.display="flex";

    closeButton.addEventListener("click", function() {
        modalMedia.style.display="none";
    });
    previousButton.addEventListener("click", function() {
        modalMedia.style.display="none";
        let previousMedia = mediasList[index-1];
        if (previousMedia.hasOwnProperty('image')) {
            type = 'image';
        }
        else {
            type = 'video';
        }
        displayModalMedia(mediasList, previousMedia.id, type)
    });
    nextButton.addEventListener("click", function() {
        modalMedia.style.display="none";
        let nextMedia = mediasList[index+1];
        if (nextMedia.hasOwnProperty('image')) {
            type = 'image';
        }
        else {
            type = 'video';
        }
        displayModalMedia(mediasList, nextMedia.id, type)
    });
}

// Initialisation d'un photographe
async function initPhotographer() {
    // Récupère les datas du photographe
    const { photographer } = await getPhotographer() || {};
    // Récupère les datas des medias du photographe
    const { medias } = await getPhotographerMedia(photographer[0].id) || {};

    const photoGraphPrice = photographer[0].price;

    console.log(medias);
 
    if (typeof photographer !== 'undefined') {
        displayPhotographer(photographer);
        displayMedias(medias, photoGraphPrice);
        displayInputs();
    }
};

// Récupère les données d'un photographe grâce à son ID
async function getPhotographerNameById(id) {

    return fetch('../data/photographers.json')
        .then(response => {
            // Convertit en JSON
            return response.json();})
        .then(data => {

            const dataPhotographer = data["photographers"].filter(item => item.id == id)[0] || {};

            let name = dataPhotographer.name;

            if (typeof name !== 'undefined') {
                // Recupère le prénom du nom complet
                name = name.substring(0, name.indexOf(' ')).toLowerCase();
                // Retire le tiret si il y en un
                name = name.replace(/-/g, "");

                return name;
            }
            return null;
        });
}

initPhotographer();

export default displayModal;