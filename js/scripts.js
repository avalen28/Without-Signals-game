window.onload = function () {
  const canvasMap = document.getElementById("canvas-map");
  const ctxMap = canvasMap.getContext("2d");
  const canvasFight = document.getElementById("canvas-fight");
  const ctxFight = canvasFight.getContext("2d");
  const startPage = document.getElementById("start-page");
  const startButton = document.getElementById("start");
  const fightEvent = document.getElementById("fight-event");
  const startFightButton = document.getElementById("start-fight");
  const attackButton = document.getElementById("attack-button");
  const winPage = document.getElementById("win-page");
  const losePage = document.getElementById("lose-page");
  const soldierMsg = document.getElementById("soldier-msg");
  const tyranidMsg = document.getElementById("tyranid-msg");
  const soldierStats = document.getElementById("soldier-stats");
  const tyranidStats = document.getElementById("tyranid-stats");
  //
  const returnStartButtonWin = document.getElementById(
    "return-start-button-win"
  );

  startButton.onclick = function () {
    startPage.style = "display: none";
    canvasMap.classList.remove("hidden");
    const game = new Game(
      startPage, //
      canvasMap,
      canvasFight,
      ctxMap,
      ctxFight,
      fightEvent,
      startFightButton,
      attackButton,
      winPage,
      losePage,
      soldierMsg,
      tyranidMsg,
      soldierStats,
      tyranidStats,
      returnStartButtonWin //
    );
    console.log("newgame");
    game.start();
  };
  returnStartButtonWin.onclick = function () {
    //   startPage.style = "display: flex";
    //   winPage.classList.add("hidden");
    console.log("holi");
    window.location.reload();
  };
};
