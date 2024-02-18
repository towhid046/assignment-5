// utility functions:
function getElementInnerTextById(elementId) {
  return document.getElementById(elementId).innerText;
}

function setInnerTextById(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}

function setBackgroundAndColor(event) {
  event.target.style.backgroundColor = "green";
  event.target.style.color = "white";
}

//--------------------------------------

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

// ----------------------------------------------
// declare array to track user selected seats(global variable);
let selectedSeats = [];

function seatClickEventHandelar(event) {
  const elementId = event.target.id;

  if (selectedSeats.includes(elementId) === false) {
    selectedSeats.push(elementId);

    addItem(elementId);
    setBackgroundAndColor(event);
    decrementTotalSeatBy(1);
    incrementUserTotalSeatBy(1);
    updateTotalPriceBy(550);
    updateGrandTotalPriceBy(550);
  } else {
    alert("Seat already have selected!");
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