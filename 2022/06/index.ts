export const solve = (inputText: string) => {
  return {
    part1: () => {
      let i = 4;
      for (i; i < inputText.length; i++) {
        let slice = inputText.slice(i - 4, i).split("");
        let diffCount = new Set(slice).size;

        if (diffCount >= 4) break;
      }

      return i.toString();
    },

    part2: () => {
      let i = 14;
      for (i; i < inputText.length; i++) {
        let slice = inputText.slice(i - 14, i).split("");
        let diffCount = new Set(slice).size;

        if (diffCount >= 14) break;
      }

      return i.toString();
    },
  };
};
