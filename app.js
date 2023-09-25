const startButton = document.querySelector(".start-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")
const rotateButton = document.querySelector(".rotate-button")
const downButton = document.querySelector(".down-button")

let width = null
let input = null

let anchor = 4
let shape = "L"
let rotation = 0

// creates grid (width, height)
createGrid(8, 20)

let squares = Array.from(document.querySelectorAll(".square"))
console.log(squares)

function leftButtonClicked() {
    console.log("left clicked")
    moveTetromino("left")
}
function rightButtonClicked() {
    console.log("right clicked")
    moveTetromino("right")
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
    width = numberOfColumns

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
    I: [
        [0, 0 + width, 0 + width*2, 0 + width*3],
        [0, 0 + 1, 0 + 2, 0 + 3],
        [0, 0 + width, 0 + width*2, 0 + width*3],
        [0, 0 + 1, 0 + 2, 0 + 3],
    ],
    S: [
        [0 + 1, 0 + 2, 0 + width, 0 + width + 1],
        [0, 0 + width, 0 + width + 1, 0 + width*2 + 1],
        [0 + 1, 0 + 2, 0 + width, 0 + width + 1],
        [0, 0 + width, 0 + width + 1, 0 + width*2 + 1],
    ], 
    O: [
        [0, 0 + 1, 0 + width, 0 + width + 1],
        [0, 0 + 1, 0 + width, 0 + width + 1],
        [0, 0 + 1, 0 + width, 0 + width + 1],
        [0, 0 + 1, 0 + width, 0 + width + 1],
    ], 
    L: [
        [0, 0 + width, 0 + width*2, 0 + width*2 + 1],
        [0, 0 + 1, 0 + 2, 0 + width],
        [0, 0 + 1, 0 + width + 1, 0 + width*2 + 1],
        [0 + 2, 0 + width, 0 + width + 1, 0 + width + 2 ]
    ], 
    T: [
        [0, 0 + 1, 0 + 2, width + 1],
        [0 + 1, width, width + 1, width*2 + 1],
        [0 + 1, width, width + 1, width + 2],
        [0, width, width + 1, width*2]
    ]
}

function drawTetromino(anchor, shape, rotation) {
    tetrominoes[shape][rotation].forEach(squareIndex => {
        squares[squareIndex + anchor].classList.add("red")
    })
}

function clearBoard() {
    squares.forEach(square => {
        square.classList.remove("red")
    })
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
        anchor += width 
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