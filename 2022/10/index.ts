export const solve = (inputText: string) => {
  const instructions = inputText.split("\n");

  let registerX = 1;
  let cycle = 0;
  let signalSum = 0;

  function cycleUp() {
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
      return "out".toString();
    },
  };
};
