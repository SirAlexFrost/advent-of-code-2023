const input = require('./day-four-input').split('\n');

const cards = [];

let before = performance.now();

const gameRegex = /((\d+):)/;
const numberRegex = /(\d+)/g;

for (const line of input) {

    const card = { id: 0, winningNums: [], playedNums: [], wins: 0 }

    const cardMatch = line.match(gameRegex);
    card.id = cardMatch[2];

    const numbers = line.split(cardMatch[0])[1].split('|');

    card.winningNums = numbers[0].match(numberRegex);
    card.playedNums = numbers[1].match(numberRegex);

    cards.push(card);
}

const part1 = cards.reduce((sum, curr) => {

    // Get number of played numbers that win.
    let winningNumbers = 0;
    for (const number of curr.playedNums) {
        if (curr.winningNums.includes(number)) {
            winningNumbers++;
            continue;
        }
    }

    curr.wins = winningNumbers;

    if (winningNumbers < 2) {
        return sum += winningNumbers === 1 ? 1 : 0;
    } else {
        return sum += (1 * Math.pow(2, winningNumbers - 1));
    }

}, 0);

let after = performance.now();
let time = (after - before).toFixed(2);

console.log('P1 Result:', part1);
console.log('P1 Time:', time + 'ms');

let totalCards = cards.length;

let extraWins = 0;

before = performance.now();
const findWinningCards = (card) => {
    for (let j = 1; j <= card.wins; j++) {
        extraWins++;
        const nextCardIndex = (Number(card.id) - 1) + j;
        if (nextCardIndex < cards.length) {
            const nextCard = cards[nextCardIndex];
            findWinningCards(nextCard);
        }
    }
}

// Can ignore any cards that don't have any wins
cards.filter(card => card.wins > 0).forEach(findWinningCards);

after = performance.now();
time = (after - before).toFixed(2);

console.log('P2 Result:', totalCards + extraWins);
console.log('P2 Time:', time + 'ms');

