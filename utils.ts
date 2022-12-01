import fs from "fs";
export const staticVars = { path: "" };

export function solution(solutiuonValue: string | number, partNumber: number) {
  console.log("%c\nSolution: " + solutiuonValue.toString() + "\n", "color:red; background-color:blue");
  fs.writeFileSync(staticVars.path + "output_" + partNumber, solutiuonValue.toString());
}
