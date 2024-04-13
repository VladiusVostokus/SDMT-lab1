'use strict';

const fs = require('fs');

const consoleArgs = process.argv;
const input = consoleArgs[2];
let buffer, text;
try {
    buffer = fs.readFileSync(input,'utf-8');
    text = buffer.toString();
} catch(err){
    console.error("invalid markdown", err)
}

if (consoleArgs.includes('--out')) {
    try {
    const outIndex = consoleArgs.indexOf('--out')
    const output = consoleArgs[outIndex + 1]
    fs.writeFileSync(output, text);
    } catch(err) {
        console.error("invalid html", err)
    }
}
else {
    console.log(text);
}
