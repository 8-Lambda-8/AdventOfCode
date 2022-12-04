function between(check: number, left: number, right: number) {
  return left <= check && check <= right;
}

function fullyContains(pair: number[][]): boolean {
  let contains = false;

  if (between(pair[1][0], pair[0][0], pair[0][1]) && between(pair[1][1], pair[0][0], pair[0][1])) {
    contains = true;
  }
  if (between(pair[0][0], pair[1][0], pair[1][1]) && between(pair[0][1], pair[1][0], pair[1][1])) {
    contains = true;
  }

  return contains;
}

function overlaps(pair: number[][]): boolean {
  let contains = false;

  if (between(pair[1][0], pair[0][0], pair[0][1]) || between(pair[1][1], pair[0][0], pair[0][1])) {
    contains = true;
  }
  if (between(pair[0][0], pair[1][0], pair[1][1]) || between(pair[0][1], pair[1][0], pair[1][1])) {
    contains = true;
  }

  return contains;
}

export const solve = (inputText: string) => {
  const assignments = inputText.split("\n");
  const assignmentPairs = assignments.map((p) =>
    p.split(",").map((h) => h.split("-").map((d) => parseInt(d)))
  );

  return {
    part1: () => {
      let containingPairs = 0;

      for (const pair of assignmentPairs) {
        if (fullyContains(pair)) containingPairs++;
      }
      return containingPairs.toString();
    },

    part2: () => {
      let overlappingPairs = 0;
      for (const pair of assignmentPairs) {
        if (overlaps(pair)) overlappingPairs++;
      }

      return overlappingPairs.toString();
    },
  };
};
