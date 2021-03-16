import Brick from "./Brick";

const LEVELS_ARRAY = [
  [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [3, 0, 0, 2, 2, 2, 2, 0, 0, 3],
    [1, 3, 0, 0, 2, 2, 0, 0, 3, 1],
    [1, 1, 3, 0, 0, 0, 0, 3, 1, 1],
    [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
    [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
    [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
    [1, 1, 3, 0, 0, 0, 0, 3, 1, 1],
    [1, 3, 0, 0, 2, 2, 0, 0, 3, 1],
    [3, 0, 0, 2, 2, 2, 2, 0, 0, 3],
  ],
];

export const buildLevel = (game, currentLevelNumber) =>
  LEVELS_ARRAY[currentLevelNumber].reduce(
    (bricks, row, rowIndex) =>
      row.reduce(
        (all, brick, brickIndex) => [
          ...all,
          new Brick(
            game,
            {
              x: 80 * brickIndex,
              y: 75 + 24 * rowIndex,
            },
            brick
          ),
        ],
        bricks
      ),
    []
  );
