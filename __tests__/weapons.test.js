import Weapon from '../src/js/weapons/Weapon.js';
import Arm from '../src/js/weapons/Arm.js';
import Bow from '../src/js/weapons/Bow.js';
import Sword from '../src/js/weapons/Sword.js';
import Knife from '../src/js/weapons/Knife.js';
import Staff from '../src/js/weapons/Staff.js';
import LongBow from '../src/js/weapons/LongBow.js';
import Axe from '../src/js/weapons/Axe.js';
import StormStaff from '../src/js/weapons/StormStaff.js';

describe('Weapon Base Class', () => {
  test('should create weapon with correct properties', () => {
    const weapon = new Weapon('Меч', 25, 500, 1);
    expect(weapon.name).toBe('Меч');
    expect(weapon.attack).toBe(25);
    expect(weapon.durability).toBe(500);
    expect(weapon.range).toBe(1);
    expect(weapon.initDurability).toBe(500);
  });

  test('takeDamage should reduce durability', () => {
    const weapon = new Weapon('Меч', 25, 500, 1);
    weapon.takeDamage(100);
    expect(weapon.durability).toBe(400);

    weapon.takeDamage(500);
    expect(weapon.durability).toBe(0);
  });

  test('getDamage should work correctly', () => {
    const weapon = new Weapon('Меч', 20, 100, 1);

    weapon.durability = 100;
    expect(weapon.getDamage()).toBe(20);

    weapon.durability = 29;
    expect(weapon.getDamage()).toBe(10);

    weapon.durability = 0;
    expect(weapon.getDamage()).toBe(0);
  });

  test('isBroken should return correct value', () => {
    const weapon = new Weapon('Меч', 25, 100, 1);

    weapon.durability = 50;
    expect(weapon.isBroken()).toBe(false);

    weapon.durability = 0;
    expect(weapon.isBroken()).toBe(true);
  });
});

describe('Specific Weapons', () => {
  test('Arm should have correct properties', () => {
    const arm = new Arm();
    expect(arm.name).toBe('Рука');
    expect(arm.attack).toBe(1);
    expect(arm.durability).toBe(Infinity);
    expect(arm.range).toBe(1);
  });

  test('Arm should not take damage', () => {
    const arm = new Arm();
    arm.takeDamage(100);
    expect(arm.durability).toBe(Infinity);
    expect(arm.isBroken()).toBe(false);
  });

  test('Bow should have correct properties', () => {
    const bow = new Bow();
    expect(bow.name).toBe('Лук');
    expect(bow.attack).toBe(10);
    expect(bow.durability).toBe(200);
    expect(bow.range).toBe(3);
  });

  test('Sword should have correct properties', () => {
    const sword = new Sword();
    expect(sword.name).toBe('Меч');
    expect(sword.attack).toBe(25);
    expect(sword.durability).toBe(500);
    expect(sword.range).toBe(1);
  });

  test('LongBow should inherit from Bow and override properties', () => {
    const longBow = new LongBow();
    expect(longBow.name).toBe('Длинный лук');
    expect(longBow.attack).toBe(15);
    expect(longBow.range).toBe(4);
    expect(longBow.durability).toBe(200);
  });

  test('Axe should inherit from Sword and override properties', () => {
    const axe = new Axe();
    expect(axe.name).toBe('Секира');
    expect(axe.attack).toBe(27);
    expect(axe.durability).toBe(800);
    expect(axe.range).toBe(1);
  });

  test('StormStaff should inherit from Staff and override properties', () => {
    const stormStaff = new StormStaff();
    expect(stormStaff.name).toBe('Посох Бури');
    expect(stormStaff.attack).toBe(10);
    expect(stormStaff.range).toBe(3);
    expect(stormStaff.durability).toBe(300);
  });

  test('Knife should have correct properties', () => {
    const knife = new Knife();
    expect(knife.name).toBe('Нож');
    expect(knife.attack).toBe(5);
    expect(knife.durability).toBe(300);
    expect(knife.range).toBe(1);
  });

  test('Staff should have correct properties', () => {
    const staff = new Staff();
    expect(staff.name).toBe('Посох');
    expect(staff.attack).toBe(8);
    expect(staff.durability).toBe(300);
    expect(staff.range).toBe(2);
  });
});

describe('Weapon Damage Logic', () => {
  test('Bow damage calculation example from assignment', () => {
    const bow = new Bow();

    expect(bow.getDamage()).toBe(10);
    expect(bow.durability).toBe(200);

    bow.takeDamage(100);
    expect(bow.getDamage()).toBe(10);
    expect(bow.durability).toBe(100);

    bow.takeDamage(50);
    expect(bow.getDamage()).toBe(5);
    expect(bow.durability).toBe(50);

    bow.takeDamage(150);
    expect(bow.getDamage()).toBe(0);
    expect(bow.durability).toBe(0);
  });

  test('Sword damage calculation', () => {
    const sword = new Sword();

    sword.takeDamage(20);
    expect(sword.durability).toBe(480);
    expect(sword.getDamage()).toBe(25);

    sword.takeDamage(100);
    expect(sword.durability).toBe(380);
    expect(sword.getDamage()).toBe(25);

    sword.takeDamage(260);
    expect(sword.durability).toBe(120);
    expect(sword.getDamage()).toBe(12.5);
  });
});
