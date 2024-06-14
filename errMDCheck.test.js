'use strict'; 

const tests = [
    { description: "some test", value: "b", expected: "b"},
];

for (const t of tests) {
    test(t.description, () => {
        expect(t.value).toBe(t.expected);
    });
}