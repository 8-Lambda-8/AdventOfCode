import fs from "fs";
import { exit } from "process";
import { solution, staticVars } from "./utils.js";
import https from "https";

let year = "2022";
let day = "02";
let part = 0; //0 = both

let test = -1; //-1= full, 0=testInput_0,...

const dayFolderPath = "./" + year + "/" + day + "/";
staticVars.path = dayFolderPath;

let stopAfterInit = false;

if (!fs.existsSync(dayFolderPath + "index.ts")) {
  fs.mkdirSync(dayFolderPath, { recursive: true });
  fs.copyFileSync("template.ts", dayFolderPath + "index.ts");

  console.log("Created Template");
  stopAfterInit = true;
}

if (!fs.existsSync(dayFolderPath + "input")) {
  const url = `https://adventofcode.com/${year}/day/${parseInt(day)}`;

  let [input, statusCode] = await new Promise<[string, number]>((resolve, reject) => {
    const req = https.request(url + "/input", (response) => {
      const statusCode = response.statusCode ?? 404;
      let result = "";

      response.on("data", (chunk) => {
        result += chunk;
      });

      response.on("end", () => resolve([result, statusCode]));
      response.on("error", reject);
    });

    req.setHeader(
      "cookie",
      `session=${JSON.parse(fs.readFileSync("./session.json", "utf-8")).session}`
    );

    req.on("error", reject);
    req.end();
  });

  if (statusCode != 200) {
    console.log("error loading input file");
    stopAfterInit = true;
  }

  if (input.startsWith("Please don't")) {
    console.log("you are too early");
    stopAfterInit = true;
  }

  while (input.endsWith("\n")) input = input.slice(0, -1);
  fs.writeFileSync(dayFolderPath + "input", input);
}

if (stopAfterInit) exit();

const dayModule = await import(dayFolderPath + "index.js");

const inputText = fs.readFileSync(
  dayFolderPath + (test < 0 ? "input" : `testInput_${test}`),
  "utf-8"
);

console.log("###################################################################\n");
const timeStart = performance.now();

const { part1, part2 } = dayModule.solve(inputText);

if (part !== 2) {
  console.log("Part1:\n");
  solution(part1(), 1);
}

if (part !== 1) {
  console.log("Part2:\n");
  solution(part2(), 2);
}

const timeEnd = performance.now();
console.log(`\ntook ${timeEnd - timeStart}ms`);
