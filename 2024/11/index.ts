export const solve = (inputText: string) => {
  const stones = inputText.split(" ");
  const stones2 = [...stones];

  console.log(stones);

  return {
    part1: () => {
      for (let i = 0; i < 25; i++) {
        console.log(i + 1, stones.length);
        const newStones: string[] = [];
        for (let stone of stones) {
          if (stone === "0") newStones.push("1");
          else if (stone.length % 2 == 0) {
            newStones.push(stone.substring(0, stone.length / 2));
            newStones.push((+stone.substring(stone.length / 2, stone.length)).toString());
          } else newStones.push((+stone * 2024).toString());
        }

        for (let i = 0; i < newStones.length; i++) stones[i] = newStones[i];
      }

      return stones.length.toString();
    },

    part2: () => {
      const cache: Map<string, number> = new Map();

      function recurseStones(stone: string, numBlinks: number) {
        if (cache.has(`${stone},${numBlinks}`)) {
          return cache.get(`${stone},${numBlinks}`)!;
        }

        if (numBlinks === 0) {
          return 1;
        } else {
          let total = 0;
          if (stone === "0") {
            total = recurseStones("1", numBlinks - 1);
          } else if (stone.length % 2 === 0) {
            total =
              recurseStones(stone.substring(0, stone.length / 2), numBlinks - 1) +
              recurseStones((+stone.substring(stone.length / 2)).toString(), numBlinks - 1);
          } else {
            total = recurseStones((+stone * 2024).toString(), numBlinks - 1);
          }
          cache.set(`${stone},${numBlinks}`, total);
          return total;
        }
      }

      let total = 0;
      for (let i = 0; i < stones2.length; i++) {
        total += recurseStones(stones2[i], 75);
      }
      console.log();

      return total.toString();
    },
  };
};
