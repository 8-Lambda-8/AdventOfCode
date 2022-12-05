export const solve = (inputText: string) => {
  const [stacksString, instructionLinesString] = inputText.split("\n\n");

  let stackLines = stacksString.split("\n").reverse();

  const instructionLines = instructionLinesString.split("\n").map((line) => {
    let ll = line
      .replace("move ", "")
      .replace(" from ", ",")
      .replace(" to ", ",")
      .split(",")
      .map((n) => parseInt(n));

    return { count: ll[0], from: ll[1], to: ll[2] };
  });

  let stack = {} as { [id: number]: string[] };

  for (let stackHeight = 1; stackHeight < stackLines.length; stackHeight++) {
    const line = stackLines[stackHeight];

    for (let stackIndex = 0; stackIndex < stackLines[0].length / 4; stackIndex++) {
      const container = line[stackIndex * 4 + 1];
      if (stackHeight == 1) stack[stackIndex] = [];
      if (container != " ") stack[stackIndex].push(container);
    }
  }

  for (const instruction of instructionLines) {
    for (let count = 0; count < instruction.count; count++) {
      if (stack[instruction.from - 1].length > 0)
        stack[instruction.to - 1].push(stack[instruction.from - 1].pop()!);
    }
  }

  return {
    part1: () => {
      let out = "";
      for (const stackColum in stack) {
        out += stack[stackColum].slice(-1)[0];
      }
      return out.toString();
    },

    part2: () => {
      return "";
    },
  };
};
