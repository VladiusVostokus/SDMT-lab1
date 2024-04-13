'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt','utf-8');
const text = buffer.toString();

console.log(text);