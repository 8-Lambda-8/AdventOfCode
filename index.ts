import fs from "fs";
import { staticVars } from "./utils.js";

let year = "2022";
let day = "02";
let part = 0; //0 = both

const dayFolderPath = "./" + year + "/" + day + "/";
staticVars.path = dayFolderPath;

const dayModule = await import(dayFolderPath + "index.js");

const inputText = fs.readFileSync(dayFolderPath + "input", "utf-8");

console.log("###################################################################\n");
const timeStart = performance.now();

const { part1, part2 } = dayModule.solve(inputText);

if (part !== 2) {
  console.log("Part1:\n");
  part1();
  console.log("\n");
}

if (part !== 1) {
  console.log("Part2:\n");
  part2();
  console.log("\n");
}

const timeEnd = performance.now();
console.log(`\n took ${timeEnd - timeStart}ms`);
