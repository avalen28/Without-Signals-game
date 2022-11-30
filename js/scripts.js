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

  startButton.onclick = function () {
    startPage.style = "display: none";
    canvasMap.classList.remove("hidden");
    const game = new Game(
      canvasMap,
      canvasFight,
      ctxMap,
      ctxFight,
      fightEvent,
      startFightButton,
      attackButton,
      winPage
    );
    game.start();
  };
};
