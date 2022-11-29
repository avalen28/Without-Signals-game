class Game {
  constructor(contextMap, contextFight) {
    this.ctxMap = contextMap;
    this.ctxFight = contextFight;
    this.soldier = new Soldier();
    this.tyranid = new Tyranid();
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
  // ---------------------fight method
  soldierAttack() {
    if (this.tyranid.health < 0) {
      console.log("You destroy this horrible creature!");
    } else if (this.soldier.health < 0) {
      console.log("You die in the name of the Emperor...");
    } else if (this.soldier.health > 0 && this.tyranid.health > 0) {
      this.tyranid.receiveDamage(this.soldier.strength);
    }
    this._comeback(); // comentario ALE
  }
  //_comeback() { // setTimeout si el bicho sigue vivo y yo tambien, tyranidAttack

  _tyranidAttack() {
    if (this.tyranid.health > 0) {
      this.soldier.receiveDamage(this.tyranid.strength);
    } else {
      console.log("grrrr....");
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

  // ---------------------Colisions&checkpoints
  _tyranidMoveDown() {
    if (this.tyranid.y + this.tyranid.height < this.soldier.y) {
      this.tyranid.y = this.tyranid.y + 10;
    }
  }
  _colisionSoldier() {
    //trap-libertate-movement.
    if (this.soldier.x > 400 && this.tyranid.health > 0) {
      this.soldier.movement = false;
      this._tyranidMoveDown();
    } else {
      this.soldier.movement = true;
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
      this._colisionSoldier();
      this._endRouteSoldier();
      // todas las funciones que se deben estar constantemente ejecutando
    });
  }

  start() {
    this._assignControls();
    this._update();
  }
}
