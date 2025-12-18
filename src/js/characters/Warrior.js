import Player from './Player.js';
import Sword from '../weapons/Sword.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.speed = 2;
    this.description = 'Воин';
    this.weapon = new Sword();
    this.weaponsChain = [new Knife(), new Arm()];
    this.maxLife = 120;
  }

  takeDamage(damage) {
    if (this.life < this.maxLife * 0.5 && this.getLuck() > 0.8) {
      if (this.magic > 0) {
        this.magic -= damage;
        if (this.magic < 0) {
          const remainingDamage = Math.abs(this.magic);
          this.magic = 0;
          this.life -= remainingDamage;
          if (this.life < 0) this.life = 0;
        }
      } else {
        this.life -= damage;
        if (this.life < 0) this.life = 0;
      }
    } else {
      this.life -= damage;
      if (this.life < 0) this.life = 0;
    }
  }
}
