# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Antonio Eduardo Martinez**

Time spent: **19:37** hours spent in total

Link to project: https://glitch.com/edit/#!/online-memory-game

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] User has 2 different game modes to play!
- [x] Game text, strikes, and time change between modes played
- [x] Different win and losing alerts based on if time ran out, too many strikes, game mode, or if the user won
- [x] The amount of strikes the user has gets shown on the screen.
- [x] If the user drags a button by mistake while trying to click, the game keeps playing, instead of crashing 
- [x] User cannot change between game modes if the game is already playing

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](https://raw.githubusercontent.com/2003antonio/codepath-prework-memory/main/gifs/memory-game-win.gif)
![](https://github.com/2003antonio/codepath-prework-memory/blob/main/gifs/memory-game-lose.gif)
![](https://github.com/2003antonio/codepath-prework-memory/blob/main/gifs/blitz-mode-win.gif)
![](https://github.com/2003antonio/codepath-prework-memory/blob/main/gifs/blitz-mode-lose.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
https://www.delftstack.com/howto/html/html-button-with-image/
https://www.w3schools.com/jsref/met_win_clearinterval.asp
https://www.w3schools.com/jsref/met_win_setinterval.asp
https://stackoverflow.com/questions/4211909/disable-dragging-an-image-from-an-html-page
https://www.w3schools.com/jsref/met_win_settimeout.asp
https://www.w3schools.com/cssref/css_colors.asp


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
A challenge I encountered while creating this submission was figuring out where to start, reset, and change my timer. I overcame this by breaking down my code into smaller chunks and trying different spots where it would be viable. After a couple of trial and error runs, I came to a conclusion that I should start my timer with a delay everytime the clue sequence gets played. I also figured out I should reset my timer whenever the game stops/starts or the user completes the sequence. Another obstacle I came across was a bug that would cause my program to break whenever the user dragged a button instead of clicking it. After some research I was able to fix this with an ".ondragstart" event. This event would call my second guess function and clear button function. After implementing this into my code, the issue was resolved. This fix is important because it allows users to not worry about breaking the website while trying to speed through the game. And an overall challenge I encountered was the syntax of all three languages. Having no prior experience with HTML, JavaScript, and CSS, getting used to the syntax was a challenge in itself. However, I quickly realized that the syntax is not as different from previous languages I used. All in all, with enough research and dedication, I overcame these obstacles and was able to create a project that I was satisfied with.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
Some questions about web development that I have now is, "How do I make my code more efficient?" Although I was able to create my project and it is working smoothly and effectively, I want to be able to write code that works, but is also efficient. I don't want to use more memory or storage than I have to. Furthermore, I wish to learn more about design. How to make the website more aestically pleasing for the eye. I want to know this because you can have a fascinating game with spectacular code, nonethless, if it's not pretty to look at, no one is going to want to play. I also want to learn how to create websites for website purposes, not just for games. I don't want to be limited by my current knowledge of things. I want to be able to keep growing and expanding and learning more and more about web development and it's opportunity in the future. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
With a few more hours to work on this project I would try implementing a more unique audio instead of the basic clue. I tried implementing the audio to no avail. If I had a little bit more time I think I would've been able to solve that problem, but with my current knowledge and lack of time, I had to put that feature to the side. I would also like to implement more features, like an infinity mode (infinite pattern), a high score board (hand in hand with infinity mode, to compare previous scores). Also I wouldve loved to add some buttons that play a specific pattern to create a song like "Twinkle Twinkle Little Star" or "Eye of the Tiger", I had fun doing this by myself, and seeing what songs I could create from my 5 buttons. Last thing I would do with more time, would be trying to debug everything, like the drag problem. I would find more issues within my game and try fixing all of them.


## Interview Recording URL Link

[My 5-minute Interview Recording](https://www.loom.com/share/77845928f515449c8d2e849509528025)


## License

    Copyright Antonio Martinez

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
