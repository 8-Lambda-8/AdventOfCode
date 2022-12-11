export const solve = (inputText: string) => {
  const monkeyInput = inputText.split("\n\n");

  //let Monkeys = new Array<{ itemWorryLevel: number[]; operation: (old: number) => number;test: }>();

  class Monkey {
    Items: number[] = [];
    operation = (old: number) => old;
    test = 2;
    throwTo = [0, 0];
    inspectCount = 0;

    constructor(
      startingItems: number[],
      operation: (old: number) => number,
      test: number,
      throwTo: [number, number]
    ) {
      this.Items.push(...startingItems);
      this.operation = operation;
      this.test = test;
      this.throwTo = throwTo;
    }

    Inspect(item: number) {
      this.inspectCount++;
      item = Math.floor(this.operation(item) / 3);
      monkeys[this.throwTo[item % this.test == 0 ? 0 : 1]].Items.push(item);
    }
  }

  let monkeys = new Array<Monkey>();

  for (const monkey of monkeyInput) {
    const lines = monkey.split("\n");
    const startingItems = lines[1]
      .replace("  Starting items: ", "")
      .split(", ")
      .map((i) => parseInt(i));
    const operation = eval(lines[2].replace("  Operation: new = ", "(old)=>"));

    monkeys.push(
      new Monkey(startingItems, operation, parseInt(lines[3].replace("Test: divisible by ", "")), [
        parseInt(lines[4].slice(-1)),
        parseInt(lines[5].slice(-1)),
      ])
    );
  }

  for (let round = 0; round < 20; round++) {
    for (const monkey of monkeys) {
      while (monkey.Items.length > 0) {
        const item = monkey.Items.pop();
        if (!item) break;
        monkey.Inspect(item);
      }
    }
  }

  return {
    part1: () => {
      monkeys.sort((a, b) => b.inspectCount - a.inspectCount);

      return (monkeys[0].inspectCount * monkeys[1].inspectCount).toString();
    },

    part2: () => {
      return "out".toString();
    },
  };
};
