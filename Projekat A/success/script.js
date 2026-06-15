// === I18N DICTIONARY ===
const translations = {
  sr: {
    nav_home: "Početna", nav_about: "O nama", nav_adopt: "Udomljavanje", nav_contact: "Kontakt", nav_login: "Prijava",
    success_eyebrow: "Poruka poslata",
    success_title: "Hvala vam na poruci!",
    success_text: "Vaša poruka je uspesno primljena. Naš tim ce vam odgovoriti u najkraćem mogućem roku. U roku od 24 sata radnim danima.",
    success_home_btn: "Vrati se na početnu",
    success_adopt_btn: "Udomi psa",
    footer_desc: "Azil za pse u Novom Pazaru. Spašavamo, negujemo i udomljavamo pse od 2016. godine.",
    footer_nav: "Navigacija", footer_contact: "Kontakt", footer_hours: "Radno vreme",
    hours1: "Pon - Pet: 08:00 - 18:00", hours2: "Sub: 09:00 - 15:00", hours3: "Ned: Zatvoreno",
    footer_copy: "2026 Pawtners. Sva prava zadržana."
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_adopt: "Adopt", nav_contact: "Contact", nav_login: "Login",
    success_eyebrow: "Message sent",
    success_title: "Thank you for your message!",
    success_text: "Your message has been received successfully. Our team will get back to you as soon as possible, usually within 24 hours on working days.",
    success_home_btn: "Back to home",
    success_adopt_btn: "Adopt a dog",
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
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
});

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
});