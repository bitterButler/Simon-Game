
const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];


//if its clicked then add values to arrays, play a sound, and animate the pressing movement
$(".btn").on("click", function(){ 
  //var userChosenColor = $("#" + randChosenColor); //.click() is depreciated, instead i use .trigger("click") or on("click", handler)
  var userChosenColor = $(this).attr("id"); //stores the id, which is one of the 4 colors name.
  //console.log("Button clicked:", userChosenColor); //for testing and checking purpose only
  userClickedPattern.push(userChosenColor);
  playSound();
  console.log("color in array is: ", userClickedPattern); //for testing and checking purpose only
  animatePress(userChosenColor);
}); //for testing the code


//GAME START - if "s" is pressed down on Keyboard, game should start, and show the level 0. Later increase the lvl by 1.
var level = 0;
$("body").on("keypress",function(event){ //keydown can see CTRL, ALT ..., keypress only alfa+num+space
  if (event.key === "s"){ // s = start 
    //console.log(event.target) 
    //game is not started yet
    $("h1").html($("h1").html().replace("Press A Key to Start", "Level "+level));
    nextSequence();
    $("h1").off("keypress");
  }
});


function playSound(){
  var sound = new Audio("./sounds/game_sound.wav");
  sound.play();
}


//generate random numbers and store them in a variable for the next move
function nextSequence(){ 
  var randNum = Math.floor(Math.random()*4);
  var randChosenColor = buttonColors[randNum];
  gamePattern.push(randChosenColor);
  var e = $("#" + randChosenColor); //chose the appropriate ID, what i need for animating the correct button
  e.animate({opacity: "0.3"}, 100).animate({opacity: "1"}, 100); //doable with fadeIn() and fadeOut() too. 
  playSound(); 
  level++; //incremente +1 the level variable and then update the old level (0) with "new level" (1) and so on.
  $("#level-title").text("Level " + level);
}


//function that jQuery to add "pressed" class to the button that gets clicked. so it "animates" the flashing/shadow. 
//then remove it to come back to defaul.
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed"); //i dont need here setTimeout, because then it happens no-flashing.
setTimeout(function() {$("#" + currentColor).removeClass("pressed");}, 100);
}