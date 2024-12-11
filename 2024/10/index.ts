export const solve = (inputText: string) => {
  const lines = inputText.split("\n");

  const map = inputText.split("\n");
  type p2D = { x: number; y: number };

  let size: p2D = { x: map[0].length, y: map.length };
  function point2Str(point: p2D) {
    return `${point.x},${point.y}`;
  }

  function getHeight(point: p2D) {
    return +map[point.y][point.x];
  }

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

  const trailHeadScores: { [p: string]: { p1: Set<string>; p2: number } } = {};

  function recurseTrails(trail: p2D, head: string) {
    for (let i = 0; i < dirs.length; i++) {
      const p: p2D = { ...dirs[i] };
      p.x += trail.x;
      p.y += trail.y;

      if (p.x < 0 || p.y < 0 || p.x >= size.x || p.y >= size.y) continue;

      if (getHeight(p) === 9 && getHeight(trail) == 8) {
        if (!trailHeadScores[head]) trailHeadScores[head] = { p1: new Set<string>(), p2: 0 };
        trailHeadScores[head].p1.add(point2Str(p));
        trailHeadScores[head].p2++;
      } else if (getHeight(p) === getHeight(trail) + 1) recurseTrails(p, head);
    }
  }

  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      if (getHeight({ x, y }) === 0) {
        recurseTrails({ x, y }, point2Str({ x, y }));
      }
    }
  }

  return {
    part1: () => {
      let scoreSum = 0;

      for (const trail in trailHeadScores) {
        scoreSum += trailHeadScores[trail].p1.size;
      }
      return scoreSum.toString();
    },

    part2: () => {
      let scoreSum = 0;

      for (const trail in trailHeadScores) {
        scoreSum += trailHeadScores[trail].p2;
      }
      return scoreSum.toString();
    },
  };
};
