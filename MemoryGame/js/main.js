

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('visible');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.getElementsByClassName("card-value")[0].src === secondCard.getElementsByClassName("card-value")[0].src;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  var audioElement = new Audio('./audio/woohoo.mp3');
  audioElement.play();
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  var audioElement = new Audio('./audio/doh.wav');
  audioElement.play();
  setTimeout(() => {
    firstCard.classList.remove('visible');
    secondCard.classList.remove('visible');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.ceil(Math.random() * 12);
    card.style.order = randomPos;
  })
};
shuffle()

function restart() {
  setTimeout(() => {
    location.reload()
  }, 4000);
  var audioElement = new Audio('./audio/anyKey.wav');
  audioElement.play();
}

cards.forEach(card => card.addEventListener('click', flipCard));

