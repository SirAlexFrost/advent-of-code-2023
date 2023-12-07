import input from './day-seven-input';

const lines = input.split('\n');

const powers = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

type Hand = {
    type: number
    rank: number
    cardString: string
    bid: number
    cards: Array<{ letter: string, count: number }>
}

const cardRegex = /(([\d\w]+) (\d+))/

let before = performance.now();

const hands = lines.map(line => {
    const match = line.match(cardRegex)!;

    const hand: Hand = { rank: 0, bid: Number(match[3]), cardString: match[2], type: -1, cards: [] }

    let highCard = true;

    for (let i = 0; i < hand.cardString.length; i++) {
        const char = hand.cardString[i];

        if (!hand.cards.filter(card => card.letter === char)[0]) {
            hand.cards.push({ letter: char, count: 1 });
            const card = hand.cards.filter(card => card.letter === char)[0];
            for (let j = 0; j < hand.cardString.length; j++) {
                if (i === j) continue;
                const otherChar = hand.cardString[j];
                if (otherChar === char) card.count++;
            }
        }

        if (i + 1 < hand.cardString.length) {
            const nextChar = hand.cardString[i + 1];
            const currentPowerIndex = powers.indexOf(char);
            const nextPowerIndex = powers.indexOf(nextChar);

            const powerSum = nextPowerIndex - currentPowerIndex;
            if (highCard)
                highCard = powerSum === 1;
        }
    };

    const pairs = hand.cards.reduce((sum, curr) => {
        if (curr.count === 2) sum += 1;
        return sum;
    }, 0);

    if (highCard) hand.type = 0;

    const onePair = pairs === 1;
    if (onePair) hand.type = 1;
    const twoPair = pairs === 2;
    if (twoPair) hand.type = 2;

    const tok = hand.cards.reduce((truth, curr) => {
        if (curr.count === 3) truth = true;
        return truth;
    }, false);

    if (tok) hand.type = 3;
    if (tok && onePair) hand.type = 4;

    const fourok = hand.cards.reduce((truth, curr) => {
        if (curr.count === 4) truth = true;
        return truth;
    }, false);

    if (fourok) hand.type = 5;

    const fiveok = hand.cards.reduce((truth, curr) => {
        if (curr.count === 5) truth = true;
        return truth;
    }, false);

    if (fiveok) hand.type = 6;

    return hand;
});

const powers2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const sortCards = (a: Hand, b: Hand, p2 = false) => {
    const typeA = a.type;
    const typeB = b.type;

    if (typeA !== typeB) return typeA - typeB;

    if (typeA === typeB && p2) {
        for (let i = 0; i < a.cardString.length; i++) {
            const cardA = powers2.indexOf(a.cardString[i]);
            const cardB = powers2.indexOf(b.cardString[i]);

            if (cardA !== cardB) return cardA - cardB;
        }
    }

    if (typeA === typeB && !p2) {
        for (let i = 0; i < a.cardString.length; i++) {
            const cardA = powers.indexOf(a.cardString[i]);
            const cardB = powers.indexOf(b.cardString[i]);

            if (cardA !== cardB) return cardA - cardB;
        }
    }

    return 0;
}

hands.sort(sortCards);

hands.forEach((hand, index) => hand.rank = index + 1);

let after = performance.now();
let time = (after - before).toFixed(2) + 'ms';

const part1 = hands.reduce((sum, curr) => sum += curr.bid * curr.rank, 0);
console.log('P1 Result:', part1);
console.log('P1 Time:', time);

before = performance.now();

const hands2 = lines.map(line => {
    const match = line.match(cardRegex)!;

    const hand: Hand = { rank: 0, bid: Number(match[3]), cardString: match[2], type: -1, cards: [] }

    let highCard = true;

    for (let i = 0; i < hand.cardString.length; i++) {
        const char = hand.cardString[i];

        if (!hand.cards.filter(card => card.letter === char)[0]) {
            hand.cards.push({ letter: char, count: 1 });
            const card = hand.cards.filter(card => card.letter === char)[0];
            for (let j = 0; j < hand.cardString.length; j++) {
                if (i === j) continue;
                const otherChar = hand.cardString[j];
                if (otherChar === char) card.count++;
            }
        }

        if (i + 1 < hand.cardString.length) {
            const nextChar = hand.cardString[i + 1];
            const currentPowerIndex = powers2.indexOf(char);
            const nextPowerIndex = powers2.indexOf(nextChar);

            const powerSum = nextPowerIndex - currentPowerIndex;
            if (highCard)
                highCard = powerSum === 1;
        }
    };

    hand.cards.sort((a, b) => b.count - a.count);
    const joker = hand.cards.filter(card => card.letter === 'J')[0];

    if (joker) {
        const highest = hand.cards[0];
        if (highest.letter === 'J') {
            const nextHighest = hand.cards[1];
            if (nextHighest) {
                nextHighest.count += joker.count;
                joker.count = 0;
            }
        } else {
            highest.count += joker.count;
            joker.count = 0;
        }
    }

    const pairs = hand.cards.reduce((sum, curr) => {
        if (curr.count === 2) sum += 1;
        return sum;
    }, 0);

    if (highCard) hand.type = 0;

    const onePair = pairs === 1;
    if (onePair) hand.type = 1;
    const twoPair = pairs === 2;
    if (twoPair) hand.type = 2;

    const tok = hand.cards.reduce((truth, curr) => {
        if (curr.count === 3) truth = true;
        return truth;
    }, false);

    if (tok) hand.type = 3;
    if (tok && onePair) hand.type = 4;

    const fourok = hand.cards.reduce((truth, curr) => {
        if (curr.count === 4) truth = true;
        return truth;
    }, false);

    if (fourok) hand.type = 5;

    const fiveok = hand.cards.reduce((truth, curr) => {
        if (curr.count === 5) truth = true;
        return truth;
    }, false);

    if (fiveok) hand.type = 6;

    return hand;
});

hands2.sort((a, b) => sortCards(a, b, true));
hands2.forEach((hand, index) => hand.rank = index + 1);

const part2 = hands2.reduce((sum, curr) => sum += curr.bid * curr.rank, 0);

after = performance.now();
time = (after - before).toFixed(2) + 'ms';

console.log('P2 Result:', part2);
console.log('P2 Time:', time);