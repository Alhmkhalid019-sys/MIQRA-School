/* =========================================
   MIQRA SCHOOL - ALL-IN-ONE MASTER SCRIPT
   ========================================= */

// 1. DARK MODE & UI LOGIC
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkIcon = document.getElementById('darkIcon');

    // Aikace-aikacen canza Icon
    function updateIcon(isDark) {
        if (!darkIcon) return;
        if (isDark) {
            darkIcon.classList.remove('fa-moon');
            darkIcon.classList.add('fa-sun');
        } else {
            darkIcon.classList.remove('fa-sun');
            darkIcon.classList.add('fa-moon');
        }
    }

    // Duba yanayin da aka adana (Theme Persistence)
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    // Toggle Dark Mode lokacin da aka danna
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    }

    // 2. AUTHENTICATION (Haɗe daga auth.js)
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const greetingElement = document.getElementById("userGreeting");
    const authSection = document.getElementById('authSection');
    const userSection = document.getElementById('userSection');
    const currentUser = localStorage.getItem('currentUser');

    // Duba idan mutum ya riga ya yi Login
    if (currentUser && greetingElement) {
        greetingElement.innerHTML = `<i class="fas fa-user-circle me-1 text-warning"></i> Sannu, ${currentUser}`;
        if (userSection) userSection.classList.remove('d-none');
        if (authSection) authSection.classList.add('d-none');
    }

    // Signup Logic
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let name = document.getElementById('fullName').value;
            let contact = document.getElementById('userContact').value;
            let pass = document.getElementById('userPass').value;

            let users = JSON.parse(localStorage.getItem('miqraUsers')) || [];
            if (users.some(u => u.contact === contact)) {
                alert("Wannan bayanan riga an yi rajista! Da fatan za a yi Login.");
                window.location.href = "login.html";
                return;
            }

            users.push({ name, contact, pass });
            localStorage.setItem('miqraUsers', JSON.stringify(users));
            alert("Masha Allah " + name + ", Rajista ya yi nasara!");
            window.location.href = "login.html";
        });
    }

    // Login Logic
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let userInp = document.getElementById('loginUser').value;
            let passInp = document.getElementById('loginPass').value;

            let users = JSON.parse(localStorage.getItem('miqraUsers')) || [];
            let authenticatedUser = users.find(u => u.contact === userInp && u.pass === passInp);

            if (authenticatedUser) {
                localStorage.setItem('currentUser', authenticatedUser.name);
                alert("Barka da shigowa, " + authenticatedUser.name + "!");
                window.location.href = "index.html"; 
            } else {
                alert("Kuskure! Email/Lamba ko Password bai yi daidai ba.");
            }
        });
    }

    // 3. PRIVACY MODAL LOGIC
    const privacyModalEl = document.getElementById('privacyModal');
    if (privacyModalEl) {
        const privacyLinks = document.querySelectorAll('[data-bs-target="#privacyModal"]');
        privacyLinks.forEach(link => {
            link.addEventListener('click', () => console.log("Modal opening..."));
        });
    }
});

// 4. BACK TO TOP BUTTON
let mybutton = document.getElementById("backToTop");
window.onscroll = function() {
    if (mybutton) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.style.display = "flex"; 
        } else {
            mybutton.style.display = "none";
        }
    }
};

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. PRELOADER LOGIC
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            setTimeout(() => { preloader.style.display = "none"; }, 500);
        }, 600);
    }
});

// 6. FORM SUBMISSION (Formspree)
const contactForm = document.querySelector('form[action*="formspree"]');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Ana turawa...';
        const data = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                window.location.href = "thanks.html";
            } else {
                alert("Akwai matsala. Sake gwadawa.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        } catch (error) {
            alert("An samu kuskure. Tabbatar kana da internet.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}