// ============================================
// ЭТО ФАЙЛ script.js (JavaScript)
// Только код игры. Здесь НЕ должно быть
// CSS-стилей (никаких * { margin: 0 }) и
// HTML-тегов. Если при сохранении видите
// такое — вы вставили не тот код.
// ============================================

console.log('script.js загружен');

(function () {
    'use strict';

    var statusEl = document.getElementById('js-status');

    function setStatus(text, color) {
        if (statusEl) {
            statusEl.textContent = text;
            statusEl.style.background = color;
            statusEl.style.color = '#fff';
        }
    }

    setStatus('✓ JS загружен', '#538d4e');

    try {
        var MAX_ATTEMPTS = 10;
        var secret = [];
        var currentGuess = [];
        var attemptCount = 0;
        var gameOver = false;

        function generateSecret() {
            var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (var i = digits.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = digits[i];
                digits[i] = digits[j];
                digits[j] = tmp;
            }
            return digits.slice(0, 4);
        }

        function checkGuess(guess) {
            var bulls = 0;
            var cows = 0;
            for (var i = 0; i < 4; i++) {
                if (guess[i] === secret[i]) {
                    bulls++;
                } else if (secret.indexOf(guess[i]) !== -1) {
                    cows++;
                }
            }
            return { bulls: bulls, cows: cows };
        }

        function showMessage(text, type) {
            var el = document.getElementById('message');
            el.textContent = text;
            el.className = 'message ' + (type || '');
        }

        function renderCurrentRow() {
            var board = document.getElementById('board');
            var row = board.querySelector('.row.current');
            if (!row) {
                row = document.createElement('div');
                row.className = 'row current';

                var digitsDiv = document.createElement('div');
                digitsDiv.className = 'digits';
                for (var i = 0; i < 4; i++) {
                    var tile = document.createElement('span');
                    tile.className = 'tile';
                    digitsDiv.appendChild(tile);
                }
                row.appendChild(digitsDiv);

                var fb = document.createElement('div');
                fb.className = 'feedback';
                var p1 = document.createElement('span');
                p1.className = 'badge placeholder';
                p1.textContent = '—';
                var p2 = document.createElement('span');
                p2.className = 'badge placeholder';
                p2.textContent = '—';
                fb.appendChild(p1);
                fb.appendChild(p2);
                row.appendChild(fb);

                board.appendChild(row);
            }

            var tiles = row.querySelectorAll('.tile');
            for (var k = 0; k < 4; k++) {
                if (currentGuess[k] !== undefined) {
                    tiles[k].textContent = currentGuess[k];
                    tiles[k].classList.add('filled');
                } else {
                    tiles[k].textContent = '';
                    tiles[k].classList.remove('filled');
                }
            }
            board.scrollTop = board.scrollHeight;
        }

        function renderAttempt(guess, feedback) {
            var board = document.getElementById('board');
            var oldCurrent = board.querySelector('.row.current');
            if (oldCurrent) {
                oldCurrent.remove();
            }

            var row = document.createElement('div');
            row.className = 'row';

            var digitsDiv = document.createElement('div');
            digitsDiv.className = 'digits';
            for (var i = 0; i < 4; i++) {
                var tile = document.createElement('span');
                tile.className = 'tile filled';
                tile.textContent = guess[i];
                digitsDiv.appendChild(tile);
            }

            var feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'feedback';

            var bullBadge = document.createElement('span');
            bullBadge.className = 'badge ' + (feedback.bulls > 0 ? 'bull' : 'zero');
            bullBadge.textContent = '🐂 ' + feedback.bulls;

            var cowBadge = document.createElement('span');
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
            if (gameOver) {
                return;
            }
            if (currentGuess.length !== 4) {
                showMessage('Введите 4 цифры', 'error');
                return;
            }

            var feedback = checkGuess(currentGuess);
            renderAttempt(currentGuess.slice(), feedback);
            attemptCount++;

            if (feedback.bulls === 4) {
                gameOver = true;
                showMessage('🎉 Победа! Угадано за ' + attemptCount + ' попыток!', 'win');
                setStatus('✓ JS загружен (победа)', '#538d4e');
                return;
            }

            if (attemptCount >= MAX_ATTEMPTS) {
                gameOver = true;
                showMessage('Игра окончена. Загадано было: ' + secret.join(''), 'lose');
                setStatus('✓ JS загружен (проигрыш)', '#538d4e');
                return;
            }

            currentGuess = [];
            renderCurrentRow();
            document.getElementById('attempt-num').textContent = String(attemptCount + 1);
        }

        function handleKey(key) {
            if (key === 'restart') {
                initGame();
                return;
            }
            if (gameOver) {
                return;
            }
            if (key === 'enter') {
                submitGuess();
                return;
            }
            if (key === 'delete') {
                currentGuess.pop();
                renderCurrentRow();
                return;
            }
            if (/^[0-9]$/.test(key)) {
                if (currentGuess.length >= 4) {
                    return;
                }
                var digit = parseInt(key, 10);
                if (currentGuess.indexOf(digit) !== -1) {
                    showMessage('Цифры не должны повторяться', 'error');
                    return;
                }
                showMessage('', '');
                currentGuess.push(digit);
                renderCurrentRow();
                setStatus('✓ JS загружен — нажата "' + key + '"', '#538d4e');
            }
        }

        function initGame() {
            secret = generateSecret();
            console.log('Загадано (для отладки):', secret.join(''));
            currentGuess = [];
            attemptCount = 0;
            gameOver = false;
            document.getElementById('board').innerHTML = '';
            document.getElementById('attempt-num').textContent = '1';
            showMessage('', '');
            renderCurrentRow();
            setStatus('✓ JS загружен — игра начата', '#538d4e');
        }

        document.getElementById('keyboard').addEventListener('click', function (e) {
            var btn = e.target.closest ? e.target.closest('.key') : null;
            if (!btn) {
                return;
            }
            handleKey(btn.getAttribute('data-key'));
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleKey('enter');
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                handleKey('delete');
            } else if (/^[0-9]$/.test(e.key)) {
                handleKey(e.key);
            }
        });

        initGame();

    } catch (err) {
        console.error('КРИТИЧЕСКАЯ ОШИБКА:', err);
        setStatus('✗ Ошибка: ' + err.message, '#d64545');
    }
})();