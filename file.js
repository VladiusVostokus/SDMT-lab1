'use strict';

const fs = require('fs');

const consoleArgs = process.argv;
const input = consoleArgs[2];
const buffer = fs.readFileSync(input,'utf-8');
const text = buffer.toString();

if (consoleArgs.includes('--out')) {
    const outIndex = consoleArgs.indexOf('--out')
    const output = consoleArgs[outIndex + 1]
    fs.writeFileSync('output.html', text);
}
else {
    console.log(text);
}
