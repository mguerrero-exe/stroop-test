const mainElement = document.getElementsByTagName('main')[0];

const startBtn = document.getElementById('start');

const COLORS = { RED: '#FF0000', BLUE: '#0066FF', GREEN: '#66FF66', PURPLE: '#8844FF', YELLOW: '#FFFF00', ORANGE: '#FF8833' };

let INITIAL_TIME = 0;

let POINTS = 0;

let counter = INITIAL_TIME;

let initialCounter = 4;

let isRunning = false;

const AUDIOS = {
  correct: './assets/Correct.mp3',
  wrong: './assets/Wrong.mp3',
  tick: './assets/Tick.mp3',
  tickFinal: './assets/TickFinal.mp3',
}

const IMAGES = {
  check: './assets/check.svg',
  wrong: './assets/wrong.svg',
  party: './assets/party.svg',
}

const playAudio = (path) => {
  const sound = new Audio(path);
  sound.play();
}

const chooseDificult = () => {

  POINTS = 0;
  counter = INITIAL_TIME;
  initialCounter = 4
  document.documentElement.style.setProperty('--SIZE', '100%')

  const dificultyContainer = document.createElement('section');
  dificultyContainer.classList.add('dificultyContainer');

  const titleContainer = document.createElement('section');
  titleContainer.classList.add('titleContainer');

  const titleText = document.createElement('h1');
  titleText.classList.add('titleText');
  titleText.innerText = 'Choose Dificulty';

  titleContainer.appendChild(titleText)
  dificultyContainer.appendChild(titleContainer)

  const btnArea = document.createElement('section');
  btnArea.classList.add('btnWrapper');

  [...Array(5)].map((_, index) => {
    const btn = document.createElement('button');

    btn.classList.add('dificultyBtn');

    btn.innerText = index + 1;

    // btn.addEventListener('click', () => setDifficulty(index + 1));
    btn.addEventListener('click', () => goToCounter(index + 1));

    btnArea.appendChild(btn);
  });

  mainElement.innerHTML = '';

  dificultyContainer.appendChild(titleContainer);
  dificultyContainer.appendChild(btnArea);

  mainElement.appendChild(dificultyContainer)
};

const createInitialCounter = (element, count) => {
  element.innerHTML = '';
  const countDownContainer = document.createElement('section')
  countDownContainer.classList.add('countDownContainer');

  const counterText = document.createElement('p');
  counterText.classList.add('counterText');
  counterText.innerText = count;

  countDownContainer.appendChild(counterText);
  element.appendChild(countDownContainer);
}

const goToCounter = (dificulty) => {
  mainElement.innerHTML = '';
  const interval = setInterval(() => {
    initialCounter--;
    if (initialCounter === 0) {
      createInitialCounter(mainElement, 'Go!');
      playAudio(AUDIOS.tickFinal);
      clearInterval(interval);
      setTimeout(() => setDifficulty(dificulty), 1000)
    } else {
      createInitialCounter(mainElement, initialCounter);
      playAudio(AUDIOS.tick);
    }
  }, 1000)
}

startBtn.addEventListener('click', () => {
  chooseDificult();
});

function setDifficulty(dificulty) {
  // if (mainElement.requestFullscreen) {
  //   mainElement.requestFullscreen();
  // } else if (mainElement.webkitRequestFullscreen) {
  //   mainElement.webkitRequestFullscreen();
  // } else if (mainElement.msRequestFullscreen) {
  //   mainElement.msRequestFullscreen();
  // }
  INITIAL_TIME = dificulty > 3 ? 120 : 60
  counter = dificulty > 3 ? 120 : 60
  
  startGame(dificulty);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const displayAnswerMsg = (correct) => {
  return `${correct ? 'Correct' : 'Wrong'} <img src="${correct ? IMAGES.check : IMAGES.wrong}" class="answerEmoji" />`
}

function checkAnswer (e, ans, dificulty, element) {
  const answeredContainer = document.createElement('section');
  answeredContainer.classList.add('answeredContainer');

  const answerText = document.createElement('p');
  answerText.classList.add('answerText');

  if (e.srcElement.innerText === ans) {
    POINTS++;
    playAudio(AUDIOS.correct);
    answerText.innerHTML = displayAnswerMsg(true)
  } else {
    playAudio(AUDIOS.wrong);
    answerText.innerHTML = displayAnswerMsg(false)
  }

  answeredContainer.appendChild(answerText)

  element.appendChild(answeredContainer)

  setTimeout(() => createBoard(dificulty, element), 500)
}

function createBoard(dificulty, element) {
  element.innerHTML = '';

  const keyes = Object.keys(COLORS)

  const btnArray = [...Array(dificulty + 1)].map((_, i) => {
    return keyes[i];
  });

  const colorWrapper = document.createElement('section');
  colorWrapper.classList.add('colorWrapper');

  const correctAnswer = keyes[Math.round(Math.random() * dificulty)]

  const colorName = document.createElement('p');
  colorName.classList.add('colorName');
  colorName.style.color = `var(--${correctAnswer})`;
  colorName.innerHTML = keyes[Math.round(Math.random() * dificulty)];

  const buttonsWrapper = document.createElement('section');
  buttonsWrapper.classList.add('buttonsWrapper')

  shuffle(btnArray).forEach((item) => {
    const btn = document.createElement('button');
    btn.classList.add('colorBtn');
    if (btnArray.length == 2) {
      btn.classList.add('ot')
    }
    btn.style.color = `var(--${keyes[Math.round(Math.random() * dificulty)]})`
    btn.innerText = item;
    btn.addEventListener('click', e => checkAnswer(e, correctAnswer, dificulty, element))

    buttonsWrapper.appendChild(btn)
  });

  colorWrapper.appendChild(colorName);
  element.appendChild(colorWrapper);
  element.appendChild(buttonsWrapper);
}

const createCounter = (element) => {
  const timerContainer = document.createElement('section');
  timerContainer.classList.add('timerContainer');

  const timerProgressBarContainer = document.createElement('section');
  timerProgressBarContainer.classList.add('timerProgressBarContainer');

  const timerProgressBar = document.createElement('section');
  timerProgressBar.classList.add('timerProgressBar');

  const timerProgress = document.createElement('section');
  timerProgress.classList.add('timerProgress');

  timerProgressBar.appendChild(timerProgress);
  timerProgressBarContainer.appendChild(timerProgressBar);

  const counterContainer = document.createElement('section');
  counterContainer.classList.add('counterContainer');

  const counter = document.createElement('p');
  counter.classList.add('counter');

  counterContainer.appendChild(counter);

  const stopGameContainer = document.createElement('section');
  stopGameContainer.classList.add('stopGameContainer');

  const stopGameBtn = document.createElement('button');
  stopGameBtn.classList.add('stopGameBtn');
  stopGameBtn.innerText = 'Stop'
  stopGameBtn.addEventListener('click', stopGame)

  stopGameContainer.appendChild(stopGameBtn);

  timerContainer.appendChild(timerProgressBarContainer);
  timerContainer.appendChild(counterContainer);
  timerContainer.appendChild(stopGameContainer);

  element.appendChild(timerContainer);
};

function startGame(dificulty) {
  mainElement.innerHTML = '';

  isRunning = true;

  const board = document.createElement('section');
  board.classList.add('board');
  mainElement.appendChild(board);

  createCounter(mainElement);

  const counterElem = document.getElementsByClassName('counter')[0];
  const progressElem = document.getElementsByClassName('timerProgress')[0];

  createBoard(dificulty, board);

  const interval = setInterval(() => {
    counter--;
    counterElem.innerText = counter;
    const percentage = (counter / INITIAL_TIME) * 100
    document.documentElement.style.setProperty('--SIZE', `${percentage}%`)
    progressElem.style.backgroundColor = `var(--${percentage < 20 ? 'RED' : percentage < 50 ? 'YELLOW' : 'GREEN'})`
    if (counter === 0 || !isRunning) {
      clearInterval(interval);
      stopGame()
    }
  }, 1000);
}

function stopGame() {
  mainElement.innerHTML = '';

  isRunning = false;

  const gameOverContainer = document.createElement('section')
  gameOverContainer.classList.add('gameOverContainer');

  const titleContainer = document.createElement('section');
  titleContainer.classList.add('titleContainer');

  const titleText = document.createElement('h1');
  titleText.classList.add('titleText');
  titleText.innerText = 'Game Over'

  titleContainer.appendChild(titleText)

  const ptsContainer = document.createElement('section');
  ptsContainer.classList.add('ptsContainer');
  
  const pts = document.createElement('p');
  pts.classList.add('pts');
  pts.innerHTML = `Your Score: <span class='points'>${POINTS}</span>`;

  ptsContainer.appendChild(pts)

  const endBtnsContainer = document.createElement('section');
  endBtnsContainer.classList.add('endBtnsContainer');

  [...Array(2)].map((_, i) => {
    const btn = document.createElement('button');

    btn.classList.add('endBtn');
    btn.innerText = i === 0 ? 'Go to Home' : 'Restart'
    btn.addEventListener('click', () => i === 0 ? goHome() : restartGame())

    endBtnsContainer.appendChild(btn);
  })

  gameOverContainer.appendChild(titleContainer)
  gameOverContainer.appendChild(ptsContainer)
  gameOverContainer.appendChild(endBtnsContainer)

  mainElement.appendChild(gameOverContainer)

}

function goHome () {
  mainElement.innerHTML = ''

  const start = document.createElement('button');
  start.id = 'start'
  start.innerText = 'Start'

  start.addEventListener('click', chooseDificult)
  
  mainElement.appendChild(start)
}

function restartGame () {
  chooseDificult()
}
