class Game {
  constructor(context) {
    this.ctx = context;
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
    const tyranidDamage = this.tyranid.receiveDamage(this.soldier.strength);
  }
  _update() {
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
  }
}
