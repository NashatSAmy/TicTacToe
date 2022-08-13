const player = (name, sign) => {
  let score = 0;
  const changeScore = (value) => {
    score += +value;
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

  this.AILevel = "";
  this.AIOn = false;

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
        <img src="./imgs/lightX.png" alt="X sign" class="signSelect" id="X"> <img src="./imgs/lightO.png" alt="O sign" class="signSelect" id="O">
      </div>
      <div class="AIoptions">
        <span class="heading2">AI</span>
        <span>Please select a difficulty</span>
        <button class="option" id="easy">Easy Mode</button>
        <button class="option" id="normal">Normal Mode</button>
        <button class="option" id="unfair">Unfair Mode</button>
      </div>
    </div>
    `;

    const signs = document.querySelectorAll(".signSelect");
    signs.forEach((sign) => {
      return sign.addEventListener("click", (e) =>
        sign.classList.contains("selected")
          ? sign.classList.remove("selected")
          : sign.classList.add("selected")
      );
    });
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

    gameBoard.roundStart();
    const li = document.querySelectorAll("li");
    li.forEach((li) => li.addEventListener("click", gameBoard.addSign));
  };

  // Function that start the game against an AI.
  const againstAI = (e) => {
    if (
      e.target.id !== "easy" &&
      e.target.id !== "normal" &&
      e.target.id !== "unfair"
    )
      return;

    gameSystem.AIOn = true;

    const signs = {
      X: "./imgs/lightX.png",
      O: "./imgs/lightO.png",
    };

    const AISign = document.querySelector(".selected").id == "X" ? "O" : "X";

    gameSystem.player1 = player(
      document.getElementById("player1Name").value,
      document.querySelector(".selected").id
    );
    gameSystem.player2 = player("AI", AISign);

    gameSystem.player1Sign = gameSystem.player1.sign;
    gameSystem.player2Sign = gameSystem.player2.sign;

    gameSystem.AILevel = e.target.id;

    main.innerHTML = `
    <div class="player1Info">
      <span class="heading">${gameSystem.player1.name}</span>
      <img src=${
        gameSystem.player1Sign == Object.keys(signs)[0] ? signs.X : signs.O
      } alt="X"/>
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
      <img src=${
        gameSystem.player2Sign == Object.keys(signs)[1] ? signs.O : signs.X
      } alt="X"/>
      <span class="heading" id="score2">Score: ${gameSystem.player2.showScore()}</span>
    </div>
    `;

    gameBoard.roundStart();
    const li = document.querySelectorAll("li");
    li.forEach((li) => li.addEventListener("click", gameBoard.addSign));
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
      gameBoard.roundStart();
      gameSystem.player1.changeScore("1");
      renderScore();
      gameSystem.player1.name !== ""
        ? renderWinner(gameSystem.player1.name)
        : renderWinner(gameSystem.player1.sign);
      return;
    } else if (gameBoard.winnerCheck() == gameSystem.player2.sign) {
      gameBoard.roundStart();
      gameSystem.player2.changeScore("1");
      gameSystem.player2.name !== ""
        ? renderWinner(gameSystem.player2.name)
        : renderWinner(gameSystem.player2.sign);
      renderScore();
      return;
    } else if (gameBoard.winnerCheck() == "tie") {
      gameBoard.roundStart();
      renderWinner(gameBoard.winnerCheck());
    }
  };

  // Function that start the game system.
  const startGame = (e) => {
    if (e.target.id == "againstFriend") playAgainstFriend(e);
    else if (e.target.id == "againstAI") playAgainstAI(e);
    else if (e.target.id == "againstFriendPlay") againstFriend(e);
  };

  // Function that allow the player to keep playing and keeping the score.
  const startNewRound = (e) => {
    if (e.target.id !== "newRound") return;
    gameBoard.clearBoard();
    main.removeChild(document.getElementById("winnerScreen"));
  };

  // Function that allow the player to start new game with no game score.
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
    againstAI,
    AILevel,
    AIOn,
  };
})();

const gameBoard = (() => {
  const body = document.querySelector("body");
  const board = [];
  this.turn = "";

  const roundStart = () => {
    gameBoard.turn = gameSystem.player1Sign;
  };

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
    board.push(gameBoard.turn);
    renderBoard(e.target.id);
    gameBoard.turn == gameSystem.player1Sign
      ? (gameBoard.turn = gameSystem.player2Sign)
      : (gameBoard.turn = gameSystem.player1Sign);
    gameSystem.scoreUpdate();
    if (gameSystem.AIOn && winnerCheck() == undefined)
      body.classList.add("stop");
    setTimeout(() => {
      AIPlay(gameSystem.AILevel);
    }, 500);
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

  // Function that make the AI place a sign on the game board with different levels of complexity.
  const AIPlay = (level) => {
    if (
      gameSystem.AIOn == false ||
      gameBoard.turn == gameSystem.player1Sign ||
      winnerCheck() !== undefined
    )
      return;

    if (level == "easy") {
      let emptyCells = [];
      const emptyCellsCheck = document
        .querySelectorAll("li")
        .forEach((cell) => {
          emptyCells.push({
            id: cell.id,
            empty: cell.innerText == "" ? true : false,
          });
        });
      emptyCells = emptyCells.filter((cell) => cell.empty == true);

      const cellID = Math.floor(Math.random() * emptyCells.length);

      board.push(gameBoard.turn);
      renderBoard(emptyCells[cellID].id);

      gameBoard.turn = gameSystem.player1Sign;
      body.classList.remove("stop");
      gameSystem.scoreUpdate();
    } else if (level == "normal") {
      const possibilities = [
        ["c1", "c2", "c3"],
        ["c1", "c5", "c9"],
        ["c1", "c4", "c7"],
        ["c2", "c5", "c8"],
        ["c3", "c6", "c9"],
        ["c3", "c5", "c7"],
        ["c4", "c5", "c6"],
        ["c7", "c8", "c9"],
      ];
      for (i = 0; i < possibilities.length; i++) {
        const tic = document.getElementById(`${possibilities[i][0]}`).innerText;
        const tac = document.getElementById(`${possibilities[i][1]}`).innerText;
        const toe = document.getElementById(`${possibilities[i][2]}`).innerText;

        if (
          tic == gameSystem.player1Sign &&
          tac == gameSystem.player1Sign &&
          toe == ""
        ) {
          board.push(gameBoard.turn);
          renderBoard(possibilities[i][2]);
          gameBoard.turn = gameSystem.player1Sign;
          body.classList.remove("stop");
          gameSystem.scoreUpdate();
          break;
        } else if (
          tic == gameSystem.player1Sign &&
          toe == gameSystem.player1Sign &&
          tac == ""
        ) {
          board.push(gameBoard.turn);
          renderBoard(possibilities[i][1]);
          gameBoard.turn = gameSystem.player1Sign;
          body.classList.remove("stop");
          gameSystem.scoreUpdate();
          break;
        } else if (
          toe == gameSystem.player1Sign &&
          tac == gameSystem.player1Sign &&
          tic == ""
        ) {
          board.push(gameBoard.turn);
          renderBoard(possibilities[i][0]);
          gameBoard.turn = gameSystem.player1Sign;
          body.classList.remove("stop");
          gameSystem.scoreUpdate();
          break;
        } else if (i == possibilities.length - 1) {
          AIPlay("easy");
        }
      }
    } else if (level == "unfair") {
      const checkCells = () => {
        const cellsInfo = [];
        const cells = document.querySelectorAll("li").forEach((cell) =>
          cellsInfo.push({
            id: cell.id,
            empty: cell.innerText == "" ? true : false,
            sign: cell.innerText,
            index: cellsInfo.length,
          })
        );
        return cellsInfo;
      };

      const checkWinner = (board) => {
        const possibilities = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        const availSpots = board.filter((spot) => spot.empty == true);

        const player1 = { sign: gameSystem.player1Sign, score: -10 };
        const player2 = { sign: gameSystem.player2Sign, score: 10 };

        const players = [player1, player2];

        for (let player of players) {
          for (i = 0; i < possibilities.length; i++) {
            const tic = board[possibilities[i][0]].sign;
            const tac = board[possibilities[i][1]].sign;
            const toe = board[possibilities[i][2]].sign;
            const playerSign = player.sign;

            if (tic == tac && tic == toe && tic == playerSign) {
              return player.score;
            }
          }
        }

        if (availSpots.length == "0") {
          return 0;
        }
      };

      const minMax = (newBoard, player) => {
        const availSpots = newBoard.filter((spot) => spot.empty == true);
        if (checkWinner(newBoard) !== undefined)
          return { score: checkWinner(newBoard) };
        const movesList = [];
        let count = 0;

        for (let i = count; i < availSpots.length; i++) {
          const spotIndex = availSpots[i].index;
          const move = {};
          move.id = availSpots[i].id;
          newBoard[spotIndex].sign = player;
          newBoard[spotIndex].empty = false;

          player == gameSystem.player1Sign
            ? (move.score = minMax(newBoard, gameSystem.player2Sign).score)
            : (move.score = minMax(newBoard, gameSystem.player1Sign).score);

          newBoard[spotIndex].sign = "";
          newBoard[spotIndex].empty = true;
          movesList.push(move);
        }

        let bestMove;

        if (player == gameSystem.player1Sign) {
          let bestScore = Infinity;
          for (i = 0; i < movesList.length; i++) {
            if (movesList[i].score < bestScore) {
              bestScore = movesList[i].score;
              bestMove = i;
            }
          }
        } else {
          let bestScore = -Infinity;
          for (i = 0; i < movesList.length; i++) {
            if (movesList[i].score > bestScore) {
              bestScore = movesList[i].score;
              bestMove = i;
            }
          }
        }

        return movesList[bestMove];
      };

      board.push(gameBoard.turn);
      renderBoard(minMax(checkCells(), gameBoard.turn).id);
      gameBoard.turn = gameSystem.player1Sign;
      body.classList.remove("stop");
      gameSystem.scoreUpdate();
    }
  };

  return {
    addSign,
    winnerCheck,
    clearBoard,
    roundStart,
  };
})();

window.addEventListener("click", gameSystem.startGame);
window.addEventListener("click", gameSystem.startNewRound);
window.addEventListener("click", gameSystem.restartGame);
window.addEventListener("click", gameSystem.againstAI);

window.addEventListener("click", (e) => {
  if (e.target.id !== "remove") return;
  gameSystem.showPlayingOptions();
});

gameSystem.showPlayingOptions();
