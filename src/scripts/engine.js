 const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life-left"),
    },
    values: {
        timerId: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 6,
        currentLife: 5,
    }, 
 }

 function randomSquare(){
    state.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        });

        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;
 }

 function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result; 
                state.values.hitPosition= null;
                playSound("hit");
            }
        });
    });
 }

 function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        lifeDown(); 
        alert("Game Over! Seu resultado é: " + state.values.result);
    }
 }
//adicionado o decrementador de vida
 function lifeDown(){ 
        state.values.currentLife--;
        state.view.life.textContent = state.values.currentLife;
 }
 
 function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
 }

 function initialize() {
    addListenerHitBox();
 }

 initialize();

 