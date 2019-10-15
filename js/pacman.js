var gPacman;
const PACMAN = '🌝';

function createPacman(board) {
  var pacmanLoc = getAvailableLoc();
  gPacman = {
    location: {
      i: pacmanLoc.i,
      j: pacmanLoc.j
    },
    isSuper: false,
    direction: 0
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;

}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);
  else if (nextCell === CHERRY) updateScore(10);
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      for (var i = 0; i < gGhosts.length; i++) {
        if (nextLocation.i === gGhosts[i].location.i && nextLocation.j === gGhosts[i].location.j) {
          removeGhost(i);
        }
      }
    } else {
      renderCell(gPacman.location, EMPTY);
      displayMsgModal('Game Over! :(', 'red', true);
      gameOver();
      return;
    }
  } else if (nextCell === POWER_FOOD) {
    if (gPacman.isSuper) return;
    changeGhostsColor();
    gPacman.isSuper = true;
    setTimeout(() => { gPacman.isSuper = false; }, 5000);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  var iDirection = gPacman.location.i - nextLocation.i;
  var jDirection = gPacman.location.j - nextLocation.j;
  if(iDirection === -1) gPacman.direction = 0;
  if(iDirection === 1) gPacman.direction = 180;
  if(jDirection === -1) gPacman.direction = 270;
  if(jDirection === 1) gPacman.direction = 90;
  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  updatePacmanDir(gPacman.direction);
  if (checkVictory()) {
    displayMsgModal('You won! :)', 'green', true);
    gameOver();
  }
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function updatePacmanDir(deg) {
  var elPacmanCell = document.querySelector(`.cell${gPacman.location.i}-${gPacman.location.j}`);
  elPacmanCell.style.webkitTransform = 'rotate(' + deg + 'deg)';
  elPacmanCell.style.mozTransform = 'rotate(' + deg + 'deg)';
  elPacmanCell.style.msTransform = 'rotate(' + deg + 'deg)';
  elPacmanCell.style.oTransform = 'rotate(' + deg + 'deg)';
  elPacmanCell.style.transform = 'rotate(' + deg + 'deg)';

}