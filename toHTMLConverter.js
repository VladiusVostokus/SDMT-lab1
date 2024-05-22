'use strict';

const toHTMLConverter = (text) => {
    errMDCheck(text)
    const formed = replaceAllBold(text);
    return formed;
};

const errMDCheck = (text) => {
    if (/\*\*`_([^`]+?)_`\*\*/.test(text)) {
        throw new Error('Invalid input: Lines with the pattern are not allowed.');
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

