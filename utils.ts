import fs from "fs";
export const staticVars = { path: "", test: 0 };

export function solution(solutiuonValue: string, partNumber: number) {
  console.log(`%cSolution${partNumber}: ${solutiuonValue} \n`, "color:red; background-color:blue");
  if (staticVars.test < 0)
    fs.writeFileSync(staticVars.path + "output_" + partNumber, solutiuonValue.toString());
}

export function padWithZero(number: number, targetLength: number) {
  return String(number).padStart(targetLength, "0");
}

export function plotXY(
  size: { xS: number; xE: number; yS: number; yE: number },
  background: string,
  symbols: { x: number; y: number; char: string; prio?: number }[],
  yInverted = false
) {
  let plotString = "";
  for (
    let y = yInverted ? size.yS : size.yE;
    y <= size.yE && y >= size.yS;
    y += yInverted ? 1 : -1
  ) {
    for (let x = size.xS; x < size.xE + 1; x++) {
      let symbolForPos = symbols
        .filter((s) => s.x == x && s.y == y)
        .sort((a, b) => (b.prio ?? 0) - (a.prio ?? 0));

      if (symbolForPos.length > 0) {
        plotString += symbolForPos[0].char[0];
      } else {
        plotString += background[0];
      }
    }
    plotString += "\n";
  }
  console.log(plotString);
}
