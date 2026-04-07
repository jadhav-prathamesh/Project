# Snake Game

Minimal classic Snake implemented as a dependency-free browser app.

## Run

If Python is available:

```powershell
cd "c:\Users\hp\OneDrive\Documents\New project"
python -m http.server 8000
```

Then open `http://localhost:8000/`.

If you do not want to run a server, you can also open `index.html` directly in a browser.

## Navigate

Open the repo root page:

- `http://localhost:8000/`

## Manual Verification Checklist

- Start the game with arrow keys or `W`, `A`, `S`, `D`.
- Confirm the snake moves one cell per tick and cannot reverse directly into itself.
- Eat food and confirm the score increments by `1` and the snake grows by one segment.
- Confirm food never appears on top of the snake.
- Hit a wall or your own body and confirm the game ends.
- Use `Pause` and confirm movement stops until resumed.
- Use `Restart` and confirm the board, score, and snake reset.
- On smaller screens, confirm the on-screen direction buttons work.
