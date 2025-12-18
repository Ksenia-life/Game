import Arm from '../weapons/Arm.js';
import Knife from '../weapons/Knife.js';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
    this.weaponsChain = [];
  }

  getLuck() {
    const randomNumber = Math.random() * 100;
    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    const weaponDamage = this.weapon.getDamage();
    const effectiveDistance = distance;

    return ((this.attack + weaponDamage) * this.getLuck()) / effectiveDistance;
  }

  takeDamage(damage) {
    this.life -= damage;
    if (this.life < 0) {
      this.life = 0;
    }
  }

  isDead() {
    return this.life <= 0;
  }

  moveLeft(distance) {
    const moveDistance = Math.min(distance, this.speed);
    this.position -= moveDistance;
  }

  moveRight(distance) {
    const moveDistance = Math.min(distance, this.speed);
    this.position += moveDistance;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    const threshold = (100 - this.agility - (this.speed * 3)) / 100;
    return this.getLuck() > threshold;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      this.checkWeapon();
      return;
    }

    if (this.dodged()) {
      return;
    }

    this.takeDamage(damage);
  }

  checkWeapon() {
    if (this.weapon.isBroken() && this.weaponsChain.length > 0) {
      this.weapon = this.weaponsChain.shift();
    }
  }

  tryAttack(targetEnemy) {
    if (this.isDead() || targetEnemy.isDead()) {
      return false;
    }

    const distance = Math.abs(this.position - targetEnemy.position);

    if (distance > this.weapon.range) {
      return false;
    }

    const wear = 10 * this.getLuck();
    this.weapon.takeDamage(wear);
    this.checkWeapon();

    let damage = this.getDamage(distance);

    if (damage <= 0) {
      return false;
    }

    if (distance === 0) {
      damage *= 2;
      // eslint-disable-next-line no-param-reassign
      targetEnemy.position += 1;
    }

    targetEnemy.takeAttack(damage);
    return true;
  }

  chooseEnemy(players) {
    const aliveEnemies = players.filter((p) => !p.isDead() && p !== this);
    if (aliveEnemies.length === 0) return null;
    return aliveEnemies.reduce((min, current) => (current.life < min.life ? current : min));
  }

  moveToEnemy(enemy) {
    if (!enemy || this.isDead() || enemy.isDead()) return;

    const distance = enemy.position - this.position;
    if (distance === 0) return;

    const direction = Math.sign(distance);
    const moveDistance = Math.min(Math.abs(distance), this.speed);

    this.move(moveDistance * direction);
  }

  turn(players) {
    if (this.isDead()) return;

    const enemy = this.chooseEnemy(players);
    if (!enemy || enemy.isDead()) return;

    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}
