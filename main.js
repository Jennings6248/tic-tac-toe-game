const PLAYER_X = 1
const PLAYER_O = -1

const X_WON = PLAYER_X
const O_WON = PLAYER_O
const TIE = 'T'
const IN_PLAY = null

let arrayOfCells
let turn
let winner

const initializeState = function() {
  arrayOfCells = [null, null, null, null, null, null, null, null, null]
  turn = PLAYER_X
  winner = IN_PLAY
}
initializeState()

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

const didPlayerWin = function() {
  return winningCombinations.some(function(winningCombination) {
    if (
      arrayOfCells[winningCombination[0]] === turn &&
      arrayOfCells[winningCombination[1]] === turn &&
      arrayOfCells[winningCombination[2]] === turn
    ) {
      return true
    }
  })
}

const render = function() {
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

  gameMessageElement.textContent = getCurrentText()
}
render()

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
    let playerWon = didPlayerWin()
    if (turn === PLAYER_X && playerWon) {
      winner = X_WON
    } else if (turn === PLAYER_O && playerWon) {
      winner = O_WON
    } else if (!arrayOfCells.includes(null)) {
      winner = TIE
    } else {
      winner = IN_PLAY
    }

    if (turn === PLAYER_X) {
      turn = PLAYER_O
    } else if (turn === PLAYER_O) {
      turn = PLAYER_X
    }
    render()
  })
})

const button = document.querySelector('.btn')
button.addEventListener('click', function(event){
   initializeState()
   render()
})
