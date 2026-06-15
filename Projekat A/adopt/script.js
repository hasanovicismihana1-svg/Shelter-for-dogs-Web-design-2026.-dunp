const translations = {
  sr: {
    nav_home: "Početna", nav_about: "O nama", nav_adopt: "Udomljavanje", nav_contact: "Kontakt", nav_login: "Prijava",
    adopt_eyebrow: "Pronađi svog druga",
    adopt_title: "Psi dostupni za udomljavanje",
    adopt_subtitle: "Svaki pas ima svoju priču i ceka upravo tebe. Uloguj se i upoznaj nase stanare.",
    overlay_title: "Sadrzaj je zakljucan",
    overlay_text: "Morate biti ulogovani da biste videli pse dostupne za udomljavanje.",
    overlay_btn: "Prijavi se",
    search_placeholder: "Pretrazi po imenu...",
    filter_gender_all: "Svi polovi",
    filter_male: "Muški",
    filter_female: "Ženka",
    loading_text: "Ucitavamo pse...",
    no_results: "Nijedan pas ne odgovara pretrage.",
    error_text: "Doslo je do greske pri ucitavanju podataka.",
    retry_btn: "Pokusaj ponovo",
    adopt_btn: "Udomi",
    nav_logout: "Odjava",
    footer_desc: "Azil za pse u Novom Pazaru. Spasavamo, negujemo i udomljavamo pse od 2016. godine.",
    footer_nav: "Navigacija", footer_contact: "Kontakt", footer_hours: "Radno vreme",
    hours1: "Pon - Pet: 08:00 - 18:00", hours2: "Sub: 09:00 - 15:00", hours3: "Ned: Zatvoreno",
    footer_copy: "2026 Pawtners. Sva prava zadrzana."
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_adopt: "Adopt", nav_contact: "Contact", nav_login: "Login",
    adopt_eyebrow: "Find your companion",
    adopt_title: "Dogs available for adoption",
    adopt_subtitle: "Every dog has a story and is waiting for you. Log in and meet our residents.",
    overlay_title: "Content is locked",
    overlay_text: "You must be logged in to see the dogs available for adoption.",
    overlay_btn: "Log in",
    search_placeholder: "Search by name...",
    filter_gender_all: "All genders",
    filter_male: "Male",
    filter_female: "Female",
    loading_text: "Loading dogs...",
    no_results: "No dogs match your search.",
    error_text: "An error occurred while loading data.",
    retry_btn: "Try again",
    adopt_btn: "Adopt",
    nav_logout: "Log out",
    footer_desc: "Dog shelter in Novi Pazar. We rescue, care for and rehome dogs since 2016.",
    footer_nav: "Navigation", footer_contact: "Contact", footer_hours: "Working hours",
    hours1: "Mon - Fri: 08:00 - 18:00", hours2: "Sat: 09:00 - 15:00", hours3: "Sun: Closed",
    footer_copy: "2024 Pawtners. All rights reserved."
  }
};

let currentLang = localStorage.getItem('pawtners_lang') || 'sr';
let allDogs = [];

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = translations[lang].search_placeholder || '';
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

// === AUTH CHECK ===
function isLoggedIn() {
  return sessionStorage.getItem('pawtners_user') !== null || localStorage.getItem('pawtners_user') !== null;
}

function checkAuth() {
  const overlay = document.getElementById('auth-overlay');
  const container = document.getElementById('dogs-container');
  const controls = document.getElementById('dogsControls');
  const navAuthLink = document.getElementById('navAuthLink');

  if (isLoggedIn()) {
    overlay.classList.add('hidden');
    container.classList.remove('blurred');
    controls.classList.add('visible');

    if (navAuthLink) {
      navAuthLink.setAttribute('data-i18n', 'nav_logout');
      navAuthLink.textContent = currentLang === 'sr' ? 'Odjava' : 'Log out';
      navAuthLink.href = '#';
      navAuthLink.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('pawtners_user');
        localStorage.removeItem('pawtners_user');
        window.location.reload();
      });
    }

    loadDogs();
  } else {
    overlay.classList.remove('hidden');
    container.classList.add('blurred');
    controls.classList.remove('visible');

    document.getElementById('loadingState').style.display = 'none';

    // Show placeholder blur cards
    container.innerHTML = generatePlaceholderCards();
  }
}

function generatePlaceholderCards() {
  let html = '';
  for (let i = 0; i < 6; i++) {
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="dog-card">
          <div class="dog-card-img-placeholder"></div>
          <div class="dog-card-body">
            <div style="height:14px;background:#E2E8F0;border-radius:8px;margin-bottom:12px;width:40%"></div>
            <div style="height:22px;background:#E2E8F0;border-radius:8px;margin-bottom:10px;width:70%"></div>
            <div style="height:12px;background:#E2E8F0;border-radius:8px;margin-bottom:8px;width:90%"></div>
            <div style="height:12px;background:#E2E8F0;border-radius:8px;margin-bottom:8px;width:80%"></div>
          </div>
        </div>
      </div>`;
  }
  return html;
}

// === API FETCH ===
async function loadDogs() {
  const container = document.getElementById('dogs-container');
  const loadingState = document.getElementById('loadingState');
  const errorState = document.getElementById('errorState');
  const emptyState = document.getElementById('emptyState');

  container.innerHTML = '';
  loadingState.style.display = 'flex';
  errorState.style.display = 'none';
  emptyState.style.display = 'none';

  try {
    const response = await fetch('https://vebdizajn-4.onrender.com/api/vebdizajn/azil-za-pse');

    if (!response.ok) throw new Error('API error: ' + response.status);

    const data = await response.json();
    allDogs = Array.isArray(data) ? data : (data.dogs || data.data || []);

    loadingState.style.display = 'none';

    if (allDogs.length === 0) {
      emptyState.style.display = 'flex';
      return;
    }

    renderDogs(allDogs);
    setupSearch();

  } catch (error) {
    console.error('Error fetching dogs:', error);
    loadingState.style.display = 'none';
    errorState.style.display = 'flex';
  }
}

function getGenderLabel(gender, lang) {
  if (!gender) return '';
  const g = gender.toLowerCase();
  const isMale = g === 'm' || g === 'male' || g === 'muzjak' || g === 'muški' || g === 'muski';
  const isFemale = g === 'f' || g === 'female' || g === 'zenska' || g === 'ženka' || g === 'zenka';
  if (isMale) return lang === 'en' ? 'Male' : 'Muški';
  if (isFemale) return lang === 'en' ? 'Female' : 'Ženka';
  return gender;
}

function getGenderCategory(gender) {
  if (!gender) return '';
  const g = gender.toLowerCase();
  if (g === 'm' || g === 'male' || g === 'muzjak' || g === 'muški' || g === 'muski') return 'male';
  if (g === 'f' || g === 'female' || g === 'zenska' || g === 'ženka' || g === 'zenka') return 'female';
  return '';
}

function renderDogs(dogs) {
  const container = document.getElementById('dogs-container');
  const emptyState = document.getElementById('emptyState');

  if (dogs.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  container.innerHTML = dogs.map(dog => {
    const name = dog.name || dog.ime || dog.naziv || 'Nepoznato';
    const gender = dog.gender || dog.pol || '';
    const description = dog.description || dog.opis || dog.info || 'Druzeljubiv pas koji trazi topao dom.';
    const weight = dog.weight || dog.tezina || '';
    const imageUrl = dog.image || dog.slika || dog.foto || dog.imageUrl || '';
    const genderCategory = getGenderCategory(gender);
    const genderLabel = getGenderLabel(gender, currentLang);

    const weightLabel = weight ? `${weight} kg` : '';

    const genderIcon = genderCategory === 'male'
      ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="10" cy="14" r="6"/><line x1="22" y1="2" x2="15.4" y2="8.6"/><polyline points="16 2 22 2 22 8"/></svg>`
      : genderCategory === 'female'
      ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="9" r="6"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="9" y1="19" x2="15" y2="19"/></svg>`
      : '';

    const dogIdNum = dog.id || dog._id || '';
    const dogIdStr = dogIdNum ? `#${String(dogIdNum).padStart(3, '0')}` : '';
    const idBadgeParts = [dogIdStr, genderLabel].filter(Boolean);

    return `
      <div class="col-md-6 col-lg-4" data-name="${name.toLowerCase()}" data-gender="${genderCategory}">
        <div class="dog-card">
          ${imageUrl
            ? `<img src="${imageUrl}" alt="${name}" class="dog-card-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="dog-card-img-placeholder" style="display:none"><span style="font-size:2.5rem">&#128021;</span></div>`
            : `<div class="dog-card-img-placeholder"><span style="font-size:2.5rem">&#128021;</span></div>`
          }
          <div class="dog-card-body">
            <div class="dog-badge-row">
              ${idBadgeParts.length ? `<span class="dog-badge badge-id">${idBadgeParts.join(' · ')}</span>` : ''}
            </div>
            <h3 class="dog-name">${name}</h3>

            <div class="dog-meta-row">
              ${genderLabel ? `
                <div class="dog-meta-item dog-meta-gender dog-meta-gender--${genderCategory}">
                  ${genderIcon}
                  <span>${genderLabel}</span>
                </div>` : ''}
              ${weightLabel ? `
                <div class="dog-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  <span>${weightLabel}</span>
                </div>` : ''}
            </div>

            <p class="dog-description">${description}</p>
            <div class="dog-card-footer">
              <a href="../contact/contact.html" class="dog-adopt-btn" data-i18n="adopt_btn">${currentLang === 'en' ? 'Adopt' : 'Udomi'}</a>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const filterGender = document.getElementById('filterGender');

  function filterDogs() {
    const query = searchInput.value.toLowerCase().trim();
    const genderFilter = filterGender ? filterGender.value : '';

    const filtered = allDogs.filter(dog => {
      const name = (dog.name || dog.ime || dog.naziv || '').toLowerCase();
      const matchesSearch = !query || name.includes(query);

      const gender = dog.gender || dog.pol || '';
      const genderCategory = getGenderCategory(gender);
      const matchesGender = !genderFilter || genderCategory === genderFilter;

      return matchesSearch && matchesGender;
    });

    renderDogs(filtered);
  }

  searchInput.addEventListener('input', filterDogs);
  if (filterGender) filterGender.addEventListener('change', filterDogs);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  checkAuth();
});