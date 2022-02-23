let playerScore = 0;
let computerScore = 0;
let playedRounds = 0;
const moves = ['rock', 'paper', 'scissors'];

const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const results = document.querySelector('#display-results p');
const whatRound = document.querySelector('.what-round');
const playerMove = document.querySelector('.player-move');
const computerMove = document.querySelector('.computer-move');
const scores = document.querySelector('.scores');
const roundResult = document.querySelector('.round-result');
const finalScores = document.querySelector('.final-scores');
const gameResult = document.querySelector('.game-result');

function getRounds() {
    rounds = document.querySelector('#input-rounds');
    return Number(rounds.value);
}

function computerPlay() {
    randomMove = moves[Math.floor(Math.random()*moves.length)];
    return randomMove;
}

function beats(moveOne, moveTwo) {
    if ((moveOne === 'rock' && moveTwo === 'scissors') || 
        (moveOne === 'scissors' && moveTwo === 'paper') ||
        (moveOne === 'paper' && moveTwo === 'rock')) {
        return ('Player wins')
    } else if ((moveOne === 'scissors' && moveTwo === 'rock') || 
        (moveOne === 'paper' && moveTwo === 'scissors') ||
        (moveOne === 'rock' && moveTwo === 'paper')) {
        return ('Computer wins')
    } else {
        return ('Both tie')
    }
}

function displayScores(pScore, cScore) {
    scores.textContent = `Your score: ${pScore} || Computer's score: ${cScore}`;
}

function displayFinalScores() {
    finalScores.textContent = '--Final Scores--'
    displayScores(playerScore, computerScore);
    if (playerScore > computerScore) {
        gameResult.textContent = 'You have won the game!';
    } else if (computerScore > playerScore) {
        gameResult.textContent = 'You have lost the game!';
    } else {
        gameResult.textContent = 'The game is tied!';
    }
}

function setGameOver() {
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
    rounds.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    playedRounds = 0;
    for(let result of results) {
        result.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
    rounds.disabled = false;
    rounds.value = '';
    rounds.focus();
}

function playRound(playerSelection, computerSelection) {

    playerMove.textContent = `You played ${playerSelection}`;
    computerMove.textContent = `Computer played ${computerSelection}`;

    if (beats(playerSelection, computerSelection) === 'Player wins') {
        playerScore += 1;
        displayScores(playerScore, computerScore);
        if (playerSelection === 'rock' && computerSelection === 'scissors') {
            roundResult.textContent = 'You win! Rock beats Scissors';
        } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
            roundResult.textContent = 'You win! Scissors beats Paper';
        } else if (playerSelection === 'paper' && computerSelection === 'rock') {
            roundResult.textContent = 'You win! Paper beats Rock';
        }
    }
    
    if (beats(playerSelection, computerSelection) === 'Computer wins') {
        computerScore += 1;
        displayScores(playerScore, computerScore);
        if (playerSelection === 'scissors' && computerSelection === 'rock') {
            roundResult.textContent = 'You lose! Rock beats Scissors';
        } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
            roundResult.textContent = 'You lose! Scissors beats Paper';
        } else if (playerSelection === 'rock' && computerSelection === 'paper') {
            roundResult.textContent = 'You lose! Paper beats Rock';
        }
    }
    
    if (beats(playerSelection, computerSelection) === 'Both tie') { 
            displayScores(playerScore, computerScore);     
            roundResult.textContent = 'It\'s a tie!';
    }
    playedRounds += 1;
}

function playGame(event) {
    event.preventDefault();
    let gameRounds = getRounds();

    for(let i = 1; i <= gameRounds; i++) {
        whatRound.textContent = `--Round ${i}--${gameRounds}`;

        let target = event.target;
        let playerSelection = target.id;
        let computerSelection = computerPlay();
        if (playedRounds > gameRounds) {
            setGameOver();
        }      
        playRound(playerSelection, computerSelection);
    }
    displayFinalScores();
}

const buttons = document.querySelectorAll('.buttons');
buttons.forEach(function(button) {
    button.addEventListener('click', playGame);
});
