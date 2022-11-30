class Game {
  constructor(contextMap, contextFight, fightEvent) {
    this.ctxMap = contextMap;
    this.ctxFight = contextFight;
    this.soldier = new Soldier();
    this.tyranid = new Tyranid();
    this.fightEvent = fightEvent;
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
  // ---------------------fight method
  soldierAttack() {
    this.tyranid.receiveDamage(this.soldier.strength);
    this._comeback();
  }
  _comeback() {
    // setTimeout si el bicho sigue vivo y yo tambien, tyranidAttack
    if (this.tyranid.health <= 0) {
      console.log("grrrrr....");
    } else {
      setTimeOut(() => this._tyranidAttack(), 2000);
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
    if (this.tyranid.y + this.tyranid.height === this.soldier.y) {
      this._displayFightEvent();
    }
  }
  _endRouteSoldier() {
    if (this.soldier.x > 1000) {
      this.soldier.movement = false;
    }
  }
  //---------------------permaworking
  _update() {
    window.requestAnimationFrame(() => {
      this._update();
      //here drawMethods & clean
      this._cleanCanvasMap();
      this._drawSoldier();
      this._drawTyranid();
      this._checkCollisionTrap();
      this._checkCollisionSoldierTyranid();
      this._endRouteSoldier();
      // todas las funciones que se deben estar constantemente ejecutando
    });
  }

  start() {
    this._assignControls();
    this._update();
  }
}
