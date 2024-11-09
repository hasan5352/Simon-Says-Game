let outerDiv = document.querySelector(".game"); 
let bigDiv = document.querySelector(".big");
let greenBtn = document.querySelector(".green");
let blueBtn = document.querySelector(".blue");
let yellowBtn = document.querySelector(".yellow");
let redBtn = document.querySelector(".red");
let blackBtn = document.querySelector(".black");
let Displayinfo = document.querySelector("h2");

let sequence = [];
let userSeq = [];
let colorBtns = [greenBtn, blueBtn, yellowBtn, redBtn];
let level = 0;

function incrementLevel(){
    level++;
    if (level == 1){Displayinfo.innerText = `Game Started! Level ${level}`;} else {Displayinfo.innerText = `This is Level ${level}`;};
}

function btnFlash(btn, flashClass){
    btn.classList.toggle(flashClass);
    setTimeout(()=>{btn.classList.toggle(flashClass);}, 500);
}

function flashRandomColor(){
    let color_idx = Math.floor(Math.random() * 4);
    let randomColor = colorBtns[color_idx];
    btnFlash(randomColor, "flash2");
    sequence.push(randomColor);
}

function flashGameSeq(){
    bigDiv.style.pointerEvents = "none";
    outerDiv.style.cursor = "not-allowed";
    for(let i=0; i<sequence.length; i++){
        setTimeout(()=>{btnFlash(sequence[i], "flash1")}, i*1000);
    }
    setTimeout(()=>{
        flashRandomColor();
        bigDiv.style.pointerEvents = "auto";
        outerDiv.style.cursor = "pointer";}, sequence.length * 1000);
}

let started=false;
let num_presses = -1;
bigDiv.addEventListener("click", function(event){
    if (started && event.target != blackBtn){
        num_presses ++;
        if (event.target == sequence[num_presses]){btnFlash(event.target, "flash1");} 
        else if (event.target != sequence[num_presses]){
            Displayinfo.innerText = `Wrong guess! Click the black button to restart\nPrevious game ended on level ${level}`
            started=false;
            sequence = [];
            num_presses = -1;
            level = 0;
        } 
    } 
    else if(!started && event.target == blackBtn){
            incrementLevel()
            started=true;
            flashRandomColor();
    }

    if (started && num_presses == sequence.length-1){
        Displayinfo.innerText = "Nice play! Proceeding to next level...";
        setTimeout(() => {
            incrementLevel();
            num_presses = -1;
            flashGameSeq();
        }, 1000);
    }
    
});

