// --- BACKGROUND MUSIC AUTOPLAY & LOOP ---
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
    bgMusic.volume = 0.4; // 0.0 to 1.0 (0.4 = 40% lakas)

    // Kapag nag-click, nag-scroll, o nag-touch ang user, tutugtog agad
    const playMusic = () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Autoplay blocked by browser", e));
        }
        // Tanggalin na yung event listeners pagkatugtog na para hindi mag-loop ng loop
        document.removeEventListener('click', playMusic);
        document.removeEventListener('scroll', playMusic);
        document.removeEventListener('touchstart', playMusic);
    };

    document.addEventListener('click', playMusic);
    document.addEventListener('scroll', playMusic);
    document.addEventListener('touchstart', playMusic);
}

// --- Theme toggle ---
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.add('theme-transitioning');
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    setTimeout(() => body.classList.remove('theme-transitioning'), 600);
});

// --- Menu toggle ---
const menuButton = document.getElementById('menuButton');
const menuPanel = document.getElementById('menuPanel');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    menuPanel.classList.toggle('open');
});

// --- Typing effect for quote ---
const quoteText = document.getElementById('quoteText');
const fullQuote = quoteText.textContent;
quoteText.textContent = '';
let i = 0;

function typeQuote() {
    if (i < fullQuote.length) {
        quoteText.textContent += fullQuote.charAt(i);
        i++;
        setTimeout(typeQuote, 50);
    }
}

setTimeout(typeQuote, 1000);

// --- PH Time ---
function updatePHTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    document.getElementById('phTime').textContent = now.toLocaleTimeString('en-US', options);
}

updatePHTime();
setInterval(updatePHTime, 1000);

// --- Simulated ping ---
function updatePing() {
    const ping = Math.floor(Math.random() * 50) + 10;
    document.getElementById('pingValue').textContent = ping + 'ms';
}

updatePing();
setInterval(updatePing, 3000);

// --- Battery status ---
if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
        const fill = document.getElementById('batteryFill');
        const percentage = document.getElementById('batteryPercentage');

        function updateBattery() {
            const level = Math.round(battery.level * 100);
            fill.style.width = level + '%';
            percentage.textContent = level + '%';

            fill.classList.remove('low', 'medium');
            if (level <= 20) fill.classList.add('low');
            else if (level <= 50) fill.classList.add('medium');
        }

        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
    });
} else {
    document.getElementById('batteryPercentage').textContent = 'N/A';
}
