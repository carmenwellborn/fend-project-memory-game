/*
 * Create a list that holds all of your cards
 */
var classesOfCards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb',
                      'fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','0'];

function cardsInDeck () {
  shuffle(classesOfCards);
  const deck = document.querySelector('ul.deck');

  for (let i=1; i<=16; i++){
    const icon = classesOfCards[i];
    const listOfCard = document.createElement('li');
    listOfCard.classList.add('card');
    deck.appendChild(listOfCard);

  const iElement = document.createElement('i');
  iElement.classList.add('fa',icon);
  listOfCard.appendChild(iElement);
  }

}

cardsInDeck();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function displayCard (evt){
  if (evt.target.nodeName === 'LI') {
    const card = evt.target;
    card.classList.add('open', 'show');
  }
}

const deck = document.querySelector('.deck');
deck.addEventListener('click', function (evt) {
    displayCard(evt);
});
/*
 * 1- set up the event listener for a card. If a card is clicked:
 * 1.1 - display the card's symbol (put this functionality in another function that you call from this one)
 * 1.2 - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * 1.3 - if the list already has another card, check to see if the two cards match
 * 2   + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * 3   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * 4   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * 5   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
