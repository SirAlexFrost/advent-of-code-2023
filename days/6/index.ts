import input from './day-six-input';

const lines = input.split('\n');

const races: Array<{ id: number, time: number, distance: number }> = [];

const numRegex = /(\d+)/g

let before = performance.now();

lines.forEach((line, i) => {
    if (i === 0) {
        const matches = line.match(numRegex)!;

        matches.forEach((time, i) => {
            const race = { id: i, time: Number(time), distance: 0 };
            races.push(race);
        });
    }
    if (i === 1) {
        const matches = line.match(numRegex)!;

        matches.forEach((distance, i) => {
            const race = races.filter(race => race.id === i)[0];
            race.distance = Number(distance);
        });
    }
});

const part1 = races.map(race => {

    let waysToWin = 0;

    for (let i = 0; i < race.time; i++) {
        const speed = 1 * i;
        const travelled = speed * (race.time - speed);
        if (travelled > race.distance) waysToWin++;
        continue;
    }

    return waysToWin;
}).reduce((sum, curr) => sum *= curr);

let after = performance.now();
let time = (after - before).toFixed(2);

console.log('P1 Result:', part1);
console.log('P1 Time:', time + 'ms');

before = performance.now();

const race = { time: 0, distance: 0 }
lines.forEach((line, i) => {

    const numbers = Number(line.match(numRegex)!.join(''));
    race[i === 0 ? 'time' : 'distance'] = numbers;

});

let part2 = 0;

for (let i = 0; i < race.time; i++) {
    if ((i * (race.time - i)) > race.distance) part2++;
    continue;
}

after = performance.now();
time = (after - before).toFixed(2);

console.log('P2 Result:', part2);
console.log('P2 Time:', time + 'ms');


