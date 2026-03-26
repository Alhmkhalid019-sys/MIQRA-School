/* =========================================
   MIQRA SCHOOL - AUTH & SESSION LOGIC
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Tabbatar Dark Mode yana aiki a kowane shafi
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    }

    // 2. Duba Session (In mutum ya yi login)
    const currentUser = localStorage.getItem('currentUser');
    const authSection = document.getElementById('authSection');
    const userSection = document.getElementById('userSection');
    const userGreeting = document.getElementById('userGreeting');

    if (currentUser && userGreeting) {
        if (authSection) authSection.classList.add('d-none');
        if (userSection) {
            userSection.classList.remove('d-none');
            userGreeting.innerHTML = `<i class="fas fa-user-circle me-1 text-warning"></i> Sannu, ${currentUser}`;
        }
    }

    // --- 3. SIGNUP LOGIC ---
    const signupForm = document.getElementById('signupForm');
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

    // --- 4. LOGIN LOGIC ---
    const loginForm = document.getElementById('loginForm');
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
});