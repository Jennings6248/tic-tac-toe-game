const PLAYER_X = 1
const PLAYER_O = -1

let turn = PLAYER_X

const X_WON = PLAYER_X
const O_WON = PLAYER_O
const TIE = 'T'
const IN_PLAY = null

let winner = IN_PLAY

const arrayOfCells = [null, null, null, null, null, null, null, null, null]

let cellElements = document.querySelectorAll('.cell')
let gameMessageElement = document.querySelector('.message')

console.log(cellElements)

const cellColorGuide = {
  [PLAYER_X]: 'green',
  [PLAYER_O]: 'red',
  null: 'grey',
}

const getCellColor = function(cellIndex) {
  const theKey = arrayOfCells[cellIndex]
  return cellColorGuide[theKey]
}

console.log(getCellColor(0) === 'green', getCellColor(0))
console.log(getCellColor(8) === 'red', getCellColor(8))
console.log(getCellColor(4) === 'grey', getCellColor(4))

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
  [0, 4, 8],
]

const didPlayerXWin = function() {
  if (
    arrayOfCells[winningCombinations[0][0]] === 1 &&
    arrayOfCells[winningCombinations[0][1]] === 1 &&
    arrayOfCells[2] === 1
  ) {
    return true
  }
}
console.log(didPlayerXWin() === true)

cellElements.forEach(function(cellElement, i) {
  let cellValue = arrayOfCells[i]
  let cellBackgroundColor = cellColorGuide[cellValue]
  cellElement.style.backgroundColor = cellBackgroundColor
})

const getCurrentText = function() {
  if (winner === IN_PLAY && turn === PLAYER_X) {
    return `X's turn to play`
  } else if (winner === IN_PLAY && turn === PLAYER_O) {
    return `O's turn to play`
  } else if (winner === TIE) {
    return `TIE`
  } else if (winner === X_WON) {
    return 'Congrats! X has won the game'
  } else if (winner === O_WON) {
    return 'Congrats! O has won the game'
  }
}

console.log(getCurrentText() === "X's turn to play")

gameMessageElement.textContent = getCurrentText()

cellElements.forEach(function(cellElement, i) {
  cellElement.addEventListener('click', function(event) {
    let cellValue = arrayOfCells[i]
    if (cellValue === PLAYER_X || cellValue === PLAYER_O) {
      return
    }
    if (winner !== null) {
      return
    }

    arrayOfCells[i] = turn

    if (turn === PLAYER_X) {
      turn = PLAYER_O
    } else if (turn === PLAYER_O) {
      turn = PLAYER_X
    }
  })
})
