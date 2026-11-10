// The words of the interface: the site's own words, which name no thing of the course (decision
// `products-built-from-one-course`). Every other word a page shows comes from the document render-site
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
  // the concept page: its table of contents, the link of a unit's heading to itself, the button
  // that reveals an expected answer
  onThisPage: 'Dans cette page',
  linkTo: 'Lien vers',
  reveal: 'Voir la réponse',
  // a source of the concept page's « Sources »: before the date it was read
  accessed: 'consulté le',
  // the cards at the foot of a domain or concept page, in the reading order
  previous: 'Précédent',
  next: 'Suivant',
  // the units of a duration (« 18 min », « 1 h 30 »)
  minutes: 'min',
  hours: 'h',
  // the search page
  searchNeedsScript: 'La recherche demande JavaScript.',
  // the page of an address no page has
  notFound: 'Page introuvable',
  notFoundLead: 'Cette page n’existe pas.',
  // the glossary page: its filter by text and by the concept a term is defined in, its count
  filter: 'Filtrer',
  filterText: 'Chercher un terme',
  filterAll: 'Tout le cours',
  filterNone: 'Aucun terme ne correspond.',
  termOne: 'terme',
  termMany: 'termes',
  termOf: 'sur',
  // the bottom band, the course's version: its number, or this while the course has none
  version: 'version',
  unreleased: 'version non publiée',
} as const;

// The « À propos » page: the one text of the site about itself, the same for every course; it
// names no course (epic #598, Material point 16).
export const about = {
  lead: 'Ce site accompagne un cours donné par un agent IA. Il se lit aussi seul : chaque page se suffit à elle-même.',
  sections: [
    {
      id: 'professeur',
      heading: 'Un cours donné par un agent IA',
      paragraphs: [
        'Le professeur du cours est un agent IA. Il fait progresser l’apprenant pas à pas, par des questions, et s’adapte à ses réponses. Le site reprend le fond du cours, à lire avant, pendant ou après les sessions.',
      ],
    },
    {
      id: 'fabrication',
      heading: 'Comment ce site est fait',
      paragraphs: [
        'Le cours est écrit pour le professeur qui l’enseigne : une base de connaissances, découpée en fichiers, avec ses sources. Ce site est tiré de cette même base, sans réécriture. Il montre ce que le professeur enseigne, sans ce qui ne s’adresse qu’à lui : ses consignes, et ce qui reste à vérifier.',
        'Le cours, son professeur et ce site ont été construits de façon agentique : des agents IA ont écrit les textes et le code, construit le site et contrôlé le résultat, sous la direction d’un mainteneur.',
      ],
    },
    {
      id: 'version',
      heading: 'Version',
      paragraphs: [
        'La version du cours figure en bas de chaque page. Tant qu’aucune version n’est publiée, le contenu peut encore changer.',
      ],
    },
  ],
} as const;
