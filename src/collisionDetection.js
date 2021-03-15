import { useBall, useGame } from "./utils";

function detectCollision(ball, gameObject) {
  const {
    bottomOfBall,
    leftSideOfBall,
    rightSideOfBall,
    topOfBall,
    ballSpeedX,
    ballSpeedY,
  } = useBall(ball);
  const {
    bottomOfObject,
    leftSideOfObject,
    rightSideOfObject,
    topOfObject,
  } = useGame(gameObject);

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    rightSideOfBall >= leftSideOfObject &&
    leftSideOfBall <= rightSideOfObject
  ) {
    if (
      (ballSpeedX >= 0 &&
        ballSpeedY < 0 &&
        bottomOfObject - topOfBall < rightSideOfBall - leftSideOfObject) ||
      (ballSpeedX <= 0 &&
        ballSpeedY < 0 &&
        bottomOfObject - topOfBall < rightSideOfObject - leftSideOfBall) ||
      (ballSpeedX >= 0 &&
        ballSpeedY > 0 &&
        bottomOfBall - topOfObject < rightSideOfBall - leftSideOfObject) ||
      (ballSpeedX <= 0 &&
        ballSpeedY > 0 &&
        bottomOfBall - topOfObject < rightSideOfObject - leftSideOfBall)
    ) {
      console.log("caso Y");
      return 1;
    }
    if (
      (ballSpeedX > 0 &&
        ballSpeedY <= 0 &&
        bottomOfObject - topOfBall > rightSideOfBall - leftSideOfObject) ||
      (ballSpeedX < 0 &&
        ballSpeedY <= 0 &&
        bottomOfObject - topOfBall > rightSideOfObject - leftSideOfBall) ||
      (ballSpeedX > 0 &&
        ballSpeedY >= 0 &&
        bottomOfBall - topOfObject > rightSideOfBall - leftSideOfObject) ||
      (ballSpeedX < 0 &&
        ballSpeedY >= 0 &&
        bottomOfBall - topOfObject > rightSideOfObject - leftSideOfBall)
    ) {
      console.log("caso X");
      return 2;
    }
  }

  return false;
}

export default detectCollision;
