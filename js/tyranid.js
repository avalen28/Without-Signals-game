class Tyranid {
  constructor() {
    this.health = 100;
    this.strength = 10;
    this.x = 400;
    this.y = -100;
    this.width = 100;
    this.height = 100;
  }

  receiveDamage(damage) {
    this.health = this.health - damage;
    let tyranidStatus = "";
    if (this.health > 0) {
      tyranidStatus = `FOR THE EMPEROR! the Tyranid receives ${damage} points of damage!`;
    } else {
      tyranidStatus = "The Tyranid dies in horrible screams!";
    }
    return tyranidStatus;
  }
}
