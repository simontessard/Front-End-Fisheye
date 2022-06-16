// eslint-disable-next-line no-unused-vars
function photographerFactory (data) {
  const { name, city, country, tagline, price, portrait, id } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    // Aria label pour décrire l'intitulé de l'élément
    article.setAttribute('aria-label', 'La carte du photographe ' + name)

    const img = document.createElement('img')
    img.setAttribute('src', picture)
    // ALT pour faire une description de l'image
    img.setAttribute('alt', name + ' portrait')
    img.setAttribute('class', 'photographer_img')

    const h2 = document.createElement('h2')
    h2.textContent = name

    const location = document.createElement('p')
    location.textContent = city + ', ' + country
    location.setAttribute('class', 'photographer_location')

    const slogan = document.createElement('p')
    slogan.textContent = tagline
    slogan.setAttribute('class', 'photographer_slogan')

    const pricing = document.createElement('p')
    pricing.textContent = price + '€/jour'
    pricing.setAttribute('class', 'photographer_pricing')

    const header = document.createElement('a')
    header.setAttribute('class', 'photographer_vignette')

    article.appendChild(header)

    header.appendChild(img)
    header.appendChild(h2)

    const informations = document.createElement('article')
    informations.setAttribute('class', 'photographer_information')

    article.appendChild(informations)

    informations.appendChild(location)
    informations.appendChild(slogan)
    informations.appendChild(pricing)
    return (article)
  }
  return { name, picture, getUserCardDOM, id }
}
