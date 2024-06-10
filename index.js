const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes');

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo (up to 3 characters):',
        validate: input => input.length <= 3 || 'Text must be 3 characters or less'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or hexadecimal):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['Triangle', 'Circle', 'Square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or hexadecimal):'
    }
];

inquirer.prompt(questions).then(answers => {
    const { text, textColor, shape, shapeColor } = answers;

    let shapeInstance;
    switch (shape) {
        case 'Triangle':
            shapeInstance = new Triangle();
            break;
        case 'Circle':
            shapeInstance = new Circle();
            break;
        case 'Square':
            shapeInstance = new Square();
            break;
    }
    shapeInstance.setColor(shapeColor);

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    ${shapeInstance.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;

    fs.writeFileSync('logo.svg', svgContent.trim());
    console.log('Generated logo.svg');
});
