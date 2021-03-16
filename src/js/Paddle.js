import { reset } from "./utils";

class Paddle {
  constructor({ gameWidth, gameHeight }) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 150;
    this.height = 20;

    this.maxSpeed = 10;
    this.speed = 0;

    this.reset();

    this.position = reset({
      gameWidth,
      gameHeight,
      width: this.width,
      height: this.height,
    });
  }

  reset() {
    this.position = reset({
      gameWidth: this.gameWidth,
      gameHeight: this.gameHeight,
      width: this.width,
      height: this.height,
    });
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      document.getElementById("img_paddle"),
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}

export default Paddle;
