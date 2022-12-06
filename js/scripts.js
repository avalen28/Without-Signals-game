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
  const healthButton = document.getElementById("health-button");
  const winPage = document.getElementById("win-page");
  const losePage = document.getElementById("lose-page");
  const soldierMsg = document.getElementById("soldier-msg");
  const tyranidMsg = document.getElementById("tyranid-msg");
  const soldierStats = document.getElementById("soldier-stats");
  const tyranidStats = document.getElementById("tyranid-stats");
  const returnStartButtonWin = document.getElementById(
    "return-start-button-win"
  );
  const returnStartButtonLose = document.getElementById(
    "return-start-button-lose"
  );
  const speakers = document.getElementById("speakers");
  speakers.onclick = function () {
    introSound.play();
  };
  startButton.onclick = function () {
    introSound.pause();
    startPage.style = "display: none";
    canvasMap.style = "display: flex";
    const game = new Game(
      canvasMap,
      canvasFight,
      ctxMap,
      ctxFight,
      fightEvent,
      startFightButton,
      attackButton,
      healthButton,
      winPage,
      losePage,
      soldierMsg,
      tyranidMsg,
      soldierStats,
      tyranidStats,
      returnStartButtonWin //
    );
    game.start();
  };
  returnStartButtonWin.onclick = function () {
    window.location.reload();
  };
  returnStartButtonLose.onclick = function () {
    window.location.reload();
  };
};
