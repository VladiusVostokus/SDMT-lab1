'use strict';

const toHTMLConverter = (text) => {
    errMDCheck(text);
    const formedBold = replaceAllBold(text);
    const formed = replaceAllItalic(formedBold);
    return formed;
};

const errMDCheck = (text) => {
    if (/\*\*`_([^`]+?)_`\*\*/.test(text)) {
        throw new Error('Invalid markup: Lines with the pattern are not allowed.');
    }
    if (/^_.*[^_]$/.test(text)) {
        throw new Error('Invalid markup: part of text beings with _ but not ends with it');
    }
    if (/^[A-Za-z0-9].*_$/.test(text)) {
        throw new Error('Invalid markup: part of text endss with _ but not begins with it');
    }
    if (/^[**].*[^**]$/.test(text)) {
        throw new Error('Invalid markup: part of text beings with ** but not ends with it');
    }
    if (/^[A-Za-z0-9].*[**]$/.test(text)) {
        throw new Error('Invalid markup: part of text endss with ** but not begins with it');
    } 
};

const replaceBold = (text) => {
    const boldRegExp = /\*\*([^\s*][^\*]*[^\s*])\*\*/; 
    const matchedInfo = text.match(boldRegExp);
    if (matchedInfo !== null) {
        const replacedStart = text.replace('**','<b>');
        const replacedEnd = replacedStart.replace('**','</b>');
        return replacedEnd;
    }
    return null;
};


const replaceAllBold = (text) => {
    let resultText = text;
    while (true) {
        const boldRes = replaceBold(resultText);
        if(boldRes === null) return resultText;
        resultText = boldRes;
    }
};

const replaceItalic = (text) => {
    const italicRegExp = /_.*_/; 
    const matchedInfo = text.match(italicRegExp);
    if (matchedInfo !== null) {
        const replacedStart = text.replace('_','<i>');
        const replacedEnd = replacedStart.replace('_','</i>');
        return replacedEnd;
    }
    return null;
};


const replaceAllItalic = (text) => {
    let resultText = text;
    while (true) {
        const italicRes = replaceItalic(resultText);
        if(italicRes === null) return resultText;
        resultText = italicRes;
    }
};

let matched = [];

const setMatch = (match) => {
    matched = match;
};

const findAndSavePref = (text) => {
    let result = text;
    const rx4 = /```.*?```/g;
    const matchedParts = result.match(rx4);
    setMatch(matchedParts);
    const saver = "@@@";
    for (const part of matchedParts) {
        result = result.replace(part, saver);
    }
    return result;
};

const replaceAllPref = (mathedParts) => {
    const result = mathedParts.slice(0);
    for (let i = 0; i < mathedParts.length; i++) {
        let part = result[i];
        part = part.replace('```','<pre>');
        part = part.replace('```','</pre>');
        result[i] = part;
    }
    return result;
};

const restorePrefs = (text, matchedParts) => {
    let result = text;
    for (const part of matchedParts) {
        result = result.replace("@@@", part);
    }
    return result;
};

module.exports = toHTMLConverter;


