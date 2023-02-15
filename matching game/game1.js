// ask whats the purpose of parent.node
var cardsArray = [
  {
    name: "CSS",
    img: "https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true",
  },
  {
    name: "HTML",
    img: "https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true",
  },
  {
    name: "jQuery",
    img: "https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true",
  },
  {
    name: "JS",
    img: "https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true",
  },
  {
    name: "Node",
    img: "https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true",
  },
  {
    name: "Photo Shop",
    img: "https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true",
  },
  {
    name: "PHP",
    img: "https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true",
  },
  {
    name: "Python",
    img: "https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true",
  },
  {
    name: "Ruby",
    img: "https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true",
  },
  {
    name: "Sass",
    img: "https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true",
  },
  {
    name: "Sublime",
    img: "https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true",
  },
  {
    name: "Wordpress",
    img: "https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true",
  },
];

// Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray); // concat helps to duplicate by first one is where we want to add and second one is what to add

// this makes it so that the next time game grid choses a card it gets randomized
gameGrid.sort(function () {
  return 0.5 - Math.random(); // math choses a random number between 0- any number less then 1
});

// this targets the game board id in html which is the root of the entire code
var game = document.getElementById("game-board");
// with this we create a element which is section basically how the images would be put
var grid = document.createElement("section");
// with this we set it so our section will have the class of grids which make it look like cards
grid.setAttribute("class", "grid");
// this will send the code to html
game.appendChild(grid);

// Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++) {
  // create a div element and assign to variable card
  var card = document.createElement("div"); // it works only when css styling is applied
  // Apply a card class to that div
  card.classList.add("card");
  // from this we access the cards so they get put on the page
  card.dataset.name = gameGrid[i].name;

  // Create front of card
  var front = document.createElement("div");
  front.classList.add("front"); // this is done in css not explained

  // Create back of card
  var back = document.createElement("div");
  back.classList.add("back"); // in css
  back.style.backgroundImage = `url(${gameGrid[i].img})`; //this takes the url of the image in our cards array

  // Append card to grid
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

var firstGuess = "";
var secondGuess = "";
// Set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200; // gives delay to guesses

// Add match CSS
var match = function () {
  var selected = document.querySelectorAll(".selected");
  // loop through the array like object containing `selected` class
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add("match"); // will make the cards disappear
  } // used to add style to js from css
};

// Reset guesses after two attempts
var resetGuesses = function () {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null; // makes it so u cant click the same value twice
  //add match css
  var selected = document.querySelectorAll(".selected");
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove("selected"); // this makes so card is flipped back again
  }
};

// Add event listener to grid
grid.addEventListener("click", function (event) {
  // Declare variable to target our clicked item
  var clicked = event.target;
  // Do not allow the grid section itself to be selected;
  // only select div inside the grid
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("match") ||
    clicked.parentNode.classList.contains("selected")
  ) {
    return; // it makes it so an action cant be performed
  }
  // We only want to add `selected` class if the current count is less than 2
  if (count < 2) {
    count++; //it makes it so we cant take more than 2 guesses but it wont work on the third or fourth guesses

    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name; // this adds value to first guess whose value before was nul
      clicked.parentNode.classList.add("selected");
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name; // this adds value to second guess whose value before was nul
      clicked.parentNode.classList.add("selected");
    }
    // If both guesses are not empty
    if (firstGuess !== "" && secondGuess !== "") {
      //this helps so user cant select the same object twice
      // And the firstGuess matches secondGuess
      if (firstGuess === secondGuess) {
        // Run the match function
        setTimeout(match, delay); // match makes  is in css which thus make the card not visible
        setTimeout(resetGuesses, delay); // reset's the guess after a match has delay added
      } else {
        setTimeout(resetGuesses, delay); // reset's guess after refresh
      }
    }
    previousTarget = clicked;
  }
});
