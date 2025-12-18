import { play } from './js/game.js';

function handleButtonClick() {
  const logDiv = document.getElementById('log');
  const resultDiv = document.getElementById('result');

  logDiv.innerHTML = '';
  resultDiv.innerHTML = '';

  const originalConsoleLog = console.log;
  console.log = function logToDiv(...args) {
    originalConsoleLog.apply(console, args);
    const message = args.join(' ');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logDiv.appendChild(logEntry);
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  const winners = play();

  const resultText = document.createElement('p');
  if (winners.length === 1) {
    resultText.textContent = `Победитель: ${winners[0].description} ${winners[0].name}!`;
    resultText.style.color = 'green';
    resultText.style.fontWeight = 'bold';
  } else if (winners.length > 1) {
    resultText.textContent = `Ничья! Осталось игроков: ${winners.length}`;
    resultText.style.color = 'orange';
  } else {
    resultText.textContent = 'Все погибли!';
    resultText.style.color = 'red';
  }

  resultDiv.appendChild(resultText);
  console.log = originalConsoleLog;
}

document.addEventListener('DOMContentLoaded', () => {
  const gameDiv = document.getElementById('game');

  const title = document.createElement('h2');
  title.textContent = 'Битва персонажей';
  gameDiv.appendChild(title);

  const logDiv = document.createElement('div');
  logDiv.id = 'log';
  logDiv.style.height = '300px';
  logDiv.style.overflowY = 'auto';
  logDiv.style.border = '1px solid #ccc';
  logDiv.style.padding = '10px';
  logDiv.style.marginBottom = '10px';
  gameDiv.appendChild(logDiv);

  const startButton = document.createElement('button');
  startButton.textContent = 'Начать битву';
  startButton.style.padding = '10px 20px';
  startButton.style.fontSize = '16px';
  startButton.style.margin = '10px';

  const resultDiv = document.createElement('div');
  resultDiv.id = 'result';
  resultDiv.style.marginTop = '20px';
  resultDiv.style.fontSize = '18px';

  startButton.addEventListener('click', handleButtonClick);

  gameDiv.appendChild(startButton);
  gameDiv.appendChild(resultDiv);
});
