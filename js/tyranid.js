class Tyranid {
  constructor() {
    this.health = 100;
    this.strength = 5;
    this.y = -200;
    this.width = 250;
    this.height = 200;
    this.poolQuotes = [
      "You shoot with your blessed Boltgun.",
      "You attack with your knife.",
      "Your existence is a blasphemy... DIE XENO!",
    ];
    this.quoteSelected = 0;
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
    let tyranidStatus = "";
    if (this.health > 0) {
      tyranidStatus = `${
        this.poolQuotes[this.quoteSelected]
      } The Tyranid receives ${damage} points of damage!`;
    } else {
      tyranidStatus = `The Tyranid recives ${damage} points of damage and dies in horrible screams!`;
    }
    return tyranidStatus;
  }
  tyranidHealth() {
    let recover = Math.floor(Math.random() * 25);
    this.health = this.health + recover;
    return recover;
  }
}
