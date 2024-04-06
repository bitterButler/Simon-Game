
const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

$(".btn").on("click", function(){ //if its clicked then...
  nextSequence();
  //var userChosenColor = $("#" + randChosenColor); //.click() is depreciated, instead i use .trigger("click") or on("click", handler)
  var userChosenColor = $(this).attr("id"); //stores the id, which is one of the 4 colors name.
  //console.log("Button clicked:", userChosenColor); //for testing and checking purpose only
  userClickedPattern.push(userChosenColor);
  console.log("color in array is: ", userClickedPattern); //for testing and checking purpose only
});
//nextSequence(); //for testing the code

function nextSequence(){ //generate random numbers and store them in a variable for the next move
  var randNum = Math.floor(Math.random()*4);
  var randChosenColor = buttonColors[randNum];
  gamePattern.push(randChosenColor);
  var e = $("#" + randChosenColor); //chose the appropriate ID, what i need for animating the correct button/pattern
  e.animate({opacity: "0.3"}, 100).animate({opacity: "1"}, 100);
  var sound = new Audio("./sounds/game_sound.wav");
  sound.play();
}


