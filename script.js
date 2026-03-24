// Yıldız Arkaplanı
function createStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 50 + 50) + 's';
        container.appendChild(star);
    }
}
createStars();

// Ekranlar Arası Geçiş
function showLogin() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
}

function showRegister() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('auth-section').classList.remove('hidden');
}

// KAYIT OLMA (Register)
function register() {
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const lic = document.getElementById('reg-license').value;

    if (lic === "KAAN-2026") {
        const userData = { user: user, pass: pass };
        // Veriyi tarayıcı hafızasına kaydet [cite: 2026-02-02]
        localStorage.setItem('userData', JSON.stringify(userData)); 
        alert("Success! Now you can Login.");
        showLogin();
    } else {
        alert("Invalid License Key!");
    }
}

// GİRİŞ YAPMA (Login)
function login() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    
    // Hafızadaki veriyi çek [cite: 2026-02-02]
    const savedData = JSON.parse(localStorage.getItem('userData'));

    if (savedData && savedData.user === user && savedData.pass === pass) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        startCountdown();
    } else {
        alert("User not found or wrong password! Register first.");
    }
}

// 10 Saniye Sayacı ve Drive Linki
function startCountdown() {
    let timeLeft = 10;
    const timerElement = document.getElementById('timer');
    // BURAYA KENDİ DRIVE LİNKİNİ KOY
    const driveLink = "https://drive.google.com/file/d/1FxIcSETtW27kRZQuQZUL2iywD9oA1ehJ/view?usp=sharing"; 

    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.innerText = "READY";
            window.location.href = driveLink; 
        }
    }, 1000);
}