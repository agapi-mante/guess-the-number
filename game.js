let name = '';
let number = Math.floor(Math.random() * 100); //генерация случайного числа(которое должен угадать пользователь)
let guesses = 0; //попытки пользователя

const output = document.querySelector('#output'); //активируем дополнительные элементы из html кода
const prompt = document.querySelector('#prompt');
const input = document.querySelector('#prompt input');

prompt.addEventListener('submit', handleSubmit); //событие формы prompt

printMessage('Введите имя игрока:');

input.focus(); //фокус строки, на основное текстового поля

function handleSubmit(event) { //отправка данных на сервер и дальнейшия его обработка
    event.preventDefault();

    processInput(input.value);

    input.value = ''; //получение значение в текстовое поле
}

function printMessage(message) { //процесс вывода сообщение к пользователю
    let li = document.createElement('li');

    li.textContent = message;

    output.appendChild(li);
}

function clearOutput() { //удаление предыдущего сообщение - (Введите имя игрока)
    for (let i = 0; i < output.children.length; i++) {
        output.removeChild(output.children[i]);
    }
}

function processInput(input) {
    if (!input) return; //проверка в значение переменной input

    if (!name) { //проверка значение (Что именно ввёл пользователь)
        name = input;
        clearOutput();
        printMessage(`${name}, загадано число от 0 до 100. Попробуй отгадать его за наименьшее количество попыток. После каждой попытки я скажу "мало", "много" или "верно".`);
        return;
    }

    printMessage(input);

    let guess = Number.parseInt(input); //Получаем место нашей строки число

    if (Number.isNaN(guess)) return; //если пользователь введёт значение. Будет обратное возвращение этой функции

    guesses += 1;

    if (guess > number) { //если проверка прошла успешно, то выполняется данная проверка для нашего пользователя
        printMessage('Много. Попробуй еще раз.');
    } else if (guess < number) {
        printMessage('Мало. Попробуй еще раз.');
    } else {
        printMessage(`Верно, это число ${guess}.`);
        printMessage(`Количество попыток: ${guesses}.`);
        printMessage('GAME OVER');

        prompt.remove(); //после того,как пользователь угадал число. Он больше ввести нечего не сможет 
    }
}
