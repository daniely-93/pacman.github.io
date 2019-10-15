'use strict';
const WALL = '🚧';
const FOOD = '●';
const EMPTY = ' ';
const POWER_FOOD = '⚡';
const CHERRY = '🍒';

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

var gIntervalCherries;

function init() {
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // updateElGhostsColor();
  gIntervalCherries = setInterval(() => {
    var loc = getAvailableLocPacmanAway();
    gBoard[loc.i][loc.j] = CHERRY;
    renderCell(loc, CHERRY);
  }, 15000)
  // console.table(gBoard);
  displayMsgModal('', 'white', false);
  gGame.isOn = true;
  gGame.score = 0;
  updateScore(0)
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 1 && j === SIZE - 2 ||
        i === SIZE - 2 && j === 1 ||
        i === 1 && j === 1 ||
        i === SIZE - 2 && j === SIZE - 2) {
        board[i][j] = POWER_FOOD;
      }
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }

    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}

function displayMsgModal(txt, txtColor, show) {
  var elMsgModal = document.querySelector('.game-over');
  var elMsg = elMsgModal.querySelector('.msg');
  elMsg.innerText = txt;
  var displayStr = 'none';
  if (show) displayStr = 'block';
  elMsgModal.style.display = displayStr;
  elMsg.style.color = txtColor;
}

function removeGhost(idx) {
  renderCell(gGhosts[idx].location, EMPTY);
  changeCellColor(gGhosts[idx].location, 'white');
  gGhosts.splice(idx);
  setTimeout(() => { createGhost(gBoard); }, 5000);
}

function checkVictory() {
  for (i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].currCellContent === FOOD ||
      gGhosts[i].currCellContent === POWER_FOOD ||
      gGhosts[i].currCellContent === CHERRY) return false;
  }

  for (var i = 0; i < gBoard[0].length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j] === FOOD ||
        gBoard[i][j] === POWER_FOOD ||
        gBoard[i][j] === CHERRY) return false
    }
  }
  return true;
}