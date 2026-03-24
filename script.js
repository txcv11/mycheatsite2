// Yıldızları oluştur
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

// Kayıt ve Login [cite: 2026-02-02]
function register() {
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const lic = document.getElementById('reg-license').value;

    if (lic === "KAAN-2026") {
        const userData = { user, pass };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert("Registration Successful!");
        location.reload();
    } else {
        alert("Invalid License!");
    }
}

function login() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const savedData = JSON.parse(localStorage.getItem('userData'));

    if (savedData && savedData.user === user && savedData.pass === pass) {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        startCountdown();
    } else {
        alert("Wrong Username or Password!");
    }
}

// 10 Saniye Sayacı ve Drive İndirmesi
function startCountdown() {
    let timeLeft = 10;
    const timerElement = document.getElementById('timer');
    const driveLink = "https://drive.google.com/file/d/1FxIcSETtW27kRZQuQZUL2iywD9oA1ehJ/view?usp=sharing"; // Örn: https://drive.google.com/uc?export=download&id=...

    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.innerText = "READY";
            document.getElementById('download-status').innerText = "Starting Download...";
            
            // Drive linkini tetikle
            window.location.href = driveLink; 
        }
    }, 1000);
}