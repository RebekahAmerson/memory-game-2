const cards = []; //array to hold all types of cards for shuffle 

let cardNode = document.querySelectorAll('.card'); //Node of all cards
let moveCounter = document.querySelector('.moves'); //Span to show move count
let moveCount = 0;

const flippedCards = []; //array for flipped over cards to compare if matched
const matchedCards = []; //array for cards that have been matched used to check for win condition


//Add event listener to all cards.
for (let i = 0; i < cardNode.length; i++) {
    cardNode[i].addEventListener('click', playGame);
}


function playGame(event) {
    console.log('click');
    checkForMatch(event);
    checkForWin();
}

//Add clicked cards to array. When 2 cards present, check for match.
function checkForMatch(event) {

    if (flippedCards.length < 2) {
        event.target.classList.add('flipped');
        flippedCards.push(event.target);
    }

    doesMatch();
}
//checks 2 cards for match
function doesMatch() {
    if (flippedCards.length === 2) {
        if (flippedCards[0].querySelector('i').classList.value === flippedCards[1].querySelector('i').classList.value) {
            console.log('congrats');
            matchedCards.push(flippedCards);
            //Adds matched class
            for (card of flippedCards) {
                card.classList.add('matched');
                card.removeEventListener('click', playGame);
            }
            //Resets flipped cards array
            flippedCards.splice(0, 2);
            moveCount++;
            console.log(matchedCards.length);
        } else {
            console.log('sorry');
            for (card of flippedCards) {
                card.classList.add('not-matched');
            }
            //TODO: add delay
            for (card of flippedCards) {
                card.classList.remove('flipped', 'not-matched');
            }
            //Resets flipped cards array
            flippedCards.splice(0, 2);
            moveCount++;
        }
        moveCounter.innerText = moveCount;

    }
}

function checkForWin() {
    if (matchedCards.length === 8) {
        console.log('you won');
    }
}

