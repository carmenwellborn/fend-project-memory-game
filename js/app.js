/*
 * Create a list that holds all of your cards
*/
var classesOfCards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb',
                      'fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];

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


// - If a card is clicked: display the card's symbol
function displayCard (card){
   card.classList.add('open', 'show');
}

//* - add the card to a *list* of "open" cards
var listOfCards=[];
function listOfOpenCards(card){
  listOfCards.push(card);
  //*- if the list already has another card, check to see if the two cards match
  if (listOfCards.length==2){

    const card1 = listOfCards[0].innerHTML;
    const card2 = listOfCards[1].innerHTML;
    setTimeout(function(){

      //if the cards do match, lock the cards in the open position
      if (card1===card2) {
        listOfCards[0].classList.add('match');
        listOfCards[1].classList.add('match');

        listOfCards[0].classList.remove('open','show');
        listOfCards[1].classList.remove('open','show');
        
        listOfCards=[];
      }
      //if the cards do not match, remove the cards from the list and hide the card's symbol
      else if (card1!=card2) {
          listOfCards[0].classList.remove('open','show');
          listOfCards[1].classList.remove('open','show');
          listOfCards=[];
      }

    }, 1000);

  }
}


//* set up the event listener for a card.
const deck = document.querySelector('.deck');
deck.addEventListener('click', function (evt) {
  const card = evt.target;
  if (card.nodeName === 'LI') {
    displayCard(card);
    listOfOpenCards(card);
    }
});


/*
 *   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
