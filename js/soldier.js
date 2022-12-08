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
    this.poolQuotes = [
      "A storm of rending claws attacks with fury!",
      "The Tyranid jumps and bites your neck!",
      "The creature spits acid on you.",
    ];
    this.quoteSelected = 0;
    this.image = soldierImgRight;
  }
  _selectRandomQuote() {
    let max = this.poolQuotes.length;
    this.quoteSelected = Math.floor(Math.random() * max);
  }
  _generateDamage(initialStrengh) {
    let finalDmg = Math.floor(Math.random() * 10) * initialStrengh;
    return finalDmg;
  }
  receiveDamage(damage) {
    this._selectRandomQuote();
    this.health = this.health - damage;
    let soldierStatus = "";
    if (this.health > 0) {
      soldierStatus = `${
        this.poolQuotes[this.quoteSelected]
      } You receive ${damage} points of damage!`;
    } else {
      soldierStatus = `You receive ${damage} points of damage and die in the name of the Emperor...`;
    }
    return soldierStatus;
  }
  healthHp() {
    let soldierHealthQuote = "";
    if (this.health >= 50) {
      soldierHealthQuote = "My faith is my shield nothing can hurt me!";
    } else if (this.health < 50 && this.healthNumbers === 1) {
      this.healthNumbers = 0;
      let recover = Math.floor(Math.random() * 10 + 40);
      this.health = this.health + recover;
      soldierHealthQuote = `Helix Gauntlet Activated. You recover ${recover} health points! Helix Gauntlet remaining:${this.healthNumbers}`;
    }
    return soldierHealthQuote;
  }
  moveLeft() {
    if (this.movement && this.x > 0) {
      this.x = this.x - 15;
    }
    this.image = soldierImgLeft;
  }
  moveRight() {
    if (this.movement) {
      this.x = this.x + 15;
    }
    this.image = soldierImgRight;
  }
}
