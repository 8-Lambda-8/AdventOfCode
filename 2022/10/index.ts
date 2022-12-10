import { plotXY } from "../../utils.js";

export const solve = (inputText: string) => {
  const instructions = inputText.split("\n");

  let registerX = 1;
  let cycle = 0;
  let signalSum = 0;

  let printedSymbols = new Array<{ x: number; y: number; char: string }>();

  function cycleUp() {
    if (Math.abs((cycle % 40) - registerX) < 2) {
      printedSymbols.push({ x: cycle % 40, y: Math.floor(cycle / 40), char: "#" });
    }
    cycle++;
    checkSignal();
  }

  function checkSignal() {
    if ((cycle - 20) % 40 == 0) {
      signalSum += cycle * registerX;
    }
  }

  for (const instruction of instructions) {
    if (instruction === "noop") cycleUp();
    else {
      cycleUp();
      cycleUp();
      registerX += parseInt(instruction.split(" ")[1]);
    }
  }
  console.log({ registerX, cycle });
  return {
    part1: () => {
      return signalSum.toString();
    },

    part2: () => {
      plotXY({ xS: 0, xE: 39, yS: 0, yE: 5 }, ".", printedSymbols, true);
      return "^^^".toString();
    },
  };
};
