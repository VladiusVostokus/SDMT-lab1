# A program that converts markdown markup to html markup

## How to use

> [!IMPORTANT]
> To use code, you need Node.js 18.x+ to be installed on your PC.

Clone this repo to use on local machine.
```bash
git clone https://github.com/VladiusVostokus/SDMT-lab1
```

than write
```bash
npm i
```
to install dependencies

Write in your code
```JS
import toHTMLConverter from './toHTMLConverter.js';
or
const toHTMLConverter = require('./toHTMLConverter.js');
```

To use it as a function separately write in your code:
```JS
const htmlResult = toHTMLConverter(markdownText);
```
Function will return converted html text.

To use whole program to convert write in console:
```bash
# This will create or modify existing myfile.html
node main.js \\path\\to\\valid\\markdown --out myfile.html

# To output result in console:
node main.js /path/to/valid/markdown

# use keys
--format=value to choose format of output
# if value = formatted - output in reversed mode
# if value = html - output in html mode
```

To run tests
```bash
npm test
```

Revert commit here => [link](https://github.com/VladiusVostokus/SDMT-lab1/commit/6f77044474ae2a0048b271a04783670ef5522a7b)
Failed test here => [link](https://github.com/VladiusVostokus/SDMT-lab1/commit/e35734b634dcae1ec2cb35d0c7257ec094e4f9ab)

## Conclusions
Writing test for my program has different degrees of benefit depends on tested modules. When I wrote first tests (for converter and error checker) I generaly knew about the behavior of my program, so testing functionality wasn't very useful at this stage. But it helps me to make components of my program more modular. When I added and fixed some functionality tests help me, so I haven't to check program by lauching it from console every time. When I wrote test for outputter, In my opinion it's easier to test it in console, than write test, but this was the first time I wrote test to check that some part was called with these arguments and it was interenting. 
CI, in my opinion isn't suitable for this project, because I can just write "npm test" and get the results. Also, I don't want to push to repo every commit, however it's nice to see the successful results of the build.

To sum up, I get practice in writing tests, they help me to make my program more modular, help check fixes and new features and make my program simpler to refactor, so writing tests was useful for me.
