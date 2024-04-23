'use strict';

const toHTMLConverter = (text) => {
    const formed = replaceAllBold(text);
    return formed;
};

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

module.exports = toHTMLConverter;