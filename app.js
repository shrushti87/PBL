// app.js

// DOM Elements
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const passwordManagerContainer = document.getElementById('password-manager-container');
const passwordList = document.getElementById('password-list');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const passwordForm = document.getElementById('password-form');
const logoutBtn = document.getElementById('logout-btn');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

// Event Listeners
loginForm.addEventListener('submit', loginUser);
registerForm.addEventListener('submit', registerUser);
passwordForm.addEventListener('submit', savePassword);
logoutBtn.addEventListener('click', logout);

// Show register page
registerLink.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

// Show login page
loginLink.addEventListener('click', () => {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

// Initialize the app
function init() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        passwordManagerContainer.style.display = 'block';
        loadSavedPasswords();
    } else {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        passwordManagerContainer.style.display = 'none';
    }
}

function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
        localStorage.setItem('loggedInUser', username);
        init();
    } else {
        alert('Invalid credentials');
    }
}

function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser) {
        alert('User already exists');
    } else {
        localStorage.setItem(username, JSON.stringify({ username, password }));
        alert('User registered successfully!');
        loginLink.click(); // Automatically show the login page
    }
}

function savePassword(event) {
    event.preventDefault();
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loggedInUser = localStorage.getItem('loggedInUser');
    let userPasswords = JSON.parse(localStorage.getItem(loggedInUser + '-passwords')) || [];

    userPasswords.push({ website, username, password });
    localStorage.setItem(loggedInUser + '-passwords', JSON.stringify(userPasswords));

    loadSavedPasswords();
}

function loadSavedPasswords() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userPasswords = JSON.parse(localStorage.getItem(loggedInUser + '-passwords')) || [];

    passwordList.innerHTML = '';
    userPasswords.forEach((entry) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>Website:</strong> ${entry.website}</p>
            <p><strong>Username:</strong> ${entry.username}</p>
            <p><strong>Password:</strong> ${entry.password}</p>
            <hr />
        `;
        passwordList.appendChild(div);
    });
}

function logout() {
    localStorage.removeItem('loggedInUser');
    init();
}

// Initialize the page on load
window.onload = init;
