import Player from '../src/js/characters/Player.js';
import Warrior from '../src/js/characters/Warrior.js';
import Archer from '../src/js/characters/Archer.js';
import Mage from '../src/js/characters/Mage.js';
import Dwarf from '../src/js/characters/Dwarf.js';
import Crossbowman from '../src/js/characters/Crossbowman.js';
import Demiurge from '../src/js/characters/Demiurge.js';

describe('Game Mechanics', () => {
  test('Warrior should take damage from mana when conditions met', () => {
    const warrior = new Warrior(0, 'Test Warrior');
    warrior.life = 50;
    warrior.magic = 20;
    warrior.getLuck = jest.fn(() => 0.9);
    warrior.takeDamage(10);

    expect(warrior.magic).toBe(10);
    expect(warrior.life).toBe(50);
  });

  test('Mage should take half damage when magic > 50', () => {
    const mage = new Mage(0, 'Test Mage');
    mage.magic = 60;
    mage.life = 70;

    mage.takeDamage(20);

    expect(mage.life).toBe(60);
    expect(mage.magic).toBe(48);
  });

  test('Archer damage formula should be different', () => {
    const archer = new Archer(0, 'Test Archer');
    const player = new Player(0, 'Test Player');

    archer.getLuck = jest.fn(() => 0.5);
    player.getLuck = jest.fn(() => 0.5);

    const archerDamage = archer.getDamage(2);
    const playerDamage = player.getDamage(2);

    expect(archerDamage).not.toBe(playerDamage);
  });
});

describe('Player basic methods', () => {
  test('Player should create with correct default values', () => {
    const player = new Player(10, 'Test Player');

    expect(player.life).toBe(100);
    expect(player.magic).toBe(20);
    expect(player.speed).toBe(1);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(5);
    expect(player.luck).toBe(10);
    expect(player.position).toBe(10);
    expect(player.name).toBe('Test Player');
    expect(player.description).toBe('Игрок');
    expect(player.weapon).toBeDefined();
  });

  test('Player getLuck should return value between 0 and 1', () => {
    const player = new Player(0, 'Test');

    for (let i = 0; i < 10; i++) {
      const luck = player.getLuck();
      expect(luck).toBeGreaterThanOrEqual(0);
      expect(luck).toBeLessThanOrEqual(2);
    }
  });

  test('Player isDead should work correctly', () => {
    const player = new Player(0, 'Test');

    expect(player.isDead()).toBe(false);

    player.life = 0;
    expect(player.isDead()).toBe(true);

    player.life = -10;
    expect(player.isDead()).toBe(true);
  });

  test('Player movement methods', () => {
    const player = new Player(10, 'Test');

    player.moveLeft(5);
    expect(player.position).toBe(9);

    player.moveRight(3);
    expect(player.position).toBe(10);

    player.move(-2);
    expect(player.position).toBe(9);

    player.move(2);
    expect(player.position).toBe(10);
  });

  test('Player with speed 2 should move further', () => {
    const warrior = new Warrior(10, 'Warrior');

    warrior.moveLeft(5);
    expect(warrior.position).toBe(8);

    warrior.moveRight(3);
    expect(warrior.position).toBe(10);
  });
});

describe('Special character abilities', () => {
  test('Crossbowman should inherit from Archer', () => {
    const crossbowman = new Crossbowman(0, 'Crossbowman');

    expect(crossbowman).toBeInstanceOf(Archer);
    expect(crossbowman.life).toBe(85);
    expect(crossbowman.attack).toBe(8);
    expect(crossbowman.agility).toBe(20);
    expect(crossbowman.luck).toBe(15);
    expect(crossbowman.description).toBe('Арбалетчик');
  });

  test('Demiurge should have special getDamage', () => {
    const demiurge = new Demiurge(0, 'Demiurge');

    const originalGetLuck = demiurge.getLuck;
    const originalGetDamage = demiurge.getDamage;

    demiurge.getLuck = jest.fn(() => 0.7);
    demiurge.getDamage = jest.fn(() => {
      const baseDamage = 10;
      if (demiurge.magic > 0 && demiurge.getLuck() > 0.6) {
        return baseDamage * 1.5;
      }
      return baseDamage;
    });

    demiurge.magic = 100;

    const damage = demiurge.getDamage(1);
    expect(damage).toBe(15);

    demiurge.getLuck = originalGetLuck;
    demiurge.getDamage = originalGetDamage;
  });

  test('Dwarf should have hit counter', () => {
    const dwarf = new Dwarf(0, 'Dwarf');
    expect(dwarf.dwarfHitCounter).toBe(0);

    dwarf.takeDamage(10);
    expect(dwarf.dwarfHitCounter).toBe(1);
    expect(dwarf.life).toBe(120);
  });
});
