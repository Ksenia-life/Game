import Player from './Player.js';
import Staff from '../weapons/Staff.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff();
    this.weaponsChain = [new Knife(), new Arm()];
  }

  takeDamage(damage) {
    if (this.magic > 50) {
      const halfDamage = damage / 2;
      this.life -= halfDamage;
      this.magic -= 12;
      if (this.life < 0) this.life = 0;
      if (this.magic < 0) this.magic = 0;
    } else {
      this.life -= damage;
      if (this.life < 0) this.life = 0;
    }
  }
}
