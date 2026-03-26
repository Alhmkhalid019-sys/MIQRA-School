// --- 1. SASHE NA RAJISTA (SIGNUP) ---
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('fullName').value;
    let contact = document.getElementById('userContact').value;
    let pass = document.getElementById('userPass').value;

    // Ɗauko tsofaffin ma'aikata/ɗalibai idan akwai, ko kuma samar da sabon jeri (Array)
    let users = JSON.parse(localStorage.getItem('miqraUsers')) || [];

    // Dubawa ko riga an yi rajista da wannan Email/Number ɗin
    let userExists = users.some(u => u.contact === contact);

    if (userExists) {
        alert("Wannan bayanan riga an yi rajista da su! Da fatan za a yi Login.");
        window.location.href = "login.html";
        return;
    }

    // Adana sabon mai amfani a cikin jerinmu
    users.push({
        name: name,
        contact: contact,
        pass: pass
    });

    // Mayar da jerin zuwa LocalStorage
    localStorage.setItem('miqraUsers', JSON.stringify(users));

    alert("Masha Allah " + name + ", Rajista ya yi nasara! Yanzu za ka iya shiga.");
    window.location.href = "login.html";
});


// --- 2. SASHE NA SHIGA (LOGIN) ---
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    let userInp = document.getElementById('loginUser').value;
    let passInp = document.getElementById('loginPass').value; // Na gyara wannan ID din ya dace da HTML dinka

    // Ɗauko jerin dukkan wadanda suka yi rajista
    let users = JSON.parse(localStorage.getItem('miqraUsers')) || [];

    // Neman wanda bayanan sa suka dace (Contact da Password)
    let authenticatedUser = users.find(u => u.contact === userInp && u.pass === passInp);

    if (authenticatedUser) {
        // Adana sunan wanda ya shiga (Session) don gaishe shi a Home Page
        localStorage.setItem('currentUser', authenticatedUser.name);
        
        alert("Barka da shigowa MIQRA SCHOOL, " + authenticatedUser.name + "!");
        window.location.href = "index.html"; 
    } else {
        alert("Kuskure! Email/Lamba ko Password bai yi daidai ba.");
    }
});