export const solve = (inputText: string) => {
  const map = inputText.split("\n");
  type p2D = { x: number; y: number };

  let size: p2D = { x: map[0].length, y: map.length };
  function point2Str(point: p2D) {
    return `${point.x},${point.y}`;
  }

  const freqSet = new Set<string>();
  for (const freq of inputText) freqSet.add(freq);
  freqSet.delete("\n");
  freqSet.delete(".");

  const antinodeSet = new Set<string>();

  function isInBounds(point: p2D) {
    return point.x > -1 && point.y > -1 && point.x < size.x && point.y < size.y;
  }

  const freqAntennas: { [freq: string]: p2D[] } = {};
  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      const char = map[y][x];
      if (char !== ".")
        if (freqAntennas[char]) freqAntennas[char].push({ x, y });
        else freqAntennas[char] = [{ x, y }];
    }
  }

  function calcAntinodes(rule: (a1: p2D, a2: p2D) => void) {
    for (const freq in freqAntennas) {
      if (Object.prototype.hasOwnProperty.call(freqAntennas, freq)) {
        const antennas = freqAntennas[freq];
        for (const antenna1 of antennas) {
          for (const antenna2 of antennas) {
            if (point2Str(antenna1) == point2Str(antenna2)) continue;
            rule(antenna1, antenna2);
          }
        }
      }
    }
  }

  return {
    part1: () => {
      calcAntinodes((a1, a2) => {
        const antonode = { x: 2 * a1.x - a2.x, y: 2 * a1.y - a2.y };
        if (isInBounds(antonode)) antinodeSet.add(point2Str(antonode));
      });
      return antinodeSet.size.toString();
    },

    part2: () => {
      calcAntinodes((a1, a2) => {
        let i = 1;
        while (true) {
          const antonode = { x: (1 - i) * a1.x + i * a2.x, y: (1 - i) * a1.y + i * a2.y };
          if (!isInBounds(antonode)) return;
          antinodeSet.add(point2Str(antonode));
          i++;
        }
      });
      return antinodeSet.size.toString();
    },
  };
};
