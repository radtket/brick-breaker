import Game from "./js/Game";
import { GAME_HEIGHT, GAME_WIDTH } from "./js/utils/constants";
import "./scss/main.scss";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
