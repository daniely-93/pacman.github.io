
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeGhostsColor() {
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = getRandomColor();
  }
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function changeCellColor(location, color) {
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.style.color = color;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getAvailableLoc() {
  var i = getRandomIntInclusive(1, gBoard[0].length - 1);
  var j = getRandomIntInclusive(1, gBoard.length - 1);
  while (gBoard[i][j] !== FOOD) {
    i = getRandomIntInclusive(1, gBoard[0].length - 1);
    j = getRandomIntInclusive(1, gBoard.length - 1);
  }
  return { i, j };
}

function getAvailableLocPacmanAway() {
  var i = getRandomIntInclusive(1, gBoard[0].length - 2);
  var j = getRandomIntInclusive(1, gBoard.length - 2);
  while (gBoard[i][j] === WALL || isPacmanAround({ i, j })) {
    i = getRandomIntInclusive(1, gBoard[0].length - 2);
    j = getRandomIntInclusive(1, gBoard.length - 2);
  }
  return { i, j };
}

function isPacmanAround(location) {
  for (var i = location.i - 1; i <= location.i + 1; i++) {
    for (var j = location.j - 1; j <= location.j + 1; j++) {
      if (i < 1 || i >= gBoard[0].length) continue;
      if (j < 1 || i >= gBoard.length) continue;
      var currCell = gBoard[i][j];
      if (currCell === PACMAN) {
        return true
      };
    }
  }
  return false;
}