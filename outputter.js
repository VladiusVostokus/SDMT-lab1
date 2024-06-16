'use strict';

const fs = require('fs');

const outputter = (consoleArgs, result) => {
    if (consoleArgs.includes('--out')) {
        try {
        const outIndex = consoleArgs.indexOf('--out')
        const output = consoleArgs[outIndex + 1]
        fs.writeFileSync(output, result);
        } catch(err) {
            console.error("invalid html", err);
        }
    }
    else {
        const formatIndex = consoleArgs.findIndex((arg) => arg.startsWith('--format='));
        if (formatIndex !== -1) {
            const format = consoleArgs[formatIndex];
            const formatType = format.split('=');
            if (formatType[1] === 'html') console.log(result);
            else {
                if (formatType[1] === 'format') console.log('\x1b[7m%s\x1b[0m', result);
                else console.error("Wrong format for --format=");
                process.exit(0);
            }
        }
        console.log('\x1b[7m%s\x1b[0m', result);
    }
};

module.exports = outputter;