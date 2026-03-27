function getToday() {
    return (new Date()).toDateString();
}

function getWeekNr() {
    let d = new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    var yearStart = new Date(d.getFullYear(),0,1);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    return d.getFullYear() + '-' + weekNo;
}

function getMonth() {
    return (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1);
}

let appData = {
    prillorToday: 0,
    today: getToday(),
    dosorWeek: 0,
    week: getWeekNr(),
    stockMonth: 0,
    month: getMonth(),
    dosaCost: 0,
    totalPrillor: 0
};

function saveData() {
    localStorage.setItem("appData", JSON.stringify(appData));
}
function loadData() {
    let s = localStorage.getItem("appData");
    if(s) appData = JSON.parse(s);
}
function checkReset() {
    let changed = false;
    if(appData.today !== getToday()){
        appData.prillorToday = 0;
        appData.today = getToday();
        changed = true;
    }
    if(appData.week !== getWeekNr()) {
        appData.dosorWeek = 0;
        appData.week = getWeekNr();
        changed = true;
    }
    if(appData.month !== getMonth()) {
        appData.stockMonth = 0;
        appData.dosaCost = 0;
        appData.month = getMonth();
        changed = true;
    }
    if(changed) saveData();
}

loadData();
checkReset();

const prillorEl = document.getElementById("prillor");
const stPrillor = document.getElementById("st-prillor");
const stDosor = document.getElementById("st-dosor");
const stStocks = document.getElementById("st-stocks");
const stKostnad = document.getElementById("st-kostnad");

function updateUI(){
    prillorEl.textContent = appData.prillorToday;
    stPrillor.textContent = appData.prillorToday;
    stDosor.textContent = appData.dosorWeek;
    stStocks.textContent = appData.stockMonth;
    stKostnad.textContent = appData.dosaCost.toFixed(2);
}
updateUI();

// -- "Ta en snus"-knapp ---
document.getElementById("btn").onclick = () => {
    checkReset();
    appData.prillorToday++;
    appData.totalPrillor++;

    // Öka dosa automatiskt var 20:e prilla
    if (appData.totalPrillor % 20 === 0) {
        appData.dosorWeek++;
    }
    // Om 10 dosor, öka stock
    while (appData.dosorWeek >= 10) {
        appData.stockMonth++;
        appData.dosorWeek -= 10;
    }
    saveData();
    updateUI();
};

// -- Köp dosa ---
document.getElementById("dosaBtn").onclick = () => {
    checkReset();
    let antal = Number(document.getElementById("dosaInput").value) || 1;
    let pris = Number(document.getElementById("dosaPriceInput").value);
    if (!pris || pris <= 0) {
        alert('Skriv in pris per dosa!');
        return;
    }
    appData.dosorWeek += antal;
    appData.dosaCost += antal * pris;

    // Kolla om vi ska flytta till stock
    while (appData.dosorWeek >= 10) {
        appData.stockMonth++;
        appData.dosorWeek -= 10;
    }

    saveData();
    updateUI();
    // Töm fälten efter köp
    document.getElementById("dosaInput").value = "";
    document.getElementById("dosaPriceInput").value = "";
};

// -- Köp stock ---
document.getElementById("stockBtn").onclick = () => {
    checkReset();
    let antal = Number(document.getElementById("stockInput").value) || 1;
    let pris = Number(document.getElementById("stockPriceInput").value);
    if (!pris || pris <= 0) {
        alert('Skriv in pris per stock!');
        return;
    }
    appData.stockMonth += antal;
    appData.dosaCost += antal * pris;
    saveData();
    updateUI();
    // Töm fälten efter köp
    document.getElementById("stockInput").value = "";
    document.getElementById("stockPriceInput").value = "";
};

// -- Reset ---
document.getElementById("resetBtn").onclick = () => {
    appData = {
        prillorToday: 0,
        totalPrillor: 0,
        today: getToday(),
        dosorWeek: 0,
        week: getWeekNr(),
        stockMonth: 0,
        month: getMonth(),
        dosaCost: 0
    };
    saveData();
    updateUI();
};

// -- Sidbyte ---
document.getElementById('showStatsBtn').onclick = () => {
    updateUI();
    document.getElementById('logg-page').style.display = 'none';
    document.getElementById('stats-page').style.display = 'block';
    const img = document.getElementById('bg-img');
    img.style.display = 'block';
    setTimeout(() => img.classList.add('visible'), 20);
};

document.getElementById('backToLoggBtn').onclick = () => {
    document.getElementById('logg-page').style.display = 'block';
    document.getElementById('stats-page').style.display = 'none';
    const img = document.getElementById('bg-img');
    img.classList.remove('visible');
    setTimeout(() => { img.style.display = 'none'; }, 600);
};