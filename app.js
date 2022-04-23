const cards = []; //array to hold all types of cards for shuffle 

let cardNode = document.querySelectorAll('.card'); //Node of all cards
const flippedCards = []; //array for flipped over cards to compare if matched
const matchedCards = []; //array for cards that have been matched used to check for win condition


//Add event listener to all cards.
for (let i = 0; i < cardNode.length; i++) {
    cardNode[i].addEventListener('click', checkForMatch);
}

//Add clicked cards to array. When 2 cards present, check for match.
function checkForMatch(event) {

    if (flippedCards.length < 2) {
        console.log(event.target.querySelector('i').classList);
        flippedCards.push(event.target.querySelector('i').classList);
    }
    doesMatch();
}

function doesMatch() {
    if (flippedCards.length === 2) {
        if (flippedCards[0].value === flippedCards[1].value) {
            console.log('congrats');
            matchedCards.push(flippedCards);
            flippedCards.splice(0, 2);
            console.log(flippedCards);
        } else {
            console.log('sorry');
            flippedCards.splice(0, 2);
            console.log(flippedCards);
        }
    }

}