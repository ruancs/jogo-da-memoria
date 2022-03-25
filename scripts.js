const headBegin = document.querySelector('.container');
const footerBegin = document.querySelector('.footer');
  const game = document.querySelector('.memory-game');

function gameBegin(){
  
  headBegin.style.display = "none";
  footerBegin.style.display = "none";
  game.style.display = "none";
 
}

function startGame(){
  document.querySelector("#gamestart").style.display = "none";
  headBegin.style.display = "flex";
  footerBegin.style.display = "block";
  game.style.display = "flex";
  reset();

}

const cards = document.querySelectorAll('.memory-card');
var sound = document.getElementById("flipin");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;




function flipCard(){
    if (lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    sound.play(); 

    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    }

    secondCard = this;
    // hasFlippedCard = false;

    checkforMatch();

}

function checkforMatch(){
    if (firstCard.dataset.pokemon === secondCard.dataset.pokemon){
        cardCheckOk();
        disableCards();
        
        return;
    }

    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        //lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
    });
    })();

function cardCheckOk(){    

        firstCard.querySelector(".front-face").style.backgroundColor = "#80b918";
        secondCard.querySelector(".front-face").style.backgroundColor = "#80b918";   
   
}    
    
cards.forEach(card => card.addEventListener('click', flipCard));

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;
start()
document.form_main.start.onclick = () => start();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '00';
}

//---------cronometro------------//

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}