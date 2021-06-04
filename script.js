//Функция, генерируящая случайные ответы.
function answersForGame() {
  const answers = [
    'взаимность',
    'претендент',
    'секундомер',
    'автомобиль',
    'авантюрист',
    'облачность',
    'наблюдение',
    'штукатурка',
    'укротитель',
    'виолончель',
    'заговорщик',
    'клубничник',
    'антарктика'
  ];
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex].toUpperCase();
}

//Конец игры, ф-ция, которая определяет и показывает выиграл или проиграл
function gameOver(answer, win) {
  const asciiGame = '____\n|/ |\n| @\n| /|\\\n| / \\\n|\n=====';
  let message = '';
  if (win) { // если параметр 'выигрыш' отсутствует, то будет "ложка" (undefined)
    message = 'ТЫ ВЫИГРАЛ!';
  } else {
    message = 'ВСЁ КОНЧЕНО\n\n' + asciiGame;
  }
  message += '\n\nПравильный ответ: ' + answer + '!';
  alert(message);
  return message;
}

function playGame() {
  const answer = answersForGame();
  //Основные переменные
  const answerLetters = answer.split('');
  const wrongTry = [];      //неверная попытка
  const maxWrongTry = 7;
  const progressGame = '_'.repeat(answer.length).split('');

//подтверждающее сообщение
  const confirmation = confirm("Давай сыграем в 'виселицу'!\n\n" + "Я задумал какое‑то слово; можешь начинать отгадывать буквы!\n"
  + "Это самое обычное слово из " + answer.length + ' букв.\n'
  + 'Ну что, начнём?');
  if (!confirmation) {
    return gameOver(answer, false);
  }
//план: цикл игры должен быть тут
  while (wrongTry.length < maxWrongTry ) {
    const messageProgress = 'Пока ты добился: \n'
      + progressGame.join(' ') + '\n'
      + 'Ошибки: [' + wrongTry.toString() + ']\n\n'
      + 'Выбирай следующую букву!';
    const answerPlayer = prompt(messageProgress);
    if (!answerPlayer) {
      return gameOver(answer);
    }
//план: здесь будут догадки игрока
    const Try = answerPlayer.toUpperCase();
    let trueTry = false;
    for (let i = 0; i < answerLetters.length; i++) {
      if (answerLetters[i] === Try) {
        trueTry = true;
        progressGame[i] = Try;
      }
    }
//план: здесь будет условие выбора верной/неверной догадки
    if (trueTry) {
      if (answerPlayer.toUpperCase() === answer.toUpperCase() || progressGame.join('') === answer) {
        return gameOver(answer, true);
      }
      alert('Верно!');
    } else if (answerPlayer.toUpperCase() === answer.toUpperCase()){
      return gameOver(answer, true);
    } else {
      wrongTry.push(Try);
      alert('Извини, буквы ' + Try + ' тут нет.\nТы можешь ошибиться ещё '
        + (maxWrongTry - wrongTry.length) + ' раз, прежде чем\n этот бедняга будет повешен.');
    }
  }
  return gameOver(answer, false); // если игрок видит это, значит, игра окончена
}

playGame();
playGame();
playGame();