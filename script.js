const DB = {
    en: {
        title: "Access Terminal", next: "Next", init: "Initialize", reg: "Sign Up",
        switchReg: "Need access? ", switchLog: "Existing user? ",
        welcome: "SYSTEM ACTIVE:", back: "Back to Categories", execute: "START DOWNLOAD", prep: "Preparing...",
        warn: "USER AGREEMENT: Requires handle64.exe in the same folder. User assumes all risks.",
        regSuccess: "IDENTITY VERIFIED. PLEASE LOGIN."
    },
    tr: {
        title: "Erişim Terminali", next: "İlerle", init: "Başlat", reg: "Kayıt Ol",
        switchReg: "Erişim yok mu? ", switchLog: "Kayıtlı mısın? ",
        welcome: "SİSTEM AKTİF:", back: "Kategorilere Dön", execute: "İNDİRMEYİ BAŞLAT", prep: "Hazırlanıyor...",
        warn: "KULLANICI SÖZLEŞMESİ: handle64.exe aynı klasörde olmalıdır. Tüm sorumluluk kullanıcıya aittir.",
        regSuccess: "KİMLİK DOĞRULANDI. LÜTFEN GİRİŞ YAPIN."
    }
};

const PRODUCTS = {
    'gt': [
        { id: 'sert', name: 'Growtopia Multitool', tag: 'UD', status: 'active', link: 'https://drive.usercontent.google.com/download?id=1FxIcSETtW27kRZQuQZUL2iywD9oA1ehJ&export=download&authuser=0', desc: 'Official tool developed by Team lu4dev. Allows multiple instances.' },
        { id: 'bothex_dll', name: 'Bothex DLL', tag: 'UD', status: 'active', link: 'https://drive.google.com/uc?export=download&id=1O0r1wPnWv4bIiCnHAu0M11P_gkHB8Ey8', desc: 'Advanced DLL for Growtopia automation.' },
        { id: 'bothex_launcher', name: 'Bothex Launcher', tag: 'UD', status: 'active', link: 'https://drive.google.com/uc?export=download&id=1XLzuEhk4COlFSVDlT5JBJ-Bxd61EpnT7', desc: 'Auto-update and launch system.' }
    ],
    'dr': [
        { id: 'radaxion', name: 'Radaxion Launcher', tag: 'UD', status: 'active', link: 'https://drive.google.com/uc?export=download&id=1wwwX87hI44b4iK5pgNWKWSF51dhy6C9G', desc: 'Special trainer for Dungeon Rampage. Features: Speed, Mana, Wallhack.' }
    ],
    'rbx': [ { id: 'spts', name: 'SPTS-CLASSIC', tag: 'LOCKED', status: 'detect', desc: 'Currently under maintenance.' } ],
    'wolfteam': [ { id: 'wt_off', name: 'Wolfteam Offline', tag: 'DETECT', status: 'detect', desc: 'Status: Detected. Do not use on main accounts.' } ],
    'fivem': [ { id: 'fm_global', name: 'Fivem Global', tag: 'DETECT', status: 'detect', desc: 'Global bypass testing phase.' } ],
    'rust': [ { id: 'rust_priv', name: 'Rust Private', tag: 'PRIVATE', status: 'detect', desc: 'Private build. Contact administrator.' } ]
};

let currentLink = "";
let lang = localStorage.getItem('site_lang') || 'en';
let currentAuthStep = 1;
let isRegisterMode = false;

function syncUI() {
    const t = DB[lang];
    document.getElementById('txt-main-title').innerText = isRegisterMode ? t.reg : t.title;
    document.getElementById('next-btn').innerHTML = (currentAuthStep === (isRegisterMode ? 3 : 2)) ? `<span>${t.init}</span> <i class="fas fa-check"></i>` : `<span>${t.next}</span> <i class="fas fa-chevron-right"></i>`;
    document.getElementById('auth-toggle-text').innerHTML = isRegisterMode ? `${t.switchLog} <span onclick="toggleMode()" class="link">Login</span>` : `${t.switchReg} <span onclick="toggleMode()" class="link">Sign Up</span>`;
    document.getElementById('txt-welcome').innerText = t.welcome;
    document.getElementById('dl-btn').innerText = t.execute;
    document.getElementById('txt-prep').innerText = t.prep;
}

function handleAuthStep() {
    const userWrap = document.getElementById('user-input').parentElement;
    const passWrap = document.getElementById('pass-input').parentElement;
    const licWrap = document.getElementById('lic-input').parentElement;

    const userVal = document.getElementById('user-input').value;
    const passVal = document.getElementById('pass-input').value;
    const licVal = document.getElementById('lic-input').value;

    if (currentAuthStep === 1 && userVal) {
        userWrap.classList.add('hidden');
        passWrap.classList.remove('hidden');
        document.getElementById('pass-input').focus();
        currentAuthStep = 2;
        syncUI();
    } else if (currentAuthStep === 2 && passVal) {
        if (isRegisterMode) {
            passWrap.classList.add('hidden');
            licWrap.classList.remove('hidden');
            document.getElementById('lic-input').focus();
            currentAuthStep = 3;
            syncUI();
        } else { attemptLogin(userVal, passVal); }
    } else if (currentAuthStep === 3 && licVal) { attemptRegister(userVal, passVal, licVal); }
}

function attemptLogin(user, pass) {
    const saved = JSON.parse(localStorage.getItem('core_user'));
    if (saved && saved.user === user && saved.pass === pass) {
        document.getElementById('auth-module').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('user-display').innerText = user.toUpperCase();
    } else { alert("ACCESS DENIED"); location.reload(); }
}

function attemptRegister(u, p, l) {
    if (l === "2403") {
        localStorage.setItem('core_user', JSON.stringify({user:u, pass:p}));
        alert(DB[lang].regSuccess);
        location.reload();
    } else { alert("INVALID KEY"); }
}

function toggleMode() {
    isRegisterMode = !isRegisterMode; currentAuthStep = 1;
    document.querySelectorAll('.input-group').forEach(el => el.classList.add('hidden'));
    document.getElementById('user-input').parentElement.classList.remove('hidden');
    syncUI();
}

function navTo(cat) {
    if (!PRODUCTS[cat]) return;
    document.getElementById('category-grid').classList.add('hidden');
    document.getElementById('product-view').classList.remove('hidden');
    const container = document.getElementById('item-container');
    container.innerHTML = "";
    PRODUCTS[cat].forEach(item => {
        const div = document.createElement('div');
        div.className = `item-row ${item.status === 'detect' ? 'locked' : ''}`;
        div.onclick = item.status === 'active' ? () => openDetails(item) : null;
        div.innerHTML = `<div class="item-info"><i class="fas fa-microchip"></i><span>${item.name}</span></div><span class="badge ${item.tag === 'UD' ? 'ud' : item.tag === 'DETECT' ? 'dt' : 'lk'}">${item.tag}</span>`;
        container.appendChild(div);
    });
}

function openDetails(item) {
    document.getElementById('product-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    document.getElementById('item-title').innerText = item.name;
    document.getElementById('txt-desc').innerText = item.desc;
    document.getElementById('txt-warn').innerText = DB[lang].warn;
    currentLink = item.link;
}

function resetNav() {
    document.getElementById('category-grid').classList.remove('hidden');
    document.getElementById('product-view').classList.add('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}

function beginSequence() {
    document.getElementById('dl-btn').classList.add('hidden');
    document.getElementById('sequence-box').classList.remove('hidden');
    let count = 10;
    const itv = setInterval(() => {
        count--; document.getElementById('countdown').innerText = count;
        if(count <= 0) { clearInterval(itv); window.location.href = currentLink; setTimeout(() => location.reload(), 2000); }
    }, 1000);
}

function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 100; i++) {
        const flake = document.createElement('div'); flake.className = 'snowflake';
        const size = Math.random() * 5 + 2; flake.style.width = `${size}px`; flake.style.height = `${size}px`;
        flake.style.left = `${Math.random() * 100}%`; flake.style.animationDuration = `${Math.random() * 3 + 4}s`;
        flake.style.animationDelay = `${Math.random() * 5}s`; container.appendChild(flake);
    }
}

function setLanguage(l) { lang = l; localStorage.setItem('site_lang', l); syncUI(); }
window.onload = () => { syncUI(); initSnow(); };