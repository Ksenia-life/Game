import Warrior from './characters/Warrior.js';
import Archer from './characters/Archer.js';
import Mage from './characters/Mage.js';
import Dwarf from './characters/Dwarf.js';
import Crossbowman from './characters/Crossbowman.js';
import Demiurge from './characters/Demiurge.js';

export function play() {
  console.log('=== БИТВА НАЧИНАЕТСЯ ===');

  const players = [
    new Warrior(0, 'Алёша Попович'),
    new Archer(3, 'Леголас'),
    new Mage(6, 'Гендальф'),
    new Dwarf(9, 'Гимли'),
    new Crossbowman(12, 'Робин Гуд'),
    new Demiurge(15, 'Мерлин'),
  ];

  console.log('\nУчастники:');
  players.forEach((p) => {
    console.log(`${p.description} ${p.name} (HP: ${p.life}, Pos: ${p.position})`);
  });

  let turn = 1;
  const maxTurns = 50;

  while (turn <= maxTurns) {
    const alive = players.filter((p) => !p.isDead());

    if (alive.length <= 1) {
      break;
    }

    console.log(`\n--- Ход ${turn} (живых: ${alive.length}) ---`);

    const shuffledAlive = [...alive].sort(() => Math.random() - 0.5);

    shuffledAlive.forEach((player) => {
      player.turn(players);
    });

    console.log('Статус после хода:');
    players.forEach((p) => {
      if (!p.isDead()) {
        console.log(`  ${p.description} ${p.name}: HP=${p.life.toFixed(1)}, Pos=${p.position}`);
      } else {
        console.log(`  ${p.description} ${p.name}: УБИТ`);
      }
    });

    turn += 1;
  }

  console.log('\n=== РЕЗУЛЬТАТ ===\n');
  const winners = players.filter((p) => !p.isDead());

  if (winners.length === 1) {
    console.log(`ПОБЕДИТЕЛЬ: ${winners[0].description} ${winners[0].name}!`);
    console.log(`Осталось здоровья: ${winners[0].life.toFixed(1)}`);
    return winners;
  }

  if (winners.length > 1) {
    console.log('НИЧЬЯ! Выжили:');
    winners.forEach((p) => console.log(`  ${p.description} ${p.name} (${p.life.toFixed(1)})`));
    return winners;
  }

  console.log('Все погибли в битве!');
  return [];
}
