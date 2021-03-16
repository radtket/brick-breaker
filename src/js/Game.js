import Paddle from "./Paddle";
import Ball from "./Ball";

import { buildLevel } from "./buildLevel";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  YOUWIN: 5,
};

const { PAUSED, RUNNING, MENU, GAMEOVER, NEWLEVEL, YOUWIN } = GAMESTATE;

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 4;

    this.currentLevelNumber = 0;

    document.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.paddle.moveLeft();
          break;

        case 39:
          this.paddle.moveRight();
          break;

        case 32:
          this.ball.go();
          break;

        case 13:
          this.togglePause();
          this.start();
          break;
        default:
      }
    });

    document.addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          if (this.paddle.speed < 0) {
            this.paddle.stop();
          }
          break;

        case 39:
          if (this.paddle.speed > 0) {
            this.paddle.stop();
          }
          break;
        default:
      }
    });
  }

  start() {
    if (this.gamestate !== MENU && this.gamestate !== NEWLEVEL) {
      return;
    }

    this.bricks = buildLevel(this, this.currentLevelNumber);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMEOVER;
    }

    if (
      this.gamestate === PAUSED ||
      this.gamestate === MENU ||
      this.gamestate === GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevelNumber += 1;
      if (this.currentLevelNumber > 1) {
        this.gamestate = YOUWIN;
      } else {
        this.gamestate = NEWLEVEL;
        this.start();
      }
    }

    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(ctx) {
    const drawIt = id => {
      ctx.drawImage(
        document.getElementById(id),
        0,
        0,
        this.gameWidth,
        this.gameHeight
      );
    };

    drawIt("img_bg");
    ctx.drawImage(document.getElementById("img_lives"), 0, 0, 100, 50);

    for (let i = 2; i <= this.lives; i += 1) {
      ctx.drawImage(
        document.getElementById("img_ball"),
        i * 20 + 60,
        17,
        16,
        16
      );
    }

    [...this.gameObjects, ...this.bricks].forEach(brick => brick.draw(ctx));

    if (this.gamestate === PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === MENU) {
      drawIt("img_bgmenu");
    }

    if (this.gamestate === GAMEOVER) {
      drawIt("img_gameover");
    }

    if (this.gamestate === YOUWIN) {
      drawIt("img_youwin");
    }
  }

  togglePause() {
    if (this.gamestate === MENU) {
      return;
    }

    this.gamestate = this.gamestate === PAUSED ? RUNNING : PAUSED;
  }
}

export default Game;
