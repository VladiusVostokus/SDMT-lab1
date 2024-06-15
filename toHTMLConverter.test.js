'use strict'; 

const toHTMLConverter = require('./toHTMLConverter.js');

const tests = [
    { description: "Simple bold", value: "**aaa**", expected: "<p><b>aaa</b></p>"},

    { description: "Simple italic", value: "_aaa_", expected: "<p><i>aaa</i></p>"},

    { description: "Simple monospaced", value: "`aaa`", expected: "<p><tt>aaa</tt></p>"},

    { description: "Simple preformatted", value:"```\naaa\n```", expected: "<p><pre>\naaa\n</pre></p>"},
];

for (const t of tests) {
    test(t.description, () => {
        expect(toHTMLConverter(t.value)).toBe(t.expected);
    });
}