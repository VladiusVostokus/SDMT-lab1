'use strict';

const toHTMLConverter = (text) => {
    errMDCheck(text);
    const prefRes = findAndSavePref(text);
    const replacedPrefs = replaceAllPref(matchedPrefs);

    const pargRes = findAndSavePargs(prefRes);
    const replacedPars = replaceAllParg(matchedPargs);
    const formedPargs = restorePargs(pargRes,replacedPars);
    const removedEmptyLines = removeEmptyLines(formedPargs)

    const formedBold = replaceAllBold(removedEmptyLines);
    const formedItalic = replaceAllItalic(formedBold);
    const formedMono = replaceAllMono(formedItalic);

    if (replacedPrefs === null) {
        return formedMono;
    }

    const formedPrefs = restorePrefs(formedMono, replacedPrefs);
    return formedPrefs;
};

const errMDCheck = (text) => {
    if (/\*\*`_([^`]+?)_`\*\*/.test(text)) {
        throw new Error('Invalid markup: Lines with the pattern are not allowed.');
    }
    if (/``` *[^\s]| *[^\s] *q```/.test(text)) { 
        throw new Error('Invalid markup: incorrect preformatting');
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
    const boldRegExp = /\*\*([^\s*][^\s]*)\*\*/; 
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
    const italicRegExp = /_([^\s*][^\s]*)_/; 
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

const replaceMono = (text) => {
    const monoRegExp = /`([^\s*][^\s]*)`/; 
    const matchedInfo = text.match(monoRegExp);
    if (matchedInfo !== null) {
        const replacedStart = text.replace('`','<tt>');
        const replacedEnd = replacedStart.replace('`','</tt>');
        return replacedEnd;
    }
    return null;
};


const replaceAllMono = (text) => {
    let resultText = text;
    while (true) {
        const monoRes = replaceMono(resultText);
        if(monoRes === null) return resultText;
        resultText = monoRes;
    }
};

let matchedPrefs = [];

const setMatchedPrefs = (match) => {
    matchedPrefs = match;
};

const findAndSavePref = (text) => {
    let result = text;
    const prefRegExp = /```[\s\S]*?```/g;
    const matchedPrefParts = result.match(prefRegExp);
    if (matchedPrefParts === null) {
        return result
    }
    setMatchedPrefs(matchedPrefParts);
    const saver = "@@@";
    for (const part of matchedPrefParts) {
        result = result.replace(part, saver);
    }
    return result;
};

const replaceAllPref = (matchedPrefParts) => {
    const result = matchedPrefParts.slice(0);
    for (let i = 0; i < matchedPrefParts.length; i++) {
        let part = result[i];
        part = part.replace('```','<pre>');
        part = part.replace('```','</pre>');
        result[i] = part;
    }
    return result;
};

const restorePrefs = (text, matchedPrefParts) => {
    let result = text;
    for (const part of matchedPrefParts) {
        result = result.replace("@@@", part);
    }
    return result;
};

let matchedPargs = [];

const setMatchedPargs = (match) => {
    matchedPargs = match;
};

const findAndSavePargs = (text) => {
    let result = text;
    const parRegExp = /([^\r\n]+(?:\r?\n[^\r\n]+)*)/g;
    const mathedPargParts = result.match(parRegExp);
    setMatchedPargs(mathedPargParts);
    const saver = "&&&";
    for (const part of mathedPargParts) {
        result = result.replace(part, saver);
    }
    return result;
};

const replaceAllParg = (mathedPargParts) => {
    const result = mathedPargParts.slice(0);
    for (let i = 0; i < mathedPargParts.length; i++) {
        let part = result[i];
        part = "<p>" + part;
        part = part + "</p>\n";
        result[i] = part;
    }
    return result;
};

const restorePargs = (text, mathedPargParts) => {
    let result = text;
    for (const part of  mathedPargParts) {
        result = result.replace("&&&", part);
    }
    return result;
};

const removeEmptyLines = (text) => {
    const lines = text.split('\n');
    const noEmpryLines = lines.filter((line) => line.trim() !== '');
    const resultString = noEmpryLines.join('\n');
    return resultString;
};

module.exports = toHTMLConverter;
