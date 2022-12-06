class Game {
  constructor(
    //
    canvasMap,
    canvasFight,
    contextMap,
    contextFight,
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
  ) {
    this.canvasMap = canvasMap;
    this.drawCanvasMap = true;
    this.canvasFight = canvasFight;
    this.drawCanvasFight = false;
    this.ctxMap = contextMap;
    this.ctxFight = contextFight;
    this.soldier = new Soldier();
    this.tyranid = new Tyranid();
    this.trapPosition = Math.floor(Math.random() * (1000 - this.soldier.width));
    this.fightEvent = fightEvent;
    this.fightEventIsActive = false;
    this.startFightButton = startFightButton;
    this.attackButton = attackButton;
    this.healthButton = healthButton;
    this.winPage = winPage;
    this.losePage = losePage;
    this.soldierMsg = soldierMsg;
    this.tyranidMsg = tyranidMsg;
    this.soldierStats = soldierStats;
    this.tyranidStats = tyranidStats;
    this.returnStartButtonWin = returnStartButtonWin; //
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
      this.fightEvent.style = "display: flex";
    }, 1000);
  }
  _hideMapCanvas() {
    this.canvasMap.style = "display: none";
  }
  _showMapCanvas() {
    this.canvasMap.style = "display: flex";
  }
  _showFightCanvas() {
    this.canvasFight.style = "display: flex";
    this.attackButton.style = "display: flex";
    this.healthButton.style = "display: flex";
  }
  _hideFightCanvas() {
    this.canvasFight.style = "display: none";
    this.attackButton.style = "display: none";
    this.healthButton.style = "display: none";
  }
  _showWinPage() {
    this.winPage.style = "display: flex";
  }
  _showLosePage() {
    this.losePage.style = "display: flex";
  }
  _showSoldierStats() {
    this.soldierStats.style = "display: flex";
  }
  _hideSoldierStats() {
    this.soldierStats.style = "display: none";
  }
  _showTyranidStats() {
    this.tyranidStats.style = "display: flex";
  }
  _hideTyranidStats() {
    this.tyranidStats.style = "display: none";
  }
  // --------------------- mesages on game
  _soldierAttackInfoOut() {
    this.soldierMsg.style = "display: none";
  }
  //includes soldier dmg and Quotes
  _soldierAttackInfo() {
    this.soldierMsg.style = "display: flex";
    this.soldierMsg.innerText = this.tyranid.receiveDamage(
      this.soldier._generateDamage(this.soldier.strength)
    );
    setTimeout(() => {
      this._soldierAttackInfoOut();
    }, 4000); // tiempo que muestra el mensaje soldier.
  }
  _soldierHealthInfoOut() {
    this.soldierMsg.style = "display: none";
  }
  //includes soldier health and Quotes
  _soldierHealthInfo() {
    this.soldierMsg.style = "display: flex";
    this.soldierMsg.innerText = `${this.soldier.healthHp()}`;
    setTimeout(() => {
      this._soldierHealthInfoOut();
    }, 4000);
  }
  _tyranidAttackInfoOut() {
    this.tyranidMsg.style = "display: none";
  }
  _tyranidHealthInfoOut() {
    this.tyranidMsg.style = "display: none";
  }
  //includes tyranid dmg and Quotes
  _tyranidAttackInfo() {
    this.tyranidMsg.style = "display: flex";
    this.tyranidMsg.innerText = this.soldier.receiveDamage(
      this.tyranid._generateDamage(this.tyranid.strength)
    );
    setTimeout(() => {
      this._tyranidAttackInfoOut();
    }, 4000); // tiempo que muestra el mensaje tyranido
  }
  _tyranidHealthInfo() {
    this.tyranidMsg.style = "display: flex";
    //    let recover = Math.floor(Math.random() * 40);
    //    this.tyranid.health = this.tyranid.health + recover;
    this.tyranidMsg.innerText = `The tyranid recover ${this.tyranid.tyranidHealth()} health points!`;
    setTimeout(() => {
      this._tyranidHealthInfoOut();
    }, 4000);
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
  soldierHealth() {
    this._soldierHealthInfo();
    this._comeback();
  }
  _comeback() {
    //tyranid attack
    // setTimeout si el bicho sigue vivo y yo tambien, tyranidAttack
    let posibility = Math.round(Math.random() * 2);
    console.log("ha salido la posibilidad", posibility);
    if (this.tyranid.health <= 0) {
      setTimeout(() => {
        this.drawCanvasFight = false;
        this._hideFightCanvas();
        this.drawCanvasMap = true;
        this.tyranid.y = 7000;
        this._showMapCanvas();
        this._hideSoldierStats();
        this._hideTyranidStats();
      }, 4000);
    } else if (posibility === 0 && this.tyranid.health < 70) {
      setTimeout(() => {
        this._tyranidHealthInfo();
      }, 4000);
    } else {
      setTimeout(() => {
        this._tyranidAttackInfo();
      }, 4000);
    }
  }

  // ---------------------draw & clean methods
  _cleanCanvasMap() {
    this.ctxMap.clearRect(0, 0, 1000, 600);
  }
  _drawSoldier() {
    this.ctxMap.fillStyle = "red";
    this.ctxMap.drawImage(
      soldierImg,
      this.soldier.x,
      this.soldier.y,
      this.soldier.width,
      this.soldier.height
    );
  }
  _drawTyranid() {
    this.ctxMap.fillStyle = "green";
    this.ctxMap.drawImage(
      tyranidImg,
      this.trapPosition,
      this.tyranid.y,
      this.tyranid.width,
      this.tyranid.height
    );
  }
  _cleanCanvasFight() {
    this.ctxFight.clearRect(0, 0, 1000, 600);
  }
  _drawTyranidFight() {
    this.ctxFight.fillStyle = "green";
    this.ctxFight.drawImage(tyranidFightImg, 400, -150, 650, 650);
  }
  _drawSoldierFight() {
    this.ctxFight.fillStyle = "red";
    this.ctxFight.drawImage(soldierFightImg, 50, 20, 450, 600);
  }

  // ---------------------Colisions&checkpoints
  _tyranidMoveDown() {
    if (this.tyranid.y + this.tyranid.height < this.soldier.y) {
      this.tyranid.y = this.tyranid.y + 10;
    }
  }

  _checkCollisionTrap() {
    //trap-libertate-movement.
    if (this.soldier.x >= this.trapPosition && this.tyranid.health > 0) {
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
      //
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
      }, 4000);
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
        this._drawTyranidFight();
        this._drawSoldierFight();
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
      emperorSound.play();
      this.fightEvent.style = "display: none";
      setTimeout(() => {
        this._hideMapCanvas();
        this._showFightCanvas();
        this._showSoldierStats();
        this._showTyranidStats();
        this.drawCanvasMap = false;
        this.drawCanvasFight = true;
      }, 3500);
    };
    this.attackButton.onclick = () => {
      this.soldierAttack();
    };
    this.healthButton.onclick = () => {
      this.soldierHealth();
    };
  }
}
