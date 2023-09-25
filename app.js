const startButton = document.querySelector(".start-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")
const rotateButton = document.querySelector(".rotate-button")
const downButton = document.querySelector(".down-button")

let gridWidth = 10
let gridHeight = 20

let input = null
let depthCounter = 0

let anchor = 4
let shape = "L"
let rotation = 0

let bounds = {
    bottom: false,
}

createGrid(gridWidth, gridHeight)

let squares = Array.from(document.querySelectorAll(".square"))

function leftButtonClicked() {
    console.log("left clicked")
    moveTetromino("left")
    checkBound(anchor, shape, rotation)
}
function rightButtonClicked() {
    console.log("right clicked")
    moveTetromino("right")
    checkBound(anchor, shape, rotation)
}
function rotateButtonClicked() {
    console.log("rotate clicked")
    rotateTetromino(input)
}
function downButtonClicked() {
    console.log("down clicked")
    input = "down"
    placeTetromino()
}

function createGrid(numberOfColumns, numberOfRows) {
    const main = document.querySelector(".main")
    gridWidth = numberOfColumns

    for (i = 0; i < numberOfRows; i++) {
        const row = document.createElement("div")
        row.classList.add("row")
        main.appendChild(row)

        for (j = 0; j < numberOfColumns; j++) {
            const square = document.createElement("div")
            square.classList.add("square")
            row.appendChild(square)
        }
    }
}

const tetrominoes = {
    I: {
        possibleRotation: [
            [0, 0 + gridWidth, 0 + gridWidth*2, 0 + gridWidth*3],
            [0, 0 + 1, 0 + 2, 0 + 3],
            [0, 0 + gridWidth, 0 + gridWidth*2, 0 + gridWidth*3],
            [0, 0 + 1, 0 + 2, 0 + 3],
        ],
        occupiedHeight: [4, 1, 4, 1],
        occupiedWidth: [1, 4, 1, 4]
    },
    S: {
        possibleRotation: [
            [0 + 1, 0 + 2, 0 + gridWidth, 0 + gridWidth + 1],
            [0, 0 + gridWidth, 0 + gridWidth + 1, 0 + gridWidth*2 + 1],
            [0 + 1, 0 + 2, 0 + gridWidth, 0 + gridWidth + 1],
            [0, 0 + gridWidth, 0 + gridWidth + 1, 0 + gridWidth*2 + 1],
        ],
        occupiedHeight: [2, 4, 2, 4],
        occupiedWidth: [4, 2, 4, 2]
    },
    O: {
        possibleRotation: [
            [0, 0 + 1, 0 + gridWidth, 0 + gridWidth + 1],
            [0, 0 + 1, 0 + gridWidth, 0 + gridWidth + 1],
            [0, 0 + 1, 0 + gridWidth, 0 + gridWidth + 1],
            [0, 0 + 1, 0 + gridWidth, 0 + gridWidth + 1],
        ],
        occupiedHeight: [2, 2, 2, 2],
        occupiedWidth: [2, 2, 2, 2]
    },
    L: {
        possibleRotation: [
            [0, 0 + gridWidth, 0 + gridWidth*2, 0 + gridWidth*2 + 1],
            [0, 0 + 1, 0 + 2, 0 + gridWidth],
            [0, 0 + 1, 0 + gridWidth + 1, 0 + gridWidth*2 + 1],
            [0 + 2, 0 + gridWidth, 0 + gridWidth + 1, 0 + gridWidth + 2 ]
        ],
        occupiedHeight: [3, 2, 3, 2],
        occupiedWidth: [2, 3, 2, 3]
    },
    T: {
        possibleRotation: [
            [0, 0 + 1, 0 + 2, gridWidth + 1],
            [0 + 1, gridWidth, gridWidth + 1, gridWidth*2 + 1],
            [0 + 1, gridWidth, gridWidth + 1, gridWidth + 2],
            [0, gridWidth, gridWidth + 1, gridWidth*2]
        ],
        occupiedHeight: [2, 3, 2, 3],
        occupiedWidth: [3, 2, 3, 2]
    },
}

function drawTetromino(anchor, shape, rotation) {
    tetrominoes[shape].possibleRotation[rotation].forEach(squareIndex => {
        squares[squareIndex + anchor].classList.add("red")
    })
    checkBound(anchor, shape, rotation)
}

function clearBoard() {
    squares.forEach(square => {
        square.classList.remove("red")
    })
}

function checkBound(anchor, shape, rotation) {
    if (anchor % gridWidth == 0) {
        leftButton.disabled = true
    } else {
        leftButton.disabled = false
    }

    if ((anchor + tetrominoes[shape].occupiedWidth[rotation]) % gridWidth == 0 ) {
        rightButton.disabled = true
    } else {
        rightButton.disabled = false
    }
    
    if (anchor + gridWidth * tetrominoes[shape].occupiedHeight[rotation] >= squares.length) {
        console.log("bottom bound")
        bounds.bottom = true
    }
}

function moveTetromino(input) {
    clearBoard()
    if (input == "left" && anchor % gridWidth > 0) {
        anchor--
    }
    if (input == "right" && (anchor + tetrominoes[shape].occupiedWidth[rotation]) % gridWidth <= gridWidth) {
        anchor++
    }
    drawTetromino(anchor, shape, rotation)
}

function rotateTetromino() {
    clearBoard()

    rotation++
    if (rotation == 4) rotation = 0

    if (gridWidth - anchor % gridWidth < tetrominoes[shape].occupiedWidth[rotation]) {
        console.log('too far')
        anchor = depthCounter * gridWidth + gridWidth - tetrominoes[shape].occupiedWidth[rotation]
        drawTetromino(anchor, shape, rotation)
    } else {
        drawTetromino(anchor, shape, rotation)
    }
}

async function placeTetromino() {
    downButton.disabled = true
    while (bounds.bottom == false) {
        await new Promise(resolve => setTimeout(resolve, 300))
        clearBoard()
        anchor += gridWidth 
        drawTetromino(anchor, shape, rotation)
        depthCounter++
    }
    downButton.disabled = false
    rotateButton.disabled = true
}

drawTetromino(anchor, shape, rotation)
function gameLoop() {

}

startButton.addEventListener("click", gameLoop)
leftButton.addEventListener("click", leftButtonClicked)
rightButton.addEventListener("click", rightButtonClicked)
rotateButton.addEventListener("click", rotateButtonClicked)
downButton.addEventListener("click", downButtonClicked)