let cards = [];
let dcards = [];
let sum = 0;
let dsum = 0;
let theTrue = true;
let theFalse = false;
let startedTheGame = false;
let stayedOnce = false;
let message = "";
let firstCard = 0;
let secondCard = 0;
let cardsEl = document.getElementById("card-el");
let sumEl = document.getElementById("sum-el");
let messageEl = document.getElementById("message-el");
let dcardsEl = document.getElementById("d-card-el");
let dsumEl = document.getElementById("d-sum-el");

let player = {
  name: "Cakir",
  chips: 17,
};

// AGE VERIFICATION (reset game yapınca tekrar tekrar sorma sorunu var)
/* 

var age = prompt("Yaşınızı giriniz: ");
if (age >= 18) {
  renderGame();
} else {
  try {
    throw "Yaşınız küçük ama bu seferlik izin veriyoruz.";
  } catch (e) {
    alert(e);
    console.log(e);
  }
  renderGame();
}

*/

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 11) + 1;
  return randomCard;
}

function startGame() {
  startedTheGame = true;
  stayedOnce = false;
  firstCard = getRandomCard();
  secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function bustUserDGame() {
  for (let k = 0; k < 2; k++) {
    dFirstCard = getRandomCard();
    dSecondCard = getRandomCard();
    dcardsEl.textContent = "Dealer's Cards: " + dFirstCard + " " + dSecondCard;
    dsum = dFirstCard + dSecondCard;
    dsumEl.textContent = "Dealer's Sum: " + dsum;
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw a new card or stay?";
  } else if (sum == 21) {
    message = "Blackjack! You won.";
  } else {
    message = "You are out of the game! See you next time.";
    stay();
  }
  messageEl.textContent = message;
}

function newCard() {
  if (startedTheGame == true && sum < 21) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

function resetGame() {
  location.reload();
  return false;
}

function stay() {
  let dsum = 0;
  startedTheGame = false;
  if (sum >= 21 && stayedOnce == false) {
    bustUserDGame();
  } else if (sum <= 21 && stayedOnce == false) {
    while (dsum < 15 && dsum <= sum) {
      let dcard = getRandomCard();
      dsum += dcard;
      dcards.push(dcard);
      dcardsEl.textContent = "Dealer's Cards: ";
      for (let i = 0; i < dcards.length; i++) {
        dcardsEl.textContent += dcards[i] + " ";
      }
      dsumEl.textContent = "Dealer's Sum: " + dsum;
    }
  }
  antiStay();
  lastRender();
}

function antiStay() {
  stayedOnce = true;
}

function lastRender() {
  if (dsum > sum && dsum <= 21) {
    dealerWins();
  } else if (sum > dsum && sum <= 21) {
    userWins();
  } else if (dsum === sum && dsum <= 21 && sum <= 21) {
    nobodyWins();
  }
  messageEl.textContent = message;
}

function dealerWins() {
  message = "Dealer wins! You lost.";
  messageEl.textContent = message;
}

function userWins() {
  message = "You win! Let's play another round.";
  messageEl.textContent = message;
}

function nobodyWins() {
  message = "Tie! Let's play another round.";
  messageEl.textContent = message;
}

// karşılaştırmalar yanlış. çöz
