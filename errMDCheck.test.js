'use strict'; 

const errMDCheck = require('./errMDCheck.js');

test("Nested markup", () => {
    expect(errMDCheck(" **`_text_`** "))
    .toEqual(new Error('Invalid markup: Lines with the pattern are not allowed.'));
});

const prefTests = [
    { description: "Right Preformatted", value: "```\nSometext\n```" , expected: undefined },

    { description: "Wrong first quotation marks 1", value: "```dadsa\nSometext\n```" , 
        expected: new Error('Invalid markup: incorrect preformatting') },

    { description: "Wrong first quotation marks 2", value: "dadsa```\nSometext\n```" , 
        expected: new Error('Invalid markup: incorrect preformatting') }, 

    { description: "Wrong first quotation marks 3", value: "```  dadsa\nSometext\n```" , 
        expected: new Error('Invalid markup: incorrect preformatting') }, 

    { description: "Wrong first quotation marks 4", value: "dasda ```\nSometext\n```" , 
        expected: new Error('Invalid markup: incorrect preformatting') }, 

    { description: "Wrong second quotation marks 1", value: "```\nSometext\ndasd```" , 
        expected: new Error('Invalid markup: incorrect preformatting') },

    { description: "Wrong second quotation marks 2", value: "dadsa```\nSometext\n```dasdas" , 
        expected: new Error('Invalid markup: incorrect preformatting') }, 

    { description: "Wrong second quotation marks 3", value: "```  dadsa\nSometext\n asdd ```" , 
        expected: new Error('Invalid markup: incorrect preformatting') }, 

    { description: "Wrong second quotation marks 4", value: "dasda ```\nSometext\n``` dasdas" , 
        expected: new Error('Invalid markup: incorrect preformatting') }, 
];

for (const t of prefTests) {
    test(t.description, () => {
        expect(errMDCheck(t.value)).toEqual(t.expected);
    });
}

const boldTests = [
    { description: "Right bold", value: `**text**` , expected: undefined },

    { description: "Right bold 2", value: ` ** ` , expected: undefined },

    { description: "Starts but not ends bold", value: ` **text ` , 
        expected: new Error('Invalid markup: part of text beings with ** but not ends with it')},

    { description: "Ends but not starts bold", value: ` text** `, 
        expected: new Error('Invalid markup: part of text endss with ** but not begins with it')},
    
    { description: "Ends but not starts + correc part", value: ` dasdas** **dasdsad** `, 
        expected: new Error('Invalid markup: part of text endss with ** but not begins with it')},
];

for (const t of boldTests) {
    test(t.description, () => {
        expect(errMDCheck(t.value)).toEqual(t.expected);
    });
}

const italicTests = [
    { description: "Right italic", value: `_text_` , expected: undefined },

    { description: "Right italic 2", value: ` _ ` , expected: undefined },

    { description: "Right italic 3", value: ` dadsa_dadas ` , expected: undefined },

    { description: "Starts but not ends italic", value: ` _text ` , 
        expected: new Error('Invalid markup: part of text beings with _ but not ends with it')},

    { description: "Ends but not starts italic", value: ` text_ `, 
        expected: new Error('Invalid markup: part of text endss with _ but not begins with it')},
];

for (const t of italicTests) {
    test(t.description, () => {
        expect(errMDCheck(t.value)).toEqual(t.expected);
    });
}
