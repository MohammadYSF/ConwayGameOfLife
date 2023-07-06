let w = 10;
// An array of 0s and 1s
let cells;

// We arbitrarily start with just the middle cell having a state of "1"
let generation = 0;

// An array to store the ruleset, for example {0,1,1,0,1,1,0,1}
let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

function setup() {
  createCanvas(window.innerWidth, 600);

  inp = createInput();
  inp.position(60, 300);
  inp.input(myInputEvent);
  inp.attribute("placeholder", "type the 8 bit binary number");
  inp.value("10100101");
  console.log(inp)
  button = createButton('stack generations');
  button.class("btn btn-sm btn-primary")
  button.position(inp.x + inp.width, inp.y);
  button.mousePressed(onRunButtonPressed)
  cells = Array(floor(width / w));
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }

  cells[Math.floor(cells.length / 2)] = 1;


}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 1) {

      fill(55);
      rect(i * w, generation * w, w, w);

    } else {
      stroke(150);
      fill(255);
      rect(i * w, generation * w, w, w);

    }
  }
  if (generation < height / w) {
    generate();
  }
}
function onRunButtonPressed() {
  cells = Array(floor(width / w));
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }
  cells[Math.floor(cells.length / 2)] = 1;
  generation = 0;

  console.log("ruleset:", ruleset);
}
function myInputEvent() {
  if (this.value().length == 8) {
    if (containsOnlyZeroAndOne(this.value())) {

      ruleset = this.value().split('').map(a => Number.parseInt(a));
    }
    else {
      alert("only enter binary numbers");
    }


  }

}
// The process of creating the new generation
function generate() {
  // First we create an empty array for the new values
  let nextgen = Array(cells.length);
  // For every spot, determine new state by examing current state, and neighbor states
  // Ignore edges that only have one neighor
  for (let i = 1; i < cells.length - 1; i++) {
    let left = cells[i - 1];   // Left neighbor state
    let me = cells[i];     // Current state
    let right = cells[i + 1];   // Right neighbor state
    nextgen[i] = rules(left, me, right); // Compute next generation state based on ruleset
  }
  // The current generation is the new generation
  cells = nextgen;
  generation++;
}


// Implementing the Wolfram rules
// Could be improved and made more concise, but here we can explicitly see what is going on for each case
function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}

function containsOnlyZeroAndOne(str) {
  // Iterate through each character in the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // Check if the character is not '0' or '1'
    if (char !== '0' && char !== '1') {
      return false; // Return false if an invalid character is found
    }
  }

  return true; // Return true if all characters are valid ('0' or '1')
}