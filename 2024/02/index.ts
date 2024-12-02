export const solve = (inputText: string) => {
  const lines = inputText.split("\n");

  const reports: number[][] = [];

  for (const line of lines) {
    reports.push(line.split(" ").map((x) => +x));
  }

  return {
    part1: () => {
      let saveReports = 0;
      for (const report of reports) {
        let save = true;

        const increasing = report[0] < report[1];

        for (let i = 0; i < report.length - 1; i++) {
          if (+report[i] == report[i + 1]) save = false;
          if (increasing && report[i] > report[i + 1]) save = false;
          if (!increasing && report[i] < report[i + 1]) save = false;
          if (Math.abs(+report[i] - +report[i + 1]) > 3) save = false;
          console.log(report[i], report[i + 1], Math.abs(report[i] - report[i + 1]));
        }
        console.log(save);
        if (save) saveReports++;
      }

      return saveReports.toString();
    },

    part2: () => {
      return "out".toString();
    },
  };
};
