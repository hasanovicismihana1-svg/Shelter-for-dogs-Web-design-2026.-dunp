const translations = {
  sr: {
    nav_home: "Početna", nav_about: "O nama", nav_adopt: "Udomljavanje", nav_contact: "Kontakt", nav_login: "Prijava",
    contact_eyebrow: "Budimo u kontaktu",
    contact_title: "Kontaktirajte nas",
    contact_subtitle: "Imate pitanje, želite da volontirate ili ste zainteresovani za udomljavanje? ",
    info_title: "Informacije",
    info_address_label: "Adresa",
    info_phone_label: "Telefon",
    info_email_label: "Email",
    info_hours_label: "Radno vreme",
    info_hours_val: "Pon-Pet 08-18, Sub 09-15",
    form_title: "Pošaljite nam poruku",
    form_subtitle: "Odgovaramo u roku od 24 sata radnim danima.",
    label_ime: "Ime",
    label_prezime: "Prezime",
    label_email: "Email adresa",
    label_poruka: "Poruka",
    hint_ime: "Unesite vaše ime (najmanje 2 karaktera, samo slova).",
    hint_prezime: "Unesite vaše prezime (najmanje 2 karaktera, samo slova).",
    hint_email: "Unesite ispravnu email adresu (primer: ime@domen.com).",
    hint_poruka: "Unesite poruku (najmanje 10 karaktera).",
    err_general: "Podatak nije ispravno unet.",
    btn_send: "Pošalji poruku",
    footer_desc: "Azil za pse u Novom Pazaru. Spašavamo, negujemo i udomljavamo pse od 2016. godine.",
    footer_nav: "Navigacija", footer_contact_h: "Kontakt", footer_hours: "Radno vreme",
    hours1: "Pon - Pet: 08:00 - 18:00", hours2: "Sub: 09:00 - 15:00", hours3: "Ned: Zatvoreno",
    footer_copy: "2024 Pawtners. Sva prava zadrzana."
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_adopt: "Adopt", nav_contact: "Contact", nav_login: "Login",
    contact_eyebrow: "Get in touch",
    contact_title: "Contact us",
    contact_subtitle: "Have a question, want to volunteer, or interested in adoption? Write to us.",
    info_title: "Information",
    info_address_label: "Address",
    info_phone_label: "Phone",
    info_email_label: "Email",
    info_hours_label: "Working hours",
    info_hours_val: "Mon-Fri 08-18, Sat 09-15",
    form_title: "Send us a message",
    form_subtitle: "We respond within 24 hours on working days.",
    label_ime: "First name",
    label_prezime: "Last name",
    label_email: "Email address",
    label_poruka: "Message",
    hint_ime: "Enter your first name (at least 2 characters, letters only).",
    hint_prezime: "Enter your last name (at least 2 characters, letters only).",
    hint_email: "Enter a valid email address (example: name@domain.com).",
    hint_poruka: "Enter your message (at least 10 characters).",
    err_general: "This field is not filled in correctly.",
    btn_send: "Send message",
    footer_desc: "Dog shelter in Novi Pazar. We rescue, care for and rehome dogs since 2016.",
    footer_nav: "Navigation", footer_contact_h: "Contact", footer_hours: "Working hours",
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

// === VALIDATION ===
const validators = {
  firstName: v => /^[A-Za-zÀ-ÖØ-öø-ÿA-Za-z\u0400-\u04FF]{2,}$/.test(v.trim()),
  lastName: v => /^[A-Za-zÀ-ÖØ-öø-ÿA-Za-z\u0400-\u04FF]{2,}$/.test(v.trim()),
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  message: v => v.trim().length >= 10
};

function showHint(fieldId) {
  document.getElementById('hint-' + fieldId).classList.add('visible');
}

function hideHint(fieldId) {
  document.getElementById('hint-' + fieldId).classList.remove('visible');
}

function showError(fieldId) {
  document.getElementById('err-' + fieldId).classList.add('visible');
  const field = document.getElementById(fieldId);
  field.classList.add('is-error');
  field.classList.remove('is-valid');
}

function hideError(fieldId) {
  document.getElementById('err-' + fieldId).classList.remove('visible');
}

function markValid(fieldId) {
  const field = document.getElementById(fieldId);
  field.classList.remove('is-error');
  field.classList.add('is-valid');
  hideError(fieldId);
}

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const value = field.value;
  if (!validators[fieldId](value)) {
    showError(fieldId);
    return false;
  } else {
    markValid(fieldId);
    return true;
  }
}

function setupFieldListeners(fieldId) {
  const field = document.getElementById(fieldId);

  field.addEventListener('focus', () => {
    showHint(fieldId);
  });

  field.addEventListener('blur', () => {
    hideHint(fieldId);
    if (field.value.length > 0) validateField(fieldId);
  });

  field.addEventListener('input', () => {
    if (field.classList.contains('is-error') || field.classList.contains('is-valid')) {
      validateField(fieldId);
    }
  });
}

function submitForm() {
  const fields = ['firstName', 'lastName', 'email', 'message'];
  let allValid = true;

  fields.forEach(id => {
    const isValid = validateField(id);
    if (!isValid) allValid = false;
  });

  if (allValid) {
    window.location.href = '../success.html';
  } else {
    const firstError = document.querySelector('.form-field.is-error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  ['firstName', 'lastName', 'email', 'message'].forEach(setupFieldListeners);
});