const cards = ['fa-apple-whole', 'fa-fish-fins', 'fa-cat', 'fa-crow', 'fa-dragon', 'fa-otter', 'fa-hand-spock', 'fa-seedling', 'fa-apple-whole', 'fa-fish-fins', 'fa-cat', 'fa-crow', 'fa-dragon', 'fa-otter', 'fa-hand-spock', 'fa-seedling'];
//array to hold all types of cards for shuffle 

let cardNode = document.querySelectorAll('.card'); //Node of all cards
let moveCounter = document.querySelector('.moves'); //Span to show move count
let stars = document.querySelectorAll('.fa-star'); //Node of all stars
let modal = document.querySelector('.modal'); //Win Modal
let timerText = document.querySelectorAll('.timer-text'); //Node for timer
let moveCount = 0;
let timerId;

const flippedCards = []; //array for flipped over cards to compare if matched
const matchedCards = []; //array for cards that have been matched used to check for win condition


//Add event listeners to all cards.
for (let i = 0; i < cardNode.length; i++) {
    cardNode[i].addEventListener('click', playGame);
    cardNode[i].addEventListener('click', startTimer);
}

//Shuffle deck and set board
setBoard(cardNode, shuffleDeck(cards));

function playGame(event) {
    flipCard(event);
    checkStars();
    checkForWin();
}

//Add clicked cards to array. When 2 cards present, check for match.
function flipCard(event) {
    if (flippedCards.length < 2 && event.target.classList.contains('card') && !event.target.classList.contains('flipped')) {
        event.target.classList.add('flipped');
        flippedCards.push(event.target);
        checkForMatch();
    }
}

//checks 2 cards for match
function checkForMatch() {
    if (flippedCards.length === 2) {
        moveCount++;
        if (flippedCards[0].querySelector('i').classList.value === flippedCards[1].querySelector('i').classList.value) {
            matchedCards.push(flippedCards);
            setTimeout(function () {
                //Adds matched class
                for (card of flippedCards) {
                    card.classList.add('matched');
                    card.removeEventListener('click', playGame);
                }
                //Resets flipped cards array
                setTimeout(function () {
                    flippedCards.splice(0, 2);
                }, 500);
            }, 800);

        } else {
            setTimeout(function () {
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
                    setTimeout(function () {
                        flippedCards.splice(0, 2);
                    }, 500);
                }, 800);
            }, 800);

        }
        moveCounter.innerText = moveCount;

    }
}

function checkForWin() {
    if (matchedCards.length === 8) {
        clearInterval(timerId);
        setTimeout(function () {
            modal.classList.add('visible');
        }, 1800);
    }
}

function checkStars() {
    if (moveCount >= 20) {
        stars[1].classList.remove('fa-solid');
        stars[1].classList.add('fa-regular');
    } else if (moveCount >= 14) {
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

function startTimer() {
    for (let i = 0; i < cardNode.length; i++) {
        cardNode[i].removeEventListener('click', startTimer);
    }
    let time = 0;
    timerId = setInterval(function () {
        time++;
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        for (let i = 0; i < timerText.length; i++) {
            timerText[i].innerText = format(minutes) + ":" + format(seconds);
        }
    }, 1000);
}
//Format numbers for counter to have leading zero on single digit numbers
function format(x) {
    if (x < 10) {
        return "0" + x;
    } else {
        return x;
    }
}