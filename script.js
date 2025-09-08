// ==========================
// --- Day/Night Mode Toggle ---
// ==========================
const toggleModeBtn = document.getElementById('toggleMode');
const body = document.body;

const toggleMode = () => {
  body.classList.toggle('night-mode');
  body.classList.toggle('day-mode');
  toggleModeBtn.textContent = body.classList.contains('night-mode')
    ? '☀️ Day Mode'
    : '🌙 Night Mode';
};

toggleModeBtn?.addEventListener('click', toggleMode);

// ==========================
// --- Local Storage & Users ---
// ==========================
let users = JSON.parse(localStorage.getItem('users')) || {};

// ==========================
// --- Auth Page Functions ---
// ==========================
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const signupMessage = document.getElementById('signupMessage');
const loginMessage = document.getElementById('loginMessage');

// Utility to show messages
const showMessage = (element, text, type) => {
  if (!element) return;
  element.textContent = text;
  element.className = type === 'success' ? 'success-message' : 'error-message';
};

// Switch between login/signup forms
document.getElementById('switchToLogin')?.addEventListener('click', () => {
  document.getElementById('signupForm')?.classList.remove('active');
  document.getElementById('loginForm')?.classList.add('active');
});

document.getElementById('switchToSignup')?.addEventListener('click', () => {
  document.getElementById('loginForm')?.classList.remove('active');
  document.getElementById('signupForm')?.classList.add('active');
});

// Signup
signupBtn?.addEventListener('click', () => {
  const username = document.getElementById('signupUsername')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const password = document.getElementById('signupPassword')?.value;

  if (!username || !email || !password) {
    showMessage(signupMessage, "⚠️ Please fill all fields.", "error");
    return;
  }

  if (users[username]) {
    showMessage(signupMessage, "⚠️ User already exists. Please login.", "error");
    return;
  }

  users[username] = { email, password };
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', username);
  showMessage(signupMessage, "✅ Signup successful! Redirecting...", "success");

  setTimeout(() => (window.location.href = "home.html"), 1000);
});

// Login
loginBtn?.addEventListener('click', () => {
  const username = document.getElementById('loginUsername')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;

  if (!username || !password) {
    showMessage(loginMessage, "⚠️ Please enter username and password.", "error");
    return;
  }

  if (users[username]?.password === password) {
    localStorage.setItem('currentUser', username);
    showMessage(loginMessage, "✅ Login successful! Redirecting...", "success");
    setTimeout(() => (window.location.href = "home.html"), 1000);
  } else {
    showMessage(loginMessage, "❌ Invalid credentials.", "error");
  }
});

// ==========================
// --- Home Page Logic ---
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');

  // Redirect to login if not logged in
  if (document.title.includes("Home") && !currentUser) {
    alert("Please login first!");
    window.location.href = "index.html";
  }

  // Display greeting above buttons
  const greetingEl = document.getElementById('greeting');
  if (greetingEl && currentUser) {
    greetingEl.textContent = `Hello, ${currentUser}!`;
  }

  // Logout button
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
  });

  // ==========================
  // --- Search Functionality ---
  // ==========================
  const searchBtn = document.getElementById('searchBtn');
  const searchBar = document.getElementById('searchBar');
  const result = document.getElementById('result');

  const showSearchResult = (text) => {
    if (!result) return;
    result.textContent = text;
    result.classList.remove('show');
    setTimeout(() => result.classList.add('show'), 50);
  };

  searchBtn?.addEventListener('click', () => {
    const news = searchBar?.value.trim();
    if (!news) {
      alert('⚠️ Please enter news text!');
      return;
    }

    // Placeholder logic: 50% chance fake/real
    const isFake = Math.random() > 0.5;
    const message = isFake
      ? '🚨 This news is likely Fake!'
      : '✅ This news seems Real!';

    showSearchResult(message);
  });
});
