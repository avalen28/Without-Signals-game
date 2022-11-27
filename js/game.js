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
  _update() {
    window.requestAnimationFrame(() => {
      this._update();
      //here drawMethods
      //check colision
      // todas las funciones que se deben estar constantemente ejecutando
    });
  }

  start() {
    this._assignControls();
    this._update();
  }
}
