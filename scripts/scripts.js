const allButtons = document.querySelectorAll(".button");
const roundsTag = document.querySelector("#rounds");
const playerWinTag = document.querySelector("#playerWin");
const playerLossesTag = document.querySelector("#playerLosses");
const playerDrawsTag = document.querySelector("#playerDraws");
const computerWinTag = document.querySelector("#computerWin");
const computerLossesTag = document.querySelector("#computerLosses");
const computerDrawsTag = document.querySelector("#computerDraws");
const resultTag = document.querySelector("#result");
const messageTag = document.querySelector("#messages");
const resetGameButton = document.querySelector("#reset");
 

const possibleMove = ["rock", "paper", "scissor"];
let countRounds = 0;

const gameCounter = {
  playerWins: 0,
  playerLosses: 0,
  playerDraws: 0,
  computerWins: 0,
  computerLosses: 0,
  computerDraws: 0,
};

const messages = {
  tie: "It's a tie",
  win: "You won!",
  lose: "You lost!",
};

// Determine win, lose or tie for each round
const decideWinner = (playerMove, computerMove) => {
  resultTag.textContent = `You selected: ${playerMove}, Computer selected: ${computerMove}`;

  let gameResult;

  switch (true) {
    case playerMove === computerMove:
      gameResult = "tie";
      resultTag.textContent += ` - ${messages.tie}`;
      break;

    case playerMove === possibleMove[2] && computerMove === possibleMove[1]:
    case playerMove === possibleMove[0] && computerMove === possibleMove[2]:
    case playerMove === possibleMove[1] && computerMove === possibleMove[0]:
      gameResult = "win";
      resultTag.textContent += ` - ${messages.win}`;
      break;

    default:
      gameResult = "lose";
      resultTag.textContent += ` - ${messages.lose}`;
      break;
  }
  return gameResult;
};

// Store and display the result of each round
const storeAndDisplayGameResult = (gameResult) => {
  switch (gameResult) {
    case "win":
      gameCounter.playerWins++;
      gameCounter.computerLosses++;
      playerWinTag.textContent = gameCounter.playerWins;
      computerLossesTag.textContent = gameCounter.computerLosses;
      messageTag.textContent = messages.win;
      break;

    case "lose":
      gameCounter.computerWins++;
      gameCounter.playerLosses++;
      computerWinTag.textContent = gameCounter.computerWins;
      playerLossesTag.textContent = gameCounter.playerLosses;
      messageTag.textContent = messages.lose;
      break;

    default:
      gameCounter.playerDraws++;
      gameCounter.computerDraws++;
      playerDrawsTag.textContent = gameCounter.playerDraws;
      computerDrawsTag.textContent = gameCounter.computerDraws;
      messageTag.textContent = messages.tie;
      break;
  }
  // setTimeout(() => (resultTag.textContent = ""), 2000);
};

const clearDisplay = () => {
  playerWinTag.textContent = gameCounter.playerWins;
  playerLossesTag.textContent = gameCounter.playerLosses;
  playerDrawsTag.textContent = gameCounter.playerDraws;
  computerWinTag.textContent = gameCounter.computerWins;
  computerLossesTag.textContent = gameCounter.computerLosses;
  computerDrawsTag.textContent = gameCounter.computerDraws;
  roundsTag.textContent = countRounds;
  resultTag.textContent = "";
  messageTag.textContent = "";
};

const gameReset = () => {
  gameCounter.playerWins = 0;
  gameCounter.playerLosses = 0;
  gameCounter.playerDraws = 0;
  gameCounter.computerWins = 0;
  gameCounter.computerLosses = 0;
  gameCounter.computerDraws = 0;
  countRounds = 0;
  clearDisplay();
};

// Add eventListener to buttons
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const randIndex = Math.floor(Math.random() * possibleMove.length);
    let computerMove = possibleMove[randIndex];
    let playerMove = button.id;
    let gameResult = decideWinner(playerMove, computerMove);
    storeAndDisplayGameResult(gameResult);
    countRounds++;
    roundsTag.textContent = countRounds;
  });
});

resetGameButton.addEventListener("click", () => {
  gameReset();
});
