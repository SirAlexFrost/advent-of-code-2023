const input = require('./day-three-input').split('\n');

const numRegex = /\d+/g

const validateChar = (char) => {
    if (char === '.') return false;
    if (char === '*') return true;
    return isNaN(Number(char));
}

let before = performance.now();

const part1 = input.map((line, i) => {
    const matches = line.matchAll(numRegex);

    let done = false;

    let sumOfLine = 0;

    while (!done) {
        let valid = false;

        const match = matches.next();

        if (match.done) {
            done = true;
            continue;
        }

        const matchIndex = match.value.index;
        const matchValue = match.value[0];
        const matchEdgeIndex = matchIndex + matchValue.length - 1;

        const above = i > 0;
        const below = i < input.length - 1;
        const left = matchIndex > 0;
        const right = matchEdgeIndex < line.length - 1;

        // Check to the left
        if (left) valid = validateChar(line[matchIndex - 1])

        // Check to the right
        if (right && !valid) {

            valid = validateChar(line[matchEdgeIndex + 1]);
        }

        if (above && !valid) {
            const prevLine = input[i - 1];

            // Check diagonally above left and right.
            if (left && !valid) valid = validateChar(prevLine[matchIndex - 1]);
            if (right && !valid) valid = validateChar(prevLine[matchEdgeIndex + 1]);

            // Check above each char.
            for (let j = matchIndex; j <= matchEdgeIndex; j++) {
                const char = prevLine[j];
                if (!valid) {
                    valid = validateChar(char);
                }
            }
        }

        if (below && !valid) {
            const nextLine = input[i + 1];

            // Check diagonally below left and right.
            if (left && !valid) valid = validateChar(nextLine[matchIndex - 1]);

            if (right && !valid) valid = validateChar(nextLine[matchEdgeIndex + 1]);

            // Check below each char.
            for (let j = matchIndex; j <= matchEdgeIndex; j++) {
                const char = nextLine[j];
                if (!valid) {
                    valid = validateChar(char);
                }
            }
        }

        if (valid) {
            sumOfLine += Number(matchValue);
        }
    }

    return sumOfLine;
}).reduce((sum, curr) => sum + curr);

let after = performance.now();
let time = (after - before).toFixed(2)

console.log('P1 Result:', part1);
console.log('P1 Time:', time + 'ms');


before = performance.now();
const validateCharP2 = (char) => {
    if (char === '*') return true;
    return false;
}

/*

    Below is not remotely optimal, a lot of it is C+P from above.
    It works though, and that is what matters :D

*/

const asterisks = [];

const addToAsterisk = (i, j, number) => {
    const asterisk = asterisks.filter(asterisk => asterisk.id === `${i}|${j}`)[0];

    if (!asterisk) {
        asterisks.push({
            id: `${i}|${j}`,
            numbers: [number]
        });
    } else {
        asterisk.numbers.push(number);
    }
}

input.map((line, i) => {
    const matches = line.matchAll(numRegex);

    let done = false;
    while (!done) {

        const match = matches.next();

        if (match.done) {
            done = true;
            continue;
        }

        const matchIndex = match.value.index;
        const matchValue = match.value[0];
        const matchEdgeIndex = matchIndex + matchValue.length - 1;

        const above = i > 0;
        const below = i < input.length - 1;
        const left = matchIndex > 0;
        const right = matchEdgeIndex < line.length - 1;

        // Check to the left
        if (left) {
            const asterisk = validateCharP2(line[matchIndex - 1]);
            if (asterisk) {
                addToAsterisk(i, matchIndex - 1, Number(matchValue))
            }
        }

        // Check to the right
        if (right) {
            const asterisk = validateCharP2(line[matchEdgeIndex + 1]);
            if (asterisk) {
                addToAsterisk(i, matchEdgeIndex + 1, Number(matchValue))
            }
        }

        if (above) {
            const prevLine = input[i - 1];

            // Check diagonally above left and right.
            if (left) {
                const asterisk = validateCharP2(prevLine[matchIndex - 1]);
                if (asterisk) {
                    addToAsterisk(i - 1, matchIndex - 1, Number(matchValue))
                }
            }

            if (right) {
                const asterisk = validateCharP2(prevLine[matchEdgeIndex + 1]);
                if (asterisk) {
                    addToAsterisk(i - 1, matchEdgeIndex + 1, Number(matchValue))
                }
            }

            // Check above each char.
            for (let j = matchIndex; j <= matchEdgeIndex; j++) {
                const char = prevLine[j];
                const asterisk = validateCharP2(char);
                if (asterisk) {
                    addToAsterisk(i - 1, j, Number(matchValue))
                }
            }
        }

        if (below) {
            const nextLine = input[i + 1];

            // Check diagonally below left and right.
            if (left) {
                const asterisk = validateCharP2(nextLine[matchIndex - 1]);
                if (asterisk) {
                    addToAsterisk(i + 1, matchIndex - 1, Number(matchValue))
                }
            }

            if (right) {
                const asterisk = validateCharP2(nextLine[matchEdgeIndex + 1]);
                if (asterisk) {
                    addToAsterisk(i + 1, matchEdgeIndex + 1, Number(matchValue))
                }
            }

            // Check below each char.
            for (let j = matchIndex; j <= matchEdgeIndex; j++) {
                const char = nextLine[j];
                const asterisk = validateCharP2(char);
                if (asterisk) {
                    addToAsterisk(i + 1, j, Number(matchValue))
                }
            }
        }
    }
});

after = performance.now();
time = (after - before).toFixed(2);

console.log('P2 Result:', asterisks.filter(asterisk => asterisk.numbers.length > 1).map(asterisk => asterisk.numbers[0] * asterisk.numbers[1]).reduce((sum, curr) => sum + curr));
console.log('P2 Time:', time + 'ms');