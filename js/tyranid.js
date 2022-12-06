class Tyranid {
  constructor() {
    this.health = 100;
    this.strength = 5;
    this.y = -200;
    this.width = 250;
    this.height = 200;
  }
  _generateDamage(initialStrengh) {
    let finalDmg = Math.floor(Math.random() * 10) * initialStrengh;

    return finalDmg;
  }
  receiveDamage(damage) {
    this.health = this.health - damage;
    let tyranidStatus = "";
    if (this.health > 0) {
      tyranidStatus = `FOR THE EMPEROR! the Tyranid receives ${damage} points of damage!`;
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
