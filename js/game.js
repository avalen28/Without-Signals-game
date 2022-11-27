class Game {
  constructor(contextMap, contextFight) {
    this.ctxMap = contextMap;
    this.ctxFight = contextFight;
    this.soldier = new Soldier();
    this.tyranid = new Tyranid();
  }
  // Move method (WIP)

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
  // fight method
  soldierAttack() {
    this.tyranid.receiveDamage(this.soldier.strength);
    if (this.tyranid.health > 0) {
      this._tyranidAttack();
    } else {
      console.log("end of figth!");
    }
  }
  _tyranidAttack() {
    this.soldier.receiveDamage(this.tyranid.strength);
  }
  // draw & clean methods
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
  _update() {
    window.requestAnimationFrame(() => {
      this._update();
      //here drawMethods & clean
      this._cleanCanvasMap();
      this._drawSoldier();
      this._drawTyranid();
      //check colision()
      //  colision1()
      //  colision2()
      // todas las funciones que se deben estar constantemente ejecutando
    });
  }

  start() {
    this._assignControls();
    this._update();
  }
}
