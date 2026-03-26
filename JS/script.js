/* =========================================
   MIQRA SCHOOL - MAIN JAVASCRIPT (FIXED)
   ========================================= */

// 1. Dark Mode Logic (Ingantacce)
document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // A ringa amfani da wannan aikin domin canza icon
    function updateIcon(isDark) {
        if (!darkModeToggle) return;
        if (isDark) {
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
        } else {
            darkModeToggle.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Duba yanayin da ake ciki
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    }
});

// 2. Back to Top Button Logic
let mybutton = document.getElementById("backToTop");
window.onscroll = function() { scrollFunction(); };

function scrollFunction() {
    if (mybutton) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.style.display = "flex"; 
        } else {
            mybutton.style.display = "none";
        }
    }
}

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Form Submission (Contact & Admission)
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

// 4. Preloader Logic
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

// 5. Authentication Logic
document.addEventListener("DOMContentLoaded", function() {
    const greetingElement = document.getElementById("userGreeting");
    const currentUser = localStorage.getItem('currentUser');
    const authSection = document.getElementById('authSection');
    const userSection = document.getElementById('userSection');

    if (currentUser) {
        if (greetingElement) {
            greetingElement.innerHTML = `<i class="fas fa-user-circle me-1 text-warning"></i> Sannu, ${currentUser}`;
            if (userSection) userSection.classList.remove('d-none');
            if (authSection) authSection.classList.add('d-none');
        }
    }
});

// 6. Gyaran Privacy Policy Modal (Don hana shafin daskarewa)
document.addEventListener("DOMContentLoaded", function() {
    const privacyModalEl = document.getElementById('privacyModal');
    if (privacyModalEl) {
        // Muna amfani da Bootstrap data-attributes ne kawai don tsaro
        // Idan kana son amfani da JS, kar ka sake kiran 'new bootstrap.Modal' a cikin click event
        const privacyLinks = document.querySelectorAll('[data-bs-target="#privacyModal"]');
        privacyLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Bari Bootstrap ta sarrafa kanta ta hanyar HTML attributes
                console.log("Modal is opening...");
            });
        });
    }
});