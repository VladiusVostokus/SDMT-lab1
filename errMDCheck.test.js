'use strict'; 

const errMDCheck = require('./errMDCheck.js');

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