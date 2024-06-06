const highScoreText = document.getElementById('high-score');
const levelText = document.getElementById('level')
const cards = Array.from(document.querySelectorAll('.card'));
const playButton = document.getElementById('play');

let compPattern = [];
let level = 1;
let highScore = 0;
let tileNum = 0;
let delay = 250;
let lag  = 500;

function game(){
    computer()
}

function computer(){

    for (let i = 1; i  <= level; i++){
        let selectedCardIndex = Math.floor(Math.random()*cards.length);
        compPattern.push(selectedCardIndex);
        setTimeout(() => {cards[selectedCardIndex].classList.add('selected');}, (i*lag));
        setTimeout(() => {cards[selectedCardIndex].classList.remove('selected');}, (i*lag + delay));
    }
    console.log(compPattern);
    setTimeout(() => {cards.forEach(element => element.addEventListener('click', player));}, (level*lag + delay));
}

function player(){
    if (compPattern[tileNum] != cards.indexOf(this)){
        this.classList.add('error');
        setTimeout(() => {this.classList.remove('error');}, 1000);

        //log updates
        //levelText.innerText = (level-1);
        if (level > highScore){
            highScore = (level-1);
            highScoreText.innerText = highScore;
        }

        //reset
        level = 1;
        levelText.innerText = (level-1);
        compPattern = [];
        tileNum = 0;
        cards.forEach(element => element.removeEventListener('click', player))

    } else {
        this.classList.add('selected');
        setTimeout(() => {this.classList.remove('selected');}, (500));
        tileNum += 1;
    }

    if (tileNum == level){
        //log updates
        levelText.innerText = level;

        //update vars
        compPattern = [];
        tileNum = 0;
        level += 1;
        cards.forEach(element => element.removeEventListener('click', player));
        computer(compPattern, level);

    }
    
} 

playButton.addEventListener('click', game);
