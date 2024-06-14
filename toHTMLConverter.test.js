'use strict'; 

const tests = [
    { description: "some test", value: "a", expected: "a"},
];

for (const t of tests) {
    test(t.description, () => {
        expect(t.value).toBe(t.expected);
    });
}