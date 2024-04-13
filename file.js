'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt','utf-8');
const text = buffer.toString();

fs.writeFileSync('output.html', text);
//console.log(text);