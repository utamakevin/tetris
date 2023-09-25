const startButton = document.querySelector(".start-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")
const rotateButton = document.querySelector(".rotate-button")
const downButton = document.querySelector(".down-button")

let gridWidth = null
let input = null

let anchor = 4
let shape = "T"
let rotation = 0

let bounds = {
    top: false,
    right: false,
    bottom: false,
    left: false
}

// creates grid (width, height)
createGrid(10, 20)

let squares = Array.from(document.querySelectorAll(".square"))
console.log(squares)

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
        bounds.left = true
        console.log("bound left met")
        leftButton.disabled = true
    } else {
        bounds.left = false
        console.log("bound left released")
        leftButton.disabled = false
    }

    if (anchor + tetrominoes[shape].occupiedWidth[rotation] == gridWidth ) {
        rightButton.disabled = true
    } else {
        rightButton.disabled = false
    }
}

function moveTetromino(input) {
    clearBoard()
    if (input == "left" && anchor > 0) {
        anchor--
    }
    if (input == "right" && anchor < 8) {
        anchor++
    }
    drawTetromino(anchor, shape, rotation)
}

function rotateTetromino() {
    clearBoard()
    if (rotation == 3) {
        rotation = 0
    } else {
        rotation++
    }
    drawTetromino(anchor, shape, rotation)
}

async function placeTetromino() {
    let counter = 0
    while (counter < 10) {
        await new Promise(resolve => setTimeout(resolve, 300))
        clearBoard()
        anchor += gridWidth 
        drawTetromino(anchor, shape, rotation)
        counter++
    }
}

drawTetromino(anchor, shape, rotation)
function gameLoop() {

}

startButton.addEventListener("click", gameLoop)
leftButton.addEventListener("click", leftButtonClicked)
rightButton.addEventListener("click", rightButtonClicked)
rotateButton.addEventListener("click", rotateButtonClicked)
downButton.addEventListener("click", downButtonClicked)