export const solve = (inputText: string) => {
  const stones = inputText.split(" ");

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
      return "out".toString();
    },
  };
};
