const blue = document.getElementById('blue');
const violet = document.getElementById('violet');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const button = document.getElementById('startButtom');
const LASTLEVEL = 3;
class Game {
    constructor(){
        this.init()
        this.generateSequence()
        this.nextLevel()
        setTimeout(this.nextLevel(), 700)
    }
    init(){
        this.choiseColor = this.choiseColor.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.toggleStartButtom();
        this.level =1 ;
        this.colors = {
            blue: blue,
            violet: violet,
            orange: orange,
            green: green
        }
    }
    toggleStartButtom(){
        if(startButtom.classList.contains('hide')){
            startButtom.classList.remove('hide');
            startButtom.classList.remove('message');
        }else {
            startButtom.classList.add('hide');
        }
    }
    generateSequence(){
        this.sequence = new Array(LASTLEVEL).fill(0).map(number => Math.floor(Math.random()*4)) 
    }
    nextLevel(){
        this.subLevel = 0
        this.iluminateSequence()
        this.addEventClicks()
    }
    transformNumberToColor(number){
        switch (number){
            case 0:
                return 'blue';
            case 1:
                return 'violet';
            case 2:
                return 'orange';
            case 3:
                return 'green';
        }
    }
    transformColorToNumber(color){
        switch (color){
            case 'blue':
                return 0;
            case 'violet':
                return 1;
            case 'orange':
                return 2;
            case 'green':
                return 3;
        }
    }
    iluminateSequence(){
        for (let i = 0;i<this.level;i++){
            let color = this.transformNumberToColor(this.sequence[i]);
            setTimeout(() => this.iluminateColor(color), 1000*i);
        }
    }
    iluminateColor(color){
        this.colors[color].classList.add('light');
        setTimeout(() => this.offColor(color), 500);

    }
    offColor(color){
        this.colors[color].classList.remove('light');
    }
    addEventClicks(){
        this.colors.blue.addEventListener('click', this.choiseColor)
        this.colors.green.addEventListener('click', this.choiseColor)
        this.colors.violet.addEventListener('click', this.choiseColor)
        this.colors.orange.addEventListener('click', this.choiseColor)
    }
    removeEventClicks(){
        this.colors.blue.removeEventListener('click', this.choiseColor)
        this.colors.green.removeEventListener('click', this.choiseColor)
        this.colors.violet.removeEventListener('click', this.choiseColor)
        this.colors.orange.removeEventListener('click', this.choiseColor)
    }
    choiseColor(event){
        const nameColor = event.target.dataset.color;
        const numberColor = this.transformColorToNumber(nameColor);
        this.iluminateColor(nameColor);
        if(numberColor === this.sequence[this.subLevel]){
            this.subLevel++;
            if(this.subLevel === this.level){
                this.level++;
                this.removeEventClicks()
                if(this.level === (LASTLEVEL+1)){
                    this.removeEventClicks()
                    this.winGame()
                }else{
                    setTimeout(this.nextLevel, 1700)
                }
            }
        }else{
            this.removeEventClicks()
            this.loseGame()
        }
    }
    winGame(){
        showConfetti();
        const message = "!Congratulations! You win the game 🎉. Please click here to play again";
        showMessage(message, true);
    }
    loseGame(){
        const message = "!Sorry! You lose the game 💔. Please click here to play again";
        showMessage(message);
    }
}
function showConfetti(){
    const start = () => {
        setTimeout(function() {
            confetti.start()
        }, 500);
    };
    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 5000); 
    };
    start();
    stop();
}
function showMessage(text, winGame = false){
    if(winGame){
        startButtom.classList.add('win_message');
        startButtom.classList.remove('lose_message');
    } else {
        startButtom.classList.add('lose_message');
        startButtom.classList.remove('win_message');
    }
    startButtom.innerText = text;
    startButtom.classList.remove('hide');
    
}
function startGame(){
    window.newGame = new Game();
}
