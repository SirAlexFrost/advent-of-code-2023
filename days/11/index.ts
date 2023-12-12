import { test, input } from './day-11-input';

const lines = input.split('\n');

let before = performance.now();

const findGalaxyInX = (x: number) => {
    return lines.filter(line => line[x] === '#').length > 0;
};

const findGalaxyInY = (y: number) => {
    return lines[y].includes('#');
}

type Galaxy = {
    id: number
    x: number
    y: number
}

const galaxies: Galaxy[] = [];

const emptyRows: boolean[] = [];
const emptyColumns: boolean[] = [];

lines.forEach((line, y) => {
    let isEmpty = true;
    for (let x = 0; x < line.length; x++) {
        const char = line[x];
        if (char !== '#') continue;
        galaxies.push({ id: galaxies.length + 1, x, y });
        isEmpty = false;
    }
    emptyRows.push(isEmpty);
});

for (let x = 0; x < lines[0].length; x++) {
    const isEmpty = lines.filter(line => line[x] === '#').length === 0
    emptyColumns.push(isEmpty);
}

const getExpansionsX = (arr: number[]) => {
    return arr.map(i => emptyColumns[i]).filter(val => val === true).length;
}

const getExpansionsY = (arr: number[]) => {
    return arr.map(i => emptyRows[i]).filter(val => val === true).length;
}

const distance = (galaxy: Galaxy, otherGalaxy: Galaxy, scale: number) => {
    const dX = Math.abs(otherGalaxy.x - galaxy.x);
    const dY = Math.abs(otherGalaxy.y - galaxy.y);

    const xSpan: number[] = [];
    for (let i = 0; i < dX; i++) { xSpan.push((Math.min(galaxy.x, otherGalaxy.x) + 1) + i) }

    const ySpan: number[] = [];
    for (let i = 0; i < dY; i++) { ySpan.push((Math.min(galaxy.y, otherGalaxy.y) + 1) + i) }

    const expansionsX = getExpansionsX(xSpan);
    const expansionsY = getExpansionsY(ySpan);

    return (dX - expansionsX) + (dY - expansionsY) + (expansionsX * scale) + (expansionsY * scale);
};

const getDistances = (scale: number) => {
    return galaxies.map((galaxy, i) => {
        let total = 0;

        for (let j = i + 1; j < galaxies.length; j++) {
            const otherGalaxy = galaxies[j];
            total += distance(galaxy, otherGalaxy, scale);
        }

        return total;
    }).reduce((sum, curr) => sum += curr, 0);
}

const part1 = getDistances(2);

let after = performance.now();
let time = (after - before).toFixed(2) + 'ms';

console.log('P1 Result:', part1);
console.log('P1 Time:', time);

before = performance.now();

const part2 = getDistances(1000000);

after = performance.now();
time = (after - before).toFixed(2) + 'ms';

console.log('P2 Result:', part2);
console.log('P2 Time:', time);