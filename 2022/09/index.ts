import { plotXY } from "../../utils.js";

export const solve = (inputText: string) => {
  const lines = inputText.split("\n").map((line) => {
    const split = line.split(" ");
    return { direction: split[0], distance: parseInt(split[1]) };
  });

  let HeadPos = { x: 0, y: 0 };
  let TailPos = { x: 0, y: 0 };

  function HeadTailDistanceOkay() {
    return Math.abs(HeadPos.x - TailPos.x) <= 1 && Math.abs(HeadPos.y - TailPos.y) <= 1;
  }

  let tailVisited = new Set(["0,0"]);

  function move1(direction: string) {
    if (direction == "R") HeadPos.x++;
    if (direction == "L") HeadPos.x--;
    if (direction == "U") HeadPos.y++;
    if (direction == "D") HeadPos.y--;

    if (!HeadTailDistanceOkay()) {
      if (direction == "R") {
        TailPos.x = HeadPos.x - 1;
        TailPos.y = HeadPos.y;
      }
      if (direction == "L") {
        TailPos.x = HeadPos.x + 1;
        TailPos.y = HeadPos.y;
      }
      if (direction == "U") {
        TailPos.x = HeadPos.x;
        TailPos.y = HeadPos.y - 1;
      }
      if (direction == "D") {
        TailPos.x = HeadPos.x;
        TailPos.y = HeadPos.y + 1;
      }
      tailVisited.add(TailPos.x + "," + TailPos.y);
    }
  }

  for (const line of lines) {
    for (let dist = 0; dist < line.distance; dist++) {
      move1(line.direction);
      
      /* plotXY({ xS: 0, xE: 5, yS: 0, yE: 5 }, ".", [
        { x: HeadPos.x, y: HeadPos.y, char: "H", prio: 2 },
        { x: TailPos.x, y: TailPos.y, char: "T", prio: 1 },
        { x: 0, y: 0, char: "s", prio: 0 },
      ]); */
    }
  }

  return {
    part1: () => {
      return tailVisited.size.toString();
    },

    part2: () => {
      return "out".toString();
    },
  };
};
