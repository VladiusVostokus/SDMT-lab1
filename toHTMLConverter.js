'use strict';

const toHTMLConverter = (text) => {
    const formed = bold(text)
    return formed;
}

const bold = (text) => {
    const boldRegExp = /^\*\*.*\*\*$/;
    const matchedInfo = text.match(boldRegExp);
    const matchedText = matchedInfo[0];
    const replacedStart = matchedText.replace('**','<b>');
    const replacedEnd = replacedStart.replace('**','</b>')
    return replacedEnd;
}

module.exports = toHTMLConverter;