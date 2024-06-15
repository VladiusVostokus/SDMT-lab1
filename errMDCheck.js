'use strict';


const errMDCheck = (text) => {
    if (/\*\*`_([^`]+?)_`\*\*/.test(text)) {
        return new Error('Invalid markup: Lines with the pattern are not allowed.');
    }
    if (/``` *[^\s]| *[^\s] *```/.test(text)) { 
        return new Error('Invalid markup: incorrect preformatting');
    }
    if (/^_.*[^_]$/.test(text)) {
        return new Error('Invalid markup: part of text beings with _ but not ends with it');
    }
    if (/^[A-Za-z0-9].*_$/.test(text)) {
        return new Error('Invalid markup: part of text endss with _ but not begins with it');
    }
    if (/^[**].*[^**]$/.test(text)) {
        return new Error('Invalid markup: part of text beings with ** but not ends with it');
    }
    if (/^[A-Za-z0-9].*[**]$/.test(text)) {
        return new Error('Invalid markup: part of text endss with ** but not begins with it');
    } 
};

module.exports = errMDCheck;