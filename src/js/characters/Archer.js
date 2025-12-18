import Player from './Player.js';
import Bow from '../weapons/Bow.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
    this.weaponsChain = [new Knife(), new Arm()];
  }

  getDamage(distance) {
    if (distance > this.weapon.range) return 0;
    const weaponDamage = this.weapon.getDamage();
    const baseDamage = this.attack + weaponDamage;
    const luckFactor = this.getLuck();
    const distanceFactor = distance / this.weapon.range;
    return baseDamage * luckFactor * distanceFactor;
  }
}
