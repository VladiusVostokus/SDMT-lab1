'use strict'; 

const toHTMLConverter = require('./toHTMLConverter.js');

const tests = [
    { description: "Empty string", value: " ", expected: ""},

    { description: "Simple bold", value: "**aaa**", expected: "<p><b>aaa</b></p>"},

    { description: "Simple italic", value: "_aaa_", expected: "<p><i>aaa</i></p>"},

    { description: "Simple monospaced", value: "`aaa`", expected: "<p><tt>aaa</tt></p>"},

    { description: "Simple preformatted", value:"```\naaa\n```", expected: "<p><pre>\naaa\n</pre></p>"},

    { description: "Complicated", 
        value:"```\nSome are born great\n\n**da da**\n\n```\nвфівфі\nвфівіф\n**dasda**\n\nsome achieve , `dasdas`\nand have _greatness_ thrust them.", 
        expected:
`<p><pre>
Some are born great

**da da**

</pre>
вфівфі
вфівіф
<b>dasda</b></p>
<p>some achieve , <tt>dasdas</tt>
and have <i>greatness</i> thrust them.</p>`
    },
];

for (const t of tests) {
    test(t.description, () => {
        expect(toHTMLConverter(t.value)).toBe(t.expected);
    });
}