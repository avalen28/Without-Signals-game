class Soldier {
  constructor() {
    this.health = 100;
    this.strength = 5;
    this.x = 0;
    this.y = 300;
    this.width = 200;
    this.height = 300;
    this.movement = true;
    this.healthNumbers = 1;
  }
  _generateDamage(initialStrengh) {
    let finalDmg = Math.floor(Math.random() * 10) * initialStrengh;
    return finalDmg;
  }
  receiveDamage(damage) {
    this.health = this.health - damage;
    let soldierStatus = "";
    if (this.health > 0) {
      soldierStatus = `Emperor... PROTECTS ME! You receive ${damage} points of damage!`;
    } else {
      soldierStatus = `You receive ${damage} points of damage and die in the name of the Emperor...`;
    }
    return soldierStatus;
  }
  healthHp() {
    let soldierHealthQuote = "";
    if (this.health >= 50) {
      soldierHealthQuote = "I can do this all day... DIE XENO!";
    } else if (this.health < 50 && this.healthNumbers === 1) {
      this.healthNumbers = 0;
      let recover = Math.floor(Math.random() * 10 + 40);
      this.health = this.health + recover;
      soldierHealthQuote = `Helix Gauntlet Activated. You recover ${recover} health points! Helix Gauntlet remaining:${this.healthNumbers}`;
    } else {
      soldierHealthQuote =
        "My Helix Gauntlet is empty...but my faith is my shield!";
    }
    return soldierHealthQuote;
  }
  moveLeft() {
    if (this.movement) {
      this.x = this.x - 15;
    }
  }
  moveRight() {
    if (this.movement) {
      this.x = this.x + 15;
    }
  }
}
