export const solve = (inputText: string) => {
  const map = inputText.split("\n");

  type p2D = { x: number; y: number };

  let size: p2D = { x: map[0].length, y: map.length };
  console.log({ size });

  const startLine = map.find((l) => l.includes("^"))!;
  const guardPos = { x: startLine.indexOf("^"), y: map.indexOf(startLine) };

  let guardDir = 0;
  enum d {
    "↑" = 0,
    "→" = 1,
    "↓" = 2,
    "←" = 3,
  }
  const dirs: p2D[] = [
    { x: 0, y: -1 }, //  ↑
    { x: 1, y: 0 }, //   →
    { x: 0, y: 1 }, //   ↓
    { x: -1, y: 0 }, //  ←
  ];

  function addDirStep(dir: d) {
    return { x: guardPos.x + dirs[dir].x, y: guardPos.y + dirs[dir].y };
  }
  function getMapField(pos: p2D, map_ = map) {
    return map_[pos.y][pos.x];
  }
  function walkDir(dir: d) {
    const newPos = addDirStep(dir);
    guardPos.x = newPos.x;
    guardPos.y = newPos.y;
  }

  return {
    part1: () => {
      const posSet = new Set<string>();

      let inside = true;
      while (inside) {
        const nextPos = addDirStep(guardDir);
        if (nextPos.x < 0 || nextPos.x >= size.x || nextPos.y < 0 || nextPos.y >= size.y)
          inside = false;

        while (inside && getMapField(addDirStep(guardDir)) == "#") {
          guardDir++;
          if (guardDir > 3) guardDir = 0;
        }
        walkDir(guardDir);

        posSet.add(guardPos.x + "," + guardPos.y);
      }
      return posSet.size.toString();
    },

    part2: () => {
      let stuckInLoopCount = -1;

      for (let y = 0; y < size.y; y++) {
        for (let x = 0; x < size.x; x++) {
          guardPos.x = startLine.indexOf("^");
          guardPos.y = map.indexOf(startLine);
          guardDir = 0;

          const testMap = map.map((x) => x);
          const changeLine = testMap[y].split("");
          changeLine[x] = "#";
          testMap[y] = changeLine.join("");

          const posDirSet = new Set<string>();

          let inside = true;
          let loop = false;
          while (inside && !loop) {
            const nextPos = addDirStep(guardDir);
            if (nextPos.x < 0 || nextPos.x >= size.x || nextPos.y < 0 || nextPos.y >= size.y)
              inside = false;

            while (inside && getMapField(addDirStep(guardDir), testMap) == "#") {
              guardDir++;
              if (guardDir > 3) guardDir = 0;
            }
            walkDir(guardDir);

            const posDir = "" + guardPos.x + "," + guardPos.y + "|" + guardDir;
            if (posDirSet.has(posDir)) loop = true;
            posDirSet.add(posDir);
          }
          if (loop) stuckInLoopCount++;
        }
      }
      return stuckInLoopCount.toString();
    },
  };
};
