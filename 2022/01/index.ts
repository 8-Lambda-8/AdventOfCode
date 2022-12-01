import { solution } from "../../utils.js";

export const solve = (inputText: string) => {
  const elfBlocks = inputText.split("\n\n");

  let elfCalories = new Array<number>();
  for (const elfBlock of elfBlocks) {
    let calories = 0;
    for (const line of elfBlock.split("\n")) {
      calories += parseInt(line);
    }
    elfCalories.push(calories);
  }

  elfCalories = elfCalories.sort((a, b) => b - a);

  return {
    part1: () => {
      solution(Math.max(...elfCalories), 1);
    },

    part2: () => {
      solution(
        elfCalories.splice(0, 3).reduce((part, a) => part + a, 0),
        2
      );
    },
  };
};
