import { plotXY } from "../../utils.js";

export const solve = (inputText: string) => {
  const lines = inputText.split("\n").map((line) => {
    const split = line.split(" ");
    return { direction: split[0], distance: parseInt(split[1]) };
  });

  function move(ropeLength: number) {
    function moveHead(direction: string) {
      if (direction == "R") Rope[0].x++;
      if (direction == "L") Rope[0].x--;
      if (direction == "U") Rope[0].y++;
      if (direction == "D") Rope[0].y--;

      for (let knotNumber = 1; knotNumber < Rope.length; knotNumber++) {
        const previousKnot = Rope[knotNumber - 1];
        const knot = Rope[knotNumber];

        const knotDistance = {
          x: Rope[knotNumber - 1].x - Rope[knotNumber].x,
          y: Rope[knotNumber - 1].y - Rope[knotNumber].y,
        };

        if (Math.abs(knotDistance.x) <= 1 && Math.abs(knotDistance.y) <= 1) continue;

        let yoffset = Math.min(Math.max(-1, previousKnot.y - knot.y), 1);
        let xoffset = Math.min(Math.max(-1, previousKnot.x - knot.x), 1);
        knot.y += yoffset;
        knot.x += xoffset;

        if (knotNumber == Rope.length - 1) tailVisited.add(knot.x + "," + knot.y);
      }
    }

    let Rope = new Array<{ x: number; y: number }>();
    for (let i = 0; i < ropeLength; i++) {
      Rope.push({ x: 0, y: 0 });
    }

    let tailVisited = new Set(["0,0"]);

    for (const line of lines) {
      line;
      for (let dist = 0; dist < line.distance; dist++) {
        moveHead(line.direction);

        /* plotXY({ xS: -11 * 0, xE: 14 - 9, yS: -5 * 0, yE: 15 - 9 }, ".", [
          ...Rope.map((k) => {
            let index = Rope.indexOf(k);
            let char = index == 0 ? "H" : index.toString();
            return { x: k.x, y: k.y, char };
          }),
        ]); */
        console.log(lines.lastIndexOf(line));
      }
    }
    return tailVisited.size;
  }

  return {
    part1: () => {
      return move(2).toString();
    },

    part2: () => {
      return move(10).toString();
    },
  };
};
