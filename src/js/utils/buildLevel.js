import Brick from "../Brick";
import { LEVELS_ARRAY } from "./constants";

const buildLevel = (game, currentLevelNumber) =>
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

export default buildLevel;
