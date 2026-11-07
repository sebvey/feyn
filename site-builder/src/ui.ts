// The words of the interface: the site's own words, which name no thing of the course (decision
// `one-source-two-builds`). Every other word a page shows comes from the document render-site
// prints: a word that names a thing of the course (the navigation, the labels, the headings, the
// kind words) is in its `words`, read from the spec's lexicons. This file is the one place an
// interface word is written; a page never writes one of its own. French, the language of the
// spec the courses are written in; typography: space before « : », « ; », « ? », « ! ».
export const ui = {
  // the skip link, first in every page
  skip: 'Aller au contenu',
  // the header
  menu: 'Menu',
  mainNav: 'Navigation principale',
  search: 'Recherche',
  themeDark: 'Thème sombre',
  toLight: 'Passer au thème clair',
  toDark: 'Passer au thème sombre',
  // the footer
  about: 'À propos',
  // the cards at the foot of a domain or concept page, in the reading order
  previous: 'Précédent',
  next: 'Suivant',
  // the search page
  searchNeedsScript: 'La recherche demande JavaScript.',
  // the page of an address no page has
  notFound: 'Page introuvable',
  notFoundLead: 'Cette page n’existe pas.',
  // the bottom band, the course's version
  version: 'version',
} as const;
