export const solve = (inputText: string) => {
  const grid = inputText.split("\n").map((line) => line.split("").map((tree) => parseInt(tree)));

  return {
    part1: () => {
      let visibleTrees = new Set<string>();

      let lastHighest = 0;
      //TL to TR
      for (let x = 1; x < grid[0].length - 1; x++) {
        lastHighest = 0;
        for (let y = 1; y < grid.length - 1; y++) {
          lastHighest = Math.max(lastHighest, grid[y - 1][x]);
          if (grid[y][x] > lastHighest) {
            visibleTrees.add(`${x},${y}`);
          }
        }

        //BL to BR
        lastHighest = 0;
        for (let y = grid.length - 2; y > 0; y--) {
          lastHighest = Math.max(lastHighest, grid[y + 1][x]);
          if (grid[y][x] > lastHighest) {
            visibleTrees.add(`${x},${y}`);
          }
        }
      }

      //TL to BL
      for (let y = 1; y < grid.length - 1; y++) {
        lastHighest = 0;
        for (let x = 1; x < grid[0].length - 1; x++) {
          lastHighest = Math.max(lastHighest, grid[y][x - 1]);
          if (grid[y][x] > lastHighest) {
            visibleTrees.add(`${x},${y}`);
          }
        }

        //TR to BR
        lastHighest = 0;
        for (let x = grid[0].length - 2; x > 0; x--) {
          lastHighest = Math.max(lastHighest, grid[y][x + 1]);
          if (grid[y][x] > lastHighest) {
            visibleTrees.add(`${x},${y}`);
          }
        }
      }
      const outlineCount = grid.length * 2 + grid[0].length * 2 - 4;
      return visibleTrees.size + outlineCount;
    },

    part2: () => {
      let maxScore = 0;
      for (let x = 1; x < grid[0].length - 1; x++) {
        for (let y = 1; y < grid.length - 1; y++) {
          const tree = grid[y][x];

          let R = 0;
          for (let dx = x + 1; dx < grid[0].length; dx++) {
            R++;
            if (grid[y][dx] >= tree) {
              break;
            }
          }

          let L = 0;
          for (let dx = x - 1; dx >= 0; dx--) {
            L++;
            if (grid[y][dx] >= tree) {
              break;
            }
          }

          let D = 0;
          for (let dy = y + 1; dy < grid.length; dy++) {
            D++;
            if (grid[dy][x] >= tree) {
              break;
            }
          }

          let U = 0;
          for (let dy = y - 1; dy >= 0; dy--) {
            U++;
            if (grid[dy][x] >= tree) {
              break;
            }
          }
          console.log(L * R * U * D);
          maxScore = Math.max(maxScore, L * R * U * D);
        }
      }
      return maxScore.toString();
    },
  };
};
