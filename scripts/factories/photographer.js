function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        // Aria label pour décrire l'intitulé de l'élément
        article.setAttribute("aria-label", 'La carte du photographe ' + name);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        // ALT pour faire une description de l'image
        img.setAttribute("alt", name + ' portrait')

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", name);

        const location = document.createElement( 'p' );
        location.textContent = city + ', ' + country;
        location.setAttribute("aria-label", name + 'est localisé à ' + city + ', ' + country);

        const quote = document.createElement( 'p' );
        quote.textContent = tagline;
        quote.setAttribute("aria-label", tagline);

        const pricing = document.createElement( 'p' );
        pricing.textContent = price + '€/jour';
        pricing.setAttribute("aria-label", price + '€ par jour');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(pricing);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}