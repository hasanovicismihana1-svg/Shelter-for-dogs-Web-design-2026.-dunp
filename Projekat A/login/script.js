// === I18N DICTIONARY ===
const translations = {
  sr: {
    nav_home: "Početna", nav_about: "O nama", nav_adopt: "Udomljavanje", nav_contact: "Kontakt", nav_login: "Prijava",
    login_eyebrow: "Dobrodošli nazad",
    login_title: "Prijavite se na nalog",
    login_subtitle: "Unesite svoje podatke da biste pristupili spisku pasa za udomljavanje.",
    label_username: "Korisnicko ime",
    label_password: "Lozinka",
    hint_username: "Unesite korisničko ime vaseg naloga.",
    hint_password: "Unesite lozinku vašeg naloga.",
    remember_me: "Zapamti me",
    btn_login: "Prijavi se",
    login_error: "Pogrešno korisnicko ime ili lozinka.",
    demo_title: "Demo nalog za testiranje",
    demo_user_label: "Korisnicko ime:",
    demo_pass_label: "Lozinka:",
    footer_desc: "Azil za pse u Novom Pazaru. Spasavamo, negujemo i udomljavamo pse od 2016. godine.",
    footer_nav: "Navigacija", footer_contact: "Kontakt", footer_hours: "Radno vreme",
    hours1: "Pon - Pet: 08:00 - 18:00", hours2: "Sub: 09:00 - 15:00", hours3: "Ned: Zatvoreno",
    footer_copy: "2024 Pawtners. Sva prava zadrzana."
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_adopt: "Adopt", nav_contact: "Contact", nav_login: "Login",
    login_eyebrow: "Welcome back",
    login_title: "Sign in to your account",
    login_subtitle: "Enter your details to access the list of dogs available for adoption.",
    label_username: "Username",
    label_password: "Password",
    hint_username: "Enter the username for your account.",
    hint_password: "Enter the password for your account.",
    remember_me: "Remember me",
    btn_login: "Sign in",
    login_error: "Incorrect username or password.",
    demo_title: "Demo account for testing",
    demo_user_label: "Username:",
    demo_pass_label: "Password:",
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

// === HINT SHOW/HIDE ON FOCUS ===
function setupFieldHints(fieldId) {
  const field = document.getElementById(fieldId);
  const hint = document.getElementById('hint-' + fieldId);

  field.addEventListener('focus', () => hint.classList.add('visible'));
  field.addEventListener('blur', () => hint.classList.remove('visible'));
  field.addEventListener('input', () => {
    field.classList.remove('is-error');
    document.getElementById('loginError').classList.remove('visible');
  });
}

// === SHA-256 HASHING (pure JavaScript, no external libraries) ===
function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let i, j;
  let result = '';

  let words = [];
  const asciiBitLength = ascii.length * 8;

  let hash = (sha256.h = sha256.h || []);
  let k = (sha256.k = sha256.k || []);
  let primeCounter = k.length;

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii.length % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii.length; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];

      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);

      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

// === MOCK USER "DATABASE" ===
// Passwords are never stored in plain text - only as SHA-256 hashes.
// Demo account -> username: marko / password: pawtners123
const mockUsers = [
  {
    username: "ismi",
    name: "ismi",
    passwordHash: "aaf01c5b327fddf868c39eea363827903a4d0b8a2273d9e3bdfe9ab02279e07d"
  }
];

// === LOGIN HANDLING ===
function handleLogin(event) {
  event.preventDefault();

  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  const rememberMe = document.getElementById('rememberMe').checked;
  const loginError = document.getElementById('loginError');
  const loginBtn = document.getElementById('loginBtn');

  const username = usernameField.value.trim();
  const password = passwordField.value;

  loginError.classList.remove('visible');
  usernameField.classList.remove('is-error');
  passwordField.classList.remove('is-error');

  if (!username || !password) {
    if (!username) usernameField.classList.add('is-error');
    if (!password) passwordField.classList.add('is-error');
    loginError.classList.add('visible');
    return;
  }

  loginBtn.disabled = true;

  const hashedInput = sha256(password);
  const user = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (user && user.passwordHash === hashedInput) {
    const sessionData = JSON.stringify({
      username: user.username,
      name: user.name,
      loggedInAt: Date.now()
    });

    if (rememberMe) {
      localStorage.setItem('pawtners_user', sessionData);
    } else {
      sessionStorage.setItem('pawtners_user', sessionData);
    }

    window.location.href = '../adopt/adopt.html';
  } else {
    usernameField.classList.add('is-error');
    passwordField.classList.add('is-error');
    loginError.classList.add('visible');
    loginBtn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);

  ['username', 'password'].forEach(setupFieldHints);
  document.getElementById('loginForm').addEventListener('submit', handleLogin);

  // If user is already logged in, send them straight to the adoption page
  if (sessionStorage.getItem('pawtners_user') || localStorage.getItem('pawtners_user')) {
    window.location.href = '../adopt/adopt.html';
  }
});