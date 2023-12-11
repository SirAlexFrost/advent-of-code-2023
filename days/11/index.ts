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

lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
        const char = line[x];
        if (char !== '#') continue;
        galaxies.push({ id: galaxies.length + 1, x, y });
    }
});

const distance = (galaxy: Galaxy, otherGalaxy: Galaxy, scale: number) => {

    let lowerX = galaxy.x < otherGalaxy.x;
    let lowerY = galaxy.y < otherGalaxy.y;

    let dx = 0;
    let dy = 0;

    let xExpands = 0;
    let yExpands = 0;

    for (let x = (lowerX ? galaxy.x : otherGalaxy.x); x < (lowerX ? otherGalaxy.x : galaxy.x); x++) {
        const hasGalaxy = findGalaxyInX(x);
        dx++;
        if (hasGalaxy) continue;
        xExpands++;
        dx--;
    }

    for (let y = (lowerY ? galaxy.y : otherGalaxy.y); y < (lowerY ? otherGalaxy.y : galaxy.y); y++) {
        const hasGalaxy = findGalaxyInY(y);
        dy++;
        if (hasGalaxy) continue;
        yExpands++;
        dy--;
    }

    return dx + dy + (scale * xExpands) + (scale * yExpands);
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