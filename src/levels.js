import Brick from "./brick";

export const buildLevel = (game, level) => {
  return level.reduce((bricks, row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      switch (brick) {
        case 1:
          bricks.push(
            new Brick(
              game,
              {
                x: 80 * brickIndex,
                y: 75 + 24 * rowIndex,
              },
              1
            )
          );
          break;

        case 2:
          bricks.push(
            new Brick(
              game,
              {
                x: 80 * brickIndex,
                y: 75 + 24 * rowIndex,
              },
              2
            )
          );
          break;

        case 3:
          bricks.push(
            new Brick(
              game,
              {
                x: 80 * brickIndex,
                y: 75 + 24 * rowIndex,
              },
              3
            )
          );
          break;
        default:
      }
    });

    return bricks;
  }, []);
};

export const level1 = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const level2 = [
  [3, 0, 0, 2, 2, 2, 2, 0, 0, 3],
  [1, 3, 0, 0, 2, 2, 0, 0, 3, 1],
  [1, 1, 3, 0, 0, 0, 0, 3, 1, 1],
  [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
  [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
  [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
  [1, 1, 3, 0, 0, 0, 0, 3, 1, 1],
  [1, 3, 0, 0, 2, 2, 0, 0, 3, 1],
  [3, 0, 0, 2, 2, 2, 2, 0, 0, 3],
];
