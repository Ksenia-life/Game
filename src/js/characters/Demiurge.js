import Mage from './Mage.js';
import StormStaff from '../weapons/StormStaff.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
    this.weaponsChain = [new Knife(), new Arm()];
  }

  getDamage(distance) {
    const baseDamage = super.getDamage(distance);
    if (this.magic > 0 && this.getLuck() > 0.6 && !Number.isNaN(baseDamage)) {
      return baseDamage * 1.5;
    }
    return baseDamage;
  }
}
