import { useBall, useGame } from "./utils";

function detectCollisionPaddle(ball, gameObject) {
  const { bottomOfBall, leftSideOfBall, sizeBall } = useBall(ball);
  const { leftSideOfObject, rightSideOfObject, topOfObject } = useGame(
    gameObject
  );

  let hitPosition = 0;

  if (
    bottomOfBall >= topOfObject &&
    leftSideOfBall + sizeBall >= leftSideOfObject &&
    leftSideOfBall <= rightSideOfObject
  ) {
    hitPosition = leftSideOfBall - leftSideOfObject;
    if (hitPosition <= 20) {
      return 1;
    }
    if (hitPosition > 20 && hitPosition <= 50) {
      return 2;
    }
    if (hitPosition > 50 && hitPosition <= 75) {
      return 3;
    }
    if (hitPosition > 75 && hitPosition <= 100) {
      return 4;
    }
    if (hitPosition > 100 && hitPosition <= 130) {
      return 5;
    }
    if (hitPosition >= 130) {
      return 6;
    }
  }

  return 0;
}

export default detectCollisionPaddle;
