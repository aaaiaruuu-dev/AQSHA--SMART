// Ай ауысқанда тазалау
let month = new Date().getMonth();
if (localStorage.getItem("month") != month) {
  localStorage.clear();
  localStorage.setItem("month", month);
}

// Айлық табыс
function saveIncome() {
  let income = Number(document.getElementById("income").value);
  localStorage.setItem("income", income);

  localStorage.setItem("needTotal", income * 0.5);
  localStorage.setItem("wantTotal", income * 0.3);
  localStorage.setItem("saveTotal", income * 0.2);

  updateUI();
}

// Шығын қосу
function addExpense() {
  let amount = Number(document.getElementById("amount").value);
  let category = document.getElementById("category").value;

  let key = category + "Spent";
  let spent = Number(localStorage.getItem(key)) || 0;
  spent += amount;
  localStorage.setItem(key, spent);

  updateUI();
  checkWarning();
}

// Экранды жаңарту
function updateUI() {
  let income = Number(localStorage.getItem("income")) || 0;

  let needTotal = Number(localStorage.getItem("needTotal")) || 0;
  let wantTotal = Number(localStorage.getItem("wantTotal")) || 0;
  let saveTotal = Number(localStorage.getItem("saveTotal")) || 0;

  let needSpent = Number(localStorage.getItem("needSpent")) || 0;
  let wantSpent = Number(localStorage.getItem("wantSpent")) || 0;
  let saveSpent = Number(localStorage.getItem("saveSpent")) || 0;

  document.getElementById("dailyLimit").innerText =
    "Күніне жұмсауға болады: " + (income / 30).toFixed(0) + " ₸";

  document.getElementById("needTotal").innerText = "Жоспар: " + needTotal + " ₸";
  document.getElementById("needSpent").innerText = "Жұмсалды: " + needSpent + " ₸";
  document.getElementById("needLeft").innerText = "Қалды: " + (needTotal - needSpent) + " ₸";

  document.getElementById("wantTotal").innerText = "Жоспар: " + wantTotal + " ₸";
  document.getElementById("wantSpent").innerText = "Жұмсалды: " + wantSpent + " ₸";
  document.getElementById("wantLeft").innerText = "Қалды: " + (wantTotal - wantSpent) + " ₸";

  document.getElementById("saveTotal").innerText = "Жоспар: " + saveTotal + " ₸";
  document.getElementById("saveCurrent").innerText = "Жиналды: " + saveSpent + " ₸";

  document.getElementById("total").innerText =
    "Жалпы шығын: " + (needSpent + wantSpent) + " ₸";
}

// Ескерту
function checkWarning() {
  let wantSpent = Number(localStorage.getItem("wantSpent")) || 0;
  let wantTotal = Number(localStorage.getItem("wantTotal")) || 0;

  if (wantSpent > wantTotal) {
    alert("⚠️ Қалау шығыны лимиттен асты!");
  }
}

// Барлығын тазалау
function resetAll() {
  localStorage.clear();
  location.reload();
}