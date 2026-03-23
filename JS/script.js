// 1. Back to Top Button Logic
let mybutton = document.getElementById("backToTop");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Form Submission (AJAX Redirect)
// Wannan bangaren zai tura form din zuwa Formspree ba tare da an ga shafin su ba
const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Tsayar da form din daga yin refresh

        const data = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Idan komai ya tafi daidai, kai tsaye zai kai mutum shafin godiya
                window.location.href = "thanks.html";
            } else {
                alert("Akwai matsala wajen tura sakonku. Allah Ya sa ba network ba ne, sake gwadawa.");
            }
        } catch (error) {
            alert("An samu kuskure. Tabbatar kana da internet.");
        }
    });
}
// Preloader Logic
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        // Muna dan jinkiri na rabin dakika don ya nuna kyan sa
        setTimeout(function() {
            preloader.classList.add("loader-hidden");
        }, 500);
    }
});