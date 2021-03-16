const useBall = ({ position, size, speed }) => {
  const { x, y } = position;
  return {
    sizeBall: size,
    bottomOfBall: y + size,
    leftSideOfBall: x,
    rightSideOfBall: x + size,
    topOfBall: y,
    ballSpeedX: speed.x,
    ballSpeedY: speed.y,
  };
};

const useGame = ({ position, width, height }) => {
  const { x, y } = position;
  return {
    bottomOfObject: y + height,
    leftSideOfObject: x,
    rightSideOfObject: x + width,
    topOfObject: y,
  };
};

export const detectCollision = (ball, gameObject) => {
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
};

export const detectCollisionPaddle = (ball, gameObject) => {
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
};

export const reset = ({ gameWidth, gameHeight, width, height }) => {
  console.log({ gameWidth, gameHeight, width, height });
  return {
    x: gameWidth / 2 - width / 2,
    y: gameHeight - height - 10,
  };
};
