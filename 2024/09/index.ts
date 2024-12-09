export const solve = (input: string) => {
  let diskMap: number[] = [];

  let fileLengths: { [id: number]: number } = {};
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    for (let j = 0; j < +input[i]; j++) {
      if (i % 2) diskMap.push(-1);
      else diskMap.push(i / 2);
    }

  }

  let checksum = 0;

  for (const [index, fileId] of diskMap.entries()) {
    if (fileId == -1) {
      let lastFileId = -1;
      while (lastFileId == -1 && diskMap.length > index) lastFileId = diskMap.pop()!;

      if (lastFileId) diskMap[index] = lastFileId;
    }
  }
  if (diskMap.at(-1)! < 0) diskMap.pop();

  for (let i = 0; i < diskMap.length; i++) {
    checksum += i * diskMap[i];
  }

  return {
    part1: () => {
      return checksum.toString();
    },

    part2: () => {
      return "out".toString();
    },
  };
};
