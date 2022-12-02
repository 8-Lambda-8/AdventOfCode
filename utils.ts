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
