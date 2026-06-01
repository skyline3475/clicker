let score = 0;
let bonus = 1;
let auto = 0;
let totalClicks = 0;
let totalCookies = 0;
let rebirths = 0;
let rebirthMax = 10;
let rebirthCost = 1000;
let bakeryUpgradeCost = 150000;
let bakeryUpgradeAmount = 0;

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
const bakeryUpgradeText = document.getElementById("bakeryUpgradeText");
const bakeryUpgrade = document.getElementById("bakeryUpgrade");
// превращение из 1000 в 1K и т.д.


function formatNumber(num) {

    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";

    return Math.floor(num);
}

// Загрузка сохраненной игры

function loadGame(){

    score =
        Number(localStorage.getItem("score")) || 0;

    bonus =
        Number(localStorage.getItem("bonus")) || 1;

    auto =
        Number(localStorage.getItem("auto")) || 0;

    rebirths =
        Number(localStorage.getItem("rebirths")) || 0;

    upgradePrice =
        Number(localStorage.getItem("upgradePrice")) || 50;

    autoPrice =
        Number(localStorage.getItem("autoPrice")) || 200;

    totalClicks =
        Number(localStorage.getItem("totalClicks")) || 0;

    totalCookies =
        Number(localStorage.getItem("totalCookies")) || 0;

    bakeryUpgradeAmount =
        Number(localStorage.getItem("bakeryUpgradeAmount")) || 0;

    bakeryUpgradeCost =
        Number(localStorage.getItem("bakeryUpgradeCost")) || 150000;
}
// Сохранение игры при закрытии страницы

function saveGame(){

    localStorage.setItem("score", score);

    localStorage.setItem("bonus", bonus);

    localStorage.setItem("auto", auto);

    localStorage.setItem("rebirths", rebirths);

    localStorage.setItem("upgradePrice", upgradePrice);

    localStorage.setItem("autoPrice", autoPrice);

    localStorage.setItem("totalClicks", totalClicks);

    localStorage.setItem("totalCookies", totalCookies);

    localStorage.setItem("bakeryUpgradeAmount", bakeryUpgradeAmount);

    localStorage.setItem("bakeryUpgradeCost", bakeryUpgradeCost);
    
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

    bakeryUpgradeText.innerText =
        formatNumber(bakeryUpgradeCost) + " 🍪";

    // Progress bar
    let percent = (score / rebirthCost) * 100;

    if (percent > 100) percent = 100;

    progress.style.width = percent + "%";

    rebirthText.innerText =
        `${formatNumber(score)} / ${formatNumber(rebirthCost)}`;
    totalClicksEl.innerText = formatNumber(totalClicks);

    totalCookiesEl.innerText = formatNumber(totalCookies);

    if (bakeryUpgradeAmount == 1) {
            cookie.src = "https://www.otisspunkmeyer.com/sites/default/files/styles/no_style/public/2024-01/cookies_funraising.png?itok=hG-Nk6qR";
        } else if (bakeryUpgradeAmount == 2) {
            cookie.src = "https://sp-ao.shortpixel.ai/client/to_auto,q_lossless,ret_img,w_1500,h_1500/https://cookie-couture.com/wp-content/uploads/2025/04/Cookie-Raspberry-White-Choccrumbs-1.png";
        } else if (bakeryUpgradeAmount == 3) {
            cookie.src = "https://www.pngall.com/wp-content/uploads/5/Chocolate-Chip-Cookie-PNG-High-Quality-Image.png";
        }
}


// КЛИК ПО ПЕЧЕНЬКЕ

bakeryUpgrade.onclick = () => {

    if (score >= bakeryUpgradeCost) {
        bakeryUpgradeAmount++;
        score -= bakeryUpgradeCost;
        bonus *= 1.5;
        bakeryUpgradeCost *= 5;
        updateUI();
        saveGame();
        
    }   
}

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
        saveGame();

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
        saveGame();

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
        autoPrice = 200;
        upgradePrice = 50;

        updateUI();
        saveGame();
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
setInterval(() => {

    saveGame();

}, 1000);
loadGame();

updateUI();