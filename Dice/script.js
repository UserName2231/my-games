let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let dice1 = 0;
let dice2 = 0;

function updateTurnInfo() {
    document.getElementById('turnInfo').innerText = `Ход: Игрок ${currentPlayer}`;
}

function rollDice() {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    
    document.getElementById('diceResult').innerText = `${dice1} и ${dice2}`;
    document.getElementById('choiceArea').classList.remove('hidden');
}

function chooseSeparate() {
    let result = dice1 + dice2;
    addScore(result);
    nextTurn();
}

function chooseSum() {
    let result = dice1 + dice2;
    addScore(result);
    nextTurn();
}

function skipTurn() {
    nextTurn();
}

function addScore(points) {
    if (currentPlayer === 1) {
        player1Score += points;
    } else {
        player2Score += points;
    }
    updateScores();
}

function updateScores() {
    document.getElementById('playersArea').innerHTML = `
        <div class="player">
            <h3>Игрок 1: ${player1Score} очков</h3>
        </div>
        <div class="player">
            <h3>Игрок 2: ${player2Score} очков</h3>
        </div>
    `;
    
    if (player1Score >= 12 || player2Score >= 12) {
        let winner = player1Score >= 12 ? 1 : 2;
        alert(`Игрок ${winner} победил!`);
        resetGame();
    }
}

function nextTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateTurnInfo();
    document.getElementById('choiceArea').classList.add('hidden');
}

function resetGame() {
    currentPlayer = 1;
    player1Score = 0;
    player2Score = 0;
    updateTurnInfo();
    updateScores();
    document.getElementById('choiceArea').classList.add('hidden');
}

window.rollDice = rollDice;
window.chooseSeparate = chooseSeparate;
window.chooseSum = chooseSum;
window.skipTurn = skipTurn;

updateScores();