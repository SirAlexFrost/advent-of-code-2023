import { test, input } from './day-10-input';

const lines = test.split('\n');

const width = lines[0].length;

type Coord = {
    x: number
    y: number
    type: string
    distance?: number
}

const loop: Coord[] = []

const options = {
    'up': ['|', '7', 'F', 'S'],
    'down': ['|', 'J', 'L', 'S'],
    'right': ['-', '7', 'J', 'S'],
    'left': ['-', 'L', 'F', 'S']
}

const travel: (current: Coord, previous?: Coord) => Coord = (current: Coord, previous?: Coord) => {
    const up = current.y - 1 >= 0 ? lines[current.y - 1][current.x] : 'X';
    const down = current.y + 1 < lines.length ? lines[current.y + 1][current.x] : 'X';
    const left = current.x - 1 >= 0 ? lines[current.y][current.x - 1] : 'X';
    const right = current.x + 1 < width ? lines[current.y][current.x + 1] : 'X';

    let nextCoord: Coord = { x: -1, y: -1, type: 'broken' };

    if (!previous) {
        if (options['up'].includes(up))
            nextCoord = { x: current.x, y: current.y - 1, type: up };

        if (options['down'].includes(down))
            nextCoord = { x: current.x, y: current.y + 1, type: down };

        if (options['left'].includes(left))
            nextCoord = { x: current.x - 1, y: current.y, type: left }

        if (options['right'].includes(right))
            nextCoord = { x: current.x + 1, y: current.y, type: right }
    }

    if (!previous) return nextCoord;

    const xOrigin = current.x - previous.x;
    const yOrigin = current.y - previous.y;

    if (xOrigin !== 0) {
        const fromRight = xOrigin > 0;
        const across = current.type === '-';
        if (across) return { x: current.x + xOrigin, y: current.y, type: fromRight ? right : left };

        if (fromRight) {
            const goUp = current.type === 'J';
            if (goUp) return { x: current.x, y: current.y - 1, type: up };

            const goDown = current.type === '7';
            if (goDown) return { x: current.x, y: current.y + 1, type: down };
        } else {
            const goUp = current.type === 'L';
            if (goUp) return { x: current.x, y: current.y - 1, type: up };

            const goDown = current.type === 'F';
            if (goDown) return { x: current.x, y: current.y + 1, type: down };
        }
    }

    if (yOrigin !== 0) {
        const fromBelow = yOrigin < 0;
        const vertical = current.type === '|';

        if (vertical) return { x: current.x, y: current.y + yOrigin, type: fromBelow ? up : down };

        if (fromBelow) {
            const goRight = current.type === 'F';
            if (goRight) return { x: current.x + 1, y: current.y, type: right };

            const goLeft = current.type === '7';
            if (goLeft) return { x: current.x - 1, y: current.y, type: left };
        } else {
            const goRight = current.type === 'L';
            if (goRight) return { x: current.x + 1, y: current.y, type: right };

            const goLeft = current.type === 'J';
            if (goLeft) return { x: current.x - 1, y: current.y, type: left };
        }
    }

    return nextCoord;
}

// Calculate the loop 
lines.forEach((line, i) => {
    const start = line.indexOf('S');
    if (start === -1) return;

    const startCoord: Coord = { x: start, y: i, type: line[start] }
    loop.push(startCoord);

    let done = false;
    while (!done) {
        const prevCoord = loop[loop.length - 2];
        const curCoord = loop[loop.length - 1];
        const nextCoord = travel(curCoord, prevCoord);
        if (nextCoord.type === 'S') {
            done = true;
        }

        loop.push(nextCoord);
    }

    // Double pointer loop
    const j = loop.length - 1;
    for (let i = 0; i < Math.ceil(loop.length / 2); i++) {
        const coordA = loop[i];
        const coordB = loop[j - i];

        coordA.distance = i;
        coordB.distance = i;

        if (coordA === coordB) {
            break;
        }
    }
});

const part1 = loop.reduce((highest, curr) => {
    if (curr.distance! > highest) highest = curr.distance!;
    return highest;
}, 0)

console.log('P1 Result:', part1);
