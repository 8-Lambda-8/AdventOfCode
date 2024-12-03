export const solve = (inputText: string) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;

  return {
    part1: () => {
      let sum = 0;
      let m;
      while ((m = regex.exec(inputText)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        sum += +m[1] * +m[2];
      }
      return sum.toString();
    },

    part2: () => {
      let sum = 0;
      let m;
      while ((m = regex.exec(inputText)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        if (inputText.lastIndexOf("do()", m.index) >= inputText.lastIndexOf("don't()", m.index)) {
          sum += +m[1] * +m[2];
        }
      }
      return sum.toString();
    },
  };
};
