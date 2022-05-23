totalLikes = 0;

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
            location.setAttribute('class','second-title');

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

async function displayMedias(medias, photoGraphPrice) {
    const portfolio = document.querySelector('#main');
    const gallery = document.createElement('div');
    gallery.setAttribute("class", 'photograph-gallery');
    const moreInfo = document.createElement('div');
    const dailyPrice = document.createElement('p');
    const allLikes = document.createElement('p');
    const darkHeart = document.createElement('img');
    darkHeart.setAttribute("src", '../assets/icons/heart.svg');
    darkHeart.setAttribute("class", 'dark-heart');

    mediasList = medias[0];
    console.log(mediasList);
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
        mediaImg.setAttribute("alt", title)
        mediaImg.setAttribute("class", 'gallery_img');
        galleryArticle.appendChild(mediaImg);

        mediaImg.addEventListener("click", function() {
            displayModalMedia(mediasList, id);
        });
    }
    else {
        source = document.createElement('source');
        source.src = `assets/photos/${galleryFile}/${video}`;
        mediaVideo.appendChild(source);
        mediaVideo.setAttribute("class", 'gallery_img');
        galleryArticle.appendChild(mediaVideo);
    }
    // Info
    articleInfo.setAttribute("class", 'gallery_info');

    // Titre de l'article de la galerie
    mediaTitle.textContent = title;
    mediaTitle.setAttribute("aria-label", title);

    // Likes de l'article de la galerie
    mediaLikes.textContent = likes;
    mediaLikes.setAttribute("aria-label", likes);
    mediaLikes.setAttribute("class", "media_likes");

    // Logo like
    likeHeart.setAttribute("src", '../assets/icons/heart.svg');
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

    articleInfo.appendChild(mediaTitle);
    articleInfo.appendChild(likeInfo);
    likeInfo.appendChild(mediaLikes);
    likeInfo.appendChild(likeHeart);
    galleryArticle.appendChild(articleInfo);
    gallery.appendChild(galleryArticle);
    // portfolio.appendChild(sortByContainer);
    portfolio.appendChild(gallery);
    
    totalLikes = totalLikes + likes;
    allLikes.textContent = totalLikes;
    });

    moreInfo.appendChild(allLikes);
    moreInfo.appendChild(darkHeart);
    moreInfo.appendChild(dailyPrice);
    portfolio.appendChild(moreInfo);

    // Price + all likes
    moreInfo.setAttribute("class", "photograph-moreinfo");

    allLikes.setAttribute("aria-label", totalLikes);
    allLikes.setAttribute("class", "media_likes");

    dailyPrice.textContent = photoGraphPrice + '€ / jour';
    dailyPrice.setAttribute("aria-label", photoGraphPrice);
    dailyPrice.setAttribute("class", "media_likes");
};

async function displayModalMedia(mediasList, id) {
    media = mediasList.filter(item => item.id == id)[0];

    // Récupération de l'index du media cliqué
    index = mediasList.indexOf(media);

    const galleryFile = await getPhotographerNameById(media.photographerId);
    const picture = `assets/photos/${galleryFile}/${media.image}`;

    const portfolio = document.querySelector('#main');

    const modalMedia = document.createElement('div');
    modalMedia.setAttribute("class", "modal-media");
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute("class", "modal-container");
    const mediaPicture = document.createElement('img');
    mediaPicture.setAttribute("src", picture);
    mediaPicture.setAttribute('class','mediaModal-picture');
    const titlePicture = document.createElement('p');
    titlePicture.textContent = media.title;
    titlePicture.setAttribute('class','second-title');
    const closeButton = document.createElement('img');
    closeButton.setAttribute("src", '../assets/icons/redcross.svg');
    closeButton.setAttribute('class','mediaModal-closeButton');
    const previousButton = document.createElement('img');
    previousButton.setAttribute("src", '../assets/icons/previousarrow.svg');
    previousButton.setAttribute('class','mediaModal-previousButton');
    const nextButton = document.createElement('img');
    nextButton.setAttribute("src", '../assets/icons/nextarrow.svg');
    nextButton.setAttribute('class','mediaModal-nextButton');

    modalContainer.appendChild(mediaPicture);
    modalContainer.appendChild(titlePicture);
    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(previousButton);
    modalContainer.appendChild(nextButton);
    modalMedia.appendChild(modalContainer);
    portfolio.appendChild(modalMedia);

    modalMedia.style.display="flex";

    closeButton.addEventListener("click", function() {
        modalMedia.style.display="none";
    });
    previousButton.addEventListener("click", function() {
        modalMedia.style.display="none";
        previousMedia = mediasList[index-1];
        displayModalMedia(mediasList, previousMedia.id)
    });
    nextButton.addEventListener("click", function() {
        modalMedia.style.display="none";
        nextMedia = mediasList[index+1];
        displayModalMedia(mediasList, nextMedia.id)
    });
}

async function initPhotographer() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographer() || {};
    const { medias } = await getPhotographerMedia(photographer[0].id) || {};

    const photoGraphPrice = photographer[0].price;

    console.log(medias);
 
    if (typeof photographer !== 'undefined') {
        displayPhotographer(photographer);
        displayMedias(medias, photoGraphPrice);
    }
};

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