function headerFactory() {
    // Ajout d'un lien vers l'accueil sur le logo
    const logo = document.querySelector(".logo");
    const titre = document.querySelector("header h1");
    const header = document.querySelector('header');
    const link = document.createElement('a');
    const nav = document.createElement('nav');
    
    header.insertBefore(link, logo);
    header.appendChild(nav);
    
    logo.setAttribute('alt', 'Fisheye logo - Page accueil');
    link.setAttribute('tabindex', 0);
    link.setAttribute('href', 'index.html');
    link.appendChild(logo);
    nav.appendChild(link);

    if (titre != null) {
        titre.setAttribute('tabindex', 0);
    }
} 
export { headerFactory }