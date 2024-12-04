export const solve = (inputText: string) => {
  const lines = inputText.split("\r\n");

  let foundCount = 0;
  let size = { x: lines[0].length, y: lines.length };

  return {
    part1: () => {
      const searchString = "XMAS";

      const directions: [number, number][] = [
        [1, 0], //   →
        [1, 1], //   ↘
        [0, 1], //   ↓
        [-1, 1], //  ↙
        [-1, 0], //  ←
        [-1, -1], // ↖
        [0, -1], //  ↑
        [1, -1], //  ↗
      ];

      for (let y = 0; y < size.y; y++) {
        for (let x = 0; x < size.x; x++) {
          let x_ = x;
          let y_ = y;
          let char = lines[y_][x_];
          if (char == searchString[0])
            for (const dir of directions) {
              x_ = x;
              y_ = y;
              let wrong = false;
              for (const searchChar of searchString) {
                char = lines[y_][x_];
                if (char != searchChar) {
                  wrong = true;
                  break;
                }
                if (searchChar == searchString.at(-1)) break;
                x_ += dir[0];
                y_ += dir[1];

                if (x_ < 0 || y_ < 0 || y_ >= size.y || x_ >= size.x) {
                  wrong = true;
                  break;
                }
              }
              if (!wrong) {
                foundCount++;
              }
            }
        }
      }
      return foundCount.toString();
    },

    part2: () => {
      let foundCount = 0;

      for (let y = 1; y < size.y - 1; y++) {
        for (let x = 1; x < size.x - 1; x++) {
          let char = lines[y][x];
          if (char == "A") {
            const MSstring =
              lines[y - 1][x - 1] + // ↖
              lines[y - 1][x + 1] + // ↗
              lines[y + 1][x + 1] + // ↘
              lines[y + 1][x - 1]; //  ↙
            if (["MMSS", "SMMS", "SSMM", "MSSM"].includes(MSstring)) {
              foundCount++;
            }
          }
        }
      }
      return foundCount.toString();
    },
  };
};
