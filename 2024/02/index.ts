export const solve = (inputText: string) => {
  const lines = inputText.split("\n");

  const reports: number[][] = [];

  for (const line of lines) {
    reports.push(line.split(" ").map((x) => +x));
  }

  function isSave(report: number[]) {
    let save = true;
    const increasing = report[0] < report[1];

    for (let i = 0; i < report.length - 1; i++) {
      if (+report[i] == report[i + 1]) save = false;
      if (increasing && report[i] > report[i + 1]) save = false;
      if (!increasing && report[i] < report[i + 1]) save = false;
      if (Math.abs(+report[i] - +report[i + 1]) > 3) save = false;
    }
    return save;
  }

  return {
    part1: () => {
      let saveReports = 0;
      for (const report of reports) {
        if (isSave(report)) saveReports++;
      }

      return saveReports.toString();
    },

    part2: () => {
      let saveReports = 0;
      for (const report of reports) {
        if (isSave(report)) saveReports++;
        else {
          for (let i = 0; i < report.length; i++) {
            const reportCopy = report.filter((x, j) => j != i);
            if (isSave(reportCopy)) {
              saveReports++;
              break;
            }
          }
        }
      }
      return saveReports.toString();
    },
  };
};
