export const solve = (inputText: string) => {
  const itemsInRucksackArray = inputText.split("\n");

  function getPriority(char: string) {
    return char.toUpperCase().charCodeAt(0) - 64 + (char.charCodeAt(0) < 95 ? 26 : 0);
  }

  return {
    part1: () => {
      let itemsInRucksackCompartmentArray = itemsInRucksackArray.map((i) => [
        i.substring(0, i.length / 2),
        i.substring(i.length / 2),
      ]);

      let duplicateItemTypes = itemsInRucksackCompartmentArray.map((rucksack) => {
        const compartmentA = rucksack[0].split("");
        const compartmentB = rucksack[1].split("");
        let r = new Set<string>();
        for (const char of compartmentA) {
          if (compartmentB.indexOf(char) >= 0) {
            r.add(char);
          }
        }
        return [...r][0];
      });

      let sum = 0;
      for (const dupe of duplicateItemTypes) {
        sum += getPriority(dupe);
      }
      return sum.toString();
    },

    part2: () => {
      let badges = new Array<string>();
      for (let i = 0; i < itemsInRucksackArray.length; i += 3) {
        let group = [
          itemsInRucksackArray[i],
          itemsInRucksackArray[i + 1],
          itemsInRucksackArray[i + 2],
        ];
        let possibleChars = new Array<string>();
        for (const char of group[0].split("")) {
          if (group[1].indexOf(char) >= 0) {
            possibleChars.push(char);
          }
        }
        for (const char of possibleChars) {
          if (group[2].indexOf(char) >= 0) {
            possibleChars.push(char);
            badges.push(char);
            break;
          }
        }
      }
      let sum = 0;
      for (const badge of badges) {
        sum += getPriority(badge);
      }
      console.log(sum);

      return sum.toString();
    },
  };
};
