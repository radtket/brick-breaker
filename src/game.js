import Paddle from "./paddle";
import Ball from "./ball";

import { buildLevel, level1, level2 } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  YOUWIN: 5,
};

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 4;

    this.imglives = document.getElementById("img_lives");
    this.imgball = document.getElementById("img_ball");
    this.bg = document.getElementById("img_bg");
    this.bgMenu = document.getElementById("img_bgmenu");
    this.gameover = document.getElementById("img_gameover");
    this.youwin = document.getElementById("img_youwin");

    this.levels = [level1, level2];
    this.currentLevel = 0;

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
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel += 1;
      if (this.currentLevel > 1) {
        this.gamestate = GAMESTATE.YOUWIN;
      } else {
        this.gamestate = GAMESTATE.NEWLEVEL;
        this.start();
      }
    }

    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(ctx) {
    ctx.drawImage(this.bg, 0, 0, this.gameWidth, this.gameHeight);
    ctx.drawImage(this.imglives, 0, 0, 100, 50);
    for (let i = 2; i <= this.lives; i += 1) {
      ctx.drawImage(this.imgball, i * 20 + 60, 17, 16, 16);
    }
    [...this.gameObjects, ...this.bricks].forEach(brick => brick.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.drawImage(this.bgMenu, 0, 0, this.gameWidth, this.gameHeight);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.drawImage(this.gameover, 0, 0, this.gameWidth, this.gameHeight);
    }
    if (this.gamestate === GAMESTATE.YOUWIN) {
      ctx.drawImage(this.youwin, 0, 0, this.gameWidth, this.gameHeight);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.MENU) return;
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}

export default Game;
