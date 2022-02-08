const moves = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

function getRounds() {
    while (true) {
        rounds = Number(prompt('How many rounds?', ' '));
        if (typeof rounds === 'number') {
            return rounds;
        } 
    } 
}

function playerPlay() {
    while (true) {
        move = (prompt('Rock, Paper, Scissors?', ' ')).toLowerCase();
        if (moves.includes(move)) {
            return move;
        }
    }  
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
    console.log(`Your score: ${pScore}`);
    console.log(`Computer's score: ${cScore}`);
}

function playRound(playerSelection, computerSelection) {
    console.log(`You played ${playerSelection}`);
    console.log(`Computer played ${computerSelection}`);

    if (beats(playerSelection, computerSelection) === 'Player wins') {
        playerScore += 1;
        displayScores(playerScore, computerScore);
        if (playerSelection === 'rock' && computerSelection === 'scissors') {
            console.log('You win! Rock beats Scissors');
        } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
            console.log('You win! Scissors beats Paper');
        } else if (playerSelection === 'paper' && computerSelection === 'rock') {
            console.log('You win! Paper beats Rock');
        }
    }
    
    if (beats(playerSelection, computerSelection) === 'Computer wins') {
        computerScore += 1;
        displayScores(playerScore, computerScore);
        if (playerSelection === 'scissors' && computerSelection === 'rock') {
            console.log('You lose! Rock beats Scissors');
        } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
            console.log('You lose! Scissors beats Paper');
        } else if (playerSelection === 'rock' && computerSelection === 'paper') {
            console.log('You lose! Paper beats Rock');
        }
    }
    
    if (beats(playerSelection, computerSelection) === 'Both tie') { 
            displayScores(playerScore, computerScore);     
            console.log('It\'s a tie!');
    }
}

function playGame() {
    let gameRounds = getRounds();
    
    for(let i = 1; i <= gameRounds; i++) {
        console.log(`--Round ${i}--`);
        let playerSelection = playerPlay();
        let computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
    }

    console.log('--Final Scores--')
    displayScores(playerScore, computerScore);
    if (playerScore > computerScore) {
        console.log('You have won the game!');
    } else if (computerScore > playerScore) {
        console.log('You have lost the game!');
    } else {
        console.log('The game is tied!');
    }
}

playGame();