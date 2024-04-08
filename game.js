
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStart = false; 


//if its clicked then add values to arrays, play a sound, and animate the pressing movement
$(".btn").on("click", function(){ 
  //var userChosenColor = $("#" + randChosenColor); //.click() is depreciated, instead i use .trigger("click") or on("click", handler)
  var userChosenColor = $(this).attr("id"); //stores the id, which is one of the 4 colors name.
  //console.log("Button clicked:", userChosenColor); //for testing and checking purpose only
  userPattern.push(userChosenColor);
  playSound();
  console.log("color in array is: ", userPattern); //for testing and checking purpose only
  animatePress(userChosenColor);
  checkAnswer(userPattern.length-1); //If the user has pressed [red, green, red, yellow], the index of the last answer is 3. from 0,1,2,3.
});


//GAME START - if "s" is pressed down on Keyboard, game should start, and show the level 0. Later increase the lvl by 1.
$("body").on("keypress",function(event){ //keydown can see CTRL, ALT ..., keypress only alfa+num+space
  if (!gameStart){ //(event.key === "s") --> s key equals to starting 
    $("h1").html($("h1").html().replace("Press A Key to Start", "Level "+level));
    nextSequence();
    gameStart = true; // !true =false, so this if will be only running once.
  } 
  });


function playSound(){
  var sound = new Audio("./sounds/game_sound.wav");
  sound.play();
}
function playSoundWrong(){
  var sound = new Audio("./sounds/wrong.mp3");
  sound.play();
}


//generate random numbers and store them in a variable for the next move
function nextSequence(){ 
  userPattern = []; // this is really important. if forgotten to reset, only your lvl.1 will be good. 
  var randNum = Math.floor(Math.random()*4);
  var randChosenColor = buttonColors[randNum];
  gamePattern.push(randChosenColor);
  var e = $("#" + randChosenColor); //chose the appropriate ID, what i need for animating the correct button
  e.animate({opacity: "0.3"}, 100).animate({opacity: "1"}, 100); //doable with fadeIn() and fadeOut() too. 
  playSound(); 
  level++; //incremente +1 the level variable and then update the old level (0) with "new level" (1) and so on.
  $("#level-title").text("Level " + level);
}


//check if the most recent user answer is the same as the game pattern yes-> success, no-> wrong
function checkAnswer(currentLevel){
  //both starts of as empty. but u only "win" if you guess correctly, which means both patterns (or arrays) needs to match.
  if(gamePattern[currentLevel] === userPattern[currentLevel]){ 
    console.log("success");
  
  if(gamePattern.length === userPattern.length){ // this checks, if user finished his pattern/sequence
    //if its true, next +1 pattern can come.
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}
  else {
    console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    playSoundWrong();
    startOver();
  }
}


//function that jQuery to add "pressed" class to the button that gets clicked. so it "animates" the flashing/shadow. 
//then remove it to come back to defaul.
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed"); //i dont need here setTimeout, because then it happens no-flashing.
setTimeout(function() {$("#" + currentColor).removeClass("pressed");}, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStart = false;
}