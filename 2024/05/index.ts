export const solve = (inputText: string) => {
  const pageOrders: [number, number][] = [];
  for (const line of inputText.split("\n\n")[0].split("\n")) {
    const sp = line.split("|");
    pageOrders.push([+sp[0], +sp[1]]);
  }

  const pageUpdates: number[][] = [];

  for (const line of inputText.split("\n\n")[1].split("\n")) {
    if (line != "") pageUpdates.push(line.split(",").map((x) => +x));
  }

  console.log(pageOrders);
  console.log(pageUpdates);

  function checkOrder(update: number[]) {
    for (const order of pageOrders) {
      const i0 = update.indexOf(order[0]);
      const i1 = update.indexOf(order[1]);
      if (i0 < 0 || i1 < 0) continue;
      if (i0 > i1) return false;
    }
    return true;
  }

  return {
    part1: () => {
      let middleNumberSum = 0;

      for (const update of pageUpdates) {
        if (checkOrder(update)) middleNumberSum += update[(update.length - 1) / 2];
      }
      return middleNumberSum.toString();
    },

    part2: () => {
      let middleNumberSum = 0;

      for (const update of pageUpdates) {
        if (!checkOrder(update)) {
          while (!checkOrder(update)) {
            for (const order of pageOrders) {
              const i0 = update.indexOf(order[0]);
              const i1 = update.indexOf(order[1]);
              if (i0 < 0 || i1 < 0) continue;
              if (i0 > i1) {
                [update[i0], update[i1]] = [update[i1], update[i0]];
              }
            }
          }
          middleNumberSum += update[(update.length - 1) / 2];
        }
      }
      return middleNumberSum.toString();
    },
  };
};
