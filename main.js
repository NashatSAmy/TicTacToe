const gameBoard = (() => {
  let board = [];
  this.turn = "X";
  const renderBoard = (id) => {
    const cell = document.getElementById(id);
    const currentSign = board.length - 1;
    cell.innerText = board[currentSign]
  }
  const addSign = (e) => {
    if (document.getElementById(e.target.id).innerText !== "") return;
    board.push(this.turn);
    renderBoard(e.target.id)
    this.turn == "X" ? this.turn = "O" : this.turn = "X";
  }
  return {
    addSign
  }
})()

const cells = document.querySelectorAll("li")

cells.forEach(call => call.addEventListener("click", gameBoard.addSign))