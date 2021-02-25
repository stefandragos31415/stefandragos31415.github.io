// GENERAL
var players = ["X", "O"];
var currentPlayer = 0;

// SETUP CANVAS
const canvas = document.getElementById("canvas");
canvas.addEventListener("mouseup", mouseClick, false); // ADD mouseClick event listener

// Config drawing parameters
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
ctx.strokeStyle = "white";
ctx.font = "80px Arial";
ctx.fillStyle = "white";

// Create board object
let gameBoard = new board(3, 300);
gameBoard.reset();

// Define Cell
function cell(row, col, value = "") {
  this.row = row;
  this.col = col;
  this.value = value;
  this.isClicked = false;

  this.draw = function (symbolColor = "white") {
    let x = this.col * gameBoard.cellSize;
    let y = this.row * gameBoard.cellSize;
    ctx.strokeRect(x, y, gameBoard.cellSize, gameBoard.cellSize);
    ctx.fillStyle = symbolColor;
    ctx.fillText(this.value, x + 20, y + 80);
  };
}

// Define Board
function board(cellNum, boardSize) {
  this.boardSize = boardSize;
  this.cellSize = this.boardSize / cellNum;
  this.winCondition = false;
  this.cells = [[], [], []];
  this.roundNumber = 0;

  // RESET/CREATE BOARD 3x3
  this.reset = function () {
    for (let col = 0; col < cellNum; col++) {
      for (let row = 0; row < cellNum; row++) {
        this.cells[row][col] = new cell(row, col, ""); //[row * 3 + col]
      }
    }
    this.draw();
    this.winCondition = false;
    this.roundNumber = 0;
    printAnswer("answer2", "");
  };
  // DRAW BOARD
  this.draw = function () {
    ctx.clearRect(0, 0, 300, 300); // clear board
    for (let col = 0; col < 3; col++) {
      for (let row = 0; row < 3; row++) {
        this.cells[row][col].draw();
      }
    }
  };
  // CLICK ON THE BOARD
  this.click = function (row, col) {
    if (this.winCondition) {
      this.reset();
      return;
    }
    if (this.roundNumber == 9) {
      this.reset();
      return;
    }

    let clickedCell = this.cells[row][col];
    if (clickedCell.isClicked == false) {
      clickedCell.isClicked = true;
      clickedCell.value = players[currentPlayer];
      clickedCell.draw();
      this.winCondition = this.checkWinConditions(row, col);

      // console.log("row:", clickedCell.row, "col:", clickedCell.col);
      // console.log("win " + this.winCondition);
      // console.log("round " + this.roundNumber);

      if (this.roundNumber == 9) {
        printAnswer("answer2", "DRAW");
      } else if (this.winCondition) {
        printAnswer("answer2", players[currentPlayer] + " WINS!");
      }
      currentPlayer = currentPlayer == 0 ? 1 : 0;
    }
  };
  // CHECK WIN CONDITIONS
  this.checkWinConditions = function (row, col) {
    // check row
    if (
      this.cells[row][0].value == players[currentPlayer] &&
      this.cells[row][1].value == players[currentPlayer] &&
      this.cells[row][2].value == players[currentPlayer]
    ) {
      this.cells[row][0].draw("green");
      this.cells[row][1].draw("green");
      this.cells[row][2].draw("green");
      return true;
    }

    // check column
    if (
      this.cells[0][col].value == players[currentPlayer] &&
      this.cells[1][col].value == players[currentPlayer] &&
      this.cells[2][col].value == players[currentPlayer]
    ) {
      this.cells[0][col].draw("green");
      this.cells[1][col].draw("green");
      this.cells[2][col].draw("green");
      return true;
    }

    // Check diagonal L-R
    if (
      this.cells[0][0].value == players[currentPlayer] &&
      this.cells[1][1].value == players[currentPlayer] &&
      this.cells[2][2].value == players[currentPlayer]
    ) {
      this.cells[0][0].draw("green");
      this.cells[1][1].draw("green");
      this.cells[2][2].draw("green");
      return true;
    }

    // Check diagonal R-L
    if (
      this.cells[0][2].value == players[currentPlayer] &&
      this.cells[1][1].value == players[currentPlayer] &&
      this.cells[2][0].value == players[currentPlayer]
    ) {
      this.cells[0][2].draw("green");
      this.cells[1][1].draw("green");
      this.cells[2][0].draw("green");
      return true;
    }

    // Check for Draw win condition
    if (this.roundNumber == 9) {
      return true;
    } else {
      // If no win conditions => increment round number
      this.roundNumber++;
      return false;
    }
  };
}

function mouseClick(event) {
  let row = Math.floor(event.offsetY / 100);
  let col = Math.floor(event.offsetX / 100);
  gameBoard.click(row, col);
}
