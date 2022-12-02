import { solution } from "../../utils.js";

export const solve = (inputText: string) => {
  const roundsArray = inputText.split("\n");

  let score1 = 0;
  let score2 = 0;

  const shapeScore = { X: 1, Y: 2, Z: 3 };

  type abcType = "A" | "B" | "C";
  type xyzType = "X" | "Y" | "Z";

  const shapeTable2 = {
    X: { A: "Z", B: "X", C: "Y" }, //loose
    Y: { A: "X", B: "Y", C: "Z" }, //draw
    Z: { A: "Y", B: "Z", C: "X" }, //win
  } as { [key: string]: { [key: string]: xyzType } };

  const resultTable2 = { X: 0, Y: 3, Z: 6 };

  for (const round of roundsArray) {
    const [oponent, player] = round.split(" ") as [abcType, xyzType];
    score1 += shapeScore[player];

    if (
      (oponent == "A" && player == "Y") ||
      (oponent == "B" && player == "Z") ||
      (oponent == "C" && player == "X")
    )
      score1 += 6;
    else if (
      (oponent == "A" && player == "X") ||
      (oponent == "B" && player == "Y") ||
      (oponent == "C" && player == "Z")
    ) {
      score1 += 3;
    } else score1 += 0;

    score2 += shapeScore[shapeTable2[player][oponent]];
    score2 += resultTable2[player];
  }

  return {
    part1: () => {
      solution(score1, 1);
    },

    part2: () => {
      solution(score2, 2);
    },
  };
};
