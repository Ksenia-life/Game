import Warrior from '../src/js/characters/Warrior.js';
import Archer from '../src/js/characters/Archer.js';
import Mage from '../src/js/characters/Mage.js';
import Dwarf from '../src/js/characters/Dwarf.js';
import Player from '../src/js/characters/Player.js';

describe('Combat System', () => {
  test('Warrior should not reach Archer from distance 2', () => {
    const warrior = new Warrior(0, 'Воин');
    const archer = new Archer(2, 'Лучник');

    const result = warrior.tryAttack(archer);
    expect(result).toBe(false);
    expect(archer.life).toBe(80);
  });

  test('Warrior should attack Archer from distance 1', () => {
    const warrior = new Warrior(0, 'Воин');
    const archer = new Archer(1, 'Лучник');

    warrior.getLuck = jest.fn(() => 0.5);
    archer.getLuck = jest.fn(() => 0.3);
    archer.dodged = jest.fn(() => false);
    archer.isAttackBlocked = jest.fn(() => false);

    const result = warrior.tryAttack(archer);
    expect(result).toBe(true);
    expect(archer.life).toBeLessThan(80);
  });

  test('Archer damage formula test', () => {
    const archer = new Archer(0, 'Лучник');
    archer.getLuck = jest.fn(() => 0.5);
    const damage = archer.getDamage(2);
    expect(damage).toBeCloseTo(((15 * 0.5 * 2) / 3));
  });

  test('Player damage formula test', () => {
    const player = new Player(0, 'Тест');
    player.getLuck = jest.fn(() => 0.5);
    const damage = player.getDamage(1);
    expect(damage).toBeCloseTo(5.5);
  });
});

describe('Assignment Examples', () => {
  test('Warrior vs Archer example from assignment', () => {
    const warrior = new Warrior(0, 'Алёша Попович');
    const archer = new Archer(2, 'Леголас');

    archer.dodged = jest.fn(() => false);
    archer.isAttackBlocked = jest.fn(() => false);

    expect(archer.life).toBe(80);
    expect(archer.position).toBe(2);

    warrior.tryAttack(archer);
    expect(archer.life).toBe(80);
    expect(archer.position).toBe(2);

    warrior.moveRight(1);
    expect(warrior.position).toBe(1);

    warrior.tryAttack(archer);
    expect(archer.life).toBeLessThan(80);

    warrior.moveRight(1);
    expect(warrior.position).toBe(2);
    expect(warrior.position).toBe(archer.position);
  });

  test('Warrior takeDamage with mana example', () => {
    const warrior = new Warrior(0, 'Воин');
    warrior.life = 50;
    warrior.magic = 20;
    warrior.getLuck = jest.fn(() => 0.9);

    warrior.takeDamage(5);
    expect(warrior.magic).toBe(15);
    expect(warrior.life).toBe(50);
  });

  test('Mage takeDamage with magic defense', () => {
    const mage = new Mage(0, 'Маг');
    mage.magic = 100;
    mage.life = 70;
    mage.takeDamage(50);

    expect(mage.life).toBe(45);
    expect(mage.magic).toBe(88);
  });
});

describe('Player movement and attack', () => {
  test('Player should choose enemy with lowest health', () => {
    const player1 = new Warrior(0, 'Warrior1');
    const player2 = new Archer(3, 'Archer1');
    const player3 = new Mage(6, 'Mage1');

    player2.life = 50;
    player3.life = 30;

    const players = [player1, player2, player3];
    const chosen = player1.chooseEnemy(players);

    expect(chosen).toBe(player3);
  });

  test('Player should move towards enemy', () => {
    const player = new Warrior(0, 'Warrior');
    const enemy = new Archer(5, 'Archer');

    player.moveToEnemy(enemy);
    expect(player.position).toBe(2);
  });

  test('Warrior special ability should work', () => {
    const warrior = new Warrior(0, 'Test');
    warrior.life = 50;
    warrior.magic = 20;

    const originalGetLuck = warrior.getLuck;
    warrior.getLuck = () => 0.9;

    warrior.takeDamage(10);
    expect(warrior.magic).toBe(10);
    expect(warrior.life).toBe(50);

    warrior.getLuck = originalGetLuck;
  });

  test('Dwarf every 6th hit reduction', () => {
    const dwarf = new Dwarf(0, 'Test');
    dwarf.life = 100;
    dwarf.dwarfHitCounter = 0;

    const originalGetLuck = dwarf.getLuck;

    dwarf.getLuck = jest.fn(() => 0.3);

    for (let i = 0; i < 5; i++) {
      dwarf.takeDamage(10);
    }

    const lifeAfter5 = dwarf.life;
    expect(lifeAfter5).toBe(50);
    expect(dwarf.dwarfHitCounter).toBe(5);

    dwarf.getLuck = jest.fn(() => 0.6);
    dwarf.takeDamage(10);

    expect(dwarf.life).toBe(45);
    expect(dwarf.dwarfHitCounter).toBe(6);

    dwarf.getLuck = originalGetLuck;
  });

  test('Player should attack when in range', () => {
    const player = new Warrior(0, 'Warrior');
    const enemy = new Archer(1, 'Archer');

    player.getLuck = jest.fn(() => 0.5);
    enemy.getLuck = jest.fn(() => 0.3);
    enemy.dodged = jest.fn(() => false);
    enemy.isAttackBlocked = jest.fn(() => false);

    const result = player.tryAttack(enemy);
    expect(result).toBe(true);
    expect(enemy.life).toBeLessThan(80);
  });

  test('Dead player should not act', () => {
    const player = new Warrior(0, 'Warrior');
    const enemy = new Archer(1, 'Archer');

    player.life = 0;
    player.turn([player, enemy]);

    expect(enemy.life).toBe(80);
  });

  test('Player should attack with double damage if distance is zero', () => {
    const player = new Warrior(5, 'Warrior');
    const enemy = new Archer(5, 'Archer');

    player.getLuck = jest.fn(() => 0.5);
    enemy.getLuck = jest.fn(() => 0.3);
    enemy.dodged = jest.fn(() => false);
    enemy.isAttackBlocked = jest.fn(() => false);

    const initialLife = enemy.life;
    const result = player.tryAttack(enemy);

    expect(result).toBe(true);
    expect(enemy.life).toBeLessThan(initialLife);
    expect(enemy.position).toBe(6);
  });

  test('Player chooseEnemy should skip dead players', () => {
    const player1 = new Warrior(0, 'Warrior');
    const player2 = new Archer(3, 'Archer');
    const player3 = new Mage(6, 'Mage');

    player3.life = 0;

    const players = [player1, player2, player3];
    const chosen = player1.chooseEnemy(players);

    expect(chosen).toBe(player2);
  });

  test('Player chooseEnemy should return null if no enemies', () => {
    const player = new Warrior(0, 'Warrior');
    const players = [player];

    const chosen = player.chooseEnemy(players);
    expect(chosen).toBeNull();
  });

  test('Player with broken weapon should switch to next weapon', () => {
    const player = new Warrior(0, 'Warrior');
    const enemy = new Archer(1, 'Archer');

    player.weapon.durability = 0;

    player.getLuck = jest.fn(() => 0.5);
    enemy.getLuck = jest.fn(() => 0.3);
    enemy.dodged = jest.fn(() => false);
    enemy.isAttackBlocked = jest.fn(() => false);

    player.tryAttack(enemy);

    expect(player.weapon.name).toBe('Нож');
  });
});

describe('Defense mechanics', () => {
  test('Player can dodge attack', () => {
    const player = new Archer(0, 'Archer');

    player.getLuck = jest.fn(() => 0.95);
    player.agility = 20;
    player.speed = 1;

    const dodged = player.dodged();
    expect(dodged).toBe(true);
  });

  test('Player can block attack', () => {
    const player = new Warrior(0, 'Warrior');

    player.getLuck = jest.fn(() => 0.95);
    player.luck = 10;

    const blocked = player.isAttackBlocked();
    expect(blocked).toBe(true);
  });

  test('Blocked attack should damage weapon', () => {
    const player = new Warrior(0, 'Warrior');
    const initialDurability = player.weapon.durability;

    player.getLuck = jest.fn(() => 0.95);
    player.luck = 10;

    player.isAttackBlocked = jest.fn(() => true);
    player.takeAttack(20);

    expect(player.weapon.durability).toBeLessThan(initialDurability);
  });
});
