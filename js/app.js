// Create a list that holds all of your cards
const classesOfCards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb',
                      'fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Every 10 moves, remove a star
function removeStars() {
  var star = document.querySelector('.stars li');
  star.parentNode.removeChild(star);
}


// Display the cards on the page
function cardsInDeck () {
  // shuffle the list of cards using the provided "shuffle" method below
  shuffle(classesOfCards);
  const deck = document.querySelector('ul.deck');

  // loop through each card and create its HTML
  for (let i=0; i<=15; i++){
    const icon = classesOfCards[i];
    const listOfCard = document.createElement('li');
    listOfCard.classList.add('card');
    deck.appendChild(listOfCard);

  const iElement = document.createElement('i');
  iElement.classList.add('fa',icon);

  // add each card's HTML to the page
  listOfCard.appendChild(iElement);
  }

}

cardsInDeck();

// If a card is clicked: display the card's symbol
function displayCard (card){
   card.classList.add('open', 'show');
}

let setTimer;
let time=0;
// Start the timer in seconds
function startTimer () {

  setTimer = setInterval(function(){
    time++;
    let timeInSeconds= document.querySelector('.timer');
    timeInSeconds.textContent = time;
  }, 1000);
}

// Stop the timer in seconds
function stopTimer (){
  clearInterval(setTimer);
}

// Modal that appear when a user Wins a game
function modalAnswer() {
     // If user press OK reloads the pages
    if (confirm("You WON the game!! \n\n Time: " + time + " seconds \n Moves: " + totalCountMoves + "\n Stars: " + stars + "\n\n Do you want to play again? Press 'OK'")) {
        reloadPage();
    }
}

// Add the card to a *list* of "open" cards
let listOfCards=[];
let countMatch = 0;
function doMatch () {

  countMatch++;

  listOfCards[0].classList.add('match');
  listOfCards[1].classList.add('match');

  listOfCards[0].classList.remove('open','show');
  listOfCards[1].classList.remove('open','show');

  if (countMatch===1) {
    listOfCards[0].classList.remove('animation');
    listOfCards[1].classList.remove('animation');

    stopTimer();
    setTimeout(function(){
      modalAnswer();
    }, 1000);

  }

}

// Remove style when the cards dont match
function doNoMatch() {
  listOfCards[0].classList.remove('open','show');
  listOfCards[1].classList.remove('open','show');
}

// Functionality when a card is open
function listOfOpenCards(card){

  listOfCards.push(card);
  // if the list already has another card, check to see if the two cards match

  if (listOfCards.length===2){
    const card1 = listOfCards[0].innerHTML;
    const card2 = listOfCards[1].innerHTML;

    //Add animation to cards after open
    listOfCards[0].classList.add('animation');
    listOfCards[1].classList.add('animation');

    setTimeout(function(){

      // if the cards do match, lock the cards in the open position
      if (card1===card2) {
        doMatch();
      }

      // if the cards do not match, remove the cards from the list and hide the card's symbol
      else if (card1!=card2) {
        doNoMatch();
          }
          listOfCards[0].classList.remove('animation');
          listOfCards[1].classList.remove('animation');
      listOfCards=[];
    }, 1000);

  } // if (listOfCards.length==2)

}

//Increment the move counter, every two cards
let totalCountMoves;
function countMoves(count){
  totalCountMoves = count/2;
  const moves = document.querySelector('.moves');
  if((count % 2) == 0) {
    moves.textContent = totalCountMoves;
  }
}

// Count the number of clicks
let count = 0;
// Count the number of stars
let stars = 3;
//* set up the event listener for a card.
const deck = document.querySelector('.deck');
deck.addEventListener('click', function (evt) {
  const card = evt.target;
  if (card.nodeName === 'LI') {
    count++;
    // Start the timer on the first click
    if (count===1) {
        startTimer();
    }
    // Conditional to prevent to click a third card
    if (listOfCards.length<2) {
      displayCard(card);

      listOfOpenCards(card);

      countMoves(count);

      countStars = count / 2;
      if ((countStars === 10) || (countStars === 20) || (countStars === 30)) {
        removeStars();
        if ((countStars >=10) && (countStars<=19)){
          stars = 2;
        }
        else if ((countStars>=20) && (countStars <=29)) {
          stars = 1;
        }
        else if (countStars>=30) {
          stars = 0;
        }
      }

    }

  }
});

// Restart the page
function reloadPage() {
    location.reload();
}

// Listener of button restart
const reload = document.querySelector('.restart');
reload.addEventListener('click', function () {
  reloadPage();
});
