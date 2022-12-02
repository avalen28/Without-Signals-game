class Game {
  constructor(
    canvasMap,
    canvasFight,
    contextMap,
    contextFight,
    fightEvent,
    startFightButton,
    attackButton,
    winPage,
    losePage,
    soldierMsg,
    tyranidMsg,
    soldierStats,
    tyranidStats,
    returnStartButton
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
    this.losePage = losePage;
    this.soldierMsg = soldierMsg;
    this.tyranidMsg = tyranidMsg;
    this.soldierStats = soldierStats;
    this.tyranidStats = tyranidStats;
    this.returnStartButton = returnStartButton;
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
    // evento para empezar batalla.
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
  _showLosePage() {
    this.losePage.classList.remove("hidden");
  }

  _showSoldierStats() {
    this.soldierStats.classList.remove("hidden");
  }
  _hideSoldierStats() {
    this.soldierStats.classList.add("hidden");
  }
  _showTyranidStats() {
    this.tyranidStats.classList.remove("hidden");
  }
  _hideTyranidStats() {
    this.tyranidStats.classList.add("hidden");
  }
  // --------------------- mesages on game
  _soldierAttackInfoOut() {
    this.soldierMsg.classList.add("hidden");
  }
  _soldierAttackInfo() {
    this.soldierMsg.classList.remove("hidden");
    this.soldierMsg.innerText = `${this.tyranid.receiveDamage(
      this.soldier._generateDamage(this.soldier.strength)
    )}`;
    setTimeout(() => {
      this._soldierAttackInfoOut();
    }, 6000); // tiempo que muestra el mensaje soldier.
  }
  _tyranidAttackInfoOut() {
    this.tyranidMsg.classList.add("hidden");
    this.attackButton.classList.remove("hidden");
  }
  _tyranidAttackInfo() {
    this.tyranidMsg.classList.remove("hidden");
    this.tyranidMsg.innerText = `${this.soldier.receiveDamage(
      this.tyranid._generateDamage(this.tyranid.strength)
    )}`;
    setTimeout(() => {
      this._tyranidAttackInfoOut();
    }, 6000); // tiempo que muestra el mensaje tyranido
  }
  _soldierStatsInfo() {
    if (this.soldier.health > 0) {
      this.soldierStats.innerText = `${this.soldier.health}hp remaining`;
    } else {
      this.soldierStats.innerText = `0 hp remaining`;
    }
  }
  _tyranidStatsInfo() {
    if (this.tyranid.health > 0) {
      this.tyranidStats.innerText = `${this.tyranid.health}hp remaining`;
    } else {
      this.tyranidStats.innerText = "0 hp remaining";
    }
  }

  // ---------------------fight method
  soldierAttack() {
    this._soldierAttackInfo();
    this._comeback();
  }
  _comeback() {
    //tyranid attack
    // setTimeout si el bicho sigue vivo y yo tambien, tyranidAttack
    if (this.tyranid.health <= 0) {
      this.attackButton.classList.add("hidden");
      setTimeout(() => {
        this.drawCanvasFight = false;
        this._hideFightCanvas();
        this.drawCanvasMap = true;
        this.tyranid.y = 7000;
        this._showMapCanvas();
        this._hideSoldierStats();
        this._hideTyranidStats();
      }, 6000);
    } else {
      this.attackButton.classList.add("hidden");
      setTimeout(() => {
        this._tyranidAttackInfo();
      }, 6500); //0.5 seg. de margen entre ataque soldier & nid.
    }
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
  _soldierDies() {
    if (this.soldier.health <= 0) {
      setTimeout(() => {
        this._hideSoldierStats();
        this._hideTyranidStats();
      }, 4000);
      setTimeout(() => {
        this._hideFightCanvas();
        this._showLosePage();
      }, 4050);
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
        this._soldierStatsInfo();
        this._tyranidStatsInfo();
        this._soldierDies();
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
      this._showSoldierStats();
      this._showTyranidStats();
      this.drawCanvasMap = false;
      this.drawCanvasFight = true;
    };
    this.attackButton.onclick = () => {
      this.soldierAttack();
    };
  }
}
