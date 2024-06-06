const highScoreText = document.getElementById('high-score');
const levelText = document.getElementById('level')
const cards = Array.from(document.querySelectorAll('.card'));
const playButton = document.getElementById('play');

function game(){
    let compPattern = [];
    let level = 1;
    let highScore = 0;
    computer(compPattern, level)
    player(compPattern, level, highScore);
}

function computer(compPattern, level){
    const delay = 500;
    for (let i = 1; i  <= level; i++){
        let selectedCardIndex = Math.floor(Math.random()*cards.length);
        compPattern.push(selectedCardIndex);
        setTimeout(() => {cards[selectedCardIndex].classList.add('selected');}, (i*1000));
        setTimeout(() => {cards[selectedCardIndex].classList.remove('selected');}, (i*1000 + delay));
    }
    console.log(compPattern)
}

function player(compPattern, level, highScore){
    cards.forEach(element => element.addEventListener('click', selected));

    let tileNum = 0;
    function selected(){
        if (compPattern[tileNum] != cards.indexOf(this)){
            this.classList.add('error');
            setTimeout(() => {this.classList.remove('error');}, 1000);

            //log updates
            levelText.innerText = (level-1);
            if (level > highScore){
                highScore = (level-1);
                highScoreText.innerText = highScore;
            }

            //reset
            level = 1;
            levelText.innerText = (level-1);
            compPattern = [];
            tileNum = 0;
            cards.forEach(element => element.removeEventListener('click', selected))

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
            computer(compPattern, level);
        }
} 
}

playButton.addEventListener('click', game);