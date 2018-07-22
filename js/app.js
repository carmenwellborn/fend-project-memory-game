/*
 * Create a list that holds all of your cards
*/
var classesOfCards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb',
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

//* Display the cards on the page
function cardsInDeck () {
  //- shuffle the list of cards using the provided "shuffle" method below
  shuffle(classesOfCards);
  const deck = document.querySelector('ul.deck');

  for (let i=0; i<=15; i++){
    //- loop through each card and create its HTML
    const icon = classesOfCards[i];
    const listOfCard = document.createElement('li');
    listOfCard.classList.add('card');
    deck.appendChild(listOfCard);

  const iElement = document.createElement('i');
  iElement.classList.add('fa',icon);

  //- add each card's HTML to the page
  listOfCard.appendChild(iElement);
  }

}

cardsInDeck();

// - If a card is clicked: display the card's symbol
function displayCard (card){
   card.classList.add('open', 'show');
}

let setTimer;
let time=0;
function startTimer () {

  setTimer = setInterval(function(){
    time++;
    let timeInSeconds= document.querySelector('.timer');
    timeInSeconds.textContent = time;
  }, 1000);
}

function stopTimer (){
  clearInterval(setTimer);
}

//* - add the card to a *list* of "open" cards
var listOfCards=[];
let countMatch = 0;
function doMatch () {

  countMatch++;

  listOfCards[0].classList.add('match');
  listOfCards[1].classList.add('match');

  listOfCards[0].classList.remove('open','show');
  listOfCards[1].classList.remove('open','show');

  if (countMatch===1) {
    stopTimer();
    alert("You won the game!! \n Time:" +time +"seconds");

  }

}

function doNoMatch() {
  listOfCards[0].classList.remove('open','show');
  listOfCards[1].classList.remove('open','show');
}

function listOfOpenCards(card){

  listOfCards.push(card);
  //*- if the list already has another card, check to see if the two cards match

  if (listOfCards.length===2){
    const card1 = listOfCards[0].innerHTML;
    const card2 = listOfCards[1].innerHTML;

    //Add animation to cards after open
    listOfCards[0].classList.add('animation');
    listOfCards[1].classList.add('animation');

    setTimeout(function(){

      //if the cards do match, lock the cards in the open position
      if (card1===card2) {
        doMatch();
      }

      //if the cards do not match, remove the cards from the list and hide the card's symbol
      else if (card1!=card2) {
        doNoMatch();
          }
          listOfCards[0].classList.remove('animation');
          listOfCards[1].classList.remove('animation');
      listOfCards=[];
    }, 1000);

    //If all cards match

  } // if (listOfCards.length==2)

}


//Increment the move counter, every two cards
function countMoves(count){
  const totalCount = count/2;
  const moves = document.querySelector('.moves');
  if((count % 2) == 0) {
    moves.textContent = totalCount;
  }
}

// Count the number of clicks
let count = 0;
//* set up the event listener for a card.

const deck = document.querySelector('.deck');
deck.addEventListener('click', function (evt) {
  const card = evt.target;
  if (card.nodeName === 'LI') {
    count++;
    //Start the timer on the first click
    if (count===1) {
        startTimer();
    }
    //Conditional to prevent to click a third card
    if (listOfCards.length<2) {
    displayCard(card);

    listOfOpenCards(card);

    countMoves(count);
    }

  }
});


//Restart the page
function reloadPage() {
    location.reload();
}

const reload = document.querySelector('.restart');
reload.addEventListener('click', function () {
  reloadPage();
});

/*if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)*/
