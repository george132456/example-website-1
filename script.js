* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #121213;
    color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

header {
    padding: 16px 0 12px;
    text-align: center;
    border-bottom: 1px solid #3a3a3c;
    width: 100%;
    max-width: 500px;
}

h1 {
    font-size: 1.7rem;
    letter-spacing: 4px;
    font-weight: bold;
}

.subtitle {
    font-size: 0.85rem;
    color: #818384;
    margin-top: 6px;
}

main {
    flex: 1;
    width: 100%;
    max-width: 500px;
    padding: 12px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.board {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 200px;
    padding-bottom: 8px;
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid #2a2a2b;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
}

.digits {
    display: flex;
    gap: 6px;
}

.tile {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    border: 2px solid #3a3a3c;
    border-radius: 4px;
    background: transparent;
    transition: border-color 0.15s;
}

.tile.filled {
    border-color: #565758;
}

.feedback {
    display: flex;
    gap: 6px;
}

.badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: bold;
    white-space: nowrap;
}

.badge.bull {
    background: #538d4e;
    color: #fff;
}

.badge.cow {
    background: #b59f3b;
    color: #fff;
}

.badge.zero {
    background: #3a3a3c;
    color: #818384;
}

.message {
    min-height: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 0.95rem;
    padding: 6px;
    border-radius: 4px;
    transition: all 0.2s;
}

.message.win {
    background: #538d4e;
    color: #fff;
    padding: 10px;
}

.message.lose {
    background: #d64545;
    color: #fff;
    padding: 10px;
}

.message.error {
    color: #ff6b6b;
}

.keyboard {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: auto;
}

.keypad-row {
    display: flex;
    gap: 6px;
    justify-content: center;
}

.key {
    flex: 1;
    max-width: 60px;
    height: 52px;
    background: #818384;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1.15rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.1s, transform 0.05s;
    user-select: none;
}

.key:hover  { background: #9a9a9b; }
.key:active { transform: scale(0.94); }

.key.wide {
    max-width: 120px;
    font-size: 0.85rem;
}

.key.enter { background: #538d4e; }
.key.enter:hover { background: #6ba565; }

footer {
    padding: 10px;
    text-align: center;
    color: #818384;
    font-size: 0.75rem;
}