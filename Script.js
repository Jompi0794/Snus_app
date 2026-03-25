// Datumkontroll för dag
const today = new Date().toDateString();
const savedDate = localStorage.getItem("savedDate")

if (savedDate !== today) {
    localStorage.setItem("prillorToday", 0);
    localStorage.setItem("savedDate", today)
}

// Datumkontroll för månad
const currentMonth = new Date().getMonth();
const savedMonth = Number(localStorage.getItem("savedMonth"))

if (savedMonth !== currentMonth) {
    localStorage.setItem("prillorMonth", 0);
    localStorage.setItem("dosorWeek", 0);
    localStorage.setItem("stockMonth", 0);
    localStorage.setItem("savedMonth", currentMonth);
}

// hämta värden
let prillorToday = Number(localStorage.getItem("prillorToday")) || 0;
let prillorWeek = Number(localStorage.getItem("prillorWeek")) || 0;
let prillorMonth = Number(localStorage.getItem("prillorMonth")) || 0;

let dosorWeek = Number(localStorage.getItem("dosorWeek")) || 0;
let stockMonth = Number(localStorage.getItem("stockMonth")) || 0;

// Koppla HTML
const counterToday = document.getElementById("prillor");
const counterWeek = document.getElementById("weekly-counter");
const counterMonth = document.getElementById("monthly-counter");
const button = document.getElementById("btn");
const resetButton = document.getElementById("resetBtn");

// Visa startvärden
counterToday.textContent = prillorToday;
counterWeek.textContent = dosorWeek;
counterMonth.textContent = stockMonth;

// ButtonListener
button.addEventListener("click", () => {
    prillorToday++;
    prillorWeek++;
    prillorMonth++;

    if (prillorWeek >= 20){
        dosorWeek++;
        prillorWeek -= 20;
    }

    if (dosorWeek >= 10){
        stockMonth++;
        dosorWeek -= 10;
    }

    // Uppdatera HTML
    counterToday.textContent = prillorToday;
    counterWeek.textContent = dosorWeek;
    counterMonth.textContent = stockMonth;

    // Sparar skiten
    localStorage.setItem("prillorToday", prillor)
    localStorage.setItem("prillorWeek", prillorWeek)
    localStorage.setItem("prillorMonth", prillorMonth)
    localStorage.setItem("dosorWeek", dosorWeek)
    localStorage.setItem("stockMonth", stockMonth)
})

resetButton.addEventListener("click", () => {
    prillor = 0;
    prillorToday = 0;
    prillorWeek = 0;
    prillorMonth = 0;
    dosorWeek = 0;
    stockMonth = 0;

    counterToday.textContent = prillorToday;
    counterWeek.textContent = dosorWeek;
    counterMonth.textContent = stockMonth;

    localStorage.setItem("prillorToday", prillor)
    localStorage.setItem("prillorWeek", prillorWeek)
    localStorage.setItem("prillorMonth", prillorMonth)
    localStorage.setItem("dosorWeek", dosorWeek)
    localStorage.setItem("stockMonth", stockMonth)
})