import { test, input } from './day-8-input';

const lines = input.split('\n');

const instructions = lines.splice(0, 2)[0].split('');

const mapRegex = /(([\w]{3}) = \(([\w]{3}), ([\w]{3})\))/

type Node = {
    left: string,
    right: string
}

const map: { [index: string]: Node } = {};

lines.forEach(line => {
    const matches = line.match(mapRegex)!;
    map[matches[2]] = { left: matches[3], right: matches[4] }
});

const getInstruction: (index: number) => 'left' | 'right' = (index: number) => {
    return instructions[index] === 'R' ? 'right' : 'left';
}

const travel = (node: string, direction: 'left' | 'right') => {
    return map[node][direction];
}

const firstInstruction = getInstruction(0);

const part1 = () => {
    let done = false;
    let node = 'AAA';
    let instruction = firstInstruction;
    let step = 0;
    while (!done) {
        const next = travel(node, instruction);
        step++;

        node = next;
        instruction = getInstruction(step % instructions.length);

        if (node === 'ZZZ') done = true;
    }

    return step;
}

console.log('P1 Result:', part1());

const nodes = Object.keys(map);

const nodesEndingWithA = nodes.filter(node => node[2] === 'A');

const travelFrom = async (from: string) => {
    let done = false;
    let step = 0;
    let node = from;
    let instruction = firstInstruction;

    while (!done) {
        const next = travel(node, instruction);
        step++;

        node = next;
        instruction = getInstruction(step % instructions.length);

        if (node[2] === 'Z') done = true;
    }

    return step;
}

/*

    Sorry, I absolutely cheated here.
    I would not have thought of LCM on my own,
    even though once you know,
    its super obvious!

*/

const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
const lcm = (arr: number[]) => arr.reduce((x, y) => (x * y) / gcd(x, y));

const part2 = async () => {

    const runs: Array<Promise<number>> = []
    const steps: number[] = []

    nodesEndingWithA.forEach(async (node) => {
        runs.push(travelFrom(node));
    });

    for (const run of runs) {
        steps.push(await run);
    }

    console.log('P2 Result:', lcm(steps));
}

part2();