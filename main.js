const player = (name, sign) => {
  let score = 0;
  const changeScore = (value) => {
    score = +value;
  };
  const showScore = () => {
    const x = score;
    return x;
  };
  return { name, sign, changeScore, showScore };
};

const gameSystem = (() => {
  const main = document.querySelector("main");

  this.player1 = "";
  this.player2 = "";

  this.player1Sign = "";
  this.player2Sign = "";

  // Function that shows the player his options to start playing.
  const showPlayingOptions = () => {
    main.innerHTML = `
    <div class="options">
    <p class="instruction">
    <span class="heading">
    Greetings
    </span>
    Please select one of the playing options below.
      </p>
      <span class="heading">Play</span>
      <button class="option" id="againstFriend">Against Friend</button>
      <button class="option" id="againstAI">Against AI</button>
      <span class="heading">Or</span>
      <button class="option">Invite a friend</button>
    </div>
    `;
  };

  // Function that allow the player to set up a game to play against his friend on the same computer.
  const playAgainstFriend = (e) => {
    if (e.target.id !== "againstFriend") return;
    main.innerHTML = `
    <div class="options">
    <button class="fa fa-remove" id="remove"></button>
      <div class="player-one">
        <span class="heading2">Player One</span> <span class="heading3">Name:</span>
        <input type="text" name="player1Name" id="player1Name" />
        <img src="./imgs/lightX.png" alt="X sign" class="sign">
      </div>
      <div class="player-two">
        <span class="heading2">Player Two</span> <span class="heading3">Name:</span>
        <input type="text" name="player2Name" id="player2Name" />
        <img src="./imgs/lightO.png" alt="O sign" class="sign">
      </div>
      <button class="play" id="againstFriendPlay">Play</button>
    </div>
    `;
  };

  // Function that allow the player to set up a game to play against AI.
  const playAgainstAI = (e) => {
    if (e.target.id !== "againstAI") return;

    main.innerHTML = `
    <div class="options">
    <button class="fa fa-remove" id="remove"></button>
      <div class="player-one">
        <span class="heading2">Player One</span> <span class="heading3">Name:</span>
        <input type="text" name="player1Name" id="player1Name" />
        <img src="./imgs/lightX.png" alt="X sign" class="signSelect"> <img src="./imgs/lightO.png" alt="O sign" class="signSelect">
      </div>
      <div class="AIoptions">
        <span class="heading2">AI</span>
        <span>Please select a difficulty</span>
        <button class="option">Easy Mode</button>
        <button class="option">Normal Mode</button>
        <button class="option">Hard Mode</button>
      </div>
    </div>
    `;
  };

  // Function that start the game against a friend on the same computer.
  const againstFriend = (e) => {
    if (e.target.id !== "againstFriendPlay") return;

    gameSystem.player1 = player(
      document.getElementById("player1Name").value,
      "X"
    );
    gameSystem.player2 = player(
      document.getElementById("player2Name").value,
      "O"
    );

    gameSystem.player1Sign = gameSystem.player1.sign;
    gameSystem.player2Sign = gameSystem.player2.sign;

    main.innerHTML = `
    <div class="player1Info">
      <span class="heading">${gameSystem.player1.name}</span>
      <img src="./imgs/lightX.png" alt="" />
      <span class="heading" id="score1">Score: ${gameSystem.player1.showScore()}</span>
    </div>
    <div class="playGround">
      <ul class="gameBoard">
        <li id="c1"></li>
        <li id="c2"></li>
        <li id="c3"></li>
        <li id="c4"></li>
        <li id="c5"></li>
        <li id="c6"></li>
        <li id="c7"></li>
        <li id="c8"></li>
        <li id="c9"></li>
      </ul>
    </div>
    <div class="player2Info">
      <span class="heading"> ${gameSystem.player2.name} </span>
      <img src="./imgs/lightO.png" alt="" />
      <span class="heading" id="score2">Score: ${gameSystem.player2.showScore()}</span>
    </div>
    `;
  };

  // Function that renders the new score after a round ends.
  const renderScore = () => {
    document.getElementById(
      "score1"
    ).innerText = `Score: ${gameSystem.player1.showScore()}`;
    document.getElementById(
      "score2"
    ).innerText = `Score: ${gameSystem.player2.showScore()}`;
  };

  // Function that shows the winner name and give the players the option to start new game or a round.
  const renderWinner = (playerName) => {
    const friends = `${playerName} HAVE WON!!!`;
    const tie = `TIE!!!`;
    const winner = document.createElement("div");
    winner.innerHTML = `
      <div class="winnerNotice">
        ${playerName == "tie" ? tie : friends}
        <div class="roundOptions">
          <button id="newRound">New Round</button>
          <button id="newGame">New Game</button>
        </div>
      </div>
    `;
    winner.classList.add("winnerNoticeScreen");
    winner.setAttribute("id", "winnerScreen");

    main.appendChild(winner);
  };

  // Function that update the score of the players.
  const scoreUpdate = () => {
    if (gameBoard.winnerCheck() == gameSystem.player1.sign) {
      gameSystem.player1.changeScore("1");
      renderScore();
      gameSystem.player1.name !== ""
        ? renderWinner(gameSystem.player1.name)
        : renderWinner(gameSystem.player1.sign);
      return;
    } else if (gameBoard.winnerCheck() == gameSystem.player2.sign) {
      gameSystem.player2.changeScore("1");
      gameSystem.player2.name !== ""
        ? renderWinner(gameSystem.player2.name)
        : renderWinner(gameSystem.player2.sign);
      renderScore();
      return;
    } else if (gameBoard.winnerCheck() == "tie") {
      renderWinner(gameBoard.winnerCheck());
    }
  };

  // Function that start the game system.
  const startGame = (e) => {
    if (e.target.id == "againstFriend") playAgainstFriend(e);
    else if (e.target.id == "againstAI") playAgainstAI(e);
    else if (e.target.id == "againstFriendPlay") againstFriend(e);
  };

  const startNewRound = (e) => {
    if (e.target.id !== "newRound") return;
    gameBoard.clearBoard();
    main.removeChild(document.getElementById("winnerScreen"));
  };

  const restartGame = (e) => {
    if (e.target.id !== "newGame") return;
    main.innerHTML = "";
    player1 = "";
    player2 = "";
    player1Sign = "";
    player2Sign = "";
    showPlayingOptions();
  };

  return {
    startGame,
    showPlayingOptions,
    player1Sign,
    player2Sign,
    scoreUpdate,
    startNewRound,
    restartGame,
  };
})();

const gameBoard = (() => {
  let board = [];
  this.turn = gameSystem.player1Sign;

  // Function that renders the game board.
  const renderBoard = (id) => {
    const cell = document.getElementById(id);
    const currentSign = board.length - 1;
    cell.innerText = board[currentSign];
  };

  // Function that allow players to add signs to the game board.
  const addSign = (e) => {
    if (e.target.tagName !== "LI") return;
    else if (document.getElementById(e.target.id).innerText !== "") return;
    board.push(this.turn);
    renderBoard(e.target.id);
    this.turn == gameSystem.player1Sign
      ? (this.turn = gameSystem.player2Sign)
      : (this.turn = gameSystem.player1Sign);
    gameSystem.scoreUpdate();
  };

  // Function that check the result of the round.
  const winnerCheck = () => {
    const possibilities = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [4, 5, 6],
      [7, 8, 9],
    ];
    if (board.includes("")) {
      board.shift();
    }
    for (i = 0; possibilities.length > i; i++) {
      const tic = document.getElementById(`c${possibilities[i][0]}`).innerText;
      const tac = document.getElementById(`c${possibilities[i][1]}`).innerText;
      const toe = document.getElementById(`c${possibilities[i][2]}`).innerText;
      if (tic == tac && tic == toe && tic !== "") {
        return tic;
      }
    }
    if (board.length == 9) return "tie";
  };

  // Function that clear the game board allow a new round to start.
  const clearBoard = () => {
    board.length = 0;
    const gameBoard = document.querySelector(".gameBoard").childNodes;
    gameBoard.forEach((cell) => (cell.innerText = ""));
  };

  return {
    addSign,
    winnerCheck,
    clearBoard,
    board
  };
})();

window.addEventListener("click", gameSystem.startGame);
window.addEventListener("click", gameBoard.addSign);
window.addEventListener("click", gameSystem.startNewRound);
window.addEventListener("click", gameSystem.restartGame);
window.addEventListener("click", (e) => {
  if (e.target.id !== "remove") return;
  gameSystem.showPlayingOptions();
});

gameSystem.showPlayingOptions();
