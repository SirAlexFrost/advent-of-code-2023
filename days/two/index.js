const input = require('./day-two-input').split('\n');

const gameLimits = {
    red: 12,
    green: 13,
    blue: 14
}

const idRegex = /(Game (\d+):)/;
const cubeRegex = /((\d+) (\w+))/g

const games = [];

let before = performance.now();

for (const line of input) {
    const id = Number(line.match(idRegex)[2]);

    // We now know the id of the game.
    const game = { id, red: 0, green: 0, blue: 0 };

    // Next work out the maximum amount of each colour cube in the bag.
    const cubesList = line.matchAll(cubeRegex);

    let done = false;
    while (!done) {
        const cubes = cubesList.next();

        if (cubes.done) {
            done = true;
            continue;
        }

        const colour = cubes.value[3];
        const amount = Number(cubes.value[2]);

        game[colour] = amount > game[colour] ? amount : game[colour];
    }
    games.push(game);
}

let after = performance.now();
let time = (after - before).toFixed(2);

const answerP1 = games.filter(game => (game.red <= gameLimits.red && game.blue <= gameLimits.blue && game.green <= gameLimits.green)).map(game => game.id).reduce((sum, curr) => sum + curr, 0);
console.log('P1 Result:', answerP1);
console.log('P1 Time:', time + 'ms');

// So I accidentally did the logic for P2 already, meaning I don't actually need to do anything other than multiply and sum.
before = performance.now();
const answerP2 = games.map(game => (game.red * game.blue * game.green)).reduce((sum, curr) => sum + curr, 0);
after = performance.now();

time = (after - before).toFixed(2);

console.log('P2 Answer:', answerP2);
console.log('P2 Time:', time + 'ms');