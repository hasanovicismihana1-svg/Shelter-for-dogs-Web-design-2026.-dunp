// === I18N DICTIONARY ===
const translations = {
  sr: {
    nav_home: "Početna",
    nav_about: "O nama",
    nav_adopt: "Udomljavanje",
    nav_contact: "Kontakt",
    nav_login: "Prijava",
    hero_eyebrow: "Azil za pse | Novi Pazar",
    hero_title: "Svaki pas zasluzuje dom pun ljubavi",
    hero_desc: "Pawtners je mesto nade. Pomozite nam da pronajdemo topao dom za svakog psa koji ceka svog coveka.",
    hero_cta_adopt: "Pronadji psa",
    hero_cta_about: "Saznaj vise",
    stat_dogs: "pasa spaseno",
    stat_years: "godina rada",
    stat_homes: "srecnih domova",
    mission1_title: "Spasavanje",
    mission1_text: "Prihvatamo napustene pse sa ulica i dajemo im sigurnost.",
    mission2_title: "Udomljavanje",
    mission2_text: "Spajamo pse sa porodicama koje ce ih voleti zauvek.",
    mission3_title: "Briga",
    mission3_text: "Veterinarska nega i socijalizacija dok ne pronadu dom.",
    featured_eyebrow: "Cekaju te",
    featured_title: "Psi koji traze dom",
    featured_subtitle: "Ulogujte se i upoznajte sve nase stanare. Mozda je jedan od njih upravo vasa sudbina.",
    dog_placeholder: "Prijavi se da vidis pse",
    dog_placeholder_text: "Prijavite se na vas nalog da biste videli sve pse dostupne za udomljavanje.",
    dog_login_btn: "Prijavi se",
    see_all_btn: "Vidi sve pse",
    stat1: "Spasenih pasa",
    stat2: "Srecnih domova",
    stat3: "Godina iskustva",
    stat4: "Dostupni smo",
    cta_title: "Zeli da pomognes?",
    cta_text: "Postani volonter, donator ili jednostavno udomitelj. Svaki korak racuna.",
    cta_btn: "Kontaktiraj nas",
    footer_desc: "Azil za pse u Novom Pazaru. Spašavamo, negujemo i udomljavamo pse od 2016. godine.",
    footer_nav: "Navigacija",
    footer_contact: "Kontakt",
    footer_hours: "Radno vreme",
    hours1: "Pon - Pet: 08:00 - 18:00",
    hours2: "Sub: 09:00 - 15:00",
    hours3: "Ned: Zatvoreno",
    footer_copy: "2026 Pawtners. Sva prava zadržana."
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_adopt: "Adopt",
    nav_contact: "Contact",
    nav_login: "Login",
    hero_eyebrow: "Dog Shelter - Novi Pazar",
    hero_title: "Every dog deserves a home full of love",
    hero_desc: "Pawtners is a place of hope. Help us find a warm home for every dog waiting for their person.",
    hero_cta_adopt: "Find a dog",
    hero_cta_about: "Learn more",
    stat_dogs: "dogs rescued",
    stat_years: "years of work",
    stat_homes: "happy homes",
    mission1_title: "Rescue",
    mission1_text: "We take in abandoned dogs from the streets and give them safety.",
    mission2_title: "Adoption",
    mission2_text: "We match dogs with families who will love them forever.",
    mission3_title: "Care",
    mission3_text: "Veterinary care and socialization until they find a home.",
    featured_eyebrow: "Waiting for you",
    featured_title: "Dogs looking for a home",
    featured_subtitle: "Log in and meet all our residents. Maybe one of them is your destiny.",
    dog_placeholder: "Log in to see the dogs",
    dog_placeholder_text: "Log in to your account to see all dogs available for adoption.",
    dog_login_btn: "Log in",
    see_all_btn: "See all dogs",
    stat1: "Dogs rescued",
    stat2: "Happy homes",
    stat3: "Years of experience",
    stat4: "Available",
    cta_title: "Want to help?",
    cta_text: "Become a volunteer, donor, or simply an adopter. Every step counts.",
    cta_btn: "Contact us",
    footer_desc: "Dog shelter in Novi Pazar. We rescue, care for and rehome dogs since 2016.",
    footer_nav: "Navigation",
    footer_contact: "Contact",
    footer_hours: "Working hours",
    hours1: "Mon - Fri: 08:00 - 18:00",
    hours2: "Sat: 09:00 - 15:00",
    hours3: "Sun: Closed",
    footer_copy: "2024 Pawtners. All rights reserved."
  }
};

let currentLang = localStorage.getItem('pawtners_lang') || 'sr';

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.getElementById('langBtn').textContent = lang === 'sr' ? 'EN' : 'SR';
  currentLang = lang;
  localStorage.setItem('pawtners_lang', lang);
}

function toggleLang() {
  const newLang = currentLang === 'sr' ? 'en' : 'sr';
  applyTranslations(newLang);
}

// === NAVBAR SCROLL ===
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// === COUNTER ANIMATION ===
function animateCounters() {
  const counters = document.querySelectorAll('.big-stat');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// === INTERSECTION OBSERVER FOR COUNTERS ===
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
});