let gameSeq=[];
let userSeq=[];
let colours = ["red" , "blue" , "voilet" , "yellow"];

let started=false;
let level = 0;

let h3 = document.querySelector('h3');

let H = document.createElement('span');
let High = 0;



//auto flash function to be used in level up function
function flashButton1(btn) {
    btn.style.filter = "brightness(1.3)";
    setTimeout(() => btn.style.filter = "", 150);
    //console.log("User "+btn.classList[1]);
}

//start game
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;
        levelUp();
    }
});

//increase level function
function levelUp(){
    h3.innerText = `Level ${++level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randClr = colours[randIdx];
    let randBtn = document.querySelector(`.${randClr}`);

    gameSeq.push(randClr);
    console.log(gameSeq);

    setTimeout( () => flashButton(randBtn) , 500);
}

//user click

//flash function for user click
function flashButton(btn) {
    btn.style.filter = "brightness(2)";
    setTimeout(() => btn.style.filter = "", 150);
    

}

//check click
let i = 0;
function checkAns(){
    let idx = level-1;

    if(userSeq[i] == gameSeq[i] && i == gameSeq.length-1){
        i=0;
        userSeq=[];
        console.log("inside if1")
        levelUp();
        if(level > High){
            if(High == 0){
                document.querySelector('body').insertBefore(H,h3);
            }
            
            High = level-1;
            H.innerText = `High Score: ${High}`;
        }

    }
    else if(userSeq[i] == gameSeq[i]){
        console.log("inside if2")
        i++;
    }
    else{

        h3.innerText = "Press any key to restart the game";

        level = 0;
        gameSeq = [];
        userSeq = [];
        i=0;

        let body = document.querySelector('body');
        body.classList.add("gameover");

        setTimeout(function(){
           body.classList.remove("gameover");
        }, 3000 )
        
        started = false;

    }
}

//applying eventlistner for flashing on user click
document.querySelectorAll(".button").forEach(btn => {
    btn.addEventListener("click", () => {
        flashButton1(btn);
        if(started == true){
            let userClr = btn.classList[1];
            userSeq.push(userClr);
            checkAns();
        }
    });
});





