export const solve = (inputText: string) => {
  const lines = inputText.split("\n");

  function getOperatorBitString(shift: number, cnt: number, radix: number) {
    let s = "";
    s = shift.toString(radix);
    while (s.length < (cnt - 1).toString(radix).length) s = "0" + s;
    return s;
  }

  function sumTestValues(radix: number) {
    let testValueSum = 0;

    for (const line of lines) {
      const [answer, valuestring] = line.split(": ");
      const values = valuestring.split(" ").map((x) => +x);

      let calculation = 0;

      let combinationCount = radix ** (values.length - 1);
      let operatorShift = 0;

      //console.log({ answer, values, combinationCount });

      while (operatorShift < combinationCount) {
        calculation = values[0];
        //console.log(calculation);

        const operatorBits = getOperatorBitString(operatorShift, combinationCount, radix);
        for (let i = 1; i < values.length; i++) {
          //console.log(["+", "*", "||"].at(+operatorBits[i - 1]), values[i]);
          if (operatorBits[i - 1] == "0") calculation += values[i];
          if (operatorBits[i - 1] == "1") calculation *= values[i];
          if (operatorBits[i - 1] == "2")
            calculation = +(calculation.toString() + values[i].toString());
        }
        //console.log("=> answ", calculation, operatorBits);

        if (calculation === +answer) {
          //console.log("correct", calculation, operatorBits);
          testValueSum += calculation;
          break;
        }

        operatorShift++;
      }
      //break;
    }

    return testValueSum;
  }

  return {
    part1: () => {
      return sumTestValues(2).toString();
    },

    part2: () => {
      return sumTestValues(3).toString();
    },
  };
};
