function between(check: number, left: number, right: number) {
  return left <= check && check <= right;
}

function fullyContains(pair: number[][]): boolean {
  let contains = false;
  //console.log(pair.toString());

  if (between(pair[1][0], pair[0][0], pair[0][1]) && between(pair[1][1], pair[0][0], pair[0][1])) {
    contains = true;
    //console.log("----2 in 1");
  }
  if (between(pair[0][0], pair[1][0], pair[1][1]) && between(pair[0][1], pair[1][0], pair[1][1])) {
    contains = true;
    //console.log("----1 in 2");
  }

  return contains;
}

export const solve = (inputText: string) => {
  const assignments = inputText.split("\n");
  const assignmentPairs = assignments.map((p) =>
    p.split(",").map((h) => h.split("-").map((d) => parseInt(d)))
  );

  //console.log(assignmentPairs);

  return {
    part1: () => {
      let containingPairs = 0;

      for (const pair of assignmentPairs) {
        if (fullyContains(pair)) containingPairs++;
      }
      return containingPairs.toString();
    },

    part2: () => {
      const out = "";
      return out.toString();
    },
  };
};
