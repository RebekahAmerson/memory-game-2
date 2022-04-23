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
        event.target.classList.add('flipped');
        flippedCards.push(event.target);
        console.log(event.target.querySelector('i').value);
    }

    doesMatch();
}
//checks 2 cards for match
function doesMatch() {
    if (flippedCards.length === 2) {
        if (flippedCards[0].querySelector('i').classList.value === flippedCards[1].querySelector('i').classList.value) {
            console.log('congrats');
            matchedCards.push(flippedCards);

            for (card of flippedCards) {
                card.classList.add('matched');
            }

            flippedCards.splice(0, 2);
            console.log(flippedCards);
        } else {
            console.log('sorry');
            for (card of flippedCards) {
                card.classList.remove('flipped');
            }

            flippedCards.splice(0, 2);
            console.log(flippedCards);
        }
    }
}
