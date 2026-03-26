/* =========================================
   MIQRA SCHOOL - MAIN JAVASCRIPT
   ========================================= */

// 1. Back to Top Button Logic
let mybutton = document.getElementById("backToTop");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (mybutton) {
        // Zai fito ne kawai idan mutum ya gangara kasa da pixel 300
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.style.display = "flex"; 
        } else {
            mybutton.style.display = "none";
        }
    }
}

// Function din da zai mayar da mutum sama a hankali
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Wannan ne yake sa tafiyar ta zama a hankali
    });
}


// 2. Form Submission (AJAX Redirect don Contact & Admission)
// Wannan zai tura sako zuwa Formspree ba tare da an bar shafinka ba
const contactForm = document.querySelector('form[action*="formspree"]');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Nuna wa mai amfani cewa sako yana kan hanya
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
                // Nasara! Kai mutum shafin godiya
                window.location.href = "thanks.html";
            } else {
                alert("Akwai matsala wajen tura sakonku. Sake gwadawa nan gaba.");
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


// 3. Preloader Logic
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 600);
    }
});


// 4. Authentication & User Session Logic
document.addEventListener("DOMContentLoaded", function() {
    const greetingElement = document.getElementById("userGreeting");
    const currentUser = localStorage.getItem('currentUser');
    
    // Neman buttons na Login da Signup
    const loginBtn = document.querySelector('a[href="login.html"]');
    const signupBtn = document.querySelector('a[href="signup.html"]');

    if (currentUser) {
        // 1. Nuna gaisuwa idan akwai inda aka tanada a HTML
        if (greetingElement) {
            greetingElement.innerHTML = `<i class="fas fa-user-circle me-1 text-warning"></i> Sannu, ${currentUser}`;
            greetingElement.parentElement.classList.remove('d-none');
        }

        // 2. Canja Login Button ya koma 'Logout'
        if (loginBtn) {
            loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Fita';
            loginBtn.classList.replace('btn-outline-warning', 'btn-outline-danger');
            loginBtn.setAttribute("href", "#");
            
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if(confirm("Shin kana son fita daga account dinka?")) {
                    localStorage.removeItem('currentUser');
                    window.location.href = "index.html"; 
                }
            });
        }

        // 3. Boye Signup Button tunda mutum ya riga ya shigo
        if (signupBtn) {
            signupBtn.style.display = "none";
        }
    }
});