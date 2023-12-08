const input = require('./day-five-input').split('\n');

const rawSeeds = [];
const seeds = [];

const maps = {};

const numRegex = /(\d+)/g

const mapRegex = /((\w+) (map):)/

let currentMapName = '';
let currentMap;

let before = performance.now();

// Parse the input!
input.map((line, i) => {
    // If line 0 we know this is the seeds.
    if (i == 0) {
        const matches = line.match(numRegex);
        matches.forEach(seed => rawSeeds.push(seed));
        return;
    }

    // Is this line an indicator of a new map?
    const newMap = mapRegex.test(line);
    if (newMap) {
        const mapMatch = line.match(mapRegex);
        const mapName = mapMatch[2];

        currentMapName = mapName;
        maps[currentMapName] = [];
        return;
    }

    // We know from previous two lines this is not a new map, or the seeds line
    // Is this line populated with numbers?
    const numbers = line.match(numRegex);

    if (!numbers) return;

    const destinationStart = Number(numbers[0]);
    const sourceStart = Number(numbers[1]);
    const range = Number(numbers[2]);

    currentMap = maps[currentMapName];

    // Minus 1 from the range, as the range is inclusive;
    currentMap.push({
        destination: destinationStart,
        source: sourceStart,
        range: range,
        max: sourceStart + (range - 1)
    });
});

const getValueFromMap = (mapName, value) => {
    const map = maps[mapName].filter(map => value <= map.max && (value - map.source) >= 0)[0];
    if (!map) return value;

    const amountOver = value - map.source;
    return map.destination + amountOver;
};

const createSeed = (seed) => {

    const newSeed = {
        seed: Number(seed),
        soil: 0,
        fertilizer: 0,
        water: 0,
        light: 0,
        temperature: 0,
        humidity: 0,
        location: 0,
    }

    newSeed.soil = getValueFromMap('soil', newSeed.seed);
    newSeed.fertilizer = getValueFromMap('fertilizer', newSeed.soil);
    newSeed.water = getValueFromMap('water', newSeed.fertilizer);
    newSeed.light = getValueFromMap('light', newSeed.water);
    newSeed.temperature = getValueFromMap('temperature', newSeed.light);
    newSeed.humidity = getValueFromMap('humidity', newSeed.temperature);
    newSeed.location = getValueFromMap('location', newSeed.humidity);

    return newSeed;
}

const populateSeeds = (arrayToFill, rS) => {
    rS.map(seed => {
        arrayToFill.push(createSeed(seed));
    });
}

populateSeeds(seeds, rawSeeds);

let part1;
seeds.map(seed => seed.location).forEach(location => {
    if (!part1) {
        part1 = location;
        return;
    }

    if (part1 > location) {
        part1 = location;
        return;
    }
});

let after = performance.now();
let time = (after - before).toFixed(2);

console.log('P1 Result:', part1);
console.log('P1 Time:', time + 'ms');

before = performance.now();

const seedsLine = input[0];
const seedNums = seedsLine.match(numRegex);

let part2;
let amt = 0;
let processed = 0;
let total = 2482221626;

beforeDuring = performance.now();
for (let i = 0; i < seedNums.length; i += 2) {
    const seedStart = seedNums[i];
    const range = seedNums[i + 1];

    for (let j = 0; j < range; j++) {
        const seed = createSeed(Number(seedStart) + j);
        if (!part2) {
            part2 = seed.location;
            continue;
        }

        amt++;
        if (amt >= 1000000) {
            afterDuring = performance.now();
            let duringTime = (afterDuring - beforeDuring).toFixed(2);
            beforeDuring = performance.now();

            processed += amt;
            amt = 0;
            console.log(((processed / total) * 100).toFixed(2) + '% complete, block processed in', duringTime + 'ms');
        }

        if (part2 > seed.location) {
            part2 = seed.location;
            continue;
        }
    }
}

after = performance.now();
time = (after - before).toFixed(2);

console.log('P2 Result:', part2);
console.log('P2 Time:', time + 'ms');
