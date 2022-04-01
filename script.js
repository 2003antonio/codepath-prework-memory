//Global Constants
const CLUE_PAUSE_TIME = 333; // how long to pause between clues
const NEXT_CLUE_WAIT_TIME = 1000; // how long to wait before playing sequence
const patternLength = 8; // Max clues played in a game

//Global Variables
var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var clueHoldTime = 500; // how long to hold each clue's light/sound
var userMistakes = 0; // Tracks the user's mistakes

var myInterval; //initializing interval between countdown
var counter; //initializing timer (counter chooses how much time the player gets)
var blitzMode = false; //boolean if blitzMode is playing
var guessedAlready = false; //variable for bug if user accidently drags the button

function startGame() {
  resetTimer();
  guessedAlready = false;

  //Blitz Mode conditional, if Bltiz is on, make the clue hold time shorter.
  if (!blitzMode) {
    clueHoldTime = 500;
  } else {
    clueHoldTime = 250;
  }
  //Resetting all my variables
  progress = 0;
  userMistakes = 0;
  gamePlaying = true;

  // Swap my Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  //Generate Random Clue Pattern
  for (let i = 0; i < patternLength; i++) {
    pattern[i] = randomNum(5);
  }

  //play clue pattern sequence for the first time
  playClueSequence();
}

function stopGame() {
  //gamePlaying flag switch
  gamePlaying = false;

  // Reset my Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  //Reset Strikes
  document.getElementById("strikeOne").classList.add("hidden");
  document.getElementById("strikeTwo").classList.add("hidden");
  document.getElementById("strikeThree").classList.add("hidden");

  //Reset Timer and guessedAlready 
  resetTimer();
  guessedAlready = false;
}

// Sound Synthesis Functions
const freqMap = {
  //Unique frquencies
  1: 240,
  2: 360,
  3: 410,
  4: 480,
  5: 520,
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

//Button Pattern Stuff
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
  mouseDownFunc(btn);
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
  mouseUpFunc(btn);
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  context.resume();
  let delay = NEXT_CLUE_WAIT_TIME; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += CLUE_PAUSE_TIME;
    //Depending if blitzmode is active, clueholdTime goes down by more or less
    if (!blitzMode) {
      clueHoldTime -= 12.5;
    } else {
      clueHoldTime -= 6.5;
    }
  }
  //Starting timer with delay so it starts AFTER the sequence is played
  setTimeout(startTimer, delay - 900);
}

//GAME RESULT FEATURES
function winGame(blitzMode) {
  stopGame();
  //Different win alerts based on if blitz mode is on or off
  if (!blitzMode) {
    alert(
      "Congratulations, You won! But are you daring enough to try Blitz Mode?"
    );
  } else {
    alert("Wow you beat Blitz Mode! You truly are a memory wizard.");
  }
}
function loseGame(blitzMode) {
  stopGame();
  //Different lose alerts based on if blitz mode is on or off (BASED ON STRIKES)
  if (!blitzMode) {
    alert("Strike three! Game Over. You lost.");
  } else {
    alert("You lose! Blitz Mode is no joke. Do you dare to try again?");
  }
}

// I need to use two guess functions here for a bug, if the user drags by mistake it would crash the game.
//User Guessing Functions
function guess(btn) {
  if (!gamePlaying || guessedAlready) {
    guessedAlready = false;
    return;
  }
  guessedAlready = true;
  if (pattern[guessCounter] == btn) {
    if (guessCounter == progress) {
      //reset timer after the user completes the sequence
      resetTimer();
      if (progress == pattern.length - 1) {
        winGame(blitzMode);
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    if (!blitzMode) {
      //If blitzmode is off, show strike
      userMistakes++;
      showStrike(userMistakes);
    }
      else{
      //blitzmode on, instant lose game after 1 mistake
      userMistakes++;
      showStrike(userMistakes);  
      setTimeout(function () {
      loseGame(blitzMode);
    }, 50);
    }
  }
    //on a click, it counts as one guess, so after a click set guessedAlready to false
    guessedAlready = false;
}

//guess function for if a user drags
function guessDrag(btn) {
  if (!gamePlaying){
    return;
  }
  guessedAlready = true;
  if (pattern[guessCounter] == btn) {
    if (guessCounter == progress) {
      resetTimer();
      if (progress == pattern.length - 1) {
        winGame(blitzMode);
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    if (!blitzMode) {
      //If blitzmode is off, show strike
      userMistakes++;
      showStrike(userMistakes);
    }
      else{
      //blitzmode on, instant lose game after 1 mistake
      userMistakes++;
      showStrike(userMistakes);  
      setTimeout(function () {
      loseGame(blitzMode);
     }, 50);
   }
 }
    //no setting guessedAlready to false here because after a drag it goes to our regular guess function and resets.
}

//Function for random int (used in pattern)
function randomNum(max) {
  return Math.floor(Math.random() * max + 1);
}

//Function for showing how many strikes the user has
function showStrike(userMistakes) {
  if (userMistakes == 1) {
    document.getElementById("strikeOne").classList.remove("hidden");
  } else if (userMistakes == 2) {
    document.getElementById("strikeTwo").classList.remove("hidden");
  } else {
    document.getElementById("strikeThree").classList.remove("hidden");

    //Wait 50 miliseconds so the third strike is shown before the game ends (looks better design wise I.M.O.)
    setTimeout(function () {
      loseGame(blitzMode);
    }, 50);
  }
}

//Mouse down function (play the tone, show the image)
function mouseDownFunc(btn) {
  startTone(btn);
  document.getElementById("image" + btn).classList.remove("hidden");
  
  //IF User drags, use guessDrag function.
  document.getElementById("image" + btn).ondragstart = function () {
    guessDrag(btn);
    clearButton(btn);
  };
}
//Mouse up function (stop playing the tone, and stop showing the image)
function mouseUpFunc(btn) {
  stopTone();
  document.getElementById("image" + btn).classList.add("hidden");
}

//Start Timer function
function startTimer() {
  //If blitzmode is off, give the user 15 seconds, if on, only give him 8 seconds
  if (!blitzMode) {
    counter = 15;
  } else {
    counter = 8;
  }
  //setting the interval between changes in the number(the number changes every second)
  myInterval = setInterval(myTimer, 1000);

  //Setting up my timer
  function myTimer() {
    //subtract from counter
    counter--;
    // if counter is greater than 0 change the HTML text number
    if (counter >= 0) {
      document.getElementById("timer").innerHTML = counter;
    }

    //Lose alert (BASED ON TIME)
    if (counter == 0) {
      clearInterval(myInterval);
      setTimeout(function () {
        alert("Time's Up! Game Over. You lost.");
      }, 50);
      stopGame();
    }
  }
}
//Function to reset my timer based off if blitzmode is on or off
function resetTimer() {
  clearInterval(myInterval);
  if (!blitzMode) {
    counter = 15;
  } else {
    counter = 8;
  }
  document.getElementById("timer").innerHTML = counter;
}

//Blitz Mode On function
function blitzModeOn() {
  blitzMode = true;
  //User cant change game mode while in the middle of a game
  if (blitzMode && gamePlaying) {
    alert(
      "If you wish to play Blitz Mode please stop the game first, then try again!"
    );
  }
  //changing buttons, game text description, and timer text
  else {
    document.getElementById("blitzModeButtonOff").classList.add("hidden");
    document.getElementById("blitzModeButtonOn").classList.remove("hidden");
    document.getElementById("normalGameText").classList.add("hidden");
    document.getElementById("blitzModeText").classList.remove("hidden");

    document.getElementById("timer").innerHTML = 8;
  }
}
function blitzModeOff() {
  blitzMode = false;
  //User cant change game mode while in the middle of a game
  if (!blitzMode && gamePlaying) {
    alert(
      "If you wish to stop playing Blitz Mode please stop the game first, then try again!"
    );
  }
  //changing buttons, game text description, and timer text
  else {
    document.getElementById("blitzModeButtonOff").classList.remove("hidden");
    document.getElementById("blitzModeButtonOn").classList.add("hidden");
    document.getElementById("normalGameText").classList.remove("hidden");
    document.getElementById("blitzModeText").classList.add("hidden");
    document.getElementById("timer").innerHTML = 15;
  }
}
