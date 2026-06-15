const translations = {
  sr: {
    nav_home: "Početna", 
    nav_about: "O nama", 
    nav_adopt: "Udomljavanje", 
    nav_contact: "Kontakt", 
    nav_login: "Prijava",
    btn_send: "Pošalji poruku", // Dodato za tvoje dugme iz prethodnog koraka
    about_eyebrow: "Ko smo mi",
    about_title: "Upoznajte Pawtners",
    about_subtitle: "Od 2016. godine posvećeni smo spasavanju i udomljavanju napuštenih pasa u Novom Pazaru i okolini.",
    story_eyebrow: "Naša priča",
    story_title: "Nastali smo iz ljubavi prema životinjama",
    story_p1: "Pawtners je osnovan 2016. godine od strane grupe entuzijasta koji nisu mogli da gledaju kako napušteni psi lutaju ulicama Novog Pazara bez hrane, skloništa i ljubavi.",
    story_p2: "Danas raspolažemo prostorima za smeštaj više od 60 pasa, zaposlenim veterinarima i mrežom volontera koji svakodnevno dolaze da pomognu.",
    story_p3: "Svaki pas koji uđe kroz naša vrata dobija ime, veterinarsku pomoć, hranu i toplo mesto dok ne pronađe svoju porodicu.",
    story_cta: "Postani deo priče",
    story_card1_title: "Naša priča počinje 2016.",
    story_card1_text: "Grupa volontera odlučila je da nešto promeni za napuštene pse Novog Pazara.",
    story_card2_text: "spašenih pasa od osnivanja",
    values_eyebrow: "Naše vrednosti",
    values_title: "Šta nas vodi svakog dana",
    value1_title: "Empatija", 
    value1_text: "Svakog psa tretiramo sa punim poštovanjem i razumevanjem njegovih potreba.",
    value2_title: "Odgovornost", 
    value2_text: "Proveravamo svaki dom pre udomljavanja kako bi pas bio siguran i voljen.",
    value3_title: "Transparentnost", 
    value3_text: "Otvoreni smo prema donatorima i zajednici o tome kako koristimo sredstva.",
    value4_title: "Zajednica", 
    value4_text: "Verujemo da cela zajednica mora biti uključena u brigu o napuštenim životinjama.",
    team_eyebrow: "Naš tim", 
    team_title: "Ljudi iza Pawtners-a",
    team_subtitle: "Volonteri, veterinari i entuzijasti koji svaki dan dolaze zbog jednog cilja.",
    team1_role: "Osnivač i direktor", 
    team1_bio: "Veterinarka i ljubiteljka životinja koja je pokrenula Pawtners iz strasti prema pomoći napuštenim psima sa ulice.",
    team2_role: "Glavni veterinar", 
    team2_bio: "Sa više od 12 godina iskustva, Aleksandar se stara o zdravlju svakog psa u našem azilu.",
    team3_role: "Koordinator volontera", 
    team3_bio: "Nataša organizuje mreže volontera i stara se da svaki pas dobije dovoljno pažnje i društva.",
    footer_desc: "Azil za pse u Novom Pazaru. Spasavamo, negujemo i udomljavamo pse od 2016. godine.",
    footer_nav: "Navigacija", 
    footer_contact: "Kontakt", 
    footer_hours: "Radno vreme",
    hours1: "Pon - Pet: 08:00 - 18:00", 
    hours2: "Sub: 09:00 - 15:00", 
    hours3: "Ned: Zatvoreno",
    footer_copy: "© 2026 Pawtners. Sva prava zadržana."
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_adopt: "Adopt", nav_contact: "Contact", nav_login: "Login",
    about_eyebrow: "Who we are",
    about_title: "The Pawtners story",
    about_subtitle: "Since 2016 we have been dedicated to rescuing and rehoming abandoned dogs in Novi Pazar and the surrounding area.",
    story_eyebrow: "Our story",
    story_title: "Born from a love of animals",
    story_p1: "Pawtners was founded in 2016 by a group of enthusiasts who could not stand by while abandoned dogs roamed the streets of Novi Pazar without food, shelter, or love.",
    story_p2: "Today we have space for more than 60 dogs, employed veterinarians, and a network of volunteers who come every day to help.",
    story_p3: "Every dog that comes through our doors receives a name, veterinary care, food, and a warm place until they find their family.",
    story_cta: "Become part of the story",
    story_card1_title: "Our story begins in 2016",
    story_card1_text: "A group of volunteers decided to make a change for the abandoned dogs of Novi Pazar.",
    story_card2_text: "dogs rescued since founding",
    values_eyebrow: "Our values",
    values_title: "What guides us every day",
    value1_title: "Empathy", value1_text: "We treat every dog with full respect and understanding of their needs.",
    value2_title: "Responsibility", value2_text: "We check every home before adoption to ensure the dog is safe and loved.",
    value3_title: "Transparency", value3_text: "We are open to donors and the community about how we use funds.",
    value4_title: "Community", value4_text: "We believe the whole community must be involved in caring for abandoned animals.",
    team_eyebrow: "Our team", team_title: "The people behind Pawtners",
    team_subtitle: "Volunteers, veterinarians and enthusiasts who come every day for one goal.",
    team1_role: "Founder and director", team1_bio: "A veterinarian and animal lover who started Pawtners from a passion for helping street strays.",
    team2_role: "Head veterinarian", team2_bio: "With more than 12 years of experience, Aleksandar looks after the health of every dog in our shelter.",
    team3_role: "Volunteer coordinator", team3_bio: "Natasa organizes the volunteer network and ensures every dog gets enough attention and companionship.",
    footer_desc: "Dog shelter in Novi Pazar. We rescue, care for and rehome dogs since 2016.",
    footer_nav: "Navigation", footer_contact: "Contact", footer_hours: "Working hours",
    hours1: "Mon - Fri: 08:00 - 18:00", hours2: "Sat: 09:00 - 15:00", hours3: "Sun: Closed",
    footer_copy: "2024 Pawtners. All rights reserved."
  }
};

let currentLang = localStorage.getItem('pawtners_lang') || 'sr';

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.getElementById('langBtn').textContent = lang === 'sr' ? 'EN' : 'SR';
  currentLang = lang;
  localStorage.setItem('pawtners_lang', lang);
}

function toggleLang() {
  applyTranslations(currentLang === 'sr' ? 'en' : 'sr');
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
});