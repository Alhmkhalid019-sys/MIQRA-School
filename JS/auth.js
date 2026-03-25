// Wannan shi ne Algorithm din da zai adana bayanan rajista
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('fullName').value;
    let contact = document.getElementById('userContact').value;
    let pass = document.getElementById('userPass').value;

    // Adana bayanan a LocalStorage (Browser za ta rike su)
    localStorage.setItem('savedUser', contact);
    localStorage.setItem('savedPass', pass);
    localStorage.setItem('savedName', name);

    alert("Masha Allah " + name + ", Rajista ya yi nasara! Yanzu zaka iya shiga.");
    window.location.href = "login.html"; // Zai kai ka shafin Login
});
// Algorithm na dubawa idan mutum zai yi Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    let user = document.getElementById('loginUser').value;
    let pass = document.getElementById('password').value;

    let storedUser = localStorage.getItem('savedUser');
    let storedPass = localStorage.getItem('savedPass');

    if (user === storedUser && pass === storedPass) {
        alert("Barka da shigowa MIQRA SCHOOL!");
        window.location.href = "index.html"; 
    } else {
        alert("Kuskure! Bayanan nan ba su dace da wanda aka yi rajista da su ba.");
    }
});