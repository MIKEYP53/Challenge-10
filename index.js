const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

// Function to generate SVG file
function generateSVG(shapeInstance, text, textColor) {
  const shapeSVG = shapeInstance.render();
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeSVG}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;
  return svgContent.trim();
}

// Prompt user for input
inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters of text:',
    validate: (input) => input.length <= 3 || 'Text must be 3 characters or fewer.'
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
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal):'
  }
])
.then(answers => {
  const { text, textColor, shape, shapeColor } = answers;
  let shapeInstance;

  switch (shape) {
    case 'Circle':
      shapeInstance = new Circle();
      break;
    case 'Triangle':
      shapeInstance = new Triangle();
      break;
    case 'Square':
      shapeInstance = new Square();
      break;
  }

  shapeInstance.setColor(shapeColor);

  // Generate SVG content
  const svgContent = generateSVG(shapeInstance, text, textColor);

  // Write the SVG content to a file
  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
})
.catch(error => {
  console.error('Error generating logo:', error);
});