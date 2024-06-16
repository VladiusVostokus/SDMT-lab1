'use strict';

const outputter = require("./outputter");

const consoleArgs = ['node','.//main.js','.//input.md'];
const consoleArgsFormat = ['node','.//main.js','.//input.md','--format=format'];
const consoleArgsHTML = ['node','.//main.js','.//input.md','--format=html'];
const consoleArgsErr = ['node','.//main.js','.//input.md','--format=txt'];
const result = 'Result text';

afterEach(() => {
    jest.clearAllMocks();
});

console.log = jest.fn();
console.error = jest.fn();
process.exit = jest.fn();

test("No --format=", () => {
    outputter(consoleArgs, result);
    expect(console.log).toHaveBeenCalledWith('\x1b[7m%s\x1b[0m', result);
});

test("--format=format", () => {
    outputter(consoleArgsFormat, result);
    expect(console.log).toHaveBeenCalledWith('\x1b[7m%s\x1b[0m', result);
});

test("--formatted=html", () => {
    outputter(consoleArgsHTML, result);
    expect(console.log).toHaveBeenCalledWith(result);
});

test("Incorrect format", () => {
    outputter(consoleArgsErr, result);
    expect(console.error).toHaveBeenCalledWith("Wrong format for --format=");
    expect(process.exit).toHaveBeenCalledWith(0);
});