export const solve = (inputText: string) => {
  const packetPairs = inputText.split("\n\n").map((p) => p.split("\n"));

  let packetIndexSum = 0;
//5329
//6827
  type arrayType = (number | arrayType)[];

  function loopArray(arrayLeft: arrayType, arrayRight: arrayType, nestingDepth: number): boolean {
    //if (arrayRight.length < arrayLeft.length) return false;

    for (let i = 0; i < arrayLeft.length; i++) {
      /* if (arrayLeft[i] === undefined) return true;
      if (arrayRight[i] === undefined) return false; */

      const leftVal = arrayLeft[i];
      const rightVal = arrayRight[i];

      if (!leftVal) return true;
      if (!rightVal) return false;

      if (leftVal === rightVal) continue;

      if (typeof leftVal === "number" && typeof rightVal === "number") {
        if (leftVal < rightVal) return true; //continue;
        else return false;
      }
      if (typeof leftVal === "number" && Array.isArray(rightVal)) {
        return loopArray([leftVal], rightVal, nestingDepth + 1);
      } else if (Array.isArray(leftVal) && typeof rightVal == "number") {
        return loopArray(leftVal, [rightVal], nestingDepth + 1);
      } else if (Array.isArray(leftVal) && Array.isArray(rightVal)) {
        return loopArray(leftVal, rightVal, nestingDepth + 1);
      }
    }
    return true;
  }

  for (const [packetIndex, pair] of packetPairs.entries()) {
    const left = JSON.parse(pair[0]) as arrayType;
    const right = JSON.parse(pair[1]) as arrayType;

    console.log("Pair ", packetIndex + 1);
    let rightOrder = loopArray(left, right, 0);
    console.log(rightOrder ? "  Right" : "  not Right");
    if (rightOrder) packetIndexSum += 1 + packetIndex;
  }

  return {
    part1: () => {
      return packetIndexSum.toString();
    },

    part2: () => {
      return "out".toString();
    },
  };
};
