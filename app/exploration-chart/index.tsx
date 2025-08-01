import fs from "node:fs";
import type { Route } from "./+types";
import Papa from "papaparse";
import DynamicChart from "./dynamic-chart";

export async function loader({ params }: Route.LoaderArgs) {
  const name = "Exploration Chart";
  const csvData = fs.readFileSync(
    "/home/edtan/TheStorage/Project/kpk/exploration-chart/app/exploration-chart/sample.csv",
    "utf8"
  );

  return {
    name,
    csvData,
  };
}

export default function ExplorationChart({ loaderData }: Route.ComponentProps) {
  const parseResult = Papa.parse<any>(loaderData.csvData);
  const records = parseResult.data.filter(
    (record: any[]) => record.length > 1 || record[0] !== ""
  );

  return (
    <div>
      <h1>{loaderData.name}</h1>
      <DynamicChart records={records} />
    </div>
  );
}
