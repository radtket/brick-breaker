import { detectCollisionPaddle, reset } from "./utils";

class Ball {
  constructor(game) {
    this.game = game;
    this.size = 16;
    this.reset();
    this.state = 0;
  }

  go() {
    if (this.state === 1) {
      return;
    }
    this.speed = { x: 5, y: -7 };
    this.state = 1;
  }

  reset() {
    this.position = reset({
      ...this.game,
      width: this.size,
      height: this.size,
    });
    this.speed = { x: 0, y: 0 };
    this.state = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      document.getElementById("img_ball"),
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.state === 0) {
      this.position.x = this.game.paddle.position.x + 67;
      this.position.y = this.game.paddle.position.y - 20;
    } else {
      // wall collision on left or right
      if (
        this.position.x > this.game.gameWidth - this.size ||
        this.position.x < 0
      ) {
        this.speed.x = -this.speed.x;
      }
      // wall collision on top
      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      }

      // bottom of game
      if (this.position.y + this.size > this.game.gameHeight) {
        this.game.lives -= 1;
        this.reset();
        this.game.paddle.reset();
      }

      switch (detectCollisionPaddle(this, this.game.paddle)) {
        case 1:
          this.speed.x = -9;
          this.speed.y = -this.speed.y;
          this.position.y = this.game.paddle.position.y - this.size;
          break;
        case 2:
          if (this.speed.x < 0) {
            this.speed.x = -6;
          } else {
            this.speed.x += -6;
          }
          this.speed.y = -this.speed.y;
          this.position.y = this.game.paddle.position.y - this.size;
          break;
        case 3:
          this.speed.y = -this.speed.y;
          this.position.y = this.game.paddle.position.y - this.size;
          break;
        case 4:
          this.speed.y = -this.speed.y;
          this.position.y = this.game.paddle.position.y - this.size;
          break;
        case 5:
          if (this.speed.x > 0) {
            this.speed.x = 6;
          } else {
            this.speed.x += 6;
          }
          this.speed.y = -this.speed.y;
          this.position.y = this.game.paddle.position.y - this.size;
          break;
        case 6:
          this.speed.x = 9;
          this.speed.y = -this.speed.y;
          this.position.y = this.game.paddle.position.y - this.size;
          break;
        default:
      }
    }
  }
}

export default Ball;
