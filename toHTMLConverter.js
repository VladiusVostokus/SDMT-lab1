'use strict';

const errMDCheck = require('./errMDCheck.js')

const toHTMLConverter = (text) => {

    if (text.trim() === '') return '';
    
    let err = errMDCheck(text);
    if (err !== undefined) throw err ;

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


const replaceFabric = (regExp, toReplace, replaceStart, replaceEnd) => {
    return (text) => {
        const matchedInfo = text.match(regExp);
        if (matchedInfo !== null) {
            const replacedStart = text.replace(toReplace, replaceStart);
            const replacedEnd = replacedStart.replace(toReplace,replaceEnd);
            return replacedEnd;
        }
        return null;
    }
};

const boldRegExp = /\*\*[^\s*]\w*\s*\w*[^\s*]\*\*/;
const italicRegExp = /_[^\s*]\w*\s*\w*[^\s*]_/; 
const monoRegExp = /`[^\s*]\w*\s*\w*[^\s*]`/; 

const replaceBold = replaceFabric(boldRegExp,'**', '<b>','</b>');
const replaceItalic = replaceFabric(italicRegExp,'_','<i>','</i>');
const replaceMono = replaceFabric(monoRegExp,'`','<tt>','</tt>')

const replaceAllBold = (text) => {
    let resultText = text;
    while (true) {
        const boldRes = replaceBold(resultText);
        if(boldRes === null) return resultText;
        resultText = boldRes;
    }
};

const replaceAllItalic = (text) => {
    let resultText = text;
    while (true) {
        const italicRes = replaceItalic(resultText);
        if(italicRes === null) return resultText;
        resultText = italicRes;
    }
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
