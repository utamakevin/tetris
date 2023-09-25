const startButton = document.querySelector(".start-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")
const downButton = document.querySelector(".down-button")

let width = null

// creates grid (width, height)
createGrid(8, 20)

let squares = Array.from(document.querySelectorAll(".square"))
console.log(squares)

function leftButtonClicked() {
    console.log("left clicked")
}
function rightButtonClicked() {
    console.log("right clicked")
}
function downButtonClicked() {
    console.log("down clicked")
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
const tetriminoI = [
    [0, 0 + width, 0 + width*2, 0 + width*3],
    [0, 0 + 1, 0 + 2, 0 + 3],
    [0, 0 + width, 0 + width*2, 0 + width*3],
    [0, 0 + 1, 0 + 2, 0 + 3],
]
const tetriminoS = [
    [0 + 1, 0 + 2, 0 + width, 0 + width + 1],
    [0, 0 + width, 0 + width + 1, 0 + width*2 + 1],
    [0 + 1, 0 + 2, 0 + width, 0 + width + 1],
    [0, 0 + width, 0 + width + 1, 0 + width*2 + 1],
]
const tetriminoO = [
    [0, 0 + 1, 0 + width, 0 + width + 1],
    [0, 0 + 1, 0 + width, 0 + width + 1],
    [0, 0 + 1, 0 + width, 0 + width + 1],
    [0, 0 + 1, 0 + width, 0 + width + 1],
]
const tetriminoL = [
    [0, 0 + width, 0 + width*2, 0 + width*2 + 1],
    [0, 0 + 1, 0 + 2, 0 + width],
    [0, 0 + 1, 0 + width + 1, 0 + width*2 + 1],
    [0 + 2, 0 + width, 0 + width + 1, 0 + width + 2 ]
]

// console.log(tetriminoL[0])

function drawTetromino(anchor) {
    tetriminoS[1].forEach(squareIndex => {
        squares[squareIndex + anchor].classList.add("red")
    })
}
drawTetromino(4)
function gameLoop() {

}

startButton.addEventListener("click", gameLoop)
leftButton.addEventListener("click", leftButtonClicked)
rightButton.addEventListener("click", rightButtonClicked)
downButton.addEventListener("click", downButtonClicked)