function showWelcomePopup() {
    let userName = '';
    while (userName === null || userName.trim() === '') {
        userName = prompt("Halo! Silakan masukkan nama Anda (wajib diisi):");
        if (userName === null) {
            userName = '';
        }
    }
    document.getElementById("userNameDisplay").textContent = userName;
}

window.onload = showWelcomePopup;

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 150) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function getCurrentDate() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
}

function createMessageItem(name, email, message, date) {
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';

    messageItem.innerHTML = `
        <div class="message-header">
            <p class="preview-name">${name}</p>
            <p class="preview-email">${email}</p>
        </div>
        <p class="preview-message">${message}</p>
        <span class="preview-date">${date}</span>
    `;

    return messageItem;
}

function addMessageToPreview(name, email, message) {
    const messagePreview = document.getElementById('message-preview');
    const currentDate = getCurrentDate();

    const newMessageItem = createMessageItem(name, email, message, currentDate);

    messagePreview.insertBefore(newMessageItem, messagePreview.firstChild);

    const messageItems = messagePreview.querySelectorAll('.message-item');
    if (messageItems.length > 5) {
        messageItems[messageItems.length - 1].remove();
    }
}

document.getElementById('message-preview').textContent = '';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('message-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message-input').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }

        addMessageToPreview(name, email, message);

        alert('Message sent successfully!');

        form.reset();

        document.getElementById('name').focus();
    });
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

document.addEventListener('click', (event) => {
    const isClickInsideHamburger = hamburger.contains(event.target);
    const isClickInsideNavMenu = navMenu.contains(event.target);

    if (!isClickInsideHamburger && !isClickInsideNavMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});