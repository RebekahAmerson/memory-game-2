const cards = ['fa-apple-whole', 'fa-fish-fins', 'fa-cat', 'fa-crow', 'fa-dragon', 'fa-otter', 'fa-hand-spock', 'fa-seedling', 'fa-apple-whole', 'fa-fish-fins', 'fa-cat', 'fa-crow', 'fa-dragon', 'fa-otter', 'fa-hand-spock', 'fa-seedling'];
//array to hold all types of cards for shuffle 

let cardNode = document.querySelectorAll('.card'); //Node of all cards
let moveCounter = document.querySelector('.moves'); //Span to show move count
let stars = document.querySelectorAll('.fa-star'); //Node of all stars
let moveCount = 0;

const flippedCards = []; //array for flipped over cards to compare if matched
const matchedCards = []; //array for cards that have been matched used to check for win condition


//Add event listener to all cards.
for (let i = 0; i < cardNode.length; i++) {
    cardNode[i].addEventListener('click', playGame);
}

//Shuffle deck and set board
setBoard(cardNode, shuffleDeck(cards));

function playGame(event) {
    console.log('click');
    flipCard(event);
    checkForMatch();
    checkStars();
    checkForWin();
}

//Add clicked cards to array. When 2 cards present, check for match.
function flipCard(event) {
    if (flippedCards.length < 2 && event.target.classList.contains('card') && !event.target.classList.contains('flipped')) {
        event.target.classList.add('flipped');
        flippedCards.push(event.target);
    }
}

//checks 2 cards for match
function checkForMatch() {
    if (flippedCards.length === 2) {
        if (flippedCards[0].querySelector('i').classList.value === flippedCards[1].querySelector('i').classList.value) {
            console.log('congrats');
            matchedCards.push(flippedCards);
            setTimeout(function () {
                //Adds matched class
                for (card of flippedCards) {
                    card.classList.add('matched');
                    card.removeEventListener('click', playGame);
                }
                //Resets flipped cards array
                flippedCards.splice(0, 2);
                moveCount++;
            }, 800);
        } else {
            setTimeout(function () {
                console.log('sorry');
                //Adds non-matched class
                for (card of flippedCards) {
                    card.classList.add('not-matched');
                }
                //Flips cards back over
                setTimeout(function () {
                    for (card of flippedCards) {
                        card.classList.remove('flipped', 'not-matched');
                    }
                    //Resets flipped cards array
                    flippedCards.splice(0, 2);
                    moveCount++;
                }, 800);
            }, 800);
        }
        moveCounter.innerText = moveCount;
    }
}

function checkForWin() {
    if (matchedCards.length === 8) {
        console.log('you won');
    }
}

function checkStars() {
    if (moveCount >= 15) {
        stars[1].classList.remove('fa-solid');
        stars[1].classList.add('fa-regular');
    } else if (moveCount >= 10) {
        stars[0].classList.remove('fa-solid');
        stars[0].classList.add('fa-regular');
    }
}

function setBoard(node, arr) {
    for (let i = 0; i < node.length; i++) {
        node[i].querySelector('i').classList.add(arr[i]);
    }
}

function shuffleDeck(arr) {
    const newArr = [...arr];
    // Durstenfeld shuffle
    for (var i = newArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    return newArr;
}