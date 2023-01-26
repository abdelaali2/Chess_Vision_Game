const Score = document.getElementById("Score");
const StartBtn = document.getElementById("StartBtn");
const PawnImage = document.getElementById("PawnImage");
const Letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const Numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ChessBoard = document.getElementById("ChessBoard");
const TileDisplay = document.getElementById("TileDisplay");
const ScoreFigure = document.getElementById("ScoreFigure");
const CounterDisplay = document.getElementById("CounterDisplay");
const GameOver = `<span style="top: -0.45em; position: relative;">Game Over</span>`;
const TickMark = `<span id="TickMark" style="  color: transparent;
text-shadow: -1px 1px 2px green, 1px 1px 2px green, 1px -1px 0 green, -1px -1px 0 white; font-size: 1em;">✔</span>`;
const XMark = `<span id="XMark" style="  color: transparent;
text-shadow: -1px 1px 2px red, 1px 1px 2px red, 1px -1px 0 red, -1px -1px 0 white;font-size: 1em;">✘</span>`;
let isON;
let GameScore;
let wantedTile;
let GameTimerId;
let clickedTile;
let GameTimeLeft;
let StartGameCounter;
let isFirstTry = true;

function drawBoard() {
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    for (let j = 0; j < 8; j++) {
      let newID = `${Letters[7 - i]}${Numbers[j]}`;
      const square = document.createElement("div");
      square.addEventListener("click", (e) => {
        playing(e);
      });
      square.className = "square";
      square.id = newID;

      if ((i + j) % 2 === 0) {
        square.style.backgroundColor = "white";
        square.style.opacity = "1";
      }
      const labelLetter = `<span style= "text-shadow: -1px 1px 2px black, 1px 1px 2px black, 1px -1px 0 black, -1px -1px 0 white; color: white; font-size: 2em; margin-top: 5px; margin-left: 5px; position: absolute; z-index: 2;">${
        Letters[7 - (i + j)]
      }</span>`;
      const labelNumber = `<span style= "text-shadow: -1px 1px 2px black, 1px 1px 2px black, 1px -1px 0 black, -1px -1px 0 white; color: white; font-size: 2em; margin-top: 40px; margin-left: 50px;  position: absolute; z-index: 2;">${Numbers[j]}</span>`;
      if (j === 0) {
        row.insertAdjacentHTML("afterbegin", labelLetter);
      }
      if (i === 7) {
        square.insertAdjacentHTML("afterbegin", labelNumber);
      }
      row.appendChild(square);
      ChessBoard.appendChild(row);
    }
  }
}

function EnvironmentSetting() {
  isON = false;
  GameScore = 0;
  GameTimeLeft = 29;
  StartGameCounter = 2;
  CounterDisplay.innerHTML = "00:00";
  CounterDisplay.style.paddingTop = "50px";
  // CounterDisplay.style.fontSize = "1em";
  StartBtn.innerText = `START`;
  Score.innerHTML = GameScore;
  TileDisplay.innerText = "";
  ScoreFigure.innerText = "";
}

function StartGame() {
  EnvironmentSetting();
  // console.log(`first try from startgame ${isFirstTry}`);
  // if (isFirstTry) {
  // isFirstTry = false;
  // console.log(`inside if from startgame ${isFirstTry}`);
  if (!isON) {
    let StartGameTimer = setInterval(countdown, 970);
    function countdown() {
      if (StartGameCounter == -1) {
        isON = true;
        clearTimeout(StartGameTimer);
        GameTime();
      } else {
        StartBtn.style.fontSize = "4em";
        StartBtn.innerHTML = `<span style="top:-0.25em; font-size: 1.15em ; position: relative;">${StartGameCounter + 1}</span>`;
        StartGameCounter--;
      }
    }
    // }
  }
}

function GameTime() {
  StartBtn.style.fontSize = "2em";
  StartBtn.innerText = "Game ON";
  PawnImage.classList.add("animated");
  wantedTile = TileGenerator();
  console.log(`wanted from gametime func ${wantedTile}`);
  GameTimerId = setInterval(countdown, 970);

  function countdown() {
    if (GameTimeLeft == -1) {
      isON = false;
      PawnImage.classList.remove("animated");
      playing();
    } else {
      CounterDisplay.innerHTML = `00:${GameTimeLeft+1}`;
      GameTimeLeft--;
    }
  }
}

function TileGenerator() {
  let TileLetter = Letters[Math.floor(Math.random() * Letters.length)];
  let TileNo = Numbers[Math.floor(Math.random() * Numbers.length)];
  let TileLocation = TileLetter + TileNo;
  TileDisplay.innerText = TileLocation;
  return TileLocation;
}

function playing(event) {
  if (isON) {
    // ChessBoard.removeEventListener("click", TileListening);
    TileListening(event);
  } else {
    clearTimeout(GameTimerId);
    // console.log("Game Over from playing else");
    TileListening(event);
    TileDisplay.innerText = "";
    StartBtn.innerText = `START`;
    CounterDisplay.innerHTML = GameOver;
    CounterDisplay.style.fontSize = "1em";
    CounterDisplay.style.lineHeight = "0.85em";

    TileDisplay.innerText = "";
    // EnvironmentSetting();
  }

  function TileListening(event) {
    if (isON == true) {
      clickedTile = event.target.id;
      // console.log(`wanted from playing func ${wantedTile}`);
      // console.log(`User Pressed ${clickedTile}`);
      if (wantedTile === clickedTile) {
        GameScore++;
        Score.innerHTML = GameScore;
        ScoreFigure.innerHTML += TickMark;
        wantedTile = TileGenerator();
        console.log(`wanted from true ${wantedTile}`);
      } else {
        ScoreFigure.innerHTML += XMark;
        wantedTile = TileGenerator();
        console.log(`wanted from false ${wantedTile}`);
      }
    }
  }
}

drawBoard();
EnvironmentSetting();
