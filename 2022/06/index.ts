export const solve = (inputText: string) => {
  let solution1 = 0;
  for (let i = 4; i < inputText.length; i++) {
    let slice = inputText.slice(i - 4, i).split("");
    let diffCount = new Set(slice).size;

    if (diffCount >= 4) {
      solution1 = i;
      break;
    }
  }

  const out = "";

  return {
    part1: () => {
      return solution1.toString();
    },

    part2: () => {
      return out.toString();
    },
  };
};
