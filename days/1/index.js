const input = require('./day-one-input').split('\n');

let sum = 0;

let before = performance.now();

sum = input.map(word => {
    const matches = word.match(/\d/g);
    return parseInt(matches[0] + matches[matches.length - 1])
}).reduce((sum, curr) => sum + curr, 0);

let after = performance.now();

console.log('P1 Result:', sum);
console.log('P1 Time:', (after - before).toFixed(2) + 'ms');

const digitToNumber = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
}

sum = 0;

before = performance.now();

sum = input.map(word => {
    const matches = word.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))/g);
    let done = false;
    const digits = [];

    while (!done) {
        const match = matches.next();

        if (match.done) {
            done = true;
            continue;
        }

        digits.push(digitToNumber[match.value[1]]);
    }

    return parseInt(`${digits[0]}${digits[digits.length - 1]}`);
}).reduce((sum, curr) => sum + curr, 0);

after = performance.now();

console.log('P2 Result:', sum);
console.log('P2 Time:', (after - before).toFixed(2) + 'ms');