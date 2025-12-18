import Warrior from './Warrior.js';
import Axe from '../weapons/Axe.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
    this.weaponsChain = [new Knife(), new Arm()];
    this.dwarfHitCounter = 0;
  }

  takeDamage(damage) {
    this.dwarfHitCounter++;

    if (this.dwarfHitCounter % 6 === 0 && this.getLuck() > 0.5) {
      const reducedDamage = damage / 2;
      this.life -= reducedDamage;
      if (this.life < 0) {
        this.life = 0;
      }
    } else {
      super.takeDamage(damage);
    }
  }
}
