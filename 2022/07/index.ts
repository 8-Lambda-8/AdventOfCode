export const solve = (inputText: string) => {
  const lines = inputText.split("\n");
  interface directory {
    path: string;
    containingSize: number;
  }

  const directoryArray = new Array<directory>();
  const filesystem: { [path: string]: number } = {};

  let currentPath = "";

  for (const line of lines) {
    //console.log(line);
    if (!filesystem[currentPath]) filesystem[currentPath] = 0;

    if (line == "$ cd /") {
      currentPath = "";
    } else if (line == "$ cd ..") {
      currentPath = currentPath.slice(0, currentPath.lastIndexOf("/"));
    } else if (line.startsWith("$ cd ")) {
      currentPath += "/" + line.substring(5);
    } else if (line == "$ ls") {
    } else if (line.startsWith("dir ")) {
    } else {
      filesystem[currentPath] += parseInt(line.split(" ")[0]);
    }
  }

  function getContainingSize(path: string) {
    let containingSize = 0;
    const childFolders = Object.keys(filesystem).filter((p) => p.startsWith(path)) ?? [];
    for (const child of childFolders) {
      containingSize += filesystem[child];
    }
    return containingSize;
  }

  return {
    part1: () => {
      let solution1 = 0;
      for (const path in filesystem) {
        let containingSize = getContainingSize(path);
        if (containingSize < 100000) solution1 += containingSize;
      }
      return solution1.toString();
    },

    part2: () => {
      let requiredDelete = 30000000 - (70000000 - getContainingSize(""));
      let choosenSize = 70000000;
      for (const path in filesystem) {
        let size = getContainingSize(path);
        if (size >= requiredDelete) choosenSize = Math.min(size, choosenSize);
      }

      return choosenSize.toString();
    },
  };
};
