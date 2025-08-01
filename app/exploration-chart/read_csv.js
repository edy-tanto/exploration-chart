import { readFileSync } from "node:fs";

function readCsvFile() {
  const csvPath =
    "/home/edtan/TheStorage/Project/kpk/exploration-chart/app/exploration-chart/sample.csv";
  const csvContent = readFileSync(csvPath, "utf-8");

  console.log(csvContent);
}

readCsvFile();
