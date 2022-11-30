class Game {
  constructor(
    canvasMap,
    canvasFight,
    contextMap,
    contextFight,
    fightEvent,
    startFightButton,
    attackButton,
    winPage
  ) {
    this.canvasMap = canvasMap;
    this.drawCanvasMap = true;
    this.canvasFight = canvasFight;
    this.drawCanvasFight = false;
    this.ctxMap = contextMap;
    this.ctxFight = contextFight;
    this.soldier = new Soldier();
    this.tyranid = new Tyranid();
    this.fightEvent = fightEvent;
    this.fightEventIsActive = false;
    this.startFightButton = startFightButton;
    this.attackButton = attackButton;
    this.winPage = winPage;
  }
  // ---------------------Move method (WIP)

  _assignControls() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowLeft":
          this.soldier.moveLeft();
          break;
        case "ArrowRight":
          this.soldier.moveRight();
          break;
        default:
          break;
      }
    });
  }
  //---------------------- display methods
  _displayFightEvent() {
    setTimeout(() => {
      this.fightEvent.classList.remove("hidden");
    }, 1000);
  }
  _hideMapCanvas() {
    this.canvasMap.classList.add("hidden");
  }
  _showMapCanvas() {
    this.canvasMap.classList.remove("hidden");
  }
  _showFightCanvas() {
    this.canvasFight.classList.remove("hidden");
    this.attackButton.classList.remove("hidden");
  }
  _hideFightCanvas() {
    this.canvasFight.classList.add("hidden");
    this.attackButton.classList.add("hidden");
  }
  _showWinPage() {
    this.winPage.classList.remove("hidden");
  }
  // ---------------------fight method
  soldierAttack() {
    this.tyranid.receiveDamage(this.soldier.strength);
    this._comeback();
  }
  _comeback() {
    // setTimeout si el bicho sigue vivo y yo tambien, tyranidAttack
    if (this.tyranid.health <= 0) {
      console.log("grrrrr....");
      setTimeout(() => {
        this.drawCanvasFight = false;
        this._hideFightCanvas();
        this.drawCanvasMap = true;
        this._showMapCanvas();
      }, 750);
    } else {
      setTimeout(() => this._tyranidAttack(), 2000);
    }
  }
  _tyranidAttack() {
    this.soldier.receiveDamage(this.tyranid.strength);
  }
  // ---------------------draw & clean methods
  _cleanCanvasMap() {
    this.ctxMap.clearRect(0, 0, 1000, 600);
  }
  _drawSoldier() {
    this.ctxMap.fillStyle = "red";
    this.ctxMap.fillRect(
      this.soldier.x,
      this.soldier.y,
      this.soldier.width,
      this.soldier.height
    );
  }
  _drawTyranid() {
    this.ctxMap.fillStyle = "green";
    this.ctxMap.fillRect(
      this.tyranid.x,
      this.tyranid.y,
      this.tyranid.width,
      this.tyranid.height
    );
  }
  _cleanCanvasFight() {
    this.ctxFight.clearRect(0, 0, 1000, 600);
  }
  _drawSoldierFight() {
    this.ctxFight.fillStyle = "red";
    this.ctxFight.fillRect(100, 100, 75, 150);
  }
  _drawTyranidFight() {
    this.ctxFight.fillStyle = "green";
    this.ctxFight.fillRect(600, 100, 75, 150);
  }

  // ---------------------Colisions&checkpoints
  _tyranidMoveDown() {
    if (this.tyranid.y + this.tyranid.height < this.soldier.y) {
      this.tyranid.y = this.tyranid.y + 10;
    }
  }
  _checkCollisionTrap() {
    //trap-libertate-movement.
    if (this.soldier.x > 400 && this.tyranid.health > 0) {
      this.soldier.movement = false;
      this._tyranidMoveDown();
    } else {
      this.soldier.movement = true;
    }
  }
  _checkCollisionSoldierTyranid() {
    if (
      this.tyranid.y + this.tyranid.height === this.soldier.y &&
      !this.fightEventIsActive
    ) {
      this.fightEventIsActive = true;
      this._displayFightEvent();
    }
  }
  _endRouteSoldier() {
    if (this.soldier.x > 1000) {
      this.soldier.movement = false;
      this._hideMapCanvas();
      this._showWinPage();
    }
  }
  //---------------------permaworking
  _update() {
    window.requestAnimationFrame(() => {
      this._update();
      if (this.drawCanvasMap) {
        this._cleanCanvasMap();
        this._drawSoldier();
        this._drawTyranid();
        this._checkCollisionTrap();
        this._checkCollisionSoldierTyranid();
        this._endRouteSoldier();
        // todas las funciones que se deben estar constantemente ejecutando
      } else if (this.drawCanvasFight) {
        this._cleanCanvasFight();
        this._drawSoldierFight();
        this._drawTyranidFight();
      }
    });
  }

  start() {
    this._assignControls();
    this._update();
    this.startFightButton.onclick = () => {
      this.fightEvent.classList.add("hidden");
      this._hideMapCanvas();
      this._showFightCanvas();
      this.drawCanvasMap = false;
      this.drawCanvasFight = true;
    };
    this.attackButton.onclick = () => {
      this.soldierAttack();
    };
  }
}
