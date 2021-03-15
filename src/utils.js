export const useBall = ({ position, size, speed }) => {
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

export const useGame = ({ position, width, height }) => {
  const { x, y } = position;
  return {
    bottomOfObject: y + height,
    leftSideOfObject: x,
    rightSideOfObject: x + width,
    topOfObject: y,
  };
};
