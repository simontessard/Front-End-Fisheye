function headerFactory (page) {
  // Ajout d'un lien vers l'accueil sur le logo
  const logo = document.querySelector('.logo')
  const titre = document.querySelector('header h1')
  const header = document.querySelector('header')
  const link = document.createElement('a')
  const nav = document.createElement('nav')

  header.appendChild(nav)

  logo.setAttribute('alt', 'Fisheye logo - Page accueil')
  link.setAttribute('tabindex', 0)
  link.setAttribute('href', 'index.html')
  titre.setAttribute('tabindex', 0)
  titre.setAttribute('role', 'heading')
  titre.setAttribute('aria-level', 1)
  nav.appendChild(link)
  if (page === 'accueil') {
    nav.appendChild(titre)
  } else {
    titre.remove()
  }
  link.appendChild(logo)

  if (titre != null) {
    titre.setAttribute('tabindex', 0)
  }
}
export { headerFactory }
