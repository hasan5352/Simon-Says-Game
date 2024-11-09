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

function btnFlash(btn, flashClass){
    btn.classList.add(flashClass);
    setTimeout(()=>{btn.classList.remove(flashClass);}, 200);
}

function flashRandomColor(){
    let color_idx = Math.floor(Math.random() * 4);
    let randomColor = colorBtns[color_idx];
    btnFlash(randomColor, "flash2");
    sequence.push(randomColor);
    level++;
    if (level == 1){Displayinfo.innerText = `Game Started! Level ${level}`;} else {Displayinfo.innerText = `This is Level ${level}`;};
}

function flashGameSeq(){
    for(let i=0; i<sequence.length; i++){
        setTimeout(btnFlash(sequence[i], "flash1"), 1000);
    }
    setTimeout(flashRandomColor(), 1000);
}

let started=false;
let num_presses = -1;
bigDiv.addEventListener("click", function(event){
    if (started && event.target != blackBtn){
        num_presses ++;
        if (event.target == sequence[num_presses]){btnFlash(event.target, "flash1");} 
        else if (event.target != sequence[num_presses]){
            Displayinfo.innerText = "Wrong guess! Click the black button to restart"
            started=false;
            sequence = [];
        } 
    } 
    else if(!started && event.target == blackBtn){
            started=true;
            flashRandomColor();
    }

    if (started && num_presses == sequence.length-1){
        Displayinfo.innerText = "Nice play! Proceeding to next level...";
        num_presses = -1;
        setTimeout(flashGameSeq, 1000);
    }
    
});

