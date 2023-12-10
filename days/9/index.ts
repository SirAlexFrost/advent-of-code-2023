import { test, input } from './day-9-input';

const lines = input.split('\n');

const part1 = lines.reduce((sum, curr) => {

    const nums = curr.split(' ').map(num => Number(num));

    const layers = [[...nums]];

    let layerIndex = 0;
    let done = false;
    while (!done) {
        const currentLayer = layers[layerIndex];
        const newLayer: number[] = [];

        for (let i = 1; i < currentLayer.length; i++) {
            const prevNum = currentLayer[i - 1];
            const thisNum = currentLayer[i];

            newLayer.push(thisNum - prevNum);
        }

        layers.push(newLayer);
        layerIndex++;

        done = newLayer.length === 1;
    }

    layers.reverse();

    for (let i = 1; i < layers.length; i++) {
        const lastDiff = layers[i - 1][layers[i - 1].length - 1];
        layers[i].push(layers[i][layers[i].length - 1] + lastDiff);
    }

    sum += layers[layers.length - 1][layers[layers.length - 1].length - 1];

    return sum;
}, 0);

console.log('P1 Result:', part1);

const part2 = lines.reduce((sum, curr) => {

    const nums = curr.split(' ').map(num => Number(num));

    const layers = [[...nums]];

    let layerIndex = 0;
    let done = false;
    while (!done) {
        const currentLayer = layers[layerIndex];
        const newLayer: number[] = [];

        for (let i = 1; i < currentLayer.length; i++) {
            const prevNum = currentLayer[i - 1];
            const thisNum = currentLayer[i];

            newLayer.push(thisNum - prevNum);
        }

        layers.push(newLayer);
        layerIndex++;

        done = newLayer.length === 1;
    }

    layers.reverse();

    for (let i = 1; i < layers.length; i++) {
        const lastDiff = layers[i - 1][0];
        layers[i].unshift(layers[i][0] - lastDiff);
    }

    sum += layers[layers.length - 1][0];

    return sum;
}, 0);

console.log('P2 Result:', part2);