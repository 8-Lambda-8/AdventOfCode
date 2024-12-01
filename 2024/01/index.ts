export const solve = (inputText: string) => {
  const lines = inputText.split("\n");

  const list0: number[] = [];
  const list1: number[] = [];

  for (const line of lines) {
    const cols = line.split("   ");
    list0.push(+cols[0]);
    list1.push(+cols[1]);
  }

  return {
    part1: () => {
      list0.sort();
      list1.sort();

      let offsetSum = 0;

      for (let i = 0; i < list0.length; i++) {
        offsetSum += Math.abs(list0[i] - list1[i]);
      }
      return offsetSum.toString();
    },

    part2: () => {
      let similarityScore = 0;

      for (let i = 0; i < list0.length; i++) {
        similarityScore += list0[i] * list1.filter((x) => x == list0[i]).length;
      }

      return similarityScore.toString();
    },
  };
};
