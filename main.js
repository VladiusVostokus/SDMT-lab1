'use strict';

const fs = require('fs');
const toHTMLConverter = require('./toHTMLConverter.js');

const consoleArgs = process.argv;
const input = consoleArgs[2];
let buffer, text, result;
try {
    buffer = fs.readFileSync(input,'utf-8');
    text = buffer.toString();
    result = toHTMLConverter(text);
} catch(err){
    console.error("invalid markdown", err)
}

if (consoleArgs.includes('--out')) {
    try {
    const outIndex = consoleArgs.indexOf('--out')
    const output = consoleArgs[outIndex + 1]
    fs.writeFileSync(output, result);
    } catch(err) {
        console.error("invalid html", err)
    }
}
else {
    console.log(result);
}

//aaaaaaaaaaaaaaaaaaaaaa
