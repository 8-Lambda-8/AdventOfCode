import fs from "fs";
export const staticVars = { path: "" };

export function solution(solutiuonValue: string, partNumber: number) {
  console.log(
    `%cSolution${partNumber}: ${solutiuonValue} \n`,
    "color:red; background-color:blue"
  );
  fs.writeFileSync(staticVars.path + "output_" + partNumber, solutiuonValue.toString());
}
