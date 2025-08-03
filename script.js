"use strict";

let body = document.querySelector("body");
let black = document.querySelector(".black");
let title = document.querySelector("h2");
let highScoreDisplay = document.querySelector(".high-score");
let scoreDisplay = document.querySelector(".score");
let btns = []
for (let b of document.querySelectorAll("main div")) {
    if (b != black) btns.push(b);
}
let seq = [], gameStarted = false, restarting = false;
let highScore = 0, level = 0;

// Restart Game
function restartGame(){
    seq = []; gameStarted = false; restarting = true;
    title.innerText = "Restarting..."; level = 0;
    black.classList.add("not-allowed-cursor");
    for (let b of btns){b.classList.add("not-allowed-cursor");}

    setTimeout(() => {
        black.textContent = "Start!";
        title.innerText = "Start game by pressing black button!";    
        scoreDisplay.innerText = "Current Score: 0";
        black.classList.remove("not-allowed-cursor");
        for (let b of btns){b.classList.remove("not-allowed-cursor");}
        restarting = false;
    }, 1200);
}
// Restart Game
black.addEventListener('dblclick', ()=>{
    if (!gameStarted) return;
    restartGame();
})


function flashNTimes(elem, n, flashClass, duration, timeBetweenFlashes){
    if (n <= 0) return;
    if (elem.classList.contains(flashClass)) elem.classList.remove(flashClass);

    let delay = 0;
    for (let i = 0; i < n; i++){
        setTimeout(() => {
            elem.classList.add(flashClass);
        }, delay);
        delay += duration;
        setTimeout(() => {
            elem.classList.remove(flashClass);
        }, delay);
        delay += timeBetweenFlashes;
    }
}

// Start Game
black.addEventListener('click', function(){
    if (gameStarted || restarting) return;
    gameStarted = true;
    let randIdx = Math.floor(Math.random() * btns.length);

    title.innerText = "Starting Game...";
    setTimeout(() => {
        title.innerText = `Level: ${level+1}`;
        black.textContent = "Double Click to Restart";
    }, 800);
    setTimeout(() => {
        flashNTimes(btns[randIdx], 2, "flash", 200, 100);
    }, 900);
    seq.push(btns[randIdx]);
})


function advanceLevel(){
    gameStarted = false; restarting = true;
    
    scoreDisplay.innerText = `Current Score: ${++level}`;
    title.innerText = `Level: ${level + 1}`;
    highScore = Math.max(highScore, level);
    highScoreDisplay.innerText = `Current High Score: ${highScore}`;

    let randIdx = Math.floor(Math.random() * btns.length), delay = 300;
    seq.push(btns[randIdx]);

    for (let i = 0; i < seq.length; i++){
        setTimeout(() => {
            flashNTimes(seq[i], 1, "flash", 200, 0);
        }, delay);
        delay += (300);
    }
    setTimeout(() => {
        flashNTimes(btns[randIdx], 2);
        gameStarted = true; restarting = false;
    }, 300*(seq.length+1));
}

function wrongAnswer(){
    title.innerText = "Khel Khatam!";
    flashNTimes(body, 3, "flash-red", 200, 150);
    for (let b of btns) flashNTimes(b, 3, "flash", 200, 150);
}

let idx = 0;
for (let btn of btns){
    btn.addEventListener("click", function(){
        if (!gameStarted || restarting) return;

        if (btn == seq[idx++]){
            if (idx == seq.length) {
                advanceLevel(); 
                idx = 0;
            }
        } else{
            idx = 0; restarting = true; gameStarted = false;
            wrongAnswer();
            setTimeout(() => {
                restartGame();
            }, 3*(200 + 150));
        }
    })
}