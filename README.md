# Snake Game

A clean, dependency-free browser version of the classic Snake game built with HTML, CSS, and JavaScript.

This project focuses on simple gameplay, responsive controls, and an interface that works well on both desktop and smaller screens.

## Features

- Classic Snake gameplay in the browser
- Keyboard controls with `Arrow` keys or `W`, `A`, `S`, `D`
- Pause and restart controls
- Score tracking
- Collision detection for walls and self-contact
- On-screen controls for smaller screens
- No external libraries or build setup required

## Tech Stack

`HTML` `CSS` `JavaScript`

## Run Locally

You can open `index.html` directly in your browser, or run a small local server:

```powershell
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Project Goal

The goal of this project is to build a polished browser game using only core web technologies while keeping the code easy to understand and extend.

## Manual Verification Checklist

- Start the game with arrow keys or `W`, `A`, `S`, `D`
- Confirm the snake moves one cell per tick and cannot reverse directly into itself
- Eat food and confirm the score increases and the snake grows
- Confirm food never appears on top of the snake
- Hit a wall or your own body and confirm the game ends
- Use `Pause` and confirm movement stops until resumed
- Use `Restart` and confirm the board, score, and snake reset
- On smaller screens, confirm the on-screen direction buttons work
