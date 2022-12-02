import { solution } from "../../utils.js";

export const solve = (inputText: string) => {
  const roundsArray = inputText.split("\n");

  let score = 0;

  const shapeScore = { X: 1, Y: 2, Z: 3 };

  for (const round of roundsArray) {
    const [oponent, player] = round.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"];
    score += shapeScore[player];

    if (
      (oponent == "A" && player == "Y") ||
      (oponent == "B" && player == "Z") ||
      (oponent == "C" && player == "X")
    )
      score += 6;
    else if (
      (oponent == "A" && player == "X") ||
      (oponent == "B" && player == "Y") ||
      (oponent == "C" && player == "Z")
    ) {
      score += 3;
    } else score += 0;
  }

  return {
    part1: () => {
      solution(score, 1);
    },

    part2: () => {
      solution(0, 2);
    },
  };
};
