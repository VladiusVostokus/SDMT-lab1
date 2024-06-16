'use strict';

const fs = require('fs');
const toHTMLConverter = require('./toHTMLConverter.js');
const outputter = require('./outputter.js');

const consoleArgs = process.argv;
const input = consoleArgs[2];
let buffer, text, result;
try {
    buffer = fs.readFileSync(input,'utf-8');
    text = buffer.toString();
} catch(err){
    console.error("invalid markdown", err);
}

result = toHTMLConverter(text);
outputter(consoleArgs, result);
