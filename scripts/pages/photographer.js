import { initializeModal, displayModal, closeModal, addFocus } from "../utils/contactForm.js";
import { headerFactory } from "../factories/header.js";

headerFactory();

let totalLikes = 0;

const portfolio = document.querySelector('#main');

async function getPhotographer() {
    const URL = (window.location).href; // You can also use document.URL
    const photographerID = URL.substring(URL.lastIndexOf('=') + 1);
    // Données récupérées grâce au fichier JSON
    return fetch('../data/photographers.json')
        .then(response => {
            // Convertit en JSON
            return response.json();
        })
        .then(data => {
            // Affiche les données du photographe grâce à l'id recupérée dans l'URL
            console.log(data["photographers"].find(item => item.id == photographerID));
            // Retourner les données du photographe en question
            return ({
                photographer: [data["photographers"].find(item => item.id == photographerID)]
            })
        });
}

async function getPhotographerMedia(photographerID) {
    // Données récupérées grâce au fichier JSON
    return fetch('../data/photographers.json')
        .then(response => {
            // Convertit en JSON
            return response.json();
        })
        .then(data => {
            // Retourner les medias du photographe en question
            return ({
                medias: [data["media"].filter(item => item.photographerId == photographerID)]
            })
        });
}

// Affichage de l'entête d'un photographe sur sa page perso
async function displayPhotographer(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    photographersHeader.setAttribute('aria-label', 'Les informations du photographe')

    const { name, city, country, tagline, price, portrait, id } = photographer[0];

    const picture = `assets/photographers/${portrait}`;

    if (typeof photographer !== 'undefined') {
        const photographerInfo = document.createElement('div');

        const photographerName = document.createElement('h1');
        photographerName.textContent = name;
        photographerName.setAttribute('class', 'photograph-title');
        photographerName.setAttribute('tabindex', '0');

        const photographerMoreInfo = document.createElement('div');
        photographerMoreInfo.setAttribute('tabindex', '0');
        photographerMoreInfo.setAttribute('role', 'contentinfo');

        const location = document.createElement('h2');
        location.textContent = city + ', ' + country;
        location.setAttribute('class', 'second-title');

        const slogan = document.createElement('p');
        slogan.textContent = tagline;

        const photographerPortrait = document.createElement('img');
        photographerPortrait.setAttribute("src", picture);
        // ALT pour faire une description de l'image
        photographerPortrait.setAttribute("alt", name + ' portrait')
        photographerPortrait.setAttribute("class", 'photographer_img');
        photographerPortrait.setAttribute('tabindex', '0');
        photographerPortrait.setAttribute('role', 'img');

        const contactButton = document.querySelector('.contact_button');
        contactButton.setAttribute('tabindex', '0');
        contactButton.setAttribute("aria-label", 'Contactez-moi');
        contactButton.textContent = 'Contactez-moi';
        contactButton.addEventListener('click', event => {
            displayModal();
            addFocus('contact');
        })

        photographerInfo.appendChild(photographerName);
        photographerMoreInfo.append(location, slogan);
        photographerInfo.appendChild(photographerMoreInfo);

        photographersHeader.append(photographerInfo, contactButton, photographerPortrait);
    }
};

function displaySortBy(medias) {
    let mediasList = medias[0];

    // Bouton de liste déroulante
    const sortByContainer = document.createElement('section');
    sortByContainer.setAttribute("class", 'gallery-sortby');
    sortByContainer.setAttribute("aria-label", 'Liste déroulante de tri des médias du photographe');

    const sortByText = document.createElement('p');
    sortByText.textContent = 'Trier par';
    sortByText.setAttribute('tabindex', '0');
    sortByText.setAttribute('role', 'heading');
    sortByText.setAttribute('aria-level', 3);

    const sortByDropdown = document.createElement('div');
    sortByDropdown.setAttribute("class", 'sortby-dropdown');

    sortByDropdown.addEventListener('click', event => {
        sortByDropdown.classList.toggle('active');
    })
    sortByDropdown.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sortByDropdown.classList.toggle('active');
        }
    });

    const sortByDropdownOption = document.createElement('div');
    sortByDropdownOption.setAttribute("class", 'dropdown-option');

    const DropdownFirstOption = document.createElement('div');
    DropdownFirstOption.textContent = 'Popularité';
    DropdownFirstOption.setAttribute('data-value', '0')
    const DropdownSecondOption = document.createElement('div');
    DropdownSecondOption.textContent = 'Date';
    DropdownSecondOption.setAttribute('data-value', '1')
    const DropdownThirdOption = document.createElement('div');
    DropdownThirdOption.textContent = 'Titre';
    DropdownThirdOption.setAttribute('data-value', '2')

    // Les options de la liste
    sortByDropdownOption.append(DropdownFirstOption, DropdownSecondOption, DropdownThirdOption);

    sortByDropdown.appendChild(sortByDropdownOption);
    sortByContainer.append(sortByText, sortByDropdown);

    let listOptions = [DropdownFirstOption, DropdownSecondOption, DropdownThirdOption]

    listOptions.forEach(option => {
        option.setAttribute('tabindex', 0);
        option.addEventListener('click', event => {
            sortMedia(DropdownFirstOption, option, mediasList);
        });
        option.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                sortMedia(DropdownFirstOption, option, mediasList);
            }
        });
    });
    portfolio.appendChild(sortByContainer);
}

function sortMedia(DropdownFirstOption, option, mediasList) {
    const gallery = document.querySelector('.photograph-gallery');
    const sortByDropdown = document.querySelector('.sortby-dropdown');

    if (sortByDropdown.className === 'sortby-dropdown active') {
        let oldActiveText = DropdownFirstOption.textContent;
        let newActiveText = option.textContent;
        DropdownFirstOption.textContent = newActiveText;
        option.textContent = oldActiveText;

        if (newActiveText === 'Popularité') {
            mediasList = mediasList.sort((a, b) => (a.likes < b.likes ? 1 : -1));
            gallery.remove();
            createGallery(mediasList);
        }
        if (newActiveText === 'Date') {
            mediasList = mediasList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            gallery.remove();
            createGallery(mediasList);
        }
        if (newActiveText === 'Titre') {
            mediasList = mediasList.sort((a, b) => a.title.localeCompare(b.title));
            gallery.remove();
            createGallery(mediasList);
        }
    }
}

function createGallery(mediasList) {
    // Elements de la galerie
    const gallery = document.createElement('section');
    gallery.setAttribute("class", 'photograph-gallery');
    gallery.setAttribute("aria-label", 'Galerie des médias du photographe');

    // Reset des likes total
    totalLikes = 0;

    // Galerie des medias
    mediasList.forEach(async (media) => {
        const { date, id, likes, photographerId, price, image, title, video } = media;
        const galleryFile = await getPhotographerNameById(photographerId);
        const picture = `assets/photos/${galleryFile}/${image}`;

        const mediaImg = document.createElement('img');
        const mediaVideo = document.createElement('video');
        const mediaTitle = document.createElement('h3');
        const mediaLikes = document.createElement('h3');
        const likeHeart = document.createElement('img');
        const likeInfo = document.createElement('div');
        const articleInfo = document.createElement('div');
        const galleryArticle = document.createElement('article');
        const allLikes = document.querySelector('.photograph-moreinfo p');

        // Image de l'article de la galerie
        if (image != null) {
            mediaImg.setAttribute("src", picture);
            mediaImg.setAttribute("alt", title + 'closeup view')
            mediaImg.setAttribute("class", 'gallery_img');
            mediaImg.setAttribute('tabindex', '0');
            mediaImg.setAttribute('role', 'img');

            galleryArticle.appendChild(mediaImg);

            mediaImg.addEventListener("click", function () {
                displayModalMedia(mediasList, id, 'image');
            });
            mediaImg.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    displayModalMedia(mediasList, id, 'image');
                }
            });
        }
        else {
            const videoIcon = document.createElement('img');
            videoIcon.setAttribute("src", '../assets/icons/video.svg');
            videoIcon.setAttribute("class", 'gallery_video-icon');
            videoIcon.setAttribute("alt", 'Black video player');

            let source = document.createElement('source');
            source.src = `assets/photos/${galleryFile}/${video}`;
            mediaVideo.appendChild(source);
            mediaVideo.setAttribute("class", 'gallery_img');
            mediaVideo.setAttribute('tabindex', '0');

            galleryArticle.append(mediaVideo, videoIcon);

            mediaVideo.addEventListener("click", function () {
                displayModalMedia(mediasList, id, 'video');
            });
            mediaVideo.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    displayModalMedia(mediasList, id, 'video');
                }
            });
        }
        // Info
        articleInfo.setAttribute("class", 'gallery_info');

        // Titre de l'article de la galerie
        mediaTitle.textContent = title;
        mediaTitle.setAttribute("aria-label", title);
        mediaTitle.setAttribute("class", "media_title");
        mediaTitle.setAttribute('tabindex', '0');

        // Likes de l'article de la galerie
        mediaLikes.textContent = likes;
        mediaLikes.setAttribute("class", "media_likes");
        mediaLikes.setAttribute('tabindex', '0');
        mediaLikes.setAttribute('role', 'contentinfo');

        // Logo like
        likeHeart.setAttribute("src", '../assets/icons/heart.svg');
        likeHeart.setAttribute("alt", 'Coeur rouge');
        likeHeart.setAttribute('tabindex', '0');
        likeHeart.setAttribute('role', 'img');
        likeInfo.setAttribute("class", "media_likeInfo");
        likeHeart.addEventListener('click', function (event) {
            likeHeart.classList.toggle('liked');
            let newLikes = parseInt(mediaLikes.textContent);
            if (newLikes != likes + 1) {
                mediaLikes.textContent = newLikes + 1;
                allLikes.textContent = parseInt(allLikes.textContent) + 1;
            }
            else {
                mediaLikes.textContent = newLikes - 1;
                allLikes.textContent = parseInt(allLikes.textContent) - 1;
            }
        });
        likeHeart.addEventListener('keypress', function (event) {
            if (event.key === "Enter") {
                likeHeart.classList.toggle('liked');
                let newLikes = parseInt(mediaLikes.textContent);
                if (newLikes != likes + 1) {
                    mediaLikes.textContent = newLikes + 1;
                }
                else {
                    mediaLikes.textContent = newLikes - 1;
                }
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
}

// Affichage de la galerie photo/vidéo
async function displayMedias(medias, photoGraphPrice) {
    displaySortBy(medias);

    let mediasList = medias[0];
    createGallery(mediasList);

    const moreInfo = document.createElement('aside');
    moreInfo.setAttribute("class", "photograph-moreinfo");
    moreInfo.setAttribute("aria-label", "Informations supplémentaires du photographe");

    const dailyPrice = document.createElement('p');
    dailyPrice.setAttribute("role", 'contentinfo');
    dailyPrice.textContent = photoGraphPrice + '€ / jour';

    const allLikes = document.createElement('p');
    allLikes.setAttribute("tabindex", '0');

    const darkHeart = document.createElement('img');
    darkHeart.setAttribute("src", '../assets/icons/heart.svg');
    darkHeart.setAttribute("class", 'dark-heart');
    darkHeart.setAttribute("alt", 'Coeur noir');

    moreInfo.append(allLikes, darkHeart, dailyPrice);
    portfolio.appendChild(moreInfo);
};

// Affichage de la modal de media
async function displayModalMedia(mediasList, id, type) {
    let media = mediasList.filter(item => item.id == id)[0];

    // Récupération de l'index du media cliqué
    let index = mediasList.indexOf(media);

    const galleryFile = await getPhotographerNameById(media.photographerId);
    const picture = `assets/photos/${galleryFile}/${media.image}`;

    const modalMedia = document.createElement('div');
    modalMedia.setAttribute("class", "modal-media");
    modalMedia.setAttribute('tabindex', 0);
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute("class", "modal-container");
    modalContainer.setAttribute("aria-label", 'Image closeup view');



    // Cas où le media est une image
    if (type == 'image') {
        const mediaPicture = document.createElement('img');
        mediaPicture.setAttribute("src", picture);
        mediaPicture.setAttribute('class', 'mediaModal-picture');
        mediaPicture.setAttribute("alt", media.title);
        mediaPicture.setAttribute("role", 'img');
        mediaPicture.setAttribute('tabindex', 0);
        modalContainer.appendChild(mediaPicture);
    }
    // Cas où le media est une vidéo
    if (type == 'video') {
        const mediaVideo = document.createElement('video');
        let source = document.createElement('source');
        source.src = `assets/photos/${galleryFile}/${media.video}`;
        mediaVideo.setAttribute("controls", "controls");
        mediaVideo.appendChild(source);
        mediaVideo.setAttribute("class", 'mediaModal-picture');
        mediaVideo.setAttribute('tabindex', 0);
        modalContainer.appendChild(mediaVideo);
    }

    const titlePicture = document.createElement('p');
    titlePicture.textContent = media.title;
    titlePicture.setAttribute('class', 'second-title');
    titlePicture.setAttribute('tabindex', 0);
    const closeButton = document.createElement('img');
    closeButton.setAttribute("src", '../assets/icons/redcross.svg');
    closeButton.setAttribute('class', 'mediaModal-closeButton');
    closeButton.setAttribute("aria-label", 'Fermer aperçu média');
    closeButton.setAttribute('role', 'button');
    closeButton.setAttribute('tabindex', 0);
    const previousButton = document.createElement('img');
    previousButton.setAttribute("src", '../assets/icons/previousarrow.svg');
    previousButton.setAttribute('class', 'mediaModal-previousButton');
    previousButton.setAttribute("aria-label", 'Image précédente');
    previousButton.setAttribute('role', 'button');
    previousButton.setAttribute('tabindex', 0);
    const nextButton = document.createElement('img');
    nextButton.setAttribute("src", '../assets/icons/nextarrow.svg');
    nextButton.setAttribute('class', 'mediaModal-nextButton');
    nextButton.setAttribute("aria-label", 'Image suivante');
    nextButton.setAttribute('role', 'button');
    nextButton.setAttribute('tabindex', 0);

    modalContainer.append(titlePicture, closeButton, previousButton, nextButton);

    modalMedia.appendChild(modalContainer);
    portfolio.appendChild(modalMedia);

    modalMedia.style.display = "flex";

    closeButton.addEventListener("click", function () {
        modalMedia.remove();
    });
    closeButton.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            modalMedia.remove();
        }
    });
    previousButton.addEventListener("click", function () {
        modalMedia.remove();
        let previousMedia = mediasList[index - 1];
        if (previousMedia.hasOwnProperty('image')) {
            type = 'image';
        }
        else { type = 'video'; }
        displayModalMedia(mediasList, previousMedia.id, type)
    });
    previousButton.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            modalMedia.remove();
            let previousMedia = mediasList[index - 1];
            if (previousMedia.hasOwnProperty('image')) {
                type = 'image';
            }
            else { type = 'video'; }
            displayModalMedia(mediasList, previousMedia.id, type)
        }
    });
    nextButton.addEventListener("click", function () {
        modalMedia.remove();
        let nextMedia = mediasList[index + 1];
        if (nextMedia.hasOwnProperty('image')) {
            type = 'image';
        }
        else { type = 'video'; }
        displayModalMedia(mediasList, nextMedia.id, type)
    });
    nextButton.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            modalMedia.remove();
            let nextMedia = mediasList[index + 1];
            if (nextMedia.hasOwnProperty('image')) {
                type = 'image';
            }
            else { type = 'video'; }
            displayModalMedia(mediasList, nextMedia.id, type)
        }
    });
    // Gère la navigation avec les flèches du clavier
    document.onkeydown = (e) => {
        let isModalNull = document.querySelector('.modal-media');
        if (isModalNull != null) {
            e = e || window.event;
            if (e.keyCode === 37) {
                modalMedia.remove();
                let previousMedia = mediasList[index - 1];
                if (previousMedia.hasOwnProperty('image')) {
                    type = 'image';
                }
                else { type = 'video'; }
                displayModalMedia(mediasList, previousMedia.id, type)
            } else if (e.keyCode === 39) {
                modalMedia.remove();
                let nextMedia = mediasList[index + 1];
                if (nextMedia.hasOwnProperty('image')) {
                    type = 'image';
                }
                else { type = 'video'; }
                displayModalMedia(mediasList, nextMedia.id, type)
            }
        }
    }
    addFocus('media');
}

// Initialisation d'un photographe
async function initPhotographer() {
    // Récupère les datas du photographe
    const { photographer } = await getPhotographer() || {};
    // Récupère les datas des medias du photographe
    const { medias } = await getPhotographerMedia(photographer[0].id) || {};

    const photoGraphPrice = photographer[0].price;

    if (typeof photographer !== 'undefined') {
        displayPhotographer(photographer);
        displayMedias(medias, photoGraphPrice);
        initializeModal();
    }
};

// Récupère les données d'un photographe grâce à son ID
async function getPhotographerNameById(id) {
    return fetch('../data/photographers.json')
        .then(response => {
            // Convertit en JSON
            return response.json();
        })
        .then(data => {
            const dataPhotographer = data["photographers"].filter(item => item.id == id)[0] || {};

            let name = dataPhotographer.name;

            if (typeof name !== 'undefined') {
                // Récupère le prénom du nom complet
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