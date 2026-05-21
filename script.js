let score = 0;
let bonus = 1;
let auto = 0;
let totalClicks = 0;
let totalCookies = 0;
let rebirths = 0;
let rebirthMax = 10;
let rebirthCost = 1000;

// ЦЕНЫ
let upgradePrice = 50;
let autoPrice = 200;

// HTML элементы
const scoreEl = document.getElementById("score");
const perSecondEl = document.getElementById("perSecond");
const rebirthEl = document.getElementById("rebirth");
const totalClicksEl = document.getElementById("totalClicks");

const totalCookiesEl = document.getElementById("totalCookies");
const cookie = document.getElementById("cookie");

const upgradeBtn = document.getElementById("upgradeBtn");
const autoBtn = document.getElementById("autoBtn");
const rebirthBtn = document.getElementById("rebirthBtn");

const upgradePriceText = document.getElementById("upgradePrice");
const autoPriceText = document.getElementById("autoPrice");

const progress = document.getElementById("progress");
const rebirthText = document.getElementById("rebirthText");


// превращение из 1000 в 1K и т.д.


function formatNumber(num) {

    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";

    return Math.floor(num);
}


// Обновление UI


function updateUI() {

    scoreEl.innerText = formatNumber(score);

    perSecondEl.innerText =
        formatNumber(auto * (rebirths + 1));

    rebirthEl.innerText =
        `Rebirth: ${rebirths} / ${rebirthMax}`;

    upgradePriceText.innerText =
        formatNumber(upgradePrice) + " 🍪";

    autoPriceText.innerText =
        formatNumber(autoPrice) + " 🍪";

    // Progress bar
    let percent = (score / rebirthCost) * 100;

    if (percent > 100) percent = 100;

    progress.style.width = percent + "%";

    rebirthText.innerText =
        `${formatNumber(score)} / ${formatNumber(rebirthCost)}`;
    totalClicksEl.innerText = formatNumber(totalClicks);

    totalCookiesEl.innerText = formatNumber(totalCookies);
}


// КЛИК ПО ПЕЧЕНЬКЕ


cookie.onclick = () => {

    let gained =
        bonus * (rebirths + 1);

    score += gained;

    // статистика
    totalClicks++;

    totalCookies += gained;

    updateUI();
};


// UPGRADE


upgradeBtn.onclick = () => {

    if (score >= upgradePrice) {

        score -= upgradePrice;

        bonus++;

        // Цена x2
        upgradePrice *= 2;

        updateUI();

    } else {

        alert("Не хватает печенек!");
    }
};


// AUTO CLICK


autoBtn.onclick = () => {

    if (score >= autoPrice) {

        score -= autoPrice;

        auto++;

        // Цена x2
        autoPrice *= 2;

        updateUI();

    } else {

        alert("Не хватает печенек!");
    }
};


// REBIRTH


rebirthBtn.onclick = () => {

    if (score >= rebirthCost &&
        rebirths < rebirthMax) {

        rebirths++;

        score = 0;

        bonus = 1;

        auto = 0;

        rebirthCost *= 2;

        updateUI();

    } else {

        alert("Нельзя сделать rebirth!");
    }
};


// AUTO COOKIE


setInterval(() => {

    score += auto * (rebirths + 1);

    updateUI();

}, 1000);

// Старт
updateUI();