const cards = [];

let target = document.querySelectorAll('.card');
console.log(target);

//Add event listener to all cards.
for (let i = 0; i < target.length; i++) {
    target[i].addEventListener('click', checkForMatch);
}

function checkForMatch(event) {
    console.log('click');
}