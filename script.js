const MAX_ATTEMPTS = 10;

let secret = [];
let currentGuess = [];
let attemptCount = 0;
let gameOver = false;

function generateSecret() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = digits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    return digits.slice(0, 4);
}

function checkGuess(guess) {
    let bulls = 0, cows = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) bulls++;
        else if (secret.indexOf(guess[i]) !== -1) cows++;
    }
    return { bulls, cows };
}

function showMessage(text, type) {
    const el = document.getElementById('message');
    el.textContent = text;
    el.className = 'message ' + (type || '');
}

function updateAttemptCounter() {
    document.getElementById('attempt-num').textContent = Math.min(attemptCount + 1, MAX_ATTEMPTS);
}

function renderCurrentRow() {
    const board = document.getElementById('board');
    let row = board.querySelector('.row.current');
    if (!row) {
        row = document.createElement('div');
        row.className = 'row current';
        const digitsDiv = document.createElement('div');
        digitsDiv.className = 'digits';
        for (let i = 0; i < 4; i++) {
            const tile = document.createElement('span');
            tile.className = 'tile';
            digitsDiv.appendChild(tile);
        }
        row.appendChild(digitsDiv);
        const fb = document.createElement('div');
        fb.className = 'feedback';
        const p1 = document.createElement('span');
        p1.className = 'badge placeholder';
        p1.textContent = '—';
        const p2 = document.createElement('span');
        p2.className = 'badge placeholder';
        p2.textContent = '—';
        fb.appendChild(p1);
        fb.appendChild(p2);
        row.appendChild(fb);
        board.appendChild(row);
    }
    const tiles = row.querySelectorAll('.tile');
    for (let i = 0; i < 4; i++) {
        if (currentGuess[i] !== undefined) {
            tiles[i].textContent = currentGuess[i];
            tiles[i].classList.add('filled');
        } else {
            tiles[i].textContent = '';
            tiles[i].classList.remove('filled');
        }
    }
    board.scrollTop = board.scrollHeight;
}

function renderAttempt(guess, feedback) {
    const board = document.getElementById('board');
    const oldCurrent = board.querySelector('.row.current');
    if (oldCurrent) oldCurrent.remove();

    const row = document.createElement('div');
    row.className = 'row';

    const digitsDiv = document.createElement('div');
    digitsDiv.className = 'digits';
    for (let i = 0; i < 4; i++) {
        const tile = document.createElement('span');
        tile.className = 'tile filled';
        tile.textContent = guess[i];
        digitsDiv.appendChild(tile);
    }

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback';
    const bullBadge = document.createElement('span');
    bullBadge.className = 'badge ' + (feedback.bulls > 0 ? 'bull' : 'zero');
    bullBadge.textContent = '🐂 ' + feedback.bulls;
    const cowBadge = document.createElement('span');
    cowBadge.className = 'badge ' + (feedback.cows > 0 ? 'cow' : 'zero');
    cowBadge.textContent = '🐄 ' + feedback.cows;
    feedbackDiv.appendChild(bullBadge);
    feedbackDiv.appendChild(cowBadge);

    row.appendChild(digitsDiv);
    row.appendChild(feedbackDiv);
    board.appendChild(row);
    board.scrollTop = board.scrollHeight;
}

function submitGuess() {
    if (gameOver) return;

    if (currentGuess.length !== 4) {
        showMessage('Введите 4 цифры', 'error');
        return;
    }

    const feedback = checkGuess(currentGuess);
    renderAttempt([...currentGuess], feedback);
    attemptCount++;

    if (feedback.bulls === 4) {
        gameOver = true;
        showMessage('🎉 Победа! Угадано за ' + attemptCount + ' попыток!', 'win');
        return;
    }

    if (attemptCount >= MAX_ATTEMPTS) {
        gameOver = true;
        showMessage('Игра окончена. Загадано было: ' + secret.join(''), 'lose');
        return;
    }

    currentGuess = [];
    renderCurrentRow();
    updateAttemptCounter();
}

function handleKey(key) {
    if (key === 'restart') {
        initGame();
        return;
    }
    if (gameOver) return;

    if (key === 'enter') { submitGuess(); return; }
    if (key === 'delete') { currentGuess.pop(); renderCurrentRow(); return; }

    if (/^\d$/.test(key)) {
        if (currentGuess.length >= 4) return;
        const digit = parseInt(key, 10);
        if (currentGuess.indexOf(digit) !== -1) {
            showMessage('Цифры не должны повторяться', 'error');
            return;
        }
        showMessage('', '');
        currentGuess.push(digit);
        renderCurrentRow();
    }
}

// делаем функцию глобальной, чтобы работали onclick из HTML
window.handleKey = handleKey;

function initGame() {
    secret = generateSecret();
    console.log('Загадано (для отладки):', secret.join('')); // видно в консоли F12
    currentGuess = [];
    attemptCount = 0;
    gameOver = false;
    document.getElementById('board').innerHTML = '';
    document.getElementById('attempt-num').textContent = '1';
    showMessage('', '');
    renderCurrentRow();
}

// физическая клавиатура
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')     { e.preventDefault(); handleKey('enter'); }
    else if (e.key === 'Backspace') { e.preventDefault(); handleKey('delete'); }
    else if (/^\d$/.test(e.key))    { handleKey(e.key); }
});

// запуск после готовности DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}