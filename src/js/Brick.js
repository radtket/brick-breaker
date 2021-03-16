import { detectCollision } from "./utils";

class Brick {
  constructor(game, position, str) {
    this.game = game;
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.str = str;
    this.markedForDeletion = false;
  }

  update() {
    const initUpdate = cord => {
      this.game.ball.speed[cord] = -this.game.ball.speed[cord];
      if (this.str <= 1) {
        this.markedForDeletion = true;
      } else {
        this.str -= 1;
      }
    };

    switch (detectCollision(this.game.ball, this)) {
      case 1:
        initUpdate("y");
        break;
      case 2:
        initUpdate("x");
        break;
      default:
    }
  }

  draw(ctx) {
    ctx.drawImage(
      document.getElementById(`img_brick${this.str}`),
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export default Brick;
