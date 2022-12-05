class Tyranid {
  constructor() {
    this.health = 100;
    this.strength = 500;
    this.y = -200;
    this.width = 250;
    this.height = 200;
  }
  _generateDamage(initialStrengh) {
    let finalDmg = Math.floor(Math.random() * 10) * initialStrengh;
    console.log("nid", finalDmg);
    return finalDmg;
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
