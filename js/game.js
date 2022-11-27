class Game {
  constructor(contextMap, contextFight) {
    this.ctxMap = contextMap;
    this.ctxFight = contextFight;
    this.soldier = new Soldier();
    this.tyranid = new Tyranid();
  }

  _assignControls() {
    // Controles del teclado
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
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
  }
}
