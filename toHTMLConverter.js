'use strict';

const toHTMLConverter = (text) => {
    errMDCheck(text)
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
}

const replaceBold = (text) => {
    const boldRegExp = /\w*\*\*.*\*\*$/; 
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

module.exports = toHTMLConverter;

/*
const convertBold = (text) => {
    const boldRegExp = /\w*\*\*.*\*\*$/g;
    const matchedInfo = text.match(boldRegExp);
    let resultText;
    let isStart = true;
    
    if (isStart) {
        resultText = resultText.replace("**","<b>");
        isStart = false;
    }
    else {
        resultText = resultText.replace("**","</b>");
    }
};
*/

