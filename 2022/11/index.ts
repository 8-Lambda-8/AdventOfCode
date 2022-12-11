export const solve = (inputText: string) => {
  const monkeyInput = inputText.split("\n\n");

  class Monkey {
    Items: number[] = [];
    operation = (old: number) => old;
    test = 2;
    throwTo = [0, 0];
    inspectCount = 0;
    worryInhib = (item: number) => item;

    constructor(
      startingItems: number[],
      operation: (old: number) => number,
      test: number,
      throwTo: [number, number],
      worryInhib: (item: number) => number
    ) {
      this.Items.push(...startingItems);
      this.operation = operation;
      this.test = test;
      this.throwTo = throwTo;
      this.worryInhib = worryInhib;
    }

    Inspect(item: number) {
      this.inspectCount++;
      item = this.operation(item);
      item = this.worryInhib(item);
      item = Math.floor(item);
      monkeys[this.throwTo[item % this.test == 0 ? 0 : 1]].Items.push(item);
    }
  }

  let monkeys = new Array<Monkey>();
  function monkeyObserve(worryInhib: (item: number) => number, rounds: number) {
    monkeys = new Array<Monkey>();

    for (const monkey of monkeyInput) {
      const lines = monkey.split("\n");
      const startingItems = lines[1]
        .replace("  Starting items: ", "")
        .split(", ")
        .map((i) => parseInt(i));
      const operation = eval(lines[2].replace("  Operation: new = ", "(old)=>"));

      monkeys.push(
        new Monkey(
          startingItems,
          operation,
          parseInt(lines[3].replace("Test: divisible by ", "")),
          [parseInt(lines[4].slice(-1)), parseInt(lines[5].slice(-1))],
          worryInhib
        )
      );
    }

    for (let round = 0; round < rounds; round++) {
      for (const monkey of monkeys) {
        while (monkey.Items.length > 0) {
          const item = monkey.Items.splice(0, 1)[0];
          if (!item) break;
          monkey.Inspect(item);
        }
      }
    }

    return monkeys.map((m) => m.inspectCount).sort((a, b) => b - a);
  }

  return {
    part1: () => {
      const monkeyInspectCount = monkeyObserve((i) => i / 3, 20);

      return (monkeyInspectCount[0] * monkeyInspectCount[1]).toString();
    },

    part2: () => {
      const mod = monkeys.map((m) => m.test).reduce((a, b) => a * b, 1);
      const monkeyInspectCount = monkeyObserve((i) => i % mod, 10000);

      return (monkeyInspectCount[0] * monkeyInspectCount[1]).toString();
    },
  };
};
