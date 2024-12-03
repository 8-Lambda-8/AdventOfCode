import fs from "fs";
import { exit } from "process";
import { padWithZero, solution, staticVars } from "./utils.js";
import https from "https";

let year = 2024;
let day = 3;
let part = 0; //0 = both

let test = -1; //-1= full, 0=testInput_0, ...
if (process.argv.find((a) => a == "test")) {
  test = 0;
}

const dayFolderPath = `./${year}/${padWithZero(day, 2)}/`;
staticVars.path = dayFolderPath;
staticVars.test = test;
const urlDay = `https://adventofcode.com/${year}/day/${day}`;

let stopAfterInit = false;

if (!fs.existsSync(dayFolderPath + "index.ts")) {
  fs.mkdirSync(dayFolderPath, { recursive: true });
  fs.copyFileSync("template.ts", dayFolderPath + "index.ts");

  console.log("Created Template");
  stopAfterInit = true;
}

function getFileFromUrl(url: string) {
  return new Promise<[string, number]>((resolve, reject) => {
    const req = https.request(url, (response) => {
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
}

if (!fs.existsSync(dayFolderPath + "input")) {
  let [input, statusCode] = await getFileFromUrl(urlDay + "/input");

  if (statusCode != 200) {
    console.log("error loading input file");
    stopAfterInit = true;
  }

  if (input.startsWith("Please don't")) {
    console.log("you are too early");
    stopAfterInit = true;
  } else {
    while (input.endsWith("\n")) input = input.slice(0, -1);
    fs.writeFileSync(dayFolderPath + "input", input);
  }
}

if (!fs.existsSync(dayFolderPath + "testInput_0")) {
  let [page, statusCode] = await getFileFromUrl(urlDay);

  const regex = new RegExp("<pre><code>([\\s\\S]*?)<\\/code><\\/pre>", "mgi");

  if (statusCode != 200) {
    console.log("error loading testInputs");
    stopAfterInit = true;
  }

  let i = 0;
  let m;
  while ((m = regex.exec(page)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    let match = m[1];
    while (match.endsWith("\n")) match = match.slice(0, -1);

    fs.writeFileSync(dayFolderPath + "testInput_" + i, match);
    i++;
  }
  if (!fs.existsSync(dayFolderPath + "testInput_0")) {
    console.log("no test Inputs found");
    stopAfterInit = true;
  }
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
