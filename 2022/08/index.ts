export const solve = (inputText: string) => {
  const grid = inputText.split("\n").map((line) => line.split("").map((tree) => parseInt(tree)));

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

  return {
    part1: () => {
      return visibleTrees.size + outlineCount;
    },

    part2: () => {
      return "out".toString();
    },
  };
};
