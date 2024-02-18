// utility functions:
function getElementInnerTextById(elementId) {
  return document.getElementById(elementId).innerText;
}

function setInnerTextById(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}

function setBackgroundAndColor(event) {
  event.target.classList.add("bg-custom-green");
  event.target.classList.add("hover:bg-custom-green");
  event.target.style.color = "white";
}

//--------------------------------------
function addItem(elementId) {
  const seatName = getElementInnerTextById(elementId);
  const seatsContainer = document.getElementById("seats-container");
  seatsContainer.innerHTML += `
  <li class="flex justify-between items-center text-base text-[#03071299] font-normal">
     <span class='user-selected-seat'>${seatName}</span> 
     <span>Economy</span> 
     <span>550</span>
  </li>
  `;
}

function decrementTotalSeatBy(number) {
  const currentSeats = parseInt(getElementInnerTextById("seat-counter"));
  setInnerTextById("seat-counter", currentSeats - number);
}

function incrementUserTotalSeatBy(number) {
  const currentUserSeats = parseInt(getElementInnerTextById("seats-increment"));
  setInnerTextById("seats-increment", currentUserSeats + number);
}

function updateTotalPriceBy(number) {
  const currentPrice = parseInt(getElementInnerTextById("total-price"));
  setInnerTextById("total-price", currentPrice + number);
}

function updateGrandTotalPriceBy(number) {
  const currentPrice = parseInt(getElementInnerTextById("grand-total-price"));
  setInnerTextById("grand-total-price", currentPrice + number);
}

function calculateAndSetDiscountAmount(currentPrice, value) {
  const discountShow = document.getElementById("discount-show");
  const coupnShow = document.getElementById("coupn-div");
  const discount = (currentPrice * value) / 100;
  setInnerTextById("grand-total-price", currentPrice - discount);
  setInnerTextById("discount-amount", discount);
  coupnShow.classList.add("hidden");
  discountShow.classList.remove("hidden");
}

// ----------------------------------------------
// ----------------------------------------------
// declare array to track user selected seats(global variable);
let selectedSeats = [];

//---------------------------------
// seat click handelar funtion:

function seatClickEventHandelar(event) {
  const elementId = event.target.id;

  if (selectedSeats.length < 4) {
    if (selectedSeats.includes(elementId) === false) {
      selectedSeats.push(elementId);

      addItem(elementId);
      setBackgroundAndColor(event);
      decrementTotalSeatBy(1);
      incrementUserTotalSeatBy(1);
      updateTotalPriceBy(550);
      updateGrandTotalPriceBy(550);
      applyCoupnCode(selectedSeats);
    } else if (selectedSeats.includes(elementId) === true) {
      alert("Seat already have selected!");
    }
  } else {
    alert("You only can purchese 4 seat by your account");
  }
}

// added event listener to seat:
const seats = document.querySelectorAll(".seat");
for (let seat of seats) {
  seat.addEventListener("click", seatClickEventHandelar);
}

//------------------------------------
// Enable or disabled Next button based on the condition:
const numberInputElement = document.getElementById("form-number-input");
const nextBtn = document.getElementById("next-btn");

numberInputElement.addEventListener("keyup", function (event) {
  let inpuNumber = parseFloat(event.target.value);

  if (inpuNumber > 0 && selectedSeats.length > 0) {
    nextBtn.removeAttribute("disabled");
  } else {
    nextBtn.setAttribute("disabled", true);
  }
});

// --------------------------------------
// add event listener to next button:
nextBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const header = document.getElementById("header");
  const main = document.getElementById("main");
  const footer = document.getElementById("footer");
  const nextPage = document.getElementById("next-page");

  setTimeout(() => {
    header.classList.add("hidden");
    main.classList.add("hidden");
    footer.classList.add("hidden");
    nextPage.classList.remove("hidden");
  }, 300);
});

// -------------------------------------
// enable apply coupn button based on the condition:
function applyCoupnCode() {
  if (selectedSeats.length === 4) {
    const applyBtn = document.getElementById("apply-btn");
    applyBtn.removeAttribute("disabled");
  }
}

// -------------------------------------
// this function is called when user click on apply button (it apply on html directly):
function getDiscount() {
  const currentTotalPrice = parseInt(getElementInnerTextById("total-price"));
  const coupnInputValue = document.getElementById("coupn-input-fild").value;

  if (coupnInputValue === "NEW15") {
    calculateAndSetDiscountAmount(currentTotalPrice, 15);
  }
  if (
    coupnInputValue === "Couple 20" ||
    coupnInputValue === "Couple20" ||
    coupnInputValue === "couple20" ||
    coupnInputValue === "COUPLE20"
  ) {
    calculateAndSetDiscountAmount(currentTotalPrice, 20)
  }
}