function headerFactory() {
    // Ajout d'un lien vers l'accueil sur le logo
    const logo = document.querySelector(".logo");
    const titre = document.querySelector("header h1");
    const header = document.querySelector('header');
    const link = document.createElement('a')
    header.insertBefore(link, logo);
    
    logo.setAttribute('alt', 'Fisheye logo - Page accueil');
    link.setAttribute('tabindex', 0);
    link.setAttribute('href', 'index.html');
    link.appendChild(logo);

    if (titre != null) {
        titre.setAttribute('tabindex', 0);
    }
} 
export { headerFactory }